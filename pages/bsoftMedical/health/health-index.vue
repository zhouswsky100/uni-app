<template>
	<view class="warp">
		<view class="bannerBox">
			<image class="banner" mode="heightFix" src="@/static/health/banner.png"></image>
		</view>
		<view class="headerBox">
			<view class="headerInner1" @click="goFamilyDoc">
				<image class="check" src="@/static/health/check.png"></image>
				<view class="headerTitle">家医审核<view class="dataBox">11</view></view>
			</view>
			<view class="headerInner1">
				<image  class="check" src="@/static/health/exchange.png"></image>
				<view class="headerTitle">在线交流<view class="dataBox">11</view></view>
			</view>
		</view>
		<view class="contentBox">
			<view class="contentbox">
				<view class="contentInner1" @click="goPatien()">
					<image class="file" src="@/static/health/file.png"></image>
					<view class="contentTitle">病人档案</view>
				</view>
				<view class="contentInner1" @click="goManage()">
					<image class="file" src="@/static/health/follow_up.png"></image>
					<view class="contentTitle">随访管理</view>
				</view>
				<view class="contentInner1">
					<image class="file" src="@/static/health/home_sickbed.png"></image>
					<view class="contentTitle">家庭病床</view>
				</view>
				<view class="contentInner1" @click="noticeInfo()">
					<image class="file" src="@/static/health/inform.png"></image>
					<view class="contentTitle">通知居民</view>
				</view>
				<view class="contentInner1">
					<image class="file" src="@/static/health/health_data.png"></image>
					<view class="contentTitle">健康数据</view>
				</view>
				<view class="contentInner1">
					<image class="file" src="@/static/health/health_activitie.png"></image>
					<view class="contentTitle">健康活动</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				
			}
		},
		methods:{
			goPatien(){
				uni.navigateTo({
				    url: '/pages/bsoftMedical/health/patien-file'
				});
			},
			goManage(){
				uni.navigateTo({
				    url: '/pages/bsoftMedical/health/manage'
				});
			},
			goFamilyDoc() {
				uni.navigateTo({
				    url: '/pages/bsoftMedical/health/family-doc-index'
				});
			},
			noticeInfo(){
				uni.navigateTo({
				    url: '/pages/bsoftMedical/health/dnotice'
				});
			},
		}
	} 
</script>

<style scoped lang="scss">
.warp {
	font-size: 30upx;
	width: 100%;
	height: 100%;
	background-color: #fff;
	.bannerBox{
		padding: 0 24upx 30upx;
		height: 330upx;
		.banner{
			height: 300upx;
			width: 702upx;
			border-radius: 10upx;
		}
	}
	.headerBox{
		border-top:20upx solid #F2F4F9;
		border-bottom:20upx solid #F2F4F9;
		height: 168upx;
		display: flex;
		.headerInner1{
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			.check{
				width: 104upx;
				height: 104upx;
				margin: 16upx 10upx 0 40upx;
			}
			.headerTitle{
				color: #000;
				font-size: 30upx;
				position: relative;
				font-weight:500;
				.dataBox{
					position: absolute;
					padding: 8upx 10upx;
					border-radius: 15px;
					background: #FF3334;
					color: #fff;
					font-size: 20upx;
					top:-32upx;
					left: -44upx;
				}
			}
		}
	}
	.contentBox{
		width: 100%;
		position: absolute;
		left: 0;
		top:498upx;
		height: calc(100% - 498upx);
		overflow-y: scroll;
		background: #fff;
		.contentbox{
			padding-top: 72upx;
			display: flex;
			flex-wrap: wrap;
			.contentInner1{
				width: 50%;
				height: 64upx;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: 68upx;
				.file{
					width: 64upx;
					height: 64upx;
					margin-right: 32upx;
					margin-left: -28upx;
				}
				.contentTitle{
					color: #333333;
					font-size: 26upx;
				}
			}
		}
	}
	
}
</style>
