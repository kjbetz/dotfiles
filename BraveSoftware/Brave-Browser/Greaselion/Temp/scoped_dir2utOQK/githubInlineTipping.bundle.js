(()=>{"use strict";const e="mnojpmjdmbbfmejpflffifhffcmidifd";let t=null;const n=()=>t;let o=!1;const s=()=>"complete"===document.readyState&&"visible"===document.visibilityState,i=(RegExp(/&(?:amp|lt|gt|quot|#(0+)?39);/g.source),"github"),r=async e=>{if(!e)throw new Error("Invalid parameters");const t=(e=>e?`https://api.github.com/users/${e}`:"")(e);if(!t)throw new Error("Invalid profile api url");const n=await fetch(t);if(!n.ok){const e=((e,t)=>`Profile API request failed: ${t.statusText} (${t.status})`)(0,n);throw new Error(e)}const o=await n.json();return{user:{id:o.id,screenName:o.login,fullName:o.name||o.login,favIconUrl:o.avatar_url},post:{id:"",timestamp:"",text:""}}},l="action-brave-tip";let a=null;const c=(e,t)=>{const o=document.createElement("div");o.className="GitHubTip-action js-tooltip "+l,o.style.display="inline-block",o.style.minWidth="40px";const s=chrome.i18n.getMessage("githubTipsHoverText");s&&(o.className+=" tooltipped tooltipped-sw",o.setAttribute("aria-label",s));const r=document.createElement("button");r.className="GitHubTip-actionButton u-textUserColorHover js-actionButton",r.style.background="transparent",r.style.border="0",r.style.color="#657786",r.style.cursor="pointer",r.style.display="inline-block",r.style.fontSize="16px",r.style.lineHeight="1",r.style.outline="0",r.style.padding="0 2px",r.style.position="relative",r.type="button",r.onclick=function(o){return o.stopPropagation(),t(e).then((e=>{e&&(e=>{if(!e)return;const t=(o=e.user.screenName)?`https://github.com/${o}/`:"";var o;const s=((e,t)=>`${e}#channel:${t}`)(i,e.user.id),r=e.user.fullName,l=e.user.screenName,a=n();a&&a.postMessage({type:"TipUser",mediaType:i,data:{url:t,publisherKey:s,publisherName:r,publisherScreenName:l,favIconUrl:e.user.favIconUrl,postId:e.post.id,postTimestamp:e.post.timestamp,postText:e.post.text}})})(e)}))};const a=document.createElement("div");a.className="IconContainer js-tooltip",a.style.display="inline-block",a.style.lineHeight="0",a.style.position="relative",a.style.verticalAlign="middle",r.appendChild(a);const c=document.createElement("span");c.className="Icon Icon--medium",c.style.background="transparent",c.style.content=`url("data:image/svg+xml,${encodeURIComponent('<svg fill="inherit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 16"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.821 11.1L8.075 6.732v-2.38l4.917 8.195-2.17-1.447zm-6.03.965h5.397l1.752 1.168H2.747l2.043-1.168zm2.13-5.333L4.187 11.08l-1.983 1.133 4.717-7.861v2.38zm.577 1.251l1.841 2.928H5.657l1.841-2.928zm7.42 5.53L7.993 1.97c-.018-.03-.043-.054-.066-.08a.568.568 0 00-.429-.2.57.57 0 00-.43.2c-.022.026-.047.05-.064.08L.079 13.513a.59.59 0 00-.061.143c-.002.004-.002.007-.002.01a.571.571 0 00-.008.237.56.56 0 00.064.193c.01.017.023.029.034.044.02.026.037.055.06.077.021.022.047.038.071.057.017.011.031.025.048.035.027.016.056.025.085.036.018.007.035.016.054.022a.597.597 0 00.132.017c.006 0 .012.003.017.003h13.85a.576.576 0 00.495-.874z" fill="#6A7684"/></svg>')}")`,c.style.display="inline-block",c.style.fontSize="18px",c.style.fontStyle="normal",c.style.height="16px",c.style.marginTop="3px",c.style.position="relative",c.style.verticalAlign="baseline",c.style.width="16px",a.appendChild(c);const d=document.createElement("span");d.className="GitHubTip-actionCount",d.style.color="#657786",d.style.display="inline-block",d.style.fontSize="12px",d.style.fontWeight="bold",d.style.lineHeight="1",d.style.marginLeft="1px",d.style.position="relative",d.style.verticalAlign="text-bottom",r.appendChild(d);const m=document.createElement("span");m.className="GitHubTip-actionCountForPresentation";const p=chrome.i18n.getMessage("githubTipsIconLabel");p&&(m.textContent=p),d.appendChild(m);const h=o.attachShadow({mode:"open"});h.appendChild(r);const u=document.createElement("style");return u.appendChild(document.createTextNode(".GitHubTip-actionButton :hover { color: #6781db }")),h.appendChild(u),o},d=async e=>{let t=e.closest(".timeline-comment-header");if(t=t||e.closest(".review-comment"),!t)throw new Error("Failed to parse DOM");const n=t.getElementsByClassName("author");if(!n||0===n.length)throw new Error("Failed to parse DOM");const o=n[0].textContent;if(!o)throw new Error("Missing screen name");return r(o)},m=e=>{if(!e)return;const t=c(e,d);if(!t||!t.shadowRoot)return;t.style.marginRight="2px";const n=t.shadowRoot.querySelector(".IconContainer");n&&(n.style.paddingBottom="5px");const o=t.shadowRoot.querySelector(".GitHubTip-actionCount");o&&(o.style.paddingBottom="2px");const s=e.childNodes;if(!s||s.length<2)return;const i=s[s.length-2];e.insertBefore(t,i)},p=async e=>{if(!e)throw new Error("Invalid arguments");const t=e.getElementsByClassName("avatar");if(!t||0===t.length)throw new Error("Failed to parse DOM");const n=t[0];if(!n)throw new Error("Failed to parse DOM");const o=n.children;if(!o||0===o.length)throw new Error("Failed to parse DOM");const s=o[0].alt.slice(1);if(!s)throw new Error("Missing screen name");return r(s)},h=e=>{if(!e)return;const t=c(e,p);t&&(t.style.marginTop="4px",t.style.marginLeft="9px",e.appendChild(t))},u=async e=>{if(!e)throw new Error("Invalid arguments");const t=e.closest(".d-block");if(!t)throw new Error("Failed to parse DOM");const n=t.getElementsByTagName("A");if(!n||0===n.length)throw new Error("Failed to parse DOM");const o=n[0];if(!o.href)throw new Error("Failed to parse DOM");const s=o.href.split("/");if(s.length<4)throw new Error("Failed to parse DOM");const i=s[3];if(!i)throw new Error("Missing screen name");return r(i)},g=e=>{if(!e)return;if(!(e=>{if(!e)return!1;const t=new URLSearchParams(e);if(!t||!t.has("tab"))return!1;const n=t.get("tab");return!!n&&!!["stars"].includes(n)})(window.location.search))return;const t=e.getElementsByClassName("d-inline-block");if(!t||0===t.length)return;const n=c(e,u);n.classList.add("d-inline-block"),n.style.minWidth="60px",e.insertBefore(n,t[0])},f=async e=>{const t=document.getElementsByClassName("gisthead");if(!t||0===t.length)throw new Error("Failed to parse DOM");const n=t[0].getElementsByClassName("author");if(!n||0===n.length)throw new Error("Failed to parse DOM");const o=n[0].getElementsByTagName("A");if(!o||0===o.length)throw new Error("Failed to parse DOM");const s=o[0].textContent;if(!s)throw new Error("Missing screen name");return r(s)},y=e=>{if(!e)return;const t=window.location.host.split(".");if(!t||t.length<1)return;if("gist"!==t[0]||window.location.pathname.slice(1).split("/").length<2)return;const n=c(e,f);e.appendChild(n)},w=async e=>{if(!e)throw new Error("Invalid arguments");const t=e.closest(".table-list-cell");if(!t)throw new Error("Failed to parse DOM");const n=t.getElementsByTagName("A");if(!n||0===n.length)throw new Error("Failed to parse DOM");const o=n[0];if(!o.href)throw new Error("Failed to parse DOM");const s=o.href.replace("https://github.com","");if(!s)throw new Error("Failed to parse DOM");const i=s.split("/").filter((e=>e));if(i.length<1)throw new Error("Failed to parse DOM");let l="";if(l="orgs"===i[0]?i[i.length-1]:i[0],!l)throw new Error("Missing screen name");return r(l)},b=e=>{if(!e||!e.children||e.children.length<2)return;const t=window.location.pathname,n=e.children[1];if(!n||!t.startsWith("/orgs/"))return;const o=c(n,w);o.style.paddingLeft="5px",t.split("/").includes("teams")?n.appendChild(o):(n.style.width="250px",n.children.length>0&&n.insertBefore(o,n.children[1]))},E=(e,t)=>{const n=document.getElementsByClassName(e);if(n)for(let e=0;e<n.length;++e){const o=n[e];o&&(0===o.getElementsByClassName(l).length&&t(o))}},v=()=>{clearTimeout(a),E("timeline-comment-actions",m),E("js-commits-list-item",h),E("float-right",g),E("pagehead-actions",y),E("member-list-item",b),a=setTimeout(v,3e3)},x=(e,t)=>{for(const{removedNodes:t}of e)for(const e of t){if(e.nodeType!==Node.ELEMENT_NODE)continue;const t=e;if(t.classList.contains("timeline-comment-header"))return void v();if(t.hasChildNodes()){const e=t.getElementsByClassName("timeline-comment-header");if(e&&e.length>0)return void v()}}},N=document.getElementById("discussion_bucket");N&&new MutationObserver(x).observe(N,{childList:!0,subtree:!0});let M="";const C=e=>{e&&(e.url||"complete"===e.status)&&location.href!==M&&(M=location.href,v())};var T;chrome.extension.inIncognitoContext||(T=e=>{e?(s()?v():document.addEventListener("readystatechange",(function(){s()&&v()})),document.addEventListener("visibilitychange",(function(){"visible"===document.visibilityState&&v()})),((e,t)=>{if(!e||o)return;o=!0;const s=n();s&&(s.postMessage({type:"RegisterOnUpdatedTab",mediaType:e}),s.onMessage.addListener((function(e){e.data&&"OnUpdatedTab"===e.type&&t(e.data.changeInfo)})))})(i,C)):console.error("Failed to initialize communications port")},t?T(!0):(chrome.runtime.sendMessage(e,{type:"SupportsGreaselion"},(function(n){!chrome.runtime.lastError&&n&&n.supported&&(t=chrome.runtime.connect(e,{name:"Greaselion"}),T(!0))})),setTimeout((()=>{t||(t=chrome.runtime.connect("jidkidbbcafjabdphckchenhfomhnfma",{name:"Greaselion"}),T(!0))}),100)),console.info("Greaselion script loaded: githubInlineTipping.ts"))})();