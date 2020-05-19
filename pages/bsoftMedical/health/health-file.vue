<template>
	<view class="warp">
		<view class="fixed">
			<view class="headerBox">
				<view class="contentList" v-for="(item,index) in typeList" :key="index" @click="changeType(item.id)" :class="toggleId==item.id?'current':''">
					{{item.title}}
					<view v-if="toggleId==item.id" class="currentLine"></view>
				</view>
			</view>
		</view>
		<view class="content" v-if="toggleId=='0'">
			<view class="banner1" v-for="(item,index) in contentList" :key="index" v-if="item.type=='1'">
				<view class="inner1">
					<view class="outer1">{{item.name}}</view>
					<view class="outer2">有效档案</view>
				</view>
				<view class="inner1">
					<view class="outer3" style="padding-left: 0;">年龄:{{item.age}} <view class="line"></view></view>
					<view class="outer3">性别:{{item.male}}<view class="line"></view></view>
					<view class="outer3">电话:{{item.phone}}</view>
				</view>
				<view class="inner1">
					<image class="outer4" src="@/static/health/date.png" ></image>
					<view class="outer5">建档时间：2020-05-07</view>
				</view>
				<image class="nextBox" src="@/static/health/yR.png"></image>
			</view>
			<uni-load-more :status="loadingType"></uni-load-more>
		</view>
		<view class="content" v-if="toggleId=='1'">
			<view class="banner1" v-for="(item,index) in contentList" :key="index" v-if="item.type=='2'">
				<view class="inner1">
					<view class="outer1">{{item.name}}</view>
					<view class="outer2">无效档案</view>
				</view>
				<view class="inner1">
					<view class="outer3" style="padding-left: 0;">年龄:{{item.age}} <view class="line"></view></view>
					<view class="outer3">性别:{{item.male}}<view class="line"></view></view>
					<view class="outer3">电话:{{item.phone}}</view>
				</view>
				<view class="inner1">
					<image class="outer4" src="@/static/health/date.png" ></image>
					<view class="outer5">建档时间：2020-05-07</view>
				</view>
				<image class="nextBox" src="@/static/health/yR.png"></image>
			</view>
			<uni-load-more :status="loadingType"></uni-load-more>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				typeList:[
					{
						title:'有效档案',
						id:'0',
					},
					{
						title:'无效档案',
						id:'1',
					}
				],
				toggleId:'0',
				loadingType:"noMore",
				contentList:[
					{
						name:'王子健',
						age:'18',
						male:'男',
						phone:'18779868888',
						time:'2020-05-07',
						type:'1',//1为有效2为无效
						id:'0'
					},
					{
						name:'李四',
						age:'28',
						male:'男',
						phone:'18779868888',
						time:'2020-05-07',
						type:'1',//1为有效2为无效
						id:'1'
					},
					{
						name:'王子健',
						age:'18',
						male:'男',
						phone:'18779868888',
						time:'2020-05-07',
						type:'1',//1为有效2为无效
						id:'2'
					},
					{
						name:'刘清',
						age:'18',
						male:'女',
						phone:'18779868888',
						time:'2020-05-07',
						type:'1',//1为有效2为无效
						id:'3'
					},
					{
						name:'郭子健',
						age:'38',
						male:'男',
						phone:'18779868888',
						time:'2020-05-07',
						type:'1',//1为有效2为无效
						id:'4'
					},
					{
						name:'田子健',
						age:'33',
						male:'男',
						phone:'18779868888',
						time:'2020-05-07',
						type:'2',//1为有效2为无效
						id:'5'
					},
					{
						name:'周子健',
						age:'18',
						male:'男',
						phone:'18779868888',
						time:'2020-05-07',
						type:'1',//1为有效2为无效
						id:'6'
					},
					{
						name:'许子健',
						age:'18',
						male:'男',
						phone:'18779868888',
						time:'2020-05-07',
						type:'2',//1为有效2为无效
						id:'7'
					},
					{
						name:'刘子健',
						age:'18',
						male:'男',
						phone:'18779868888',
						time:'2020-05-07',
						type:'1',//1为有效2为无效
						id:'8'
					},
					{
						name:'王健',
						age:'48',
						male:'男',
						phone:'18779868888',
						time:'2020-05-07',
						type:'2',//1为有效2为无效
						id:'9'
					},
				],
			}
		},
		methods:{
			getData(){
				console.log("gogogo")
			},
			changeType(id){
				this.toggleId = id;
			},
		},
		onReachBottom() {
			if (this.loadingType == 'nomore') {
				return;
			}
			this.getData();
		},
		filters:{
			typeFilter(value){
				let returnValue;
				if(value=='1'){
					returnValue='有效档案';
				}else if(value=='2'){
					returnValue='无效档案';
				}
				return returnValue;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.warp{
		width: 100%;
		height: 100%;
		.fixed{
			position: fixed;
			width: 100%;
			left: 0;
			top: --window-top;
			z-index: 2;
			background: #fff;
			.headerBox{
				display: flex;
				height: 88upx;
				.contentList{
					padding: 0 23upx;
					color: #020221;
					font-size: 28upx;
					line-height: 88upx;
					position: relative;
					&.current{
						font-weight:bold;
						font-size: 38upx;
					}
					.currentLine{
						position: absolute;
						bottom: 0;
						left: 50%;
						margin-left: -29upx;
						width:58upx;
						height:4upx;
						background:rgba(32,126,250,1);
						border-radius:2upx;
					}
				}
			}
		}
		.content{
			padding-top: 88upx;
			margin: 0 24upx;
			.banner1{
				height: 190upx;
				background: #fff;
				padding: 30upx 30upx 0;
				margin-top: 20upx;
				position: relative;
				.inner1{
					display: flex;
					align-items: center;
					margin-bottom: 14upx;
					.outer1{
						color: #07103C;
						font-size: 32upx;
						margin-right: 20upx;
					}
					.outer2{
						padding: 6upx 10upx;
						color: #0084FD;
						font-size: 20upx;
						background:rgba(230,240,255,1);
						border-radius:6upx;
					}
					.outer3{
						color: #A6ADC1;
						font-size: 24upx;
						padding:0 25upx;
						position: relative;
						.line{
							position: absolute;
							right: 0;
							top: 50%;
							margin-top: -10upx;
							width:2upx;
							height:20upx;
							background:rgba(238,238,238,1);
						}
					}
					.outer4{
						width: 28upx;
						height: 28upx;
						margin-right: 14upx;
					}
					.outer5{
						font-size:24upx;
						color:rgba(231,74,85,1);
					}
				}
				.nextBox{
					position: absolute;
					width: 30upx;
					height: 30upx;
					right: 30upx;
					top: 50%;
					margin-top: -15upx;
				}
			}
		}
	}
	
</style>
