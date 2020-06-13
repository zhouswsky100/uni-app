<template>
	<view class="warp">
		<view class="headerBox">
			<view class="headerInner1" @click="notYet()">
				<view class="outer1">
					<view class="imgBox">
						<image class="referral_track" src="@/static/juming/referral_track.png"></image>
					</view>
				</view>
				<view class="outer2">转诊跟踪</view>
			</view>
			<view class="headerInner1 headerInner2" @click="notYet()">
				<view class="outer1">
					<view class="imgBox">
						<image class="diagnos_track" src="@/static/juming/diagnos_track.png"></image>
					</view>
				</view>
				<view class="outer2">诊疗跟踪</view>
			</view>
		</view>
		<view class="contentBox">
			<view class="swiperBox" >
				<view class="contentList" v-for="(item,index) in adminTypeList" :key="index" @click="changeType(item.id)">
					<view class="contentTitle" :class="checkType==item.id?'current':''">{{item.title}}</view>
					<view class="checkLine" v-show="checkType==item.id"></view>
				</view>
			</view>
			<view class="scrollBox" v-show="checkType==0">
				<view class="contentInner1" v-for="(item,index) in keyList" :key="index" @click="lookPeople">
					<view class="contentOuter1">{{item.name}}</view>
					<view class="contentOuter2">
						<view>{{item.num}}人</view>
						<image class="next" src="@/static/juming/next.png"></image>
					</view>
				</view>
			</view>
			<view class="scrollBox" v-show="checkType==1">
				<view v-if="customList.length>0">
					<view class="contentInner1" v-for="(item,index) in customList" :key="index" @click="lookPeople">
						<view class="contentOuter1">{{item.name}}</view>
						<view class="contentOuter2">
							<view>{{item.num}}人</view>
							<image class="next" src="@/static/juming/next.png"></image>
						</view>
					</view>
					<view class="addBox" @click="goCreate()">
						<image src="@/static/juming/adds.png"></image>
						<view>添加</view>
					</view>
				</view>
				<view v-else class="noCustomList">
					<image class="none" src="@/static/juming/none.png"></image>
					<view class="noTitle">暂无群组，快去创建吧</view>
					<button @click="goCreate()">去创建</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				adminTypeList:[
					{
						title:'重点人群',
						id:0,
					},
					{
						title:'自定义群组',
						id:1,
					}
				],
				checkType:0,//选中的类型
				keyList:[
					{
						name:'0-6岁儿童',
						num:8,
						id:0,
					},
					{
						name:'孕产妇',
						num:1,
						id:1,
					},
					{
						name:'慢病人群',
						num:5,
						id:2,
					},
					{
						name:'老年人群',
						num:2,
						id:3,
					},
				],
				customList:[
					{
						name:'大于或等于65岁老人',
						num:8,
						id:0,
					},
					{
						name:'高血压人群',
						num:1,
						id:1,
					},
					{
						name:'纳入计划生育家庭特别扶助制度的独生子女伤残或死亡家庭的夫妻',
						num:5,
						id:2,
					},
				],
			}
		},
		methods: {
			changeType(id){
				this.checkType=id;
			},
			goCreate(){
				uni.navigateTo({
				    url: '/pages/bsoftMedical/dwellings/custom-list'
				});
			},
			lookPeople(){
				uni.navigateTo({
				    url: '/pages/bsoftMedical/dwellings/people-list'
				});
			},
			notYet(){
				uni.showToast({
				    title: '功能完善中',
				    duration: 2000,
					icon:'none'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.warp {
		font-size: 30upx;
		width: 100%;
		height: 100%;
		background-color: #fff;
		.headerBox {
			height:308upx;
			padding: 44upx 52upx;
			border-bottom: 20upx solid #F2F4F9;
			display: flex;
			justify-content: space-between;
			.headerInner1{
				height: 200upx;
				width: 300upx;
				background: linear-gradient(120deg,#6ee07f,#3dd096);
				border-radius: 20upx;
				padding: 0 28upx;
				display: flex;
				flex-direction: column;
				.outer1{
					flex: 1;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					.imgBox{
						display: flex;
						justify-content: center;
						align-items: center;
						background: #fff;
						width: 52upx;
						height: 52upx;
						border-radius: 50%;
						.referral_track{
							width:29upx;
							height: 26upx;
						}
						.diagnos_track{
							width:29upx;
							height: 29upx;
						}
					}
					
				}
				.outer2{
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
					color: #FEFEFE;
					font-size: 34upx;
				}
			}
			.headerInner2{
				background: linear-gradient(120deg,#82c5ff,#3c95eb);
			}
			
		}

		.contentBox {
			.swiperBox {
				height: 90upx;
				display: flex;
				padding: 0 36upx;
				.contentList{
					margin-right: 50upx;
					position: relative;
					.contentTitle{
						color: #07103C;
						font-size: 28upx;
						line-height: 90upx;
					}
					.current{
						color: #027BFD;
						font-size: 36upx;
					}
					.checkLine{
						width: 56upx;
						height: 6upx;
						border-radius: 3upx;
						background-color: #0084FD;
						position: absolute;
						bottom: 0;
						left: 20upx;
					}
				}
			}
			.scrollBox{
				width: 100%;
				padding: 20upx 24upx 0;
				position: absolute;
				left: 0;
				top:398upx;
				height: calc(100% - 398upx);
				overflow-y: scroll;
				background: #fff;
				.contentInner1{
					min-height: 120upx;
					margin-bottom: 20upx;
					border:1upx solid rgba(239,240,241,1);
					box-shadow:0upx 2upx 12upx 0upx rgba(194,195,199,0.2);
					border-radius:10upx;
					padding: 40upx 30upx;
					display: flex;
					.contentOuter1{
						display: flex;
						justify-content: flex-start;
						align-items: center;
						flex: 3;
					}
					.contentOuter2{
						flex: 1;
						display: flex;
						justify-content: flex-end;
						align-items: center;
						view{
							color: #0084FD;
							font-size: 30upx;
							
						}
						.next{
							width:12upx ;
							height:21upx ;
							margin-left: 18upx;
						}
					}
				}
				.addBox{
					border:2upx solid rgba(185,220,255,1);
					box-shadow:0upx 6upx 16upx 0upx rgba(105,152,238,0.18);
					border-radius:10upx;
					height: 120upx;
					display: flex;
					justify-content: center;
					align-items: center;
					color: #0084FD;
					font-size: 30upx;
					image{
						width: 36upx;
						height: 36upx;
						margin-right: 22upx;
					}
				}
				.noCustomList{
					display: flex;
					flex-direction: column;
					padding-top: 84upx;
					align-items: center;
					.none{
						width:253upx ;
						height: 192upx;
						margin-bottom: 66upx;
					}
					.noTitle{
						color: #AAAAAA;
						font-size: 24upx;
						margin-bottom: 65upx;
					}
					button{
						width: 280upx;
						height: 64upx;
						border-radius: 29upx;
						background: #207EFA;
						color: #fff;
						font-size: 30upx;
						line-height: 64upx;
					}
					uni-button:after {
						display: none;
					}
				}
			}
		}
	}
</style>
