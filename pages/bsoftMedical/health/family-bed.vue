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
						<text class="label">姓名</text>
						<text class="context">王自健</text>
					</view>
					<view class="positionTag">
						<text class="label">性别</text>
						<text class="context">男</text>
					</view>
					<view>
						<text class="label">年龄</text>
						<text class="context">56</text>
					</view>
					<view>
						<text class="label">性质</text>
						<text class="context">医疗保险</text>
					</view>
					<view>
						<text class="label">医保卡号</text>
						<text class="context">64589512546</text>
					</view>
					<view>
						<text class="label">出生日期</text>
						<text class="context">1976-12-03</text>
					</view>
					<view>
						<text class="label">身份证</text>
						<text class="context">321321197602568791</text>
					</view>
					<view>
						<text class="label">地址</text>
						<text class="context paddingTag">广东省深圳市龙岗区园山街道荷坳社区长江埔路润竹园</text>
					</view>
					<view class="underlineTag">
						<text class="label">联系人</text>
						<text class="context">王自健</text>
					</view>
					<view>
						<text class="label">与本人关系</text>
						<text class="context">父子</text>
					</view>
					<view>
						<text class="label">联系电话</text>
						<text class="context">13566666666</text>
					</view>
			</view>
			<view class="opButton" v-if="isShowButton">
				<text class="refused">拒绝</text>
				<text class="agree" @click="isShowButton = false,isCollapse = true,isUnfold = true">同意</text>
			</view>
		</view>
		<view class="docWrite" v-if="!isShowButton">
			<view class="title">
				<image src="@/static/health/doc_edit.png"></image>
				<text class="titleText">医生填写</text>
			</view>
			<view class="writeContent">
				<view class="selectItem">
					<view class="uni-list-cell-left">
						病种选择
					</view>
					<view class="uni-list-cell-db">
						<picker @change="bindPickerChange" :value="sickIndex" :range="sickType">
							<view class="uni-input">{{sickType[sickIndex]}}</view>
						</picker>
					</view>
					<image src="@/static/health/next.png"></image>
				</view>
				<view class="writeContext">
					<view class="writeLabel">病情诊断</view>
					<view class="uni-textarea">
						<textarea placeholder-style="color:#B3B3B3" placeholder="请填写病情诊断"/>
					</view>
				</view>
				<view class="writeContext">
					<text class="writeLabel">病情摘要</text>
					<view class="uni-textarea">
						<textarea placeholder-style="color:#B3B3B3" placeholder="请填写病情摘要"/>
					</view>
				</view>
				<view class="writeContext">
					<text class="writeLabel">收治指征和建床意见</text>
					<view class="uni-textarea">
						<textarea placeholder-style="color:#B3B3B3" placeholder="请填写收治指征和建床意见"/>
					</view>
				</view>
			</view>
			<view class="selectGroup">
				<view class="selectItem">
					<view class="uni-list-cell-left">
						家床类型
					</view>
					<view class="uni-list-cell-db">
						<picker @change="bindPickerChange" :value="bedIndex" :range="bedType">
							<view class="uni-input">{{bedType[bedIndex]}}</view>
						</picker>
					</view>
					<image src="@/static/health/next.png"></image>
				</view>
				<view class="selectItem">
					<view class="uni-list-cell-left">
						开始日期
					</view>
					<view class="uni-list-cell-db">
						<picker @change="bindPickerChange" :value="startIndex" :range="startDate">
							<view class="uni-input">{{startDate[startIndex]}}</view>
						</picker>
					</view>
					<image src="@/static/health/next.png"></image>
				</view>
				<view class="selectItem borderTag">
					<view class="uni-list-cell-left">
						结束日期
					</view>
					<view class="uni-list-cell-db">
						<picker @change="bindPickerChange" :value="endIndex" :range="endDate">
							<view class="uni-input">{{endDate[endIndex]}}</view>
						</picker>
					</view>
					<image src="@/static/health/next.png"></image>
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
				sickType: ['请选择病种','癌症','肝功能障碍','新型肺炎'],
				bedType: ['请选择','舒适','一般','差劲'],
				startDate: ['请选择','2020-05-16','2020-05-17','2020-05-18'],
				endDate: ['请选择','2020-05-17','2020-05-18','2020-05-19'],
				sickIndex: 0,
				bedIndex: 0,
				startIndex: 0.,
				endIndex: 0
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
					width: 185upx;
				}
				.context {
					color: #ACB3C5;
				}
				.paddingTag.context {
					padding-left: 68upx;
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
				text {
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
			.selectItem {
				display: flex;
				position: relative;
				width: 100%;
				height: 95upx;
				line-height: 95upx;
				padding: 0upx 30upx;
				font-size: 30upx;
				border-bottom: 2upx solid  #F2F4F9;
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
			.selectItem.borderTag {
				border: none;
			}
			.writeContent {
				width: 100%;
				border-radius: 20upx;
				background-color: #ffffff;
			}
			.writeContext {
				width: 100%;
				padding: 34upx 20upx;
				.writeLabel {
					font-size: 30upx;
					color: #020221;
				}
				uni-textarea {
					margin-top: 34upx;
					width: 100%;
					height: 230upx;
					padding: 24upx;
					border-radius: 10upx;
					background-color: #F2F3F5;
					font-size: 28upx;
				}
			}
			.selectGroup {
				margin-top: 10upx;
				width: 100%;
				border-radius: 20upx;
				background-color: #ffffff;
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
