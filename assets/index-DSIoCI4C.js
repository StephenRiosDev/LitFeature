(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const p of o.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&n(p)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ee=globalThis,kt=Ee.ShadowRoot&&(Ee.ShadyCSS===void 0||Ee.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,wt=Symbol(),ls=new WeakMap;let Ts=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==wt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(kt&&e===void 0){const n=t!==void 0&&t.length===1;n&&(e=ls.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&ls.set(t,e))}return e}toString(){return this.cssText}};const Ci=a=>new Ts(typeof a=="string"?a:a+"",void 0,wt),T=(a,...e)=>{const t=a.length===1?a[0]:e.reduce((n,s,o)=>n+(p=>{if(p._$cssResult$===!0)return p.cssText;if(typeof p=="number")return p;throw Error("Value passed to 'css' function must be a 'css' function result: "+p+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+a[o+1],a[0]);return new Ts(t,a,wt)},Ti=(a,e)=>{if(kt)a.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const n=document.createElement("style"),s=Ee.litNonce;s!==void 0&&n.setAttribute("nonce",s),n.textContent=t.cssText,a.appendChild(n)}},ds=kt?a=>a:a=>a instanceof CSSStyleSheet?(e=>{let t="";for(const n of e.cssRules)t+=n.cssText;return Ci(t)})(a):a;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Si,defineProperty:Di,getOwnPropertyDescriptor:Pi,getOwnPropertyNames:Ai,getOwnPropertySymbols:zi,getPrototypeOf:Oi}=Object,Je=globalThis,hs=Je.trustedTypes,Fi=hs?hs.emptyScript:"",Ei=Je.reactiveElementPolyfillSupport,me=(a,e)=>a,Me={toAttribute(a,e){switch(e){case Boolean:a=a?Fi:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,e){let t=a;switch(e){case Boolean:t=a!==null;break;case Number:t=a===null?null:Number(a);break;case Object:case Array:try{t=JSON.parse(a)}catch{t=null}}return t}},_t=(a,e)=>!Si(a,e),us={attribute:!0,type:String,converter:Me,reflect:!1,useDefault:!1,hasChanged:_t};Symbol.metadata??=Symbol("metadata"),Je.litPropertyMetadata??=new WeakMap;let Z=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=us){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const n=Symbol(),s=this.getPropertyDescriptor(e,n,t);s!==void 0&&Di(this.prototype,e,s)}}static getPropertyDescriptor(e,t,n){const{get:s,set:o}=Pi(this.prototype,e)??{get(){return this[t]},set(p){this[t]=p}};return{get:s,set(p){const d=s?.call(this);o?.call(this,p),this.requestUpdate(e,d,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??us}static _$Ei(){if(this.hasOwnProperty(me("elementProperties")))return;const e=Oi(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(me("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(me("properties"))){const t=this.properties,n=[...Ai(t),...zi(t)];for(const s of n)this.createProperty(s,t[s])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[n,s]of t)this.elementProperties.set(n,s)}this._$Eh=new Map;for(const[t,n]of this.elementProperties){const s=this._$Eu(t,n);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const n=new Set(e.flat(1/0).reverse());for(const s of n)t.unshift(ds(s))}else e!==void 0&&t.push(ds(e));return t}static _$Eu(e,t){const n=t.attribute;return n===!1?void 0:typeof n=="string"?n:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ti(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){const n=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,n);if(s!==void 0&&n.reflect===!0){const o=(n.converter?.toAttribute!==void 0?n.converter:Me).toAttribute(t,n.type);this._$Em=e,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(e,t){const n=this.constructor,s=n._$Eh.get(e);if(s!==void 0&&this._$Em!==s){const o=n.getPropertyOptions(s),p=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:Me;this._$Em=s,this[s]=p.fromAttribute(t,o.type)??this._$Ej?.get(s)??null,this._$Em=null}}requestUpdate(e,t,n){if(e!==void 0){const s=this.constructor,o=this[e];if(n??=s.getPropertyOptions(e),!((n.hasChanged??_t)(o,t)||n.useDefault&&n.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,n))))return;this.C(e,t,n)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:s,wrapped:o},p){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,p??t??this[e]),o!==!0||p!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[s,o]of this._$Ep)this[s]=o;this._$Ep=void 0}const n=this.constructor.elementProperties;if(n.size>0)for(const[s,o]of n){const{wrapped:p}=o,d=this[s];p!==!0||this._$AL.has(s)||d===void 0||this.C(s,void 0,o,d)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(n=>n.hostUpdate?.()),this.update(t)):this._$EM()}catch(n){throw e=!1,this._$EM(),n}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};Z.elementStyles=[],Z.shadowRootOptions={mode:"open"},Z[me("elementProperties")]=new Map,Z[me("finalized")]=new Map,Ei?.({ReactiveElement:Z}),(Je.reactiveElementVersions??=[]).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const $t=globalThis,Le=$t.trustedTypes,fs=Le?Le.createPolicy("lit-html",{createHTML:a=>a}):void 0,Ss="$lit$",N=`lit$${Math.random().toFixed(9).slice(2)}$`,Ds="?"+N,Mi=`<${Ds}>`,X=document,xe=()=>X.createComment(""),ye=a=>a===null||typeof a!="object"&&typeof a!="function",Ct=Array.isArray,Li=a=>Ct(a)||typeof a?.[Symbol.iterator]=="function",ft=`[ 	
\f\r]`,ue=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ms=/-->/g,gs=/>/g,G=RegExp(`>|${ft}(?:([^\\s"'>=/]+)(${ft}*=${ft}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),bs=/'/g,xs=/"/g,Ps=/^(?:script|style|textarea|title)$/i,Ri=a=>(e,...t)=>({_$litType$:a,strings:e,values:t}),u=Ri(1),ee=Symbol.for("lit-noChange"),D=Symbol.for("lit-nothing"),ys=new WeakMap,q=X.createTreeWalker(X,129);function As(a,e){if(!Ct(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return fs!==void 0?fs.createHTML(e):e}const Ii=(a,e)=>{const t=a.length-1,n=[];let s,o=e===2?"<svg>":e===3?"<math>":"",p=ue;for(let d=0;d<t;d++){const l=a[d];let f,y,g=-1,P=0;for(;P<l.length&&(p.lastIndex=P,y=p.exec(l),y!==null);)P=p.lastIndex,p===ue?y[1]==="!--"?p=ms:y[1]!==void 0?p=gs:y[2]!==void 0?(Ps.test(y[2])&&(s=RegExp("</"+y[2],"g")),p=G):y[3]!==void 0&&(p=G):p===G?y[0]===">"?(p=s??ue,g=-1):y[1]===void 0?g=-2:(g=p.lastIndex-y[2].length,f=y[1],p=y[3]===void 0?G:y[3]==='"'?xs:bs):p===xs||p===bs?p=G:p===ms||p===gs?p=ue:(p=G,s=void 0);const C=p===G&&a[d+1].startsWith("/>")?" ":"";o+=p===ue?l+Mi:g>=0?(n.push(f),l.slice(0,g)+Ss+l.slice(g)+N+C):l+N+(g===-2?d:C)}return[As(a,o+(a[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]};class ve{constructor({strings:e,_$litType$:t},n){let s;this.parts=[];let o=0,p=0;const d=e.length-1,l=this.parts,[f,y]=Ii(e,t);if(this.el=ve.createElement(f,n),q.currentNode=this.el.content,t===2||t===3){const g=this.el.content.firstChild;g.replaceWith(...g.childNodes)}for(;(s=q.nextNode())!==null&&l.length<d;){if(s.nodeType===1){if(s.hasAttributes())for(const g of s.getAttributeNames())if(g.endsWith(Ss)){const P=y[p++],C=s.getAttribute(g).split(N),S=/([.?@])?(.*)/.exec(P);l.push({type:1,index:o,name:S[2],strings:C,ctor:S[1]==="."?ji:S[1]==="?"?Ni:S[1]==="@"?Bi:Qe}),s.removeAttribute(g)}else g.startsWith(N)&&(l.push({type:6,index:o}),s.removeAttribute(g));if(Ps.test(s.tagName)){const g=s.textContent.split(N),P=g.length-1;if(P>0){s.textContent=Le?Le.emptyScript:"";for(let C=0;C<P;C++)s.append(g[C],xe()),q.nextNode(),l.push({type:2,index:++o});s.append(g[P],xe())}}}else if(s.nodeType===8)if(s.data===Ds)l.push({type:2,index:o});else{let g=-1;for(;(g=s.data.indexOf(N,g+1))!==-1;)l.push({type:7,index:o}),g+=N.length-1}o++}}static createElement(e,t){const n=X.createElement("template");return n.innerHTML=e,n}}function te(a,e,t=a,n){if(e===ee)return e;let s=n!==void 0?t._$Co?.[n]:t._$Cl;const o=ye(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(a),s._$AT(a,t,n)),n!==void 0?(t._$Co??=[])[n]=s:t._$Cl=s),s!==void 0&&(e=te(a,s._$AS(a,e.values),s,n)),e}class Ui{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:n}=this._$AD,s=(e?.creationScope??X).importNode(t,!0);q.currentNode=s;let o=q.nextNode(),p=0,d=0,l=n[0];for(;l!==void 0;){if(p===l.index){let f;l.type===2?f=new we(o,o.nextSibling,this,e):l.type===1?f=new l.ctor(o,l.name,l.strings,this,e):l.type===6&&(f=new Hi(o,this,e)),this._$AV.push(f),l=n[++d]}p!==l?.index&&(o=q.nextNode(),p++)}return q.currentNode=X,s}p(e){let t=0;for(const n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}}class we{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,s){this.type=2,this._$AH=D,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=te(this,e,t),ye(e)?e===D||e==null||e===""?(this._$AH!==D&&this._$AR(),this._$AH=D):e!==this._$AH&&e!==ee&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Li(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==D&&ye(this._$AH)?this._$AA.nextSibling.data=e:this.T(X.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:n}=e,s=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=ve.createElement(As(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(t);else{const o=new Ui(s,this),p=o.u(this.options);o.p(t),this.T(p),this._$AH=o}}_$AC(e){let t=ys.get(e.strings);return t===void 0&&ys.set(e.strings,t=new ve(e)),t}k(e){Ct(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let n,s=0;for(const o of e)s===t.length?t.push(n=new we(this.O(xe()),this.O(xe()),this,this.options)):n=t[s],n._$AI(o),s++;s<t.length&&(this._$AR(n&&n._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e&&e!==this._$AB;){const n=e.nextSibling;e.remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class Qe{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,s,o){this.type=1,this._$AH=D,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=D}_$AI(e,t=this,n,s){const o=this.strings;let p=!1;if(o===void 0)e=te(this,e,t,0),p=!ye(e)||e!==this._$AH&&e!==ee,p&&(this._$AH=e);else{const d=e;let l,f;for(e=o[0],l=0;l<o.length-1;l++)f=te(this,d[n+l],t,l),f===ee&&(f=this._$AH[l]),p||=!ye(f)||f!==this._$AH[l],f===D?e=D:e!==D&&(e+=(f??"")+o[l+1]),this._$AH[l]=f}p&&!s&&this.j(e)}j(e){e===D?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ji extends Qe{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===D?void 0:e}}class Ni extends Qe{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==D)}}class Bi extends Qe{constructor(e,t,n,s,o){super(e,t,n,s,o),this.type=5}_$AI(e,t=this){if((e=te(this,e,t,0)??D)===ee)return;const n=this._$AH,s=e===D&&n!==D||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,o=e!==D&&(n===D||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class Hi{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){te(this,e)}}const Vi=$t.litHtmlPolyfillSupport;Vi?.(ve,we),($t.litHtmlVersions??=[]).push("3.3.0");const Wi=(a,e,t)=>{const n=t?.renderBefore??e;let s=n._$litPart$;if(s===void 0){const o=t?.renderBefore??null;n._$litPart$=s=new we(e.insertBefore(xe(),o),o,void 0,t??{})}return s._$AI(a),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Tt=globalThis;class F extends Z{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Wi(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return ee}}F._$litElement$=!0,F.finalized=!0,Tt.litElementHydrateSupport?.({LitElement:F});const Yi=Tt.litElementPolyfillSupport;Yi?.({LitElement:F});(Tt.litElementVersions??=[]).push("4.2.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _e=a=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(a,e)}):customElements.define(a,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Gi={attribute:!0,type:String,converter:Me,reflect:!1,hasChanged:_t},qi=(a=Gi,e,t)=>{const{kind:n,metadata:s}=t;let o=globalThis.litPropertyMetadata.get(s);if(o===void 0&&globalThis.litPropertyMetadata.set(s,o=new Map),n==="setter"&&((a=Object.create(a)).wrapped=!0),o.set(t.name,a),n==="accessor"){const{name:p}=t;return{set(d){const l=e.get.call(this);e.set.call(this,d),this.requestUpdate(p,l,a)},init(d){return d!==void 0&&this.C(p,void 0,a,d),d}}}if(n==="setter"){const{name:p}=t;return function(d){const l=this[p];e.call(this,d),this.requestUpdate(p,l,a)}}throw Error("Unsupported decorator location: "+n)};function zs(a){return(e,t)=>typeof t=="object"?qi(a,e,t):((n,s,o)=>{const p=s.hasOwnProperty(o);return s.constructor.createProperty(o,n),p?Object.getOwnPropertyDescriptor(s,o):void 0})(a,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function O(a){return zs({...a,state:!0,attribute:!1})}var Xi=Object.defineProperty,Ki=Object.getOwnPropertyDescriptor,Os=(a,e,t,n)=>{for(var s=n>1?void 0:n?Ki(e,t):e,o=a.length-1,p;o>=0;o--)(p=a[o])&&(s=(n?p(e,t,s):p(s))||s);return n&&s&&Xi(e,t,s),s};let Re=class extends F{constructor(){super(...arguments),this.currentPage="home",this.baseUrl="/LitFeature/"}handleNavigation(a){this.currentPage=a,this.dispatchEvent(new CustomEvent("navigate",{detail:{page:a},bubbles:!0,composed:!0}))}render(){return u`
      <nav>
        <div class="logo" @click=${()=>this.handleNavigation("home")}>
          ⚡ LitFeature
        </div>
        <ul class="nav-links">
          <li>
            <a
              href="${this.baseUrl}"
              @click=${a=>{a.preventDefault(),this.handleNavigation("home")}}
              class=${this.currentPage==="home"?"active":""}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="${this.baseUrl}demo"
              @click=${a=>{a.preventDefault(),this.handleNavigation("demo")}}
              class=${this.currentPage==="demo"?"active":""}
            >
              Demo
            </a>
          </li>
          <li>
            <a
              href="${this.baseUrl}docs"
              @click=${a=>{a.preventDefault(),this.handleNavigation("docs")}}
              class=${this.currentPage==="docs"?"active":""}
            >
              Docs
            </a>
          </li>
          <li>
            <a
              href="${this.baseUrl}stress-test"
              @click=${a=>{a.preventDefault(),this.handleNavigation("stress-test")}}
              class=${this.currentPage==="stress-test"?"active":""}
            >
              Stress Test
            </a>
          </li>
          <li>
            <a
              href="${this.baseUrl}super-stress-test"
              @click=${a=>{a.preventDefault(),this.handleNavigation("super-stress-test")}}
              class=${this.currentPage==="super-stress-test"?"active":""}
            >
              Super Stress Test
            </a>
          </li>
        </ul>
      </nav>
    `}};Re.styles=T`
    :host {
      display: block;
      background: linear-gradient(135deg, #030303 0%, #1a1a1a 100%);
      border-bottom: 2px solid #4d64ff;
      box-shadow: 0 4px 20px rgba(77, 100, 255, 0.1);
    }

    nav {
      max-width: 1200px;
      margin: 0 auto;
      padding: 24px 32px;
      display: flex;
      align-items: center;
      gap: 32px;
    }

    .logo {
      font-size: 24px;
      font-weight: 700;
      background: linear-gradient(135deg, #4d64ff 0%, #90ffff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      cursor: pointer;
      transition: transform 0.2s ease;
      margin-right: 16px;
    }

    .logo:hover {
      transform: scale(1.05);
    }

    .nav-links {
      display: flex;
      gap: 24px;
      margin-left: auto;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    a {
      color: #90ffff;
      text-decoration: none;
      font-size: 16px;
      font-weight: 500;
      transition: all 0.3s ease;
      padding: 8px 16px;
      border-radius: 6px;
      position: relative;
    }

    a:hover {
      color: #4d64ff;
      background: rgba(77, 100, 255, 0.1);
      transform: translateY(-2px);
    }

    a.active {
      color: #4d64ff;
      background: rgba(77, 100, 255, 0.15);
      border-bottom: 2px solid #4d64ff;
      padding-bottom: 6px;
    }

    /* Extra Small Devices (375px - 479px) */
    @media (max-width: 479px) {
      nav {
        flex-direction: column;
        align-items: stretch;
        gap: 12px;
        padding: 12px 12px;
      }

      .logo {
        font-size: 20px;
        margin-right: 0;
        text-align: center;
      }

      .nav-links {
        margin-left: 0;
        gap: 0;
        flex-direction: column;
      }

      .nav-links li {
        width: 100%;
      }

      .nav-links a {
        display: block;
        padding: 12px 12px;
        font-size: 14px;
        width: 100%;
        text-align: center;
        border-radius: 8px;
      }

      a.active {
        border-bottom: none;
        padding-bottom: 12px;
      }
    }

    /* Small Devices (480px - 639px) */
    @media (min-width: 480px) and (max-width: 639px) {
      nav {
        flex-direction: column;
        align-items: flex-start;
        gap: 14px;
        padding: 14px 16px;
      }

      .logo {
        font-size: 22px;
        margin-right: 0;
      }

      .nav-links {
        margin-left: 0;
        gap: 12px;
        width: 100%;
      }

      .nav-links a {
        font-size: 14px;
        padding: 10px 14px;
      }
    }

    /* Medium Devices (640px - 767px) */
    @media (min-width: 640px) and (max-width: 767px) {
      nav {
        flex-direction: row;
        padding: 18px 20px;
        gap: 24px;
      }

      .logo {
        font-size: 22px;
        margin-right: auto;
      }

      .nav-links {
        gap: 12px;
      }

      .nav-links a {
        font-size: 14px;
        padding: 8px 12px;
      }
    }

    /* Tablet & Small Laptop (768px - 1023px) */
    @media (min-width: 768px) and (max-width: 1023px) {
      nav {
        padding: 20px 24px;
        gap: 28px;
      }

      .logo {
        font-size: 22px;
      }

      .nav-links {
        gap: 18px;
      }

      .nav-links a {
        font-size: 15px;
      }
    }

    /* Large Devices (1024px+) */
    @media (min-width: 1024px) {
      /* Default styles already set */
    }
  `;Os([zs()],Re.prototype,"currentPage",2);Re=Os([_e("nav-bar")],Re);var Ji=Object.getOwnPropertyDescriptor,Qi=(a,e,t,n)=>{for(var s=n>1?void 0:n?Ji(e,t):e,o=a.length-1,p;o>=0;o--)(p=a[o])&&(s=p(s)||s);return s};let gt=class extends F{render(){return u`
      <div class="hero">
        <div class="eyebrow">LitElement Proposal</div>
        <h1>Composable Features for Lit</h1>
        <p class="lead">
          A proof-of-concept exploring an ergonomics-focused alternative to deep mixin stacks when building
          component libraries and design systems with Lit.
        </p>
        <div class="byline">A proposal by Stephen Rios</div>
        <button class="cta-button" @click="${this._goToDemo}">
          → View the Demo
        </button>
      </div>

      <div class="content">
        <div class="two-column">
          <!-- What is LitFeature -->
          <section class="section">
            <h2>What is LitFeature?</h2>
            <p>
              Large design systems need to compose multiple independent behaviors (status indicators, visibility management,
              dismissal logic, timers) while enabling/disabling them per component or per subtree. Traditional approaches often
              lead to unnecessary complexity and brittle deep mixin stacks.
            </p>
            <p>
              <strong>LitFeature</strong> introduces a cleaner model: <span class="highlight">features</span> are small,
              single-responsibility units of behavior that can be <span class="highlight">provided</span> by base classes and
              <span class="highlight">configured</span> by subclasses, while participating fully in Lit's reactive property
              system and component lifecycle.
            </p>
          </section>

          <!-- Core Concepts -->
          <section class="section">
            <h2>Core Concepts</h2>
            <ul>
              <li>
                <strong>Features:</strong> Specialized controllers that encapsulate single-responsibility behavior like status
                management, visibility, dismissal, or timers.
              </li>
              <li>
                <strong>Provide:</strong> Base classes declare which features they make available to themselves and subclasses.
              </li>
              <li>
                <strong>Configure:</strong> Subclasses override or disable inherited features, with configs that deep-merge down
                the inheritance chain.
              </li>
              <li>
                <strong>Property Integration:</strong> Feature properties automatically become host properties in Lit's reactive
                system.
              </li>
              <li>
                <strong>Lifecycle Participation:</strong> Features hook into host lifecycle events and can communicate with each
                other.
              </li>
            </ul>
          </section>
        </div>

        <div class="single-column">
          <!-- Why This Matters -->
          <section class="section">
            <h2>Why This Matters</h2>
            <ul>
              <li>
                <strong>Scalability:</strong> Add new behaviors to design systems by composing features, not by creating new
                mixin chains.
              </li>
              <li>
                <strong>Maintainability:</strong> Each feature is self-contained. Changes to one don't cascade through mixins.
              </li>
              <li>
                <strong>Flexibility:</strong> Enable/disable behaviors per component or per use-case using configuration.
              </li>
              <li>
                <strong>Clarity:</strong> Decorators and static getters make feature composition explicit and easy to follow.
              </li>
              <li>
                <strong>Inheritance-Aware:</strong> Leverage JavaScript's class inheritance system with first-class support for
                features.
              </li>
            </ul>
          </section>
        </div>

        <div class="single-column">
          <!-- Integration Goal -->
          <section class="section">
            <h2>Integration Goal</h2>
            <p>
              This proof-of-concept demonstrates the desired developer experience. The architecture (LitCore, LitFeature,
              decorators, and FeatureManager) would ideally be integrated directly into LitElement and ReactiveElement, making
              features a native part of Lit's component model rather than a separate library.
            </p>
          </section>
        </div>

        <!-- Footer -->
        <footer class="footer">
          <p>Composable Features for Lit © 2026 by Stephen Rios. Open source under <a href="https://opensource.org/licenses/Apache-2.0" target="_blank">Apache 2.0</a></p>
        </footer>
      </div>
    `}_goToDemo(){this.dispatchEvent(new CustomEvent("navigate",{detail:{page:"demo"},bubbles:!0,composed:!0}))}};gt.styles=T`
    :host {
      display: block;
      width: 100%;
      color: #f2f2f2;
      font-family: 'IBM Plex Sans', 'Space Grotesk', 'Segoe UI', system-ui, sans-serif;
    }

    :host * {
      box-sizing: border-box;
    }

    .hero {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 12px;
      margin-bottom: 48px;
    }

    .eyebrow {
      text-transform: uppercase;
      letter-spacing: 0.24em;
      font-size: 11px;
      font-weight: 600;
      color: #7dd3fc;
    }

    h1 {
      font-size: 52px;
      line-height: 1.1;
      margin: 0;
      letter-spacing: -0.02em;
      background: linear-gradient(135deg, #7dd3fc 0%, #34d399 60%, #fbbf24 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-weight: 700;
    }

    .lead {
      font-size: 17px;
      line-height: 1.7;
      color: #cbd5f5;
      max-width: 800px;
      margin: 0 auto;
    }

    .byline {
      font-size: 13px;
      color: #94a3af;
      margin: 12px 0;
      font-style: italic;
    }

    .cta-button {
      display: block;
      padding: 12px 32px;
      margin: 0 auto;
      width: 100%;
      max-width: 240px;
      background: linear-gradient(135deg, #7dd3fc 0%, #34d399 100%);
      color: #0a0f1a;
      border: none;
      border-radius: 10px;
      font-size: 15px;
      font-weight: 700;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.3s ease;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      box-shadow: 0 4px 12px rgba(125, 211, 252, 0.2);
      text-align: center;
    }

    .cta-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(125, 211, 252, 0.35);
    }

    .content {
      margin: 0;
    }

    .content > .two-column {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 56px;
    }

    .content > .single-column {
      max-width: 900px;
      margin: 0 auto 56px;
    }

    section {
      margin-bottom: 56px;
      padding: 0;
    }

    section.section {
      background: #0b0f19;
      border-radius: 14px;
      border: 1px solid rgba(125, 211, 252, 0.15);
      padding: 36px;
      transition: all 0.2s ease;
    }

    section.section:hover {
      border-color: rgba(125, 211, 252, 0.25);
      background: #0d1220;
    }

    h2 {
      margin: 0 0 24px;
      font-size: 28px;
      font-weight: 700;
      color: #bae6fd;
      display: flex;
      align-items: center;
      gap: 12px;
      letter-spacing: -0.01em;
    }

    h2::before {
      content: '';
      display: inline-block;
      width: 4px;
      height: 28px;
      background: linear-gradient(180deg, #7dd3fc 0%, #34d399 100%);
      border-radius: 2px;
    }

    .section p {
      color: #cbd5f5;
      font-size: 15px;
      line-height: 1.75;
      margin: 0 0 16px 0;
    }

    .section p:last-child {
      margin-bottom: 0;
    }

    .section ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .section li {
      padding: 16px 0;
      color: #cbd5f5;
      font-size: 15px;
      line-height: 1.75;
      border-bottom: 1px solid rgba(125, 211, 252, 0.1);
    }

    .section li:first-child {
      padding-top: 0;
    }

    .section li:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    .section strong {
      color: #e0f2fe;
      font-weight: 600;
    }

    .highlight {
      color: #7dd3fc;
      font-weight: 600;
    }

    .footer {
      margin-top: 64px;
      padding-top: 32px;
      border-top: 1px solid rgba(125, 211, 252, 0.1);
      text-align: center;
      font-size: 13px;
      color: #94a3af;
    }

    .footer a {
      color: #7dd3fc;
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .footer a:hover {
      color: #e0f2fe;
    }

    .hero {
      text-align: center;
    }

    /* Extra Small Devices (375px - 479px) */
    @media (max-width: 479px) {
      h1 {
        font-size: 28px;
        line-height: 1.2;
      }

      h2 {
        font-size: 18px;
        margin: 20px 0 12px 0;
      }

      .lead {
        font-size: 14px;
        line-height: 1.6;
      }

      .byline {
        font-size: 12px;
      }

      section.section {
        padding: 16px;
        margin-bottom: 24px;
      }

      .content > .two-column {
        grid-template-columns: 1fr;
        gap: 16px;
        margin-bottom: 32px;
      }

      .content > .single-column {
        margin: 0 0 32px;
      }

      .cta-button {
        padding: 10px 24px;
        font-size: 13px;
        width: 100%;
        max-width: 280px;
      }

      .section ul {
        margin: 0;
      }

      .section li {
        padding: 12px 0;
        font-size: 13px;
      }

      .footer {
        font-size: 12px;
        margin-top: 40px;
      }
    }

    /* Small Devices (480px - 639px) */
    @media (min-width: 480px) and (max-width: 639px) {
      h1 {
        font-size: 32px;
      }

      h2 {
        font-size: 20px;
      }

      .lead {
        font-size: 15px;
      }

      section.section {
        padding: 20px;
      }

      .content > .two-column {
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .cta-button {
        padding: 11px 28px;
        font-size: 14px;
      }

      .section li {
        font-size: 14px;
      }
    }

    /* Medium Devices (640px - 767px) */
    @media (min-width: 640px) and (max-width: 767px) {
      h1 {
        font-size: 36px;
      }

      h2 {
        font-size: 22px;
      }

      .lead {
        font-size: 16px;
      }

      section.section {
        padding: 24px;
      }

      .content > .two-column {
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .content > .single-column {
        max-width: 100%;
      }

      .cta-button {
        padding: 12px 30px;
        font-size: 14px;
        max-width: 260px;
      }
    }

    /* Tablet & Small Laptop (768px - 1023px) */
    @media (min-width: 768px) and (max-width: 1023px) {
      h1 {
        font-size: 44px;
      }

      h2 {
        font-size: 26px;
      }

      .lead {
        font-size: 16px;
        max-width: 700px;
      }

      section.section {
        padding: 28px;
      }

      .content > .two-column {
        gap: 18px;
      }

      .cta-button {
        max-width: 260px;
      }
    }

    /* Large Devices (1024px+) */
    @media (min-width: 1024px) {
      /* Default styles already set */
    }
  `;gt=Qi([_e("home-page")],gt);var Zi=Object.getOwnPropertyDescriptor,ea=(a,e,t,n)=>{for(var s=n>1?void 0:n?Zi(e,t):e,o=a.length-1,p;o>=0;o--)(p=a[o])&&(s=p(s)||s);return s};let bt=class extends F{constructor(){super(...arguments),this.hashChangeHandler=()=>this.handleHashNavigation()}connectedCallback(){super.connectedCallback(),window.addEventListener("hashchange",this.hashChangeHandler),this.updateComplete.then(()=>{window.location.hash&&this.handleHashNavigation()})}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("hashchange",this.hashChangeHandler)}handleHashNavigation(){const a=window.location.hash.split("#")[2];if(console.warn(a),a){const e=this.shadowRoot?.getElementById(a);if(e){const t=e.getBoundingClientRect(),n=window.scrollY+t.top-15;window.scrollTo({top:n,behavior:"smooth"})}}}render(){return u`
      <div class="hero">
        <div class="eyebrow">Documentation</div>
        <h1>Feature Authoring & Composition</h1>
        <p class="lead">
          Master the LitFeature workflow: author custom features, attach them to components, configure across inheritance chains, and extend with additional behavior.
        </p>
      </div>

      <div class="toc">
        <a href="#docs#author-feature" style="text-decoration: none; color: inherit;">
          <div class="toc-card">
            <h3>Create a Feature</h3>
            <p>Define properties, styles, and behavior in a LitFeature subclass.</p>
          </div>
        </a>
        <a href="#docs#attach-feature" style="text-decoration: none; color: inherit;">
          <div class="toc-card">
            <h3>Attach to a Component</h3>
            <p>Wire a feature into a host using @provide or static provide.</p>
          </div>
        </a>
        <a href="#docs#configure-compose" style="text-decoration: none; color: inherit;">
          <div class="toc-card">
            <h3>Configure & Compose</h3>
            <p>Override config and compose multiple features together.</p>
          </div>
        </a>
        <a href="#docs#extend-features" style="text-decoration: none; color: inherit;">
          <div class="toc-card">
            <h3>Extend Features</h3>
            <p>Subclass existing features to add custom behavior and properties.</p>
          </div>
        </a>
      </div>

      <section id="author-feature">
        <div class="section-header">
          <div class="section-number">1</div>
          <h2>Author a Feature</h2>
          <p class="section-lead">
            LitFeature provides a structured way to encapsulate reusable functionality across multiple components using the same patterns you'd use in a standard LitElement.
          </p>
        </div>

        <div class="subsection">
          <h3>Creating a Feature</h3>
          <p>
            Define a class that extends <code>LitFeature</code>. The constructor receives the host component instance and a config object with any options passed when the feature is attached.
          </p>
          <p>
            In this guide, we'll build a <code>CounterFeature</code>—a simple feature that manages a counter with increment and decrement functionality.
          </p>
          <div class="code-block">
            <pre><code><span class="token keyword">import</span> { LitFeature } <span class="token keyword">from</span> <span class="token string">'lit-feature'</span>;

<span class="token keyword">export class</span> <span class="token class-name">CounterFeature</span> <span class="token keyword">extends</span> LitFeature {
  <span class="token keyword">constructor</span>(host, config) {
    <span class="token keyword">super</span>(host, config);
    <span class="token comment">// Initialize counter to 0</span>
    <span class="token keyword">this</span>.count = 0;
  }

  <span class="token keyword">increment</span>() {
    <span class="token keyword">this</span>.count += <span class="token keyword">this</span>.step ?? 1;
  }

  <span class="token keyword">decrement</span>() {
    <span class="token keyword">this</span>.count -= <span class="token keyword">this</span>.step ?? 1;
  }
}</code></pre>
          </div>
        </div>

        <div class="subsection">
          <h3>TypeScript Support</h3>
          <p>
            LitFeature provides strong typing for properties and configuration. Use a generic type parameter to specify the config object shape and strongly type your feature.
          </p>

          <div class="code-block">
            <pre><code><span class="token keyword">import</span> { LitFeature } <span class="token keyword">from</span> <span class="token string">'lit-feature'</span>;
<span class="token keyword">import type</span> { LitCore } <span class="token keyword">from</span> <span class="token string">'lit-core'</span>;

<span class="token keyword">interface</span> <span class="token class-name">CounterConfig</span> {
  initialValue?: <span class="token keyword">number</span>;
  step?: <span class="token keyword">number</span>;
}

<span class="token keyword">export class</span> <span class="token class-name">CounterFeature</span> <span class="token keyword">extends</span> LitFeature&lt;CounterConfig&gt; {
  <span class="token keyword">constructor</span>(host: LitCore, config: CounterConfig = {}) {
    <span class="token keyword">super</span>(host, config);
    <span class="token keyword">this</span>.count = config.initialValue ?? 0;
    <span class="token keyword">this</span>.step = config.step ?? 1;
  }
}</code></pre>
          </div>
        </div>

        <div class="subsection">
          <h3>Declaring Properties</h3>
          <p>
            Use the static <code>properties</code> object to declare reactive properties. They'll automatically merge into the host component and work with Lit's reactivity system.
          </p>
          <div class="signature"><code>static properties: { [propertyName]: { type: PropertyType, reflect?: boolean } }</code></div>

          <div class="code-block">
            <pre><code><span class="token keyword">export class</span> <span class="token class-name">CounterFeature</span> <span class="token keyword">extends</span> LitFeature {
  <span class="token keyword">static</span> properties = {
    count: { type: Number },
    step: { type: Number }
  };

  <span class="token keyword">constructor</span>(host, config = {}) {
    <span class="token keyword">super</span>(host, config);
    <span class="token keyword">this</span>.count = config.initialValue ?? 0;
    <span class="token keyword">this</span>.step = config.step ?? 1;
  }

  <span class="token keyword">increment</span>() {
    <span class="token keyword">this</span>.count += <span class="token keyword">this</span>.step;
  }

  <span class="token keyword">decrement</span>() {
    <span class="token keyword">this</span>.count -= <span class="token keyword">this</span>.step;
  }
}</code></pre>
          </div>

          <p>
            You can also use the <code>@property</code> decorator for a more concise syntax.
          </p>
          <div class="signature"><code>@property(options?: { type?: PropertyType, reflect?: boolean, attribute?: string })</code></div>

          <div class="code-block">
            <pre><code><span class="token keyword">import</span> { <span class="token function">property</span> } <span class="token keyword">from</span> <span class="token string">'feature-property'</span>;

<span class="token keyword">export class</span> <span class="token class-name">CounterFeature</span> <span class="token keyword">extends</span> LitFeature {
  <span class="token keyword">@property</span>({ type: Number })
  count = 0;

  <span class="token keyword">@property</span>({ type: Number })
  step = 1;

  <span class="token keyword">constructor</span>(host, config = {}) {
    <span class="token keyword">super</span>(host, config);
    <span class="token keyword">this</span>.count = config.initialValue ?? 0;
    <span class="token keyword">this</span>.step = config.step ?? 1;
  }

  <span class="token keyword">increment</span>() {
    <span class="token keyword">this</span>.count += <span class="token keyword">this</span>.step;
  }

  <span class="token keyword">decrement</span>() {
    <span class="token keyword">this</span>.count -= <span class="token keyword">this</span>.step;
  }
}</code></pre>
          </div>

          <p>
            When a feature attaches properties to a host, the host can declare those properties to enable strict type checking and IntelliSense. You can also declare the feature instance itself on the host component class.
          </p>
          <div class="signature"><code>@provide(name: string, options: { class: FeatureClass, config?: Record&lt;string, any&gt; })</code></div>

          <div class="code-block">
            <pre><code><span class="token keyword">import</span> { LitCore } <span class="token keyword">from</span> <span class="token string">'lit-core'</span>;
<span class="token keyword">import</span> { provide } <span class="token keyword">from</span> <span class="token string">'decorators'</span>;
<span class="token keyword">import</span> { CounterFeature } <span class="token keyword">from</span> <span class="token string">'counter-feature'</span>;

<span class="token keyword">@provide</span>(<span class="token string">'Counter'</span>, {
    class: CounterFeature,
    config: { initialValue: 0, step: 1 }
})
<span class="token keyword">export class</span> <span class="token class-name">CounterButton</span> <span class="token keyword">extends</span> LitCore {
  
  <span class="token keyword">declare</span> Counter: CounterFeature;
  <span class="token keyword">declare</span> count: <span class="token keyword">number</span>;
  <span class="token keyword">declare</span> step: <span class="token keyword">number</span>;

  <span class="token keyword">onClick</span>() {
    <span class="token keyword">this</span>.Counter.increment(); <span class="token comment">// Access feature methods</span>
    console.log(<span class="token string">'Count is now:'</span>, <span class="token keyword">this</span>.count);
  }
}</code></pre>
          </div>
        </div>

        <div class="subsection">
          <h3>Defining Styles</h3>
          <p>
            Features can define styles that merge into the host component. These styles are also inherited by feature subclasses.
          </p>

          <div class="code-block">
            <pre><code><span class="token keyword">import</span> { LitFeature, css } <span class="token keyword">from</span> <span class="token string">'lit-feature'</span>;

<span class="token keyword">export class</span> <span class="token class-name">CounterFeature</span> <span class="token keyword">extends</span> LitFeature {
  <span class="token keyword">@property</span>({ type: Number })
  count = 0;

  <span class="token keyword">@property</span>({ type: Number })
  step = 1;

  <span class="token keyword">static</span> styles = css&grave;
    :host {
      display: inline-flex;
      gap: 8px;
      align-items: center;
    }

    .counter-display {
      font-size: 18px;
      font-weight: bold;
      min-width: 40px;
      text-align: center;
    }
  &grave;;

  <span class="token keyword">constructor</span>(host, config = {}) {
    <span class="token keyword">super</span>(host, config);
    <span class="token keyword">this</span>.count = config.initialValue ?? 0;
    <span class="token keyword">this</span>.step = config.step ?? 1;
  }

  <span class="token keyword">increment</span>() {
    <span class="token keyword">this</span>.count += <span class="token keyword">this</span>.step;
  }

  <span class="token keyword">decrement</span>() {
    <span class="token keyword">this</span>.count -= <span class="token keyword">this</span>.step;
  }
}</code></pre>
          </div>
        </div>

        <div class="subsection">
          <h3>Lifecycle Hooks</h3>
          <p>
            LitFeature supports all Lit lifecycle hooks which integrate with the host component's lifecycle. Just make sure to call <code>super[hook](...args)</code> in your overrides to maintain proper behavior.
          </p>

          <div class="code-block">
            <pre><code><span class="token keyword">export class</span> <span class="token class-name">CounterFeature</span> <span class="token keyword">extends</span> LitFeature {
  <span class="token keyword">@property</span>({ type: Number })
  count = 0;

  <span class="token keyword">@property</span>({ type: Number })
  step = 1;

  <span class="token keyword">connectedCallback</span>() {
    <span class="token keyword">super</span>.connectedCallback();
    <span class="token comment">// Code to run when host component is connected to the DOM</span>
    console.log(<span class="token string">'CounterFeature connected'</span>);
  }

  <span class="token keyword">disconnectedCallback</span>() {
    <span class="token keyword">super</span>.disconnectedCallback();
    <span class="token comment">// Code to run when host component is disconnected from the DOM</span>
    console.log(<span class="token string">'CounterFeature disconnected'</span>);
  }

  <span class="token keyword">updated</span>(changedProperties) {
    <span class="token keyword">super</span>.updated(changedProperties);
    <span class="token comment">// Code to run when host component updates</span>
    console.log(<span class="token string">'CounterFeature updated'</span>, changedProperties);
  }
}</code></pre>
          </div>
        </div>
      </section>

      <section id="attach-feature">
        <div class="section-header">
          <div class="section-number">2</div>
          <h2>Attach a Feature</h2>
          <p class="section-lead">
            Once you've authored a feature, you can attach it to any LitCore component using the <code>@provide</code> decorator or the static <code>provide</code> getter. This wires the feature's properties, styles, and behavior into the host component.
          </p>
        </div>

        <div class="subsection">
          <h3>Using the @provide Decorator</h3>
          <p>
            Use the <code>@provide</code> decorator to attach a feature to a component. The decorator takes a name for the feature and an options object where you specify the feature class and any configuration.
          </p>
          <p>
            All properties from the feature become available on the host component, and the feature instance itself is accessible via the name you provided.
          </p>
          <div class="signature"><code>@provide(name: string, options: { class: FeatureClass, config?: Record&lt;string, any&gt; })</code></div>

          <div class="code-block">
            <pre><code><span class="token keyword">import</span> { LitCore } <span class="token keyword">from</span> <span class="token string">'lit-core'</span>;
<span class="token keyword">import</span> { provide } <span class="token keyword">from</span> <span class="token string">'decorators'</span>;
<span class="token keyword">import</span> { CounterFeature } <span class="token keyword">from</span> <span class="token string">'counter-feature'</span>;

<span class="token keyword">@provide</span>(<span class="token string">'Counter'</span>, {
  class: CounterFeature,
  config: { initialValue: 0, step: 1 }
})
<span class="token keyword">export class</span> <span class="token class-name">CounterButton</span> <span class="token keyword">extends</span> LitCore {
  
  <span class="token keyword">declare</span> Counter: CounterFeature;
  <span class="token keyword">declare</span> count: <span class="token keyword">number</span>;
  <span class="token keyword">declare</span> step: <span class="token keyword">number</span>;

  <span class="token keyword">override</span> render() {
    <span class="token keyword">return</span> html\`
      &lt;button @click=\${<span class="token keyword">this</span>.Counter.increment}&gt;
        Increment
      &lt;/button&gt;
      &lt;div class=<span class="token string">"counter-display"</span>&gt;\${<span class="token keyword">this</span>.count}&lt;/div&gt;
      &lt;button @click=\${<span class="token keyword">this</span>.Counter.decrement}&gt;
        Decrement
      &lt;/button&gt;
    \`;
  }
}</code></pre>
          </div>
        </div>

        <div class="subsection">
          <h3>Using the Static provide Getter</h3>
          <p>
            Alternatively, you can use the static <code>provide</code> getter to attach features without decorators. This approach is useful when you prefer a more explicit, class-based syntax or when decorators aren't available.
          </p>
          <div class="signature"><code>static provide: { [featureName]: { class: FeatureClass, config?: Record&lt;string, any&gt; } }</code></div>

          <div class="code-block">
            <pre><code><span class="token keyword">import</span> { LitCore } <span class="token keyword">from</span> <span class="token string">'lit-core'</span>;
<span class="token keyword">import</span> { CounterFeature } <span class="token keyword">from</span> <span class="token string">'counter-feature'</span>;

<span class="token keyword">export class</span> <span class="token class-name">CounterButton</span> <span class="token keyword">extends</span> LitCore {
  
  <span class="token keyword">declare</span> Counter: CounterFeature;
  <span class="token keyword">declare</span> count: <span class="token keyword">number</span>;
  <span class="token keyword">declare</span> step: <span class="token keyword">number</span>;

  <span class="token keyword">static</span> provide = {
    Counter: {
      class: CounterFeature,
      config: { initialValue: 0, step: 1 }
    }
  };

  <span class="token keyword">override</span> render() {
    <span class="token keyword">return</span> html\`
      &lt;button @click=\${<span class="token keyword">this</span>.Counter.increment}&gt;
        Increment
      &lt;/button&gt;
      &lt;div class=<span class="token string">"counter-display"</span>&gt;\${<span class="token keyword">this</span>.count}&lt;/div&gt;
      &lt;button @click=\${<span class="token keyword">this</span>.Counter.decrement}&gt;
        Decrement
      &lt;/button&gt;
    \`;
  }
}</code></pre>
          </div>
        </div>

        <div class="subsection">
          <h3>Accessing Feature Properties</h3>
          <p>
            When a feature is attached, all of its properties are automatically merged into the host component. You can access them directly via <code>this.propertyName</code> or through the feature instance like <code>this.FeatureName.propertyName</code>.
          </p>
          <p>
            It's recommended to use PascalCase for the feature name to make it clear that it's a feature instance, and declare the feature and its properties on your component class for TypeScript support.
          </p>

          <div class="code-block">
            <pre><code><span class="token keyword">@provide</span>(<span class="token string">'Counter'</span>, {
  class: CounterFeature,
  config: { initialValue: 10, step: 2 }
})
<span class="token keyword">export class</span> <span class="token class-name">MyComponent</span> <span class="token keyword">extends</span> LitCore {
  
  <span class="token comment">// Declare the feature instance</span>
  <span class="token keyword">declare</span> Counter: CounterFeature;
  
  <span class="token comment">// Declare feature properties for type safety</span>
  <span class="token keyword">declare</span> count: <span class="token keyword">number</span>;
  <span class="token keyword">declare</span> step: <span class="token keyword">number</span>;

  logCount() {
    <span class="token comment">// Access via host property</span>
    console.log(<span class="token string">'Count:'</span>, <span class="token keyword">this</span>.count);
    
    <span class="token comment">// Or access via feature instance</span>
    console.log(<span class="token string">'Count:'</span>, <span class="token keyword">this</span>.Counter.count);
    
    <span class="token comment">// Both reference the same value</span>
  }
}</code></pre>
          </div>
        </div>

        <div class="subsection">
          <h3>Configuration Objects</h3>
          <p>
            Configuration objects are optional but provide a way to customize feature behavior when it's attached. The config is passed to the feature's constructor and can contain any data your feature needs.
          </p>
          <p>
            For TypeScript users, define an interface for your config to get autocomplete and type checking when attaching features.
          </p>

          <div class="code-block">
            <pre><code><span class="token comment">// Define config interface</span>
<span class="token keyword">interface</span> <span class="token class-name">CounterConfig</span> {
  initialValue?: <span class="token keyword">number</span>;
  step?: <span class="token keyword">number</span>;
  min?: <span class="token keyword">number</span>;
  max?: <span class="token keyword">number</span>;
}

<span class="token comment">// Feature uses config</span>
<span class="token keyword">export class</span> <span class="token class-name">CounterFeature</span> <span class="token keyword">extends</span> LitFeature&lt;CounterConfig&gt; {
  <span class="token keyword">constructor</span>(host: LitCore, config: CounterConfig = {}) {
    <span class="token keyword">super</span>(host, config);
    <span class="token keyword">this</span>.count = config.initialValue ?? 0;
    <span class="token keyword">this</span>.step = config.step ?? 1;
    <span class="token keyword">this</span>.min = config.min ?? -Infinity;
    <span class="token keyword">this</span>.max = config.max ?? Infinity;
  }
}

<span class="token comment">// Attach with custom config</span>
<span class="token keyword">@provide</span>(<span class="token string">'Counter'</span>, {
  class: CounterFeature,
  config: {
    initialValue: 50,
    step: 5,
    min: 0,
    max: 100
  }
})
<span class="token keyword">export class</span> <span class="token class-name">RangeCounter</span> <span class="token keyword">extends</span> LitCore {
  <span class="token keyword">declare</span> Counter: CounterFeature;
  <span class="token keyword">declare</span> count: <span class="token keyword">number</span>;
}</code></pre>
          </div>
        </div>
      </section>

      <section id="configure-compose">
        <div class="section-header">
          <div class="section-number">3</div>
          <h2>Configure & Compose</h2>
          <p class="section-lead">
            Customize feature behavior through configuration overrides in component subclasses and compose multiple features together to build rich, complex functionality.
          </p>
        </div>

        <div class="subsection">
          <h3>Overriding Configuration</h3>
          <p>
            When you extend a component that has features attached, you can override the feature's configuration to customize its behavior for the subclass. This allows you to reuse components while adapting features to specific use cases.
          </p>
          <p>
            Use the <code>@configure</code> decorator to override feature configuration in a subclass, or provide new config through the static <code>provide</code> getter.
          </p>
          <div class="signature"><code>@configure(featureName: string, config: Record&lt;string, any&gt;)</code></div>

          <div class="code-block">
            <pre><code><span class="token comment">// Base component with feature</span>
<span class="token keyword">@provide</span>(<span class="token string">'Counter'</span>, {
  class: CounterFeature,
  config: { initialValue: 0, step: 1 }
})
<span class="token keyword">export class</span> <span class="token class-name">CounterButton</span> <span class="token keyword">extends</span> LitCore {
  <span class="token keyword">declare</span> Counter: CounterFeature;
  <span class="token keyword">declare</span> count: <span class="token keyword">number</span>;
}

<span class="token comment">// Subclass with overridden config</span>
<span class="token keyword">@configure</span>(<span class="token string">'Counter'</span>, {
  initialValue: 100,
  step: 10
})
<span class="token keyword">export class</span> <span class="token class-name">FastCounterButton</span> <span class="token keyword">extends</span> CounterButton {
  <span class="token comment">// Counter now starts at 100 and increments by 10</span>
}</code></pre>
          </div>

          <p>
            Configuration overrides are merged with the parent config, so you only need to specify the properties you want to change.
          </p>

          <div class="code-block">
            <pre><code><span class="token keyword">@provide</span>(<span class="token string">'Counter'</span>, {
  class: CounterFeature,
  config: { initialValue: 0, step: 1, min: 0, max: 100 }
})
<span class="token keyword">export class</span> <span class="token class-name">BoundedCounter</span> <span class="token keyword">extends</span> LitCore {}

<span class="token comment">// Only override step, keep other config</span>
<span class="token keyword">@configure</span>(<span class="token string">'Counter'</span>, { step: 5 })
<span class="token keyword">export class</span> <span class="token class-name">FastBoundedCounter</span> <span class="token keyword">extends</span> BoundedCounter {
  <span class="token comment">// Inherits: initialValue: 0, min: 0, max: 100</span>
  <span class="token comment">// Overrides: step: 5</span>
}</code></pre>
          </div>
        </div>

        <div class="subsection">
          <h3>Multiple Feature Composition</h3>
          <p>
            Components can have multiple features attached simultaneously. Each feature operates independently but can interact with the host component's properties and methods.
          </p>
          <p>
            This enables powerful composition patterns where you combine small, focused features to build complex functionality.
          </p>

          <div class="code-block">
            <pre><code><span class="token keyword">import</span> { CounterFeature } <span class="token keyword">from</span> <span class="token string">'./counter-feature'</span>;
<span class="token keyword">import</span> { RippleFeature } <span class="token keyword">from</span> <span class="token string">'./ripple-feature'</span>;
<span class="token keyword">import</span> { ThemeFeature } <span class="token keyword">from</span> <span class="token string">'./theme-feature'</span>;

<span class="token keyword">@provide</span>(<span class="token string">'Counter'</span>, {
  class: CounterFeature,
  config: { initialValue: 0, step: 1 }
})
<span class="token keyword">@provide</span>(<span class="token string">'Ripple'</span>, {
  class: RippleFeature,
  config: { color: '#3b82f6' }
})
<span class="token keyword">@provide</span>(<span class="token string">'Theme'</span>, {
  class: ThemeFeature,
  config: { mode: 'dark' }
})
<span class="token keyword">export class</span> <span class="token class-name">RichCounterButton</span> <span class="token keyword">extends</span> LitCore {
  <span class="token keyword">declare</span> Counter: CounterFeature;
  <span class="token keyword">declare</span> Ripple: RippleFeature;
  <span class="token keyword">declare</span> Theme: ThemeFeature;

  <span class="token keyword">override</span> render() {
    <span class="token keyword">return</span> html\`
      &lt;button @click=\${<span class="token keyword">this</span>.Counter.increment}&gt;
        Count: \${<span class="token keyword">this</span>.Counter.count}
      &lt;/button&gt;
    \`;
  }
}</code></pre>
          </div>
        </div>
      </section>

      <section id="extend-features">
        <div class="section-header">
          <div class="section-number">4</div>
          <h2>Extend Features</h2>
          <p class="section-lead">
            Create specialized feature variants by extending existing features. Feature subclasses inherit properties, styles, and methods, allowing you to build feature hierarchies that share common behavior.
          </p>
        </div>

        <div class="subsection">
          <h3>Subclassing Features</h3>
          <p>
            Create new features by extending existing ones. Feature subclasses inherit properties, styles, and methods from their parent, allowing you to build specialized variants with additional functionality.
          </p>
          <p>
            This is useful for creating feature hierarchies where you want to share common behavior while customizing specific aspects.
          </p>

          <div class="code-block">
            <pre><code><span class="token comment">// Base feature</span>
<span class="token keyword">export class</span> <span class="token class-name">CounterFeature</span> <span class="token keyword">extends</span> LitFeature {
  <span class="token keyword">@property</span>({ type: Number })
  count = 0;

  <span class="token keyword">@property</span>({ type: Number })
  step = 1;

  <span class="token keyword">increment</span>() {
    <span class="token keyword">this</span>.count += <span class="token keyword">this</span>.step;
  }

  <span class="token keyword">decrement</span>() {
    <span class="token keyword">this</span>.count -= <span class="token keyword">this</span>.step;
  }
}

<span class="token comment">// Extended feature with boundaries</span>
<span class="token keyword">export class</span> <span class="token class-name">BoundedCounterFeature</span> <span class="token keyword">extends</span> CounterFeature {
  <span class="token keyword">@property</span>({ type: Number })
  min = -Infinity;

  <span class="token keyword">@property</span>({ type: Number })
  max = Infinity;

  <span class="token keyword">override</span> increment() {
    <span class="token keyword">const</span> newValue = <span class="token keyword">this</span>.count + <span class="token keyword">this</span>.step;
    <span class="token keyword">this</span>.count = Math.min(newValue, <span class="token keyword">this</span>.max);
  }

  <span class="token keyword">override</span> decrement() {
    <span class="token keyword">const</span> newValue = <span class="token keyword">this</span>.count - <span class="token keyword">this</span>.step;
    <span class="token keyword">this</span>.count = Math.max(newValue, <span class="token keyword">this</span>.min);
  }
}</code></pre>
          </div>
        </div>

        <div class="subsection">
          <h3>Adding New Properties</h3>
          <p>
            When extending features, you can add new reactive properties that work seamlessly with Lit's reactivity system. These properties are merged with the parent feature's properties and become available on the host component.
          </p>

          <div class="code-block">
            <pre><code><span class="token keyword">export class</span> <span class="token class-name">AnimatedCounterFeature</span> <span class="token keyword">extends</span> CounterFeature {
  <span class="token keyword">@property</span>({ type: Boolean })
  animating = <span class="token keyword">false</span>;

  <span class="token keyword">@property</span>({ type: Number })
  animationDuration = 300;

  <span class="token keyword">override</span> increment() {
    <span class="token keyword">this</span>.animating = <span class="token keyword">true</span>;
    <span class="token keyword">super</span>.increment();
    
    setTimeout(() =&gt; {
      <span class="token keyword">this</span>.animating = <span class="token keyword">false</span>;
    }, <span class="token keyword">this</span>.animationDuration);
  }

  <span class="token keyword">override</span> decrement() {
    <span class="token keyword">this</span>.animating = <span class="token keyword">true</span>;
    <span class="token keyword">super</span>.decrement();
    
    setTimeout(() =&gt; {
      <span class="token keyword">this</span>.animating = <span class="token keyword">false</span>;
    }, <span class="token keyword">this</span>.animationDuration);
  }
}

<span class="token comment">// Use the extended feature</span>
<span class="token keyword">@provide</span>(<span class="token string">'Counter'</span>, {
  class: AnimatedCounterFeature,
  config: { initialValue: 0, step: 1, animationDuration: 500 }
})
<span class="token keyword">export class</span> <span class="token class-name">AnimatedCounter</span> <span class="token keyword">extends</span> LitCore {
  <span class="token keyword">declare</span> Counter: AnimatedCounterFeature;
  <span class="token keyword">declare</span> count: <span class="token keyword">number</span>;
  <span class="token keyword">declare</span> animating: <span class="token keyword">boolean</span>;
}</code></pre>
          </div>
        </div>

        <div class="subsection">
          <h3>Extending Styles</h3>
          <p>
            Feature subclasses can extend their parent's styles using Lit's <code>css</code> and array syntax. Styles are merged automatically, with child styles taking precedence over parent styles.
          </p>

          <div class="code-block">
            <pre><code><span class="token keyword">import</span> { css } <span class="token keyword">from</span> <span class="token string">'lit'</span>;

<span class="token keyword">export class</span> <span class="token class-name">CounterFeature</span> <span class="token keyword">extends</span> LitFeature {
  <span class="token keyword">static</span> styles = css\`
    :host {
      display: inline-flex;
      gap: 8px;
    }
  \`;
}

<span class="token keyword">export class</span> <span class="token class-name">ThemedCounterFeature</span> <span class="token keyword">extends</span> CounterFeature {
  <span class="token keyword">static</span> styles = [
    CounterFeature.styles,
    css\`
      :host {
        background: var(--theme-bg, #1a1a1a);
        color: var(--theme-color, #ffffff);
        border-radius: 8px;
        padding: 12px;
      }

      :host([theme="primary"]) {
        --theme-bg: #3b82f6;
        --theme-color: #ffffff;
      }

      :host([theme="success"]) {
        --theme-bg: #22c55e;
        --theme-color: #ffffff;
      }
    \`
  ];
}

<span class="token keyword">@provide</span>(<span class="token string">'Counter'</span>, { class: ThemedCounterFeature })
<span class="token keyword">export class</span> <span class="token class-name">ThemedCounter</span> <span class="token keyword">extends</span> LitCore {
  <span class="token keyword">@property</span>({ reflect: <span class="token keyword">true</span> })
  theme = <span class="token string">'primary'</span>;
}</code></pre>
          </div>
        </div>

        <div class="subsection">
          <h3>Overriding Methods</h3>
          <p>
            Override parent methods to customize behavior while still leveraging the parent's implementation through <code>super</code> calls. This allows you to enhance or modify specific aspects of a feature without rewriting everything.
          </p>

          <div class="code-block">
            <pre><code><span class="token keyword">export class</span> <span class="token class-name">LoggingCounterFeature</span> <span class="token keyword">extends</span> CounterFeature {
  <span class="token keyword">override</span> increment() {
    console.log(<span class="token string">'Before increment:'</span>, <span class="token keyword">this</span>.count);
    <span class="token keyword">super</span>.increment();
    console.log(<span class="token string">'After increment:'</span>, <span class="token keyword">this</span>.count);
  }

  <span class="token keyword">override</span> decrement() {
    console.log(<span class="token string">'Before decrement:'</span>, <span class="token keyword">this</span>.count);
    <span class="token keyword">super</span>.decrement();
    console.log(<span class="token string">'After decrement:'</span>, <span class="token keyword">this</span>.count);
  }
}

<span class="token comment">// Or completely replace the behavior</span>
<span class="token keyword">export class</span> <span class="token class-name">DoubleCounterFeature</span> <span class="token keyword">extends</span> CounterFeature {
  <span class="token keyword">override</span> increment() {
    <span class="token comment">// Don't call super - completely new behavior</span>
    <span class="token keyword">this</span>.count += <span class="token keyword">this</span>.step * 2;
  }

  <span class="token keyword">override</span> decrement() {
    <span class="token keyword">this</span>.count -= <span class="token keyword">this</span>.step * 2;
  }
}</code></pre>
          </div>
        </div>
      </section>
    `}};bt.styles=T`
    :host {
      display: block;
      width: 100%;
      color: #f2f2f2;
      font-family: 'IBM Plex Sans', 'Space Grotesk', 'Segoe UI', system-ui, sans-serif;
    }

    :host * {
      box-sizing: border-box;
    }

    .hero {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 12px;
      margin-bottom: 48px;
    }

    .eyebrow {
      text-transform: uppercase;
      letter-spacing: 0.24em;
      font-size: 11px;
      font-weight: 600;
      color: #7dd3fc;
    }

    h1 {
      font-size: 52px;
      line-height: 1.1;
      margin: 0;
      letter-spacing: -0.02em;
      background: linear-gradient(135deg, #7dd3fc 0%, #34d399 60%, #fbbf24 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-weight: 700;
    }

    .lead {
      font-size: 17px;
      line-height: 1.7;
      color: #cbd5f5;
      max-width: 800px;
    }

    .pill-row {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 12px;
    }

    .pill {
      padding: 6px 12px;
      border-radius: 999px;
      background: rgba(125, 211, 252, 0.15);
      color: #7dd3fc;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .toc {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin: 40px 0 56px;
    }

    .toc-card {
      background: #111827;
      border-radius: 12px;
      padding: 20px;
      border: 1px solid rgba(125, 211, 252, 0.15);
      transition: all 0.2s ease;
    }

    .toc-card:hover {
      border-color: rgba(125, 211, 252, 0.3);
      background: #1a1f2e;
    }

    .toc-card h3 {
      margin: 0 0 8px;
      font-size: 15px;
      font-weight: 600;
      color: #e0f2fe;
    }

    .toc-card p {
      margin: 0;
      font-size: 13px;
      color: #94a3af;
      line-height: 1.5;
    }

    section {
      margin-bottom: 72px;
      position: relative;
    }

    .section-header {
      margin-bottom: 32px;
      padding: 24px 28px;
      background: linear-gradient(135deg, rgba(125, 211, 252, 0.12) 0%, rgba(52, 211, 153, 0.08) 100%);
      border-radius: 16px;
      border: 1px solid rgba(125, 211, 252, 0.25);
      position: relative;
      scroll-margin-top: 24px;
    }

    .section-number {
      display: inline-block;
      width: 36px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      background: linear-gradient(135deg, #7dd3fc 0%, #34d399 100%);
      color: #0a0f1a;
      border-radius: 10px;
      font-weight: 700;
      font-size: 16px;
      margin-bottom: 12px;
    }

    h2 {
      margin: 0;
      font-size: 32px;
      font-weight: 700;
      color: #e0f2fe;
      letter-spacing: -0.02em;
    }

    .section-lead {
      margin: 12px 0 0;
      font-size: 16px;
      line-height: 1.65;
      color: #a5b4fc;
      max-width: 800px;
    }

    .subsection {
      margin-bottom: 48px;
      padding: 28px;
      background: #0b0f19;
      border-radius: 14px;
      border: 1px solid rgba(148, 163, 184, 0.15);
      transition: all 0.2s ease;
    }

    .subsection:hover {
      border-color: rgba(125, 211, 252, 0.25);
      background: #0d1220;
    }

    h3 {
      margin: 0 0 16px;
      font-size: 20px;
      font-weight: 700;
      color: #bae6fd;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    h3::before {
      content: '';
      display: inline-block;
      width: 4px;
      height: 20px;
      background: linear-gradient(180deg, #7dd3fc 0%, #34d399 100%);
      border-radius: 2px;
    }

    h4 {
      margin: 24px 0 12px;
      font-size: 15px;
      font-weight: 600;
      color: #7dd3fc;
      letter-spacing: 0.02em;
    }

    p {
      margin: 0 0 16px;
      color: #cbd5f5;
      line-height: 1.75;
      font-size: 15px;
    }

    ul {
      margin: 0 0 16px;
      padding-left: 20px;
      color: #cbd5f5;
      line-height: 1.7;
      font-size: 15px;
    }

    li {
      margin-bottom: 8px;
    }

    .code-block {
      margin: 20px 0 24px;
      border-radius: 12px;
      background: #0a0f1a;
      border: 1px solid rgba(59, 130, 246, 0.3);
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    }

    .code-block::before {
      content: '';
      display: block;
      height: 32px;
      background: linear-gradient(90deg, rgba(59, 130, 246, 0.15) 0%, rgba(125, 211, 252, 0.1) 100%);
      border-bottom: 1px solid rgba(59, 130, 246, 0.2);
    }

    pre {
      margin: 0;
      padding: 20px;
      font-family: 'IBM Plex Mono', 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
      font-size: 13.5px;
      line-height: 1.7;
      color: #e2e8f0;
      overflow-x: auto;
    }

    code {
      color: #e2e8f0;
    }

    /* Syntax highlighting colors */
    .token.keyword {
      color: #f472b6;
    }

    .token.string {
      color: #86efac;
    }

    .token.function {
      color: #93c5fd;
    }

    .token.class-name {
      color: #fbbf24;
    }

    .token.comment {
      color: #6b7280;
    }

    .token.punctuation {
      color: #cbd5e1;
    }

    .note {
      border-left: 4px solid #34d399;
      background: linear-gradient(90deg, rgba(52, 211, 153, 0.12) 0%, rgba(52, 211, 153, 0.04) 100%);
      padding: 16px 20px;
      border-radius: 10px;
      margin: 24px 0;
      color: #d1fae5;
      font-size: 14.5px;
      line-height: 1.7;
    }

    .note::before {
      content: '✦ ';
      font-size: 14px;
      margin-right: 6px;
      font-weight: bold;
    }

    .grid-two {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
    }

    .card {
      background: #111827;
      padding: 20px;
      border-radius: 12px;
      border: 1px solid rgba(59, 130, 246, 0.15);
    }

    .card h4 {
      margin: 0 0 8px;
      font-size: 15px;
      font-weight: 600;
      color: #bae6fd;
    }

    .signature {
      padding: 16px 20px;
      background: linear-gradient(135deg, rgba(125, 211, 252, 0.10) 0%, rgba(59, 130, 246, 0.08) 100%);
      border-left: 4px solid #5dd3fc;
      border-radius: 10px;
      margin: 20px 0;
      font-family: 'IBM Plex Mono', 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
      font-size: 13.5px;
      color: #cffafe;
      line-height: 1.7;
      overflow-x: auto;
      border: 1px solid rgba(125, 211, 252, 0.2);
    }

    .signature::before {
      content: '✎ API';
      display: block;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #7dd3fc;
      margin-bottom: 8px;
      font-family: 'IBM Plex Sans', sans-serif;
    }

    /* Inline code styling */
    p code, li code {
      background: rgba(125, 211, 252, 0.15);
      color: #7dd3fc;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: 'IBM Plex Mono', monospace;
      font-size: 0.9em;
      font-weight: 500;
    }

    /* Visual separator between subsections */
    .subsection + .subsection {
      margin-top: 32px;
    }

    .footer {
      margin-top: 80px;
      text-align: center;
      color: #64748b;
      font-size: 13px;
    }

    /* Extra Small Devices (375px - 479px) */
    @media (max-width: 479px) {
      h1 {
        font-size: 28px;
        line-height: 1.2;
      }

      h2 {
        font-size: 20px;
      }

      h3 {
        font-size: 16px;
      }

      h4 {
        font-size: 14px;
      }

      .lead {
        font-size: 14px;
      }

      .pill-row {
        gap: 6px;
        margin-top: 8px;
      }

      .pill {
        padding: 4px 8px;
        font-size: 10px;
      }

      .toc {
        grid-template-columns: 1fr;
        gap: 12px;
        margin: 24px 0 32px;
      }

      .toc-card {
        padding: 16px;
      }

      .toc-card h3 {
        font-size: 14px;
      }

      .section-header {
        padding: 16px;
        margin-bottom: 20px;
      }

      .section-number {
        width: 32px;
        height: 32px;
        line-height: 32px;
        font-size: 14px;
      }

      .subsection {
        padding: 16px;
        margin-bottom: 24px;
      }

      h3 {
        gap: 6px;
      }

      h3::before {
        height: 16px;
      }

      .code-block {
        margin: 16px 0 20px;
      }

      pre {
        padding: 12px;
        font-size: 11px;
        line-height: 1.5;
      }

      .grid-two {
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .signature {
        padding: 12px 16px;
        font-size: 11px;
      }

      .note {
        padding: 12px 16px;
        font-size: 13px;
      }

      p {
        font-size: 14px;
      }

      ul {
        font-size: 14px;
        padding-left: 16px;
      }

      .footer {
        font-size: 11px;
        margin-top: 40px;
      }
    }

    /* Small Devices (480px - 639px) */
    @media (min-width: 480px) and (max-width: 639px) {
      h1 {
        font-size: 32px;
      }

      h2 {
        font-size: 22px;
      }

      .lead {
        font-size: 15px;
      }

      .toc {
        grid-template-columns: 1fr;
        gap: 14px;
        margin: 28px 0 40px;
      }

      .subsection {
        padding: 18px;
        margin-bottom: 28px;
      }

      .section-header {
        padding: 18px;
      }

      .code-block {
        margin: 18px 0 22px;
      }

      pre {
        padding: 14px;
        font-size: 12px;
      }

      .grid-two {
        grid-template-columns: 1fr;
      }
    }

    /* Medium Devices (640px - 767px) */
    @media (min-width: 640px) and (max-width: 767px) {
      h1 {
        font-size: 36px;
      }

      h2 {
        font-size: 24px;
      }

      .lead {
        font-size: 15px;
      }

      .toc {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 16px;
      }

      .subsection {
        padding: 20px;
      }

      .section-header {
        padding: 20px;
      }

      .grid-two {
        grid-template-columns: 1fr;
      }

      .code-block {
        margin: 20px 0 24px;
      }
    }

    /* Tablet & Small Laptop (768px - 1023px) */
    @media (min-width: 768px) and (max-width: 1023px) {
      h1 {
        font-size: 40px;
      }

      h2 {
        font-size: 26px;
      }

      .lead {
        font-size: 16px;
      }

      .toc {
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 16px;
      }

      .subsection {
        padding: 24px;
      }

      .section-header {
        padding: 24px;
      }

      .grid-two {
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 18px;
      }
    }

    /* Large Devices (1024px+) */
    @media (min-width: 1024px) {
      /* Default styles already set */
    }
  `;bt=ea([_e("docs-page")],bt);var Fe=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function ta(a){return a&&a.__esModule&&Object.prototype.hasOwnProperty.call(a,"default")?a.default:a}var fe={exports:{}};fe.exports;var vs;function sa(){return vs||(vs=1,function(a,e){var t=200,n="__lodash_hash_undefined__",s=800,o=16,p=9007199254740991,d="[object Arguments]",l="[object Array]",f="[object AsyncFunction]",y="[object Boolean]",g="[object Date]",P="[object Error]",C="[object Function]",S="[object GeneratorFunction]",A="[object Map]",U="[object Number]",tt="[object Null]",jt="[object Object]",Vs="[object Proxy]",Ws="[object RegExp]",Ys="[object Set]",Gs="[object String]",qs="[object Undefined]",Xs="[object WeakMap]",Ks="[object ArrayBuffer]",Js="[object DataView]",Qs="[object Float32Array]",Zs="[object Float64Array]",en="[object Int8Array]",tn="[object Int16Array]",sn="[object Int32Array]",nn="[object Uint8Array]",an="[object Uint8ClampedArray]",on="[object Uint16Array]",rn="[object Uint32Array]",pn=/[\\^$.*+?()[\]{}|]/g,cn=/^\[object .+?Constructor\]$/,ln=/^(?:0|[1-9]\d*)$/,k={};k[Qs]=k[Zs]=k[en]=k[tn]=k[sn]=k[nn]=k[an]=k[on]=k[rn]=!0,k[d]=k[l]=k[Ks]=k[y]=k[Js]=k[g]=k[P]=k[C]=k[A]=k[U]=k[jt]=k[Ws]=k[Ys]=k[Gs]=k[Xs]=!1;var Nt=typeof Fe=="object"&&Fe&&Fe.Object===Object&&Fe,dn=typeof self=="object"&&self&&self.Object===Object&&self,pe=Nt||dn||Function("return this")(),Bt=e&&!e.nodeType&&e,ce=Bt&&!0&&a&&!a.nodeType&&a,Ht=ce&&ce.exports===Bt,st=Ht&&Nt.process,Vt=function(){try{var i=ce&&ce.require&&ce.require("util").types;return i||st&&st.binding&&st.binding("util")}catch{}}(),Wt=Vt&&Vt.isTypedArray;function hn(i,r,c){switch(c.length){case 0:return i.call(r);case 1:return i.call(r,c[0]);case 2:return i.call(r,c[0],c[1]);case 3:return i.call(r,c[0],c[1],c[2])}return i.apply(r,c)}function un(i,r){for(var c=-1,h=Array(i);++c<i;)h[c]=r(c);return h}function fn(i){return function(r){return i(r)}}function mn(i,r){return i?.[r]}function gn(i,r){return function(c){return i(r(c))}}var bn=Array.prototype,xn=Function.prototype,Ce=Object.prototype,nt=pe["__core-js_shared__"],Te=xn.toString,j=Ce.hasOwnProperty,Yt=function(){var i=/[^.]+$/.exec(nt&&nt.keys&&nt.keys.IE_PROTO||"");return i?"Symbol(src)_1."+i:""}(),Gt=Ce.toString,yn=Te.call(Object),vn=RegExp("^"+Te.call(j).replace(pn,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),Se=Ht?pe.Buffer:void 0,qt=pe.Symbol,Xt=pe.Uint8Array;Se&&Se.allocUnsafe;var Kt=gn(Object.getPrototypeOf,Object),Jt=Object.create,kn=Ce.propertyIsEnumerable,wn=bn.splice,V=qt?qt.toStringTag:void 0,De=function(){try{var i=ot(Object,"defineProperty");return i({},"",{}),i}catch{}}(),_n=Se?Se.isBuffer:void 0,Qt=Math.max,$n=Date.now,Zt=ot(pe,"Map"),le=ot(Object,"create"),Cn=function(){function i(){}return function(r){if(!Y(r))return{};if(Jt)return Jt(r);i.prototype=r;var c=new i;return i.prototype=void 0,c}}();function W(i){var r=-1,c=i==null?0:i.length;for(this.clear();++r<c;){var h=i[r];this.set(h[0],h[1])}}function Tn(){this.__data__=le?le(null):{},this.size=0}function Sn(i){var r=this.has(i)&&delete this.__data__[i];return this.size-=r?1:0,r}function Dn(i){var r=this.__data__;if(le){var c=r[i];return c===n?void 0:c}return j.call(r,i)?r[i]:void 0}function Pn(i){var r=this.__data__;return le?r[i]!==void 0:j.call(r,i)}function An(i,r){var c=this.__data__;return this.size+=this.has(i)?0:1,c[i]=le&&r===void 0?n:r,this}W.prototype.clear=Tn,W.prototype.delete=Sn,W.prototype.get=Dn,W.prototype.has=Pn,W.prototype.set=An;function R(i){var r=-1,c=i==null?0:i.length;for(this.clear();++r<c;){var h=i[r];this.set(h[0],h[1])}}function zn(){this.__data__=[],this.size=0}function On(i){var r=this.__data__,c=Pe(r,i);if(c<0)return!1;var h=r.length-1;return c==h?r.pop():wn.call(r,c,1),--this.size,!0}function Fn(i){var r=this.__data__,c=Pe(r,i);return c<0?void 0:r[c][1]}function En(i){return Pe(this.__data__,i)>-1}function Mn(i,r){var c=this.__data__,h=Pe(c,i);return h<0?(++this.size,c.push([i,r])):c[h][1]=r,this}R.prototype.clear=zn,R.prototype.delete=On,R.prototype.get=Fn,R.prototype.has=En,R.prototype.set=Mn;function J(i){var r=-1,c=i==null?0:i.length;for(this.clear();++r<c;){var h=i[r];this.set(h[0],h[1])}}function Ln(){this.size=0,this.__data__={hash:new W,map:new(Zt||R),string:new W}}function Rn(i){var r=ze(this,i).delete(i);return this.size-=r?1:0,r}function In(i){return ze(this,i).get(i)}function Un(i){return ze(this,i).has(i)}function jn(i,r){var c=ze(this,i),h=c.size;return c.set(i,r),this.size+=c.size==h?0:1,this}J.prototype.clear=Ln,J.prototype.delete=Rn,J.prototype.get=In,J.prototype.has=Un,J.prototype.set=jn;function Q(i){var r=this.__data__=new R(i);this.size=r.size}function Nn(){this.__data__=new R,this.size=0}function Bn(i){var r=this.__data__,c=r.delete(i);return this.size=r.size,c}function Hn(i){return this.__data__.get(i)}function Vn(i){return this.__data__.has(i)}function Wn(i,r){var c=this.__data__;if(c instanceof R){var h=c.__data__;if(!Zt||h.length<t-1)return h.push([i,r]),this.size=++c.size,this;c=this.__data__=new J(h)}return c.set(i,r),this.size=c.size,this}Q.prototype.clear=Nn,Q.prototype.delete=Bn,Q.prototype.get=Hn,Q.prototype.has=Vn,Q.prototype.set=Wn;function Yn(i,r){var c=ct(i),h=!c&&pt(i),b=!c&&!h&&is(i),v=!c&&!h&&!b&&os(i),w=c||h||b||v,x=w?un(i.length,String):[],_=x.length;for(var L in i)w&&(L=="length"||b&&(L=="offset"||L=="parent")||v&&(L=="buffer"||L=="byteLength"||L=="byteOffset")||ss(L,_))||x.push(L);return x}function it(i,r,c){(c!==void 0&&!Oe(i[r],c)||c===void 0&&!(r in i))&&at(i,r,c)}function Gn(i,r,c){var h=i[r];(!(j.call(i,r)&&Oe(h,c))||c===void 0&&!(r in i))&&at(i,r,c)}function Pe(i,r){for(var c=i.length;c--;)if(Oe(i[c][0],r))return c;return-1}function at(i,r,c){r=="__proto__"&&De?De(i,r,{configurable:!0,enumerable:!0,value:c,writable:!0}):i[r]=c}var qn=ri();function Ae(i){return i==null?i===void 0?qs:tt:V&&V in Object(i)?pi(i):fi(i)}function es(i){return de(i)&&Ae(i)==d}function Xn(i){if(!Y(i)||hi(i))return!1;var r=dt(i)?vn:cn;return r.test(xi(i))}function Kn(i){return de(i)&&as(i.length)&&!!k[Ae(i)]}function Jn(i){if(!Y(i))return ui(i);var r=ns(i),c=[];for(var h in i)h=="constructor"&&(r||!j.call(i,h))||c.push(h);return c}function ts(i,r,c,h,b){i!==r&&qn(r,function(v,w){if(b||(b=new Q),Y(v))Qn(i,r,w,c,ts,h,b);else{var x=h?h(rt(i,w),v,w+"",i,r,b):void 0;x===void 0&&(x=v),it(i,w,x)}},rs)}function Qn(i,r,c,h,b,v,w){var x=rt(i,c),_=rt(r,c),L=w.get(_);if(L){it(i,c,L);return}var z=v?v(x,_,c+"",i,r,w):void 0,he=z===void 0;if(he){var ht=ct(_),ut=!ht&&is(_),cs=!ht&&!ut&&os(_);z=_,ht||ut||cs?ct(x)?z=x:yi(x)?z=ii(x):ut?(he=!1,z=ti(_)):cs?(he=!1,z=ni(_)):z=[]:vi(_)||pt(_)?(z=x,pt(x)?z=ki(x):(!Y(x)||dt(x))&&(z=ci(_))):he=!1}he&&(w.set(_,z),b(z,_,h,v,w),w.delete(_)),it(i,c,z)}function Zn(i,r){return gi(mi(i,r,ps),i+"")}var ei=De?function(i,r){return De(i,"toString",{configurable:!0,enumerable:!1,value:_i(r),writable:!0})}:ps;function ti(i,r){return i.slice()}function si(i){var r=new i.constructor(i.byteLength);return new Xt(r).set(new Xt(i)),r}function ni(i,r){var c=si(i.buffer);return new i.constructor(c,i.byteOffset,i.length)}function ii(i,r){var c=-1,h=i.length;for(r||(r=Array(h));++c<h;)r[c]=i[c];return r}function ai(i,r,c,h){var b=!c;c||(c={});for(var v=-1,w=r.length;++v<w;){var x=r[v],_=void 0;_===void 0&&(_=i[x]),b?at(c,x,_):Gn(c,x,_)}return c}function oi(i){return Zn(function(r,c){var h=-1,b=c.length,v=b>1?c[b-1]:void 0,w=b>2?c[2]:void 0;for(v=i.length>3&&typeof v=="function"?(b--,v):void 0,w&&li(c[0],c[1],w)&&(v=b<3?void 0:v,b=1),r=Object(r);++h<b;){var x=c[h];x&&i(r,x,h,v)}return r})}function ri(i){return function(r,c,h){for(var b=-1,v=Object(r),w=h(r),x=w.length;x--;){var _=w[++b];if(c(v[_],_,v)===!1)break}return r}}function ze(i,r){var c=i.__data__;return di(r)?c[typeof r=="string"?"string":"hash"]:c.map}function ot(i,r){var c=mn(i,r);return Xn(c)?c:void 0}function pi(i){var r=j.call(i,V),c=i[V];try{i[V]=void 0;var h=!0}catch{}var b=Gt.call(i);return h&&(r?i[V]=c:delete i[V]),b}function ci(i){return typeof i.constructor=="function"&&!ns(i)?Cn(Kt(i)):{}}function ss(i,r){var c=typeof i;return r=r??p,!!r&&(c=="number"||c!="symbol"&&ln.test(i))&&i>-1&&i%1==0&&i<r}function li(i,r,c){if(!Y(c))return!1;var h=typeof r;return(h=="number"?lt(c)&&ss(r,c.length):h=="string"&&r in c)?Oe(c[r],i):!1}function di(i){var r=typeof i;return r=="string"||r=="number"||r=="symbol"||r=="boolean"?i!=="__proto__":i===null}function hi(i){return!!Yt&&Yt in i}function ns(i){var r=i&&i.constructor,c=typeof r=="function"&&r.prototype||Ce;return i===c}function ui(i){var r=[];if(i!=null)for(var c in Object(i))r.push(c);return r}function fi(i){return Gt.call(i)}function mi(i,r,c){return r=Qt(r===void 0?i.length-1:r,0),function(){for(var h=arguments,b=-1,v=Qt(h.length-r,0),w=Array(v);++b<v;)w[b]=h[r+b];b=-1;for(var x=Array(r+1);++b<r;)x[b]=h[b];return x[r]=c(w),hn(i,this,x)}}function rt(i,r){if(!(r==="constructor"&&typeof i[r]=="function")&&r!="__proto__")return i[r]}var gi=bi(ei);function bi(i){var r=0,c=0;return function(){var h=$n(),b=o-(h-c);if(c=h,b>0){if(++r>=s)return arguments[0]}else r=0;return i.apply(void 0,arguments)}}function xi(i){if(i!=null){try{return Te.call(i)}catch{}try{return i+""}catch{}}return""}function Oe(i,r){return i===r||i!==i&&r!==r}var pt=es(function(){return arguments}())?es:function(i){return de(i)&&j.call(i,"callee")&&!kn.call(i,"callee")},ct=Array.isArray;function lt(i){return i!=null&&as(i.length)&&!dt(i)}function yi(i){return de(i)&&lt(i)}var is=_n||$i;function dt(i){if(!Y(i))return!1;var r=Ae(i);return r==C||r==S||r==f||r==Vs}function as(i){return typeof i=="number"&&i>-1&&i%1==0&&i<=p}function Y(i){var r=typeof i;return i!=null&&(r=="object"||r=="function")}function de(i){return i!=null&&typeof i=="object"}function vi(i){if(!de(i)||Ae(i)!=jt)return!1;var r=Kt(i);if(r===null)return!0;var c=j.call(r,"constructor")&&r.constructor;return typeof c=="function"&&c instanceof c&&Te.call(c)==yn}var os=Wt?fn(Wt):Kn;function ki(i){return ai(i,rs(i))}function rs(i){return lt(i)?Yn(i):Jn(i)}var wi=oi(function(i,r,c){ts(i,r,c)});function _i(i){return function(){return i}}function ps(i){return i}function $i(){return!1}a.exports=wi}(fe,fe.exports)),fe.exports}var na=sa();const Fs=ta(na),ks={enabled:!1,meta:!1,properties:!1,wiring:!1},Es="__litFeatureDebug";let ws=!1;function St(){if(ws&&typeof globalThis<"u"&&globalThis.__litFeatureDebug)return globalThis.__litFeatureDebug;let a={...ks};if(typeof globalThis<"u"&&globalThis.sessionStorage)try{const e=globalThis.sessionStorage.getItem(Es);if(e){const t=JSON.parse(e);a={...ks,...t},(a.enabled||a.meta||a.properties||a.wiring)&&console.warn(`[LitFeature Debug] Loaded configuration from sessionStorage. Flags enabled: ${[a.enabled&&"master",a.meta&&"meta",a.properties&&"properties",a.wiring&&"wiring"].filter(Boolean).join(", ")}`)}}catch{}return typeof globalThis<"u"&&(globalThis.__litFeatureDebug=a),!a.enabled&&!a.meta&&!a.properties&&!a.wiring&&console.warn(`[LitFeature Debug] Debugging is available but currently disabled.
To enable, set flags in your browser console:
  window.__litFeatureDebug.enabled = true;     // Master flag
  window.__litFeatureDebug.meta = true;        // Definition phase
  window.__litFeatureDebug.properties = true;  // Instantiation phase
  window.__litFeatureDebug.wiring = true;      // Host ↔ Feature sync

Or set flags and reload to see the full lifecycle:
  sessionStorage.setItem('__litFeatureDebug', JSON.stringify({ enabled: true }));
  location.reload();`),ws=!0,a}function Dt(){return typeof globalThis>"u"||!globalThis.__litFeatureDebug?St():globalThis.__litFeatureDebug}function Ms(a){if(!(typeof globalThis>"u"||!globalThis.sessionStorage))try{globalThis.sessionStorage.setItem(Es,JSON.stringify(a))}catch{}}function ia(a,e){const t=Dt();t[a]=e,typeof globalThis<"u"&&(globalThis.__litFeatureDebug=t),Ms(t)}function Ze(a){const e=Dt();return e.enabled===!0||e[a]===!0}function aa(a,e,t){if(!Ze("meta"))return;const n="[LitFeature Debug] [Definition Phase] [Meta]";t!==void 0?console.log(`${n} [${a}] ${e}`,t):console.log(`${n} [${a}] ${e}`)}function oa(a,e,t){if(!Ze("properties"))return;const n="[LitFeature Debug] [Instantiation Phase] [Properties]";t!==void 0?console.log(`${n} [${a}] ${e}`,t):console.log(`${n} [${a}] ${e}`)}function ra(a,e,t){if(!Ze("wiring"))return;const n="[LitFeature Debug] [Wiring Phase] [Internal Sync]";t!==void 0?console.log(`${n} [${a}] ${e}`,t):console.log(`${n} [${a}] ${e}`)}const m={initializeDebugConfig:St,getDebugConfig:Dt,setDebugFlag:ia,saveDebugConfig:Ms,isDebugEnabled:Ze,logMeta:aa,logProperties:oa,logWiring:ra};St();const be=class be{constructor(){this.metrics=[],this.enabled=!0,this.verbose=!1,this.thresholds={componentCreation:.5,featureInit:.1,renderBatch:5,propertyReconciliation:.2,totalInit:3},this.marks=new Map}static getInstance(){return be.instance}enable(){this.enabled=!0}disable(){this.enabled=!1}setVerbose(e){this.verbose=e}setThresholds(e){this.thresholds={...this.thresholds,...e}}mark(e){this.marks.set(e,performance.now())}measure(e,t){if(!this.enabled)return 0;const n=t?.markStart||e,s=this.marks.get(n);if(!s)return this.logWarning(`No start mark found for "${n}"`),0;const o=performance.now(),p=o-s,d=t?.threshold;if(t?.alwaysLog||d!==void 0&&p>d||this._determineSeverity(e,p)!=="info"){const f=this._determineSeverity(e,p);this._logMetric({name:e,startTime:s,endTime:o,duration:p,severity:f,context:t?.context})}return this.marks.delete(n),p}time(e,t,n){this.mark(e);const s=t(),o=this.measure(e,n);return{result:s,duration:o}}getMetrics(){return[...this.metrics]}clearMetrics(){this.metrics=[]}getSummary(){const e={total:this.metrics.length,warnings:this.metrics.filter(t=>t.severity==="warning").length,errors:this.metrics.filter(t=>t.severity==="error").length,avgDuration:0,totalDuration:0};return this.metrics.length>0&&(e.totalDuration=this.metrics.reduce((t,n)=>t+(n.duration||0),0),e.avgDuration=e.totalDuration/this.metrics.length),e}logSummary(){if(!this.enabled)return;const e=this.getSummary();console.group("📊 Performance Summary"),console.log(`Total Measurements: ${e.total}`),console.log(`⚠️  Warnings: ${e.warnings}`),console.log(`❌ Errors: ${e.errors}`),console.log(`Average Duration: ${e.avgDuration.toFixed(3)}ms`),console.log(`Total Duration: ${e.totalDuration.toFixed(3)}ms`),(e.warnings>0||e.errors>0)&&(console.group("Issues Found:"),this.metrics.filter(n=>n.severity!=="info").forEach(n=>{const s=n.severity==="error"?"❌":"⚠️";console.log(`${s} ${n.name}: ${n.duration?.toFixed(3)}ms`,n.context||"")}),console.groupEnd()),console.groupEnd()}_determineSeverity(e,t){let n=0,s=2;if(e.includes("component-creation"))n=this.thresholds.componentCreation;else if(e.includes("feature-init"))n=this.thresholds.featureInit;else if(e.includes("render"))n=this.thresholds.renderBatch;else if(e.includes("property")||e.includes("reconciliation"))n=this.thresholds.propertyReconciliation;else if(e.includes("total-init")||e.includes("total"))n=this.thresholds.totalInit;else return"info";return t>n*s?"error":t>n?"warning":"info"}_logMetric(e){if(this.metrics.push(e),this.verbose||e.severity!=="info"){const t=e.severity==="error"?"❌":e.severity==="warning"?"⚠️":"ℹ️",n=e.context?` ${JSON.stringify(e.context)}`:"";console.log(`${t} [${e.duration?.toFixed(3)}ms] ${e.name}${n}`)}}logWarning(e){console.warn(`⚠️ PerformanceMonitor: ${e}`)}};be.instance=new be;let xt=be;const $=xt.getInstance();var Ls;const Pt=Symbol("litFeature");Ls=Pt;const qe=class qe{constructor(e,t){this._propertyObservers=new Map,this._internalValues=new Map,this._declaredProperties=new Set,this._suspendUpdates=!1;const n=`feature-constructor-${Date.now()}-${Math.random()}`;$.mark(n);const s=this.constructor.name||"UnnamedFeature",o=e.constructor.name||"UnknownHost";m.logProperties("feature-constructor",`Constructing ${s} on host ${o}`),this.host=e,this.config=t,this.host.addController?.(this),this._litFeatureInit(),$.measure(`feature-init-${s}`,{markStart:n,threshold:.1,context:{feature:s,host:o}})}_litFeatureInit(){const e=this.constructor.name||"UnnamedFeature";m.logProperties("feature-init",`Initializing ${e} - setting up property observers`);const{properties:t}=this.constructor;if(!t){m.logProperties("feature-init-no-props",`  → ${e} has no properties to observe`);return}const n=Object.keys(t);m.logProperties("feature-init-props-count",`  → ${e} has ${n.length} properties`,n),n.forEach(s=>{this._declaredProperties.add(s)}),Object.keys(t).forEach(s=>{m.logProperties("feature-init-observer",`    → Creating property observer for: ${s}`),this._createPropertyObserver(s)})}_createPropertyObserver(e){const t=this.constructor.name||"UnnamedFeature";m.logProperties("property-observer-create",`Creating property descriptor for ${t}.${e}`);const n=`property-observer-${t}-${e}-${Date.now()}-${Math.random()}`;$.mark(n);const s=this;Object.defineProperty(this,e,{configurable:!0,enumerable:!0,get(){const o=s.getInternalValue(e);return m.logWiring("property-getter",`Getting ${t}.${e}`,o),o},set(o){const p=`property-set-${t}-${e}-${Date.now()}-${Math.random()}`;$.mark(p);const d=s.host,l=d[e],f=s.getInternalValue(e);if(m.logWiring("property-setter",`Setting ${t}.${e}`,{oldValue:l,newValue:o,hostName:s.host.constructor.name||"UnknownHost"}),Object.is(f,o)){m.logWiring("property-setter-guard-internal",`  → Skipping: already equals internal value for ${e}`);return}if(Object.is(l,o)){m.logWiring("property-setter-guard-host",`  → Skipping: already equals host value for ${e}`),s.setInternalValue(e,o);return}d[e]=o,m.logWiring("property-to-host",`  → Synced to host property: ${e}`,o),s.setInternalValue(e,o),m.logWiring("property-to-internal",`  → Mirrored to internal storage: ${e}`),!s._suspendUpdates&&typeof s.host.requestUpdate=="function"?(s.host.requestUpdate(e,l),m.logWiring("property-request-update",`  → Requested update for: ${e}`)):s._suspendUpdates&&m.logWiring("property-request-update-suspended",`  → Update suspended for: ${e}`),$.measure(`property-set-${t}`,{markStart:p,threshold:.1,context:{property:e}})}}),$.measure(`property-observer-create-${t}`,{markStart:n,threshold:.05,context:{property:e}})}setInternalValue(e,t){this._internalValues.set(e,t)}getInternalValue(e){return this._internalValues.get(e)}_suspendUpdateRequests(){this._suspendUpdates=!0}_resumeUpdateRequests(){this._suspendUpdates=!1}hostConnected(){}hostDisconnected(){}firstUpdated(e){const t=this.constructor.name||"UnnamedFeature",n=this.host.constructor.name||"UnknownHost";m.logWiring("first-updated-start",`First update phase for ${t} (host: ${n})`);const s=this,o=this.host;this._declaredProperties.forEach(p=>{const d=o[p],l=this.getInternalValue(p);m.logWiring("first-updated-reconcile",`Reconciling property: ${p}`,{hostValue:d,internalValue:l}),d!==void 0?Object.is(d,l)?(m.logWiring("first-updated-host-match",`  → Host value already matches internal for ${p}`),this.setInternalValue(p,d)):(m.logWiring("first-updated-host-wins",`  → Host value wins for ${p}`),s[p]=d):l!==void 0?(m.logWiring("first-updated-feature-wins",`  → Feature default wins for ${p}`,l),s[p]=l):(m.logWiring("first-updated-mirror",`  → No value set, mirroring undefined for ${p}`),this.setInternalValue(p,d))}),m.logWiring("first-updated-complete",`First update phase complete for ${t}`)}updated(e){const t=this.constructor.name||"UnnamedFeature",n=this.host.constructor.name||"UnknownHost";m.logWiring("updated-start",`Update phase for ${t} (host: ${n})`);const s=this.host;e.forEach((o,p)=>{const d=s[p];m.logWiring("updated-sync",`Syncing changed property: ${p}`,d),this.setInternalValue(p,d)}),m.logWiring("updated-complete",`Update phase complete for ${t}`)}};qe[Ls]=!0,qe.properties={};let B=qe;const ge=Symbol("litFeatureMeta");function Rs(a){return Object.prototype.hasOwnProperty.call(a,ge)||Object.defineProperty(a,ge,{value:{provide:new Map,configure:new Map,featureProperties:new Map},writable:!1,configurable:!0,enumerable:!1}),a[ge]}function M(a={}){return function(e,t){const n=e.constructor;Rs(n).featureProperties.set(t,a);const o=n.properties||{};Object.prototype.hasOwnProperty.call(n,"properties")||Object.defineProperty(n,"properties",{value:{...o},writable:!0,configurable:!0,enumerable:!1}),n.properties[t]=a}}function pa(a){const e=a[ge];if(!e||!e.featureProperties)return{};const t={};return e.featureProperties.forEach((n,s)=>{t[s]=n}),t}const mt=Symbol("litFeatureResolvedCache");function ca(a){const e=[];let t=a;for(;t&&t[Is];)e.unshift(t),t=Object.getPrototypeOf(t);return e}function _s(a,e){if(e==="disable")return"disable";if(!a||a==="disable")return{...e};const t=Fs({},a.config||{},e.config||{}),n={...a.properties||{}};return Object.entries(e.properties||{}).forEach(([s,o])=>{o==="disable"?delete n[s]:n[s]=o}),{config:t,properties:n}}function la(a){const e=[],t=[];let n=a;for(;n&&n[Pt]&&(t.unshift(n),n!==B);)n=Object.getPrototypeOf(n);return t.forEach(s=>{s.styles&&(Array.isArray(s.styles)?e.push(...s.styles):e.push(s.styles))}),e}function da(a){const e={},t=[];let n=a;for(;n&&n[Pt]&&(t.unshift(n),n!==B);)n=Object.getPrototypeOf(n);return t.forEach(s=>{Object.assign(e,s.properties||{});const o=pa(s);Object.assign(e,o||{})}),e}function yt(a){const e=a.name||"Unknown";if(m.logMeta("resolve-start",`Starting feature resolution for component: ${e}`),Object.prototype.hasOwnProperty.call(a,mt))return m.logMeta("resolve-cache",`Using cached resolution for: ${e}`),a[mt];const t=new Map,n=new Map,s=ca(a);m.logMeta("resolve-chain",`Inheritance chain for ${e}:`,s.map(f=>f.name)),s.forEach(f=>{const y=f.name||"Unknown";m.logMeta("resolve-class",`Processing class: ${y}`);const g=f.provide||{};Object.entries(g).forEach(([S,A])=>{m.logMeta("resolve-provide-static",`  → Collecting feature: ${S} from static provide`),t.set(S,A)});const P=f.configure||{};Object.entries(P).forEach(([S,A])=>{const U=A,tt=_s(n.get(S),U);m.logMeta("resolve-configure-static",`  → Merging config for feature: ${S}`),n.set(S,tt)});const C=f[ge];C&&(C.provide&&C.provide.forEach((S,A)=>{m.logMeta("resolve-provide-decorator",`  → Collecting feature: ${A} from decorator`),t.set(A,S)}),C.configure&&C.configure.forEach((S,A)=>{const U=_s(n.get(A),S);m.logMeta("resolve-configure-decorator",`  → Merging config for feature: ${A} from decorator`),n.set(A,U)}))});const o={},p=[],d=new Map;m.logMeta("resolve-build",`Building resolved state for ${t.size} provided features`),t.forEach((f,y)=>{const g=n.get(y);if(g==="disable"||f.enabled===!1){m.logMeta("resolve-disabled",`  → Skipping disabled feature: ${y}`);return}m.logMeta("resolve-feature",`  → Resolving feature: ${y}`);const P=la(f.class);P.length>0&&(m.logMeta("resolve-styles",`    → Collecting ${P.length} style blocks from feature chain: ${y}`),p.push(...P));let C=da(f.class);g&&typeof g=="object"&&g.properties&&Object.entries(g.properties).forEach(([A,U])=>{U==="disable"?(m.logMeta("resolve-property",`    → Disabling property: ${A}`),delete C[A]):(m.logMeta("resolve-property",`    → Including property: ${A}`),C[A]=U)}),Object.assign(o,C),m.logMeta("resolve-properties-count",`    → Total properties for ${y}: ${Object.keys(C).length}`);const S=g&&typeof g=="object"?Fs({},f.config||{},g.config||{}):f.config||{};d.set(y,{class:f.class,config:S})});const l={properties:Object.freeze(o),styles:p,features:d};return console.log(`[Resolver] Resolved styles for ${e}:`,l.styles,`(count: ${l.styles.length})`),Object.freeze(l),m.logMeta("resolve-complete",`Resolution complete for ${e}`,{featuresCount:d.size,propertiesCount:Object.keys(o).length,stylesCount:p.length}),a[mt]=l,l}class ha{constructor(e,t){this.host=e,this._featureInstances=new Map;const n=yt(t);this._initializeFeatures(n)}_initializeFeatures(e){const t=`feature-manager-init-${Date.now()}-${Math.random()}`;$.mark(t);const n=this.host.constructor?.name||"Unknown";m.logProperties("init-start",`Starting feature instantiation for host: ${n}`,{featureCount:e.features.size}),e.features.forEach((s,o)=>{m.logProperties("init-feature",`Instantiating feature: ${o}`);const p=new s.class(this.host,s.config);m.logProperties("init-instance-created",`  → Instance created for: ${o}`),p._suspendUpdateRequests(),this._featureInstances.set(o,p);const d=this.host;d.hasOwnProperty(o)?(console.warn(`[Lit Feature] Host already has a property named "${o}". This may cause conflicts with the feature instance.
Features should not declare properties with names matching those in the host component. Please rename the feature or host property to avoid this conflict.
Feature will be assigned to _${o} to avoid overwriting the host property. It is not recommended to leave this conflict unresolved, as it may lead to unexpected behavior.`),m.logProperties("init-attach-conflict",`  → Conflict detected, attaching to _${o}`),d[`_${o}`]=p):(m.logProperties("init-attach",`  → Attached to host as property: ${o}`),d[o]=p)}),this._featureInstances.forEach(s=>{s._resumeUpdateRequests()}),typeof this.host.requestUpdate=="function"&&(m.logProperties("init-batch-update",`Triggering batch update after feature initialization for host: ${n}`),this.host.requestUpdate()),m.logProperties("init-complete",`Feature instantiation complete for host: ${n}`),$.measure(`feature-manager-init-${n}`,{markStart:t,threshold:.5,context:{component:n,featureCount:e.features.size}})}processLifecycle(e,...t){this._featureInstances.forEach(n=>{const s=n[e];typeof s=="function"&&s.call(n,...t)})}}var $s,Cs;const Is=Symbol("litCore"),Xe=class Xe extends(Cs=F,$s=Is,Cs){constructor(){const e=`lt-core-constructor-${Date.now()}-${Math.random()}`;$.mark(e),super(),this.featureManager=new ha(this,this.constructor);const t=this.constructor.name||"UnknownComponent";$.measure(`component-creation-${t}`,{markStart:e,threshold:.5,context:{component:t}})}static finalize(){const t=yt(this);console.log(`[LitCore] Finalizing ${this.name}`,{featureStyles:t.styles,featureCount:t.styles.length,featureStyleTypes:t.styles.map(f=>f?.constructor?.name||typeof f)});const n=Object.getPrototypeOf(this)?.properties||{},s=Object.prototype.hasOwnProperty.call(this,"properties")?this.properties:{};this.properties={...n,...t.properties,...s};const o=Object.getPrototypeOf(this)?.styles,p=Object.getOwnPropertyDescriptor(this,"styles")!==void 0,d=p?this.styles:void 0;console.log(`[LitCore] Style sources for ${this.name}:`,{superStyles:!!o,superStylesType:Array.isArray(o)?"array":typeof o,featureStyles:t.styles.length,hasOwnStyles:p,ownStyles:!!d,ownStylesType:Array.isArray(d)?"array":typeof d});const l=[];o&&(Array.isArray(o)?l.push(...o):l.push(o)),t.styles.length>0&&l.push(...t.styles),d&&(Array.isArray(d)?l.push(...d):l.push(d)),console.log(`[LitCore] Total styles for ${this.name}:`,l.length,l),l.length>0&&(this.styles=l.length===1?l[0]:l),super.finalize()}static register(e){const t=this;yt(t),customElements.define(e,t)}connectedCallback(){this.featureManager.processLifecycle("beforeConnectedCallback"),super.connectedCallback(),this.featureManager.processLifecycle("connectedCallback"),this.featureManager.processLifecycle("afterConnectedCallback")}disconnectedCallback(){this.featureManager.processLifecycle("beforeDisconnectedCallback"),this.featureManager.processLifecycle("disconnectedCallback"),super.disconnectedCallback(),this.featureManager.processLifecycle("afterDisconnectedCallback")}firstUpdated(e){this.featureManager.processLifecycle("beforeFirstUpdated",e),super.firstUpdated(e),this.featureManager.processLifecycle("firstUpdated",e),this.featureManager.processLifecycle("afterFirstUpdated",e)}updated(e){this.featureManager.processLifecycle("beforeUpdated",e),super.updated(e),this.featureManager.processLifecycle("updated",e),this.featureManager.processLifecycle("afterUpdated",e)}attributeChangedCallback(e,t,n){this.featureManager.processLifecycle("beforeAttributeChangedCallback",e,t,n),super.attributeChangedCallback(e,t,n),this.featureManager.processLifecycle("attributeChangedCallback",e,t,n),this.featureManager.processLifecycle("afterAttributeChangedCallback",e,t,n)}};Xe[$s]=!0,Xe.properties={};let E=Xe;function I(a,e){return function(t){return Rs(t).provide.set(a,e),t}}var ua=Object.defineProperty,Us=(a,e,t,n)=>{for(var s=void 0,o=a.length-1,p;o>=0;o--)(p=a[o])&&(s=p(e,t,s)||s);return s&&ua(e,t,s),s};const Ot=class Ot extends B{constructor(e,t){super(e,t),this.rippling=!1,this.rippleDurationMs=600,this._handleClick=()=>{this.triggerRipple()},this.rippleDurationMs=t.rippleDurationMs??600,this._applyRippleOptions()}updated(e){super.updated(e),e.has("rippleDurationMs")&&this._applyRippleOptions()}connectedCallback(){this.host.addEventListener("click",this._handleClick)}disconnectedCallback(){this.host.removeEventListener("click",this._handleClick)}triggerRipple(){this.rippling=!0,setTimeout(()=>{this.rippling=!1},this.rippleDurationMs)}setRippleColor(e){this.host.style.setProperty("--ripple-color",e)}_applyRippleOptions(){this.host.style.setProperty("--ripple-duration",`${this.rippleDurationMs}ms`),this.config.rippleColor&&this.setRippleColor(this.config.rippleColor)}};Ot.styles=T`
    /* Ripple effect - applied when host has [rippling] attribute */
    :host([rippling])::after {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle, var(--ripple-color, rgba(255, 255, 255, 0.6)) 0%, transparent 70%);
      animation: ripple var(--ripple-duration, 600ms) ease-out;
      pointer-events: none;
    }

    @keyframes ripple {
      from {
        opacity: 1;
        transform: scale(0);
      }
      to {
        opacity: 0;
        transform: scale(2);
      }
    }
  `;let se=Ot;Us([M({type:Boolean,reflect:!0})],se.prototype,"rippling");Us([M({type:Number,attribute:"ripple-duration"})],se.prototype,"rippleDurationMs");var fa=Object.getOwnPropertyDescriptor,ma=(a,e,t,n)=>{for(var s=n>1?void 0:n?fa(e,t):e,o=a.length-1,p;o>=0;o--)(p=a[o])&&(s=p(s)||s);return s};let Ie=class extends E{render(){return u`
      <button>
        <slot>Click Me</slot>
      </button>
    `}};Ie.styles=T`
    :host {
      display: inline-block;
      position: relative;
    }

    button {
      padding: 12px 24px;
      font-size: 14px;
      font-weight: 600;
      border: none;
      border-radius: 8px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(102, 126, 234, 0.4);
    }

    button:active {
      transform: translateY(0);
    }
  `;Ie=ma([I("Ripple",{class:se})],Ie);var ga=Object.getOwnPropertyDescriptor,ba=(a,e,t,n)=>{for(var s=n>1?void 0:n?ga(e,t):e,o=a.length-1,p;o>=0;o--)(p=a[o])&&(s=p(s)||s);return s};let Ue=class extends E{render(){return u`
      <div class="card">
        <h3 class="card-title"><slot name="title">Card Title</slot></h3>
        <div class="card-content"><slot>Card content goes here.</slot></div>
      </div>
    `}};Ue.styles=T`
    :host {
      display: block;
      position: relative;
    }

    .card {
      padding: 24px;
      border-radius: 12px;
      background: white;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    }

    .card-title {
      font-size: 18px;
      font-weight: 700;
      margin: 0 0 8px 0;
      color: #333;
    }

    .card-content {
      font-size: 14px;
      color: #666;
      line-height: 1.6;
    }
  `;Ue=ba([I("Ripple",{class:se})],Ue);var xa=Object.defineProperty,js=(a,e,t,n)=>{for(var s=void 0,o=a.length-1,p;o>=0;o--)(p=a[o])&&(s=p(e,t,s)||s);return s&&xa(e,t,s),s};const Ft=class Ft extends B{constructor(e,t){super(e,t),this.pulseDurationMs=2e3,this.pulsing=t.initiallyPulsing??!1,this.pulseDurationMs=t.pulseDurationMs??2e3,this._applyPulseOptions(t)}updated(e){super.updated(e),e.has("pulseDurationMs")&&this._applyPulseOptions(this.config)}togglePulse(){this.pulsing=!this.pulsing}startPulse(){this.pulsing=!0}stopPulse(){this.pulsing=!1}setPulseOptions(e){this._applyPulseOptions(e)}_applyPulseOptions(e){const t=this.host.style;t.setProperty("--pulse-duration",`${this.pulseDurationMs}ms`),e.pulseScale&&t.setProperty("--pulse-scale",`${e.pulseScale}`),e.pulseOpacity&&t.setProperty("--pulse-opacity",`${e.pulseOpacity}`)}};Ft.styles=T`
    /* Pulse effect - applied when host has [pulsing] attribute */
    :host([pulsing]) {
      animation: pulse var(--pulse-duration, 2000ms) ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(var(--pulse-scale, 1.05));
        opacity: var(--pulse-opacity, 0.8);
      }
    }
  `;let ke=Ft;js([M({type:Boolean,reflect:!0})],ke.prototype,"pulsing");js([M({type:Number,attribute:"pulse-duration"})],ke.prototype,"pulseDurationMs");var ya=Object.getOwnPropertyDescriptor,va=(a,e,t,n)=>{for(var s=n>1?void 0:n?ya(e,t):e,o=a.length-1,p;o>=0;o--)(p=a[o])&&(s=p(s)||s);return s};let je=class extends E{render(){return u`
      <div class="badge">
        <span class="badge-dot"></span>
        <slot>New</slot>
      </div>
    `}};je.styles=T`
    :host {
      display: inline-block;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      font-size: 12px;
      font-weight: 600;
      border-radius: 12px;
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .badge-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: white;
    }
  `;je=va([I("Pulse",{class:ke,config:{initiallyPulsing:!0}})],je);var ka=Object.defineProperty,wa=(a,e,t,n)=>{for(var s=void 0,o=a.length-1,p;o>=0;o--)(p=a[o])&&(s=p(e,t,s)||s);return s&&ka(e,t,s),s};const Et=class Et extends B{constructor(e,t){super(e,t),this._handleSystemThemeChange=n=>{this.systemTheme=n.matches?"dark":"light",this.theme==="auto"&&(this._applyResolvedTheme(),this._applyCSSVariables())},this._cssPrefix=t.cssPrefix||"--theme",this.theme=t.defaultTheme||"light",this.systemTheme=this._detectSystemTheme(),this.colors=this._computeColors(),this._applyResolvedTheme(),this._applyCSSVariables()}connectedCallback(){this.config.respectSystemTheme!==!1&&(this._setupSystemThemeListener(),this._applyResolvedTheme(),this._applyCSSVariables())}disconnectedCallback(){this._mediaQuery&&this._mediaQuery.removeEventListener("change",this._handleSystemThemeChange)}updated(e){super.updated(e),e.has("theme")&&(this.colors=this._computeColors(),this._applyResolvedTheme(),this._applyCSSVariables())}getResolvedTheme(){return this.theme==="auto"?this.systemTheme:this.theme}toggleTheme(){this.theme=this.getResolvedTheme()==="light"?"dark":"light"}setTheme(e){this.theme=e}setRespectSystemTheme(e){this.config.respectSystemTheme=e,e?(this._setupSystemThemeListener(),this.systemTheme=this._detectSystemTheme(),this._applyResolvedTheme(),this._applyCSSVariables()):this._mediaQuery&&(this._mediaQuery.removeEventListener("change",this._handleSystemThemeChange),this._mediaQuery=void 0)}setCssPrefix(e){this._cssPrefix=e,this._applyCSSVariables()}refreshTheme(){this.systemTheme=this._detectSystemTheme(),this.colors=this._computeColors(),this._applyResolvedTheme(),this._applyCSSVariables()}_setupSystemThemeListener(){!this._mediaQuery&&typeof window<"u"&&window.matchMedia&&(this._mediaQuery=window.matchMedia("(prefers-color-scheme: dark)"),this._mediaQuery.addEventListener("change",this._handleSystemThemeChange))}_detectSystemTheme(){return typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}_computeColors(){return this.getResolvedTheme()==="dark"?{background:"#1a1a1a",foreground:"#ffffff",primary:"#667eea",secondary:"#764ba2",accent:"#f093fb"}:{background:"#ffffff",foreground:"#333333",primary:"#667eea",secondary:"#764ba2",accent:"#f5576c"}}_applyResolvedTheme(){const e=this.getResolvedTheme();this.host.setAttribute("data-theme",e)}_applyCSSVariables(){const e=this.host.style;e.setProperty(`${this._cssPrefix}-bg`,this.colors.background),e.setProperty(`${this._cssPrefix}-fg`,this.colors.foreground),e.setProperty(`${this._cssPrefix}-primary`,this.colors.primary),e.setProperty(`${this._cssPrefix}-secondary`,this.colors.secondary),e.setProperty(`${this._cssPrefix}-accent`,this.colors.accent)}};Et.properties={colors:{type:Object,attribute:!1},systemTheme:{type:String,attribute:!1}};let ne=Et;wa([M({type:String,reflect:!0})],ne.prototype,"theme");var _a=Object.getOwnPropertyDescriptor,$a=(a,e,t,n)=>{for(var s=n>1?void 0:n?_a(e,t):e,o=a.length-1,p;o>=0;o--)(p=a[o])&&(s=p(s)||s);return s};let Ne=class extends E{render(){return u`
      <div class="card">
        <div class="card-header">
          <h3 class="card-title"><slot name="title">Themed Card</slot></h3>
          <button class="theme-toggle" @click=${()=>this.Theme.toggleTheme()}>
            ${this.Theme.getResolvedTheme()==="light"?"◐":"◑"}
          </button>
        </div>
        <div class="card-content">
          <slot>This card adapts to your theme preference.</slot>
        </div>
      </div>
    `}};Ne.styles=T`
    :host {
      display: block;
    }

    .card {
      padding: 24px;
      border-radius: 16px;
      background: var(--theme-bg, #fff);
      color: var(--theme-fg, #333);
      border: 2px solid var(--theme-primary, #667eea);
      transition: all 0.3s ease;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .card-title {
      font-size: 20px;
      font-weight: 700;
      margin: 0;
      color: var(--theme-primary, #667eea);
    }

    .theme-toggle {
      padding: 8px 16px;
      border: none;
      border-radius: 8px;
      background: var(--theme-primary, #667eea);
      color: white;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s;
    }

    .theme-toggle:hover {
      transform: scale(1.05);
    }

    .card-content {
      font-size: 14px;
      line-height: 1.6;
      opacity: 0.9;
    }
  `;Ne=$a([I("Theme",{class:ne,config:{defaultTheme:"light",respectSystemTheme:!0}})],Ne);var Ca=Object.getOwnPropertyDescriptor,Ta=(a,e,t,n)=>{for(var s=n>1?void 0:n?Ca(e,t):e,o=a.length-1,p;o>=0;o--)(p=a[o])&&(s=p(s)||s);return s};let Be=class extends E{render(){return u`
      <button>
        <slot>Themed Button</slot>
      </button>
    `}};Be.styles=T`
    :host {
      display: inline-block;
    }

    button {
      padding: 12px 32px;
      font-size: 16px;
      font-weight: 600;
      border: 2px solid var(--theme-primary, #667eea);
      border-radius: 12px;
      background: var(--theme-bg, #fff);
      color: var(--theme-fg, #333);
      cursor: pointer;
      transition: all 0.2s;
      position: relative;
      overflow: hidden;
    }

    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    }

    button::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        var(--theme-accent, rgba(102, 126, 234, 0.3)),
        transparent
      );
      transition: left 0.5s;
    }

    button:hover::before {
      left: 100%;
    }
  `;Be=Ta([I("Theme",{class:ne,config:{defaultTheme:"dark",respectSystemTheme:!1}})],Be);var Sa=Object.getOwnPropertyDescriptor,Da=(a,e,t,n)=>{for(var s=n>1?void 0:n?Sa(e,t):e,o=a.length-1,p;o>=0;o--)(p=a[o])&&(s=p(s)||s);return s};let He=class extends E{render(){const a=this.Theme.getResolvedTheme();return u`
      <div class="panel">
        <div class="panel-indicator">
          ${this.Theme.theme==="auto"?`Auto (${a})`:a}
        </div>
        <div class="panel-content">
          <slot>
            This panel respects your system's theme preference when in auto mode.
          </slot>
        </div>
      </div>
    `}};He.styles=T`
    :host {
      display: block;
    }

    .panel {
      padding: 32px;
      border-radius: 12px;
      background: var(--theme-bg, #fff);
      color: var(--theme-fg, #333);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      border-left: 4px solid var(--theme-accent, #f5576c);
    }

    .panel-indicator {
      display: inline-block;
      padding: 4px 12px;
      margin-bottom: 12px;
      border-radius: 6px;
      background: var(--theme-primary, #667eea);
      color: white;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .panel-content {
      font-size: 14px;
      line-height: 1.8;
    }
  `;He=Da([I("Theme",{class:ne,config:{defaultTheme:"auto",respectSystemTheme:!0}})],He);var Pa=Object.defineProperty,Ns=(a,e,t,n)=>{for(var s=void 0,o=a.length-1,p;o>=0;o--)(p=a[o])&&(s=p(e,t,s)||s);return s&&Pa(e,t,s),s};const Ke=class Ke extends B{constructor(e,t){super(e,t),this.dismissed=!1,this.handleDismissClick=()=>{this.dismiss()},this.dismissible=t.dismissible??!0,this.dismissLabel=t.dismissLabel||"Dismiss"}dismiss(){!this.dismissible||this.dismissed||(this.dismissed=!0,this._dispatchDismissed())}reset(){this.dismissed=!1}getDismissLabel(){return this.dismissLabel}_dispatchDismissed(){this.host.dispatchEvent(new CustomEvent("dismissed",{bubbles:!0,composed:!0,detail:{source:"manual"}}))}};Ke.properties={dismissLabel:{type:String,attribute:"dismiss-label"}},Ke.styles=T`
    :host([dismissed]) {
      animation: dismissFadeOut 0.2s cubic-bezier(0.4, 0, 1, 1) forwards;
    }

    @keyframes dismissFadeOut {
      to {
        opacity: 0;
        transform: scale(0.95);
      }
    }

    .dismiss-btn {
      position: absolute;
      top: 50%;
      right: 12px;
      transform: translateY(-50%);
      width: 28px;
      height: 28px;
      border: none;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      color: white;
      font-size: 18px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }

    .dismiss-btn:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-50%) scale(1.1);
    }
  `;let ie=Ke;Ns([M({type:Boolean,reflect:!0})],ie.prototype,"dismissible");Ns([M({type:Boolean,reflect:!0})],ie.prototype,"dismissed");var Aa=Object.getOwnPropertyDescriptor,za=(a,e,t,n)=>{for(var s=n>1?void 0:n?Aa(e,t):e,o=a.length-1,p;o>=0;o--)(p=a[o])&&(s=p(s)||s);return s};let Ve=class extends E{render(){return u`
      <div class="notification">
        <span class="notification-icon">ⓘ</span>
        <div class="notification-content">
          <slot>Manual dismiss only - click the × button</slot>
        </div>
        ${this.dismissible?u`
          <button
            class="dismiss-btn"
            @click=${this.Dismiss.handleDismissClick}
            aria-label=${this.Dismiss.getDismissLabel()}
          >
            ×
          </button>
        `:null}
      </div>
    `}};Ve.styles=T`
    :host {
      display: block;
    }

    .notification {
      position: relative;
      padding: 16px 48px 16px 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .notification-icon {
      font-size: 24px;
    }

    .notification-content {
      flex: 1;
      font-size: 14px;
      line-height: 1.5;
    }

  `;Ve=za([I("Dismiss",{class:ie,config:{dismissible:!0}})],Ve);var Oa=Object.defineProperty,Bs=(a,e,t,n)=>{for(var s=void 0,o=a.length-1,p;o>=0;o--)(p=a[o])&&(s=p(e,t,s)||s);return s&&Oa(e,t,s),s};const Mt=class Mt extends ie{constructor(e,t){super(e,t),this.autoDismiss=t.autoDismiss??!1,this.autoDismissTimeout=t.autoDismissTimeout||5e3,this._applyTimerDuration()}updated(e){super.updated(e),e.has("autoDismissTimeout")&&this._applyTimerDuration(),e.has("autoDismiss")&&(this.autoDismiss?this._startTimer():this._clearTimer())}connectedCallback(){this.autoDismiss&&this._startTimer()}disconnectedCallback(){this._clearTimer()}dismiss(){this._clearTimer(),super.dismiss()}startTimer(){this.autoDismiss&&this._startTimer()}stopTimer(){this._clearTimer()}getTimerDurationMs(){return this.autoDismissTimeout}setAutoDismissEnabled(e){this.autoDismiss=e}_dispatchDismissed(){this.host.dispatchEvent(new CustomEvent("dismissed",{bubbles:!0,composed:!0,detail:{source:this._timeoutId!==void 0?"auto":"manual",timeout:this.autoDismissTimeout}}))}_startTimer(){this._clearTimer(),this._timeoutId=window.setTimeout(()=>{super.dismiss()},this.autoDismissTimeout)}_applyTimerDuration(){this.host.style.setProperty("--dismiss-timer-duration",`${this.autoDismissTimeout}ms`)}_clearTimer(){this._timeoutId!==void 0&&(clearTimeout(this._timeoutId),this._timeoutId=void 0)}};Mt.styles=T`
    :host {
      animation: dismissFadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    @keyframes dismissFadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    :host([dismissed]) {
      animation: dismissSlideOut 0.25s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }

    @keyframes dismissSlideOut {
      to {
        opacity: 0;
        transform: translateX(100%) scale(0.95);
      }
    }

    .timer-indicator {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 0 0 12px 12px;
      overflow: hidden;
    }

    .timer-bar {
      height: 100%;
      background: white;
      animation: dismissTimer var(--dismiss-timer-duration, 4s) linear forwards;
    }

    @keyframes dismissTimer {
      from {
        width: 100%;
      }
      to {
        width: 0%;
      }
    }
  `;let ae=Mt;Bs([M({type:Boolean,attribute:"auto-dismiss"})],ae.prototype,"autoDismiss");Bs([M({type:Number,attribute:"auto-dismiss-timeout"})],ae.prototype,"autoDismissTimeout");var Fa=Object.getOwnPropertyDescriptor,Ea=(a,e,t,n)=>{for(var s=n>1?void 0:n?Fa(e,t):e,o=a.length-1,p;o>=0;o--)(p=a[o])&&(s=p(s)||s);return s};let We=class extends E{render(){return u`
      <div class="notification">
        <span class="notification-icon">◷</span>
        <div class="notification-content">
          <slot>Auto-dismisses after 4 seconds (or click ×)</slot>
        </div>
        <button
          class="dismiss-btn"
          @click=${this.Dismiss.handleDismissClick}
          aria-label=${this.Dismiss.getDismissLabel()}
        >
          ×
        </button>
        ${this.autoDismiss?u`
          <div class="timer-indicator">
            <div class="timer-bar"></div>
          </div>
        `:null}
      </div>
    `}};We.styles=T`
    :host {
      display: block;
    }

    .notification {
      position: relative;
      padding: 16px 48px 16px 20px;
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(245, 87, 108, 0.3);
      display: flex;
      align-items: center;
      gap: 12px;
      transition: transform 0.2s;
    }

    .notification-icon {
      font-size: 24px;
    }

    .notification-content {
      flex: 1;
      font-size: 14px;
      line-height: 1.5;
    }

  `;We=Ea([I("Dismiss",{class:ae,config:{dismissible:!0,autoDismiss:!0,autoDismissTimeout:4e3}})],We);var Ma=Object.defineProperty,At=(a,e,t,n)=>{for(var s=void 0,o=a.length-1,p;o>=0;o--)(p=a[o])&&(s=p(e,t,s)||s);return s&&Ma(e,t,s),s};const Lt=class Lt extends ae{constructor(e,t){super(e,t),this.swipeOffset=0,this._startX=0,this._startY=0,this._isDragging=!1,this._handleTouchStart=n=>{this._startX=n.touches[0].clientX,this._startY=n.touches[0].clientY,this._isDragging=!0},this._handleTouchMove=n=>{if(!this._isDragging)return;const s=n.touches[0].clientX,o=n.touches[0].clientY,p=s-this._startX;Math.abs(o-this._startY)<30&&(this.swipeOffset=p,this.host.style.transform=`translateX(${p}px)`,n.preventDefault())},this._handleTouchEnd=()=>{Math.abs(this.swipeOffset)>=this.swipeThreshold?super.dismiss():this._resetSwipe(),this._isDragging=!1},this._handleMouseDown=n=>{this._startX=n.clientX,this._startY=n.clientY,this._isDragging=!0,document.addEventListener("mousemove",this._handleMouseMove),document.addEventListener("mouseup",this._handleMouseUp)},this._handleMouseMove=n=>{if(!this._isDragging)return;const s=n.clientX-this._startX;Math.abs(n.clientY-this._startY)<30&&(this.swipeOffset=s,this.host.style.transform=`translateX(${s}px)`)},this._handleMouseUp=()=>{Math.abs(this.swipeOffset)>=this.swipeThreshold?super.dismiss():this._resetSwipe(),this._isDragging=!1,document.removeEventListener("mousemove",this._handleMouseMove),document.removeEventListener("mouseup",this._handleMouseUp)},this.swipeToDismiss=t.swipeToDismiss??!0,this.swipeThreshold=t.swipeThreshold||100}updated(e){super.updated(e),e.has("swipeToDismiss")&&(this.swipeToDismiss?this._attachSwipeListeners():this._detachSwipeListeners())}connectedCallback(){super.connectedCallback(),this.swipeToDismiss&&this._attachSwipeListeners()}disconnectedCallback(){super.disconnectedCallback(),this._detachSwipeListeners()}_dispatchDismissed(){const e=this._isDragging?"swipe":"auto";this.host.dispatchEvent(new CustomEvent("dismissed",{bubbles:!0,composed:!0,detail:{source:e,swipeDistance:this.swipeOffset}}))}setSwipeEnabled(e){this.swipeToDismiss=e}_resetSwipe(){this.swipeOffset=0,this.host.style.transform=""}_attachSwipeListeners(){this.host.addEventListener("touchstart",this._handleTouchStart,{passive:!0}),this.host.addEventListener("touchmove",this._handleTouchMove,{passive:!1}),this.host.addEventListener("touchend",this._handleTouchEnd),this.host.addEventListener("mousedown",this._handleMouseDown)}_detachSwipeListeners(){this.host.removeEventListener("touchstart",this._handleTouchStart),this.host.removeEventListener("touchmove",this._handleTouchMove),this.host.removeEventListener("touchend",this._handleTouchEnd),this.host.removeEventListener("mousedown",this._handleMouseDown),document.removeEventListener("mousemove",this._handleMouseMove),document.removeEventListener("mouseup",this._handleMouseUp)}};Lt.styles=T`
    .notification {
      cursor: grab;
      user-select: none;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .notification:active {
      cursor: grabbing;
      box-shadow: 0 6px 16px rgba(79, 172, 254, 0.4);
    }

    .dismiss-btn {
      z-index: 10;
    }
  `;let oe=Lt;At([M({type:Boolean,attribute:"swipe-to-dismiss"})],oe.prototype,"swipeToDismiss");At([M({type:Number,attribute:"swipe-threshold"})],oe.prototype,"swipeThreshold");At([M({type:Number,attribute:!1})],oe.prototype,"swipeOffset");var La=Object.getOwnPropertyDescriptor,Ra=(a,e,t,n)=>{for(var s=n>1?void 0:n?La(e,t):e,o=a.length-1,p;o>=0;o--)(p=a[o])&&(s=p(s)||s);return s};let Ye=class extends E{render(){return u`
      <div class="notification">
        <span class="notification-icon">⇋</span>
        <div class="notification-content">
          <slot>
            <div>All three dismiss methods available!</div>
            <div class="notification-hint">
              Swipe left/right • Click × • Wait 6 sec
            </div>
          </slot>
        </div>
        <button
          class="dismiss-btn"
          @click=${this.Dismiss.handleDismissClick}
          aria-label=${this.Dismiss.getDismissLabel()}
        >
          ×
        </button>
        <div class="timer-indicator">
          <div class="timer-bar"></div>
        </div>
      </div>
    `}};Ye.styles=T`
    :host {
      display: block;
    }

    .notification {
      position: relative;
      padding: 16px 48px 16px 20px;
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      color: white;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(79, 172, 254, 0.3);
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .notification-icon {
      font-size: 24px;
    }

    .notification-content {
      flex: 1;
      font-size: 14px;
      line-height: 1.5;
    }

    .notification-hint {
      font-size: 11px;
      opacity: 0.8;
      margin-top: 4px;
    }

  `;Ye=Ra([I("Dismiss",{class:oe,config:{dismissible:!0,autoDismiss:!0,autoDismissTimeout:6e3,swipeToDismiss:!0,swipeThreshold:100}})],Ye);var Ia=Object.defineProperty,zt=(a,e,t,n)=>{for(var s=void 0,o=a.length-1,p;o>=0;o--)(p=a[o])&&(s=p(e,t,s)||s);return s&&Ia(e,t,s),s};const Rt=class Rt extends E{constructor(){super(...arguments),this._showAutoNotification=!0,this._showSwipeNotification=!0,this._showBasicNotification=!0}render(){return u`
      <div class="container">
        ${this._renderTier1()}
        ${this._renderTier2()}
        ${this._renderTier3()}
        ${this._renderCTA()}
      </div>
    `}_renderTier1(){return u`
      <div class="tier-section">
        <div class="tier-header">
          <h2 class="tier-title">Write Once, Use Everywhere</h2>
          <p class="tier-description">
            Features are single sources of truth. Write a feature once, 
            apply it to any component instantly.
          </p>
        </div>

        <div class="code-section">
          <div class="code-header">
            <div class="code-title">Step 1: Define a feature (once)</div>
            <div class="code-lang">TypeScript</div>
          </div>
          <pre><code><span class="keyword">export class</span> <span class="type">RippleFeature</span> <span class="keyword">extends</span> <span class="type">LitFeature</span> {
  <span class="comment">// Just one reactive property</span>
  <span class="property">@property</span>({ <span class="property">type</span>: Boolean })
  <span class="property">rippling</span> = <span class="keyword">false</span>;
  
  <span class="comment">// Simple click handler</span>
  <span class="function">connectedCallback</span>(): <span class="keyword">void</span> {
    <span class="keyword">this</span>.<span class="property">host</span>.<span class="function">addEventListener</span>(<span class="string">'click'</span>, <span class="keyword">this</span>.<span class="property">_handleClick</span>);
  }
}</code></pre>
        </div>

        <div class="code-section">
          <div class="code-header">
            <div class="code-title">Step 2: Use it everywhere</div>
            <div class="code-lang">TypeScript</div>
          </div>
          <pre><code><span class="comment">// Button with ripple</span>
<span class="property">@provide</span>(<span class="string">'Ripple'</span>, { <span class="property">class</span>: RippleFeature })
<span class="keyword">export class</span> <span class="type">SimpleButton</span> <span class="keyword">extends</span> <span class="type">LitCore</span> { }

<span class="comment">// Card with ripple (same feature!)</span>
<span class="property">@provide</span>(<span class="string">'Ripple'</span>, { <span class="property">class</span>: RippleFeature })
<span class="keyword">export class</span> <span class="type">SimpleCard</span> <span class="keyword">extends</span> <span class="type">LitCore</span> { }</code></pre>
        </div>

        <div class="demo-grid">
          <div class="demo-item">
            <div class="demo-label">Button + RippleFeature</div>
            <simple-button>Click for Ripple</simple-button>
          </div>
          <div class="demo-item">
            <div class="demo-label">Card + RippleFeature</div>
            <simple-card>
              <span slot="title">Interactive Card</span>
              Click me to see the same ripple effect!
            </simple-card>
          </div>
          <div class="demo-item">
            <div class="demo-label">Badge + PulseFeature</div>
            <simple-badge>New Feature</simple-badge>
          </div>
        </div>

        <div class="benefits-list">
          <div class="benefit-item">
            <div class="benefit-icon">✓</div>
            <div class="benefit-text">
              <div class="benefit-title">Single Source of Truth</div>
              <div class="benefit-description">
                Write behavior once, reuse across all components
              </div>
            </div>
          </div>
          <div class="benefit-item">
            <div class="benefit-icon">↻</div>
            <div class="benefit-text">
              <div class="benefit-title">Zero Duplication</div>
              <div class="benefit-description">
                No more copy-pasting logic between components
              </div>
            </div>
          </div>
          <div class="benefit-item">
            <div class="benefit-icon">⚡</div>
            <div class="benefit-text">
              <div class="benefit-title">Instant Reusability</div>
              <div class="benefit-description">
                One decorator call applies the complete feature
              </div>
            </div>
          </div>
        </div>
      </div>
    `}_renderTier2(){return u`
      <div class="tier-section">
        <div class="tier-header">
          <h2 class="tier-title">Modern TypeScript Ready</h2>
          <p class="tier-description">
            Features support both modern decorators and static properties. 
            Full lifecycle hooks, configuration, and type safety.
          </p>
        </div>

        <div class="code-section">
          <div class="code-header">
            <div class="code-title">Sophisticated feature with both patterns</div>
            <div class="code-lang">TypeScript</div>
          </div>
          <pre><code><span class="keyword">export class</span> <span class="type">ThemeFeature</span> <span class="keyword">extends</span> <span class="type">LitFeature</span>&lt;<span class="type">ThemeConfig</span>&gt; {
  <span class="comment">// Modern decorator syntax</span>
  <span class="property">@property</span>({ <span class="property">type</span>: String, <span class="property">reflect</span>: <span class="keyword">true</span> })
  <span class="property">theme</span>: <span class="string">'light'</span> | <span class="string">'dark'</span> | <span class="string">'auto'</span>;
  
  <span class="comment">// Traditional static properties</span>
  <span class="keyword">static</span> <span class="property">properties</span> = {
    <span class="property">colors</span>: { <span class="property">type</span>: Object },
    <span class="property">systemTheme</span>: { <span class="property">type</span>: String }
  };
  
  <span class="comment">// Lifecycle hooks</span>
  <span class="function">connectedCallback</span>(): <span class="keyword">void</span> { <span class="comment">/* setup */</span> }
  <span class="function">updated</span>(<span class="property">props</span>): <span class="keyword">void</span> { <span class="comment">/* react to changes */</span> }
}</code></pre>
        </div>

        <div class="demo-grid">
          <div class="demo-item">
            <div class="demo-label">ThemeFeature + Card</div>
            <themed-card>
              <span slot="title">Adaptive Theme</span>
              Click the theme toggle to switch between light and dark modes.
            </themed-card>
          </div>
          <div class="demo-item">
            <div class="demo-label">ThemeFeature + Button</div>
            <themed-button>Themed Button</themed-button>
            <br><br>
            <themed-button theme="light">Another One</themed-button>
          </div>
        </div>

        <div class="demo-item" style="margin-top: 24px;">
          <div class="demo-label">ThemeFeature + Panel (Auto Mode)</div>
          <themed-panel>
            This panel automatically respects your system's theme preference.
            Try changing your OS theme setting to see it adapt!
          </themed-panel>
        </div>

        <div class="benefits-list">
          <div class="benefit-item">
            <div class="benefit-icon">⚙</div>
            <div class="benefit-text">
              <div class="benefit-title">Your Style, Your Choice</div>
              <div class="benefit-description">
                Use decorators, static properties, or both
              </div>
            </div>
          </div>
          <div class="benefit-item">
            <div class="benefit-icon">⚡</div>
            <div class="benefit-text">
              <div class="benefit-title">Configuration-Driven</div>
              <div class="benefit-description">
                Each component can configure features differently
              </div>
            </div>
          </div>
          <div class="benefit-item">
            <div class="benefit-icon">✓</div>
            <div class="benefit-text">
              <div class="benefit-title">Full Type Safety</div>
              <div class="benefit-description">
                TypeScript support with complete auto-completion
              </div>
            </div>
          </div>
        </div>
      </div>
    `}_renderTier3(){return u`
      <div class="tier-section">
        <div class="tier-header">
          <h2 class="tier-title">Features Extend Features</h2>
          <p class="tier-description">
            Features are first-class citizens that support inheritance. 
            Build sophisticated feature hierarchies with ease.
          </p>
        </div>

        <div class="inheritance-diagram">
          <div class="inheritance-level">BaseDismissFeature</div>
          <div class="inheritance-level">AutoDismissFeature</div>
          <div class="inheritance-level">SwipeDismissFeature</div>
        </div>

        <div class="code-section">
          <div class="code-header">
            <div class="code-title">Base feature</div>
            <div class="code-lang">TypeScript</div>
          </div>
          <pre><code><span class="comment">// Level 1: Manual dismiss</span>
<span class="keyword">export class</span> <span class="type">BaseDismissFeature</span> <span class="keyword">extends</span> <span class="type">LitFeature</span> {
  <span class="function">dismiss</span>() { <span class="comment">/* basic dismiss logic */</span> }
}</code></pre>
        </div>

        <div class="code-section">
          <div class="code-header">
            <div class="code-title">Extended feature</div>
            <div class="code-lang">TypeScript</div>
          </div>
          <pre><code><span class="comment">// Level 2: Extends with auto-dismiss timer</span>
<span class="keyword">export class</span> <span class="type">AutoDismissFeature</span> <span class="keyword">extends</span> <span class="type">BaseDismissFeature</span> {
  <span class="keyword">override</span> <span class="function">dismiss</span>() {
    <span class="keyword">this</span>.<span class="function">_clearTimer</span>();
    <span class="keyword">super</span>.<span class="function">dismiss</span>();
  }
}</code></pre>
        </div>

        <div class="code-section">
          <div class="code-header">
            <div class="code-title">Doubly extended feature</div>
            <div class="code-lang">TypeScript</div>
          </div>
          <pre><code><span class="comment">// Level 3: Extends with swipe gestures!</span>
<span class="keyword">export class</span> <span class="type">SwipeDismissFeature</span> <span class="keyword">extends</span> <span class="type">AutoDismissFeature</span> {
  <span class="comment">// Inherits timer AND adds gesture support</span>
  <span class="keyword">override</span> <span class="function">connectedCallback</span>() {
    <span class="keyword">super</span>.<span class="function">connectedCallback</span>();
    <span class="keyword">this</span>.<span class="property">host</span>.<span class="function">addEventListener</span>(<span class="string">'touchstart'</span>, ...);
  }
}</code></pre>
        </div>

        <div class="notification-stack">
          <div class="notification-slot">
            ${this._showBasicNotification?u`
              <basic-notification @dismissed=${this._handleBasicNotificationDismissed}>
                <strong>Level 1:</strong> BaseDismissFeature - Manual dismiss only
              </basic-notification>
            `:u`
              <div class="notification-placeholder"></div>
            `}
          </div>
          
          <div class="notification-slot">
            ${this._showAutoNotification?u`
              <auto-notification @dismissed=${this._handleAutoNotificationDismissed}>
                <strong>Level 2:</strong> AutoDismissFeature - Manual + Timer (4s)
              </auto-notification>
            `:u`
              <div class="notification-placeholder"></div>
            `}
          </div>
          
          <div class="notification-slot">
            ${this._showSwipeNotification?u`
              <swipe-notification @dismissed=${this._handleSwipeNotificationDismissed}>
                <strong>Level 3:</strong> SwipeDismissFeature - Manual + Timer + Swipe!
              </swipe-notification>
            `:u`
              <div class="notification-placeholder"></div>
            `}
          </div>
        </div>

        <div class="benefits-list">
          <div class="benefit-item">
            <div class="benefit-icon">◎</div>
            <div class="benefit-text">
              <div class="benefit-title">Composable Architecture</div>
              <div class="benefit-description">
                Build complex features from simpler ones
              </div>
            </div>
          </div>
          <div class="benefit-item">
            <div class="benefit-icon">⋮</div>
            <div class="benefit-text">
              <div class="benefit-title">Choose Your Level</div>
              <div class="benefit-description">
                Components pick exactly the features they need
              </div>
            </div>
          </div>
          <div class="benefit-item">
            <div class="benefit-icon">⚙</div>
            <div class="benefit-text">
              <div class="benefit-title">Configure Down the Tree</div>
              <div class="benefit-description">
                Override config at any inheritance level
              </div>
            </div>
          </div>
        </div>
      </div>
    `}_renderCTA(){return u`
      <div class="cta-section">
        <h2 class="cta-title">Ready to Transform Your Component Library?</h2>
        <p class="cta-description">
          LitFeature makes component features inherently reusable, composable, and maintainable.
        </p>
        <div class="cta-buttons">
          <a class="cta-button" href="https://github.com/StephenRiosDev/LitFeature" target="_blank">
            View on GitHub
          </a>
          <button class="cta-button secondary" @click="${this._goToDocs}">
            Read the Docs
          </button>
        </div>
      </div>
    `}_handleAutoNotificationDismissed(){setTimeout(()=>{this._showAutoNotification=!1},200),setTimeout(()=>{this._showAutoNotification=!0},500)}_handleSwipeNotificationDismissed(){setTimeout(()=>{this._showSwipeNotification=!1},200),setTimeout(()=>{this._showSwipeNotification=!0},500)}_handleBasicNotificationDismissed(){setTimeout(()=>{this._showBasicNotification=!1},200),setTimeout(()=>{this._showBasicNotification=!0},500)}_goToDocs(){this.dispatchEvent(new CustomEvent("navigate",{detail:{page:"docs"},bubbles:!0,composed:!0}))}};Rt.styles=T`
    :host {
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #e0e0e0;
      background: #030303;
      min-height: 100vh;
      padding: 0 20px 40px 20px;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .header {
      text-align: center;
      color: #e0e0e0;
      margin-bottom: 60px;
    }

    .header h1 {
      font-size: 48px;
      font-weight: 800;
      margin: 0 0 16px 0;
      letter-spacing: -1px;
      background: linear-gradient(135deg, #4d64ff 0%, #90ffff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .header p {
      font-size: 20px;
      color: #a0a0a0;
      margin: 0;
      font-weight: 400;
    }

    .tier-section {
      background: #1a1a1a;
      border-radius: 20px;
      padding: 40px;
      margin-bottom: 40px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
      border: 1px solid #404040;
    }

    .tier-header {
      border-bottom: 3px solid #4d64ff;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }

    .tier-label {
      display: inline-block;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #4d64ff;
      background: rgba(77, 100, 255, 0.1);
      padding: 6px 12px;
      border-radius: 6px;
      margin-bottom: 12px;
    }

    .tier-title {
      font-size: 32px;
      font-weight: 700;
      margin: 0 0 8px 0;
      color: #e0e0e0;
    }

    .tier-description {
      font-size: 16px;
      color: #a0a0a0;
      line-height: 1.6;
      margin: 0;
    }

    .demo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
      margin: 30px 0;
    }

    .demo-item {
      background: #2a2a2a;
      border-radius: 12px;
      padding: 24px;
      border: 1px solid #404040;
      transition: all 0.3s ease;
    }

    .demo-item:hover {
      border-color: #4d64ff;
      background: #323232;
    }

    .demo-label {
      font-size: 12px;
      font-weight: 600;
      color: #90ffff;
      margin-bottom: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .code-section {
      background: #0a0a0a;
      border-radius: 12px;
      padding: 24px;
      margin: 30px 0;
      overflow-x: auto;
      border: 1px solid #404040;
    }

    .code-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .code-title {
      font-size: 14px;
      font-weight: 600;
      color: #e0e0e0;
    }

    .code-lang {
      font-size: 11px;
      font-weight: 600;
      color: #888;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    pre {
      margin: 0;
      font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
      font-size: 13px;
      line-height: 1.6;
      color: #d4d4d4;
    }

    .keyword { color: #569cd6; }
    .string { color: #ce9178; }
    .comment { color: #6a9955; }
    .function { color: #dcdcaa; }
    .type { color: #4ec9b0; }
    .property { color: #9cdcfe; }

    .benefits-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin: 30px 0;
    }

    .benefit-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      background: #2a2a2a;
      padding: 20px;
      border-radius: 12px;
      border: 1px solid #404040;
    }

    .benefit-icon {
      font-size: 20px;
      flex-shrink: 0;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(77, 100, 255, 0.1);
      border-radius: 8px;
      color: #4d64ff;
      font-weight: 700;
    }

    .benefit-text {
      flex: 1;
    }

    .benefit-title {
      font-size: 14px;
      font-weight: 700;
      color: #e0e0e0;
      margin: 0 0 4px 0;
    }

    .benefit-description {
      font-size: 13px;
      color: #a0a0a0;
      margin: 0;
      line-height: 1.5;
    }

    .notification-stack {
      display: flex;
      flex-direction: column;
      gap: 16px;
      max-width: 500px;
    }

    .notification-slot {
      min-height: 70px;
      position: relative;
    }

    .notification-placeholder {
      height: 70px;
      opacity: 0;
      pointer-events: none;
    }

    .inheritance-diagram {
      background: #2a2a2a;
      border-radius: 12px;
      padding: 30px;
      margin: 30px 0;
      text-align: center;
      border: 1px solid #404040;
    }

    .inheritance-level {
      display: inline-block;
      padding: 12px 24px;
      background: #1a1a1a;
      border: 2px solid #4d64ff;
      border-radius: 8px;
      margin: 8px;
      font-weight: 600;
      color: #e0e0e0;
      position: relative;
    }

    .inheritance-level::after {
      content: '→';
      position: absolute;
      right: -30px;
      top: 50%;
      transform: translateY(-50%);
      color: #4d64ff;
      font-size: 20px;
    }

    .inheritance-level:last-child::after {
      display: none;
    }

    .cta-section {
      text-align: center;
      padding: 40px;
      background: linear-gradient(135deg, #4d64ff 0%, rgba(77, 100, 255, 0.8) 100%);
      color: white;
      border-radius: 20px;
      margin-top: 40px;
      border: 2px solid #90ffff;
    }

    .cta-title {
      font-size: 28px;
      font-weight: 700;
      margin: 0 0 16px 0;
    }

    .cta-description {
      font-size: 16px;
      opacity: 0.9;
      margin: 0 0 24px 0;
    }

    .cta-buttons {
      display: flex;
      gap: 16px;
      justify-content: center;
      flex-wrap: wrap;
    }

    .cta-button {
      padding: 14px 32px;
      font-size: 16px;
      font-weight: 600;
      border: 2px solid white;
      border-radius: 12px;
      background: white;
      color: #4d64ff;
      cursor: pointer;
      transition: all 0.2s;
      text-decoration: none;
      display: inline-block;
    }

    .cta-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    }

    .cta-button.secondary {
      background: transparent;
      color: white;
    }

    /* Extra Small Devices (375px - 479px) */
    @media (max-width: 479px) {
      :host {
        padding: 0 16px 24px 16px;
      }

      .container {
        width: 100%;
      }

      .header {
        margin-bottom: 32px;
      }

      .header h1 {
        font-size: 28px;
        margin: 0 0 12px 0;
        letter-spacing: -0.5px;
      }

      .header p {
        font-size: 14px;
      }

      .tier-section {
        padding: 20px;
        margin-bottom: 24px;
        border-radius: 16px;
      }

      .tier-header {
        padding-bottom: 16px;
        margin-bottom: 20px;
      }

      .tier-label {
        font-size: 10px;
        padding: 4px 8px;
        margin-bottom: 8px;
      }

      .tier-title {
        font-size: 22px;
        margin: 0 0 8px 0;
      }

      .tier-description {
        font-size: 14px;
        line-height: 1.5;
      }

      .demo-grid {
        grid-template-columns: 1fr;
        gap: 16px;
        margin: 20px 0;
      }

      .demo-item {
        padding: 16px;
        border-radius: 10px;
      }

      .demo-label {
        font-size: 11px;
        margin-bottom: 10px;
      }

      .code-section {
        padding: 16px;
        margin: 16px 0;
        border-radius: 10px;
      }

      .code-header {
        flex-direction: column;
        gap: 8px;
        margin-bottom: 12px;
      }

      .code-title {
        font-size: 13px;
      }

      pre {
        font-size: 11px;
        line-height: 1.4;
      }

      .benefits-list {
        grid-template-columns: 1fr;
        gap: 12px;
        margin: 20px 0;
      }

      .benefit-item {
        padding: 16px;
        gap: 10px;
      }

      .benefit-icon {
        width: 28px;
        height: 28px;
        line-height: 28px;
        font-size: 14px;
      }

      .benefit-title {
        font-size: 13px;
      }

      .benefit-description {
        font-size: 12px;
      }

      .inheritance-diagram {
        padding: 20px;
        margin: 16px 0;
      }

      .inheritance-level {
        padding: 10px 16px;
        font-size: 13px;
        margin: 6px;
      }

      .inheritance-level::after {
        right: -22px;
        font-size: 16px;
      }

      .cta-section {
        padding: 24px;
        margin-top: 24px;
        border-radius: 16px;
      }

      .cta-title {
        font-size: 20px;
        margin: 0 0 12px 0;
      }

      .cta-description {
        font-size: 14px;
        margin: 0 0 16px 0;
      }

      .cta-buttons {
        flex-direction: column;
        gap: 12px;
      }

      .cta-button {
        padding: 10px 20px;
        font-size: 14px;
        width: 100%;
        box-sizing: border-box;
      }
    }

    /* Small Devices (480px - 639px) */
    @media (min-width: 480px) and (max-width: 639px) {
      :host {
        padding: 0 20px 32px 20px;
      }

      .header h1 {
        font-size: 32px;
        margin: 0 0 12px 0;
      }

      .header p {
        font-size: 15px;
      }

      .tier-section {
        padding: 24px;
        margin-bottom: 28px;
      }

      .tier-title {
        font-size: 26px;
      }

      .tier-description {
        font-size: 15px;
      }

      .demo-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .code-section {
        padding: 18px;
        margin: 18px 0;
      }

      pre {
        font-size: 12px;
        line-height: 1.5;
      }

      .benefits-list {
        grid-template-columns: 1fr;
        gap: 14px;
      }

      .benefit-item {
        padding: 16px;
      }

      .cta-section {
        padding: 28px;
      }

      .cta-button {
        width: 100%;
      }
    }

    /* Medium Devices (640px - 767px) */
    @media (min-width: 640px) and (max-width: 767px) {
      :host {
        padding: 0 24px 32px 24px;
      }

      .header h1 {
        font-size: 36px;
      }

      .header p {
        font-size: 16px;
      }

      .tier-section {
        padding: 32px;
        margin-bottom: 32px;
      }

      .tier-title {
        font-size: 28px;
      }

      .demo-grid {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 18px;
      }

      .benefits-list {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
      }

      .code-section {
        padding: 20px;
      }

      .cta-buttons {
        flex-wrap: wrap;
      }

      .cta-buttons .cta-button {
        width: auto;
      }
    }

    /* Tablet & Small Laptop (768px - 1023px) */
    @media (min-width: 768px) and (max-width: 1023px) {
      :host {
        padding: 0 24px 40px 24px;
      }

      .header h1 {
        font-size: 40px;
      }

      .header p {
        font-size: 17px;
      }

      .tier-section {
        padding: 36px;
        margin-bottom: 36px;
      }

      .tier-title {
        font-size: 30px;
      }

      .demo-grid {
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 20px;
      }

      .benefits-list {
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 18px;
      }

      .inheritance-diagram {
        padding: 28px;
      }

      .cta-button {
        padding: 12px 28px;
      }
    }

    /* Large Devices (1024px+) */
    @media (min-width: 1024px) {
      /* Default styles already set */
    }
  `;let re=Rt;zt([O()],re.prototype,"_showAutoNotification");zt([O()],re.prototype,"_showSwipeNotification");zt([O()],re.prototype,"_showBasicNotification");customElements.define("simple-button",Ie);customElements.define("simple-card",Ue);customElements.define("simple-badge",je);customElements.define("themed-card",Ne);customElements.define("themed-button",Be);customElements.define("themed-panel",He);customElements.define("basic-notification",Ve);customElements.define("auto-notification",We);customElements.define("swipe-notification",Ye);customElements.define("showcase-demo",re);var Ua=Object.getOwnPropertyDescriptor,ja=(a,e,t,n)=>{for(var s=n>1?void 0:n?Ua(e,t):e,o=a.length-1,p;o>=0;o--)(p=a[o])&&(s=p(s)||s);return s};let vt=class extends F{render(){return u`
      <div class="hero">
        <div class="eyebrow">Interactive Demo</div>
        <h1>LitFeature in Action</h1>
        <p class="lead">
          Explore how features compose across different component types—from simple ripple effects to complex state management with dismissible notifications.
        </p>
      </div>
      <showcase-demo></showcase-demo>
    `}};vt.styles=T`
    :host {
      display: block;
      width: 100%;
      color: #f2f2f2;
      font-family: 'IBM Plex Sans', 'Space Grotesk', 'Segoe UI', system-ui, sans-serif;
    }

    :host * {
      box-sizing: border-box;
    }

    .hero {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 12px;
      margin-bottom: 32px;
      padding: 0 32px;
    }

    .eyebrow {
      text-transform: uppercase;
      letter-spacing: 0.24em;
      font-size: 11px;
      font-weight: 600;
      color: #7dd3fc;
    }

    h1 {
      font-size: 52px;
      line-height: 1.1;
      margin: 0;
      letter-spacing: -0.02em;
      background: linear-gradient(135deg, #7dd3fc 0%, #34d399 60%, #fbbf24 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-weight: 700;
    }

    .lead {
      font-size: 17px;
      line-height: 1.7;
      color: #cbd5f5;
      max-width: 800px;
    }

    @media (max-width: 768px) {
      h1 {
        font-size: 36px;
      }

      .hero {
        padding: 0 16px;
      }
    }
  `;vt=ja([_e("demo-page")],vt);var Na=Object.defineProperty,et=(a,e,t,n)=>{for(var s=void 0,o=a.length-1,p;o>=0;o--)(p=a[o])&&(s=p(e,t,s)||s);return s&&Na(e,t,s),s};const It=class It extends F{constructor(){super(...arguments),this._componentCount=0,this._components=[],this._initialized=!1,this._performanceSummary={totalTime:0,componentCount:0,avgPerComponent:0,warnings:0,errors:0}}firstUpdated(){$.mark("stress-test-init-start")}render(){return u`
      <div class="container">
        <div class="header">
          <h1>🔥 LitFeature Stress Test</h1>
          <p class="subtitle">
            Rendering 50+ showcase components with varying complexity to identify performance bottlenecks
            and scaling limitations. Assuming potential scale to 2500+ components.
          </p>

          ${this._performanceSummary.warnings>0||this._performanceSummary.errors>0?u`
                <div class="warning-message">
                  ⚠️ Performance issues detected during initialization:
                  ${this._performanceSummary.warnings} warnings,
                  ${this._performanceSummary.errors} errors
                </div>
              `:""}

          <div class="controls">
            <button
              class="btn-primary"
              @click=${this._handleGenerateComponents}
              ?disabled=${this._initialized}
            >
              ${this._initialized?"Generated ✓":"Generate 50+ Components"}
            </button>
            <button class="btn-secondary" @click=${this._handleClear}>Clear & Reset</button>
            <button class="btn-secondary" @click=${this._handleLogMetrics}>
              📊 Log Metrics
            </button>
          </div>

          ${this._initialized?u`
                <div class="stats">
                  <div class="stat">
                    <div class="stat-label">Total Components</div>
                    <div class="stat-value">${this._performanceSummary.componentCount}</div>
                  </div>
                  <div class="stat">
                    <div class="stat-label">Total Init Time</div>
                    <div class="stat-value">${this._performanceSummary.totalTime.toFixed(2)}ms</div>
                  </div>
                  <div class="stat">
                    <div class="stat-label">Avg per Component</div>
                    <div class="stat-value">${this._performanceSummary.avgPerComponent.toFixed(3)}ms</div>
                  </div>
                  <div class="stat">
                    <div class="stat-label">Issues</div>
                    <div
                      class="stat-value ${this._performanceSummary.warnings>0?"warning":this._performanceSummary.errors>0?"error":""}"
                    >
                      ${this._performanceSummary.warnings+this._performanceSummary.errors}
                    </div>
                  </div>
                </div>
              `:""}
        </div>

        ${this._initialized?this._renderComponents():u` <div class="loading">
              <div class="spinner"></div>
              <span>Click "Generate 50+ Components" to start stress test...</span>
            </div>`}
      </div>
    `}_renderComponents(){const e={simple:this._components.filter(t=>t.type==="simple"),medium:this._components.filter(t=>t.type==="medium"),complex:this._components.filter(t=>t.type==="complex")};return u`
      <div class="section">
        ${this._renderComponentGroup("Simple Components (Ripple + Pulse)","simple",e.simple)}
      </div>

      <div class="section" style="margin-top: 24px;">
        ${this._renderComponentGroup("Medium Complexity (Theme)","medium",e.medium)}
      </div>

      <div class="section" style="margin-top: 24px;">
        ${this._renderComponentGroup("High Complexity (Dismiss Chain)","complex",e.complex)}
      </div>
    `}_renderComponentGroup(e,t,n){return u`
      <div class="section-title">
        <span class="component-type-badge ${t==="simple"?"badge-simple":t==="medium"?"badge-medium":"badge-complex"}">${t}</span>
        ${e} (${n.length})
      </div>

      <div class="components-grid">
        ${n.map(o=>this._renderComponentInstance(o))}
      </div>
    `}_renderComponentInstance(e){const t=`[${e.type}]`;return e.type==="simple"?u`
        <div class="component-wrapper">
          ${e.kind==="button"?u`<simple-button>${t} ${e.message}</simple-button>`:e.kind==="card"?u`
                  <simple-card>
                    <span slot="title">${e.title}</span>
                    ${t} ${e.message}
                  </simple-card>
                `:u`<simple-badge>${e.message}</simple-badge>`}
          <div class="component-meta">ID: ${e.id} | Type: ${e.kind}</div>
        </div>
      `:e.type==="medium"?u`
        <div class="component-wrapper">
          ${e.kind==="themed-card"?u`
                <themed-card>
                  <span slot="title">${e.title}</span>
                  ${t} ${e.message}
                </themed-card>
              `:e.kind==="themed-button"?u`<themed-button>${t} ${e.message}</themed-button>`:u`<themed-panel>${t} ${e.message}</themed-panel>`}
          <div class="component-meta">ID: ${e.id} | Type: ${e.kind}</div>
        </div>
      `:u`
      <div class="component-wrapper">
        ${e.kind==="basic-notification"?u`<basic-notification>${t} ${e.message}</basic-notification>`:e.kind==="auto-notification"?u`<auto-notification>${t} ${e.message}</auto-notification>`:u`<swipe-notification>${t} ${e.message}</swipe-notification>`}
        <div class="component-meta">ID: ${e.id} | Type: ${e.kind}</div>
      </div>
    `}_handleGenerateComponents(){$.mark("component-generation-start");const e=[],t=["button","card","badge"],n=["themed-card","themed-button","themed-panel"],s=["basic-notification","auto-notification","swipe-notification"];$.mark("generate-simple-start");for(let l=0;l<20;l++){const f=t[l%t.length];e.push({id:l,type:"simple",kind:f,title:f==="card"?`Simple Card ${l+1}`:void 0,message:`Simple component ${l+1}`})}const o=$.measure("generate-simple",{markStart:"generate-simple-start",threshold:.5,context:{count:20}});$.mark("generate-medium-start");for(let l=0;l<18;l++){const f=n[l%n.length];e.push({id:20+l,type:"medium",kind:f,title:f==="themed-card"?`Themed Card ${l+1}`:void 0,message:`Themed component ${l+1}`})}const p=$.measure("generate-medium",{markStart:"generate-medium-start",threshold:.5,context:{count:15}});$.mark("generate-complex-start");for(let l=0;l<18;l++){const f=s[l%s.length];e.push({id:38+l,type:"complex",kind:f,message:`Dismiss demo ${l+1}`})}const d=$.measure("generate-complex",{markStart:"generate-complex-start",threshold:.5,context:{count:15}});this._components=e,this._componentCount=e.length,$.mark("component-render-start"),this.requestUpdate(),Promise.resolve().then(()=>{const l=$.measure("component-generation-total",{markStart:"component-generation-start",threshold:10,context:{componentCount:e.length},alwaysLog:!0}),f=l/e.length,y=$.getSummary();this._performanceSummary={totalTime:l,componentCount:e.length,avgPerComponent:f,warnings:y.warnings,errors:y.errors},this._initialized=!0;const g=f*2500;g>500&&console.warn(`⚠️ Scaling concern: Average ${f.toFixed(3)}ms per component would result in ${g.toFixed(0)}ms for 2500 components`),console.log(`✅ Generated ${e.length} components in ${l.toFixed(2)}ms (${f.toFixed(3)}ms each)`),console.log(`   - Simple (20): ${o.toFixed(2)}ms (${(o/20).toFixed(3)}ms each)`),console.log(`   - Medium (18): ${p.toFixed(2)}ms (${(p/18).toFixed(3)}ms each)`),console.log(`   - Complex (18): ${d.toFixed(2)}ms (${(d/18).toFixed(3)}ms each)`)})}_handleClear(){this._components=[],this._initialized=!1,this._componentCount=0,this._performanceSummary={totalTime:0,componentCount:0,avgPerComponent:0,warnings:0,errors:0},$.clearMetrics()}_handleLogMetrics(){$.logSummary()}};It.styles=T`
    :host {
      display: block;
      width: 100%;
      color: #f2f2f2;
      font-family: 'IBM Plex Sans', 'Space Grotesk', 'Segoe UI', system-ui, sans-serif;
    }

    :host * {
      box-sizing: border-box;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
    }

    .header {
      margin-bottom: 40px;
    }

    h1 {
      font-size: 52px;
      font-weight: 700;
      margin: 0 0 12px;
      letter-spacing: -0.02em;
      background: linear-gradient(135deg, #7dd3fc 0%, #34d399 60%, #fbbf24 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .subtitle {
      color: #cbd5f5;
      margin: 0 0 24px;
      font-size: 17px;
      line-height: 1.7;
    }

    .controls {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin-top: 20px;
    }

    button {
      padding: 10px 20px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .btn-primary {
      background: linear-gradient(135deg, #7dd3fc 0%, #34d399 100%);
      color: #0a0f1a;
      border: none;
      box-shadow: 0 4px 12px rgba(125, 211, 252, 0.2);
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(125, 211, 252, 0.35);
    }

    .btn-secondary {
      background: #111827;
      color: #7dd3fc;
      border: 1px solid rgba(125, 211, 252, 0.3);
    }

    .btn-secondary:hover {
      border-color: rgba(125, 211, 252, 0.5);
      background: #1a1f2e;
      transform: translateY(-2px);
    }

    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-top: 20px;
    }

    .stat {
      background: #0b0f19;
      padding: 20px;
      border-radius: 12px;
      border: 1px solid rgba(125, 211, 252, 0.15);
      transition: all 0.2s ease;
    }

    .stat:hover {
      border-color: rgba(125, 211, 252, 0.3);
      background: #0d1220;
    }

    .stat-label {
      color: #94a3af;
      font-size: 11px;
      text-transform: uppercase;
      margin-bottom: 8px;
      letter-spacing: 0.1em;
      font-weight: 600;
    }

    .stat-value {
      font-size: 28px;
      font-weight: 700;
      background: linear-gradient(135deg, #7dd3fc 0%, #34d399 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .stat-value.warning {
      background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .stat-value.error {
      background: linear-gradient(135deg, #ff6b6b 0%, #f44336 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .components-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 16px;
      margin-top: 32px;
    }

    .section {
      background: #0b0f19;
      padding: 24px;
      border-radius: 12px;
      border: 1px solid rgba(125, 211, 252, 0.15);
      transition: all 0.2s ease;
    }

    .section:hover {
      border-color: rgba(125, 211, 252, 0.3);
      background: #0d1220;
    }

    .section-title {
      font-size: 14px;
      font-weight: 700;
      margin: 0 0 16px;
      color: #bae6fd;
      display: flex;
      align-items: center;
      gap: 8px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    .component-type-badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border: 1px solid;
    }

    .badge-simple {
      background: rgba(125, 211, 252, 0.15);
      color: #7dd3fc;
      border-color: rgba(125, 211, 252, 0.3);
    }

    .badge-medium {
      background: rgba(251, 191, 36, 0.15);
      color: #fbbf24;
      border-color: rgba(251, 191, 36, 0.3);
    }

    .badge-complex {
      background: rgba(255, 107, 107, 0.15);
      color: #ff6b6b;
      border-color: rgba(255, 107, 107, 0.3);
    }

    .component-wrapper {
      border: 1px solid rgba(125, 211, 252, 0.15);
      border-radius: 8px;
      padding: 16px;
      background: rgba(125, 211, 252, 0.05);
      transition: all 0.2s ease;
    }

    .component-wrapper:hover {
      border-color: rgba(125, 211, 252, 0.3);
      background: rgba(125, 211, 252, 0.08);
    }

    .component-meta {
      font-size: 12px;
      color: #94a3af;
      margin-top: 12px;
      font-family: 'Courier New', monospace;
      background: rgba(125, 211, 252, 0.05);
      padding: 8px;
      border-radius: 4px;
      border: 1px solid rgba(125, 211, 252, 0.1);
    }

    .loading {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 60px 20px;
      color: #cbd5f5;
      font-size: 16px;
    }

    .spinner {
      display: inline-block;
      width: 24px;
      height: 24px;
      border: 3px solid rgba(125, 211, 252, 0.2);
      border-top: 3px solid #7dd3fc;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-right: 16px;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    .warning-message {
      background: rgba(251, 191, 36, 0.1);
      border: 1px solid rgba(251, 191, 36, 0.3);
      color: #fbbf24;
      padding: 16px;
      border-radius: 8px;
      margin-bottom: 20px;
      font-size: 14px;
      font-weight: 500;
    }

    .error-message {
      background: rgba(244, 67, 54, 0.1);
      border: 2px solid #f44336;
      color: #ff6b6b;
      padding: 16px;
      border-radius: 8px;
      margin-bottom: 20px;
      font-size: 14px;
      font-weight: 500;
    }
  `;let K=It;et([O()],K.prototype,"_componentCount");et([O()],K.prototype,"_components");et([O()],K.prototype,"_initialized");et([O()],K.prototype,"_performanceSummary");customElements.define("stress-test",K);var Ba=Object.defineProperty,$e=(a,e,t,n)=>{for(var s=void 0,o=a.length-1,p;o>=0;o--)(p=a[o])&&(s=p(e,t,s)||s);return s&&Ba(e,t,s),s};const Ut=class Ut extends F{constructor(){super(...arguments),this._isRunning=!1,this._isComplete=!1,this._totalTime=0,this._componentCount=0,this._components=[]}firstUpdated(){$.disable()}render(){return u`
      <div class="container">
        ${this._isComplete?u`
              <h1>✅ Test Complete!</h1>

              <div class="results show">
                <div class="time-display">
                  ${this._totalTime.toFixed(0)}<span class="unit">ms</span>
                </div>

                <div class="details">
                  <div class="detail-row">
                    <span class="detail-label">Components Generated:</span>
                    <span class="detail-value">${this._componentCount}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Total Time:</span>
                    <span class="detail-value">${this._totalTime.toFixed(2)}ms</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Time per Component:</span>
                    <span class="detail-value">${(this._totalTime/this._componentCount).toFixed(3)}ms</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Projected 2500:</span>
                    <span class="detail-value">${(this._totalTime/this._componentCount*2500).toFixed(0)}ms</span>
                  </div>
                </div>

                <div class="rating">
                  ${this._getRating()}
                </div>

                <button @click=${this._handleReset}>Run Again</button>
              </div>
            `:u`
              <h1>⚡ Super Stress Test</h1>
              <p class="subtitle">Silently rendering 500 complex showcase components...</p>

              ${this._isRunning?u`
                    <div class="spinner"></div>
                    <div class="status">Generating ${this._componentCount}/500...</div>
                  `:u`
                    <div class="status"></div>
                    <button @click=${this._handleRun}>Start Test</button>
                  `}
            `}
      </div>

      <div class="components-container">
        ${this._components.map(e=>this._renderHiddenComponent(e))}
      </div>
    `}_getRating(){const e=this._totalTime/this._componentCount;return e<.4?"🚀 Blazing fast!":e<.6?"⚡ Very fast":e<.8?"✅ Fast":e<1?"👍 Acceptable":e<1.5?"⚠️  Slow":"❌ Very slow"}_renderHiddenComponent(e){return u`
      <div class="component-item">
        <swipe-notification>${e.message}</swipe-notification>
      </div>
    `}_handleRun(){this._isRunning=!0,this._isComplete=!1,this._components=[],this._componentCount=0,this._totalTime=0;const e=performance.now(),t=500,n=50,s=o=>{const p=o*n,d=Math.min(p+n,t);for(let l=p;l<d;l++)this._components.push({id:l,message:`Component ${l+1}`});if(this._componentCount=d,this.requestUpdate(),d<t)requestAnimationFrame(()=>s(o+1));else{const l=performance.now();this._totalTime=l-e,this._isRunning=!1,this._isComplete=!0,console.log("✅ Super Stress Test Complete"),console.log(`📊 Generated ${this._componentCount} complex components in ${this._totalTime.toFixed(2)}ms`),console.log(`⏱️  Average per component: ${(this._totalTime/this._componentCount).toFixed(3)}ms`),console.log(`📈 Projected at 2500 components: ${(this._totalTime/this._componentCount*2500).toFixed(0)}ms`)}};s(0)}_handleReset(){this._isComplete=!1,this._isRunning=!1,this._components=[],this._componentCount=0,this._totalTime=0}};Ut.styles=T`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-height: 100vh;
      background: #030303;
      font-family: 'IBM Plex Sans', 'Space Grotesk', 'Segoe UI', system-ui, sans-serif;
    }

    .container {
      text-align: center;
      background: linear-gradient(135deg, rgba(13, 18, 32, 0.8) 0%, rgba(11, 15, 25, 0.8) 100%);
      border: 1px solid rgba(125, 211, 252, 0.2);
      box-shadow: 0 8px 32px rgba(125, 211, 252, 0.1);
      padding: 60px 40px;
      border-radius: 16px;
      max-width: 600px;
    }

    h1 {
      font-size: 42px;
      font-weight: 700;
      margin: 0 0 20px;
      background: linear-gradient(135deg, #7dd3fc 0%, #34d399 60%, #fbbf24 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      letter-spacing: -1px;
    }

    .subtitle {
      font-size: 17px;
      color: #cbd5f5;
      margin: 0 0 40px;
      line-height: 1.7;
    }

    .status {
      font-size: 16px;
      color: #7dd3fc;
      font-weight: 600;
      margin-bottom: 24px;
      height: 24px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    .spinner {
      display: inline-block;
      width: 40px;
      height: 40px;
      border: 4px solid rgba(125, 211, 252, 0.2);
      border-top: 4px solid #7dd3fc;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 24px;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    .results {
      display: none;
    }

    .results.show {
      display: block;
    }

    .time-display {
      font-size: 72px;
      font-weight: 700;
      background: linear-gradient(135deg, #7dd3fc 0%, #34d399 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin: 32px 0;
      font-family: 'Courier New', monospace;
      letter-spacing: -2px;
    }

    .unit {
      font-size: 24px;
      color: #94a3af;
    }

    .details {
      background: rgba(125, 211, 252, 0.08);
      border: 1px solid rgba(125, 211, 252, 0.2);
      padding: 20px;
      border-radius: 8px;
      margin-top: 24px;
      text-align: left;
      font-size: 14px;
      font-family: 'Courier New', monospace;
      color: #cbd5f5;
    }

    .detail-row {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid rgba(125, 211, 252, 0.1);
    }

    .detail-row:last-child {
      border-bottom: none;
    }

    .detail-label {
      color: #a0a0a0;
    }

    .detail-value {
      color: #90ffff;
      font-weight: 600;
    }

    .rating {
      margin-top: 24px;
      font-size: 32px;
    }

    button {
      margin-top: 24px;
      padding: 12px 32px;
      border: 2px solid #90ffff;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
      background: linear-gradient(135deg, #4d64ff 0%, rgba(77, 100, 255, 0.8) 100%);
      color: white;
      transition: all 0.2s;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    button:hover {
      background: linear-gradient(135deg, #5d74ff 0%, rgba(77, 100, 255, 0.9) 100%);
      transform: translateY(-1px);
    }

    button:active {
      transform: translateY(0);
    }

    .hidden {
      display: none;
    }

    .components-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      overflow: hidden;
      opacity: 0.15;
      z-index: -1;
    }

    .component-item {
      position: absolute;
      width: 300px;
      opacity: 0.5;
    }
  `;let H=Ut;$e([O()],H.prototype,"_isRunning");$e([O()],H.prototype,"_isComplete");$e([O()],H.prototype,"_totalTime");$e([O()],H.prototype,"_componentCount");$e([O()],H.prototype,"_components");customElements.define("super-stress-test",H);var Ha=Object.defineProperty,Va=Object.getOwnPropertyDescriptor,Hs=(a,e,t,n)=>{for(var s=n>1?void 0:n?Va(e,t):e,o=a.length-1,p;o>=0;o--)(p=a[o])&&(s=(n?p(e,t,s):p(s))||s);return n&&s&&Ha(e,t,s),s};let Ge=class extends F{constructor(){super(),this.currentPage="home",this.handleRouteChange(),window.addEventListener("hashchange",()=>this.handleRouteChange())}connectedCallback(){super.connectedCallback(),this.addEventListener("navigate",a=>this.handleNavigate(a))}handleRouteChange(){let a=window.location.hash.slice(1),e=a;a.includes("#")&&(e=a.split("#")[0]);const t=e.split("/")[0]||"home",s={"":"home",home:"home",docs:"docs",demo:"demo","stress-test":"stress-test","super-stress-test":"super-stress-test"}[t]||"home",o=this.currentPage!==s;this.currentPage=s,o&&window.scrollTo({top:0,behavior:"instant"})}handleNavigate(a){const t=a.detail.page,n=t==="home"?"":t;window.location.hash=n}render(){return u`
      <nav-bar
        .currentPage=${this.currentPage}
        @navigate=${a=>this.handleNavigate(a)}
      ></nav-bar>
      <div class="page-container">
        ${this.renderPage()}
      </div>
    `}renderPage(){switch(this.currentPage){case"home":return u`<home-page></home-page>`;case"docs":return u`<docs-page></docs-page>`;case"demo":return u`<demo-page></demo-page>`;case"stress-test":return u`<stress-test></stress-test>`;case"super-stress-test":return u`<super-stress-test></super-stress-test>`;default:return u`<home-page></home-page>`}}};Ge.styles=T`
    :host {
      display: block;
      min-height: 100vh;
      background: #030303;
      color: #e0e0e0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
    }

    .page-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 48px 32px;
      animation: fadeIn 0.3s ease-in;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Extra Small Devices (375px - 479px) */
    @media (max-width: 479px) {
      .page-container {
        padding: 16px 12px;
      }
    }

    /* Small Devices (480px - 639px) */
    @media (min-width: 480px) and (max-width: 639px) {
      .page-container {
        padding: 20px 16px;
      }
    }

    /* Medium Devices (640px - 767px) */
    @media (min-width: 640px) and (max-width: 767px) {
      .page-container {
        padding: 28px 20px;
      }
    }

    /* Tablet & Small Laptop (768px - 1023px) */
    @media (min-width: 768px) and (max-width: 1023px) {
      .page-container {
        padding: 36px 24px;
      }
    }

    /* Large Devices (1024px+) */
    @media (min-width: 1024px) {
      /* Default padding already set */
    }
  `;Hs([O()],Ge.prototype,"currentPage",2);Ge=Hs([_e("app-router")],Ge);
