<template>
	<view class="warp">
		<view class="h3">登录</view>
		<view class="formBox">
			<input v-for="(item,index) in inputList" :key="index" class="uni-input" :type="item.type" :placeholder="item.placeholder" :value="item.value" :data-index="index"
							 @focus="focus(item)" @blur="blur(item)" @input="input" />
			<button @click="submit">登录</button>
		</view>
	</view>
</template>

<script>
export default{
	data(){
		return{
			inputList: {
				mobile:{						
					value: 18779868309,
					type: 'text',
					placeholder: '请输入手机号码',
					focus: false,
				},					
				password:{						
					value: '111111',
					type: 'password',
					placeholder: '请输入密码',
					focus: false,
					showpwd: true,
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
		submit: function() {
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
			};
			uni.showToast({
				title:"登录成功",
				icon:"success"
			})
			setTimeout(function(){
				uni.reLaunch({
					url: '/pages/bsoftMedical/my/my',
				});
			},2000)
		},
	}
}
</script>

<style scoped lang="scss">
.warp{
	font-size:30upx;		
	width:100%;
	height:100%;
	background-color: #fff;
	position: fixed;
	left: 0;
	top:0;
	.h3{
		margin-top: 130upx;
		color: #020221;
		font-size: 60upx;
		text-align: center;
	}
	.formBox{
	   margin: 0;
	   padding:24upx 24upx 40upx;
	   .uni-input{
		   height: 112upx;
		   line-height: 88upx;
		   padding-top: 24upx;
		   padding-left: 15px;
		   border-bottom: 1upx solid #e3e3e3;
		   .uni-input-placeholder{
			   color: #C6C6C6;
			   font-size: 32upx;
		   }
	   }
	   uni-button{
		   margin-top: 100upx;
		   border: none;
		   background:rgba(2,123,253,.5);
		   border-radius: 44upx;
		   height: 88upx;
		   color: #fff;
		   font-size:36upx ;
	   }
	   uni-button:after{
		   display: none;
	   }
	 }
}
</style>
