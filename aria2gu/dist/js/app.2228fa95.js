(function(e){function t(t){for(var r,a,s=t[0],i=t[1],u=t[2],l=0,d=[];l<s.length;l++)a=s[l],Object.prototype.hasOwnProperty.call(c,a)&&c[a]&&d.push(c[a][0]),c[a]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);p&&p(t);while(d.length)d.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,a=1;a<n.length;a++){var s=n[a];0!==c[s]&&(r=!1)}r&&(o.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},a={app:0},c={app:0},o=[];function s(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-2d0b3289":"f77d5554","chunk-2d0d34b3":"294266ef","chunk-2d221c6d":"71ff9bf8","chunk-7cd2df40":"0d05383c","chunk-e6e685bc":"efa3c387"}[e]+".js"}function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n={"chunk-7cd2df40":1,"chunk-e6e685bc":1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-2d0b3289":"31d6cfe0","chunk-2d0d34b3":"31d6cfe0","chunk-2d221c6d":"31d6cfe0","chunk-7cd2df40":"bce4615a","chunk-e6e685bc":"7de6ec3f"}[e]+".css",c=i.p+r,o=document.getElementsByTagName("link"),s=0;s<o.length;s++){var u=o[s],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===r||l===c))return t()}var d=document.getElementsByTagName("style");for(s=0;s<d.length;s++){u=d[s],l=u.getAttribute("data-href");if(l===r||l===c)return t()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=t,p.onerror=function(t){var r=t&&t.target&&t.target.src||c,o=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=r,delete a[e],p.parentNode.removeChild(p),n(o)},p.href=c;var f=document.getElementsByTagName("head")[0];f.appendChild(p)})).then((function(){a[e]=0})));var r=c[e];if(0!==r)if(r)t.push(r[2]);else{var o=new Promise((function(t,n){r=c[e]=[t,n]}));t.push(r[2]=o);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.src=s(e);var d=new Error;u=function(t){l.onerror=l.onload=null,clearTimeout(p);var n=c[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",d.name="ChunkLoadError",d.type=r,d.request=a,n[1](d)}c[e]=void 0}};var p=setTimeout((function(){u({type:"timeout",target:l})}),12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(t)},i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/",i.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var d=0;d<u.length;d++)t(u[d]);var p=l;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},2395:function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("4de4"),n("d3b7"),n("b680");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("div",{staticClass:"main"},[n("div",{attrs:{id:"nav"}},[n("select",{directives:[{name:"model",rawName:"v-model",value:e.selectedServer,expression:"selectedServer"}],on:{change:[function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.selectedServer=t.target.multiple?n:n[0]},e.switchServer]}},e._l(e.servers,(function(t,r){return n("option",{key:t,domProps:{value:r}},[e._v(e._s(t.name||t.host+":"+t.port))])})),0),e._v(" "+e._s(e.connectionStatus)+" "),n("router-link",{attrs:{to:"/"}},[e._v("正在下载("+e._s(+e.globalStat.numWaiting+ +e.globalStat.numActive)+")")]),n("router-link",{attrs:{to:"/completed"}},[e._v("已完成("+e._s(e.globalStat.numStopped)+")")]),n("router-link",{attrs:{to:"/new"}},[e._v("新建下载")]),n("router-link",{attrs:{to:"/settings"}},[e._v("设置")]),n("routrr-link",{attrs:{to:"/servers"}},[e._v("服务器")])],1),n("router-view",{attrs:{aria2:e.aria2},on:{"servers-changed":function(t){e.servers=t}}})],1),n("div",{staticClass:"global-stat"},[e._v("全局上传速度:"+e._s(e.globalStat.uploadSpeed)+" 全局下载速度:"+e._s(e.globalStat.downloadSpeed))])])},c=[],o=n("1da1"),s=(n("96cf"),n("d4ec")),i=n("bee2"),u=(n("99af"),n("e9c4"),function(){function e(t){var n=this;Object(s["a"])(this,e),this.options=t,this.websocket=new WebSocket("ws://".concat(t.host,":").concat(t.port,"/jsonrpc")),this.connectPromise=new Promise((function(e,t){n.websocket.addEventListener("open",(function(){e()})),n.websocket.addEventListener("error",(function(e){t("WS_CONNECT_ERROR")}))})),this.lastId=1,this.callbacks={},this.websocket.addEventListener("message",(function(e){var t=JSON.parse(e.data),r=n.callbacks[t.id];delete n.callbacks[t.id],"function"==typeof r&&r(t)}))}return Object(i["a"])(e,[{key:"ready",value:function(){return this.connectPromise}},{key:"close",value:function(){var e=this;return this.websocket.close(),new Promise((function(t,n){e.websocket.addEventListener("close",(function(){t()}))}))}}]),e}());["addUri","addTorrent","getPeers","addMetalink","remove","pause","forcePause","pauseAll","forcePauseAll","unpause","unpauseAll","forceRemove","changePosition","tellStatus","getUris","getFiles","getServers","tellActive","tellWaiting","tellStopped","getOption","changeUri","changeOption","getGlobalOption","changeGlobalOption","purgeDownloadResult","removeDownloadResult","getVersion","getSessionInfo","shutdown","forceShutdown","getGlobalStat","saveSession"].forEach((function(e){u.prototype[e]=function(){for(var t=this,n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];return this.connectPromise.then((function(){return new Promise((function(n,a){var c=t.lastId++;t.callbacks[c]=function(e){e.error?a(e.error):n(e.result)},t.websocket.send(JSON.stringify({jsonrpc:"2.0",id:c,method:"aria2.".concat(e),params:["token:".concat(t.options.secret)].concat(r)}))}))}))}}));var l=u,d={data:function(){var e=JSON.parse(localStorage.getItem("aria2Servers"))||[];return{globalStat:{},severs:e,selectedServer:null,aria2:null}},methods:{switchServer:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return null===(n=e.aria2)||void 0===n||n.close(),e.globalStat={},e.connectionStatus="连接中...",r=new l(e.selectedServer),e.aria2=r,t.prev=5,t.next=8,r.ready();case 8:e.connectionStatus="已连接",t.next=14;break;case 11:t.prev=11,t.t0=t["catch"](5),e.connectionStatus="连接失败";case 14:case"end":return t.stop()}}),t,null,[[5,11]])})))()},startIntervalUpdate:function(){var e=this;this.intervalId=setInterval(Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.aria2.getGlobalStat();case 3:e.globalStat=t.sent,t.next=13;break;case 6:if(t.prev=6,t.t0=t["catch"](0),"WS_CONNECT_ERROR"!=t.t0){t.next=12;break}clearInterval(e.intervalId),t.next=13;break;case 12:throw t.t0;case 13:case"end":return t.stop()}}),t,null,[[0,6]])}))),1e3)}},created:function(){this.selectedServer=this.servers[0],this.switchServer()},mounted:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.aria2.getGlobalStat();case 3:e.globalStat=t.sent,e.startIntervalUpdate(),t.next=14;break;case 7:if(t.prev=7,t.t0=t["catch"](0),"WS_CONNECT_ERROR"!=t.t0){t.next=13;break}clearInterval(e.intervalId),t.next=14;break;case 13:throw t.t0;case 14:case"end":return t.stop()}}),t,null,[[0,7]])})))()},watch:{aria2:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.aria2.getGlobalStat();case 2:e.globalStat=t.sent,e.startIntervalUpdate();case 4:case"end":return t.stop()}}),t)})))()}},beforeDestroy:function(){clearInterval(this.intervalId)}},p=d,f=(n("7c55"),n("2877")),v=Object(f["a"])(p,a,c,!1,null,null,null),h=v.exports,b=(n("3ca3"),n("ddb0"),n("8c4f")),m=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"downloading"},[n("h2",[e._v("正在下载")]),n("div",[n("button",{on:{click:function(t){return e.execSelected("pause")}}},[e._v("暂停")]),n("button",{on:{click:function(t){return e.execSelected("unpause")}}},[e._v("开始")]),n("button",{on:{click:function(t){return e.execSelected("remove")}}},[e._v("删除")]),n("button",{on:{click:e.selectAll}},[e._v("全选")]),e._v(" 搜索："),n("input",{directives:[{name:"model",rawName:"v-model",value:e.searchText,expression:"searchText"}],attrs:{type:"text"},domProps:{value:e.searchText},on:{input:function(t){t.target.composing||(e.searchText=t.target.value)}}})]),n("ul",e._l(e.visibleTasks,(function(t){return n("li",{key:t.gid,class:{selected:e.selected.includes(t.gid)},on:{click:function(n){return e.toggleSelected(t)}}},[n("input",{attrs:{type:"checkbox"},domProps:{checked:e.selected.includes(t.gid)}}),n("span",[e._v(e._s(e.getFilename(t)))]),e._v(" | "),n("span",[e._v(e._s(e._f("fixed")(e.getPercent(t)))+"%")]),e._v(" | "),n("span",[e._v(e._s(e._f("fixed")(t.downloadSpeed/1024))+"k/s")]),e._v(" | "),n("span",[e._v(e._s(t.status))]),e._v(" | "),n("router-link",{attrs:{to:{name:"taskDetail",params:{gid:t.gid}}},nativeOn:{click:function(e){e.stopPropagation()}}},[e._v("详情")])],1)})),0),n("el-table",{staticStyle:{width:"100%"},attrs:{data:e.visibleTasks,"default-sort":{prop:"date",order:"descending"}}},[n("el-table-column",{attrs:{prop:"gid",label:"名称",sortable:"",width:"180"}}),n("el-table-column",{attrs:{prop:"completedLength",label:"进度",sortable:"",width:"180"}}),n("el-table-column",{attrs:{formater:e.getSpeed,label:"速度",sortable:"",width:"180"}}),n("el-table-column",{attrs:{prop:"status",label:"状态",sortable:"",width:"180"}})],1)],1)},g=[],k=n("b85c"),w=n("2909"),S=(n("caad"),n("2532"),n("d81d"),n("a434"),n("33d1"),n("ea98"),n("ac1f"),n("1276"),{name:"Downloading",props:["aria2"],data:function(){return{tasks:[],selected:[],searchText:""}},computed:{visibleTasks:function(){var e=this;return""==this.searchText?this.tasks:this.tasks.filter((function(t){t.files[0].path.toLowerCase().includes(e.searchText.toLowerCase())}))}},watch:{aria2:function(){this.tasks=[]}},updated:function(){this.updateList()},mounted:function(){var e=this;this.updateList(),this.intervalId=setInterval(Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.updateList();case 3:t.next=12;break;case 5:if(t.prev=5,t.t0=t["catch"](0),"WS_CONNECT_ERROR"!=t.t0){t.next=11;break}clearInterval(e.intervalId),t.next=12;break;case 11:throw t.t0;case 12:case"end":return t.stop()}}),t,null,[[0,5]])}))),1e3)},methods:{getSpeed:function(e){return(e.completedLength/e.totalLength*100).toFixed(2)+"%"},updateList:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.t0=[],t.t1=w["a"],t.next=5,e.aria2.tellActive();case 5:return t.t2=t.sent,t.t3=(0,t.t1)(t.t2),t.t4=w["a"],t.next=10,e.aria2.tellWaiting(0,100);case 10:t.t5=t.sent,t.t6=(0,t.t4)(t.t5),e.tasks=t.t0.concat.call(t.t0,t.t3,t.t6),t.next=19;break;case 15:throw t.prev=15,t.t7=t["catch"](0),e.tasks=[],t.t7;case 19:case"end":return t.stop()}}),t,null,[[0,15]])})))()},execSelected:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function n(){var r,a,c,o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if("remove"!=e){n.next=9;break}return n.prev=1,n.next=4,t.$confirm("确定删除吗？");case 4:n.next=9;break;case 6:return n.prev=6,n.t0=n["catch"](1),n.abrupt("return");case 9:r=t.tasks.filter((function(e){return t.selected.includes(e.gid)})),a=Object(k["a"])(r),n.prev=11,a.s();case 13:if((c=a.n()).done){n.next=30;break}if(o=c.value,n.prev=15,"paused"!=task.status||"pause"!=e){n.next=18;break}return n.abrupt("continue",28);case 18:if("active"!=task.status||"unpause"!=e){n.next=20;break}return n.abrupt("continue",28);case 20:return n.next=22,t.aria2[e](o);case 22:n.next=28;break;case 24:n.prev=24,n.t1=n["catch"](15),t.$alert(n.t1.message),console.log(n.t1);case 28:n.next=13;break;case 30:n.next=35;break;case 32:n.prev=32,n.t2=n["catch"](11),a.e(n.t2);case 35:return n.prev=35,a.f(),n.finish(35);case 38:t.updateList();case 39:case"end":return n.stop()}}),n,null,[[1,6],[11,32,35,38],[15,24]])})))()},selectAll:function(){this.selected.length==this.tasks.length?this.selected=[]:this.selected=this.tasks.map((function(e){return e.gid}))},toggleSelected:function(e){var t=this.selected.indexOf(e.gid);-1==t?this.selected.push(e.gid,!0):this.selected.splice(t,1)},getFilename:function(e){var t,n,r,a,c;return null!==(t=e.files)&&void 0!==t&&t[0].path?e.files[0].path.split("/").at(-1):null!==(n=null===(r=e.files)||void 0===r||null===(a=r.uris)||void 0===a||null===(c=a[0])||void 0===c?void 0:c.uri.split("/").at(-1))&&void 0!==n?n:"未知"},getPercent:function(e){return 0==e.completedLength?0:e.completedLength/e.totalLength*100}},beforeDestroy:function(){clearInterval(this.intervalId)},components:{}}),x=S,_=(n("cf2a"),Object(f["a"])(x,m,g,!1,null,"77f1781e",null)),y=_.exports;r["default"].use(b["a"]);var O=[{path:"/",name:"Downloading",component:y},{path:"/completed",name:"Completed",component:function(){return n.e("chunk-2d221c6d").then(n.bind(null,"cc90"))}},{path:"/new",name:"New",component:function(){return n.e("chunk-7cd2df40").then(n.bind(null,"7859"))}},{path:"/task/:gid",name:"taskDetail",component:function(){return n.e("chunk-e6e685bc").then(n.bind(null,"9065"))}},{path:"/settings",name:"Settings",component:function(){return n.e("chunk-2d0b3289").then(n.bind(null,"26d3"))}},{path:"/servers",name:"Servers",component:function(){return n.e("chunk-2d0d34b3").then(n.bind(null,"5bc3"))}}],R=new b["a"]({routes:O,mode:"history"}),P=R,j=n("2f62");r["default"].use(j["a"]);var E=new j["a"].Store({state:{},mutations:{},actions:{},modules:{}}),I=n("5c96"),L=n.n(I);n("0fae");r["default"].use(L.a),r["default"].filter("fixed",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;return e.toFixed(t)})),new r["default"]({router:P,store:E,render:function(e){return e(h)}}).$mount("#app")},"7c55":function(e,t,n){"use strict";n("2395")},cf2a:function(e,t,n){"use strict";n("e246")},e246:function(e,t,n){}});
//# sourceMappingURL=app.2228fa95.js.map