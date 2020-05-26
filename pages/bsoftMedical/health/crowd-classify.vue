<template>
	<view class="wrap">
		<view class="content">
			<view class="classify">
				<view class="title">
					人群分类
				</view>
				<view class="tagItemBox">
					<view class="tagItem" v-for="(item,index) in clssifyData">{{item}}</view>
				</view>
			</view>
			<view class="group">
				<view class="title">
					自定义群组
				</view>
				<view class="tagItemBox">
					<view class="tagItem" v-for="(item,index) in groupData">{{item}}</view>
					<view class="tagItem addBtn">
						<image src="@/static/juming/adds.png"></image>
						<view @click="addGroup">添加</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottomBar">
			<view class="resetBtn">重置</view>
			<view class="submitBtn">確定</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				clssifyData: ['大于或等于65岁老人','高血压人群','孕产妇','重性精神病患者','肺结核患者','残疾人群','计生特殊家庭','0-6岁儿童','0-6岁儿童','0-6岁儿童','非重点人群','纳入计划生育家庭特别扶助制度重点项目'],
				groupData: ['积极活跃', '依从性低']
			}
		},
		onLoad() {
			// let _this = this
			// _this.clssifyData.forEach(item=>{
			// 	if(item.length>14){
			// 		item.
			// 	}
			// })
		},
		methods:{
			addGroup() {
				uni.navigateTo({
				    url: '/pages/bsoftMedical/health/add-group'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		height: 100%;
		background: #ffffff;
	}
	.wrap {
		padding: 60upx 24upx;
		.content {
			padding-bottom: 100upx;
		}
		.title {
			font-size: 34upx;
			color: #07103C;
			margin-bottom: 37upx;
			font-weight: 600;
		}
		.tagItemBox {
			display: flex;
			flex-wrap: wrap;
			.tagItem {
				padding: 23upx 28upx;
				background-color: #FAFAFA;
				border-radius: 36upx;
				text-align: center;
				color: #07103C;
				font-size: 26upx;
				margin-bottom: 30upx;
				margin-right: 20upx;
				box-sizing: border-box;
			}
		}
		.group {
			margin-top: 30upx;
			.addBtn {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 180upx;
				color: #0084FD;
				border: 1upx solid #0084FD;
				background-color: #F9FCFF;
				uni-image {
					width: 24upx;
					height: 24upx;
					margin-right: 6upx;
				}
			}
		}
		.bottomBar {
			position: fixed;
			display: flex;
			bottom: 0upx;
			left: 0upx;
			padding: 26upx 25upx;
			width: 100%;
			border-top: 1upx solid #ECECEC;
			background-color: #ffffff;
			.resetBtn,.submitBtn {
				height: 88upx;
				line-height: 88upx;
				color: #07103C;
				border-radius: 44upx;
				text-align: center;
				font-size: 32upx;
			}
			.resetBtn {
				width: 220upx;
				background-color: #F5F5F5;
				margin-right: 31upx;
			}
			.submitBtn {
				width: 450upx;
				color: #ffffff;
				background-color: #0084FD;
			}
		}
	}
</style>
