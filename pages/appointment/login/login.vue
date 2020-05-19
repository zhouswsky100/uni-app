<template>
	<view class="input-view">
		<image src="../../../static/beijing.png" class="pic"></image>
		<view class="input-card">			
			<view class="input-bg-box">
				<view class="flex-row parent-input-box margin-bottom" v-for="(item,index) in inputList" :key="index">
					<view class="flex-row input-box text-white">
						<view :class="item.icon" class="margin-right"></view>
						<input class="input text-white" :type="item.type" :placeholder="item.placeholder" :value="item.value" :data-index="index"
						 @focus="focus(item)" @blur="blur(item)" @input="input" />
						<view v-show="item.value!=''&& index=='mobile'" @click="clear(item)">
							<text class="cuIcon-roundclosefill"></text>
						</view>
						<view class="margin-left" v-if="index=='password'">
							<text :class="item.type=='password'?'cuIcon-attentionforbidfill':'cuIcon-attentionfill'" @click="showPwd(item)"></text>							
						</view>
					</view>
				</view>	
				<view class="flex flex-direction">
					<button class="cu-btn bg-base margin-tb-sm lg text-white" @click="btnSave">登录</button>
				</view>
			</view>
			
			
		</view>
	</view>
</template>

<script>		
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				inputList: {
					mobile:{						
						value: '',
						type: 'text',
						placeholder: '请输入您的手机号码',
						focus: false,
						icon:"cuIcon-mobilefill"
					},					
					password:{						
						value: '',
						type: 'password',
						placeholder: '请输入密码',
						focus: false,
						showpwd: true,
						icon:"cuIcon-lock"
					}
					

				},
				
				
			}
		},
		methods: {
			focus(e) {
				e.focus = true;
			},
			blur(e) {
				e.focus = false;
			},
			input(e) {
				let index = e.target.dataset.index;
				this.inputList[index].value = e.detail.value;
			},
			clear(e) {
				e.value = '';
			},
			showPwd(e) {
				e.type = e.type == 'password' ? 'text' : 'password';
			},
			btnSave() {
				
				let mobile=this.inputList.mobile.value;
				let password=this.inputList.password.value;
				if (mobile.length < 1) {
					uni.showToast({
						title:"请输入手机号码",
						icon:"none"
					})
					return;
				}
				if (!(/^1[345789]\d{9}$/.test(mobile))){
					 uni.showToast({
						title:"手机格式填写不对",
						icon:'none'
					 })
				}
				if (password.length < 1) {
					uni.showToast({
						title:"请输入密码",
						icon:"none"
					})
					return;
				}
				this.$globalMethod.ds_api({
					method:"m=Y001&token=SemXlsuV0Ko2Ugrp&openId=" +this.$globalMethod.openID+"&publicOpenId="+this.$globalMethod.openID.openWatchId,
					showLoading:false,
					loadmsg:"登录",
					data:{
						mobile:mobile,
						password:password
					},
					success:(res)=>{
						if(!res || !res.data.data){
							return
						}
						let userObj=res.data.data;
						delete userObj.promptMessage;
						userObj.password=password;
						this.$status.login(userObj);
						uni.showToast({
							title:"登录成功",
							icon:"none"
						})
						uni.reLaunch({
							url: '/pages/appointment/index/index',
						});
					}
				})

			},
		},
		computed: {
			...mapState(['$status'])
		},
		
	}
</script>

<style lang="scss">
	.input-view{
		position: relative;
	}
	.input-card{
		position: absolute;
		left:0;
		top:0;
		z-index: 3;
		width:100%;
	}
	.input-bg-box {
		width: 100%;				
		box-sizing: border-box;
		padding:40vh 100upx 0 100upx;
		
	}
	.pic{
		position: absolute;
		left:0;
		top:0;
		z-index:1;
		width:100vw;
		height:100vh;
	}
	.parent-input-box {
		align-items: center;		
	}

	.input-box {
		flex: 1;
		height: 88upx;
		align-items: center;
		border-bottom:1px solid #f2f2f2;
	}

	.input {
		border:none;
		flex: 1;		
		background: none;
		
	}
	.uni-input-placeholder{
		font-size:28upx;
		color:#fff;
	}
	


</style>
