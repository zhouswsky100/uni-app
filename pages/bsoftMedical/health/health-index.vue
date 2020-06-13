<template>
	<view class="warp">
		<view class="bannerBox">
			<image class="banner" src="@/static/health/banner.png"></image>
		</view>
		<view class="headerBox">
			<view class="headerInner1" @click="goFamilyDoc">
				<image class="check" src="@/static/health/check.png"></image>
				<view class="headerTitle">家医审核<view class="dataBox">11</view></view>
			</view>
			<view class="headerInner1" @click="online">
				<image  class="check" src="@/static/health/exchange_online.png"></image>
				<view class="headerTitle">在线交流<view class="dataBox">11</view></view>
			</view>
		</view>
		<view class="quickBox">
			<view class="quick" @click="goPatien()">
				<view class="quickImgBox">
					<image class="quickImg" style="width:48upx ;height: 49upx;" src="@/static/health/sick_file.png"></image>
				</view>
				<view class="quickTitle">病人档案</view>
			</view>
			<view class="quick" @click="goManage()">
				<view class="quickImgBox">
					<image class="quickImg" style="width:48upx ;height: 42upx;" src="@/static/health/followup_manage.png"></image>
				</view>
				<view class="quickTitle">随访管理</view>
			</view>
			<view class="quick"  @click="noticeInfo()">
				<view class="quickImgBox">
					<image class="quickImg" style="width:54upx ;height: 39upx;" src="@/static/health/infor.png"></image>
				</view>
				<view class="quickTitle">居民通知</view>
			</view>
		</view>
		<view class="contentBox">
			<view class="contentH2">常用功能</view>
			<view class="contentbox">
				<view class="contentInner1" @click="familybed()">
					<image class="file" src="@/static/health/home_sickbed.png"></image>
					<view class="contentTitle">家庭病床</view>
				</view>
				<view class="contentInner1" @click="healthData()">
					<image class="file" src="@/static/health/health_data.png"></image>
					<view class="contentTitle">健康数据</view>
				</view>
				<view class="contentInner1" @click="healthActivity()">
					<image class="file" src="@/static/health/health_activitie.png"></image>
					<view class="contentTitle">健康活动</view>
				</view>
				<view class="contentInner1" @click="referralTracking()">
					<image class="file" src="@/static/health/referral_track.png"></image>
					<view class="contentTitle">转诊跟踪</view>
				</view>	
				<view class="contentInner1" @click="clinicTracking()">
					<image class="file" src="@/static/health/diagnos_track.png"></image>
					<view class="contentTitle">诊疗跟踪</view>
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
			online(){
				//在线交流
				uni.showToast({
				    title: '功能完善中',
				    duration: 2000,
					icon:'none'
				});
			},
			familybed(){
				//家庭病床
				uni.showToast({
				    title: '功能完善中',
				    duration: 2000,
					icon:'none'
				});
			},
			healthData(){
				//健康数据
				uni.showToast({
				    title: '功能完善中',
				    duration: 2000,
					icon:'none'
				});
			},
			healthActivity(){
				//健康活动
				uni.showToast({
				    title: '功能完善中',
				    duration: 2000,
					icon:'none'
				});
			},
			referralTracking(){
				//转诊跟踪
				uni.showToast({
				    title: '功能完善中',
				    duration: 2000,
					icon:'none'
				});
			},
			clinicTracking(){
				//诊疗跟踪
				uni.showToast({
				    title: '功能完善中',
				    duration: 2000,
					icon:'none'
				});
			}
		}
	} 
</script>

<style scoped lang="scss">
page{
	height: 100%;
	background-color: #fff;
}
.warp {
	font-size: 30upx;
	width: 100%;
	height: 100%;
	.bannerBox{
		padding: 0 24upx ;
		margin-bottom: 12upx;
		.banner{
			height: 220upx;
			width: 702upx;
			border-radius: 10upx;
		}
	}
	.headerBox{
		height: 168upx;
		display: flex;
		width: 100%;
		margin-bottom: 20upx;
		box-shadow:  0 16upx 8upx -6upx  rgba(221,225,235,0.5);
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
	.quickBox{
		padding: 46upx 0 90upx;
		display: flex;
		.quick{
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			color: #30343D;
			font-size: 24upx;
			.quickImgBox{
				width: 60upx;
				height: 60upx;
				display: flex;
				justify-content: center;
				align-items: flex-start;
			}
		}
	}
	.contentBox{
		width: 100%;
		.contentH2{
			padding-left:24upx ;
			color: #020221;
			font-size: 34upx;
			font-weight: bold;
			margin-bottom: 30upx;
		}
		.contentbox{
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
