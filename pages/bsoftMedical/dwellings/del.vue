<template>
	<view class="wrap">
		<view class="contentBox" v-for="(item,index) in addList" :key="index">
			<view class="content">
				<view class="name">王自健</view>
				<view class="infoBox">
					<view class="inner1 inner3">年龄：36</view>
					<view class="inner1">性别：男</view>
					<view class="inner1 inner2">电话:13588886888</view>
				</view>
			</view>
			<view class="del">删除</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				addList:[
					{},{},{},{},{}
				]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap{
		font-size: 30upx;
		width: 100%;
		height: 100%;
		.contentBox{
			padding: 30upx 24upx 0;
			height: 140upx;
			background-color: #fff;
			margin-bottom: 2upx;
			position: relative;
			.content{
				width: 100%;
				height: 100%;
				.name{
					color: #07103C;
					font-size: 32upx;
					margin-bottom: 10upx;
				}
				.infoBox{
					display: flex;
					align-items: center;
					font-size: 24upx;
					color: #8B8C8F;
					.inner1{
						height: 100%;
						padding: 0 27upx;
						border-right: 2upx solid #eee;
					}
					.inner2{
						border: 0;
					}
					.inner3{
						padding-left: 0;
					}
				}
			}
			.del{
				height: 40upx;
				right: 24upx;
				position: absolute;
				top: 50%;
				margin-top: -20upx;
				line-height: 40upx;
				color: #FF5050;
				font-size: 30upx;
			}
		}
	}
</style>
