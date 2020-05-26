<template>
	<view class="warp">
		<view class="oneStep">
			<view class="banner1">
				<view class="bannerData">
					<view>采集人</view>
					<text>贾探春</text>
				</view>
				<view class="bannerData" style="border-bottom: 0;">
					<view>辨识人</view>
					<text>王熙凤</text>
				</view>
			</view>
			<view class="banner2">
				<view class="inner1" >
					<view class="inner1Title">望：</view>
					<view class="uni-textarea">
						<textarea auto-height="true" placeholder-style="color:#B7B6BB;font-size:30upx"  placeholder="请输入描述"/>
					</view>
				</view>
				<view class="inner1" >
					<view class="inner1Title">闻：</view>
					<view class="uni-textarea">
						<textarea auto-height="true" placeholder-style="color:#B7B6BB;font-size:30upx"  placeholder="请输入描述"/>
					</view>
				</view>
				<view class="inner1" >
					<view class="inner1Title">问：</view>
					<view class="uni-textarea">
						<textarea auto-height="true" placeholder-style="color:#B7B6BB;font-size:30upx"  placeholder="请输入描述"/>
					</view>
				</view>
				<view class="inner1" >
					<view class="inner1Title">切：</view>
					<view class="uni-textarea">
						<textarea auto-height="true" placeholder-style="color:#B7B6BB;font-size:30upx"  placeholder="请输入描述"/>
					</view>
				</view>
				<view class="inner1" >
					<view class="inner1Title">舌：</view>
					<view class="uni-textarea">
						<textarea auto-height="true" placeholder-style="color:#B7B6BB;font-size:30upx"  placeholder="请输入描述"/>
					</view>
				</view>
				<view class="inner1" style="border-bottom: 0;">
					<view class="inner1Title">苔：</view>
					<view class="uni-textarea">
						<textarea auto-height="true" placeholder-style="color:#B7B6BB;font-size:30upx"  placeholder="请输入描述"/>
					</view>
				</view>
			</view>
			<view class="oneFooter">
				<view class="oneBtn" @click="question">下一步</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				listId:'',
			}
		},
		methods:{
			question(){
				uni.navigateTo({
				    url: '/pages/bsoftMedical/health/question-manage?id='+this.listId
				});
			}
		},
		onLoad(option){
			this.listId = option.id;
		},
	}
</script>

<style lang="scss" scoped>
.warp{
	height: 100%;
	width: 100%;
	.oneStep{
		position: relative;
		padding-bottom:148upx ;
		.banner1{
			padding: 0 24upx;
			background: #fff;
			margin-bottom: 20upx;
			.bannerData{
				width: 100%;
				height: 93upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1upx solid #E0E4EF;
				color: #07103C;
				font-size: 28upx;
				text{
					color: #999999;
				}
			}
		}
		.banner2{
			padding: 0 24upx;
			background: #fff;
			.inner1{
				width: 100%;
				border-bottom: 1upx solid #E0E4EF;
				padding: 40upx 0 36upx;
				color: #020221;
				font-size: 26upx;
				.inner1Title{
					margin-bottom: 10upx;
				}
				.uni-textarea{
					width:100%;
					uni-textarea{
						width: 100%;
						font-size: 30upx;
					}
				}
			}
		}
		.oneFooter{
			height: 148upx;
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			.oneBtn{
				margin: 30upx 24upx;
				height:88upx;
				background:rgba(0,132,253,1);
				border-radius:44upx;
				font-size: 36upx;
				color: #fff;
				text-align: center;
				line-height: 88upx;
			}
		}
	}
}
</style>
