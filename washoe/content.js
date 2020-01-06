!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t){},,function(e,t,n){"use strict";n.r(t);const o=(e="div",t="")=>{const[n,...o]=e.match(/[^\.]+/g),r=document.createElement(n);return r.className=o.join(" "),r.textContent=t,r},r=(e,t)=>Object.keys(t).forEach(n=>e.style[n]=t[n]),a=e=>document.querySelector(e)&&document.querySelector(e).remove(),i={zIndex:"2147483647",position:"fixed",margin:"auto",top:"100px",right:0,left:0,maxWidth:"736px",width:"75%",height:"48px",fontSize:"15px",paddingInlineStart:"48px",paddingInlineEnd:"48px",background:"#38383D",borderRadius:"3px",color:"rgba(249, 249, 250, 1)",border:"solid 1px #0a84ff",boxShadow:"0 0 0 1px #0a84ff, 0 0 0 4px rgba(10, 132, 255, 0.3)"};var d=e=>{const t=o("input.washoe-search-bar");return t.placeholder="Search for a word",r(t,i),t.addEventListener("keydown",n=>{9==n.keyCode&&n.preventDefault(),13==n.keyCode&&(e(n.target.value),t.remove()),(n.ctrlKey&&219==n.keyCode||27==n.keyCode)&&(n.preventDefault(),t.remove())}),t.addEventListener("blur",()=>setTimeout(()=>t.focus(),0)),setTimeout(()=>t.focus(),0),t};n(0);const s={position:"fixed",top:0,bottom:0,left:0,right:0,margin:"auto",maxWidth:"75%",maxHeight:"75%",backgroundColor:"#39383e",borderRadius:"2px",padding:"16px",overflow:"auto",zIndex:"2147483647",scrollbarWidth:"thin",scrollbarColor:"#0a84ff #4a4a4f",color:"white"},c={outline:"none",padding:"8px"},l={backgroundColor:"#4b4a4f"},u={backgroundColor:"unset"};var p=(e,t)=>{const n=o("section.washoe-paper");r(n,s);const a=o("h1",e[0].word),i=o("ol");return e.forEach(e=>{const a=o("li");r(a,c),a.addEventListener("focus",()=>r(a,l)),a.addEventListener("blur",()=>r(a,u));const d=o("strong",e.meaning);a.tabIndex="1",a.appendChild(d),a.addEventListener("mousedown",e=>e.preventDefault()),a.addEventListener("keydown",o=>{o.preventDefault(),74==o.keyCode&&o.target.nextSibling.focus(),75==o.keyCode&&o.target.previousSibling.focus(),o.ctrlKey&&219==o.keyCode&&n.remove(),27==o.keyCode&&n.remove(),13==o.keyCode&&t(e)});const s=o("ul");e.examples.forEach(e=>s.appendChild(o("li",e))),a.appendChild(s),i.appendChild(a)}),[a,i].forEach(e=>n.appendChild(e)),setTimeout(()=>i.querySelector("li").focus(),0),n};const f=(e="div",t="")=>{const n=document.createElement(e.split(".")[0]);return e.split(".")[1]&&(n.className=e.split(".").slice(1).join(" ")),n.textContent=t,n},h=(e,t)=>{browser.storage.sync.get().then(n=>{browser.storage.sync.set({[e]:{...n[e],time:Date.now(),stage:"next"==t?++n[e].stage:0}})}),browser.runtime.sendMessage({action:"Remove cards from all tabs"})};var m=({word:e,meaning:t,example:n})=>{const o=f("section.container"),r=f("style",".container{display:flex;flex-direction:column;font-family:sans-serif;background-color:#0c0c0d;color:#f9f9fa;position:fixed;bottom:0;left:0;width:100%;z-index:2147483647;animation-name:fade-in;animation-duration:3s}.visible{display:flex;justify-content:center;align-items:center;font-size:16px;min-height:48px}.hidden{display:flex;flex-direction:column;justify-content:space-around;align-items:center;height:0;overflow:hidden}.meaning,.example,.buttons{width:100%;max-width:40ch}.example{font-style:italic;}.buttons{display:flex;justify-content:space-around;}.buttons button{background-color:#2a2a2e;color:#fff;border:none;min-width:132px;height:32px}.buttons button:hover{background-color:#38383d}.show-hidden{animation-name:show-up;animation-duration:.7s;animation-fill-mode:forwards}@keyframes fade-in{from{opacity:0}to{opacity:1}}@keyframes show-up{from{height:0}to{height:200px}}"),a=f("div.visible"),i=f("span.word",e);a.appendChild(i);const d=f("div.hidden"),s=f("span.meaning",`:${t}`);if(d.appendChild(s),n){const e=f("span.example",`For Example: ${n}`);d.appendChild(e)}const c=f("div.buttons");return["Again","Next"].forEach(e=>c.appendChild(f("button."+e.toLowerCase(),e))),c.addEventListener("click",t=>h(e,t.target.className)),d.appendChild(c),[r,a,d].forEach(e=>o.appendChild(e)),a.addEventListener("click",()=>d.classList.add("show-hidden")),o};const x={backgroundColor:"#333",color:"white",position:"fixed",margin:"auto",top:"100px",right:0,left:0,width:"max-content",padding:"16px",margin:"auto"};var y=(e="Loading...")=>{const t=o("span.washoe-spinner",e);return r(t,x),t};const b=e=>e.querySelector(".def_text")?e.querySelector(".def_text").innerText:e.querySelector(".un_text")?e.querySelector(".un_text").innerText:e.querySelector(".both_text").innerText,g=e=>Array.from(e.querySelectorAll(".vi_content"),e=>e.innerText);var w=e=>Array.from(e.querySelectorAll(".sense"),t=>({word:e.querySelector("#ld_entries_v2_mainh").innerText,meaning:b(t),examples:g(t)}));document.addEventListener("keydown",e=>{e.ctrlKey&&191==e.keyCode&&(e.preventDefault(),a(".washoe-paper"),a(".washoe-search-bar"),document.body.appendChild(d(v)))}),browser.runtime.onMessage.addListener(e=>!((e="")=>Boolean(document.querySelector(".wsh-shadow-root"+e)))("-card")&&((e,t="")=>{const n=f("div.wsh-shadow-root"+t);n.attachShadow({mode:"closed"}).appendChild(e),document.body.appendChild(n)})(m(e.wordData),"-card"));const v=e=>{document.body.appendChild(y(`Waiting for "${e}"`)),(async e=>{const t=await fetch(e),n=await t.text();return await(new DOMParser).parseFromString(n,"text/html")})("http://www.learnersdictionary.com/definition/"+e).then(e=>w(e)).then(e=>{a(".washoe-spinner"),document.body.appendChild(p(e))}).catch(console.error)}}]);