<template>
	<view class="warp">
		<view class="headerBox">
			<view class="headerCont">
				<view class="headerInner1" style="margin-bottom: 20upx;">
					<view class="name">王自健</view>
					<view>男</view>
				</view>
				<view class="headerInner1">身份证：362421199603030319</view>
				<view class="headerInner1">电话：13537752703</view>
			</view>
		</view>
		<view class="contentBox">
			<view class="content" v-for="(item,index) in dataList" :key="index">
				<view class="left">
					<view class="year">{{item.year}}</view>
					<view class="month">{{item.month}}</view>
					<view class="roundBox"></view>
					<view class="roundBox2"></view>
					<view class="roundBox3"></view>
				</view>
				<view class="right" @click="goDetail()">
					<view class="contentInner1">
						<view class="contentOuter1">{{item.serviceName}}</view>
						<view class="contentOuter2">详情<image src="@/static/health/next_a.png"></image></view>
					</view>
					<view class="contentInner2">服务机构：{{item.organ}}</view>
					<view class="contentInner2">服务医生：{{item.doctor}}</view>
					<view class="contentInner2">服务结果：{{item.result}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default{
	data(){
		return{
			dataList:[
				{
					year:'2019',
					month:'07/01',
					serviceName:'高血压随访',
					organ:'桥东社康中心',
					doctor:'张医生',
					result:'控制度满意',
					id:'0'
				},
				{
					year:'2019',
					month:'06/01',
					serviceName:'高血压随访',
					organ:'桥东社康中心',
					doctor:'林医生',
					result:'控制度满意',
					id:'1'
				},
				{
					year:'2019',
					month:'01/01',
					serviceName:'高血压随访',
					organ:'桥东社康中心',
					doctor:'刘医生',
					result:'控制度满意',
					id:'2'
				},
				{
					year:'2018',
					month:'07/01',
					serviceName:'高血压随访',
					organ:'桥东社康中心',
					doctor:'杨医生',
					result:'控制度满意',
					id:'3'
				},
				{
					year:'2017',
					month:'07/01',
					serviceName:'高血压随访',
					organ:'桥东社康中心',
					doctor:'刘医生',
					result:'控制度满意',
					id:'4'
				},
			],
		}
	},
	methods:{
		goDetail(){
			uni.showToast({
			    title: '功能完善中',
			    duration: 2000,
				icon:'none',
			});
		}
	}
}
</script>

<style lang="scss" scoped>
page{
	height: 100%;
	background: #fff;
}
.warp{
	width: 100%;
	padding: 0 24upx;
	height: 100%;
	background: #fff;
	.headerBox{
		background-image: url(@/static/health/bg.png);
		background-size: 100%;
		background-repeat: no-repeat;
		width: 702upx;
		height: 210upx;
		margin-bottom: 72upx;
		.headerCont{
			padding-top: 30upx;
			padding-left: 40upx;
			color: #D8E6FF;
			font-size: 26upx;
			.headerInner1{
				display: flex;
				align-items: center;
				margin-bottom: 10upx;
				.name{
					font-weight:bold;
					font-size: 34upx;
					color: #fff;
					margin-right:30upx ;
				}
			}
		}
		
	}
	.contentBox{
		width: 100%;
		.content{
			display: flex;
			.left{
				flex: 1;
				border-right: 2upx solid #EDF3F5;
				position: relative;
				.year{
					width: 100%;
					color: #182066;
					font-size: 32upx;
					margin-bottom: 30upx;
				}
				.month{
					width: 100%;
					color: #5D6596;
					font-size: 24upx;
					padding-left: 7upx;
				}
				.roundBox{
					position: absolute;
					top: 0;
					right: -21upx;
					width:40upx;
					height:40upx;
					background:rgba(84,220,164,1);
					opacity:0.1;
					border-radius:50%;
					z-index: 2;
				}
				.roundBox2{
					position: absolute;
					top: 8upx;
					right: -13upx;
					width:24upx;
					height:24upx;
					background:rgba(84,220,164,1);
					opacity:0.2;
					border-radius:50%;
					z-index: 3;
				}
				.roundBox3{
					position: absolute;
					top: 14upx;
					right: -7upx;
					width:12upx;
					height:12upx;
					background:rgba(84,220,164,1);
					border-radius:50%;
					z-index: 4;
				}
			}
			.right{
				width: 535upx;
				height: 218upx;
				background:rgba(238,243,249,1);
				border-radius:10upx 10upx 10upx 0upx;
				margin: 0 30upx 40upx 33upx;
				padding: 26upx 30upx 0;
				.contentInner1{
					display: flex;
					justify-content: space-between;
					color: #182066;
					margin-bottom: 16upx;
					.contentOuter1{
						font-size: 30upx;
					}
					.contentOuter2{
						display: flex;
						align-items: center;
						font-size: 24upx;
						image{
							width: 12upx;
							height: 22upx;
							margin-left: 14upx;
						}
					}
				}
				.contentInner2{
					color: #5D6596;
					font-size: 24upx;
					margin-bottom: 6upx;
				}
			}
		}
	}
}
</style>
