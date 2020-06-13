<template>
	<view class="wrap">
		<view class="banner1">健康档案数量</view>
		<view class="banner2">
			<view class="inner1"  @click="goHealthFile('1')">
				<view class="outer1">
					<image src="@/static/health/file2.png"></image>
					<view>健康档案</view>
				</view>
				<image class="outer2" src="@/static/health/next.png"></image>
			</view>
			<view class="inner2">
				<view class="outer3">
					<view class="outer4">有效数量</view>
					<view class="num">11452</view>
					<view class="line"></view>
				</view>
				<view class="outer3">
					<view class="outer4">无效数量</view>
					<view class="num" style="color: #00C0B1;">16460</view>
				</view>
			</view>
		</view>
		<view class="banner1">专案数量</view>
		<view class="banner3">
			<view class="listBox" >
				<view class="listContent">
					<view class="listHeader" @click="goHealthFile('2')">
						<view class="outer1">
							<image src="@/static/health/hypertension.png"></image>
							<view>高血压</view>
						</view>
						<image class="outer2" src="@/static/health/next.png"></image>
					</view>
					<view class="listNumBox">
						<view class="listT">有效数量</view>
						<view class="listNum1">803</view>
					</view>
					<view class="listNumBox">
						<view class="listT">无效数量</view>
						<view class="listNum2">111</view>
					</view>
				</view>
			</view>	
			<view class="listBox" >
				<view class="listContent">
					<view class="listHeader" @click="goHealthFile('3')">
						<view class="outer1">
							<image src="@/static/health/diabetes.png"></image>
							<view>糖尿病</view>
						</view>
						<image class="outer2" src="@/static/health/next.png"></image>
					</view>
					<view class="listNumBox">
						<view class="listT">有效数量</view>
						<view class="listNum1">311</view>
					</view>
					<view class="listNumBox">
						<view class="listT">无效数量</view>
						<view class="listNum2">49</view>
					</view>
				</view>
				
			</view>	
			<view class="listBox" >
				<view class="listContent">
					<view class="listHeader" @click="goHealthFile('7')">
						<view class="outer1">
							<image src="@/static/health/old.png"></image>
							<view>老年人</view>
						</view>
						<image class="outer2" src="@/static/health/next.png"></image>
					</view>
					<view class="listNumBox">
						<view class="listT">有效数量</view>
						<view class="listNum1">1454</view>
					</view>
					<view class="listNumBox">
						<view class="listT">无效数量</view>
						<view class="listNum2">120</view>
					</view>
				</view>
			</view>
			<view class="listBox" >
				<view class="listContent">
					<view class="listHeader" @click="goHealthFile('4')">
						<view class="outer1">
							<image src="@/static/health/pregnant.png"></image>
							<view>孕产妇</view>
						</view>
						<image class="outer2" src="@/static/health/next.png"></image>
					</view>
					<view class="listNumBox">
						<view class="listT">有效数量</view>
						<view class="listNum1">暂无</view>
					</view>
					<view class="listNumBox">
						<view class="listT">无效数量</view>
						<view class="listNum2">暂无</view>
					</view>
				</view>
			</view>	
			<view class="listBox" >
				<view class="listContent">
					<view class="listHeader" @click="goHealthFile('5')">
						<view class="outer1">
							<image src="@/static/health/child.png"></image>
							<view>儿童</view>
						</view>
						<image class="outer2" src="@/static/health/next.png"></image>
					</view>
					<view class="listNumBox">
						<view class="listT">有效数量</view>
						<view class="listNum1">暂无</view>
					</view>
					<view class="listNumBox">
						<view class="listT">无效数量</view>
						<view class="listNum2">暂无</view>
					</view>
				</view>
			</view>	
			<view class="listBox" >
				<view class="listContent">
					<view class="listHeader" @click="goHealthFile('6')">
						<view class="outer1">
							<image src="@/static/health/tuberculos.png"></image>
							<view>肺结核</view>
						</view>
						<image class="outer2" src="@/static/health/next.png"></image>
					</view>
					<view class="listNumBox">
						<view class="listT">有效数量</view>
						<view class="listNum1">暂无</view>
					</view>
					<view class="listNumBox">
						<view class="listT">无效数量</view>
						<view class="listNum2">暂无</view>
					</view>
				</view>
			</view>	
				
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			goHealthFile(id){
				if(id=='4' || id=='5' || id=='6'){
					uni.showToast({
					    title: '功能完善中',
					    duration: 2000,
						icon:'none'
					});
				}else{
					uni.navigateTo({
					    url: '/pages/bsoftMedical/health/health-file?id='+id
					});
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	page{
		 height: 100%;
		 background: #fff;
	}
	.wrap{
		width: 100%;
		font-size: 30upx;
		.outer1{
			display: flex;
			align-items: center;
			image{
				margin-right: 22upx;
				width: 29upx;
				height: 30upx;
			}
			view{
				color: #07103C;
				font-size: 34upx;
			}
		}
		
		.outer2{
			width: 10upx;
			height: 18upx;
		}
		.banner1{
			padding-left: 22upx;
			height: 86upx;
			line-height: 86upx;
			font-size: 38upx;
			color: #07103C;
			font-weight:bold;
		}
		.banner2{
			margin: 0 24upx 60upx;
			box-shadow:0upx 2upx 18upx 0upx rgba(141,154,177,0.25);
			border-radius:20upx;
			height: 180upx;
			display: flex;
			flex-direction: column;
			.inner1{
				flex: 1;
				padding: 0 30upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			.inner2{
				flex: 1;
				display: flex;
				.outer3{
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
					position: relative;
					.outer4{
						color: #B9BEDA;
						font-size: 24upx;
						margin-right: 18upx;
					}
					.num{
						color: #0084FD;
						font-size: 48upx;
					}
					.line{
						position: absolute;
						right: 0;
						top:50%;
						margin-top:-15upx;
						width:2upx;
						height:30upx;
						background:rgba(228,230,235,1);
					}
				}
			}
		}
		.banner3{
			display: flex;
			flex-wrap: wrap;
			.listBox{
				width: 50%;
				display: flex;
				justify-content: center;
				align-items: center;
				.listContent{
					width:336upx;
					height:290upx;
					box-shadow:0upx 2upx 18upx 0upx rgba(141,154,177,0.25);
					border-radius:20upx;
					margin-bottom: 32upx;
					padding: 40upx 30upx 0;
					.listHeader{
						height: 40upx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-bottom: 60upx;
					}
					.listNumBox{
						width: 100%;
						display: flex;
						height: 60upx;
						align-items: center;
						.listT{
							color: #B9BEDA;
							font-size: 24upx;
							margin-right: 10upx;
						}
						.listNum1{
							color: #0084FD;
							font-size: 48upx;
						}
						.listNum2{
							color: #00C0B1;
							font-size: 34upx;
						}
					}
				}
			}
		}
	}
</style>
