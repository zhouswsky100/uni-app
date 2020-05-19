(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/light-modal/light-modal"],{"09fa":function(t,n,e){"use strict";e.r(n);var o=e("f54f"),a=e.n(o);for(var u in o)"default"!==u&&function(t){e.d(n,t,function(){return o[t]})}(u);n["default"]=a.a},"0a79":function(t,n,e){"use strict";var o,a=function(){var t=this,n=t.$createElement;t._self._c},u=[];e.d(n,"b",function(){return a}),e.d(n,"c",function(){return u}),e.d(n,"a",function(){return o})},3572:function(t,n,e){"use strict";e.r(n);var o=e("0a79"),a=e("09fa");for(var u in a)"default"!==u&&function(t){e.d(n,t,function(){return a[t]})}(u);var f,i=e("f0c5"),c=Object(i["a"])(a["default"],o["b"],o["c"],!1,null,"955c2e04",null,!1,o["a"],f);n["default"]=c.exports},f54f:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o={data:function(){return{showModal:!1}},props:{confirmText:{type:String,default:"确定"},cancelText:{type:String,default:"取消"},confirmButton:{type:Boolean,default:!0},cancelButton:{type:Boolean,default:!0}},methods:{close:function(){this.showModal=!1,this.$emit("hide")},confirm:function(){this.showModal=!1,this.$emit("confirm")},show:function(){this.showModal=!0}}};n.default=o}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/light-modal/light-modal-create-component',
    {
        'components/light-modal/light-modal-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("3572"))
        })
    },
    [['components/light-modal/light-modal-create-component']]
]);
