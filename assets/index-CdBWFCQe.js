(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const p of o.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&a(p)}).observe(document,{childList:!0,subtree:!0});function t(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(n){if(n.ep)return;n.ep=!0;const o=t(n);fetch(n.href,o)}})();const Pe=globalThis,gt=Pe.ShadowRoot&&(Pe.ShadyCSS===void 0||Pe.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,mt=Symbol(),ss=new WeakMap;let ys=class{constructor(e,t,a){if(this._$cssResult$=!0,a!==mt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(gt&&e===void 0){const a=t!==void 0&&t.length===1;a&&(e=ss.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),a&&ss.set(t,e))}return e}toString(){return this.cssText}};const xa=s=>new ys(typeof s=="string"?s:s+"",void 0,mt),T=(s,...e)=>{const t=s.length===1?s[0]:e.reduce((a,n,o)=>a+(p=>{if(p._$cssResult$===!0)return p.cssText;if(typeof p=="number")return p;throw Error("Value passed to 'css' function must be a 'css' function result: "+p+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+s[o+1],s[0]);return new ys(t,s,mt)},ka=(s,e)=>{if(gt)s.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const a=document.createElement("style"),n=Pe.litNonce;n!==void 0&&a.setAttribute("nonce",n),a.textContent=t.cssText,s.appendChild(a)}},ns=gt?s=>s:s=>s instanceof CSSStyleSheet?(e=>{let t="";for(const a of e.cssRules)t+=a.cssText;return xa(t)})(s):s;const{is:wa,defineProperty:_a,getOwnPropertyDescriptor:$a,getOwnPropertyNames:Ca,getOwnPropertySymbols:Ta,getPrototypeOf:Sa}=Object,Ve=globalThis,as=Ve.trustedTypes,Da=as?as.emptyScript:"",Pa=Ve.reactiveElementPolyfillSupport,he=(s,e)=>s,Ae={toAttribute(s,e){switch(e){case Boolean:s=s?Da:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,e){let t=s;switch(e){case Boolean:t=s!==null;break;case Number:t=s===null?null:Number(s);break;case Object:case Array:try{t=JSON.parse(s)}catch{t=null}}return t}},bt=(s,e)=>!wa(s,e),is={attribute:!0,type:String,converter:Ae,reflect:!1,useDefault:!1,hasChanged:bt};Symbol.metadata??=Symbol("metadata"),Ve.litPropertyMetadata??=new WeakMap;let K=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=is){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const a=Symbol(),n=this.getPropertyDescriptor(e,a,t);n!==void 0&&_a(this.prototype,e,n)}}static getPropertyDescriptor(e,t,a){const{get:n,set:o}=$a(this.prototype,e)??{get(){return this[t]},set(p){this[t]=p}};return{get:n,set(p){const l=n?.call(this);o?.call(this,p),this.requestUpdate(e,l,a)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??is}static _$Ei(){if(this.hasOwnProperty(he("elementProperties")))return;const e=Sa(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(he("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(he("properties"))){const t=this.properties,a=[...Ca(t),...Ta(t)];for(const n of a)this.createProperty(n,t[n])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[a,n]of t)this.elementProperties.set(a,n)}this._$Eh=new Map;for(const[t,a]of this.elementProperties){const n=this._$Eu(t,a);n!==void 0&&this._$Eh.set(n,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const a=new Set(e.flat(1/0).reverse());for(const n of a)t.unshift(ns(n))}else e!==void 0&&t.push(ns(e));return t}static _$Eu(e,t){const a=t.attribute;return a===!1?void 0:typeof a=="string"?a:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const a of t.keys())this.hasOwnProperty(a)&&(e.set(a,this[a]),delete this[a]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ka(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,a){this._$AK(e,a)}_$ET(e,t){const a=this.constructor.elementProperties.get(e),n=this.constructor._$Eu(e,a);if(n!==void 0&&a.reflect===!0){const o=(a.converter?.toAttribute!==void 0?a.converter:Ae).toAttribute(t,a.type);this._$Em=e,o==null?this.removeAttribute(n):this.setAttribute(n,o),this._$Em=null}}_$AK(e,t){const a=this.constructor,n=a._$Eh.get(e);if(n!==void 0&&this._$Em!==n){const o=a.getPropertyOptions(n),p=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:Ae;this._$Em=n;const l=p.fromAttribute(t,o.type);this[n]=l??this._$Ej?.get(n)??l,this._$Em=null}}requestUpdate(e,t,a,n=!1,o){if(e!==void 0){const p=this.constructor;if(n===!1&&(o=this[e]),a??=p.getPropertyOptions(e),!((a.hasChanged??bt)(o,t)||a.useDefault&&a.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(p._$Eu(e,a))))return;this.C(e,t,a)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:a,reflect:n,wrapped:o},p){a&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,p??t??this[e]),o!==!0||p!==void 0)||(this._$AL.has(e)||(this.hasUpdated||a||(t=void 0),this._$AL.set(e,t)),n===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const a=this.constructor.elementProperties;if(a.size>0)for(const[n,o]of a){const{wrapped:p}=o,l=this[n];p!==!0||this._$AL.has(n)||l===void 0||this.C(n,void 0,o,l)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(a=>a.hostUpdate?.()),this.update(t)):this._$EM()}catch(a){throw e=!1,this._$EM(),a}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};K.elementStyles=[],K.shadowRootOptions={mode:"open"},K[he("elementProperties")]=new Map,K[he("finalized")]=new Map,Pa?.({ReactiveElement:K}),(Ve.reactiveElementVersions??=[]).push("2.1.2");const yt=globalThis,os=s=>s,Oe=yt.trustedTypes,rs=Oe?Oe.createPolicy("lit-html",{createHTML:s=>s}):void 0,vs="$lit$",B=`lit$${Math.random().toFixed(9).slice(2)}$`,xs="?"+B,Aa=`<${xs}>`,G=document,fe=()=>G.createComment(""),ge=s=>s===null||typeof s!="object"&&typeof s!="function",vt=Array.isArray,Oa=s=>vt(s)||typeof s?.[Symbol.iterator]=="function",rt=`[ 	
\f\r]`,de=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ps=/-->/g,cs=/>/g,Y=RegExp(`>|${rt}(?:([^\\s"'>=/]+)(${rt}*=${rt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ls=/'/g,ds=/"/g,ks=/^(?:script|style|textarea|title)$/i,Ea=s=>(e,...t)=>({_$litType$:s,strings:e,values:t}),y=Ea(1),Q=Symbol.for("lit-noChange"),D=Symbol.for("lit-nothing"),us=new WeakMap,q=G.createTreeWalker(G,129);function ws(s,e){if(!vt(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return rs!==void 0?rs.createHTML(e):e}const Fa=(s,e)=>{const t=s.length-1,a=[];let n,o=e===2?"<svg>":e===3?"<math>":"",p=de;for(let l=0;l<t;l++){const u=s[l];let g,v,f=-1,P=0;for(;P<u.length&&(p.lastIndex=P,v=p.exec(u),v!==null);)P=p.lastIndex,p===de?v[1]==="!--"?p=ps:v[1]!==void 0?p=cs:v[2]!==void 0?(ks.test(v[2])&&(n=RegExp("</"+v[2],"g")),p=Y):v[3]!==void 0&&(p=Y):p===Y?v[0]===">"?(p=n??de,f=-1):v[1]===void 0?f=-2:(f=p.lastIndex-v[2].length,g=v[1],p=v[3]===void 0?Y:v[3]==='"'?ds:ls):p===ds||p===ls?p=Y:p===ps||p===cs?p=de:(p=Y,n=void 0);const $=p===Y&&s[l+1].startsWith("/>")?" ":"";o+=p===de?u+Aa:f>=0?(a.push(g),u.slice(0,f)+vs+u.slice(f)+B+$):u+B+(f===-2?l:$)}return[ws(s,o+(s[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),a]};class me{constructor({strings:e,_$litType$:t},a){let n;this.parts=[];let o=0,p=0;const l=e.length-1,u=this.parts,[g,v]=Fa(e,t);if(this.el=me.createElement(g,a),q.currentNode=this.el.content,t===2||t===3){const f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(n=q.nextNode())!==null&&u.length<l;){if(n.nodeType===1){if(n.hasAttributes())for(const f of n.getAttributeNames())if(f.endsWith(vs)){const P=v[p++],$=n.getAttribute(f).split(B),S=/([.?@])?(.*)/.exec(P);u.push({type:1,index:o,name:S[2],strings:$,ctor:S[1]==="."?za:S[1]==="?"?La:S[1]==="@"?Ra:We}),n.removeAttribute(f)}else f.startsWith(B)&&(u.push({type:6,index:o}),n.removeAttribute(f));if(ks.test(n.tagName)){const f=n.textContent.split(B),P=f.length-1;if(P>0){n.textContent=Oe?Oe.emptyScript:"";for(let $=0;$<P;$++)n.append(f[$],fe()),q.nextNode(),u.push({type:2,index:++o});n.append(f[P],fe())}}}else if(n.nodeType===8)if(n.data===xs)u.push({type:2,index:o});else{let f=-1;for(;(f=n.data.indexOf(B,f+1))!==-1;)u.push({type:7,index:o}),f+=B.length-1}o++}}static createElement(e,t){const a=G.createElement("template");return a.innerHTML=e,a}}function Z(s,e,t=s,a){if(e===Q)return e;let n=a!==void 0?t._$Co?.[a]:t._$Cl;const o=ge(e)?void 0:e._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),o===void 0?n=void 0:(n=new o(s),n._$AT(s,t,a)),a!==void 0?(t._$Co??=[])[a]=n:t._$Cl=n),n!==void 0&&(e=Z(s,n._$AS(s,e.values),n,a)),e}class Ma{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:a}=this._$AD,n=(e?.creationScope??G).importNode(t,!0);q.currentNode=n;let o=q.nextNode(),p=0,l=0,u=a[0];for(;u!==void 0;){if(p===u.index){let g;u.type===2?g=new ye(o,o.nextSibling,this,e):u.type===1?g=new u.ctor(o,u.name,u.strings,this,e):u.type===6&&(g=new Ia(o,this,e)),this._$AV.push(g),u=a[++l]}p!==u?.index&&(o=q.nextNode(),p++)}return q.currentNode=G,n}p(e){let t=0;for(const a of this._$AV)a!==void 0&&(a.strings!==void 0?(a._$AI(e,a,t),t+=a.strings.length-2):a._$AI(e[t])),t++}}class ye{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,a,n){this.type=2,this._$AH=D,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=a,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Z(this,e,t),ge(e)?e===D||e==null||e===""?(this._$AH!==D&&this._$AR(),this._$AH=D):e!==this._$AH&&e!==Q&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Oa(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==D&&ge(this._$AH)?this._$AA.nextSibling.data=e:this.T(G.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:a}=e,n=typeof a=="number"?this._$AC(e):(a.el===void 0&&(a.el=me.createElement(ws(a.h,a.h[0]),this.options)),a);if(this._$AH?._$AD===n)this._$AH.p(t);else{const o=new Ma(n,this),p=o.u(this.options);o.p(t),this.T(p),this._$AH=o}}_$AC(e){let t=us.get(e.strings);return t===void 0&&us.set(e.strings,t=new me(e)),t}k(e){vt(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let a,n=0;for(const o of e)n===t.length?t.push(a=new ye(this.O(fe()),this.O(fe()),this,this.options)):a=t[n],a._$AI(o),n++;n<t.length&&(this._$AR(a&&a._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const a=os(e).nextSibling;os(e).remove(),e=a}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class We{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,a,n,o){this.type=1,this._$AH=D,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=o,a.length>2||a[0]!==""||a[1]!==""?(this._$AH=Array(a.length-1).fill(new String),this.strings=a):this._$AH=D}_$AI(e,t=this,a,n){const o=this.strings;let p=!1;if(o===void 0)e=Z(this,e,t,0),p=!ge(e)||e!==this._$AH&&e!==Q,p&&(this._$AH=e);else{const l=e;let u,g;for(e=o[0],u=0;u<o.length-1;u++)g=Z(this,l[a+u],t,u),g===Q&&(g=this._$AH[u]),p||=!ge(g)||g!==this._$AH[u],g===D?e=D:e!==D&&(e+=(g??"")+o[u+1]),this._$AH[u]=g}p&&!n&&this.j(e)}j(e){e===D?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class za extends We{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===D?void 0:e}}class La extends We{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==D)}}class Ra extends We{constructor(e,t,a,n,o){super(e,t,a,n,o),this.type=5}_$AI(e,t=this){if((e=Z(this,e,t,0)??D)===Q)return;const a=this._$AH,n=e===D&&a!==D||e.capture!==a.capture||e.once!==a.once||e.passive!==a.passive,o=e!==D&&(a===D||n);n&&this.element.removeEventListener(this.name,this,a),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class Ia{constructor(e,t,a){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=a}get _$AU(){return this._$AM._$AU}_$AI(e){Z(this,e)}}const Ua=yt.litHtmlPolyfillSupport;Ua?.(me,ye),(yt.litHtmlVersions??=[]).push("3.3.2");const ja=(s,e,t)=>{const a=t?.renderBefore??e;let n=a._$litPart$;if(n===void 0){const o=t?.renderBefore??null;a._$litPart$=n=new ye(e.insertBefore(fe(),o),o,void 0,t??{})}return n._$AI(s),n};const xt=globalThis;class L extends K{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=ja(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Q}}L._$litElement$=!0,L.finalized=!0,xt.litElementHydrateSupport?.({LitElement:L});const Na=xt.litElementPolyfillSupport;Na?.({LitElement:L});(xt.litElementVersions??=[]).push("4.2.2");const ve=s=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(s,e)}):customElements.define(s,e)};const Ba={attribute:!0,type:String,converter:Ae,reflect:!1,hasChanged:bt},Ha=(s=Ba,e,t)=>{const{kind:a,metadata:n}=t;let o=globalThis.litPropertyMetadata.get(n);if(o===void 0&&globalThis.litPropertyMetadata.set(n,o=new Map),a==="setter"&&((s=Object.create(s)).wrapped=!0),o.set(t.name,s),a==="accessor"){const{name:p}=t;return{set(l){const u=e.get.call(this);e.set.call(this,l),this.requestUpdate(p,u,s,!0,l)},init(l){return l!==void 0&&this.C(p,void 0,s,l),l}}}if(a==="setter"){const{name:p}=t;return function(l){const u=this[p];e.call(this,l),this.requestUpdate(p,u,s,!0,l)}}throw Error("Unsupported decorator location: "+a)};function _s(s){return(e,t)=>typeof t=="object"?Ha(s,e,t):((a,n,o)=>{const p=n.hasOwnProperty(o);return n.constructor.createProperty(o,a),p?Object.getOwnPropertyDescriptor(n,o):void 0})(s,e,t)}function Ye(s){return _s({...s,state:!0,attribute:!1})}var Va=Object.defineProperty,Wa=Object.getOwnPropertyDescriptor,$s=(s,e,t,a)=>{for(var n=a>1?void 0:a?Wa(e,t):e,o=s.length-1,p;o>=0;o--)(p=s[o])&&(n=(a?p(e,t,n):p(n))||n);return a&&n&&Va(e,t,n),n};let Ee=class extends L{constructor(){super(...arguments),this.currentPage="home",this.baseUrl="/LitFeature/"}handleNavigation(s){this.currentPage=s,this.dispatchEvent(new CustomEvent("navigate",{detail:{page:s},bubbles:!0,composed:!0}))}render(){return y`
      <nav>
        <div class="logo" @click=${()=>this.handleNavigation("home")}>
          ⚡ LitFeature
        </div>
        <ul class="nav-links">
          <li>
            <a
              href="${this.baseUrl}"
              @click=${s=>{s.preventDefault(),this.handleNavigation("home")}}
              class=${this.currentPage==="home"?"active":""}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="${this.baseUrl}demo"
              @click=${s=>{s.preventDefault(),this.handleNavigation("demo")}}
              class=${this.currentPage==="demo"?"active":""}
            >
              Demo
            </a>
          </li>
          <li>
            <a
              href="${this.baseUrl}docs"
              @click=${s=>{s.preventDefault(),this.handleNavigation("docs")}}
              class=${this.currentPage==="docs"?"active":""}
            >
              Docs
            </a>
          </li>
        </ul>
      </nav>
    `}};Ee.styles=T`
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
  `;$s([_s()],Ee.prototype,"currentPage",2);Ee=$s([ve("nav-bar")],Ee);var Ya=Object.getOwnPropertyDescriptor,qa=(s,e,t,a)=>{for(var n=a>1?void 0:a?Ya(e,t):e,o=s.length-1,p;o>=0;o--)(p=s[o])&&(n=p(n)||n);return n};let lt=class extends L{render(){return y`
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
    `}_goToDemo(){this.dispatchEvent(new CustomEvent("navigate",{detail:{page:"demo"},bubbles:!0,composed:!0}))}};lt.styles=T`
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
  `;lt=qa([ve("home-page")],lt);var Ga=Object.getOwnPropertyDescriptor,Xa=(s,e,t,a)=>{for(var n=a>1?void 0:a?Ga(e,t):e,o=s.length-1,p;o>=0;o--)(p=s[o])&&(n=p(n)||n);return n};let dt=class extends L{constructor(){super(...arguments),this.hashChangeHandler=()=>this.handleHashNavigation()}connectedCallback(){super.connectedCallback(),window.addEventListener("hashchange",this.hashChangeHandler),this.updateComplete.then(()=>{window.location.hash&&this.handleHashNavigation()})}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("hashchange",this.hashChangeHandler)}handleHashNavigation(){const s=window.location.hash.split("#")[2];if(console.warn(s),s){const e=this.shadowRoot?.getElementById(s);if(e){const t=e.getBoundingClientRect(),a=window.scrollY+t.top-15;window.scrollTo({top:a,behavior:"smooth"})}}}render(){return y`
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
    `}};dt.styles=T`
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
  `;dt=Xa([ve("docs-page")],dt);var De=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Ja(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var ue={exports:{}};ue.exports;var hs;function Ka(){return hs||(hs=1,(function(s,e){var t=200,a="__lodash_hash_undefined__",n=800,o=16,p=9007199254740991,l="[object Arguments]",u="[object Array]",g="[object AsyncFunction]",v="[object Boolean]",f="[object Date]",P="[object Error]",$="[object Function]",S="[object GeneratorFunction]",A="[object Map]",j="[object Number]",Ge="[object Null]",Et="[object Object]",Us="[object Proxy]",js="[object RegExp]",Ns="[object Set]",Bs="[object String]",Hs="[object Undefined]",Vs="[object WeakMap]",Ws="[object ArrayBuffer]",Ys="[object DataView]",qs="[object Float32Array]",Gs="[object Float64Array]",Xs="[object Int8Array]",Js="[object Int16Array]",Ks="[object Int32Array]",Qs="[object Uint8Array]",Zs="[object Uint8ClampedArray]",en="[object Uint16Array]",tn="[object Uint32Array]",sn=/[\\^$.*+?()[\]{}|]/g,nn=/^\[object .+?Constructor\]$/,an=/^(?:0|[1-9]\d*)$/,k={};k[qs]=k[Gs]=k[Xs]=k[Js]=k[Ks]=k[Qs]=k[Zs]=k[en]=k[tn]=!0,k[l]=k[u]=k[Ws]=k[v]=k[Ys]=k[f]=k[P]=k[$]=k[A]=k[j]=k[Et]=k[js]=k[Ns]=k[Bs]=k[Vs]=!1;var Ft=typeof De=="object"&&De&&De.Object===Object&&De,on=typeof self=="object"&&self&&self.Object===Object&&self,oe=Ft||on||Function("return this")(),Mt=e&&!e.nodeType&&e,re=Mt&&!0&&s&&!s.nodeType&&s,zt=re&&re.exports===Mt,Xe=zt&&Ft.process,Lt=(function(){try{var i=re&&re.require&&re.require("util").types;return i||Xe&&Xe.binding&&Xe.binding("util")}catch{}})(),Rt=Lt&&Lt.isTypedArray;function rn(i,r,c){switch(c.length){case 0:return i.call(r);case 1:return i.call(r,c[0]);case 2:return i.call(r,c[0],c[1]);case 3:return i.call(r,c[0],c[1],c[2])}return i.apply(r,c)}function pn(i,r){for(var c=-1,d=Array(i);++c<i;)d[c]=r(c);return d}function cn(i){return function(r){return i(r)}}function ln(i,r){return i?.[r]}function dn(i,r){return function(c){return i(r(c))}}var un=Array.prototype,hn=Function.prototype,xe=Object.prototype,Je=oe["__core-js_shared__"],ke=hn.toString,N=xe.hasOwnProperty,It=(function(){var i=/[^.]+$/.exec(Je&&Je.keys&&Je.keys.IE_PROTO||"");return i?"Symbol(src)_1."+i:""})(),Ut=xe.toString,fn=ke.call(Object),gn=RegExp("^"+ke.call(N).replace(sn,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),we=zt?oe.Buffer:void 0,jt=oe.Symbol,Nt=oe.Uint8Array;we&&we.allocUnsafe;var Bt=dn(Object.getPrototypeOf,Object),Ht=Object.create,mn=xe.propertyIsEnumerable,bn=un.splice,H=jt?jt.toStringTag:void 0,_e=(function(){try{var i=Ze(Object,"defineProperty");return i({},"",{}),i}catch{}})(),yn=we?we.isBuffer:void 0,Vt=Math.max,vn=Date.now,Wt=Ze(oe,"Map"),pe=Ze(Object,"create"),xn=(function(){function i(){}return function(r){if(!W(r))return{};if(Ht)return Ht(r);i.prototype=r;var c=new i;return i.prototype=void 0,c}})();function V(i){var r=-1,c=i==null?0:i.length;for(this.clear();++r<c;){var d=i[r];this.set(d[0],d[1])}}function kn(){this.__data__=pe?pe(null):{},this.size=0}function wn(i){var r=this.has(i)&&delete this.__data__[i];return this.size-=r?1:0,r}function _n(i){var r=this.__data__;if(pe){var c=r[i];return c===a?void 0:c}return N.call(r,i)?r[i]:void 0}function $n(i){var r=this.__data__;return pe?r[i]!==void 0:N.call(r,i)}function Cn(i,r){var c=this.__data__;return this.size+=this.has(i)?0:1,c[i]=pe&&r===void 0?a:r,this}V.prototype.clear=kn,V.prototype.delete=wn,V.prototype.get=_n,V.prototype.has=$n,V.prototype.set=Cn;function R(i){var r=-1,c=i==null?0:i.length;for(this.clear();++r<c;){var d=i[r];this.set(d[0],d[1])}}function Tn(){this.__data__=[],this.size=0}function Sn(i){var r=this.__data__,c=$e(r,i);if(c<0)return!1;var d=r.length-1;return c==d?r.pop():bn.call(r,c,1),--this.size,!0}function Dn(i){var r=this.__data__,c=$e(r,i);return c<0?void 0:r[c][1]}function Pn(i){return $e(this.__data__,i)>-1}function An(i,r){var c=this.__data__,d=$e(c,i);return d<0?(++this.size,c.push([i,r])):c[d][1]=r,this}R.prototype.clear=Tn,R.prototype.delete=Sn,R.prototype.get=Dn,R.prototype.has=Pn,R.prototype.set=An;function X(i){var r=-1,c=i==null?0:i.length;for(this.clear();++r<c;){var d=i[r];this.set(d[0],d[1])}}function On(){this.size=0,this.__data__={hash:new V,map:new(Wt||R),string:new V}}function En(i){var r=Te(this,i).delete(i);return this.size-=r?1:0,r}function Fn(i){return Te(this,i).get(i)}function Mn(i){return Te(this,i).has(i)}function zn(i,r){var c=Te(this,i),d=c.size;return c.set(i,r),this.size+=c.size==d?0:1,this}X.prototype.clear=On,X.prototype.delete=En,X.prototype.get=Fn,X.prototype.has=Mn,X.prototype.set=zn;function J(i){var r=this.__data__=new R(i);this.size=r.size}function Ln(){this.__data__=new R,this.size=0}function Rn(i){var r=this.__data__,c=r.delete(i);return this.size=r.size,c}function In(i){return this.__data__.get(i)}function Un(i){return this.__data__.has(i)}function jn(i,r){var c=this.__data__;if(c instanceof R){var d=c.__data__;if(!Wt||d.length<t-1)return d.push([i,r]),this.size=++c.size,this;c=this.__data__=new X(d)}return c.set(i,r),this.size=c.size,this}J.prototype.clear=Ln,J.prototype.delete=Rn,J.prototype.get=In,J.prototype.has=Un,J.prototype.set=jn;function Nn(i,r){var c=st(i),d=!c&&tt(i),m=!c&&!d&&Jt(i),x=!c&&!d&&!m&&Qt(i),w=c||d||m||x,b=w?pn(i.length,String):[],_=b.length;for(var M in i)w&&(M=="length"||m&&(M=="offset"||M=="parent")||x&&(M=="buffer"||M=="byteLength"||M=="byteOffset")||Gt(M,_))||b.push(M);return b}function Ke(i,r,c){(c!==void 0&&!Se(i[r],c)||c===void 0&&!(r in i))&&Qe(i,r,c)}function Bn(i,r,c){var d=i[r];(!(N.call(i,r)&&Se(d,c))||c===void 0&&!(r in i))&&Qe(i,r,c)}function $e(i,r){for(var c=i.length;c--;)if(Se(i[c][0],r))return c;return-1}function Qe(i,r,c){r=="__proto__"&&_e?_e(i,r,{configurable:!0,enumerable:!0,value:c,writable:!0}):i[r]=c}var Hn=sa();function Ce(i){return i==null?i===void 0?Hs:Ge:H&&H in Object(i)?na(i):ca(i)}function Yt(i){return ce(i)&&Ce(i)==l}function Vn(i){if(!W(i)||ra(i))return!1;var r=at(i)?gn:nn;return r.test(ha(i))}function Wn(i){return ce(i)&&Kt(i.length)&&!!k[Ce(i)]}function Yn(i){if(!W(i))return pa(i);var r=Xt(i),c=[];for(var d in i)d=="constructor"&&(r||!N.call(i,d))||c.push(d);return c}function qt(i,r,c,d,m){i!==r&&Hn(r,function(x,w){if(m||(m=new J),W(x))qn(i,r,w,c,qt,d,m);else{var b=d?d(et(i,w),x,w+"",i,r,m):void 0;b===void 0&&(b=x),Ke(i,w,b)}},Zt)}function qn(i,r,c,d,m,x,w){var b=et(i,c),_=et(r,c),M=w.get(_);if(M){Ke(i,c,M);return}var E=x?x(b,_,c+"",i,r,w):void 0,le=E===void 0;if(le){var it=st(_),ot=!it&&Jt(_),ts=!it&&!ot&&Qt(_);E=_,it||ot||ts?st(b)?E=b:fa(b)?E=Zn(b):ot?(le=!1,E=Jn(_)):ts?(le=!1,E=Qn(_)):E=[]:ga(_)||tt(_)?(E=b,tt(b)?E=ma(b):(!W(b)||at(b))&&(E=aa(_))):le=!1}le&&(w.set(_,E),m(E,_,d,x,w),w.delete(_)),Ke(i,c,E)}function Gn(i,r){return da(la(i,r,es),i+"")}var Xn=_e?function(i,r){return _e(i,"toString",{configurable:!0,enumerable:!1,value:ya(r),writable:!0})}:es;function Jn(i,r){return i.slice()}function Kn(i){var r=new i.constructor(i.byteLength);return new Nt(r).set(new Nt(i)),r}function Qn(i,r){var c=Kn(i.buffer);return new i.constructor(c,i.byteOffset,i.length)}function Zn(i,r){var c=-1,d=i.length;for(r||(r=Array(d));++c<d;)r[c]=i[c];return r}function ea(i,r,c,d){var m=!c;c||(c={});for(var x=-1,w=r.length;++x<w;){var b=r[x],_=void 0;_===void 0&&(_=i[b]),m?Qe(c,b,_):Bn(c,b,_)}return c}function ta(i){return Gn(function(r,c){var d=-1,m=c.length,x=m>1?c[m-1]:void 0,w=m>2?c[2]:void 0;for(x=i.length>3&&typeof x=="function"?(m--,x):void 0,w&&ia(c[0],c[1],w)&&(x=m<3?void 0:x,m=1),r=Object(r);++d<m;){var b=c[d];b&&i(r,b,d,x)}return r})}function sa(i){return function(r,c,d){for(var m=-1,x=Object(r),w=d(r),b=w.length;b--;){var _=w[++m];if(c(x[_],_,x)===!1)break}return r}}function Te(i,r){var c=i.__data__;return oa(r)?c[typeof r=="string"?"string":"hash"]:c.map}function Ze(i,r){var c=ln(i,r);return Vn(c)?c:void 0}function na(i){var r=N.call(i,H),c=i[H];try{i[H]=void 0;var d=!0}catch{}var m=Ut.call(i);return d&&(r?i[H]=c:delete i[H]),m}function aa(i){return typeof i.constructor=="function"&&!Xt(i)?xn(Bt(i)):{}}function Gt(i,r){var c=typeof i;return r=r??p,!!r&&(c=="number"||c!="symbol"&&an.test(i))&&i>-1&&i%1==0&&i<r}function ia(i,r,c){if(!W(c))return!1;var d=typeof r;return(d=="number"?nt(c)&&Gt(r,c.length):d=="string"&&r in c)?Se(c[r],i):!1}function oa(i){var r=typeof i;return r=="string"||r=="number"||r=="symbol"||r=="boolean"?i!=="__proto__":i===null}function ra(i){return!!It&&It in i}function Xt(i){var r=i&&i.constructor,c=typeof r=="function"&&r.prototype||xe;return i===c}function pa(i){var r=[];if(i!=null)for(var c in Object(i))r.push(c);return r}function ca(i){return Ut.call(i)}function la(i,r,c){return r=Vt(r===void 0?i.length-1:r,0),function(){for(var d=arguments,m=-1,x=Vt(d.length-r,0),w=Array(x);++m<x;)w[m]=d[r+m];m=-1;for(var b=Array(r+1);++m<r;)b[m]=d[m];return b[r]=c(w),rn(i,this,b)}}function et(i,r){if(!(r==="constructor"&&typeof i[r]=="function")&&r!="__proto__")return i[r]}var da=ua(Xn);function ua(i){var r=0,c=0;return function(){var d=vn(),m=o-(d-c);if(c=d,m>0){if(++r>=n)return arguments[0]}else r=0;return i.apply(void 0,arguments)}}function ha(i){if(i!=null){try{return ke.call(i)}catch{}try{return i+""}catch{}}return""}function Se(i,r){return i===r||i!==i&&r!==r}var tt=Yt((function(){return arguments})())?Yt:function(i){return ce(i)&&N.call(i,"callee")&&!mn.call(i,"callee")},st=Array.isArray;function nt(i){return i!=null&&Kt(i.length)&&!at(i)}function fa(i){return ce(i)&&nt(i)}var Jt=yn||va;function at(i){if(!W(i))return!1;var r=Ce(i);return r==$||r==S||r==g||r==Us}function Kt(i){return typeof i=="number"&&i>-1&&i%1==0&&i<=p}function W(i){var r=typeof i;return i!=null&&(r=="object"||r=="function")}function ce(i){return i!=null&&typeof i=="object"}function ga(i){if(!ce(i)||Ce(i)!=Et)return!1;var r=Bt(i);if(r===null)return!0;var c=N.call(r,"constructor")&&r.constructor;return typeof c=="function"&&c instanceof c&&ke.call(c)==fn}var Qt=Rt?cn(Rt):Wn;function ma(i){return ea(i,Zt(i))}function Zt(i){return nt(i)?Nn(i):Yn(i)}var ba=ta(function(i,r,c){qt(i,r,c)});function ya(i){return function(){return i}}function es(i){return i}function va(){return!1}s.exports=ba})(ue,ue.exports)),ue.exports}var Qa=Ka();const Cs=Ja(Qa);var Za=Object.defineProperty,ei=(s,e,t)=>e in s?Za(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t,C=(s,e,t)=>ei(s,typeof e!="symbol"?e+"":e,t),Ts=Symbol.for("lit-feature:litCore"),kt=Symbol.for("lit-feature:litFeature"),Ss=Symbol.for("lit-feature:featureMeta"),fs={enabled:!1,meta:!1,properties:!1,wiring:!1},Ds="__litFeatureDebug",gs=!1;function wt(){if(gs&&typeof globalThis<"u"&&globalThis.__litFeatureDebug)return globalThis.__litFeatureDebug;let s={...fs};if(typeof globalThis<"u"&&globalThis.sessionStorage)try{const e=globalThis.sessionStorage.getItem(Ds);if(e){const t=JSON.parse(e);s={...fs,...t},(s.enabled||s.meta||s.properties||s.wiring)&&console.warn(`[LitFeature Debug] Loaded configuration from sessionStorage. Flags enabled: ${[s.enabled&&"master",s.meta&&"meta",s.properties&&"properties",s.wiring&&"wiring"].filter(Boolean).join(", ")}`)}}catch{}return typeof globalThis<"u"&&(globalThis.__litFeatureDebug=s),!s.enabled&&!s.meta&&!s.properties&&!s.wiring&&console.warn(`[LitFeature Debug] Debugging is available but currently disabled.
To enable, set flags in your browser console:
  window.__litFeatureDebug.enabled = true;     // Master flag
  window.__litFeatureDebug.meta = true;        // Definition phase
  window.__litFeatureDebug.properties = true;  // Instantiation phase
  window.__litFeatureDebug.wiring = true;      // Host ↔ Feature sync

Or set flags and reload to see the full lifecycle:
  sessionStorage.setItem('__litFeatureDebug', JSON.stringify({ enabled: true }));
  location.reload();`),gs=!0,s}function _t(){return typeof globalThis>"u"||!globalThis.__litFeatureDebug?wt():globalThis.__litFeatureDebug}function Ps(s){if(!(typeof globalThis>"u"||!globalThis.sessionStorage))try{globalThis.sessionStorage.setItem(Ds,JSON.stringify(s))}catch{}}function ti(s,e){const t=_t();t[s]=e,typeof globalThis<"u"&&(globalThis.__litFeatureDebug=t),Ps(t)}function qe(s){const e=_t();return e.enabled===!0||e[s]===!0}function si(s,e,t){if(!qe("meta"))return;const a="[LitFeature Debug] [Definition Phase] [Meta]";t!==void 0?console.log(`${a} [${s}] ${e}`,t):console.log(`${a} [${s}] ${e}`)}function ni(s,e,t){if(!qe("properties"))return;const a="[LitFeature Debug] [Instantiation Phase] [Properties]";t!==void 0?console.log(`${a} [${s}] ${e}`,t):console.log(`${a} [${s}] ${e}`)}function ai(s,e,t){if(!qe("wiring"))return;const a="[LitFeature Debug] [Wiring Phase] [Internal Sync]";t!==void 0?console.log(`${a} [${s}] ${e}`,t):console.log(`${a} [${s}] ${e}`)}var h={initializeDebugConfig:wt,getDebugConfig:_t,setDebugFlag:ti,saveDebugConfig:Ps,isDebugEnabled:qe,logMeta:si,logProperties:ni,logWiring:ai};wt();var ut=class As{constructor(){C(this,"metrics",[]),C(this,"enabled",!0),C(this,"verbose",!1),C(this,"thresholds",{componentCreation:.5,featureInit:.1,renderBatch:5,propertyReconciliation:.2,totalInit:3}),C(this,"marks",new Map)}static getInstance(){return As.instance}enable(){this.enabled=!0}disable(){this.enabled=!1}setVerbose(e){this.verbose=e}setThresholds(e){this.thresholds={...this.thresholds,...e}}mark(e){this.marks.set(e,performance.now())}measure(e,t){if(!this.enabled)return 0;const a=t?.markStart||e,n=this.marks.get(a);if(!n)return this.logWarning(`No start mark found for "${a}"`),0;const o=performance.now(),p=o-n,l=t?.threshold;if(t?.alwaysLog||l!==void 0&&p>l||this._determineSeverity(e,p)!=="info"){const g=this._determineSeverity(e,p);this._logMetric({name:e,startTime:n,endTime:o,duration:p,severity:g,context:t?.context})}return this.marks.delete(a),p}time(e,t,a){this.mark(e);const n=t(),o=this.measure(e,a);return{result:n,duration:o}}getMetrics(){return[...this.metrics]}clearMetrics(){this.metrics=[]}getSummary(){const e={total:this.metrics.length,warnings:this.metrics.filter(t=>t.severity==="warning").length,errors:this.metrics.filter(t=>t.severity==="error").length,avgDuration:0,totalDuration:0};return this.metrics.length>0&&(e.totalDuration=this.metrics.reduce((t,a)=>t+(a.duration||0),0),e.avgDuration=e.totalDuration/this.metrics.length),e}logSummary(){if(!this.enabled)return;const e=this.getSummary();console.group("📊 Performance Summary"),console.log(`Total Measurements: ${e.total}`),console.log(`⚠️  Warnings: ${e.warnings}`),console.log(`❌ Errors: ${e.errors}`),console.log(`Average Duration: ${e.avgDuration.toFixed(3)}ms`),console.log(`Total Duration: ${e.totalDuration.toFixed(3)}ms`),(e.warnings>0||e.errors>0)&&(console.group("Issues Found:"),this.metrics.filter(a=>a.severity!=="info").forEach(a=>{const n=a.severity==="error"?"❌":"⚠️";console.log(`${n} ${a.name}: ${a.duration?.toFixed(3)}ms`,a.context||"")}),console.groupEnd()),console.groupEnd()}_determineSeverity(e,t){let a=0,n=2;if(e.includes("component-creation"))a=this.thresholds.componentCreation;else if(e.includes("feature-init"))a=this.thresholds.featureInit;else if(e.includes("render"))a=this.thresholds.renderBatch;else if(e.includes("property")||e.includes("reconciliation"))a=this.thresholds.propertyReconciliation;else if(e.includes("total-init")||e.includes("total"))a=this.thresholds.totalInit;else return"info";return t>a*n?"error":t>a?"warning":"info"}_logMetric(e){if(this.metrics.push(e),this.verbose||e.severity!=="info"){const t=e.severity==="error"?"❌":e.severity==="warning"?"⚠️":"ℹ️",a=e.context?` ${JSON.stringify(e.context)}`:"";console.log(`${t} [${e.duration?.toFixed(3)}ms] ${e.name}${a}`)}}logWarning(e){console.warn(`⚠️ PerformanceMonitor: ${e}`)}};C(ut,"instance",new ut);var ii=ut,z=ii.getInstance(),Os;Os=kt;var I=class{constructor(s,e){C(this,"host"),C(this,"config"),C(this,"_propertyObservers",new Map),C(this,"_internalValues",new Map),C(this,"_declaredProperties",new Set),C(this,"_suspendUpdates",!1);const t=`feature-constructor-${Date.now()}-${Math.random()}`;z.mark(t);const a=this.constructor.name||"UnnamedFeature",n=s.constructor.name||"UnknownHost";h.logProperties("feature-constructor",`Constructing ${a} on host ${n}`),this.host=s,this.config=e,this.host.addController?.(this),this._litFeatureInit(),z.measure(`feature-init-${a}`,{markStart:t,threshold:.1,context:{feature:a,host:n}})}_litFeatureInit(){const s=this.constructor.name||"UnnamedFeature";h.logProperties("feature-init",`Initializing ${s} - setting up property observers`);const{properties:e}=this.constructor;if(!e){h.logProperties("feature-init-no-props",`  → ${s} has no properties to observe`);return}const t=Object.keys(e);h.logProperties("feature-init-props-count",`  → ${s} has ${t.length} properties`,t),t.forEach(a=>{this._declaredProperties.add(a)}),Object.keys(e).forEach(a=>{h.logProperties("feature-init-observer",`    → Creating property observer for: ${a}`),this._createPropertyObserver(a)})}_createPropertyObserver(s){const e=this.constructor.name||"UnnamedFeature";h.logProperties("property-observer-create",`Creating property descriptor for ${e}.${s}`);const t=`property-observer-${e}-${s}-${Date.now()}-${Math.random()}`;z.mark(t);const a=this;Object.defineProperty(this,s,{configurable:!0,enumerable:!0,get(){const n=a.getInternalValue(s);return h.logWiring("property-getter",`Getting ${e}.${s}`,n),n},set(n){const o=`property-set-${e}-${s}-${Date.now()}-${Math.random()}`;z.mark(o);const p=a.host,l=p[s],u=a.getInternalValue(s);if(h.logWiring("property-setter",`Setting ${e}.${s}`,{oldValue:l,newValue:n,hostName:a.host.constructor.name||"UnknownHost"}),Object.is(u,n)){h.logWiring("property-setter-guard-internal",`  → Skipping: already equals internal value for ${s}`);return}if(Object.is(l,n)){h.logWiring("property-setter-guard-host",`  → Skipping: already equals host value for ${s}`),a.setInternalValue(s,n);return}p[s]=n,h.logWiring("property-to-host",`  → Synced to host property: ${s}`,n),a.setInternalValue(s,n),h.logWiring("property-to-internal",`  → Mirrored to internal storage: ${s}`),!a._suspendUpdates&&typeof a.host.requestUpdate=="function"?(a.host.requestUpdate(s,l),h.logWiring("property-request-update",`  → Requested update for: ${s}`)):a._suspendUpdates&&h.logWiring("property-request-update-suspended",`  → Update suspended for: ${s}`),z.measure(`property-set-${e}`,{markStart:o,threshold:.1,context:{property:s}})}}),z.measure(`property-observer-create-${e}`,{markStart:t,threshold:.05,context:{property:s}})}setInternalValue(s,e){this._internalValues.set(s,e)}getInternalValue(s){return this._internalValues.get(s)}_suspendUpdateRequests(){this._suspendUpdates=!0}_resumeUpdateRequests(){this._suspendUpdates=!1}hostConnected(){}hostDisconnected(){}firstUpdated(s){const e=this.constructor.name||"UnnamedFeature",t=this.host.constructor.name||"UnknownHost";h.logWiring("first-updated-start",`First update phase for ${e} (host: ${t})`);const a=this,n=this.host;this._declaredProperties.forEach(o=>{const p=n[o],l=this.getInternalValue(o);h.logWiring("first-updated-reconcile",`Reconciling property: ${o}`,{hostValue:p,internalValue:l}),p!==void 0?Object.is(p,l)?(h.logWiring("first-updated-host-match",`  → Host value already matches internal for ${o}`),this.setInternalValue(o,p)):(h.logWiring("first-updated-host-wins",`  → Host value wins for ${o}`),a[o]=p):l!==void 0?(h.logWiring("first-updated-feature-wins",`  → Feature default wins for ${o}`,l),a[o]=l):(h.logWiring("first-updated-mirror",`  → No value set, mirroring undefined for ${o}`),this.setInternalValue(o,p))}),h.logWiring("first-updated-complete",`First update phase complete for ${e}`)}updated(s){const e=this.constructor.name||"UnnamedFeature",t=this.host.constructor.name||"UnknownHost";h.logWiring("updated-start",`Update phase for ${e} (host: ${t})`);const a=this.host;s.forEach((n,o)=>{const p=a[o];h.logWiring("updated-sync",`Syncing changed property: ${o}`,p),this.setInternalValue(o,p)}),h.logWiring("updated-complete",`Update phase complete for ${e}`)}};C(I,Os,!0);C(I,"properties",{});C(I,"styles");function oi(s){const e=s[Ss];if(!e||!e.featureProperties)return{};const t={};return e.featureProperties.forEach((a,n)=>{t[n]=a}),t}var pt=Symbol("litFeatureResolvedCache");function ri(s){const e=[];let t=s;for(;t&&t[Ts];)e.unshift(t),t=Object.getPrototypeOf(t);return e}function ms(s,e){if(e==="disable")return"disable";if(!s||s==="disable")return{...e};const t=Cs({},s.config||{},e.config||{}),a={...s.properties||{}};return Object.entries(e.properties||{}).forEach(([n,o])=>{o==="disable"?delete a[n]:a[n]=o}),{config:t,properties:a}}function pi(s){const e=[],t=[];let a=s;for(;a&&a[kt]&&(t.unshift(a),a!==I);)a=Object.getPrototypeOf(a);return t.forEach(n=>{n.styles&&(Array.isArray(n.styles)?e.push(...n.styles):e.push(n.styles))}),e}function ci(s){const e={},t=[];let a=s;for(;a&&a[kt]&&(t.unshift(a),a!==I);)a=Object.getPrototypeOf(a);return t.forEach(n=>{Object.assign(e,n.properties||{});const o=oi(n);Object.assign(e,o||{})}),e}function ht(s){const e=s.name||"Unknown";if(h.logMeta("resolve-start",`Starting feature resolution for component: ${e}`),Object.prototype.hasOwnProperty.call(s,pt))return h.logMeta("resolve-cache",`Using cached resolution for: ${e}`),s[pt];const t=new Map,a=new Map,n=ri(s);h.logMeta("resolve-chain",`Inheritance chain for ${e}:`,n.map(g=>g.name)),n.forEach(g=>{const v=g.name||"Unknown";h.logMeta("resolve-class",`Processing class: ${v}`);const f=g.provide||{};Object.entries(f).forEach(([S,A])=>{h.logMeta("resolve-provide-static",`  → Collecting feature: ${S} from static provide`),t.set(S,A)});const P=g.configure||{};Object.entries(P).forEach(([S,A])=>{const j=A,Ge=ms(a.get(S),j);h.logMeta("resolve-configure-static",`  → Merging config for feature: ${S}`),a.set(S,Ge)});const $=g[Ss];$&&($.provide&&$.provide.forEach((S,A)=>{h.logMeta("resolve-provide-decorator",`  → Collecting feature: ${A} from decorator`),t.set(A,S)}),$.configure&&$.configure.forEach((S,A)=>{const j=ms(a.get(A),S);h.logMeta("resolve-configure-decorator",`  → Merging config for feature: ${A} from decorator`),a.set(A,j)}))});const o={},p=[],l=new Map;h.logMeta("resolve-build",`Building resolved state for ${t.size} provided features`),t.forEach((g,v)=>{const f=a.get(v);if(f==="disable"||g.enabled===!1){h.logMeta("resolve-disabled",`  → Skipping disabled feature: ${v}`);return}h.logMeta("resolve-feature",`  → Resolving feature: ${v}`);const P=pi(g.class);P.length>0&&(h.logMeta("resolve-styles",`    → Collecting ${P.length} style blocks from feature chain: ${v}`),p.push(...P));let $=ci(g.class);f&&typeof f=="object"&&f.properties&&Object.entries(f.properties).forEach(([A,j])=>{j==="disable"?(h.logMeta("resolve-property",`    → Disabling property: ${A}`),delete $[A]):(h.logMeta("resolve-property",`    → Including property: ${A}`),$[A]=j)}),Object.assign(o,$),h.logMeta("resolve-properties-count",`    → Total properties for ${v}: ${Object.keys($).length}`);const S=f&&typeof f=="object"?Cs({},g.config||{},f.config||{}):g.config||{};l.set(v,{class:g.class,config:S})});const u={properties:Object.freeze(o),styles:p,features:l};return Object.freeze(u),h.logMeta("resolve-complete",`Resolution complete for ${e}`,{featuresCount:l.size,propertiesCount:Object.keys(o).length,stylesCount:p.length}),s[pt]=u,u}var li=class{constructor(s,e){C(this,"host"),C(this,"_featureInstances"),this.host=s,this._featureInstances=new Map;const t=ht(e);this._initializeFeatures(t)}_initializeFeatures(s){const e=`feature-manager-init-${Date.now()}-${Math.random()}`;z.mark(e);const t=this.host.constructor?.name||"Unknown";h.logProperties("init-start",`Starting feature instantiation for host: ${t}`,{featureCount:s.features.size}),s.features.forEach((a,n)=>{h.logProperties("init-feature",`Instantiating feature: ${n}`);const o=new a.class(this.host,a.config);h.logProperties("init-instance-created",`  → Instance created for: ${n}`),o._suspendUpdateRequests(),this._featureInstances.set(n,o);const p=this.host;p.hasOwnProperty(n)?(console.warn(`[Lit Feature] Host already has a property named "${n}". This may cause conflicts with the feature instance.
Features should not declare properties with names matching those in the host component. Please rename the feature or host property to avoid this conflict.
Feature will be assigned to _${n} to avoid overwriting the host property. It is not recommended to leave this conflict unresolved, as it may lead to unexpected behavior.`),h.logProperties("init-attach-conflict",`  → Conflict detected, attaching to _${n}`),p[`_${n}`]=o):(h.logProperties("init-attach",`  → Attached to host as property: ${n}`),p[n]=o)}),this._featureInstances.forEach(a=>{a._resumeUpdateRequests()}),typeof this.host.requestUpdate=="function"&&(h.logProperties("init-batch-update",`Triggering batch update after feature initialization for host: ${t}`),this.host.requestUpdate()),h.logProperties("init-complete",`Feature instantiation complete for host: ${t}`),z.measure(`feature-manager-init-${t}`,{markStart:e,threshold:.5,context:{component:t,featureCount:s.features.size}})}processLifecycle(s,...e){this._featureInstances.forEach(t=>{const a=t[s];typeof a=="function"&&a.call(t,...e)})}},Es,bs,O=class extends(bs=L,Es=Ts,bs){constructor(){const s=`lt-core-constructor-${Date.now()}-${Math.random()}`;z.mark(s),super(),C(this,"featureManager"),this.featureManager=new li(this,this.constructor);const e=this.constructor.name||"UnknownComponent";z.measure(`component-creation-${e}`,{markStart:s,threshold:.5,context:{component:e}})}static finalize(){const e=ht(this),t=Object.getPrototypeOf(this)?.properties||{},a=Object.prototype.hasOwnProperty.call(this,"properties")?this.properties:{};this.properties={...t,...e.properties,...a};const n=Object.getPrototypeOf(this)?.styles,p=Object.getOwnPropertyDescriptor(this,"styles")!==void 0?this.styles:void 0,l=[];return n&&(Array.isArray(n)?l.push(...n):l.push(n)),e.styles.length>0&&l.push(...e.styles),p&&(Array.isArray(p)?l.push(...p):l.push(p)),l.length>0&&(this.styles=l.length===1?l[0]:l),super.finalize(),!0}static register(s){const e=this;ht(e),customElements.define(s,e)}connectedCallback(){this.featureManager.processLifecycle("beforeConnectedCallback"),super.connectedCallback(),this.featureManager.processLifecycle("connectedCallback"),this.featureManager.processLifecycle("afterConnectedCallback")}disconnectedCallback(){this.featureManager.processLifecycle("beforeDisconnectedCallback"),this.featureManager.processLifecycle("disconnectedCallback"),super.disconnectedCallback(),this.featureManager.processLifecycle("afterDisconnectedCallback")}firstUpdated(s){this.featureManager.processLifecycle("beforeFirstUpdated",s),super.firstUpdated(s),this.featureManager.processLifecycle("firstUpdated",s),this.featureManager.processLifecycle("afterFirstUpdated",s)}updated(s){this.featureManager.processLifecycle("beforeUpdated",s),super.updated(s),this.featureManager.processLifecycle("updated",s),this.featureManager.processLifecycle("afterUpdated",s)}attributeChangedCallback(s,e,t){this.featureManager.processLifecycle("beforeAttributeChangedCallback",s,e,t),super.attributeChangedCallback(s,e,t),this.featureManager.processLifecycle("attributeChangedCallback",s,e,t),this.featureManager.processLifecycle("afterAttributeChangedCallback",s,e,t)}};C(O,Es,!0);C(O,"properties",{});C(O,"configure");C(O,"provide");var ct=Symbol.for("lit-feature:featureMeta");function Fs(s){return Object.prototype.hasOwnProperty.call(s,ct)||Object.defineProperty(s,ct,{value:{provide:new Map,configure:new Map,featureProperties:new Map},writable:!1,configurable:!0,enumerable:!1}),s[ct]}function U(s,e){return function(t){return Fs(t).provide.set(s,e),t}}function F(s={}){return function(e,t){const a=e.constructor;Fs(a).featureProperties.set(t,s);const o=a.properties||{};Object.prototype.hasOwnProperty.call(a,"properties")||Object.defineProperty(a,"properties",{value:{...o},writable:!0,configurable:!0,enumerable:!1}),a.properties[t]=s}}var di=Object.defineProperty,Ms=(s,e,t,a)=>{for(var n=void 0,o=s.length-1,p;o>=0;o--)(p=s[o])&&(n=p(e,t,n)||n);return n&&di(e,t,n),n};const Tt=class Tt extends I{constructor(e,t){super(e,t),this.rippling=!1,this.rippleDurationMs=600,this._handleClick=()=>{this.triggerRipple()},this.rippleDurationMs=t.rippleDurationMs??600,this._applyRippleOptions()}updated(e){super.updated(e),e.has("rippleDurationMs")&&this._applyRippleOptions()}connectedCallback(){this.host.addEventListener("click",this._handleClick)}disconnectedCallback(){this.host.removeEventListener("click",this._handleClick)}triggerRipple(){this.rippling=!0,setTimeout(()=>{this.rippling=!1},this.rippleDurationMs)}setRippleColor(e){this.host.style.setProperty("--ripple-color",e)}_applyRippleOptions(){this.host.style.setProperty("--ripple-duration",`${this.rippleDurationMs}ms`),this.config.rippleColor&&this.setRippleColor(this.config.rippleColor)}};Tt.styles=T`
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
  `;let ee=Tt;Ms([F({type:Boolean,reflect:!0})],ee.prototype,"rippling");Ms([F({type:Number,attribute:"ripple-duration"})],ee.prototype,"rippleDurationMs");var ui=Object.getOwnPropertyDescriptor,hi=(s,e,t,a)=>{for(var n=a>1?void 0:a?ui(e,t):e,o=s.length-1,p;o>=0;o--)(p=s[o])&&(n=p(n)||n);return n};let Fe=class extends O{render(){return y`
      <button>
        <slot>Click Me</slot>
      </button>
    `}};Fe.styles=T`
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
  `;Fe=hi([U("Ripple",{class:ee})],Fe);var fi=Object.getOwnPropertyDescriptor,gi=(s,e,t,a)=>{for(var n=a>1?void 0:a?fi(e,t):e,o=s.length-1,p;o>=0;o--)(p=s[o])&&(n=p(n)||n);return n};let Me=class extends O{render(){return y`
      <div class="card">
        <h3 class="card-title"><slot name="title">Card Title</slot></h3>
        <div class="card-content"><slot>Card content goes here.</slot></div>
      </div>
    `}};Me.styles=T`
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
  `;Me=gi([U("Ripple",{class:ee})],Me);var mi=Object.defineProperty,zs=(s,e,t,a)=>{for(var n=void 0,o=s.length-1,p;o>=0;o--)(p=s[o])&&(n=p(e,t,n)||n);return n&&mi(e,t,n),n};const St=class St extends I{constructor(e,t){super(e,t),this.pulseDurationMs=2e3,this.pulsing=t.initiallyPulsing??!1,this.pulseDurationMs=t.pulseDurationMs??2e3,this._applyPulseOptions(t)}updated(e){super.updated(e),e.has("pulseDurationMs")&&this._applyPulseOptions(this.config)}togglePulse(){this.pulsing=!this.pulsing}startPulse(){this.pulsing=!0}stopPulse(){this.pulsing=!1}setPulseOptions(e){this._applyPulseOptions(e)}_applyPulseOptions(e){const t=this.host.style;t.setProperty("--pulse-duration",`${this.pulseDurationMs}ms`),e.pulseScale&&t.setProperty("--pulse-scale",`${e.pulseScale}`),e.pulseOpacity&&t.setProperty("--pulse-opacity",`${e.pulseOpacity}`)}};St.styles=T`
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
  `;let be=St;zs([F({type:Boolean,reflect:!0})],be.prototype,"pulsing");zs([F({type:Number,attribute:"pulse-duration"})],be.prototype,"pulseDurationMs");var bi=Object.getOwnPropertyDescriptor,yi=(s,e,t,a)=>{for(var n=a>1?void 0:a?bi(e,t):e,o=s.length-1,p;o>=0;o--)(p=s[o])&&(n=p(n)||n);return n};let ze=class extends O{render(){return y`
      <div class="badge">
        <span class="badge-dot"></span>
        <slot>New</slot>
      </div>
    `}};ze.styles=T`
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
  `;ze=yi([U("Pulse",{class:be,config:{initiallyPulsing:!0}})],ze);var vi=Object.defineProperty,xi=(s,e,t,a)=>{for(var n=void 0,o=s.length-1,p;o>=0;o--)(p=s[o])&&(n=p(e,t,n)||n);return n&&vi(e,t,n),n};const Dt=class Dt extends I{constructor(e,t){super(e,t),this._handleSystemThemeChange=a=>{this.systemTheme=a.matches?"dark":"light",this.theme==="auto"&&(this._applyResolvedTheme(),this._applyCSSVariables())},this._cssPrefix=t.cssPrefix||"--theme",this.theme=t.defaultTheme||"light",this.systemTheme=this._detectSystemTheme(),this.colors=this._computeColors(),this._applyResolvedTheme(),this._applyCSSVariables()}connectedCallback(){this.config.respectSystemTheme!==!1&&(this._setupSystemThemeListener(),this._applyResolvedTheme(),this._applyCSSVariables())}disconnectedCallback(){this._mediaQuery&&this._mediaQuery.removeEventListener("change",this._handleSystemThemeChange)}updated(e){super.updated(e),e.has("theme")&&(this.colors=this._computeColors(),this._applyResolvedTheme(),this._applyCSSVariables())}getResolvedTheme(){return this.theme==="auto"?this.systemTheme:this.theme}toggleTheme(){this.theme=this.getResolvedTheme()==="light"?"dark":"light"}setTheme(e){this.theme=e}setRespectSystemTheme(e){this.config.respectSystemTheme=e,e?(this._setupSystemThemeListener(),this.systemTheme=this._detectSystemTheme(),this._applyResolvedTheme(),this._applyCSSVariables()):this._mediaQuery&&(this._mediaQuery.removeEventListener("change",this._handleSystemThemeChange),this._mediaQuery=void 0)}setCssPrefix(e){this._cssPrefix=e,this._applyCSSVariables()}refreshTheme(){this.systemTheme=this._detectSystemTheme(),this.colors=this._computeColors(),this._applyResolvedTheme(),this._applyCSSVariables()}_setupSystemThemeListener(){!this._mediaQuery&&typeof window<"u"&&window.matchMedia&&(this._mediaQuery=window.matchMedia("(prefers-color-scheme: dark)"),this._mediaQuery.addEventListener("change",this._handleSystemThemeChange))}_detectSystemTheme(){return typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}_computeColors(){return this.getResolvedTheme()==="dark"?{background:"#1a1a1a",foreground:"#ffffff",primary:"#667eea",secondary:"#764ba2",accent:"#f093fb"}:{background:"#ffffff",foreground:"#333333",primary:"#667eea",secondary:"#764ba2",accent:"#f5576c"}}_applyResolvedTheme(){const e=this.getResolvedTheme();this.host.setAttribute("data-theme",e)}_applyCSSVariables(){const e=this.host.style;e.setProperty(`${this._cssPrefix}-bg`,this.colors.background),e.setProperty(`${this._cssPrefix}-fg`,this.colors.foreground),e.setProperty(`${this._cssPrefix}-primary`,this.colors.primary),e.setProperty(`${this._cssPrefix}-secondary`,this.colors.secondary),e.setProperty(`${this._cssPrefix}-accent`,this.colors.accent)}};Dt.properties={colors:{type:Object,attribute:!1},systemTheme:{type:String,attribute:!1}};let te=Dt;xi([F({type:String,reflect:!0})],te.prototype,"theme");var ki=Object.getOwnPropertyDescriptor,wi=(s,e,t,a)=>{for(var n=a>1?void 0:a?ki(e,t):e,o=s.length-1,p;o>=0;o--)(p=s[o])&&(n=p(n)||n);return n};let Le=class extends O{render(){return y`
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
    `}};Le.styles=T`
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
  `;Le=wi([U("Theme",{class:te,config:{defaultTheme:"light",respectSystemTheme:!0}})],Le);var _i=Object.getOwnPropertyDescriptor,$i=(s,e,t,a)=>{for(var n=a>1?void 0:a?_i(e,t):e,o=s.length-1,p;o>=0;o--)(p=s[o])&&(n=p(n)||n);return n};let Re=class extends O{render(){return y`
      <button>
        <slot>Themed Button</slot>
      </button>
    `}};Re.styles=T`
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
  `;Re=$i([U("Theme",{class:te,config:{defaultTheme:"dark",respectSystemTheme:!1}})],Re);var Ci=Object.getOwnPropertyDescriptor,Ti=(s,e,t,a)=>{for(var n=a>1?void 0:a?Ci(e,t):e,o=s.length-1,p;o>=0;o--)(p=s[o])&&(n=p(n)||n);return n};let Ie=class extends O{render(){const s=this.Theme.getResolvedTheme();return y`
      <div class="panel">
        <div class="panel-indicator">
          ${this.Theme.theme==="auto"?`Auto (${s})`:s}
        </div>
        <div class="panel-content">
          <slot>
            This panel respects your system's theme preference when in auto mode.
          </slot>
        </div>
      </div>
    `}};Ie.styles=T`
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
  `;Ie=Ti([U("Theme",{class:te,config:{defaultTheme:"auto",respectSystemTheme:!0}})],Ie);var Si=Object.defineProperty,Ls=(s,e,t,a)=>{for(var n=void 0,o=s.length-1,p;o>=0;o--)(p=s[o])&&(n=p(e,t,n)||n);return n&&Si(e,t,n),n};const He=class He extends I{constructor(e,t){super(e,t),this.dismissed=!1,this.handleDismissClick=()=>{this.dismiss()},this.dismissible=t.dismissible??!0,this.dismissLabel=t.dismissLabel||"Dismiss"}dismiss(){!this.dismissible||this.dismissed||(this.dismissed=!0,this._dispatchDismissed())}reset(){this.dismissed=!1}getDismissLabel(){return this.dismissLabel}_dispatchDismissed(){this.host.dispatchEvent(new CustomEvent("dismissed",{bubbles:!0,composed:!0,detail:{source:"manual"}}))}};He.properties={dismissLabel:{type:String,attribute:"dismiss-label"}},He.styles=T`
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
  `;let se=He;Ls([F({type:Boolean,reflect:!0})],se.prototype,"dismissible");Ls([F({type:Boolean,reflect:!0})],se.prototype,"dismissed");var Di=Object.getOwnPropertyDescriptor,Pi=(s,e,t,a)=>{for(var n=a>1?void 0:a?Di(e,t):e,o=s.length-1,p;o>=0;o--)(p=s[o])&&(n=p(n)||n);return n};let Ue=class extends O{render(){return y`
      <div class="notification">
        <span class="notification-icon">ⓘ</span>
        <div class="notification-content">
          <slot>Manual dismiss only - click the × button</slot>
        </div>
        ${this.dismissible?y`
          <button
            class="dismiss-btn"
            @click=${this.Dismiss.handleDismissClick}
            aria-label=${this.Dismiss.getDismissLabel()}
          >
            ×
          </button>
        `:null}
      </div>
    `}};Ue.styles=T`
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

  `;Ue=Pi([U("Dismiss",{class:se,config:{dismissible:!0}})],Ue);var Ai=Object.defineProperty,Rs=(s,e,t,a)=>{for(var n=void 0,o=s.length-1,p;o>=0;o--)(p=s[o])&&(n=p(e,t,n)||n);return n&&Ai(e,t,n),n};const Pt=class Pt extends se{constructor(e,t){super(e,t),this.autoDismiss=t.autoDismiss??!1,this.autoDismissTimeout=t.autoDismissTimeout||5e3,this._applyTimerDuration()}updated(e){super.updated(e),e.has("autoDismissTimeout")&&this._applyTimerDuration(),e.has("autoDismiss")&&(this.autoDismiss?this._startTimer():this._clearTimer())}connectedCallback(){this.autoDismiss&&this._startTimer()}disconnectedCallback(){this._clearTimer()}dismiss(){this._clearTimer(),super.dismiss()}startTimer(){this.autoDismiss&&this._startTimer()}stopTimer(){this._clearTimer()}getTimerDurationMs(){return this.autoDismissTimeout}setAutoDismissEnabled(e){this.autoDismiss=e}_dispatchDismissed(){this.host.dispatchEvent(new CustomEvent("dismissed",{bubbles:!0,composed:!0,detail:{source:this._timeoutId!==void 0?"auto":"manual",timeout:this.autoDismissTimeout}}))}_startTimer(){this._clearTimer(),this._timeoutId=window.setTimeout(()=>{super.dismiss()},this.autoDismissTimeout)}_applyTimerDuration(){this.host.style.setProperty("--dismiss-timer-duration",`${this.autoDismissTimeout}ms`)}_clearTimer(){this._timeoutId!==void 0&&(clearTimeout(this._timeoutId),this._timeoutId=void 0)}};Pt.styles=T`
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
  `;let ne=Pt;Rs([F({type:Boolean,attribute:"auto-dismiss"})],ne.prototype,"autoDismiss");Rs([F({type:Number,attribute:"auto-dismiss-timeout"})],ne.prototype,"autoDismissTimeout");var Oi=Object.getOwnPropertyDescriptor,Ei=(s,e,t,a)=>{for(var n=a>1?void 0:a?Oi(e,t):e,o=s.length-1,p;o>=0;o--)(p=s[o])&&(n=p(n)||n);return n};let je=class extends O{render(){return y`
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
        ${this.autoDismiss?y`
          <div class="timer-indicator">
            <div class="timer-bar"></div>
          </div>
        `:null}
      </div>
    `}};je.styles=T`
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

  `;je=Ei([U("Dismiss",{class:ne,config:{dismissible:!0,autoDismiss:!0,autoDismissTimeout:4e3}})],je);var Fi=Object.defineProperty,$t=(s,e,t,a)=>{for(var n=void 0,o=s.length-1,p;o>=0;o--)(p=s[o])&&(n=p(e,t,n)||n);return n&&Fi(e,t,n),n};const At=class At extends ne{constructor(e,t){super(e,t),this.swipeOffset=0,this._startX=0,this._startY=0,this._isDragging=!1,this._handleTouchStart=a=>{this._startX=a.touches[0].clientX,this._startY=a.touches[0].clientY,this._isDragging=!0},this._handleTouchMove=a=>{if(!this._isDragging)return;const n=a.touches[0].clientX,o=a.touches[0].clientY,p=n-this._startX;Math.abs(o-this._startY)<30&&(this.swipeOffset=p,this.host.style.transform=`translateX(${p}px)`,a.preventDefault())},this._handleTouchEnd=()=>{Math.abs(this.swipeOffset)>=this.swipeThreshold?super.dismiss():this._resetSwipe(),this._isDragging=!1},this._handleMouseDown=a=>{this._startX=a.clientX,this._startY=a.clientY,this._isDragging=!0,document.addEventListener("mousemove",this._handleMouseMove),document.addEventListener("mouseup",this._handleMouseUp)},this._handleMouseMove=a=>{if(!this._isDragging)return;const n=a.clientX-this._startX;Math.abs(a.clientY-this._startY)<30&&(this.swipeOffset=n,this.host.style.transform=`translateX(${n}px)`)},this._handleMouseUp=()=>{Math.abs(this.swipeOffset)>=this.swipeThreshold?super.dismiss():this._resetSwipe(),this._isDragging=!1,document.removeEventListener("mousemove",this._handleMouseMove),document.removeEventListener("mouseup",this._handleMouseUp)},this.swipeToDismiss=t.swipeToDismiss??!0,this.swipeThreshold=t.swipeThreshold||100}updated(e){super.updated(e),e.has("swipeToDismiss")&&(this.swipeToDismiss?this._attachSwipeListeners():this._detachSwipeListeners())}connectedCallback(){super.connectedCallback(),this.swipeToDismiss&&this._attachSwipeListeners()}disconnectedCallback(){super.disconnectedCallback(),this._detachSwipeListeners()}_dispatchDismissed(){const e=this._isDragging?"swipe":"auto";this.host.dispatchEvent(new CustomEvent("dismissed",{bubbles:!0,composed:!0,detail:{source:e,swipeDistance:this.swipeOffset}}))}setSwipeEnabled(e){this.swipeToDismiss=e}_resetSwipe(){this.swipeOffset=0,this.host.style.transform=""}_attachSwipeListeners(){this.host.addEventListener("touchstart",this._handleTouchStart,{passive:!0}),this.host.addEventListener("touchmove",this._handleTouchMove,{passive:!1}),this.host.addEventListener("touchend",this._handleTouchEnd),this.host.addEventListener("mousedown",this._handleMouseDown)}_detachSwipeListeners(){this.host.removeEventListener("touchstart",this._handleTouchStart),this.host.removeEventListener("touchmove",this._handleTouchMove),this.host.removeEventListener("touchend",this._handleTouchEnd),this.host.removeEventListener("mousedown",this._handleMouseDown),document.removeEventListener("mousemove",this._handleMouseMove),document.removeEventListener("mouseup",this._handleMouseUp)}};At.styles=T`
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
  `;let ae=At;$t([F({type:Boolean,attribute:"swipe-to-dismiss"})],ae.prototype,"swipeToDismiss");$t([F({type:Number,attribute:"swipe-threshold"})],ae.prototype,"swipeThreshold");$t([F({type:Number,attribute:!1})],ae.prototype,"swipeOffset");var Mi=Object.getOwnPropertyDescriptor,zi=(s,e,t,a)=>{for(var n=a>1?void 0:a?Mi(e,t):e,o=s.length-1,p;o>=0;o--)(p=s[o])&&(n=p(n)||n);return n};let Ne=class extends O{render(){return y`
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
    `}};Ne.styles=T`
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

  `;Ne=zi([U("Dismiss",{class:ae,config:{dismissible:!0,autoDismiss:!0,autoDismissTimeout:6e3,swipeToDismiss:!0,swipeThreshold:100}})],Ne);var Li=Object.defineProperty,Ct=(s,e,t,a)=>{for(var n=void 0,o=s.length-1,p;o>=0;o--)(p=s[o])&&(n=p(e,t,n)||n);return n&&Li(e,t,n),n};const Ot=class Ot extends O{constructor(){super(...arguments),this._showAutoNotification=!0,this._showSwipeNotification=!0,this._showBasicNotification=!0}render(){return y`
      <div class="container">
        ${this._renderTier1()}
        ${this._renderTier2()}
        ${this._renderTier3()}
        ${this._renderCTA()}
      </div>
    `}_renderTier1(){return y`
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
    `}_renderTier2(){return y`
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
    `}_renderTier3(){return y`
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
            ${this._showBasicNotification?y`
              <basic-notification @dismissed=${this._handleBasicNotificationDismissed}>
                <strong>Level 1:</strong> BaseDismissFeature - Manual dismiss only
              </basic-notification>
            `:y`
              <div class="notification-placeholder"></div>
            `}
          </div>
          
          <div class="notification-slot">
            ${this._showAutoNotification?y`
              <auto-notification @dismissed=${this._handleAutoNotificationDismissed}>
                <strong>Level 2:</strong> AutoDismissFeature - Manual + Timer (4s)
              </auto-notification>
            `:y`
              <div class="notification-placeholder"></div>
            `}
          </div>
          
          <div class="notification-slot">
            ${this._showSwipeNotification?y`
              <swipe-notification @dismissed=${this._handleSwipeNotificationDismissed}>
                <strong>Level 3:</strong> SwipeDismissFeature - Manual + Timer + Swipe!
              </swipe-notification>
            `:y`
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
    `}_renderCTA(){return y`
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
    `}_handleAutoNotificationDismissed(){setTimeout(()=>{this._showAutoNotification=!1},200),setTimeout(()=>{this._showAutoNotification=!0},500)}_handleSwipeNotificationDismissed(){setTimeout(()=>{this._showSwipeNotification=!1},200),setTimeout(()=>{this._showSwipeNotification=!0},500)}_handleBasicNotificationDismissed(){setTimeout(()=>{this._showBasicNotification=!1},200),setTimeout(()=>{this._showBasicNotification=!0},500)}_goToDocs(){this.dispatchEvent(new CustomEvent("navigate",{detail:{page:"docs"},bubbles:!0,composed:!0}))}};Ot.styles=T`
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
        padding: 0 0 24px 0;
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
        padding: 0 0 32px 0;
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
        padding: 0 0 32px 0;
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
        padding: 0 0 40px 0;
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
  `;let ie=Ot;Ct([Ye()],ie.prototype,"_showAutoNotification");Ct([Ye()],ie.prototype,"_showSwipeNotification");Ct([Ye()],ie.prototype,"_showBasicNotification");customElements.define("simple-button",Fe);customElements.define("simple-card",Me);customElements.define("simple-badge",ze);customElements.define("themed-card",Le);customElements.define("themed-button",Re);customElements.define("themed-panel",Ie);customElements.define("basic-notification",Ue);customElements.define("auto-notification",je);customElements.define("swipe-notification",Ne);customElements.define("showcase-demo",ie);var Ri=Object.getOwnPropertyDescriptor,Ii=(s,e,t,a)=>{for(var n=a>1?void 0:a?Ri(e,t):e,o=s.length-1,p;o>=0;o--)(p=s[o])&&(n=p(n)||n);return n};let ft=class extends L{render(){return y`
      <div class="hero">
        <div class="eyebrow">Interactive Demo</div>
        <h1>LitFeature in Action</h1>
        <p class="lead">
          Explore how features compose across different component types—from simple ripple effects to complex state management with dismissible notifications.
        </p>
      </div>
      <showcase-demo></showcase-demo>
    `}};ft.styles=T`
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
        padding: 0;
      }
    }
  `;ft=Ii([ve("demo-page")],ft);var Ui=Object.defineProperty,ji=Object.getOwnPropertyDescriptor,Is=(s,e,t,a)=>{for(var n=a>1?void 0:a?ji(e,t):e,o=s.length-1,p;o>=0;o--)(p=s[o])&&(n=(a?p(e,t,n):p(n))||n);return a&&n&&Ui(e,t,n),n};let Be=class extends L{constructor(){super(),this.currentPage="home",this.handleRouteChange(),window.addEventListener("hashchange",()=>this.handleRouteChange())}connectedCallback(){super.connectedCallback(),this.addEventListener("navigate",s=>this.handleNavigate(s))}handleRouteChange(){let s=window.location.hash.slice(1),e=s;s.includes("#")&&(e=s.split("#")[0]);const t=e.split("/")[0]||"home",n={"":"home",home:"home",docs:"docs",demo:"demo"}[t]||"home",o=this.currentPage!==n;this.currentPage=n,o&&window.scrollTo({top:0,behavior:"instant"})}handleNavigate(s){const t=s.detail.page,a=t==="home"?"":t;window.location.hash=a}render(){return y`
      <nav-bar
        .currentPage=${this.currentPage}
        @navigate=${s=>this.handleNavigate(s)}
      ></nav-bar>
      <div class="page-container">
        ${this.renderPage()}
      </div>
    `}renderPage(){switch(this.currentPage){case"home":return y`<home-page></home-page>`;case"docs":return y`<docs-page></docs-page>`;case"demo":return y`<demo-page></demo-page>`;default:return y`<home-page></home-page>`}}};Be.styles=T`
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
  `;Is([Ye()],Be.prototype,"currentPage",2);Be=Is([ve("app-router")],Be);
