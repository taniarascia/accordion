var app=function(){"use strict";function e(){}function n(e){return e()}function t(){return Object.create(null)}function o(e){e.forEach(n)}function u(e){return"function"==typeof e}function l(e,n){return e!=e?n==n:e!==n||e&&"object"==typeof e||"function"==typeof e}function c(e,n){e.appendChild(n)}function r(e,n,t){e.insertBefore(n,t||null)}function i(e){e.parentNode.removeChild(e)}function a(e,n){for(let t=0;t<e.length;t+=1)e[t]&&e[t].d(n)}function s(e){return document.createElement(e)}function d(e){return document.createTextNode(e)}function f(){return d(" ")}function m(e,n,t,o){return e.addEventListener(n,t,o),()=>e.removeEventListener(n,t,o)}function p(e,n,t){null==t?e.removeAttribute(n):e.getAttribute(n)!==t&&e.setAttribute(n,t)}function h(e,n){n=""+n,e.wholeText!==n&&(e.data=n)}function y(e,n){for(let t=0;t<e.options.length;t+=1){const o=e.options[t];if(o.__value===n)return void(o.selected=!0)}e.selectedIndex=-1}let q;function g(e){q=e}const w=[],b=[],$=[],v=[],_=Promise.resolve();let k=!1;function x(e){$.push(e)}const C=new Set;let E=0;function A(){const e=q;do{for(;E<w.length;){const e=w[E];E++,g(e),B(e.$$)}for(g(null),w.length=0,E=0;b.length;)b.pop()();for(let e=0;e<$.length;e+=1){const n=$[e];C.has(n)||(C.add(n),n())}$.length=0}while(w.length);for(;v.length;)v.pop()();k=!1,C.clear(),g(e)}function B(e){if(null!==e.fragment){e.update(),o(e.before_update);const n=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,n),e.after_update.forEach(x)}}const D=new Set;function F(e,n){-1===e.$$.dirty[0]&&(w.push(e),k||(k=!0,_.then(A)),e.$$.dirty.fill(0)),e.$$.dirty[n/31|0]|=1<<n%31}function G(l,c,r,a,s,d,f,m=[-1]){const p=q;g(l);const h=l.$$={fragment:null,ctx:null,props:d,update:e,not_equal:s,bound:t(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(c.context||(p?p.$$.context:[])),callbacks:t(),dirty:m,skip_bound:!1,root:c.target||p.$$.root};f&&f(h.root);let y=!1;if(h.ctx=r?r(l,c.props||{},((e,n,...t)=>{const o=t.length?t[0]:n;return h.ctx&&s(h.ctx[e],h.ctx[e]=o)&&(!h.skip_bound&&h.bound[e]&&h.bound[e](o),y&&F(l,e)),n})):[],h.update(),y=!0,o(h.before_update),h.fragment=!!a&&a(h.ctx),c.target){if(c.hydrate){const e=function(e){return Array.from(e.childNodes)}(c.target);h.fragment&&h.fragment.l(e),e.forEach(i)}else h.fragment&&h.fragment.c();c.intro&&((w=l.$$.fragment)&&w.i&&(D.delete(w),w.i(b))),function(e,t,l,c){const{fragment:r,on_mount:i,on_destroy:a,after_update:s}=e.$$;r&&r.m(t,l),c||x((()=>{const t=i.map(n).filter(u);a?a.push(...t):o(t),e.$$.on_mount=[]})),s.forEach(x)}(l,c.target,c.anchor,c.customElement),A()}var w,b;g(p)}const j={z:{row:1,column:1},x:{row:1,column:2},c:{row:1,column:3},v:{row:1,column:4},b:{row:1,column:5},n:{row:1,column:6},m:{row:1,column:7},",":{row:1,column:8},".":{row:1,column:9},"/":{row:1,column:10},a:{row:2,column:1},s:{row:2,column:2},d:{row:2,column:3},f:{row:2,column:4},g:{row:2,column:5},h:{row:2,column:6},j:{row:2,column:7},k:{row:2,column:8},l:{row:2,column:9},";":{row:2,column:10},w:{row:3,column:1},e:{row:3,column:2},r:{row:3,column:3},t:{row:3,column:4},y:{row:3,column:5},u:{row:3,column:6},i:{row:3,column:7},o:{row:3,column:8},p:{row:3,column:9},"[":{row:3,column:10}},O=[16.35,32.7,65.41,130.81,261.63,523.25,1046.5,2093,4186.01],T=[17.32,34.65,69.3,138.59,277.18,554.37,1108.73,2217.46,4434.92],L=[18.35,36.71,73.42,146.83,293.66,587.33,1174.66,2349.32,4698.64],M=[19.45,38.89,77.78,155.56,311.13,622.25,1244.51,2489.02,4978.03],P=[20.6,41.2,82.41,164.81,329.63,659.26,1318.51,2637.02],H=[21.83,43.65,87.31,174.61,349.23,698.46,1396.91,2793.83],N=[23.12,46.25,92.5,185,369.99,739.99,1479.98,2959.96],S=[24.5,49,98,196,392,783.99,1567.98,3135.96],R=[25.96,51.91,103.83,207.65,415.3,830.61,1661.22,3322.44],z=[27.5,55,110,220,440,880,1760,3520],I=[29.14,58.27,116.54,233.08,466.16,932.33,1864.66,3729.31],K=[30.87,61.74,123.47,246.94,493.88,987.77,1975.53,3951.07],J=[{id:"1-1-pull",name:"D♭",frequency:T[4]},{id:"1-2-pull",name:"G",frequency:S[3]},{id:"1-3-pull",name:"B♭",frequency:I[3]},{id:"1-4-pull",name:"D",frequency:L[4]},{id:"1-5-pull",name:"E",frequency:P[4]},{id:"1-6-pull",name:"G",frequency:S[4]},{id:"1-7-pull",name:"B♭",frequency:I[4]},{id:"1-8-pull",name:"D",frequency:L[5]},{id:"1-9-pull",name:"E",frequency:P[5]},{id:"1-10-pull",name:"G",frequency:S[5]},{id:"1-1-push",name:"B",frequency:K[3]},{id:"1-2-push",name:"F",frequency:H[3]},{id:"1-3-push",name:"A",frequency:z[3]},{id:"1-4-push",name:"C",frequency:O[4]},{id:"1-5-push",name:"F",frequency:H[4]},{id:"1-6-push",name:"A",frequency:z[4]},{id:"1-7-push",name:"C",frequency:O[5]},{id:"1-8-push",name:"F",frequency:H[5]},{id:"1-9-push",name:"A",frequency:z[5]},{id:"1-10-push",name:"C",frequency:O[6]}],Q=[{id:"2-1-pull",name:"G♭",frequency:N[4]},{id:"2-2-pull",name:"A",frequency:z[3]},{id:"2-3-pull",name:"C",frequency:O[4]},{id:"2-4-pull",name:"E♭",frequency:M[4]},{id:"2-5-pull",name:"G",frequency:S[4]},{id:"2-6-pull",name:"A",frequency:z[4]},{id:"2-7-pull",name:"C",frequency:O[5]},{id:"2-8-pull",name:"E♭",frequency:M[5]},{id:"2-9-pull",name:"G",frequency:S[5]},{id:"2-10-pull",name:"A",frequency:z[5]},{id:"2-11-pull",name:"C",frequency:O[6]},{id:"2-1-push",name:"E",frequency:P[4]},{id:"2-2-push",name:"F",frequency:H[3]},{id:"2-3-push",name:"B♭",frequency:I[3]},{id:"2-4-push",name:"D",frequency:L[4]},{id:"2-5-push",name:"F",frequency:H[4]},{id:"2-6-push",name:"B♭",frequency:I[4]},{id:"2-7-push",name:"D",frequency:L[5]},{id:"2-8-push",name:"F",frequency:H[5]},{id:"2-9-push",name:"B♭",frequency:I[5]},{id:"2-10-push",name:"D",frequency:L[6]},{id:"2-11-push",name:"F",frequency:H[6]}],U=[{id:"3-1-pull",name:"B",frequency:K[4]},{id:"3-2-pull",name:"D",frequency:L[4]},{id:"3-3-pull",name:"F",frequency:H[4]},{id:"3-4-pull",name:"A♭",frequency:R[4]},{id:"3-5-pull",name:"C",frequency:O[5]},{id:"3-6-pull",name:"D",frequency:L[5]},{id:"3-7-pull",name:"F",frequency:H[5]},{id:"3-8-pull",name:"A♭",frequency:R[5]},{id:"3-9-pull",name:"C",frequency:O[6]},{id:"3-10-pull",name:"D",frequency:L[6]},{id:"3-1-push",name:"D♭",frequency:T[4]},{id:"3-2-push",name:"B♭",frequency:I[3]},{id:"3-3-push",name:"E♭",frequency:M[4]},{id:"3-4-push",name:"G",frequency:S[4]},{id:"3-5-push",name:"B♭",frequency:I[4]},{id:"3-6-push",name:"E♭",frequency:M[5]},{id:"3-7-push",name:"G",frequency:S[5]},{id:"3-8-push",name:"B♭",frequency:I[5]},{id:"3-9-push",name:"E♭",frequency:M[6]},{id:"3-10-push",name:"G",frequency:S[6]}],V={one:J,two:Q,three:U},W=[...J,...Q,...U].reduce(((e,n)=>({...e,[n.id]:n})),{}),X=Object.values({1:"one",2:"two",3:"three"});function Y(e,n,t){const o=e.slice();return o[12]=n[t],o}function Z(e,n,t){const o=e.slice();return o[15]=n[t],o}function ee(e,n,t){const o=e.slice();return o[18]=n[t][0],o[19]=n[t][1],o}function ne(e){let n,t,o=e[19].name+"";return{c(){n=s("div"),t=d(o),p(n,"class","circle note")},m(e,o){r(e,n,o),c(n,t)},p(e,n){2&n&&o!==(o=e[19].name+"")&&h(t,o)},d(e){e&&i(n)}}}function te(e){let n,t,o,u,l=e[15].name+"";return{c(){n=s("div"),t=d(l),p(n,"class",o="circle "+(e[1][e[15].id]?"active":"")),p(n,"id",u=e[15].id)},m(e,o){r(e,n,o),c(n,t)},p(e,c){1&c&&l!==(l=e[15].name+"")&&h(t,l),3&c&&o!==(o="circle "+(e[1][e[15].id]?"active":""))&&p(n,"class",o),1&c&&u!==(u=e[15].id)&&p(n,"id",u)},d(e){e&&i(n)}}}function oe(e){let n,t,o,u,l,m,h=e[12]+"",y=V[e[12]].filter(e[6]),q=[];for(let n=0;n<y.length;n+=1)q[n]=te(Z(e,y,n));return{c(){n=s("div"),t=s("h4"),o=d(h),u=f();for(let e=0;e<q.length;e+=1)q[e].c();l=f(),p(n,"class",m="row "+e[12])},m(e,i){r(e,n,i),c(n,t),c(t,o),c(n,u);for(let e=0;e<q.length;e+=1)q[e].m(n,null);c(n,l)},p(e,t){if(3&t){let o;for(y=V[e[12]].filter(e[6]),o=0;o<y.length;o+=1){const u=Z(e,y,o);q[o]?q[o].p(u,t):(q[o]=te(u),q[o].c(),q[o].m(n,l))}for(;o<q.length;o+=1)q[o].d(1);q.length=y.length}},d(e){e&&i(n),a(q,e)}}}function ue(n){let t,u,l,h,q,g,w,b,$,v,_,k,C,E,A,B,D,F,G,j,O,T,L,M,P,H,N,S,R,z,I,K,J,Q,U,V,W,Z=Object.entries(n[1]),te=[];for(let e=0;e<Z.length;e+=1)te[e]=ne(ee(n,Z,e));let ue=X,le=[];for(let e=0;e<ue.length;e+=1)le[e]=oe(Y(n,ue,e));return{c(){t=f(),u=s("main"),l=s("div"),h=s("div"),q=s("h1"),q.textContent="Diatonic Keyboard",g=f(),w=s("h2"),w.textContent="Play the diatonic button accordion with your computer keyboard!",b=f(),$=s("div"),v=s("div"),_=s("h3"),_.textContent="Direction",k=f(),C=s("select"),E=s("option"),A=d("Pull"),D=s("option"),F=d("Push"),j=f(),O=s("div"),T=s("h3"),T.textContent="Tuning",L=f(),M=s("select"),P=s("option"),P.innerHTML="<h2>F - B♭ - E♭ (Fa)</h2>",H=s("option"),H.innerHTML="<h2>G - C - F (Sol) Not yet</h2>",N=f(),S=s("div"),S.innerHTML="<h2>How to play</h2> \n        <ul><li>Press <kbd>`</kbd> to toggle pushing the bellows</li> \n          <li>Row 1 starts with <kbd>z</kbd> and ends with <kbd>,</kbd></li> \n          <li>Row 2 starts with <kbd>a</kbd> and ends with <kbd>;</kbd></li> \n          <li>Row 3 starts with <kbd>w</kbd> and ends with <kbd>[</kbd></li> \n          <li>Make sure you&#39;re not pressing any other buttons (shift, caps lock)</li></ul>",R=f(),z=s("div"),I=s("h2"),I.textContent="Currently playing",K=f(),J=s("div");for(let e=0;e<te.length;e+=1)te[e].c();Q=f(),U=s("div");for(let e=0;e<le.length;e+=1)le[e].c();E.__value="pull",E.value=E.__value,E.selected=B="pull"===n[0],D.__value="push",D.value=D.__value,D.selected=G="push"===n[0],void 0===n[0]&&x((()=>n[5].call(C))),P.__value="fbe",P.value=P.__value,P.selected=!0,H.__value="gcf",H.value=H.__value,H.disabled=!0,p($,"class","flex"),p(J,"class","currently-playing"),p(U,"class","accordion-layout"),p(l,"class","layout")},m(e,o){r(e,t,o),r(e,u,o),c(u,l),c(l,h),c(h,q),c(h,g),c(h,w),c(h,b),c(h,$),c($,v),c(v,_),c(v,k),c(v,C),c(C,E),c(E,A),c(C,D),c(D,F),y(C,n[0]),c($,j),c($,O),c(O,T),c(O,L),c(O,M),c(M,P),c(M,H),c(h,N),c(h,S),c(h,R),c(h,z),c(z,I),c(z,K),c(z,J);for(let e=0;e<te.length;e+=1)te[e].m(J,null);c(l,Q),c(l,U);for(let e=0;e<le.length;e+=1)le[e].m(U,null);V||(W=[m(document.body,"keypress",n[2]),m(document.body,"keyup",n[3]),m(C,"change",n[5]),m(C,"change",n[4])],V=!0)},p(e,[n]){if(1&n&&B!==(B="pull"===e[0])&&(E.selected=B),1&n&&G!==(G="push"===e[0])&&(D.selected=G),1&n&&y(C,e[0]),2&n){let t;for(Z=Object.entries(e[1]),t=0;t<Z.length;t+=1){const o=ee(e,Z,t);te[t]?te[t].p(o,n):(te[t]=ne(o),te[t].c(),te[t].m(J,null))}for(;t<te.length;t+=1)te[t].d(1);te.length=Z.length}if(3&n){let t;for(ue=X,t=0;t<ue.length;t+=1){const o=Y(e,ue,t);le[t]?le[t].p(o,n):(le[t]=oe(o),le[t].c(),le[t].m(U,null))}for(;t<le.length;t+=1)le[t].d(1);le.length=ue.length}},i:e,o:e,d(e){e&&i(t),e&&i(u),a(te,e),a(le,e),V=!1,o(W)}}}function le(e,n,t){const o=new AudioContext,u=o.createGain();u.gain.value=.1,u.connect(o.destination);let l="pull",c={};function r(e){const{frequency:n}=W[e],t=o.createOscillator();return t.type="square",t.connect(u),t.frequency.value=n,t.start(),{oscillator:t}}function i(e){if(l!==e){t(0,l=e);const n={...c};for(const[t,o]of Object.entries(c)){o.oscillator.stop(),delete n[t];const u=`${t.split("-")[0]}-${t.split("-")[1]}-${e}`,{oscillator:l}=r(u);n[u]={oscillator:l,...W[u]}}t(1,c=n)}}return[l,c,function(e){if("`"===e.key)return void i("push");const n=j[e.key];if(n){const{row:e,column:o}=n,u=`${e}-${o}-${l}`;if(!c[u]){const{oscillator:e}=r(u);t(1,c[u]={oscillator:e,...W[u]},c)}}},function(e){if("`"===e.key)return void i("pull");const n=j[e.key];if(n){const{row:e,column:o}=n,u=`${e}-${o}-${l}`;if(c[u]){!function(e){const{oscillator:n}=c[e];n.stop()}(u);const e={...c};delete e[u],t(1,c=e)}}},function(e){t(0,l=e.target.value)},function(){l=function(e){const n=e.querySelector(":checked")||e.options[0];return n&&n.__value}(this),t(0,l)},({id:e})=>e.includes(l)]}return new class extends class{$destroy(){!function(e,n){const t=e.$$;null!==t.fragment&&(o(t.on_destroy),t.fragment&&t.fragment.d(n),t.on_destroy=t.fragment=null,t.ctx=[])}(this,1),this.$destroy=e}$on(e,n){const t=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return t.push(n),()=>{const e=t.indexOf(n);-1!==e&&t.splice(e,1)}}$set(e){var n;this.$$set&&(n=e,0!==Object.keys(n).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}{constructor(e){super(),G(this,e,le,ue,l,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map