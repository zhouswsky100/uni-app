<template>
	<view>
		<semp-navbar :back="true" navBg="#fff">
			<view slot="default">
				{{titleType | titleFilter}}
			</view>
			<view slot="search2">
				<view class="searchBannerBox">
					<view class="searchBanner">
						<image class="searchImg" src="@/static/health/search.png"></image>
						<input class="uni-input" @input="onKeyInput" placeholder="搜索居民" />
					</view>
				</view>
				<view class="headerBox">
					<view class="contentList" v-for="(item,index) in typeList" :key="index" @click="changeType(item.id)" :class="toggleId==item.id?'current':''">
						{{item.title}}
						<view v-if="toggleId==item.id" class="currentLine"></view>
					</view>
				</view>
			</view>
		</semp-navbar>
		<view class="warp">
			<view class="content" v-if="toggleId=='0'">
				<view class="banner1" v-for="(item,index) in contentList" :key="index">
					<view class="inner1">
						<view class="outer1">{{item.name}}</view>
						<view class="outer2">{{item.type | typeFilter}}</view>
					</view>
					<view class="inner1">
						<view class="outer3" style="padding-left: 0;">年龄:{{item.age}} <view class="line"></view></view>
						<view class="outer3">性别:{{item.male}}<view class="line"></view></view>
						<view class="outer3">电话:{{item.phone}}</view>
					</view>
					<view class="inner1">
						<image class="outer4" src="@/static/health/date.png" ></image>
						<view class="outer5">建档时间：{{item.time}}</view>
					</view>
					<image class="nextBox" src="@/static/health/yR.png"></image>
				</view>
				<uni-load-more :status="loadingType"></uni-load-more>
			</view>
			<view class="content" v-if="toggleId=='1'">
				<view class="banner1" v-for="(item,index) in contentList" :key="index" v-if="item.type=='1'">
					<view class="inner1">
						<view class="outer1">{{item.name}}</view>
						<view class="outer2">有效档案</view>
					</view>
					<view class="inner1">
						<view class="outer3" style="padding-left: 0;">年龄:{{item.age}} <view class="line"></view></view>
						<view class="outer3">性别:{{item.male}}<view class="line"></view></view>
						<view class="outer3">电话:{{item.phone}}</view>
					</view>
					<view class="inner1">
						<image class="outer4" src="@/static/health/date.png" ></image>
						<view class="outer5">建档时间：{{item.time}}</view>
					</view>
					<image class="nextBox" src="@/static/health/yR.png"></image>
				</view>
				<uni-load-more :status="loadingType"></uni-load-more>
			</view>
			<view class="content" v-if="toggleId=='2'">
				<view class="banner1" v-for="(item,index) in contentList" :key="index" v-if="item.type=='2'">
					<view class="inner1">
						<view class="outer1">{{item.name}}</view>
						<view class="outer2">无效档案</view>
					</view>
					<view class="inner1">
						<view class="outer3" style="padding-left: 0;">年龄:{{item.age}} <view class="line"></view></view>
						<view class="outer3">性别:{{item.male}}<view class="line"></view></view>
						<view class="outer3">电话:{{item.phone}}</view>
					</view>
					<view class="inner1">
						<image class="outer4" src="@/static/health/date.png" ></image>
						<view class="outer5">建档时间：{{item.time}}</view>
					</view>
					<image class="nextBox" src="@/static/health/yR.png"></image>
				</view>
				<uni-load-more :status="loadingType"></uni-load-more>
			</view>
		</view>
	</view>
	
</template>

