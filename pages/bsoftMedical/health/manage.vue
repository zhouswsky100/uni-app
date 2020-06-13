<template>
	<view class="warp">
		<view class="fixed">
			<view class="searchBox">
				<view class="searchBanner">
					<image class="searchImg" src="@/static/health/search.png"></image>
					<input class="uni-input"  placeholder="搜索" />
				</view>
			</view>
			<view class="headerBox">
				<view class="contentList" v-for="(item,index) in typeList" :key="index" @click="changeType(item.id)" :class="toggleId==item.id?'current':''">
					{{item.title}}
					<view v-if="toggleId==item.id" class="currentLine"></view>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="banner1" v-for="(item,index) in contentList" :key="index" v-if="toggleId==item.type">
				<view class="inner1">
					<view class="outer1">{{item.name}}</view>
				</view>
				<view class="inner1">
					<view class="outer3" style="padding-left: 0;">年龄:{{item.age}} <view class="line"></view></view>
					<view class="outer3">性别:{{item.male}}<view class="line"></view></view>
					<view class="outer3"><image class="call" src="@/static/my/call.png"></image><view class="phone">{{item.phone}}</view></view>
				</view>
				<view class="inner1">
					<image class="outer4" src="@/static/health/date.png" ></image>
					<view class="outer5">计划随访时间：{{item.time}}</view>
				</view>
				<view class="nextBox" @click="goManage(item)">随访</view>
				<view class="contentFooter">
					<view class="footerBox" @click="checkManage(item.type)">
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
						title:'高血压',
						id:'0',
					},
					{
						title:'糖尿病',
						id:'1',
					},
					{
						title:'中医药',
						id:'2',
					},
					{
						title:'健康体检',
						id:'3',
					},
					{
						title:'老年人',
						id:'4',
					},
				],
				toggleId:'0',
				loadingType:"noMore",
				contentList:[
					{
						name:'范秋阳',
						age:'65',
						male:'男',
						phone:'13678768888',
						time:'2020-05-30',
						type:'0',
						id:'0'
					},
					{
						name:'史朝雨',
						age:'48',
						male:'男',
						phone:'18779868123',
						time:'2020-05-31',
						type:'1',
						id:'1'
					},
					{
						name:'詹一璇',
						age:'68',
						male:'女',
						phone:'13145632453',
						time:'2020-06-01',
						type:'2',
						id:'2'
					},
					{
						name:'田幻波',
						age:'78',
						male:'男',
						phone:'18998766732',
						time:'2020-06-02',
						type:'3',
						id:'3'
					},
					{
						name:'申秀美',
						age:'61',
						male:'女',
						phone:'15645729871',
						time:'2020-06-03',
						type:'2',
						id:'4'
					},
					{
						name:'朱浦泽',
						age:'63',
						male:'男',
						phone:'13554543232',
						time:'2020-06-04',
						type:'0',
						id:'5'
					},
					{
						name:'翟子明',
						age:'54',
						male:'男',
						phone:'17698124334',
						time:'2020-06-05',
						type:'1',
						id:'6'
					},
					{
						name:'许子健',
						age:'65',
						male:'男',
						phone:'18712674376',
						time:'2020-06-06',
						type:'2',
						id:'7'
					},
					{
						name:'宋弘文',
						age:'69',
						male:'男',
						phone:'18979868291',
						time:'2020-06-07',
						type:'3',
						id:'8'
					},
					{
						name:'廖鸿德',
						age:'62',
						male:'男',
						phone:'13333489961',
						time:'2020-06-08',
						type:'2',
						id:'9'
					},
					{
						name:'李兴安',
						age:'45',
						male:'男',
						phone:'18999862213',
						time:'2020-06-09',
						type:'0',
						id:'10'
					},
					{
						name:'马伟才',
						age:'46',
						male:'男',
						phone:'18178769901',
						time:'2020-06-10',
						type:'0',
						id:'11'
					},
					{
						name:'易良朋',
						age:'51',
						male:'男',
						phone:'17789980012',
						time:'2020-06-11',
						type:'0',
						id:'12'
					},
					{
						name:'从元纬',
						age:'54',
						male:'男',
						phone:'13779868301',
						time:'2020-06-12',
						type:'0',
						id:'13'
					},
					{
						name:'李飞雨',
						age:'50',
						male:'男',
						phone:'18999898891',
						time:'2020-06-12',
						type:'0',
						id:'14'
					},
					{
						name:'唐嘉茂',
						age:'61',
						male:'男',
						phone:'18999862213',
						time:'2020-06-13',
						type:'0',
						id:'15'
					},
					{
						name:'尚奇胜',
						age:'61',
						male:'男',
						phone:'18999862213',
						time:'2020-06-03',
						type:'1',
						id:'16'
					},
					{
						name:'邹立果',
						age:'55',
						male:'男',
						phone:'18999862213',
						time:'2020-06-04',
						type:'1',
						id:'17'
					},
					{
						name:'籍弘图',
						age:'63',
						male:'男',
						phone:'18999862213',
						time:'2020-06-05',
						type:'1',
						id:'18'
					},
					{
						name:'潘阳冰',
						age:'62',
						male:'男',
						phone:'18999862213',
						time:'2020-06-06',
						type:'1',
						id:'19'
					},
					{
						name:'田力言',
						age:'48',
						male:'男',
						phone:'18999862213',
						time:'2020-06-07',
						type:'1',
						id:'20'
					},
					{
						name:'杜力行',
						age:'78',
						male:'男',
						phone:'18999862213',
						time:'2020-06-08',
						type:'1',
						id:'21'
					},
					{
						name:'牛和韵',
						age:'70',
						male:'男',
						phone:'18999862213',
						time:'2020-06-09',
						type:'1',
						id:'22'
					},
					{
						name:'习天',
						age:'54',
						male:'男',
						phone:'18999862213',
						time:'2020-06-10',
						type:'1',
						id:'23'
					},
					{
						name:'杨火福',
						age:'64',
						male:'男',
						phone:'17779862345',
						time:'2020-06-10',
						type:'4',
						id:'24'
					},
					{
						name:'张磊',
						age:'67',
						male:'男',
						phone:'13899786645',
						time:'2020-06-11',
						type:'4',
						id:'25'
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
			checkManage(){
				uni.navigateTo({
				    url: '/pages/bsoftMedical/health/check-manage'
				});
			},
			goManage(obj){
				switch(obj.type){
					
					case '0':
						//高血压
						uni.navigateTo({
						    url: '/pages/bsoftMedical/health/hypertensive-manage'
						});
					break;
					case '1':
						//糖尿病
						uni.navigateTo({
						    url: '/pages/bsoftMedical/health/diabetes-manage'
						});
					break;
					case '2':
						//中医药
						uni.navigateTo({
						    url: '/pages/bsoftMedical/health/medicine-manage?id='+obj.id
						});
					break;
					case '3':
						//健康体检
						uni.showToast({
						    title: '功能完善中',
						    duration: 2000,
							icon:'none',
						});
					break;
					case '4':
						//老年人
						uni.showToast({
						    title: '功能完善中',
						    duration: 2000,
							icon:'none',
						});
					break;
				}
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
			.searchBox{
				height: 98upx;
				padding: 0 24upx;
				background: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
				.searchBanner{
					height: 64upx;
					width: 702upx;
					background:rgba(236,237,239,1);
					border-radius:32upx;
					padding: 0 30upx;
					display: flex;
					align-items: center;
					.searchImg{
						width: 32upx;
						height: 32upx;
					}
					.uni-input{
						flex: 1;
						padding-left: 15upx;
						height: 64upx;
						line-height: 64upx;
						.uni-input-placeholder{
						   color: #93989D;
						   font-size: 28upx;
						}
					}
				}
			}
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
			padding-top: 186upx;
			.banner1{
				height: 284upx;
				background: #fff;
				padding: 30upx 24upx 0;
				margin-bottom: 20upx;
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
						.call{
							width: 26upx;
							height: 32upx;
							position: absolute;
							top: 50%;
							margin-top: -16upx;
						}
						.phone{
							padding-left: 34upx;
						}
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
							color: #666;
							font-size: 24upx;
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
