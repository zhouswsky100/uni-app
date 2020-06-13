<template>
	<view class="warp">
		<view class="content">
			<view class="h1">Hello</view>
			<view class="h1">欢迎来到社康通医护版</view>
			<view class="title">仅为已入驻深圳市社区健康服务信息系统的医护 人员提供服务</view>
			<view class="inner1">
				<picker class="inner2"  @change="bindPickerChange1" :value="index1" :range="array1" range-key='title' >
					<view class="innerTitle">
						<view class="outer1" :class="{innerCurrent:array1[index1].code=='0'}">{{array1[index1].title}}</view>
						<view class="inner3"><image style="width: 16upx;height: 9upx;" src="@/static/login/next.png"></image></view>
					</view>
				</picker>
			</view>
			<view class="inner1">
				<input type="text" :value="account" class="uni-input" @input="accInput" placeholder="请输入账号"/>
				<view v-if="accNum" class="inner3"><image @click="clearAcc" style="width: 24upx;height: 24upx;" src="@/static/login/delet.png"></image></view>
			</view>
			<view class="inner1" v-if="passView">
				<input type="password" :value="password" @input="passInput" class="uni-input" placeholder="请输入密码"/>
				<view class="inner3" v-if="passNum"><image  @click="showPass"  style="width: 28upx;height: 15upx;" src="@/static/login/close.png"></image></view>
			</view>
			<view class="inner1" v-else>
				<input type="text" :value="password" @input="passInput" class="uni-input" placeholder="请输入密码"/>
				<view class="inner3" v-if="passNum"><image @click="hidePass" style="width: 29upx;height: 20upx;" src="@/static/login/open.png"></image></view>
			</view>
			<view class="inner1">
				<input type="text" class="uni-input" placeholder="请选择机构" disabled="disabled"/>
				<view class="inner3" @click="addPop"><image style="width: 16upx;height: 9upx;" src="@/static/login/next.png"></image></view>
			</view>
			<button @click="submit">登录</button>
		</view>
		<uni-popup  ref="popup" type="center">
			<view class="agencyBox">
				<view class="header">机构选择</view>
				<view class="listBox">
					<view class="list" v-for="(item,index) in agencyList" :key="index">
						<view>{{item.title}}</view>
						<image v-if="item.id!=checkAgencyed" @click="checkAgency(item)" style="width: 36upx;height: 36upx;" src="@/static/login/nocheckAgence.png"></image>
						<image v-else style="width: 36upx;height: 36upx;" src="@/static/login/checkAgence.png"></image>
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- <view class="h3">登录</view>
		<view class="formBox">
			<input v-for="(item,index) in inputList" :key="index" class="uni-input" :type="item.type" :placeholder="item.placeholder" :value="item.value" :data-index="index"
							 @focus="focus(item)" @blur="blur(item)" @input="input" />
			<button @click="submit">登录</button>
		</view> -->
	</view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue'
export default{
	components: {uniPopup},
	data(){
		return{
			array1: [
				{
					title:'请选择区域',
					code:'0'
				},
				{
					title:'福田区',
					code:'440304',
				},
				{
					title:'罗湖区',
					code:'440303',
				},
				{
					title:'宝安区',
					code:'440306',
				},
				{
					title:'南山区',
					code:'440305',
				},
				{
					title:'龙华区',
					code:'440311',
				},
				{
					title:'龙岗区',
					code:'440307',
				},
				{
					title:'光明区',
					code:'440309',
				},
				{
					title:'盐田区',
					code:'440308',
				},
				{
					title:'坪山区',
					code:'440310',
				},
				{
					title:'大鹏新区',
					code:'440312',
				},
			],
			index1: 0,
			accNum:false,
			account:'18779868309',
			passView:true,
			password:'111111',
			passNum:false,
			agencyList:[
				{
					title:'景田社区健康服务中心',
					id:1,
				},
				{
					title:'香蜜二村社区健康服务中心',
					id:2,
				},
				{
					title:'雨田社区健康服务中心',
					id:3,
				},
				{
					title:'侨香村社区健康服务中心',
					id:4,
				},
				{
					title:'莲花西社区健康服务中心',
					id:5,
				},
			],
			checkAgencyed:-1,
		}
	},
	methods: {
		accInput(e) {
			let value = e.detail.value.trim();
			this.account = value;
			if(value.length>0){
				this.accNum = true
			}else{
				this.accNum = false
			}
		},
		passInput(e){
			let value = e.detail.value.trim();
			this.password = value;
			if(value.length>0){
				this.passNum = true
			}else{
				this.passNum = false
			}
		},
		clearAcc(){
			this.accNum = false;
			this.account='';
		},
		showPass(){
			this.passView = false;
		},
		hidePass(){
			this.passView = true;
		},
		addPop(){
			this.$refs.popup.open()
		},
		checkAgency(obj){
			this.checkAgencyed= obj.id
		},
		bindPickerChange1: function(e) {
			this.index1 = e.target.value;
		},
		submit: function() {
			let password=this.password;
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
	.content{
		padding: 180upx 60upx 0;
		.h1{
			color: #07103C;
			font-size: 52upx;
		}
		.title{
			color: #7C808B;
			font-size: 28upx;
			margin: 40upx 0 90upx;
		}
		.inner1{
			height:88upx;
			background:rgba(249,249,249,1);
			border-radius:44upx;
			padding: 0 30upx;
			margin-bottom: 20upx;
			display: flex;
			.uni-input{
			   height:88upx;
			   width: 520upx;
			   border: 0;
			   color: #07103C;
			   font-size: 30upx;
			   .uni-input-placeholder{
				   color: #9FA0A7;
				   font-size: 30upx;
				   height: 88upx;
				   line-height: 88upx;
			   }
			}
			.inner2{
				width: 100%;
				height:88upx;
				.innerTitle{
					height:88upx;
					width: 100%;
					display: flex;
					.outer1{
						width: 520upx;
						line-height: 88upx;
						color: #07103C;
						font-size: 30upx;
						&.innerCurrent{
							color: #9FA0A7;
						}
					}
				}
			}
			.inner3{
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
		uni-button{
		   margin-top: 60upx;
		   border: none;
		   background:#0084FD;
		   border-radius: 44upx;
		   height: 88upx;
		   color: #fff;
		   font-size:36upx ;
		}
		uni-button:after{
		   display: none;
		}
	}
	.agencyBox{
		width:660upx;
		height:600upx;
		background:rgba(253,253,255,1);
		border-radius:20upx;
		.header{
			height: 120upx;
			text-align: center;
			line-height: 120upx;
			width: 100%;
			color: #07103C;
			font-size: 44upx;
			font-weight:bold;
		}
		.listBox{
			width: 100%;
			height: 440upx;
			overflow-y: scroll;
			.list{
				height: 112upx;
				width: 100%;
				padding: 0 40upx;
				border-bottom: 1upx solid #D9DDE8;
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #07103C;
				font-size: 32upx;
			}
		}
	}
}
</style>
