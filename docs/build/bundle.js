var app=function(){"use strict";function e(){}function n(e){return e()}function l(){return Object.create(null)}function t(e){e.forEach(n)}function o(e){return"function"==typeof e}function u(e,n){return e!=e?n==n:e!==n||e&&"object"==typeof e||"function"==typeof e}function r(e,n){e.appendChild(n)}function c(e,n,l){e.insertBefore(n,l||null)}function i(e){e.parentNode.removeChild(e)}function s(e,n){for(let l=0;l<e.length;l+=1)e[l]&&e[l].d(n)}function a(e){return document.createElement(e)}function d(e){return document.createTextNode(e)}function p(){return d(" ")}function f(e,n,l,t){return e.addEventListener(n,l,t),()=>e.removeEventListener(n,l,t)}function m(e,n,l){null==l?e.removeAttribute(n):e.getAttribute(n)!==l&&e.setAttribute(n,l)}function h(e,n){n=""+n,e.wholeText!==n&&(e.data=n)}let y;function b(e){y=e}const q=[],w=[],g=[],v=[],$=Promise.resolve();let k=!1;function _(e){g.push(e)}const E=new Set;let x=0;function C(){const e=y;do{for(;x<q.length;){const e=q[x];x++,b(e),A(e.$$)}for(b(null),q.length=0,x=0;w.length;)w.pop()();for(let e=0;e<g.length;e+=1){const n=g[e];E.has(n)||(E.add(n),n())}g.length=0}while(q.length);for(;v.length;)v.pop()();k=!1,E.clear(),b(e)}function A(e){if(null!==e.fragment){e.update(),t(e.before_update);const n=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,n),e.after_update.forEach(_)}}const F=new Set;function B(e,n){-1===e.$$.dirty[0]&&(q.push(e),k||(k=!0,$.then(C)),e.$$.dirty.fill(0)),e.$$.dirty[n/31|0]|=1<<n%31}function T(u,r,c,s,a,d,p,f=[-1]){const m=y;b(u);const h=u.$$={fragment:null,ctx:null,props:d,update:e,not_equal:a,bound:l(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(r.context||(m?m.$$.context:[])),callbacks:l(),dirty:f,skip_bound:!1,root:r.target||m.$$.root};p&&p(h.root);let q=!1;if(h.ctx=c?c(u,r.props||{},((e,n,...l)=>{const t=l.length?l[0]:n;return h.ctx&&a(h.ctx[e],h.ctx[e]=t)&&(!h.skip_bound&&h.bound[e]&&h.bound[e](t),q&&B(u,e)),n})):[],h.update(),q=!0,t(h.before_update),h.fragment=!!s&&s(h.ctx),r.target){if(r.hydrate){const e=function(e){return Array.from(e.childNodes)}(r.target);h.fragment&&h.fragment.l(e),e.forEach(i)}else h.fragment&&h.fragment.c();r.intro&&((w=u.$$.fragment)&&w.i&&(F.delete(w),w.i(g))),function(e,l,u,r){const{fragment:c,on_mount:i,on_destroy:s,after_update:a}=e.$$;c&&c.m(l,u),r||_((()=>{const l=i.map(n).filter(o);s?s.push(...l):t(l),e.$$.on_mount=[]})),a.forEach(_)}(u,r.target,r.anchor,r.customElement),C()}var w,g;b(m)}const j={z:{row:1,column:1},x:{row:1,column:2},c:{row:1,column:3},v:{row:1,column:4},b:{row:1,column:5},n:{row:1,column:6},m:{row:1,column:7},",":{row:1,column:8},".":{row:1,column:9},"/":{row:1,column:10},a:{row:2,column:1},s:{row:2,column:2},d:{row:2,column:3},f:{row:2,column:4},g:{row:2,column:5},h:{row:2,column:6},j:{row:2,column:7},k:{row:2,column:8},l:{row:2,column:9},";":{row:2,column:10},"'":{row:2,column:11},w:{row:3,column:1},e:{row:3,column:2},r:{row:3,column:3},t:{row:3,column:4},y:{row:3,column:5},u:{row:3,column:6},i:{row:3,column:7},o:{row:3,column:8},p:{row:3,column:9},"[":{row:3,column:10}},D={1:{row:1,column:1},2:{row:1,column:2},3:{row:2,column:1},4:{row:2,column:2},5:{row:1,column:3},6:{row:1,column:4},7:{row:2,column:3},8:{row:2,column:4},9:{row:1,column:5},0:{row:1,column:6},"-":{row:2,column:5},"=":{row:2,column:6}},M=[16.35,32.7,65.41,130.81,261.63,523.25,1046.5,2093,4186.01],G=[17.32,34.65,69.3,138.59,277.18,554.37,1108.73,2217.46,4434.92],O=[18.35,36.71,73.42,146.83,293.66,587.33,1174.66,2349.32,4698.64],L=[19.45,38.89,77.78,155.56,311.13,622.25,1244.51,2489.02,4978.03],H=[20.6,41.2,82.41,164.81,329.63,659.26,1318.51,2637.02],N=[21.83,43.65,87.31,174.61,349.23,698.46,1396.91,2793.83],S=[23.12,46.25,92.5,185,369.99,739.99,1479.98,2959.96],P=[24.5,49,98,196,392,783.99,1567.98,3135.96],z=[25.96,51.91,103.83,207.65,415.3,830.61,1661.22,3322.44],K=[27.5,55,110,220,440,880,1760,3520],R=[29.14,58.27,116.54,233.08,466.16,932.33,1864.66,3729.31],I=[30.87,61.74,123.47,246.94,493.88,987.77,1975.53,3951.07],J=[{id:"1-1-pull",name:"D♭",frequency:G[4]},{id:"1-2-pull",name:"G",frequency:P[3]},{id:"1-3-pull",name:"B♭",frequency:R[3]},{id:"1-4-pull",name:"D",frequency:O[4]},{id:"1-5-pull",name:"E",frequency:H[4]},{id:"1-6-pull",name:"G",frequency:P[4]},{id:"1-7-pull",name:"B♭",frequency:R[4]},{id:"1-8-pull",name:"D",frequency:O[5]},{id:"1-9-pull",name:"E",frequency:H[5]},{id:"1-10-pull",name:"G",frequency:P[5]},{id:"1-1-push",name:"B",frequency:I[3]},{id:"1-2-push",name:"F",frequency:N[3]},{id:"1-3-push",name:"A",frequency:K[3]},{id:"1-4-push",name:"C",frequency:M[4]},{id:"1-5-push",name:"F",frequency:N[4]},{id:"1-6-push",name:"A",frequency:K[4]},{id:"1-7-push",name:"C",frequency:M[5]},{id:"1-8-push",name:"F",frequency:N[5]},{id:"1-9-push",name:"A",frequency:K[5]},{id:"1-10-push",name:"C",frequency:M[6]}],Q=[{id:"2-1-pull",name:"F♯",frequency:S[4]},{id:"2-2-pull",name:"A",frequency:K[3]},{id:"2-3-pull",name:"C",frequency:M[4]},{id:"2-4-pull",name:"E♭",frequency:L[4]},{id:"2-5-pull",name:"G",frequency:P[4]},{id:"2-6-pull",name:"A",frequency:K[4]},{id:"2-7-pull",name:"C",frequency:M[5]},{id:"2-8-pull",name:"E♭",frequency:L[5]},{id:"2-9-pull",name:"G",frequency:P[5]},{id:"2-10-pull",name:"A",frequency:K[5]},{id:"2-11-pull",name:"C",frequency:M[6]},{id:"2-1-push",name:"E",frequency:H[4]},{id:"2-2-push",name:"F",frequency:N[3]},{id:"2-3-push",name:"B♭",frequency:R[3]},{id:"2-4-push",name:"D",frequency:O[4]},{id:"2-5-push",name:"F",frequency:N[4]},{id:"2-6-push",name:"B♭",frequency:R[4]},{id:"2-7-push",name:"D",frequency:O[5]},{id:"2-8-push",name:"F",frequency:N[5]},{id:"2-9-push",name:"B♭",frequency:R[5]},{id:"2-10-push",name:"D",frequency:O[6]},{id:"2-11-push",name:"F",frequency:N[6]}],U=[{id:"3-1-pull",name:"B",frequency:I[4]},{id:"3-2-pull",name:"D",frequency:O[4]},{id:"3-3-pull",name:"F",frequency:N[4]},{id:"3-4-pull",name:"A♭",frequency:z[4]},{id:"3-5-pull",name:"C",frequency:M[5]},{id:"3-6-pull",name:"D",frequency:O[5]},{id:"3-7-pull",name:"F",frequency:N[5]},{id:"3-8-pull",name:"A♭",frequency:z[5]},{id:"3-9-pull",name:"C",frequency:M[6]},{id:"3-10-pull",name:"D",frequency:O[6]},{id:"3-1-push",name:"D♭",frequency:G[4]},{id:"3-2-push",name:"B♭",frequency:R[3]},{id:"3-3-push",name:"E♭",frequency:L[4]},{id:"3-4-push",name:"G",frequency:P[4]},{id:"3-5-push",name:"B♭",frequency:R[4]},{id:"3-6-push",name:"E♭",frequency:L[5]},{id:"3-7-push",name:"G",frequency:P[5]},{id:"3-8-push",name:"B♭",frequency:R[5]},{id:"3-9-push",name:"E♭",frequency:L[6]},{id:"3-10-push",name:"G",frequency:P[6]}],V={one:[{id:"1-1-pull-bass",name:"gm",frequency:[P[3],R[4],O[4]]},{id:"1-2-pull-bass",name:"G",frequency:P[2]},{id:"1-1-push-bass",name:"d",frequency:[O[3],S[4],K[4]]},{id:"1-2-push-bass",name:"D",frequency:O[3]},{id:"1-3-pull-bass",name:"cm",frequency:[M[3],L[4],P[4]]},{id:"1-4-pull-bass",name:"C",frequency:M[3]},{id:"1-3-push-bass",name:"g",frequency:[M[3],H[4],P[4]]},{id:"1-4-push-bass",name:"G",frequency:P[2]},{id:"1-5-pull-bass",name:"ab",frequency:[z[3],M[4],L[4]]},{id:"1-6-pull-bass",name:"A♭",frequency:z[3]},{id:"1-5-push-bass",name:"ab",frequency:[z[3],M[4],L[4]]},{id:"1-6-push-bass",name:"A♭",frequency:z[3]}],two:[{id:"2-1-pull-bass",name:"c",frequency:[M[3],H[4],P[4]]},{id:"2-2-pull-bass",name:"C",frequency:M[3]},{id:"2-1-push-bass",name:"f",frequency:[N[3],K[4],M[4]]},{id:"2-2-push-bass",name:"F",frequency:N[3]},{id:"2-3-pull-bass",name:"f",frequency:[N[3],K[4],M[4]]},{id:"2-4-pull-bass",name:"F",frequency:N[3]},{id:"2-3-push-bass",name:"b♭",frequency:[R[3],O[4],N[4]]},{id:"2-4-push-bass",name:"B♭",frequency:R[3]},{id:"2-5-pull-bass",name:"b♭",frequency:[R[3],O[4],N[4]]},{id:"2-6-pull-bass",name:"B♭",frequency:R[3]},{id:"2-5-push-bass",name:"e♭",frequency:[L[3],P[4],R[4]]},{id:"2-6-push-bass",name:"E♭",frequency:L[3]}]},W={F:{notes:[["3-3-pull"],["1-6-pull"],["2-6-pull"],["1-7-pull"],["2-7-pull"],["3-6-pull"],["1-9-pull"],["3-7-pull"]],thirds:[["2-6-pull","3-3-pull"],["1-6-pull","1-7-pull"],["2-6-pull","2-7-pull"],["1-7-pull","1-8-pull"],["1-9-pull","2-7-pull"],["3-7-pull","3-6-pull"],["1-9-pull","1-10-pull"],["2-10-pull","3-7-pull"]]},Bb:{notes:[["1-3-pull"],["2-3-pull"],["3-2-pull"],["2-4-pull"],["3-3-pull"],["1-6-pull"],["2-6-pull"],["1-7-pull"]],thirds:[["1-3-pull","1-4-pull"],["2-3-pull","2-4-pull"],["3-2-pull","3-3-pull"],["2-4-pull","2-5-pull"],["3-3-pull","2-6-pull"],["1-6-pull","1-7-pull"],["2-6-pull","2-7-pull"],["1-7-pull","1-8-pull"]]},Eb:{notes:[["2-4-pull"],["3-3-pull"],["2-5-pull"],["3-4-pull"],["1-7-pull"],["2-7-pull"],["3-6-pull"],["2-8-pull"]],thirds:[["2-5-pull","2-4-pull"],["3-3-pull","3-4-pull"],["2-5-pull","1-7-pull"],["3-4-pull","3-5-pull"],["1-7-pull","1-8-pull"],["2-7-pull","2-8-pull"],["3-6-pull","3-7-pull"],["2-8-pull","2-9-pull"]]}},X={one:J,two:Q,three:U},Y=[...J,...Q,...U,...V.one,...V.two].reduce(((e,n)=>({...e,[n.id]:n})),{}),Z={FBE:{one:"F",two:"B♭",three:"E♭"}},ee=Object.values({1:"one",2:"two",3:"three"}),ne=Object.values({1:"one",2:"two"});function le(e,n,l){const t=e.slice();return t[18]=n[l],t}function te(e,n,l){const t=e.slice();return t[21]=n[l],t}function oe(e,n,l){const t=e.slice();return t[24]=n[l][0],t[25]=n[l][1],t}function ue(e,n,l){const t=e.slice();return t[18]=n[l],t}function re(e,n,l){const t=e.slice();return t[21]=n[l],t}function ce(e){let n,l,t,u,s,p,y=e[21].name+"";return{c(){n=a("div"),l=d(y),m(n,"class",t=`circle ${e[2][e[21].id]?"active":""} ${e[0]} `),m(n,"id",u=e[21].id)},m(t,u){c(t,n,u),r(n,l),s||(p=f(n,"mousedown",(function(){o(e[6](e[21].id))&&e[6](e[21].id).apply(this,arguments)})),s=!0)},p(o,r){e=o,1&r[0]&&y!==(y=e[21].name+"")&&h(l,y),5&r[0]&&t!==(t=`circle ${e[2][e[21].id]?"active":""} ${e[0]} `)&&m(n,"class",t),1&r[0]&&u!==(u=e[21].id)&&m(n,"id",u)},d(e){e&&i(n),s=!1,p()}}}function ie(e){let n,l,t,o,u,f,y,b,q=Z[e[1]][e[18]]+"",w=e[18]+"",g=X[e[18]].filter(e[9]),v=[];for(let n=0;n<g.length;n+=1)v[n]=ce(re(e,g,n));return{c(){n=a("div");for(let e=0;e<v.length;e+=1)v[e].c();l=p(),t=a("h4"),o=d(q),u=a("br"),f=d(w),y=p(),m(n,"class",b="row "+e[18])},m(e,i){c(e,n,i);for(let e=0;e<v.length;e+=1)v[e].m(n,null);r(n,l),r(n,t),r(t,o),r(t,u),r(t,f),r(n,y)},p(e,t){if(69&t[0]){let o;for(g=X[e[18]].filter(e[9]),o=0;o<g.length;o+=1){const u=re(e,g,o);v[o]?v[o].p(u,t):(v[o]=ce(u),v[o].c(),v[o].m(n,l))}for(;o<v.length;o+=1)v[o].d(1);v.length=g.length}2&t[0]&&q!==(q=Z[e[1]][e[18]]+"")&&h(o,q)},d(e){e&&i(n),s(v,e)}}}function se(e){let n,l,t,o,u,s,f,y,b,q,w,g,v=e[25].name+"",$=e[24].split("-")[0]+"",k=e[24].split("-")[1]+"";return{c(){n=a("div"),l=a("div"),t=d(v),o=p(),u=a("div"),s=a("small"),f=d("Row: "),y=d($),b=a("br"),q=d(" Col: "),w=d(k),g=p(),m(l,"class","circle note"),m(n,"class","flex col")},m(e,i){c(e,n,i),r(n,l),r(l,t),r(n,o),r(n,u),r(u,s),r(s,f),r(s,y),r(s,b),r(s,q),r(s,w),r(n,g)},p(e,n){4&n[0]&&v!==(v=e[25].name+"")&&h(t,v),4&n[0]&&$!==($=e[24].split("-")[0]+"")&&h(y,$),4&n[0]&&k!==(k=e[24].split("-")[1]+"")&&h(w,k)},d(e){e&&i(n)}}}function ae(e){let n,l,t,u,s,p,y=e[21].name+"";return{c(){n=a("div"),l=d(y),m(n,"class",t=`circle ${e[2][e[21].id]?"active":""} ${e[0]} `),m(n,"id",u=e[21].id)},m(t,u){c(t,n,u),r(n,l),s||(p=f(n,"mousedown",(function(){o(e[6](e[21].id))&&e[6](e[21].id).apply(this,arguments)})),s=!0)},p(o,r){e=o,1&r[0]&&y!==(y=e[21].name+"")&&h(l,y),5&r[0]&&t!==(t=`circle ${e[2][e[21].id]?"active":""} ${e[0]} `)&&m(n,"class",t),1&r[0]&&u!==(u=e[21].id)&&m(n,"id",u)},d(e){e&&i(n),s=!1,p()}}}function de(e){let n,l,t,o=V[e[18]].filter(e[10]),u=[];for(let n=0;n<o.length;n+=1)u[n]=ae(te(e,o,n));return{c(){n=a("div");for(let e=0;e<u.length;e+=1)u[e].c();l=p(),m(n,"class",t="row "+e[18])},m(e,t){c(e,n,t);for(let e=0;e<u.length;e+=1)u[e].m(n,null);r(n,l)},p(e,t){if(69&t[0]){let r;for(o=V[e[18]].filter(e[10]),r=0;r<o.length;r+=1){const c=te(e,o,r);u[r]?u[r].p(c,t):(u[r]=ae(c),u[r].c(),u[r].m(n,l))}for(;r<u.length;r+=1)u[r].d(1);u.length=o.length}},d(e){e&&i(n),s(u,e)}}}function pe(n){let l,o,u,d,h,y,b,q,w,g,v,$,k,_,E,x,C,A,F,B,T,j,D,M,G,O,L,H,N,S,P,z,K,R,I,J,Q,U,V,W,X,Y,Z,te,re,ce,ae,pe,fe,me,he,ye,be,qe,we,ge,ve,$e,ke,_e,Ee=ee,xe=[];for(let e=0;e<Ee.length;e+=1)xe[e]=ie(ue(n,Ee,e));let Ce=Object.entries(n[2]),Ae=[];for(let e=0;e<Ce.length;e+=1)Ae[e]=se(oe(n,Ce,e));let Fe=ne,Be=[];for(let e=0;e<Fe.length;e+=1)Be[e]=de(le(n,Fe,e));return{c(){l=p(),o=a("main"),u=a("div"),u.innerHTML='<div class="banner">This app is only available on a desktop!</div>',d=p(),h=a("div"),y=a("div"),b=a("div");for(let e=0;e<xe.length;e+=1)xe[e].c();q=p(),w=a("div"),g=a("div"),v=a("div"),v.innerHTML="<h1>Keyboard Accordion</h1> \n          <h2>Play the diatonic button accordion with your computer keyboard!</h2>",$=p(),k=a("div"),k.innerHTML="<h3>How to use</h3> \n          <ul><li>Each key on the keyboard corresponds to a button on the accordion.</li> \n            <li>Hold down <kbd>q</kbd> to <strong>push</strong> the bellows. Default is\n              <strong>pull</strong>.</li> \n            <li>The treble side buttons begin with <kbd>z</kbd>, <kbd>a</kbd>, and <kbd>w</kbd></li> \n            <li>The twelve bass buttons use the number row from <kbd>1</kbd> to <kbd>=</kbd></li></ul>",_=p(),E=a("div"),x=a("div"),C=a("h3"),C.textContent="Tuning",A=p(),F=a("select"),B=a("option"),B.innerHTML="<h2>FB♭E♭ (Fa)</h2>",T=a("option"),T.innerHTML="<h2>GCF (Sol) Not yet</h2>",j=a("option"),j.innerHTML="<h2>EAD (Mi) Not yet</h2>",D=p(),M=a("div"),G=a("h3"),G.textContent="Major Scales",O=p(),L=a("div"),H=a("div"),N=a("h4"),N.textContent="F Major",S=p(),P=a("div"),z=a("button"),z.textContent="Notes",K=p(),R=a("button"),R.textContent="Thirds",I=p(),J=a("div"),Q=a("h4"),Q.textContent="B♭ Major",U=p(),V=a("div"),W=a("button"),W.textContent="Notes",X=p(),Y=a("button"),Y.textContent="Thirds",Z=p(),te=a("div"),re=a("h4"),re.textContent="E♭ Major",ce=p(),ae=a("div"),pe=a("button"),pe.textContent="Notes",fe=p(),me=a("button"),me.textContent="Thirds",he=p(),ye=a("div"),be=a("div");for(let e=0;e<Ae.length;e+=1)Ae[e].c();qe=p(),we=a("div"),ge=a("div");for(let e=0;e<Be.length;e+=1)Be[e].c();ve=p(),$e=a("footer"),$e.innerHTML='<p>Made with 💾 by <a href="https://tania.dev" target="_blank">Tania</a>.</p> \n        <p><a href="https://github.com/taniarascia/accordion" target="_blank">Open source</a></p>',m(u,"class","mobile-only"),m(b,"class","desktop-only accordion-layout"),m(y,"class","keyboard-side"),m(v,"class","title"),B.__value="FBE",B.value=B.__value,B.selected=!0,T.__value="GCF",T.value=T.__value,T.disabled=!0,j.__value="EAD",j.value=j.__value,j.disabled=!0,m(E,"class","flex"),m(H,"class","scale"),m(J,"class","scale"),m(te,"class","scale"),m(L,"class","scales"),m(g,"class","information"),m(be,"class","currently-playing"),m(ye,"class","desktop-only"),m(w,"class","information-side"),m(ge,"class","desktop-only accordion-layout"),m(we,"class","bass-side"),m(h,"class","layout")},m(e,t){c(e,l,t),c(e,o,t),r(o,u),r(o,d),r(o,h),r(h,y),r(y,b);for(let e=0;e<xe.length;e+=1)xe[e].m(b,null);r(h,q),r(h,w),r(w,g),r(g,v),r(g,$),r(g,k),r(g,_),r(g,E),r(E,x),r(x,C),r(x,A),r(x,F),r(F,B),r(F,T),r(F,j),r(g,D),r(g,M),r(M,G),r(M,O),r(M,L),r(L,H),r(H,N),r(H,S),r(H,P),r(P,z),r(P,K),r(P,R),r(L,I),r(L,J),r(J,Q),r(J,U),r(J,V),r(V,W),r(V,X),r(V,Y),r(L,Z),r(L,te),r(te,re),r(te,ce),r(te,ae),r(ae,pe),r(ae,fe),r(ae,me),r(w,he),r(w,ye),r(ye,be);for(let e=0;e<Ae.length;e+=1)Ae[e].m(be,null);r(h,qe),r(h,we),r(we,ge);for(let e=0;e<Be.length;e+=1)Be[e].m(ge,null);r(we,ve),r(we,$e),ke||(_e=[f(document.body,"keypress",n[4]),f(document.body,"keyup",n[5]),f(document.body,"mouseup",n[7]),f(F,"click",n[3]),f(z,"click",n[8]("F","notes")),f(R,"click",n[8]("F","thirds")),f(W,"click",n[8]("Bb","notes")),f(Y,"click",n[8]("Bb","thirds")),f(pe,"click",n[8]("Eb","notes")),f(me,"click",n[8]("Eb","thirds"))],ke=!0)},p(e,n){if(71&n[0]){let l;for(Ee=ee,l=0;l<Ee.length;l+=1){const t=ue(e,Ee,l);xe[l]?xe[l].p(t,n):(xe[l]=ie(t),xe[l].c(),xe[l].m(b,null))}for(;l<xe.length;l+=1)xe[l].d(1);xe.length=Ee.length}if(4&n[0]){let l;for(Ce=Object.entries(e[2]),l=0;l<Ce.length;l+=1){const t=oe(e,Ce,l);Ae[l]?Ae[l].p(t,n):(Ae[l]=se(t),Ae[l].c(),Ae[l].m(be,null))}for(;l<Ae.length;l+=1)Ae[l].d(1);Ae.length=Ce.length}if(69&n[0]){let l;for(Fe=ne,l=0;l<Fe.length;l+=1){const t=le(e,Fe,l);Be[l]?Be[l].p(t,n):(Be[l]=de(t),Be[l].c(),Be[l].m(ge,null))}for(;l<Be.length;l+=1)Be[l].d(1);Be.length=Fe.length}},i:e,o:e,d(e){e&&i(l),e&&i(o),s(xe,e),s(Ae,e),s(Be,e),ke=!1,t(_e)}}}function fe(e,n,l){const t=new(window.AudioContext||window.webkitAudioContext),o=t.createGain();o.gain.value=.1,o.connect(t.destination);let u="pull",r="FBE",c={};function i(e){const{frequency:n}=Y[e];let l;return Array.isArray(n)?l=n.map((e=>{const n=t.createOscillator();return n.type="sawtooth",n.connect(o),n.frequency.value=e,n.start(),n})):(l=t.createOscillator(),l.type="sawtooth",l.connect(o),l.frequency.value=n,l.start()),{oscillator:l}}function s(e){const{oscillator:n}=c[e];Array.isArray(n)?n.forEach((e=>e?.stop())):n?.stop()}function a(e){if(u!==e){l(0,u=e);const n={...c};let t=!1;for(const[l,o]of Object.entries(c)){Array.isArray(o.oscillator)?(t=!0,o.oscillator.forEach((e=>e?.stop()))):o.oscillator?.stop(),delete n[l];const u=`${l.split("-")[0]}-${l.split("-")[1]}-${e}${t?"-bass":""}`,{oscillator:r}=i(u);n[u]={oscillator:r,...Y[u]}}l(2,c=n)}}function d(e){if(!c[e]){const{oscillator:n}=i(e);l(2,c[e]={oscillator:n,...Y[e]},c)}}const p=()=>{for(const[e,n]of Object.entries(c))Array.isArray(n.oscillator)?n.oscillator.forEach((e=>e?.stop())):n.oscillator?.stop();l(2,c={})};async function f(e){p();for(const n of e)if(!c[n]){const{oscillator:e}=i(n);l(2,c[n]={oscillator:e,...Y[n]},c)}var n;await(n=600,new Promise((e=>setTimeout(e,n))));for(const n of e){s(n);const e={...c};delete e[n],l(2,c=e)}}return[u,r,c,function(e){l(1,r=e.target.value)},function(e){const n=`${e.key}`.toLowerCase()||e.key;if("q"===n)return void a("push");const l=j[n];if(l){const{row:e,column:n}=l;return d(`${e}-${n}-${u}`)}const t=D[n];if(t){const{row:e,column:n}=t;return d(`${e}-${n}-${u}-bass`)}},function(e){const n=`${e.key}`.toLowerCase()||e.key;if("q"===n)return void a("pull");const t=j[n];if(t){const{row:e,column:n}=t,o=`${e}-${n}-${u}`;if(c[o]){s(o);const e={...c};delete e[o],l(2,c=e)}}const o=D[n];if(o){const{row:e,column:n}=o,t=`${e}-${n}-${u}-bass`;if(c[t]){s(t);const e={...c};delete e[t],l(2,c=e)}}},e=>{d(e)},p,(e,n)=>async()=>{const l=[...W[e][n]].reverse();l.shift();const t=[...W[e][n],...l];for(const e of t)await f(e)},({id:e})=>e.includes(u),({id:e})=>e.includes(u)]}return new class extends class{$destroy(){!function(e,n){const l=e.$$;null!==l.fragment&&(t(l.on_destroy),l.fragment&&l.fragment.d(n),l.on_destroy=l.fragment=null,l.ctx=[])}(this,1),this.$destroy=e}$on(e,n){const l=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return l.push(n),()=>{const e=l.indexOf(n);-1!==e&&l.splice(e,1)}}$set(e){var n;this.$$set&&(n=e,0!==Object.keys(n).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}{constructor(e){super(),T(this,e,fe,pe,u,{},null,[-1,-1])}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
