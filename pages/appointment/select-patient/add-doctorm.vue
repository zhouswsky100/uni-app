<template>
	<view class="warp">
		<view class="all-list" :class="groundItem.marginTop?'margin-top':''" v-for="(groundItem,groundIndex) in allList" :key="groundIndex" v-if="groundItem.isFill">
			<view class="sub-list-box">
				<view class="sub-list solid-bottom">
					<view class="sub-list-content text-lg">
						<text class="cuIcon-titles text-blue"></text>
						<text class="text-grey">{{groundItem.title}}</text>
					</view>				
				</view>			
			</view>
			<view class="cu-form-group" v-for="(item,index) in groundItem.inputList" :key="index">
				<view class="title">{{item.title}}</view>
				<picker @change="PickerChange" :value="i" :range="item.region" v-if="item.region" :data-index="index" :data-key="groundIndex">
					<view class="picker" :class="{selfss:item.value!=''}">
						{{item.value==''?item.placeholder:item.region[item.checkedIndex]}}
					</view>
				</picker>
				<picker mode="date" :value="item.value==''?item.date:item.value" start="1920-01-01" end="2020-12-31" @change="DateChange" v-else-if="item.date" :data-index="index" :data-key="groundIndex">
					<view class="picker" :class="{selfss:item.value!=''}">
						{{item.value==''?item.date:item.value}}
					</view>
				</picker>
				<input :placeholder="item.placeholder" :value="item.value" class="text-gray" :data-index="index" :data-key="groundIndex" @blur="blur" v-else ></input>
								
			</view>
		</view>
		<view class="padding flex flex-direction bg-white">
			
			<button class="cu-btn bg-base margin-tb-sm lg text-white" @click="submit">提 交</button>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data(){
			return {
				i:0,
				reg: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
				patientInfo:{},
				allList:{
					base:{
						title:"基础信息(必填)",
						isFill:true,//是否要填写，true需要，false不需要
						inputList:[
							
							{
								key:"pname",
								title:"姓名",
								value:"",
								placeholder:"请输入姓名"
							},
							{
								key:"leixing",
								title:"证件类型",
								value:"身份证",
								placeholder:"请输入证件类型",
								region:['身份证'],
								regionKeys:[1],
								checkedIndex:0
							},
							{
								key:"idcard",
								title:"身份证",
								value:"",
								placeholder:"请输入证件号码"
							},
							{
								key:"sex",
								title:"性别",
								value:"",
								placeholder:"请选择",
								region:['男','女'],
								regionKeys:[1,2],
								checkedIndex:0
							},
							{
								key:"birthday",
								title:"出生日期",
								value:"",
								placeholder:"请选择出生日期",
								date:"2000-01-01"
							},
							{
								key:"nation",
								title:"民族",
								value:"",
								placeholder:"请选择",
								region:[],
								regionKeys:[],
								checkedIndex:0
							},
							
							{
								key:"pref",
								title:"成员关系",
								value:"",
								placeholder:"请选择",
								region:[],
								regionKeys:[],
								checkedIndex:0
							},
							{
								key:"mobile",
								title:"手机号码",
								value:"",
								placeholder:"请输入手机号码"
							}
						]
					},
					ref:{
						title:"监护人信息(必填)",
						isFill:false,
						marginTop:true,
						inputList:[
							{
								key:"refPersonName",
								title:"姓名",
								value:"",
								placeholder:"请输入监护人的姓名",
							},
							{
								key:"leixing",
								title:"证件类型",
								value:"身份证",
								placeholder:"请输入证件类型",
								region:['身份证'],
								regionKeys:[1],
								checkedIndex:0
							},
							{
								key:"refPersonIdcard",
								title:"身份证",
								value:"",
								placeholder:"请输入监护人证件号码"
							},
							{
								key:"refPersonSex",
								title:"性别",
								value:"",
								placeholder:"请选择",
								region:['男','女'],
								regionKeys:[1,2],
								checkedIndex:0
							},
							{
								key:"refPersonBirthday",
								title:"出生日期",
								value:"",
								placeholder:"请选择监护人出生日期",
								date:"2000-01-01"
							},
							
							{
								key:"refPersonPref",
								title:"与就诊人关系",
								value:"",
								placeholder:"请选择",
								region:[],
								regionKeys:[],
								checkedIndex:0
							},
							{
								key:"refPersonMobile",
								title:"手机号码",
								value:"",
								placeholder:"请输入监护人手机号码"
							}
							
						]
					}
				}				
			}
		},
		onLoad(e){			
			this.getData()
		},
		methods:{
			blur(e){							
				let index=Number(e.currentTarget.dataset.index);
				let key=e.currentTarget.dataset.key;
				if(this.allList[key].inputList[index].key=="mobile" || this.allList[key].inputList[index].key=="refPersonMobile"){
					 if (!(/^1[345789]\d{9}$/.test(e.detail.value))){
						 uni.showToast({
						 	title:"手机格式填写不对",
							icon:'none'
						 })
					 }
				}
				if(index==2){
					if(!this.reg.test(e.detail.value)){
						uni.showToast({
							title:"身份证格式填写不对",
							icon:'none'
						})
					}else{
						this.allList[key].inputList[4].value=this.$globalMethod.hqkFuncBuildBirthdayByCardid(e.detail.value);
						//当小于16岁时需要填写监护人信息，显示相关表单
						if(key=="base" && this.$globalMethod.getAge(e.detail.value)<16){
							this.allList.ref.isFill=true;
						}
					}					
				}
				
				this.allList[key].inputList[index].value=e.detail.value
			},
			PickerChange(e){				
				let index=Number(e.currentTarget.dataset.index);
				let key=e.currentTarget.dataset.key;
				this.allList[key].inputList[index].checkedIndex=e.detail.value;//记录所选选项的索引
				//证件类型暂不用，强制用身份证
				if(index==1){
					return
				}				
				this.i=e.detail.value;				
				this.allList[key].inputList[index].value=this.allList[key].inputList[index].regionKeys[this.i];
			},
			DateChange(e){			
				let index=Number(e.currentTarget.dataset.index);
				let key=e.currentTarget.dataset.key;
				this.allList[key].inputList[index].value =e.detail.value;
			},
			submit(){
				let postObj={}
				for(let k in this.allList){
					this.allList[k].inputList.forEach((item)=>{
						if(item.key!="leixing"){
							this.$set(postObj,item.key,item.value);
						}
						
					})
				}
				
				if(postObj.pname==""){
					uni.showToast({
						title:"姓名不能为空",
						icon:"none"
					})
					return
				}
				if(postObj.mobile==""){
					uni.showToast({
						title:"手机号码不能为空",
						icon:"none"
					})
					return
				}
				if(!(/^1[345789]\d{9}$/.test(postObj.mobile))){
					uni.showToast({
						title:"手机格式填写不对",
						icon:"none"
					})
					return
				}
				if(postObj.idcard==""){
					uni.showToast({
						title:"身份证号码不能为空",
						icon:"none"
					})
					return
				}
				if(!this.reg.test(postObj.idcard)){
					uni.showToast({
						title:"身份证号码格式填写不对",
						icon:"none"
					})
					return
				}
				if(postObj.sex==""){
					uni.showToast({
						title:"性别不能为空",
						icon:"none"
					})
					return
				}
				if(postObj.pref==""){
					uni.showToast({
						title:"成员关系不能为空",
						icon:"none"
					})
					return
				}
				if(postObj.nation==""){
					uni.showToast({
						title:"民族不能为空",
						icon:"none"
					})
					return
				}
				if(this.allList.ref.isFill){
					if(postObj.refPersonPref==""){
						uni.showToast({
							title:"监护人关系不可为空",
							icon:"none"
						})
						return
					}
					if(postObj.refPersonIdcard==""){
						uni.showToast({
							title:"身份证号码不能为空",
							icon:"none"
						})
						return
					}
					if(!this.reg.test(postObj.refPersonIdcard)){
						uni.showToast({
							title:"监护人身份证号码格式填写不对",
							icon:"none"
						})
						return
					}
					if(postObj.refPersonSex==""){
						uni.showToast({
							title:"监护人性别不能为空",
							icon:"none"
						})
						return
					}
					
				}
				postObj.userId=this.$status.userId();
				this.$globalMethod.ds_api({
					method:"m=Y004&token=SemXlsuV0Ko2Ugrp&openId=" + this.$globalMethod.openID+"&publicOpenId="+this.$globalMethod.openWatchId,
					loadmsg:"提交信息",					
					data:postObj,
					success:(res)=>{
						if(!res || !res.data.data){
							return
						}
						uni.showToast({
							title:"提交成功"
						})
						this.$status.addRefreshNum("patient-manage");
						uni.navigateBack();
					},
					fail:(err)=>{
						uni.showToast({
							title:err,
							icon:"none"
						})
					}
				})
				
			},
			getData(){
				this.$globalMethod.ds_api({
					method:"m=K001&token=SemXlsuV0Ko2Ugrp",
					loadmsg:"关系查询",
					showLoading:false,
					data:{dcode:"DICT_HOSP_PERSON_REF",dkey:"",dvalue:""},
					success:(res)=>{
						if(!res || !res.data.data || res.data.data.length==0){
							return
						}
						res.data.data.forEach((item)=>{	
							this.allList.base.inputList[6].region.push(item.dvalue)
							this.allList.base.inputList[6].regionKeys.push(item.dkey)
							this.allList.ref.inputList[5].region.push(item.dvalue)
							this.allList.ref.inputList[5].regionKeys.push(item.dkey)
						})
					}					
				})
				this.$globalMethod.ds_api({
					method:"m=K001&token=SemXlsuV0Ko2Ugrp",
					loadmsg:"民族查询",					
					data:{dcode:"DICT_STD_NATION_CODE",dkey:"",dvalue:""},
					success:(res)=>{
						if(!res || !res.data.data || res.data.data.length==0){
							return
						}
						res.data.data.forEach((item)=>{							
							this.allList.base.inputList[5].region.push(item.dvalue);
							this.allList.base.inputList[5].regionKeys.push(item.dkey);
						})
						
					}					
				})
				
			}
		},
		computed: {
			...mapState(['$status']),
			
		},
		
	}
</script>

<style>
	.selfss{
		color:#555 !important;
	}
	.cu-form-group uni-picker .picker {
		text-align: left;
		color:#aaa;
	}
	.sub-list{
		padding:0 20upx;
		height:90upx;
		line-height: 90upx;
		background: #fff;
	}
	.sub-list-box{
		
		background: #f2f2f2;
	}
	.cu-form-group .title{
		width:200upx;
		font-size:28upx;
	}
	.cu-form-group uni-input{
		font-size:28upx;
	}
	
	
	.uni-input-placeholder{
		font-size:28upx;
		color:#aaa;
	}
</style>
