(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/appointment/select-patient/patient-manage"],{"279f":function(t,e,n){"use strict";var a=n("4b68"),o=n.n(a);o.a},"32e2":function(t,e,n){"use strict";var a,o=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"b",function(){return o}),n.d(e,"c",function(){return i}),n.d(e,"a",function(){return a})},4054:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n("2f62");function o(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},a=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),a.forEach(function(e){i(t,e,n[e])})}return t}function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var r={data:function(){return{patientList:[],refresh:0,idcard:""}},onLoad:function(){this.getData()},onShow:function(){this.refresh!=this.$status.getRefreshNum(this.$globalMethod.getPageName())&&this.getData()},methods:{addDoctorm:function(){t.navigateTo({url:"/pages/appointment/select-patient/add-doctorm"})},baseInfoClick:function(e){t.navigateTo({url:"/pages/appointment/select-patient/basisinformation?idcard="+this.idcard+"&aumUuid="+e})},deletePatient:function(e,n){var a=this;t.showModal({title:"确定要删除吗？",content:"删除后是不可恢复的！",success:function(o){o.confirm&&a.$globalMethod.ds_api({method:"m=Y009&token=SemXlsuV0Ko2Ugrp&openId="+a.$globalMethod.openID,loadmsg:"就诊人列表",data:{userId:a.$status.userId(),aumUuid:n.aumUuid,idcard:n.idcard,pref:n.pref},success:function(n){t.showToast({title:"删除成功"}),a.patientList.splice(e,1)}})}})},getData:function(){var t=this;this.patientList=[],this.$globalMethod.ds_api({method:"m=Y005&token=SemXlsuV0Ko2Ugrp&openId="+this.$globalMethod.openID,loadmsg:"就诊人列表",data:{userId:this.$status.userId()},success:function(e){if(e&&0!=e.data.data.length){var n=e.data.data;n.forEach(function(e){t.idcard=e.idcard,e.age=t.$globalMethod.getAge(e.idcard),e.idcard=t.$globalMethod.hqkFuncStrEncrypt(e.idcard,4,10,"*"),e.mobile=t.$globalMethod.hqkFuncStrEncrypt(e.mobile,4,3,"*"),t.patientList.push(e)})}}})}},computed:o({},(0,a.mapState)(["$status"]))};e.default=r}).call(this,n("543d")["default"])},"4b68":function(t,e,n){},8684:function(t,e,n){"use strict";n.r(e);var a=n("4054"),o=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,function(){return a[t]})}(i);e["default"]=o.a},ae1a:function(t,e,n){"use strict";(function(t){n("9e88"),n("921b");a(n("66fd"));var e=a(n("df63"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},df63:function(t,e,n){"use strict";n.r(e);var a=n("32e2"),o=n("8684");for(var i in o)"default"!==i&&function(t){n.d(e,t,function(){return o[t]})}(i);n("279f");var r,u=n("f0c5"),c=Object(u["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],r);e["default"]=c.exports}},[["ae1a","common/runtime","common/vendor"]]]);