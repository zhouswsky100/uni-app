<template>
	<view class="wrap">
		<view :class="[isUnfold?'transCard messageCard':'messageCard']">
			<view class="title">
				<image src="@/static/health/doc_note.png"></image>
				<span class="titleText">病人基本信息</span>
				<view class="collapseBtn" v-if="isCollapse" @click="isUnfold = !isUnfold">
					<span v-if="isUnfold">展开</span>
					<span v-if="!isUnfold">收起</span>
					<image :class="[isUnfold?'':'transUnfold']" src="@/static/my/unfold.png"></image>
				</view>
			</view>
			<view :class="[isUnfold?'content transCont':'content']">
				<ul>
					<li class="positionTag">
						<span class="label">姓名</span>
						<span class="context">王自健</span>
						<span class="tips">健康档案</span>
					</li>
					<li class="positionTag">
						<span class="label">性别</span>
						<span class="context">男</span>
						<span class="tips">随访记录</span>
					</li>
					<li>
						<span class="label">年龄</span>
						<span class="context">56</span>
					</li>
					<li>
						<span class="label">电话</span>
						<span class="context">13888888888</span>
					</li>
					<li>
						<span class="label">地址</span>
						<span class="context">广东省深圳市龙岗区园山街道荷坳社区长江埔路润竹园</span>
					</li>
					<li class="underlineTag">
						<span class="label">签约机构</span>
						<span class="context">景田社康中心</span>
					</li>
					<li>
						<span class="label">签约团队</span>
						<span class="context">陈永清家医团队</span>
					</li>
				</ul>
			</view>
			<view class="opButton" v-if="isShowButton">
				<span class="refused">拒绝</span>
				<span class="agree" @click="isShowButton = false,isCollapse = true">同意</span>
			</view>
		</view>
		<view class="docWrite" v-if="!isShowButton">
			<view class="title">
				<image src="@/static/health/doc_edit.png"></image>
				<span class="titleText">医生填写</span>
			</view>
			<view class="peopleType">
				<view class="uni-list-cell-left">
					人群分类
				</view>
				<view class="uni-list-cell-db">
					<picker @change="bindPickerChange" :value="index" :range="peopleData">
						<view class="uni-input">{{peopleData[index]}}</view>
					</picker>
				</view>
				<image src="@/static/health/next.png"></image>
			</view>
			<view class="agreement">
				<image v-if="isShowCheck" src="@/static/health/checked.png" @click="isShowCheck=!isShowCheck"></image>
				<view v-if="!isShowCheck" class="unCheck" @click="isShowCheck=!isShowCheck"></view>
				<view class="link">
					同意<span>《家庭医生服务协议》</span>
				</view>
			</view>
			<view class="submitBtn">
				提交
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isCollapse: false,
				isShowButton: true,
				isUnfold: false,
				isShowCheck: true,
				peopleData: ['请选择','老师','律师','工人'],
				index: 0
			}
		},
		methods: {
			bindPickerChange: function(e) {
				this.index = e.target.value
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
		ul {
			padding: 0 0;
		}
		li {
			list-style: none;
		}
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
				width: 500upx;
				font-size: 34upx;
			}
		}
		.messageCard.transCard {
			height: 100upx;
		}
		.messageCard {
			width: 100%;
			border-radius: 20upx;
			background-color: #ffffff;
			overflow: hidden;
			transition: height 0.5s linear;
			.title {
				.collapseBtn {
					font-size: 24upx;
					color: #898894;
					uni-image {
						width: 22upx;
						height: 13upx;
						margin-left: 9upx;
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
				li {
					display: flex;
					justify-content: flex-start;
					padding: 16upx 0upx;
				}
				li:last-child {
					padding: 0 0;
				}
				li.positionTag {
					position: relative;
				}
				.label {
					width: 155upx;
				}
				.context {
					color: #ACB3C5;
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
				span {
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
				.uni-list-cell-left {
					width: 25%;
					color: #020221;
				}
				.uni-list-cell-db {
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
					border: 2upx solid #ACB3C5;
					box-sizing: border-box;
					background-color: #FFFFFF;
					border-radius: 50%;
				}
				uni-image {
					width: 32upx;
					height: 32upx;
					margin-right: 12upx;
				}
				span {
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
	}
	
</style>
