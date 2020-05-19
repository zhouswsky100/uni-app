<template>
	<view class="warp">
		<view class="sub-list-box">
			<view class="sub-list solid-bottom">
				<view class="sub-list-content text-lg">
					<text class="cuIcon-titles text-blue"></text>
					<text class="text-grey">基础信息(必填)</text>
				</view>				
			</view>			
		</view>
		<view class="cu-form-group" v-for="(item,index) in userDetail" :key="index">
			<view class="title">{{item.title}}</view>
			<picker @change="PickerChange" :value="i" :range="item.region" v-if="item.region" :data-index="index">
				<view class="picker" :class="{selfss:item.value!=''}">
					{{item.region[item.checkedIndex]}}
				</view>
			</picker>
			
			<view class="info-right" v-else>{{index=="sex"?item.code:item.value}}</view>
			
			
		</view>
		<view class="sub-list-box margin-top">
			<view class="sub-list flex-row space-between">
				<view class="sub-list-content text-lg">
					<text class="cuIcon-titles text-blue"></text>
					<text class="text-grey">其他信息</text>
				</view>
				
			</view>
			<view class="cu-form-group" v-for="(item,index) in otherInfo" :key="index" @click="cardClick(index)">
				<view class="title">{{item.title}}</view>				
				<input type="text" :placeholder="item.placeholder" :value="item.value" :disabled="item.value!=''" v-if="index=='insuranceCard'"></input>
				<view class="info-right" v-else>{{item.value==''?item.placeholder:item.value}}</view>
				<text class="cuIcon-right text-grey" v-if="index=='zhenka'"></text>
			</view>
		</view>
		<view class="cu-form-group margin-tb-sm">
			<view>设置默认就诊人</view>
			<switch @change="switchChange" class="color-base" color="#157BC7" :checked="userMemberUuid==aumUuid" :disabled="userMemberUuid==aumUuid"></switch>
		</view>
		<view class="padding flex flex-direction bg-white">			
			<button class="cu-btn bg-base margin-tb-sm lg text-white" @click="submit">保 存</button>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data(){
			return {
				i:0,
				userDetail:{
					pname:{						
						title:"姓名",
						value:"",						
					},
					idcardType:{						
						title:"证件类型",
						value:"身份证",						
					},
					idcard:{						
						title:"身份证",
						value:"",						
					},
					sex:{						
						title:"性别",
						value:""
						
					},
					nationName:{						
						title:"民族",
						value:"",
						code:""
						
					},
					
					birthday:{
						
						title:"出生日期",
						value:"2000-01-01",
						
					},
					pref:{						
						title:"成员关系",
						value:"1",						
						region:[],
						regionKeys:[],
						checkedIndex:0
					},
					mobile:{						
						title:"手机号码",
						value:"123454445",
						
					},
					
				},
				otherInfo:{
					insuranceCard:{						
						title:"社保卡号",
						value:"",
						placeholder:"未填写"
					},
					healthCardNo:{						
						title:"健康卡号",
						value:"",
						placeholder:"未申请健康卡"
					},
					zhenka:{						
						title:"就诊卡",
						value:"",
						placeholder:"新增加和编辑就诊卡"
					},
				},
				idcard:"",
				aumUuid:0,
				userMemberUuid:0,
				switchChecked:false
				
				
			}
		},
		onLoad(e){
			this.idcard=e.idcard;
			this.aumUuid=e.aumUuid;
									
			this.getData()
		},
		methods:{
			switchChange(e){						
				this.switchChecked=e.detail.value
			},
			cardClick(index){
				if(index!="zhenka"){
					return
				}
				uni.navigateTo({
					url:"/pages/appointment/card/id-type-card?aumUuid="+this.aumUuid
				});
			},
			PickerChange(e){				
				if(this.userDetail.pref.value==1){
					uni.showToast({
						title:"本人不可修改关系",
						icon:"none"
					})
					return;
				}
				
				let index=Number(e.currentTarget.dataset.index);				
				this.userDetail.pref.checkedIndex=e.detail.value;
				this.i=e.detail.value;
				this.userDetail.pref.value =this.userDetail.pref.regionKeys[this.i];
			},
			submit(){
				let requestParams = {}
				for(let key in this.userDetail){
					if(key=="idcardType" || key=="nationName"){
						continue
					}
					requestParams[key]=this.userDetail[key].value					
				}
				requestParams.userId=this.$status.userId();
				requestParams.aumUuid=this.aumUuid;
				requestParams.insuranceCard=this.otherInfo.insuranceCard.value;
				requestParams.userMemberUuid=this.switchChecked?this.aumUuid:this.userMemberUuid;
				this.$globalMethod.ds_api({
					method:"m=Y008&token=SemXlsuV0Ko2Ugrp&openId=" + this.$globalMethod.openID,
					loadmsg:"修改就诊人",
					showLoading:false,
					data:requestParams,
					success:(res)=>{
						if(!res || !res.data.data){
							return
						}
						uni.showToast({
							title:"修改成功",
							icon:"none"
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
			async getData(){
				let res=await this.$globalMethod.ds_api({
						method:"m=Y007&token=SemXlsuV0Ko2Ugrp&openId=" + this.$globalMethod.openID,
						loadmsg:"就诊人信息",					
						data:{
							userId:this.$status.userId(),
							idcard:this.idcard,
							aumUuid:this.aumUuid
						},
						success:(res)=>{
							if(!res || !res.data.data || res.data.data.length==0){
								return
							}
							let list=res.data.data;
							this.userMemberUuid=list.userMemberUuid;
							for(let key in this.userDetail){
								if(key=="idcardType"){
									continue
								}
								this.userDetail[key].value=list[key];
								if(key=="nationName"){
									this.userDetail[key].code=list.nationCode
								}
								if(key=="pref"){
									this.userDetail[key].checkedIndex=list[key]
								}
								if(key=="sex"){
									this.userDetail[key].code=list.sex1
								}							
								
							}
							if(list.healthCardNo){
								this.otherInfo.healthCardNo.value=list.healthCardNo;
							}
							if(list.insuranceCard){
								this.otherInfo.insuranceCard.value=list.insuranceCard;
							}
							
						
						}					
					})
				if(res){
					this.$globalMethod.ds_api({
						method:"m=K001&token=SemXlsuV0Ko2Ugrp",
						loadmsg:"关系查询",
						showLoading:false,
						data:{dcode:"DICT_HOSP_PERSON_REF",dkey:"",dvalue:""},
						success:(res)=>{
							if(!res || !res.data.data || res.data.data.length==0){
								return
							}
							let list=res.data.data;
							for(let i=0;i<list.length;i++){
								this.userDetail.pref.region.push(list[i].dvalue)
								this.userDetail.pref.regionKeys.push(list[i].dkey)								
								if(list[i].dkey==this.userDetail.pref.value){
									this.userDetail.pref.checkedIndex=i;
								}
							}						
						}					
					})
				}	
			}
			
		},
		computed: {
			...mapState(['$status']),
		},
		
	}
</script>

<style>
	.info-right{
		text-align: left;
		display: flex;
		flex:1;
		color:#a5a5a5;
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
		width:180upx;
		font-size:28upx;
	}
	.cu-form-group uni-input{
		font-size:28upx;
	}
	
	
	.uni-input-placeholder{
		font-size:28upx;
		color:#aaa;
	}
	.cu-form-group uni-input{
		font-size:28upx;
		color:#aaa;
	}
</style>
