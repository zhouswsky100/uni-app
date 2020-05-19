<template>
	<view>	
		<!--自定义导航------>
		<semp-navbar :back="true" navBg="#157BC7">
			<view slot="default">
				<view  class="nav-input-box">
					<input type="text"  @input="searchInput" :value="keywords" placeholder="输入关键字搜索"  />				
				</view>
			</view>
			<!-- #ifndef MP -->
			<view slot="right" class="ser-btn" @click="search">
				搜索
			</view>
			 <!-- #endif -->
		</semp-navbar>
		
		<view class="wrapper" v-if="hospitalList.length==0">
			<view  class="history-box" v-if="isHistory">
				<view class="stips">说明:多个关键字可用 [空格] [英文逗号] [|] [;] 分隔 </view>
				<view v-if="historyList.length > 0">
					<view class="history-title">
						<text>搜索历史</text>
						<text class="cuIcon-delete" @click="clearSearch"></text>
					</view>
					<view class="history-content">
						<view class="history-item" v-for="(item, index) in historyList" :key="index" @click="historyClick(item.name)">
							{{ item.name }}
						</view>
					</view>
				</view>
				<view v-else class="no-data">您还没有历史记录</view>
				
			</view>
			<!-- <view v-else class="history-box">
				<view v-if="historyList.length > 0" class="history-list-box">
					<view class="history-list-item" v-for="(item, index) in historyList" :key="index" @click="listTap(item)">
						<rich-text :nodes="item.nameNodes"></rich-text>
						
					</view>
				</view>
				<view v-else class="no-data">没有搜索到相关内容</view>
			</view> -->
		</view>
		<view class="content" v-else>
			
			<view class="flex padding bg-white solid-bottom space-between" v-for="(item,index) in hospitalList" :key="index" @click="hospitalClick(item.uuid)">
				<view class="list-left">{{item.name}}</view>
				<view class="list-right">{{item.type}}</view>
			</view>
			<uni-load-more :status="loadingType || hospitalList.length==0"></uni-load-more>
			
			
			
		</view>
	</view>
</template>

<script>
import util from '@/components/amap-wx/js/util.js';
import sempNavbar from "@/components/semp-navbar.vue";

