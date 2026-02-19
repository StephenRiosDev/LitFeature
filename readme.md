# Composable Features for Lit (POC)

This repository is a proof-of-concept that explores an ergonomics-focused alternative to deep mixin stacks when building component libraries and design systems with Lit.

It sketches an API and runtime model for **“features”**: small, single-responsibility units of behavior that can be *provided* by base classes and *configured/disabled* by subclasses, while still participating in Lit’s reactive property system and lifecycle.

## Status / Disclaimer

- This is a **proposal sketch**, not a PR against Lit and not intended as a drop-in production framework.
- The implementation is intentionally small and optimized for demonstrating the desired developer experience.
- Some behaviors in this POC differ from the “ideal” semantics (see “POC notes and gaps”).

## Why this exists

Large design systems routinely need to:

- Compose multiple independent behaviors (layout, focus tracking, analytics, keyboard handling…)
- Enable/disable behaviors per component or per subtree
- Override defaults at different points in an inheritance hierarchy
- Avoid the complexity and brittleness of deep mixin stacks

Lit already has strong composition primitives (notably `ReactiveController`), but controllers are instance-scoped and do not (today) contribute reactive property metadata to the host in a first-class way. This POC explores a “compositional inheritance” model that makes feature wiring mostly declarative.

## Proposed user-facing model

### Terms

- **Host**: a `LitElement` (or subclass) that supports attaching features.
- **Feature**: a class that receives a host reference + config and can:
  - define reactive properties that become host properties
  - run logic during host lifecycles
  - expose methods/state via the attached feature instance

### High-level API

Hosts declare features using **either** static properties or decorators (both are supported):

**Static property approach:**
- `static provide` — object declaring which features this class makes available to itself and subclasses
- `static configure` — object configuring (or disabling) inherited/provided features for this class and below

**Decorator approach:**
- `@provide(name, definition)` — equivalent to adding an entry in `static provide`
- `@configure(name, options)` — equivalent to adding an entry in `static configure`

This repo’s reference implementation is in `src/root`:

- `LitCore` — a `LitElement` base class that wires features into lifecycle + property declaration
- `FeatureManager` — collects provided features/configs across the inheritance chain and instantiates features
- `LitFeature` — base class for features; proxies feature property access to host properties

## TL;DR

```ts
import { LitCore } from "./src/root/lit-core.js";
import { provide, configure } from "./src/root/decorators/index.js";

// Base button provides styling with sensible defaults
@provide('Style', { class: StyleFeature, config: { variant: 'outlined', size: 'medium' } })
export class BaseButton extends LitCore {}

// Primary button adds ripple effect and overrides styling
@provide('Ripple', { class: RippleFeature, config: { duration: 300 } })
@configure('Style', { config: { variant: 'filled', size: 'large' } })
export class PrimaryButton extends BaseButton {
  declare Style: StyleFeature;
  declare Ripple: RippleFeature;
}
```

At runtime, `PrimaryButton` instances have:
- `this.Style` — config merged to `{ variant: 'filled', size: 'large' }`
- `this.Ripple` — newly provided ripple behavior
- Reactive properties from both features available on the host

## How the POC works (today)

### 1) Providing a feature

Provide a feature using either static properties or decorators:

**Using static property:**

```ts
import { LitCore } from "./src/root/lit-core.js";
import { LayoutFeature } from "./src/features/layout-feature.js";

export class BaseElement extends LitCore {
  static provide = {
    Layout: {
      class: LayoutFeature,
      config: { layout: "classic" }
    }
  };
}
```

**Using decorator:**

```ts
import { LitCore } from "./src/root/lit-core.js";
import { LayoutFeature } from "./src/features/layout-feature.js";
import { provide } from "./src/root/decorators/index.js";

@provide('Layout', { class: LayoutFeature, config: { layout: "classic" } })
export class BaseElement extends LitCore {}
```

**Key behavior**: the feature name (e.g. `Layout`) becomes the property name on the host used to store the instance (e.g. `this.Layout`).

It is recommended to capitalize the first letter of this name to indicate throughout the code that this is a reference to an instance of a feature.

### 2) Configuring a provided feature

Subclasses can override configuration using either approach:

**Using static property:**

```ts
export class FancyElement extends BaseElement {
  static configure = {
    Layout: {
      config: { layout: "emphasized", shape: "rounded" }
    }
  };
}
```

**Using decorator:**

```ts
import { configure } from "./src/root/decorators/index.js";

@configure('Layout', { config: { layout: "emphasized", shape: "rounded" } })
export class FancyElement extends BaseElement {}
```

Config objects are deep-merged (this POC uses `lodash.merge`).

### 3) Disabling a feature entirely

**Using static property:**

```ts
export class NoLayoutElement extends BaseElement {
  static configure = {
    Layout: 'disable'
  };
}
```

**Using decorator:**

```ts
import { configure } from "./src/root/decorators/index.js";

@configure('Layout', 'disable')
export class NoLayoutElement extends BaseElement {}
```

### 4) Disabling or overriding feature-provided reactive properties

Features can contribute reactive properties (via `static get properties()` on the feature class). Hosts can optionally disable or override those property declarations:

