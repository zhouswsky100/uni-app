<template>
	<view class="wrap">
		<view :class="[isUnfold?'transCard messageCard':'messageCard']">
			<view class="title">
				<image src="@/static/health/doc_note.png"></image>
				<view class="titleText">病人基本信息</view>
				<view class="collapseBtn" v-if="isCollapse" @click="isUnfold = !isUnfold">
					<view v-if="isUnfold">展开</view>
					<view v-if="!isUnfold">收起</view>
					<image :class="[isUnfold?'':'transUnfold']" src="@/static/my/unfold.png"></image>
				</view>
			</view>
			<view :class="[isUnfold?'content transCont':'content']">
				<view class="positionTag">
					<view class="label">姓名</view>
					<view class="context">王自健</view>
					<view class="tips" @click="notYet">健康档案</view>
				</view>
				<view class="positionTag">
					<view class="label">性别</view>
					<view class="context">男</view>
					<view class="tips" @click="goRecord">随访记录</view>
				</view>
				<view>
					<view class="label">年龄</view>
					<view class="context">56</view>
				</view>
				<view>
					<view class="label">电话</view>
					<view class="context">13888888888</view>
				</view>
				<view>
					<view class="label">地址</view>
					<view class="context paddingTag">广东省深圳市龙岗区园山街道荷坳社区长江埔路润竹园</view>
				</view>
				<view class="underlineTag">
					<view class="label">签约机构</view>
					<view class="context">景田社康中心</view>
				</view>
				<view>
					<view class="label">签约团队</view>
					<view class="context">陈永清家医团队</view>
				</view>
			</view>
			<view class="opButton" v-if="isShowButton">
				<view class="refused" @click="refused">拒绝</view>
				<view class="agree" @click="isShowButton = false,isCollapse = true,isUnfold = true">同意</view>
			</view>
		</view>
		<view class="docWrite" v-if="!isShowButton">
			<view class="title">
				<image src="@/static/health/doc_edit.png"></image>
				<view class="titleText">医生填写</view>
			</view>
			<view class="peopleType" @click="goNextPage">
				<view class="text-left">
					人群分类
				</view>
				<view class="text-right">
					请选择
				</view>
				<image src="@/static/health/next.png"></image>
			</view>
			<view class="agreement">
				<image v-if="isShowCheck" src="@/static/health/checked.png" @click="isShowCheck=!isShowCheck"></image>
				<view v-if="!isShowCheck" class="unCheck" @click="isShowCheck=!isShowCheck"></view>
				<view class="link">
					同意<text>《家庭医生服务协议》</text>
				</view>
			</view>
			<view class="submitBtn">
				提交
			</view>
		</view>
		<uni-popup  ref="popup" type="bottom">
			<view class="addPharmacy">
				<view class="h2">拒绝原因</view>
				<view class="uni-textarea dialogTextarea">
					<textarea  maxlength="1000" @input="refusedInput" placeholder-style="color:#A5A8AF" placeholder="请填写拒绝原因"/>
					<view class="garyBox">{{titleLength}}/1000</view>
				</view>
				<view class="refusedButton" @click="refusedSubmit">提交</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
	    components: {uniPopup},
		data() {
			return {
				isCollapse: false,
				isShowButton: true,
				isUnfold: false,
				isShowCheck: true,
				peopleData: ['请选择','老师','律师','工人'],
				index: 0,
				titleLength:'0',
			}
		},
		methods: {
			bindPickerChange: function(e) {
				this.index = e.target.value
			},
			goNextPage() {
				uni.navigateTo({
				  url: '/pages/bsoftMedical/health/crowd-classify'
				})
			},
			goHealthArchive() {
				uni.navigateTo({
					url: '/pages/bsoftMedical/health/health-file?id=1'
				})
			},
			goRecord() {
				uni.navigateTo({
					url: '/pages/bsoftMedical/health/check-manage'
				})
			},
			notYet(){
				uni.showToast({
				    title: '功能完善中',
				    duration: 2000,
					icon:'none',
				});
			},
			refused(){
				this.$refs.popup.open()
			},
			refusedInput(e){
				
				this.titleLength = e.detail.value.length;
			},
			refusedSubmit(){
				this.$refs.popup.close()
			},
		}
	}
</script>