export default {
	components: {
		sempNavbar
	},
	data() {
		return {
			historyList: [],
			isHistory:true,
			list: [],
			flng: true,
			timer: null,			
			hospitalList:[],
			loadingType: 'more', //加载更多状态										
			keywords:'',
			pagenum:1,
			timer:null
			
		};
	},
	onLoad() {
		
		this.historyList = uni.getStorageSync('search:history');		
		const res = uni.getSystemInfoSync();				

	},
	
	methods: {
		navBack(){
			uni.navigateBack();
		},
		
		searchInput(e){
			this.keywords=e.detail.value;
			if (this.keywords=='') {
					this.hospitalList=[];
					this.isHistory = true;
					this.historyList= [];
					this.historyList = uni.getStorageSync('search:history');
											
				return;
			} else {	
				this.isHistory = false;
				this.getData("refresh");
			}
			
		},
		search(){			
			if (this.keywords=='') {
				this.isHistory = true;
				this.historyList = [];
				this.historyList = uni.getStorageSync('search:history');
				uni.showModal({
					title: '提示',
					showCancel:false,
					content: '请输入内容。',
					success: res => {
						if (res.confirm) {
							
						}
					}
				});
				return;
			} else {			
				util.setHistory(this.keywords);
				this.isHistory=false;				
				this.getData("refresh");				
			}
		},
		
		/**
		 * 列表点击
		 */
		listTap(item) {
			//item = JSON.parse(JSON.stringify(item));
			// 如果当前是历史搜索页面 ，那么点击不储存,直接 跳转			
			if (item.name==this.keywords) {				
				return;
			} else {
				this.isHistory=true;				
				this.keywords=item.name;
				this.hospitalList = [];
				this.getData("refresh");				
				 
			}
		},
		//搜索历史点击
		historyClick(e){			
			this.keywords=e;
			this.getData("refresh");
		},
	
		//详情
		hospitalClick(orgUuid){
			let paramsUrl="?orgUuid="+orgUuid;
			uni.navigateTo({
				url: '/pages/appointment/hospital-dept/hospital-dept'+paramsUrl
			});
		},
		getData(type='add'){
			if (this.loadingType == 'loading' || this.loadingType=='nomore') {
				return;
			}
			if (type == 'refresh') {
				
				this.pagenum = 1;
			}
			this.$globalMethod.ds_api({
				method: "m=S001&token=SemXlsuV0Ko2Ugrp&pagesize=20&pagenum="+this.pagenum,
				loadmsg:"医院搜索",
				showLoading:false,
				data: {					
					searchKey:this.keywords
				},
				success: (res) => {
					if(!res || res.data.data.length==0){
						this.loadingType="nomore";
						return
					}					
					let list=res.data.data;
					list.forEach((item)=>{	
						this.hospitalList.push(item);																								
					})
					
					
					this.loadingType = list.length>=20 ? 'more' : 'nomore';
					this.pagenum++;
				}
			});
	
		},
		
		
		/**
		 * 清理历史搜索数据
		 */
		clearSearch() {
			uni.showModal({
				title: '提示',
				content: '是否清理全部搜索历史？该操作不可逆。',
				success: res => {
					if (res.confirm) {
						this.historyList = util.removeHistory();
					}
				}
			});
		},
	
	},
	
	
	/**
	 * 点击软键盘搜索按键触发
	 */
	onNavigationBarSearchInputConfirmed(e) {
		//this.keywords=e.text;
		if (this.keywords=='') {
			this.isHistory = true;
			this.historyList = [];
			this.historyList = uni.getStorageSync('search:history');
			uni.showModal({
				title: '提示',
				content: '请输入内容。',
				success: res => {
					if (res.confirm) {
					}
				}
			});
			return;
		} else {			
			util.setHistory(this.keywords);
			this.showList=true;		
			this.getData('refresh');				
		}
	},	
	/**
	 *  点击导航栏 buttons 时触发
	 */
	
	onNavigationBarButtonTap(e) {
		if(e.index===0){
			
			this.searchInput()
		}	
	},
	//加载更多
	onReachBottom() {
		this.getData();
	},
}
</script>

<style lang="scss">

	.nav-input-box{
		padding:0 20upx;	
		align-items: center;
		input{
			flex: 11;
			height: 56upx;
			line-height: 56upx;
			text-align: center;
			font-size: 28upx;
			color: #666;
			border-radius: 9px;
			background: #eee;
		}
	}
	.ser-btn{		
		text-align: center;
		line-height: 56upx;
		font-size:30upx;
		color:#fff;
	}
	

.stips{
	text-align: center;
	line-height: 38upx;
	color:#aaa;
	font-size: 26upx;
	padding:20upx 100upx;
}
.history-title {
	display: flex;
	justify-content: space-between;
	padding: 20upx 30upx;
	padding-bottom: 0;
	font-size: 34upx;
	color: #333;
}
.history-title .uni-icon {
	font-size: 40upx;
}
.history-content {
	display: flex;
	flex-wrap: wrap;
	padding: 15upx;
}
.history-item {
	padding: 4upx 35upx;
	border: 1px #f1f1f1 solid;
	background: #fff;
	border-radius: 50upx;
	margin: 12upx 10upx;
	color: #999;
}
.history-list-box {
	/* margin: 10upx 0; */
}
.history-list-item {
	padding: 30upx 0;
	margin-left: 30upx;
	border-bottom: 1px #EEEEEE solid;
	font-size: 28upx;
}

.no-data {
	text-align: center;
	color: #999;
	margin: 100upx;
}
.list-right{
	width:150upx;
	flex-shrink: 0;
	text-align: right;
	}
</style>
