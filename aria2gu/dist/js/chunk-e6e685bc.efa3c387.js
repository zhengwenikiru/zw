(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e6e685bc"],{"0ccb":function(t,e,n){var a=n("e330"),r=n("50c4"),i=n("577e"),s=n("1148"),u=n("1d80"),c=a(s),d=a("".slice),o=Math.ceil,l=function(t){return function(e,n,a){var s,l,f=i(u(e)),p=r(n),v=f.length,b=void 0===a?" ":i(a);return p<=v||""==b?f:(s=p-v,l=c(b,o(s/b.length)),l.length>s&&(l=d(l,0,s)),t?f+l:l+f)}};t.exports={start:l(!1),end:l(!0)}},"25f0":function(t,e,n){"use strict";var a=n("e330"),r=n("5e77").PROPER,i=n("6eeb"),s=n("825a"),u=n("3a9b"),c=n("577e"),d=n("d039"),o=n("ad6d"),l="toString",f=RegExp.prototype,p=f[l],v=a(o),b=d((function(){return"/a/b"!=p.call({source:"a",flags:"b"})})),g=r&&p.name!=l;(b||g)&&i(RegExp.prototype,l,(function(){var t=s(this),e=c(t.source),n=t.flags,a=c(void 0===n&&u(f,t)&&!("flags"in f)?v(t):n);return"/"+e+"/"+a}),{unsafe:!0})},"4d90":function(t,e,n){"use strict";var a=n("23e7"),r=n("0ccb").start,i=n("9a0c");a({target:"String",proto:!0,forced:i},{padStart:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}})},9065:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.task?n("dl",[n("dt",[t._v("任务名称")]),n("dd",[t._v(t._s(t.getFilename(t.task)))]),n("dt",[t._v("任务大小")]),n("dd"),n("dt",[t._v("进度")]),n("dd"),n("dt",[t._v("下载地址")]),n("dd"),n("dt",[t._v("文件列表")]),n("dd",[n("ul",t._l(t.task.files,(function(t){return n("li",{key:t.path,attrs:{title:t.path}})})),0)]),n("dt",[t._v("目标路径")]),n("dd"),n("dt",[t._v("区块信息")]),n("dd",t._l(Number(t.task.numPieces),(function(e){return n("span",{key:e,staticClass:"piece",class:{complete:"1"==t.bitfield[e-1]}})})),0)]):t._e()])},r=[],i=n("1da1"),s=(n("96cf"),n("33d1"),n("ea98"),n("ac1f"),n("1276"),n("4d90"),n("d3b7"),n("25f0"),n("d81d"),{name:"TaskDetail",props:["aria2"],data:function(){return{task:null,bitfield:[]}},methods:{getFilename:function(t){var e,n,a,r,i;return null!==(e=t.files)&&void 0!==e&&e[0].path?t.files[0].path.split("/").at(-1):null!==(n=null===(a=t.files)||void 0===a||null===(r=a.uris)||void 0===r||null===(i=r[0])||void 0===i?void 0:i.uri.split("/").at(-1))&&void 0!==n?n:"未知"}},mounted:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.aria2.tellStatus(t.$route.params.gid);case 2:t.task=e.sent,t.bitfield=t.task.bitfield.split("").map((function(t){return parseInt(t,16)})).toString(2).padStart(4,"0");case 4:case"end":return e.stop()}}),e)})))()}}),u=s,c=(n("accd"),n("2877")),d=Object(c["a"])(u,a,r,!1,null,"3b355afb",null);e["default"]=d.exports},"9a0c":function(t,e,n){var a=n("342f");t.exports=/Version\/10(?:\.\d+){1,2}(?: [\w./]+)?(?: Mobile\/\w+)? Safari\//.test(a)},accd:function(t,e,n){"use strict";n("f92b")},f92b:function(t,e,n){}}]);
//# sourceMappingURL=chunk-e6e685bc.efa3c387.js.map