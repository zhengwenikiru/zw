(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c7e65b6a"],{"0ccb":function(t,e,n){var a=n("e330"),r=n("50c4"),i=n("577e"),s=n("1148"),u=n("1d80"),d=a(s),c=a("".slice),o=Math.ceil,l=function(t){return function(e,n,a){var s,l,f=i(u(e)),p=r(n),v=f.length,b=void 0===a?" ":i(a);return p<=v||""==b?f:(s=p-v,l=d(b,o(s/b.length)),l.length>s&&(l=c(l,0,s)),t?f+l:l+f)}};t.exports={start:l(!1),end:l(!0)}},"25f0":function(t,e,n){"use strict";var a=n("e330"),r=n("5e77").PROPER,i=n("6eeb"),s=n("825a"),u=n("3a9b"),d=n("577e"),c=n("d039"),o=n("ad6d"),l="toString",f=RegExp.prototype,p=f[l],v=a(o),b=c((function(){return"/a/b"!=p.call({source:"a",flags:"b"})})),g=r&&p.name!=l;(b||g)&&i(RegExp.prototype,l,(function(){var t=s(this),e=d(t.source),n=t.flags,a=d(void 0===n&&u(f,t)&&!("flags"in f)?v(t):n);return"/"+e+"/"+a}),{unsafe:!0})},"4d90":function(t,e,n){"use strict";var a=n("23e7"),r=n("0ccb").start,i=n("9a0c");a({target:"String",proto:!0,forced:i},{padStart:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}})},6709:function(t,e,n){"use strict";n("ff1d")},9065:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.task?n("dl",[n("dt",[t._v("任务名称")]),n("dd",[t._v(t._s(t.getFilename(t.task)))]),n("dt",[t._v("任务大小")]),n("dd"),n("dt",[t._v("进度")]),n("dd"),n("dt",[t._v("下载地址")]),n("dd"),n("dt",[t._v("文件列表")]),n("dd",[n("ul",t._l(t.task.files,(function(t){return n("li",{key:t.path,attrs:{title:t.path}})})),0)]),n("dt",[t._v("目标路径")]),n("dd"),n("dt",[t._v("区块信息")]),n("dd",t._l(Number(t.task.numPieces),(function(e){return n("span",{key:e,staticClass:"piece",class:{complete:"1"==t.bitfield[e-1]}})})),0)]):t._e()])},r=[],i=n("1da1"),s=(n("96cf"),n("33d1"),n("ea98"),n("ac1f"),n("1276"),n("4d90"),n("d3b7"),n("25f0"),n("d81d"),{data:function(){return{task:null,bitfield:[]}},methods:{getFilename:function(t){var e,n,a,r,i;return null!==(e=t.files)&&void 0!==e&&e[0].path?t.files[0].path.split("/").at(-1):null!==(n=null===(a=t.files)||void 0===a||null===(r=a.uris)||void 0===r||null===(i=r[0])||void 0===i?void 0:i.uri.split("/").at(-1))&&void 0!==n?n:"未知"}},mounted:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,window.aria2.tellStatus(t.$route.params.gid);case 2:t.task=e.sent,t.bitfield=t.task.bitfield.split("").map((function(t){return parseInt(t,16)})).toString(2).padStart(4,"0");case 4:case"end":return e.stop()}}),e)})))()}}),u=s,d=(n("6709"),n("2877")),c=Object(d["a"])(u,a,r,!1,null,"a39ae58e",null);e["default"]=c.exports},"9a0c":function(t,e,n){var a=n("342f");t.exports=/Version\/10(?:\.\d+){1,2}(?: [\w./]+)?(?: Mobile\/\w+)? Safari\//.test(a)},ff1d:function(t,e,n){}}]);
//# sourceMappingURL=chunk-c7e65b6a.65ae5746.js.map