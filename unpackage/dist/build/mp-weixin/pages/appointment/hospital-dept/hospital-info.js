(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/appointment/hospital-dept/hospital-info"],{"1e3e":function(n,t,e){"use strict";e.r(t);var a=e("8458"),o=e("3378");for(var i in o)"default"!==i&&function(n){e.d(t,n,function(){return o[n]})}(i);e("bea3");var u,r=e("f0c5"),c=Object(r["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],u);t["default"]=c.exports},3378:function(n,t,e){"use strict";e.r(t);var a=e("c4dd"),o=e.n(a);for(var i in a)"default"!==i&&function(n){e.d(t,n,function(){return a[n]})}(i);t["default"]=o.a},8458:function(n,t,e){"use strict";var a,o=function(){var n=this,t=n.$createElement;n._self._c},i=[];e.d(t,"b",function(){return o}),e.d(t,"c",function(){return i}),e.d(t,"a",function(){return a})},8940:function(n,t,e){},"9ca9":function(n,t,e){"use strict";(function(n){e("9e88"),e("921b");a(e("66fd"));var t=a(e("1e3e"));function a(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("543d")["createPage"])},bea3:function(n,t,e){"use strict";var a=e("8940"),o=e.n(a);o.a},c4dd:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=function(){return Promise.all([e.e("common/vendor"),e.e("components/gaoyia-parse/parse")]).then(e.bind(null,"5171"))},o={components:{uParse:a},data:function(){return{orgUuid:"",detailList:[{field:"oname",name:"别名",content:""},{field:"phone",name:"电话",content:""},{field:"addr",name:"地址",content:""},{field:"website",name:"网址",content:""}],introduce:"",busline:"",onameFull:""}},onLoad:function(n){this.orgUuid=n.orgUuid,this.getData()},methods:{getData:function(){var n=this;this.$globalMethod.ds_api({method:"m=B0012&token=SemXlsuV0Ko2Ugrp",loadmsg:"医院详情",showLoading:!1,data:{orgUuid:this.orgUuid},success:function(t){if(t&&0!=t.data.data.length){var e=t.data.data;n.detailList.forEach(function(n){n.content=e[n.field]}),n.introduce=e.introduce,n.busline=e.busline,n.onameFull=e.onameFull}}})}}};t.default=o}},[["9ca9","common/runtime","common/vendor"]]]);