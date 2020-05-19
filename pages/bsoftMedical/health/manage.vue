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
		<view class="content">
			<view class="banner1" v-for="(item,index) in contentList" :key="index">
				<view class="inner1">
					<view class="outer1">{{item.name}}</view>
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
				<view class="nextBox">随访</view>
				<view class="contentFooter">
					<view class="footerBox">
						<view class="outer6">随访记录</view>
						<view class="outer6 outer7">查看 <image class="outer8" src="@/static/health/next.png"></image></view>
					</view>
				</view>
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
						title:'老年人',
						id:'0',
					},
					{
						title:'高血压',
						id:'1',
					},
					{
						title:'糖尿病',
						id:'2',
					},
					{
						title:'健康体检',
						id:'3',
					},
					{
						title:'孕产妇',
						id:'4',
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
						id:'0'
					},
					{
						name:'李四',
						age:'28',
						male:'男',
						phone:'18779868888',
						time:'2020-05-07',
						id:'1'
					},
					{
						name:'王子健',
						age:'18',
						male:'男',
						phone:'18779868888',
						time:'2020-05-07',
						id:'2'
					},
					{
						name:'刘清',
						age:'18',
						male:'女',
						phone:'18779868888',
						time:'2020-05-07',
						id:'3'
					},
					{
						name:'郭子健',
						age:'38',
						male:'男',
						phone:'18779868888',
						time:'2020-05-07',
						id:'4'
					},
					{
						name:'田子健',
						age:'33',
						male:'男',
						phone:'18779868888',
						time:'2020-05-07',
						id:'5'
					},
					{
						name:'周子健',
						age:'18',
						male:'男',
						phone:'18779868888',
						time:'2020-05-07',
						id:'6'
					},
					{
						name:'许子健',
						age:'18',
						male:'男',
						phone:'18779868888',
						time:'2020-05-07',
						id:'7'
					},
					{
						name:'刘子健',
						age:'18',
						male:'男',
						phone:'18779868888',
						time:'2020-05-07',
						id:'8'
					},
					{
						name:'王健',
						age:'48',
						male:'男',
						phone:'18779868888',
						time:'2020-05-07',
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
			overflow-y:hidden;  
			overflow-x:scroll;  
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
				::-webkit-scrollbar{
					display: none;
				}
			}
		}
		.content{
			padding-top: 88upx;
			.banner1{
				height: 284upx;
				background: #fff;
				padding: 30upx 24upx 0;
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
					right: 24upx;
					width:124upx;
					height:54upx;
					text-align: center;
					line-height: 54upx;
					font-size: 28upx;
					color: #fff;
					top:70upx;
					background:rgba(0,132,253,1);
					box-shadow:0upx 5upx 26upx 0upx rgba(51,110,242,0.3);
					border-radius:27upx;
				}
				.contentFooter{
					position: absolute;
					bottom: 0;
					left: 0;
					width: 100%;
					padding:0 25upx;
					height: 79upx;
					border-top: 1upx solid #f2f2f2;
					.footerBox{
						display: flex;
						align-items: center;
						width: 100%;
						height: 100%;
						.outer6{
							flex: 1;
							display: flex;
							&.outer7{
								justify-content: flex-end;
								align-items: center;
								.outer8{
									margin-left: 10upx;
									width: 9upx;
									height: 16upx;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
