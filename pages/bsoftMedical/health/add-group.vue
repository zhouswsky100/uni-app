<template>
	<view class="wrap">
		<view class="title">
			群组名称
		</view>
		<input class="uni-input" type="text" @input="onKeyInput" placeholder="输入自定义群组名称" />
		<view class="saveBox">
			<view class="submitBtn" @click="saveGroupName">保存</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inputValue: ''
			}
		},
		methods:{
			onKeyInput(event) {
				this.inputValue = event.target.value
			},
			saveGroupName() {
				console.log('this.inputValue', this.inputValue)
				uni.navigateTo({
					url: '/pages/bsoftMedical/health/crowd-classify'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	page{
		height: 100%;
		background: #F8F9FF;
	}
	.wrap {
		.title {
			padding: 35upx 25upx;
			color: #838BA3;
		}
		.uni-input {
			font-size: 30upx;
			height: 108upx;
			padding-left: 25upx;
			background-color: #ffffff;
			.uni-input-placeholder {
				color: #CBCFD7;
			}
		}
		.saveBox {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 35upx 0upx;
			.submitBtn {
				width: 450upx;
				height: 88upx;
				line-height: 88upx;
				color: #07103C;
				border-radius: 44upx;
				text-align: center;
				font-size: 32upx;
				color: #ffffff;
				background-color: #0084FD;
			}
		}
	}
</style>