<style scoped lang="scss">
	page{
		height: 100%;
		background: #F8F9FF;
	}
	.wrap {
		width: 100%;
		padding: 20upx 24upx;
		font-size: 36upx;
		.title {
			display: flex;
			padding: 23upx 25upx;
			line-height: 48upx;
			uni-image {
				width: 44upx;
				height: 44upx;
				margin-right: 17upx;
			}
			.titleText {
				color: #223263;
				width: 75%;
				font-size: 34upx;
			}
		}
		.messageCard.transCard {
			height: 92upx;
		}
		.messageCard {
			width: 100%;
			border-radius: 20upx;
			background-color: #ffffff;
			overflow: hidden;
			// transition: height 0.5s linear;
			.title {
				.collapseBtn {
					display: flex;
					align-items: center;
					font-size: 24upx;
					color: #898894;
					uni-image {
						width: 22upx;
						height: 13upx;
						margin-left: 12upx;
						transition: all 0.2s;
					}
					.transUnfold {
						transform: rotateZ(-180deg);
					}
				}
			}
			.content.transCont {
				border-top: none;
			}
			.content {
				border-top: 2upx solid #EBEBEB;
				padding: 29upx 30upx;
				font-size: 30upx;
				& > uni-view {
					display: flex;
					justify-content: flex-start;
					padding: 16upx 0upx;
				}
				& > uni-view:last-child {
					padding: 0 0;
				}
				.positionTag {
					position: relative;
				}
				.label {
					width: 155upx;
				}
				.context {
					color: #ACB3C5;
				}
				.paddingTag.context {
					padding-left: 52upx;
				}
				.tips {
					position: absolute;
					right: 0;
					width: 140upx;
					height: 44upx;
					background-color: #EAF3FF;
					color: #0084FD;
					border-radius: 22upx;
					font-size: 24upx;
					text-align: center;
					line-height: 44upx;
				}
				.underlineTag {
					border-top: 2upx dashed #E3E7EC;
				}
			}
			.opButton {
				height: 108upx;
				display: flex;
				border-top: 2upx solid #EBEBEB;
				padding: 22upx 0upx; 
				box-sizing: border-box;
				.refused,.agree {
					display: inline-block;
					width: 210upx;
					height: 64upx;
					text-align: center;
					line-height: 64upx;
					border-radius: 32upx;
					margin-left: 84upx;
				}
				.refused {
					background-color: #EFF0F2;
				}
				.agree {
					background-color: #0084FD;
					color: #ffffff;
				}
			}
		}
		.docWrite {
			margin-top: 71upx;
			.peopleType {
				display: flex;
				position: relative;
				width: 100%;
				height: 95upx;
				background-color: #FFFFFF;
				border-radius: 20upx;
				line-height: 95upx;
				padding: 0upx 30upx;
				font-size: 30upx;
				.text-left {
					width: 25%;
					color: #020221;
				}
				.text-right {
					width: 75%;
					text-align: right;
					padding-right: 32upx ;
					color: #ACB3C5;
				}
				uni-image {
					position: absolute;
					width: 12upx;
					height: 22upx;
					right: 30upx;
					top: 50%;
					transform: translateY(-50%);
				}
			}
			.agreement {
				display: flex;
				margin-top: 31upx;
				font-size: 24upx;
				color: #444444;
				.unCheck {
					width: 32upx;
					height: 32upx;
					margin-right: 12upx;
					margin-top: 4upx;
					border: 2upx solid #ACB3C5;
					box-sizing: border-box;
					background-color: #FFFFFF;
					border-radius: 50%;
				}
				uni-image {
					width: 32upx;
					height: 32upx;
					margin-top: 4upx;
					margin-right: 12upx;
				}
				text {
					color: #0084FD;
				}
			}
			.submitBtn {
				margin-top: 71upx;
				width: 100%;
				height: 88upx;
				color: #FFFFFF;
				font-size: 34upx;
				line-height: 88upx;
				text-align: center;
				background-color: #0084FD;
				border-radius: 44upx;
			}
		}
		.addPharmacy{
			background:rgba(255,255,255,1);
			border-radius:20upx 20upx 0upx 0upx;
			width: 100%;
			padding: 88upx 24upx 37upx;
			.h2{
				width: 100%;
				color: #07103C;
				font-size: 44upx;
				margin-bottom: 30upx;
				font-weight:bold;
				
			}
			.dialogTextarea{
				background:rgba(242,243,245,1);
				border-radius:20upx;
				position: relative;
				margin-bottom: 55upx;
				uni-textarea{
					width: 100%;
					height: 210upx;
					padding: 30upx 24upx 50upx;
					color: #020221;
					font-size: 26upx;
				}
				.garyBox{
					position: absolute;
					bottom: 20upx;
					right: 30upx;
					color: #B5B5B5;
					font-size: 24upx;
				}
			}
			.refusedButton{
				width:500upx;
				height:78upx;
				background:rgba(0,132,253,1);
				border-radius:39upx;
				margin: 0 auto;
				line-height: 78upx;
				text-align: center;
				font-size: 34upx;
				color: #fff;
			}
		}
	}
	
</style>