<script>
import sempNavbar from "@/components/semp-navbar.vue";
	export default {
		components: {
			sempNavbar
		},
		data(){
			return{
				titleType:'',
				searchKey:'',
				typeList:[
					{
						title:'全部',
						id:'0',
					},
					{
						title:'有效档案',
						id:'1',
					},
					{
						title:'无效档案',
						id:'2',
					}
				],
				toggleId:'0',
				loadingType:"noMore",
				contentList:[
					{
						name:'范秋阳',
						age:'65',
						male:'男',
						phone:'13678768888',
						time:'2019-05-07',
						type:'1',//1为有效2为无效
						id:'0'
					},
					{
						name:'史朝雨',
						age:'48',
						male:'男',
						phone:'18779868123',
						time:'2018-10-17',
						type:'1',//1为有效2为无效
						id:'1'
					},
					{
						name:'詹一璇',
						age:'68',
						male:'女',
						phone:'13145632453',
						time:'2019-02-02',
						type:'1',//1为有效2为无效
						id:'2'
					},
					{
						name:'田幻波',
						age:'58',
						male:'男',
						phone:'18998766732',
						time:'2020-02-07',
						type:'1',//1为有效2为无效
						id:'3'
					},
					{
						name:'申秀美',
						age:'61',
						male:'女',
						phone:'15645729871',
						time:'2020-05-07',
						type:'1',//1为有效2为无效
						id:'4'
					},
					{
						name:'朱浦泽',
						age:'63',
						male:'男',
						phone:'13554543232',
						time:'2019-12-24',
						type:'2',//1为有效2为无效
						id:'5'
					},
					{
						name:'翟子明',
						age:'54',
						male:'男',
						phone:'17698124334',
						time:'2018-11-24',
						type:'1',//1为有效2为无效
						id:'6'
					},
					{
						name:'许子健',
						age:'65',
						male:'男',
						phone:'18712674376',
						time:'2019-03-04',
						type:'2',//1为有效2为无效
						id:'7'
					},
					{
						name:'宋弘文',
						age:'59',
						male:'男',
						phone:'18979868291',
						time:'2019-11-11',
						type:'1',//1为有效2为无效
						id:'8'
					},
					{
						name:'廖鸿德',
						age:'62',
						male:'男',
						phone:'13333489961',
						time:'2019-07-15',
						type:'2',//1为有效2为无效
						id:'9'
					},
				],
			}
		},
		methods:{
			getData(){
				console.log("gogogo")
			},
			changeType(id){
				this.toggleId = id;
			},
			onKeyInput: function(event) {
				this.searchKey = event.target.value
			},
		},
		onReachBottom() {
			if (this.loadingType == 'nomore') {
				return;
			}
			this.getData();
		},
		onLoad(option){
			this.titleType=option.id;
		},
		filters:{
			typeFilter(value){
				let returnValue;
				if(value=='1'){
					returnValue='有效档案';
				}else if(value=='2'){
					returnValue='无效档案';
				}
				return returnValue;
			},
			titleFilter(value){
				let returnValue;
				switch(value){
					case '1':
						returnValue='健康档案';
					break;
					case '2':
						returnValue='高血压';
					break;
					case '3':
						returnValue='糖尿病';
					break;
					case '4':
						returnValue='孕产妇';
					break;
					case '5':
						returnValue='儿童';
					break;
					case '6':
						returnValue='肺结核';
					break;
					case '7':
						returnValue='老年人';
					break;
				}
				return returnValue;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.searchBannerBox{
		display: flex;
		justify-content: center;
		align-items: center;
		height: 98upx;
		.searchBanner{
			height: 64upx;
			width: 702upx;
			background:rgba(236,237,239,1);
			border-radius:32upx;
			padding: 0 30upx;
			display: flex;
			align-items: center;
			.searchImg{
				width: 32upx;
				height: 32upx;
			}
			.uni-input{
				flex: 1;
				padding-left: 15upx;
				height: 64upx;
				line-height: 64upx;
				.uni-input-placeholder{
				   color: #93989D;
				   font-size: 28upx;
				}
			}
		}
	}
	
	.headerBox{
		display: flex;
		height: 84upx;
		.contentList{
			flex: 1;
			color: #020221;
			font-size: 30upx;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			&.current{
				font-weight:bold;
				font-size: 36upx;
			}
			.currentLine{
				position: absolute;
				bottom: 0;
				left: 50%;
				margin-left: -29upx;
				width:58upx;
				height:4upx;
				background:rgba(32,126,250,1);
				border-radius:2upx;
			}
		}
	}
	.warp{
		width: 100%;
		height: 100%;
		
		.content{
			padding-top: 270upx;
			margin: 0 24upx;
			.banner1{
				height: 190upx;
				background: #fff;
				padding: 30upx 30upx 0;
				margin-top: 20upx;
				position: relative;
				.inner1{
					display: flex;
					align-items: center;
					margin-bottom: 14upx;
					.outer1{
						color: #07103C;
						font-size: 32upx;
						margin-right: 20upx;
					}
					.outer2{
						padding: 6upx 10upx;
						color: #0084FD;
						font-size: 20upx;
						background:rgba(230,240,255,1);
						border-radius:6upx;
					}
					.outer3{
						color: #A6ADC1;
						font-size: 24upx;
						padding:0 25upx;
						position: relative;
						.line{
							position: absolute;
							right: 0;
							top: 50%;
							margin-top: -10upx;
							width:2upx;
							height:20upx;
							background:rgba(238,238,238,1);
						}
					}
					.outer4{
						width: 28upx;
						height: 28upx;
						margin-right: 14upx;
					}
					.outer5{
						font-size:24upx;
						color:rgba(231,74,85,1);
					}
				}
				.nextBox{
					position: absolute;
					width: 30upx;
					height: 30upx;
					right: 30upx;
					top: 50%;
					margin-top: -15upx;
				}
			}
		}
	}
	
</style>
