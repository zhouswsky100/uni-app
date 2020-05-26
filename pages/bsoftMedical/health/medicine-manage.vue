<template>
	<view>
		<medicine-navbar :back="true">
			<view slot="default">
				中医药健康管理
			</view>
		</medicine-navbar>
		<view class="content">
			<view class="mTitle">
				<view class="line"></view>测评
			</view>
			<view class="banner1">
				<view class="left">
					<image class="leftIcon" src="@/static/health/tcm_physique.png"></image>
					<view class="leftCont">
						<view class="outer1">中医体质辨识</view>
						<view class="outer2">体质状态及不同体质分类的特性</view>
					</view>
				</view>
				<view class="right">
					<view v-if="finishIdentify=='0'" class="toFinish" @click="goIdentify()">去完成</view>
					<image v-else class="done" src="@/static/health/stamp.png"></image>
				</view>
			</view>
			<view class="banner1">
				<view class="left">
					<image class="leftIcon" src="@/static/health/tcm_result.png"></image>
					<view class="leftCont">
						<view class="outer1">体质辨识结果</view>
						<view class="outer2">问卷调查结果</view>
					</view>
				</view>
				<view class="right">
					<view class="toFinish">查看</view>
				</view>
			</view>
			<view class="banner1">
				<view class="left">
					<image class="leftIcon" src="@/static/health/tcm_guide.png"></image>
					<view class="leftCont">
						<view class="outer1">中医药健康指导</view>
						<view class="outer2">辨识体质健康指导</view>
					</view>
				</view>
				<view class="right">
					<view class="toFinish">去完成</view>
					<!-- <image class="done" src="@/static/health/stamp.png"></image> -->
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	import medicineNavbar from "@/components/medicine-navbar.vue";
	export default {
		components: {
			medicineNavbar
		},
		data(){
			return{
				finishIdentify:'0',
				listId:''
			}
		},
		methods:{
			goIdentify(){
				uni.navigateTo({
				    url: '/pages/bsoftMedical/health/identify-manage?id='+this.listId
				});
			}
		},
		onLoad(option){
			this.listId = option.id;
			console.log(this.listId)
		},
		onShow(){
			const self = this;
			uni.getStorage({
			    key: 'finishIdentify',
			    success: function (res) {
					let storageData = res.data.split(',');
					if(storageData['0']==self.listId){
						self.finishIdentify = storageData['1']
					}else{
						self.finishIdentify='0';
					}
			        //this.finishIdentify = res.data
			    }
			});
		}
	}
</script>

<style lang="scss" scoped>
.content{
	width: 100%;
	position: fixed;
	top:360upx;
	left: 0;
	.mTitle{
		height: 115upx;
		padding: 0 24upx;
		display: flex;
		align-items: center;
		color: #020221;
		font-size: 30upx;
		.line{
			width:4upx;
			height:30upx;
			background:rgba(8,132,252,1);
			border-radius:2upx;
			margin-right: 8upx;
		}
	}
	.banner1{
		height:154upx;
		background:#fff;
		border-radius:20upx;
		padding: 0 24upx;
		margin: 0 24upx 20upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.left{
			display: flex;
			align-items: center;
			.leftIcon{
				width: 120upx;
				height: 120upx;
				margin-right: 20upx;
			}
			.leftCont{
				display: flex;
				flex-direction: column;
				.outer1{
					color: #020221;
					font-size: 30upx;
					margin-bottom: 6upx;
				}
				.outer2{
					color: #93A3B0;
					font-size: 24upx;
				}
			}
		}
		.right{
			.toFinish{
				width:128upx;
				height:60upx;
				background:rgba(8,132,252,1);
				border-radius:30upx;
				font-size:26upx;
				color: #fff;
				text-align: center;
				line-height: 60upx;
			}
			.done{
				width: 88upx;
				height: 88upx;
			}
		}
	}
}

</style>
