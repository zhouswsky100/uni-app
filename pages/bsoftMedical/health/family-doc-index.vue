<template>
	<view class="wrap">
		<view class="tabBar">
			<view :class="[tabTag == 0? 'tabTitle tab-active':'tabTitle']" @click="changeTab(0)">
				<span :class="[tabTag == 0? 'tabUnderline':'']">未处理</span>
			</view>
			<view :class="[tabTag == 1? 'tabTitle tab-active':'tabTitle']" @click="changeTab(1)">
				<span :class="[tabTag == 1? 'tabUnderline':'']">已通过</span>
			</view>
			<view :class="[tabTag == 2? 'tabTitle tab-active':'tabTitle']" @click="changeTab(2)">
				<span :class="[tabTag == 2? 'tabUnderline':'']">已拒绝</span>
			</view>
		</view>
		<view class="tabContent">
			<view class="untreated" v-if="tabTag == 0">
				<view class="card" v-for="(item, index) in untreatedList">
					<view class="top">
						<image :src="item.iconSrc"></image>
						<view>
							<p class="title">{{item.applyName}}</p>
							<p class="date">申请日期：{{item.date}}</p>
						</view>
						<span class="status">{{item.statusName}}</span>
					</view>
					<view class="bottom">
						<view class="message">
							<view><span class="label">姓名：</span><span>{{item.name}}</span></view>
							<view><span class="label">年龄：</span><span>{{item.age}}</span></view>
							<view><span class="label">电话：</span><span>{{item.phoneNum}}</span></view>
						</view>
						<view class="opButton" @click="dealAudit(item.applyType)">处理</view>
					</view>
				</view>
			</view>
			<view class="pass" v-if="tabTag == 1">
				<view class="card" v-for="(item, index) in passList">
					<view class="top">
						<image :src="item.iconSrc"></image>
						<view>
							<p class="title">{{item.applyName}}</p>
							<p class="date">申请日期：{{item.date}}</p>
						</view>
						<span class="status">{{item.statusName}}</span>
					</view>
					<view class="bottom">
						<view class="message">
							<view><span class="label">姓名：</span><span>{{item.name}}</span></view>
							<view><span class="label">年龄：</span><span>{{item.age}}</span></view>
							<view><span class="label">电话：</span><span>{{item.phoneNum}}</span></view>
						</view>
						<view class="moreButton">
							<image src="@/static/health/next.png"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="rejected" v-if="tabTag == 2">
				33333
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabTag: 0,
				untreatedList: [
					{
						applyType: '0',
						applyName: '建档申请',
						date: '2020-05-10',
						status: '0',
						name: '王自健',
						age: '46',
						phone: '18176519981'
					},
					{
						applyType: '1',
						applyName: '家医签约',
						date: '2020-05-08',
						status: '0',
						name: '王建宇',
						age: '32',
						phone: '18176519981'
					},
					{
						applyType: '2',
						applyName: '家床申请',
						status: '0',
						date: '2020-05-11',
						name: '杨家磊',
						age: '26',
						phone: '18176519981'
					}
				],
				passList: [
					{
						applyType: '0',
						applyName: '建档申请',
						date: '2020-04-10',
						status: '2',
						name: '王自健',
						age: '46',
						phone: '18176519981'
					},
					{
						applyType: '1',
						applyName: '家医签约',
						date: '2020-03-08',
						status: '2',
						name: '杨家磊',
						age: '32',
						phone: '18176519981'
					},
					{
						applyType: '2',
						applyName: '家床申请',
						status: '2',
						date: '2020-01-11',
						name: '王建宇',
						age: '26',
						phone: '18176519981'
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
					_this.dataProcessing(_this.untreatedList)
					break;
					case 1:
					_this.dataProcessing(_this.passList)
					break;
				}
			},
			changeTab(tabNum) {
				let _this = this 
				_this.tabTag = tabNum
				_this.initPage()
			},
			dataProcessing(data) {
				let _this = this
				data.map(item=>{
					switch(item.applyType){
						case '0':
						item.iconSrc = '../../../static/health/apply_file.png'
						break;
						case '1':
						item.iconSrc = '../../../static/health/family_doctor.png'
						break;
						case '2':
						item.iconSrc = '../../../static/health/home_sickbed2.png'
						break;
					}
					switch(item.status) {
						case '0':
						item.statusName = '未处理'
						break;
						case '1':
						item.statusName = '已处理'
						break;
						case '2':
						item.statusName = '已通过'
						break;
					}
					item.phoneNum = item.phone.replace(
						/(\w{2})\w*(\w{3})/,
						'$1*******$2'
					)
					return data
				})
			},
			dealAudit(dealType) {
				switch(dealType) {
					case '0':
					uni.navigateTo({
					    url: '/pages/bsoftMedical/health/archives-apply'
					})
					break;
					case '1':
					uni.navigateTo({
					    url: '/pages/bsoftMedical/health/family-doc-signing'
					})
					break;
					case '2':
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
				span.tabUnderline {
					border-bottom: 6upx solid #0084FD;
					padding-bottom: 30upx;
				}
			}
			.tabTitle.tab-active {
				color: #0084FD;
			}
		}
		.tabContent {
			padding: 20upx 24upx;
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
						width: 488upx;
					}
					.title {
						font-size: 30upx;
						font-weight: 600;
						color: #283767;
					}
					.status {
						width: 80upx;
						line-height: 66upx;
						color: #0084FD;
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
						span {
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
