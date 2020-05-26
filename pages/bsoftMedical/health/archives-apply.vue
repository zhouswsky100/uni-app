<template>
	<view class="wrap">
		<view :class="[isUnfold?'transCard messageCard':'messageCard']">
			<view class="title">
				<image src="@/static/health/doc_note.png"></image>
				<text class="titleText">病人基本信息</text>
				<view class="collapseBtn" v-if="isCollapse" @click="isUnfold = !isUnfold">
					<view v-if="isUnfold">展开</view>
					<view v-if="!isUnfold">收起</view>
					<image :class="[isUnfold?'':'transUnfold']" src="@/static/my/unfold.png"></image>
				</view>
			</view>
			<view :class="[isUnfold?'content transCont':'content']">
					<view>
						<text class="label">姓名</text>
						<text class="context">王自健</text>
					</view>
					<view>
						<text class="label">本人电话</text>
						<text class="context">13588888888</text>
					</view>
					<view>
						<text class="label">户籍地址</text>
						<text class="context">广东省深圳市</text>
					</view>
					<view>
						<text class="label">地址</text>
						<text class="context paddingTag">广东省深圳市龙岗区园山街道荷坳社区长江埔路润竹园</text>
					</view>
					<view class="underlineTag">
						<text class="label">性别</text>
						<text class="context">男</text>
					</view>
					<view>
						<text class="label">出生日期</text>
						<text class="context">1980-12-23</text>
					</view>
					<view>
						<text class="label">证件类型</text>
						<text class="context">身份证</text>
					</view>
					<view>
						<text class="label">证件号码</text>
						<text class="context">321321197602568791</text>
					</view>
					<view>
						<text class="label">工作单位</text>
						<text class="context">景田社康中心</text>
					</view>
					<view>
						<text class="label">联系人姓名</text>
						<text class="context">王子健</text>
					</view>
					<view>
						<text class="label">联系人电话</text>
						<text class="context">13566666666</text>
					</view>
					<view>
						<text class="label">常驻类型</text>
						<text class="context">户籍</text>
					</view>
					<view>
						<text class="label">民族</text>
						<text class="context">汉</text>
					</view>
					<view>
						<text class="label">文化程度</text>
						<text class="context">高中</text>
					</view>
					<view>
						<text class="label">职业</text>
						<text class="context">专业技术人员</text>
					</view>
					<view>
						<text class="label">婚姻状况</text>
						<text class="context">已婚</text>
					</view>
					<view>
						<text class="label">费用支付</text>
						<text class="context">全自费</text>
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
			<view class="formItemBox">
				<view class="itemTitle">
					<view class="itemLabel">药物过敏史</view>
					<view :class="[formShow.isSelected1?'selectItem selected':'selectItem']" @click="changeSelectedStatus('1')">有</view>
					<view :class="[formShow.isSelected2?'selectItem selected':'selectItem']" @click="changeSelectStatus('2')">无</view>
				</view>
				<view class="itemContent">
					
				</view>
			</view>
			<view class="formItemBox">
				<view class="itemTitle">
					<view class="itemLabel">暴露史</view>
					<view :class="[formShow.isSelected3?'selectItem selected':'selectItem']" @click="changeSelectedStatus('3')">有</view>
					<view :class="[formShow.isSelected4?'selectItem selected':'selectItem']" @click="changeSelectStatus('4')">无</view>
				</view>
				<view class="itemContent">
					
				</view>
			</view>
			<view class="formItemBox">
				<view class="itemTitle">
					<view class="itemLabel">既往史</view>
					<view :class="[formShow.isSelected5?'selectItem selected':'selectItem']" @click="changeSelectedStatus('5')">有</view>
					<view :class="[formShow.isSelected6?'selectItem selected':'selectItem']" @click="changeSelectStatus('6')">无</view>
				</view>
				<view class="itemContent">
					
				</view>
			</view>
			<view class="formItemBox">
				<view class="itemTitle">
					<view class="itemLabel">手术史</view>
					<view :class="[formShow.isSelected7?'selectItem selected':'selectItem']" @click="changeSelectedStatus('7')">有</view>
					<view :class="[formShow.isSelected8?'selectItem selected':'selectItem']" @click="changeSelectStatus('8')">无</view>
				</view>
				<view class="itemContent">
					
				</view>
			</view>
			<view class="formItemBox">
				<view class="itemTitle">
					<view class="itemLabel">外伤史</view>
					<view :class="[formShow.isSelected9?'selectItem selected':'selectItem']" @click="changeSelectedStatus('9')">有</view>
					<view :class="[formShow.isSelected10?'selectItem selected':'selectItem']" @click="changeSelectStatus('10')">无</view>
				</view>
				<view class="itemContent">
					
				</view>
			</view>
			<view class="formItemBox">
				<view class="itemTitle">
					<view class="itemLabel">输血史</view>
					<view :class="[formShow.isSelected11?'selectItem selected':'selectItem']" @click="changeSelectedStatus('11')">有</view>
					<view :class="[formShow.isSelected12?'selectItem selected':'selectItem']" @click="changeSelectStatus('12')">无</view>
				</view>
				<view class="itemContent">
					
				</view>
			</view>
			<view class="formItemBox">
				<view class="itemTitle">
					<view class="itemLabel">家族史|父亲</view>
					<view :class="[formShow.isSelected13?'selectItem selected':'selectItem']" @click="changeSelectedStatus('13')">有</view>
					<view :class="[formShow.isSelected14?'selectItem selected':'selectItem']" @click="changeSelectStatus('14')">无</view>
				</view>
				<view class="itemContent">
					
				</view>
			</view>
			<view class="formItemBox">
				<view class="itemTitle">
					<view class="itemLabel">家族史|母亲</view>
					<view :class="[formShow.isSelected15?'selectItem selected':'selectItem']" @click="changeSelectedStatus('15')">有</view>
					<view :class="[formShow.isSelected16?'selectItem selected':'selectItem']" @click="changeSelectStatus('16')">无</view>
				</view>
				<view class="itemContent">
					
				</view>
			</view>
			<view class="formItemBox">
				<view class="itemTitle">
					<view class="itemLabel">家族史|兄弟姐妹</view>
					<view :class="[formShow.isSelected17?'selectItem selected':'selectItem']" @click="changeSelectedStatus('17')">有</view>
					<view :class="[formShow.isSelected18?'selectItem selected':'selectItem']" @click="changeSelectStatus('18')">无</view>
				</view>
				<view class="itemContent">
					
				</view>
			</view>
			<view class="formItemBox">
				<view class="itemTitle">
					<view class="itemLabel">家族史|子女</view>
					<view :class="[formShow.isSelected19?'selectItem selected':'selectItem']" @click="changeSelectedStatus('19')">有</view>
					<view :class="[formShow.isSelected20?'selectItem selected':'selectItem']" @click="changeSelectStatus('20')">无</view>
				</view>
				<view class="itemContent">
					
				</view>
			</view>
			<view class="formItemBox">
				<view class="itemTitle">
					<view class="itemLabel">遗传病史</view>
					<view :class="[formShow.isSelected21?'selectItem selected':'selectItem']" @click="changeSelectedStatus('21')">有</view>
					<view :class="[formShow.isSelected22?'selectItem selected':'selectItem']" @click="changeSelectStatus('22')">无</view>
				</view>
				<view class="itemContent">
					
				</view>
			</view>
			<view class="formItemBox">
				<view class="itemTitle">
					<view class="itemLabel">残疾情况</view>
					<view :class="[formShow.isSelected23?'selectItem selected':'selectItem']" @click="changeSelectedStatus('23')">有</view>
					<view :class="[formShow.isSelected24?'selectItem selected':'selectItem']" @click="changeSelectStatus('24')">无</view>
				</view>
				<view class="itemContent">
					
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
				index: 0,
				formShow: {
					isSelected1: false,
					isSelected2: false,
					isSelected3: false,
					isSelected4: false,
					isSelected5: false,
					isSelected6: false,
					isSelected7: false,
					isSelected8: false,
					isSelected9: false,
					isSelected10: false,
					isSelected11: false,
					isSelected12: false,
					isSelected13: false,
					isSelected14: false,
					isSelected15: false,
					isSelected16: false,
					isSelected17: false,
					isSelected18: false,
					isSelected19: false,
					isSelected20: false,
					isSelected21: false,
					isSelected22: false,
					isSelected23: false,
					isSelected24: false,
				}
			}
		},
		methods: {
			bindPickerChange: function(e) {
				this.index = e.target.value
			},
			changeSelectedStatus(item) {
				this.formShow[`isSelected${item}`] = true
				if(this.formShow[`isSelected${(parseInt(item)+1).toString()}`] == true) {
					this.formShow[`isSelected${item}`] = true
					this.formShow[`isSelected${(parseInt(item)+1).toString()}`] = false
				}
			},
			changeSelectStatus(item) {
				this.formShow[`isSelected${item}`] = true
				if(this.formShow[`isSelected${item}`] == true) {
					this.formShow[`isSelected${item}`] = true
					this.formShow[`isSelected${(parseInt(item)-1).toString()}`] = false
				}
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
			.formItemBox {
				width: 100%;
				border-radius: 20upx;
				background-color: #FFFFFF;
				margin-bottom: 20upx;
				.itemTitle {
					padding: 20upx;
					display: flex;
					color: #020221;
					font-size: 30upx;
					line-height: 56upx;
					.itemLabel {
						min-width: 220upx;
					}
					.selectItem {
						width: 124upx;
						height: 60upx;
						border-radius: 10upx;
						background-color: #FAFAFA;
						color: #666666;
						text-align: center;
						line-height: 60upx;
						margin-right: 34upx;
					}
					.selectItem.selected {
						background-color: #E8F2FA;
						color: #0084FD;
					}
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