**Using static property:**

```ts
export class Element extends BaseElement {
  static configure = {
    Layout: {
      properties: {
        onDark: "disable",
        size: { type: String, reflect: true }
      }
    }
  };
}
```

**Using decorator:**

```ts
import { configure } from "./src/root/decorators/index.js";

@configure('Layout', { 
  config: { layout: "emphasized" },
  properties: {
    onDark: "disable",
    size: { type: String, reflect: true }
  }
})
export class Element extends BaseElement {}
```

### Stacking multiple decorators

Multiple `@provide` and `@configure` decorators can be stacked on a single class. Decorators apply bottom-up (closest to the class first):

```ts
import { provide, configure } from "./src/root/decorators/index.js";

@provide('Focus', { class: FocusFeature })
@provide('Counter', { class: CounterFeature, config: { start: 5 } })
@configure('Layout', { config: { layout: 'emphasized' } })
@configure('Counter', { config: { start: 10 } }) // overrides provided default
export class MyElement extends LitCore {
  declare Focus: FocusFeature;
  declare Counter: CounterFeature;
}
```

### 5) Using a feature instance

The feature instance is attached to the host using the feature name:

```js
this.Counter.increment();
console.log(this.hasFocus); // a reactive host property supplied by FocusFeature
```

If a host already has a property with the same name as the feature, this POC attaches the instance with an underscore prefix (e.g. `_Layout`) and logs a warning.

## Authoring a feature

Feature classes extend `LitFeature`.

### Requirements in this POC

- **Constructor**: if you define a constructor, call `super(host, config)`.
- **Reactive properties**: define `static get properties()` just like a Lit element.
- **Lifecycle**: if you override `updated()` or `firstUpdated()` you must call `super.updated(changedProperties)` / `super.firstUpdated(changedProperties)` so the base class can keep feature property proxies in sync.
- **Host access**: use `this.host` to access the element.
- **Rendering**: features do not render templates directly.

Example:

```js
import { LitFeature } from "./src/root/lit-feature.js";

export class FocusFeature extends LitFeature {
  static get properties() {
    return {
      hasFocus: { type: Boolean, reflect: true }
    };
  }

  constructor(host, config) {
    super(host, config);
    if (config.makeHostFocusable) this.host.tabIndex = 0;
    this.hasFocus = false;

    this.host.addEventListener("focus", () => (this.hasFocus = true));
    this.host.addEventListener("blur", () => (this.hasFocus = false));
  }
}
```

## Lifecycle integration

`LitCore` forwards host lifecycle calls to every attached feature instance. Features may implement:

- `connectedCallback`, `disconnectedCallback`
- `firstUpdated(changedProperties)`, `updated(changedProperties)`
- `attributeChangedCallback(name, oldValue, newValue)`

Additionally, `LitCore` supports “around” hooks (called before/after the host’s corresponding lifecycle):

- `beforeConnectedCallback` / `afterConnectedCallback`
- `beforeDisconnectedCallback` / `afterDisconnectedCallback`
- `beforeFirstUpdated` / `afterFirstUpdated`
- `beforeUpdated` / `afterUpdated`
- `beforeAttributeChangedCallback` / `afterAttributeChangedCallback`

## POC notes and gaps (important)

This repo is intentionally a small POC; a production-ready version (or a core Lit integration) would want to address at least the following:

1) **Feature config precedence across inheritance**

The intent described by the API is “subclasses override ancestors.” The current `FeatureManager.getInheritedConfigs()` traversal/merge behavior does not consistently preserve that intent for deep-merge cases. Treat the current merge semantics as an implementation detail of the POC.

2) **Disabled-by-default features and property preparation**

The POC prepares feature-contributed reactive properties at finalization time, before instances exist. In the current implementation, properties are only prepared for features that are provided (not disabled).

That means a “disabled-by-default, opt-in later” feature would not contribute reactive properties unless the host class enables it up-front.

3) **Falsy initial values**

`LitFeature` initializes internal values using `this[prop] || host[prop]`. This is convenient for demos but can behave unexpectedly for falsy values like `0`, `""`, or `false`.

4) **API shape is intentionally minimal**

There is no formal typing, no "feature dependencies," no ordering controls, and limited metadata available at runtime in this POC.

## Relationship to existing Lit concepts

- **Mixins**: great for small numbers of cross-cutting behaviors, but often become hard to reason about at scale (especially with many stacked mixins).
- **Reactive controllers**: strong composition primitive, but currently do not contribute reactive property declarations to the host in a first-class way.
- **Context**: solves dependency injection; this POC is focused on behavior + lifecycle + reactive property metadata.

An eventual Lit-core-friendly direction could look like “controllers + declarative property contribution + inheritance-aware configuration,” which is what this POC attempts to model.

## Running the demo

```sh
npm install
npm run dev
```

Then open the Vite dev server URL and look for `<feature-demo-element>`.

## Dependencies

- `lit`
- `lodash.merge` (used for deep-merging default config + overrides in this POC)

## License / Attribution

Licensed under the Apache License, Version 2.0. See `LICENSE`.

If you reuse or redistribute this code, please retain the `NOTICE` file to preserve attribution.