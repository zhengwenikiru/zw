(function(e){function t(t){for(var r,a,s=t[0],i=t[1],l=t[2],u=0,d=[];u<s.length;u++)a=s[u],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&d.push(o[a][0]),o[a]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);p&&p(t);while(d.length)d.shift()();return c.push.apply(c,l||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],r=!0,a=1;a<n.length;a++){var s=n[a];0!==o[s]&&(r=!1)}r&&(c.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},a={app:0},o={app:0},c=[];function s(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-2be9a320":"db4c6556","chunk-2d0b3289":"59ae96e9","chunk-2d221c6d":"42d38956","chunk-c7e65b6a":"65ae5746"}[e]+".js"}function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n={"chunk-2be9a320":1,"chunk-c7e65b6a":1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-2be9a320":"779c65e5","chunk-2d0b3289":"31d6cfe0","chunk-2d221c6d":"31d6cfe0","chunk-c7e65b6a":"2a9423f5"}[e]+".css",o=i.p+r,c=document.getElementsByTagName("link"),s=0;s<c.length;s++){var l=c[s],u=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(u===r||u===o))return t()}var d=document.getElementsByTagName("style");for(s=0;s<d.length;s++){l=d[s],u=l.getAttribute("data-href");if(u===r||u===o)return t()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=t,p.onerror=function(t){var r=t&&t.target&&t.target.src||o,c=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=r,delete a[e],p.parentNode.removeChild(p),n(c)},p.href=o;var f=document.getElementsByTagName("head")[0];f.appendChild(p)})).then((function(){a[e]=0})));var r=o[e];if(0!==r)if(r)t.push(r[2]);else{var c=new Promise((function(t,n){r=o[e]=[t,n]}));t.push(r[2]=c);var l,u=document.createElement("script");u.charset="utf-8",u.timeout=120,i.nc&&u.setAttribute("nonce",i.nc),u.src=s(e);var d=new Error;l=function(t){u.onerror=u.onload=null,clearTimeout(p);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",d.name="ChunkLoadError",d.type=r,d.request=a,n[1](d)}o[e]=void 0}};var p=setTimeout((function(){l({type:"timeout",target:u})}),12e4);u.onerror=u.onload=l,document.head.appendChild(u)}return Promise.all(t)},i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/",i.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=t,l=l.slice();for(var d=0;d<l.length;d++)t(l[d]);var p=u;c.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},2395:function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("4de4"),n("d3b7"),n("b680");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("div",{staticClass:"main"},[n("div",{attrs:{id:"nav"}},[n("router-link",{attrs:{to:"/"}},[e._v("正在下载("+e._s(+e.globalStat.numWaiting+ +e.globalStat.numActive)+")")]),n("router-link",{attrs:{to:"/completed"}},[e._v("已完成("+e._s(e.globalStat.numStopped)+")")]),n("router-link",{attrs:{to:"/new"}},[e._v("新建下载")]),n("router-link",{attrs:{to:"/settings"}},[e._v("设置")])],1),n("router-view")],1),n("div",{staticClass:"global-stat"},[e._v("全局上传速度:"+e._s(e.globalStat.uploadSpeed)+" 全局下载速度:"+e._s(e.globalStat.downloadSpeed))])])},o=[],c=n("1da1"),s=(n("96cf"),{data:function(){return{globalStat:{}}},mounted:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,window.aria2.getGlobalStat();case 2:e.globalStat=t.sent,e.intervalId=setInterval(Object(c["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,window.aria2.getGlobalStat();case 2:e.globalStat=t.sent;case 3:case"end":return t.stop()}}),t)}))),1e3);case 4:case"end":return t.stop()}}),t)})))()},beforeDestroy:function(){clearInterval(this.intervalId)}}),i=s,l=(n("7c55"),n("2877")),u=Object(l["a"])(i,a,o,!1,null,null,null),d=u.exports,p=(n("3ca3"),n("ddb0"),n("8c4f")),f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"downloading"},[n("h2",[e._v("正在下载")]),n("div",[n("button",{on:{click:function(t){return e.execSelected("pause")}}},[e._v("暂停")]),n("button",{on:{click:function(t){return e.execSelected("unpause")}}},[e._v("开始")]),n("button",{on:{click:function(t){return e.execSelected("remove")}}},[e._v("删除")]),n("button",{on:{click:e.selectAll}},[e._v("全选")]),e._v(" 搜索："),n("input",{directives:[{name:"model",rawName:"v-model",value:e.searchText,expression:"searchText"}],attrs:{type:"text"},domProps:{value:e.searchText},on:{input:function(t){t.target.composing||(e.searchText=t.target.value)}}})]),n("ul",e._l(e.visibleTasks,(function(t){return n("li",{key:t.gid,class:{selected:e.selected.includes(t.gid)},on:{click:function(n){return e.toggleSelected(t)}}},[n("input",{attrs:{type:"checkbox"},domProps:{checked:e.selected.includes(t.gid)}}),n("span",[e._v(e._s(e.getFilename(t)))]),e._v(" | "),n("span",[e._v(e._s(e._f("fixed")(e.getPercent(t)))+"%")]),e._v(" | "),n("span",[e._v(e._s(e._f("fixed")(t.downloadSpeed/1024))+"k/s")]),e._v(" | "),n("span",[e._v(e._s(t.status))]),e._v(" | "),n("router-link",{attrs:{to:{name:"taskDetail",params:{gid:t.gid}}},nativeOn:{click:function(e){e.stopPropagation()}}},[e._v("详情")])],1)})),0),n("el-table",{staticStyle:{width:"100%"},attrs:{data:e.visibleTasks,"default-sort":{prop:"date",order:"descending"}}},[n("el-table-column",{attrs:{prop:"gid",label:"名称",sortable:"",width:"180"}}),n("el-table-column",{attrs:{prop:"completedLength",label:"进度",sortable:"",width:"180"}}),n("el-table-column",{attrs:{formater:e.getSpeed,label:"速度",sortable:"",width:"180"}}),n("el-table-column",{attrs:{prop:"status",label:"状态",sortable:"",width:"180"}})],1)],1)},h=[],v=n("b85c"),g=n("2909"),m=(n("caad"),n("2532"),n("99af"),n("d81d"),n("a434"),n("33d1"),n("ea98"),n("ac1f"),n("1276"),{name:"Downloading",data:function(){return{tasks:[],selected:[],searchText:""}},computed:{visibleTasks:function(){var e=this;return""==this.searchText?this.tasks:this.tasks.filter((function(t){t.files[0].path.toLowerCase().includes(e.searchText.toLowerCase())}))}},mounted:function(){var e=this;this.updateList(),this.intervalId=setInterval(Object(c["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.updateList();case 1:case"end":return t.stop()}}),t)}))),1e3)},methods:{getSpeed:function(e){return(e.completedLength/e.totalLength*100).toFixed(2)+"%"},updateList:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.t0=[],t.t1=g["a"],t.next=4,window.aria2.tellActive();case 4:return t.t2=t.sent,t.t3=(0,t.t1)(t.t2),t.t4=g["a"],t.next=9,window.aria2.tellWaiting(0,100);case 9:t.t5=t.sent,t.t6=(0,t.t4)(t.t5),e.tasks=t.t0.concat.call(t.t0,t.t3,t.t6);case 12:case"end":return t.stop()}}),t)})))()},execSelected:function(e){var t=this;return Object(c["a"])(regeneratorRuntime.mark((function n(){var r,a,o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if("remove"!=e){n.next=9;break}return n.prev=1,n.next=4,t.$confirm("确定删除吗？");case 4:n.next=9;break;case 6:return n.prev=6,n.t0=n["catch"](1),n.abrupt("return");case 9:r=Object(v["a"])(t.selected),n.prev=10,r.s();case 12:if((a=r.n()).done){n.next=25;break}return o=a.value,n.prev=14,n.next=17,window.aria2[e](o);case 17:n.next=23;break;case 19:n.prev=19,n.t1=n["catch"](14),t.$alert(n.t1.message),console.log(n.t1);case 23:n.next=12;break;case 25:n.next=30;break;case 27:n.prev=27,n.t2=n["catch"](10),r.e(n.t2);case 30:return n.prev=30,r.f(),n.finish(30);case 33:t.updateList();case 34:case"end":return n.stop()}}),n,null,[[1,6],[10,27,30,33],[14,19]])})))()},selectAll:function(){this.selected.length==this.tasks.length?this.selected=[]:this.selected=this.tasks.map((function(e){return e.gid}))},toggleSelected:function(e){var t=this.selected.indexOf(e.gid);-1==t?this.selected.push(e.gid,!0):this.selected.splice(t,1)},getFilename:function(e){var t,n,r,a,o;return null!==(t=e.files)&&void 0!==t&&t[0].path?e.files[0].path.split("/").at(-1):null!==(n=null===(r=e.files)||void 0===r||null===(a=r.uris)||void 0===a||null===(o=a[0])||void 0===o?void 0:o.uri.split("/").at(-1))&&void 0!==n?n:"未知"},getPercent:function(e){return 0==e.completedLength?0:e.completedLength/e.totalLength*100}},beforeDestroy:function(){clearInterval(this.intervalId)},components:{}}),b=m,w=(n("95ac"),Object(l["a"])(b,f,h,!1,null,"bb0465aa",null)),k=w.exports;r["default"].use(p["a"]);var x=[{path:"/",name:"Downloading",component:k},{path:"/completed",name:"Completed",component:function(){return n.e("chunk-2d221c6d").then(n.bind(null,"cc90"))}},{path:"/new",name:"New",component:function(){return n.e("chunk-2be9a320").then(n.bind(null,"7859"))}},{path:"/task/:gid",name:"taskDetail",component:function(){return n.e("chunk-c7e65b6a").then(n.bind(null,"9065"))}},{path:"/settings",name:"Settings",component:function(){return n.e("chunk-2d0b3289").then(n.bind(null,"26d3"))}}],S=new p["a"]({routes:x,mode:"history"}),_=S,y=n("2f62");r["default"].use(y["a"]);var O=new y["a"].Store({state:{},mutations:{},actions:{},modules:{}}),P=n("d4ec"),j=(n("e9c4"),function e(t){var n=this;Object(P["a"])(this,e),this.options=t,this.websocket=new WebSocket("ws://".concat(t.host,":").concat(t.port,"/jsonrpc")),this.connectPromise=new Promise((function(e){n.websocket.addEventListener("open",(function(){e()}))})),this.lastId=1,this.callbacks={},this.websocket.addEventListener("message",(function(e){var t=JSON.parse(e.data),r=n.callbacks[t.id];delete n.callbacks[t.id],"function"==typeof r&&r(t)}))});["addUri","addTorrent","getPeers","addMetalink","remove","pause","forcePause","pauseAll","forcePauseAll","unpause","unpauseAll","forceRemove","changePosition","tellStatus","getUris","getFiles","getServers","tellActive","tellWaiting","tellStopped","getOption","changeUri","changeOption","getGlobalOption","changeGlobalOption","purgeDownloadResult","removeDownloadResult","getVersion","getSessionInfo","shutdown","forceShutdown","getGlobalStat","saveSession"].forEach((function(e){j.prototype[e]=function(){for(var t=this,n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];return this.connectPromise.then((function(){return new Promise((function(n,a){var o=t.lastId++;t.callbacks[o]=function(e){e.error?a(e.error):n(e.result)},t.websocket.send(JSON.stringify({jsonrpc:"2.0",id:o,method:"aria2.".concat(e),params:["token:".concat(t.options.secret)].concat(r)}))}))}))}}));var L=j,T=n("5c96"),A=n.n(T);n("0fae");r["default"].use(A.a);var E=new L({host:"localhost",port:6800,secret:"88888888"});window.aria2=E,r["default"].filter("fixed",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;return e.toFixed(t)})),new r["default"]({router:_,store:O,render:function(e){return e(d)}}).$mount("#app")},"7c55":function(e,t,n){"use strict";n("2395")},"8a96":function(e,t,n){},"95ac":function(e,t,n){"use strict";n("8a96")}});
//# sourceMappingURL=app.0a9b06d9.js.map