<template>
	<view class="warp">
		<view class="title">选择类型</view>
		<view class="contentBox">
			<view class="banner">
				<view class="imageBox">
					<image style="width:47upx ;height: 41upx;" src="@/static/health/announce.png"></image>
				</view>
				<view class="inner1">公告</view>
				<view class="inner2">自定义</view>
			</view>
			<view class="banner">
				<view class="imageBox">
					<image style="width:44upx ;height: 40upx;" src="@/static/health/community_health_inform.png"></image>
				</view>
				<view class="inner1">社康通知</view>
				<view class="inner2">模块</view>
			</view>
			<view class="banner">
				<view class="imageBox">
					<image style="width:40upx ;height: 41upx;" src="@/static/health/stop_clinic.png"></image>
				</view>
				<view class="inner1">停诊公告</view>
				<view class="inner2">模块</view>
			</view>
			<view class="banner" @click="noticeContent(1)">
				<view class="imageBox">
					<image style="width:43upx ;height: 41upx;" src="@/static/health/health_followup.png"></image>
				</view>
				<view class="inner1">健康随访</view>
				<view class="inner2">模块</view>
			</view>
			<view class="banner">
				<view class="imageBox">
					<image style="width:47upx ;height: 38upx;" src="@/static/health/health_education.png"></image>
				</view>
				<view class="inner1">健康教育</view>
				<view class="inner2">模块</view>
			</view>
			<view class="banner">
				<view class="imageBox">
					<image style="width:41upx ;height:40upx;" src="@/static/health/questionnaire.png"></image>
				</view>
				<view class="inner1">问卷调查</view>
				<view class="inner2">模块</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		methods:{
			noticeContent(id){
				uni.navigateTo({
				    url: '/pages/bsoftMedical/health/notice-content?type='+id,
					
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
.warp{
	width: 100%;
	height: 100%;
	.title{
		padding-left: 24upx;
		height: 107upx;
		line-height: 107upx;
		font-size:34upx;
		font-weight:bold;
		color:rgba(7,16,60,1);
	}
	.contentBox{
		padding: 0 14upx;
		display: flex;
		flex-wrap: wrap;
		.banner{
			margin: 0 10upx 20upx;
			width:220upx;
			height:256upx;
			background:rgba(255,255,255,1);
			box-shadow:0upx 6upx 26upx 0upx rgba(225,225,225,0.6);
			border-radius:30upx;
			display: flex;
			flex-direction: column;
			align-items: center;
			.imageBox{
				height: 41upx;
				width: 47upx;
				display: flex;
				align-items: flex-end;
				margin:78upx 0 20upx;
			}
			.inner1{
				color: #07103C;
				font-size: 30upx;
				margin-bottom: 10upx;
			}
			.inner2{
				color: #BCBDC1;
				font-size: 24upx;
			}
		}
	}
}	
</style>

