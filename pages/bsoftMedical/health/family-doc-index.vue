<template>
	<view class="wrap">
		<view class="topBox">
			<view class="tabBar">
				<view :class="[tabTag == 0? 'tabTitle tab-active':'tabTitle']" @click="changeTab(0)">
					<view :class="[tabTag == 0? 'tabUnderline':'']">建档申请</view>
				</view>
				<view :class="[tabTag == 1? 'tabTitle tab-active':'tabTitle']" @click="changeTab(1)">
					<view :class="[tabTag == 1? 'tabUnderline':'']">家医签约</view>
				</view>
				<view :class="[tabTag == 2? 'tabTitle tab-active':'tabTitle']" @click="changeTab(2)">
					<view :class="[tabTag == 2? 'tabUnderline':'']">家床申请</view>
				</view>
			</view>
			<view class="statusBar">
				<view :class="[statusTag == 0?'selected':'']" @click="changeStatus(0)">未处理</view>
				<view :class="[statusTag == 1?'selected':'']" @click="changeStatus(1)">已通过</view>
				<view :class="[statusTag == 2?'selected':'']" @click="changeStatus(2)">已拒绝</view>
			</view>
		</view>
		<view class="tabContent">
			<view>
				<view class="card" v-for="(item, index) in listData" v-if="statusTag == 0">
					<view class="top">
						<image :src="item.iconSrc"></image>
						<view>
							<view class="title">{{item.applyName}}</view>
							<view class="date">申请日期：{{item.date}}</view>
						</view>
						<text class="status">{{item.statusName}}</text>
					</view>
					<view class="bottom">
						<view class="message">
							<view><text class="label">姓名：</text><text>{{item.name}}</text></view>
							<view><text class="label">年龄：</text><text>{{item.age}}</text></view>
							<view><text class="label">电话：</text><text>{{item.phoneNum}}</text></view>
						</view>
						<view class="opButton" @click="dealAudit(tabTag)">处理</view>
					</view>
				</view>
				<view class="card" v-for="(item, index) in listData" v-if="statusTag != 0">
					<view class="top">
						<image :src="item.iconSrc"></image>
						<view>
							<view class="title">{{item.applyName}}</view>
							<view class="date">申请日期：{{item.date}}</view>
						</view>
						<text class="status">{{item.statusName}}</text>
					</view>
					<view class="bottom">
						<view class="message">
							<view><text class="label">姓名：</text><text>{{item.name}}</text></view>
							<view><text class="label">年龄：</text><text>{{item.age}}</text></view>
							<view><text class="label">电话：</text><text>{{item.phoneNum}}</text></view>
						</view>
						<view class="moreButton">
							<image src="@/static/health/next.png"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabTag: 0,
				statusTag: 0,
				listData: [],
				applyData: [
					{
						applyName: '建档申请',
						iconSrc: '../../../static/health/apply_file.png',
						date: '2020-05-17',
						status: '0',
						name: '王自健',
						age: '32',
						phone: '18176511181'
					},
					{
						applyName: '建档申请',
						iconSrc: '../../../static/health/apply_file.png',
						date: '2020-05-17',
						status: '0',
						name: '马继祖',
						age: '55',
						phone: '18176321181'
					},
					{
						applyName: '建档申请',
						iconSrc: '../../../static/health/apply_file.png',
						date: '2020-05-17',
						status: '0',
						name: '朱希亮',
						age: '44',
						phone: '18176578581'
					},
					{
						applyName: '建档申请',
						iconSrc: '../../../static/health/apply_file.png',
						date: '2020-04-11',
						status: '0',
						name: '梁春平',
						age: '46',
						phone: '18176517781'
					},
					{
						applyName: '建档申请',
						iconSrc: '../../../static/health/apply_file.png',
						date: '2020-03-8',
						status: '0',
						name: '马宏宇',
						age: '33',
						phone: '18826519981'
					},
					{
						applyName: '建档申请',
						iconSrc: '../../../static/health/apply_file.png',
						date: '2020-01-22',
						status: '1',
						name: '章汉夫',
						age: '68',
						phone: '18176519911'
					},
					{
						applyName: '建档申请',
						iconSrc: '../../../static/health/apply_file.png',
						date: '2020-02-27',
						status: '1',
						name: '范长江',
						age: '26',
						phone: '18176510981'
					},
					{
						applyName: '建档申请',
						iconSrc: '../../../static/health/apply_file.png',
						date: '2020-02-27',
						status: '1',
						name: '程孝先',
						age: '33',
						phone: '18171230981'
					},
					{
						applyName: '建档申请',
						iconSrc: '../../../static/health/apply_file.png',
						date: '2020-02-27',
						status: '1',
						name: '林君雄',
						age: '41',
						phone: '18176321981'
					},
					{
						applyName: '建档申请',
						iconSrc: '../../../static/health/apply_file.png',
						date: '2020-02-27',
						status: '2',
						name: '谭平山',
						age: '31',
						phone: '18176456981'
					},
					{
						applyName: '建档申请',
						iconSrc: '../../../static/health/apply_file.png',
						date: '2020-02-27',
						status: '2',
						name: '李厚福',
						age: '55',
						phone: '13116456981'
					},
					{
						applyName: '建档申请',
						iconSrc: '../../../static/health/apply_file.png',
						date: '2020-02-27',
						status: '2',
						name: '赵大华',
						age: '49',
						phone: '18716456981'
					},
					{
						applyName: '建档申请',
						iconSrc: '../../../static/health/apply_file.png',
						date: '2020-02-27',
						status: '2',
						name: '罗元发',
						age: '40',
						phone: '18333456981'
					},
					{
						applyName: '建档申请',
						iconSrc: '../../../static/health/apply_file.png',
						date: '2020-02-27',
						status: '2',
						name: '刘乃超',
						age: '31',
						phone: '18176456981'
					},
					{
						applyName: '建档申请',
						iconSrc: '../../../static/health/apply_file.png',
						date: '2020-02-27',
						status: '2',
						name: '刘永生',
						age: '44',
						phone: '18176123981'
					}
				],
				docSignData: [
					{
						applyName: '家医签约',
						iconSrc: '../../../static/health/family_doctor.png',
						date: '2020-05-17',
						status: '0',
						name: '王自健',
						age: '32',
						phone: '18176511181'
					},
					{
						applyName: '家医签约',
						iconSrc: '../../../static/health/family_doctor.png',
						date: '2020-05-17',
						status: '0',
						name: '马继祖',
						age: '55',
						phone: '18176321181'
					},
					{
						applyName: '家医签约',
						iconSrc: '../../../static/health/family_doctor.png',
						date: '2020-05-17',
						status: '0',
						name: '朱希亮',
						age: '44',
						phone: '18176578581'
					},
					{
						applyName: '家医签约',
						iconSrc: '../../../static/health/family_doctor.png',
						date: '2020-04-11',
						status: '0',
						name: '梁春平',
						age: '46',
						phone: '18176517781'
					},
					{
						applyName: '家医签约',
						iconSrc: '../../../static/health/family_doctor.png',
						date: '2020-03-8',
						status: '0',
						name: '马宏宇',
						age: '33',
						phone: '18826519981'
					},
					{
						applyName: '家医签约',
						iconSrc: '../../../static/health/family_doctor.png',
						date: '2020-01-22',
						status: '1',
						name: '章汉夫',
						age: '68',
						phone: '18176519911'
					},
					{
						applyName: '家医签约',
						iconSrc: '../../../static/health/family_doctor.png',
						date: '2020-02-27',
						status: '1',
						name: '范长江',
						age: '26',
						phone: '18176510981'
					},
					{
						applyName: '家医签约',
						iconSrc: '../../../static/health/family_doctor.png',
						date: '2020-02-27',
						status: '1',
						name: '程孝先',
						age: '33',
						phone: '18171230981'
					},
					{
						applyName: '家医签约',
						iconSrc: '../../../static/health/family_doctor.png',
						date: '2020-02-27',
						status: '1',
						name: '林君雄',
						age: '41',
						phone: '18176321981'
					},
					{
						applyName: '家医签约',
						iconSrc: '../../../static/health/family_doctor.png',
						date: '2020-02-27',
						status: '2',
						name: '谭平山',
						age: '31',
						phone: '18176456981'
					},
					{
						applyName: '家医签约',
						iconSrc: '../../../static/health/family_doctor.png',
						date: '2020-02-27',
						status: '2',
						name: '李厚福',
						age: '55',
						phone: '13116456981'
					},
					{
						applyName: '家医签约',
						iconSrc: '../../../static/health/family_doctor.png',
						date: '2020-02-27',
						status: '2',
						name: '赵大华',
						age: '49',
						phone: '18716456981'
					},
					{
						applyName: '家医签约',
						iconSrc: '../../../static/health/family_doctor.png',
						date: '2020-02-27',
						status: '2',
						name: '罗元发',
						age: '40',
						phone: '18333456981'
					},
					{
						applyName: '家医签约',
						iconSrc: '../../../static/health/family_doctor.png',
						date: '2020-02-27',
						status: '2',
						name: '刘乃超',
						age: '31',
						phone: '18176456981'
					},
					{
						applyName: '家医签约',
						iconSrc: '../../../static/health/family_doctor.png',
						date: '2020-02-27',
						status: '2',
						name: '刘永生',
						age: '44',
						phone: '18176123981'
					}
				],
				familyBedData:[
					{
						applyName: '家床申请',
						iconSrc: '../../../static/health/home_sickbed2.png',
						date: '2020-05-17',
						status: '0',
						name: '王自健',
						age: '32',
						phone: '18176511181'
					},
					{
						applyName: '家床申请',
						iconSrc: '../../../static/health/home_sickbed2.png',
						date: '2020-05-17',
						status: '0',
						name: '马继祖',
						age: '55',
						phone: '18176321181'
					},
					{
						applyName: '家床申请',
						iconSrc: '../../../static/health/home_sickbed2.png',
						date: '2020-05-17',
						status: '0',
						name: '朱希亮',
						age: '44',
						phone: '18176578581'
					},
					{
						applyName: '家床申请',
						iconSrc: '../../../static/health/home_sickbed2.png',
						date: '2020-04-11',
						status: '0',
						name: '梁春平',
						age: '46',
						phone: '18176517781'
					},
					{
						applyName: '家床申请',
						iconSrc: '../../../static/health/home_sickbed2.png',
						date: '2020-03-8',
						status: '0',
						name: '马宏宇',
						age: '33',
						phone: '18826519981'
					},
					{
						applyName: '家床申请',
						iconSrc: '../../../static/health/home_sickbed2.png',
						date: '2020-01-22',
						status: '1',
						name: '章汉夫',
						age: '68',
						phone: '18176519911'
					},
					{
						applyName: '家床申请',
						iconSrc: '../../../static/health/home_sickbed2.png',
						date: '2020-02-27',
						status: '1',
						name: '范长江',
						age: '26',
						phone: '18176510981'
					},
					{
						applyName: '家床申请',
						iconSrc: '../../../static/health/home_sickbed2.png',
						date: '2020-02-27',
						status: '1',
						name: '程孝先',
						age: '33',
						phone: '18171230981'
					},
					{
						applyName: '家床申请',
						iconSrc: '../../../static/health/home_sickbed2.png',
						date: '2020-02-27',
						status: '1',
						name: '林君雄',
						age: '41',
						phone: '18176321981'
					},
					{
						applyName: '家床申请',
						iconSrc: '../../../static/health/home_sickbed2.png',
						date: '2020-02-27',
						status: '2',
						name: '谭平山',
						age: '31',
						phone: '18176456981'
					},
					{
						applyName: '家床申请',
						iconSrc: '../../../static/health/home_sickbed2.png',
						date: '2020-02-27',
						status: '2',
						name: '李厚福',
						age: '55',
						phone: '13116456981'
					},
					{
						applyName: '家床申请',
						iconSrc: '../../../static/health/home_sickbed2.png',
						date: '2020-02-27',
						status: '2',
						name: '赵大华',
						age: '49',
						phone: '18716456981'
					},
					{
						applyName: '家床申请',
						iconSrc: '../../../static/health/home_sickbed2.png',
						date: '2020-02-27',
						status: '2',
						name: '罗元发',
						age: '40',
						phone: '18333456981'
					},
					{
						applyName: '家床申请',
						iconSrc: '../../../static/health/home_sickbed2.png',
						date: '2020-02-27',
						status: '2',
						name: '刘乃超',
						age: '31',
						phone: '18176456981'
					},
					{
						applyName: '家床申请',
						iconSrc: '../../../static/health/home_sickbed2.png',
						date: '2020-02-27',
						status: '2',
						name: '刘永生',
						age: '44',
						phone: '18176123981'
					}
				]
			}
		},
		onLoad() {
			this.initPage()
		},
		methods: {
			initPage() {
				let _this = this
				switch(_this.tabTag) {
					case 0:
					_this.dataProcessing(_this.applyData)
					break;
					case 1:
					_this.dataProcessing(_this.docSignData)
					break;
					case 2:
					_this.dataProcessing(_this.familyBedData)
					break;
				}
			},
			changeTab(tabNum) {
				let _this = this 
				_this.tabTag = tabNum
				_this.initPage()
			},
			changeStatus(sNum) {
				let _this = this
				_this.statusTag = sNum
				_this.initPage()
			},
			dataProcessing(data) {
				let _this = this
				let temp = []
				data.map(item=>{
					switch(item.status) {
						case '0':
						item.statusName = '未处理'
						break;
						case '1':
						item.statusName = '已通过'
						break;
						case '2':
						item.statusName = '已拒绝'
						break;
					}
					item.phoneNum = item.phone.replace(
						/(\w{2})\w*(\w{3})/,
						'$1*******$2'
					)
					if(item.status == _this.statusTag) {
						temp.push(item)
					}
					return data
				})
				_this.listData = temp
			},
			dealAudit(dealType) {
				switch(dealType) {
					case 0:
					uni.navigateTo({
					    url: '/pages/bsoftMedical/health/archives-apply'
					})
					break;
					case 1:
					uni.navigateTo({
					    url: '/pages/bsoftMedical/health/family-doc-signing'
					})
					break;
					case 2:
					uni.navigateTo({
					    url: '/pages/bsoftMedical/health/family-bed'
					})
					break;
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
	.wrap{ 
		width: 100%;
		font-size: 36upx;
		position: relative;
		.topBox {
			width: 100%;
			position: fixed;
			z-index: 999;
		}
		.tabBar {
			display: flex;
			justify-content: space-between;
			width: 100%;
			height: 100upx;
			background-color: #ffffff;
			.tabTitle {
				width: 33.33%;
				text-align: center;
				line-height: 100upx;
				font-size: 30upx;
				.tabUnderline {
					display: inline;
					border-bottom: 6upx solid #0084FD;
					padding-bottom: 30upx;
				}
			}
			.tabTitle.tab-active {
				color: #0084FD;
			}
		}
		.statusBar {
			display: flex;
			width: 100%;
			padding: 22upx 24upx;
			background-color: #F8F9FF;
			uni-view {
				width: 116upx;
				height: 50upx;
				line-height: 50upx;
				text-align: center;
				background-color: #FFFFFF;
				border-radius: 25upx;
				font-size: 24upx;
				color: #223263;
				margin-right: 30upx;
			}
			uni-view.selected {
				border:1px solid rgba(0,132,253,1);
				background-color: #EEF7FF;
				color: #0084FD;
			}
		}
		.tabContent {
			padding: 194upx 24upx 0upx 24upx;
			.card {
				width: 100%;
				height: 300upx;
				border-radius: 20upx;
				background-color: #ffffff;
				margin-bottom: 20upx;
				.top {
					display: flex;
					padding: 26upx 30upx;
					height: 120upx;
					border-bottom: 2upx dashed #E6E6E6;
					font-size: 24upx;
					uni-image {
						margin-top: 8upx;
						margin-right: 24upx;
						width: 64upx;
						height: 64upx;
					}
					uni-view {
						width: 75%;
					}
					.title {
						font-size: 30upx;
						font-weight: 600;
						color: #283767;
					}
					.status {
						width: 15%;
						line-height: 66upx;
						color: #0084FD;
						text-align: right;
					}
				}
				.bottom {
					display: flex;
					justify-content: space-between;
					padding: 20upx 30upx;
					font-size: 28upx;
					.message {
						.label {
							color: #9DA4BB;
						}
						text {
							line-height: 48upx;
						}
					}
					.opButton {
						width: 124upx;
						height: 48upx;
						line-height: 48upx;
						text-align: center;
						color: #ffffff;
						border-radius: 24upx;
						background-color: #207EFA;
						margin-top: 90upx;
					}
					.moreButton {
						width: 12upx;
						line-height: 144upx;
						uni-image {
							width: 12upx;
							height: 21upx;
						}
					}
				}
			}
		}
	}
</style>
