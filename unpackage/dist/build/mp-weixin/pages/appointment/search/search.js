(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/appointment/search/search"],{"1ae8":function(t,e,i){"use strict";i.r(e);var s=i("fcc9"),n=i.n(s);for(var o in s)"default"!==o&&function(t){i.d(e,t,function(){return s[t]})}(o);e["default"]=n.a},"305b":function(t,e,i){"use strict";var s,n=function(){var t=this,e=t.$createElement;t._self._c},o=[];i.d(e,"b",function(){return n}),i.d(e,"c",function(){return o}),i.d(e,"a",function(){return s})},"394c":function(t,e,i){"use strict";(function(t){i("9e88"),i("921b");s(i("66fd"));var e=s(i("6749"));function s(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("543d")["createPage"])},6749:function(t,e,i){"use strict";i.r(e);var s=i("305b"),n=i("1ae8");for(var o in n)"default"!==o&&function(t){i.d(e,t,function(){return n[t]})}(o);i("91a7");var a,r=i("f0c5"),c=Object(r["a"])(n["default"],s["b"],s["c"],!1,null,null,null,!1,s["a"],a);e["default"]=c.exports},"91a7":function(t,e,i){"use strict";var s=i("eaf4"),n=i.n(s);n.a},eaf4:function(t,e,i){},fcc9:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=n(i("2796"));function n(t){return t&&t.__esModule?t:{default:t}}function o(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var a=function(){return i.e("components/semp-navbar").then(i.bind(null,"5d0c"))},r={components:{sempNavbar:a},data:function(){return o({historyList:[],isHistory:!0,list:[],flng:!0,timer:null,hospitalList:[],loadingType:"more",keywords:"",pagenum:1},"timer",null)},onLoad:function(){this.historyList=t.getStorageSync("search:history");t.getSystemInfoSync()},methods:{navBack:function(){t.navigateBack()},searchInput:function(e){if(this.keywords=e.detail.value,""==this.keywords)return this.hospitalList=[],this.isHistory=!0,this.historyList=[],void(this.historyList=t.getStorageSync("search:history"));this.isHistory=!1,this.getData("refresh")},search:function(){if(""==this.keywords)return this.isHistory=!0,this.historyList=[],this.historyList=t.getStorageSync("search:history"),void t.showModal({title:"提示",showCancel:!1,content:"请输入内容。",success:function(t){t.confirm}});s.default.setHistory(this.keywords),this.isHistory=!1,this.getData("refresh")},listTap:function(t){t.name!=this.keywords&&(this.isHistory=!0,this.keywords=t.name,this.hospitalList=[],this.getData("refresh"))},historyClick:function(t){this.keywords=t,this.getData("refresh")},hospitalClick:function(e){var i="?orgUuid="+e;t.navigateTo({url:"/pages/appointment/hospital-dept/hospital-dept"+i})},getData:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"add";"loading"!=this.loadingType&&"nomore"!=this.loadingType&&("refresh"==e&&(this.pagenum=1),this.$globalMethod.ds_api({method:"m=S001&token=SemXlsuV0Ko2Ugrp&pagesize=20&pagenum="+this.pagenum,loadmsg:"医院搜索",showLoading:!1,data:{searchKey:this.keywords},success:function(e){if(e&&0!=e.data.data.length){var i=e.data.data;i.forEach(function(e){t.hospitalList.push(e)}),t.loadingType=i.length>=20?"more":"nomore",t.pagenum++}else t.loadingType="nomore"}}))},clearSearch:function(){var e=this;t.showModal({title:"提示",content:"是否清理全部搜索历史？该操作不可逆。",success:function(t){t.confirm&&(e.historyList=s.default.removeHistory())}})}},onNavigationBarSearchInputConfirmed:function(e){if(""==this.keywords)return this.isHistory=!0,this.historyList=[],this.historyList=t.getStorageSync("search:history"),void t.showModal({title:"提示",content:"请输入内容。",success:function(t){t.confirm}});s.default.setHistory(this.keywords),this.showList=!0,this.getData("refresh")},onNavigationBarButtonTap:function(t){0===t.index&&this.searchInput()},onReachBottom:function(){this.getData()}};e.default=r}).call(this,i("543d")["default"])}},[["394c","common/runtime","common/vendor"]]]);