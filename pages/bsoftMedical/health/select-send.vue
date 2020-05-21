<template>
	<view>
		<!--自定义导航------>
		<semp-navbar :back="true" navBg="#fff">
			<view slot="default">
				选择发送对象
			</view>
			<view slot="search">
				<view class="searchBanner">
					<image class="searchImg" src="@/static/health/search.png"></image>
					<input class="uni-input" @input="onKeyInput" placeholder="搜索居民" />
				</view>
			</view>
			<!-- #ifndef MP -->
			<view slot="right" class="ser-btn" @click="send()">
				发送
			</view>
			 <!-- #endif -->
		</semp-navbar>
		<view class="content">
			<view class="banner1">
				<view class="contentHeader" @click="unfoldClassify()">
					<view class="headerLeft">
						<image class="type" src="@/static/health/classify.png"></image>
						<view class="title">人群分类</view>
					</view>
					<view v-if="!classify" class="put"></view>
					<view v-else class="unfold"></view>
				</view>
				<view class="listBox" v-if="classify">
					<view class="list" v-for="(item,index) in classifyList" :key="index">
						<view class="checkBox" @click="check(item)">
							<image v-if="item.type=='0'" class="listImg" src="@/static/health/unselected.png"></image>
							<image v-else-if="item.type=='1'" class="listImg" src="@/static/health/selected.png"></image>
							<image v-else class="listImg" src="@/static/health/not_opt.png"></image>
						</view>
						<view class="listTitle">
							<view class="outer1">{{item.title}}</view>
							<view class="outer2">({{item.num}})</view>
						</view>
					</view>
				</view>
			</view>
			<view class="banner1">
				<view class="contentHeader" @click="unfoldDefine()">
					<view class="headerLeft">
						<image class="type" src="@/static/health/self-define.png"></image>
						<view class="title">自定义群组</view>
					</view>
					<view v-if="!define" class="put"></view>
					<view v-else class="unfold"></view>
				</view>
				<view class="listBox" v-if="define">
					<view class="list" v-for="(item,index) in defineList" :key="index">
						<view class="checkBox" @click="check(item)">
							<image v-if="item.type=='0'" class="listImg" src="@/static/health/unselected.png"></image>
							<image v-else-if="item.type=='1'" class="listImg" src="@/static/health/selected.png"></image>
							<image v-else class="listImg" src="@/static/health/not_opt.png"></image>
						</view>
						<view class="listTitle">
							<view class="outer1">{{item.title}}</view>
							<view class="outer2">({{item.num}})</view>
						</view>
					</view>
				</view>
			</view>
			<view class="banner1">
				<view class="contentHeader" @click="unfoldMember()">
					<view class="headerLeft">
						<image class="type" src="@/static/health/member.png"></image>
						<view class="title">居民</view>
					</view>
					<view v-if="!member" class="put"></view>
					<view v-else class="unfold"></view>
				</view>
				<view class="listBox" v-if="member">
					<view class="list" v-for="(item,index) in memberList" :key="index">
						<view class="checkBox" @click="check(item)">
							<image v-if="item.type=='0'" class="listImg" src="@/static/health/unselected.png"></image>
							<image v-else-if="item.type=='1'" class="listImg" src="@/static/health/selected.png"></image>
							<image v-else class="listImg" src="@/static/health/not_opt.png"></image>
						</view>
						<view class="listTitle">
							<view class="outer1">{{item.name}}</view>
							<view class="outer3">{{item.male}}&nbsp;|&nbsp;{{item.brithday}}</view>
						</view>
					</view>
					<uni-load-more :status="loadingType"></uni-load-more>
				</view>
			</view>
			<view class="bt"></view>
			
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
				loadingType:"more",
				searchKey:'',
				classify:false,
				classifyList:[
					{
						title:'大于或等于65岁老人',
						num:'23',
						type:'0'//0是未选1是选中2是存在
					},
					{
						title:'高血压人群',
						num:'16',
						type:'0'//0是未选1是选中2是存在
					},
					{
						title:'孕产妇',
						num:'77',
						type:'0'//0是未选1是选中2是存在
					},
					{
						title:'重性精神病患者',
						num:'14',
						type:'0'//0是未选1是选中2是存在
					},
					{
						title:'肺结核',
						num:'24',
						type:'0'//0是未选1是选中2是存在
					},
					{
						title:'残疾人群',
						num:'23',
						type:'0'//0是未选1是选中2是存在
					},
					{
						title:'计生特殊家庭',
						num:'66',
						type:'0'//0是未选1是选中2是存在
					},
					{
						title:'0-6岁儿童',
						num:'11',
						type:'2'//0是未选1是选中2是存在
					},
					{
						title:'城乡低保五保',
						num:'23',
						type:'0'//0是未选1是选中2是存在
					},
					{
						title:'非重点人群',
						num:'34',
						type:'0'//0是未选1是选中2是存在
					},
					{
						title:'纳入计划生育家庭特别扶助制度',
						num:'6',
						type:'0'//0是未选1是选中2是存在
					},
				],
				define:false,
				defineList:[
					{
						title:'积极活跃',
						num:'23',
						type:'0'//0是未选1是选中2是存在
					},
					{
						title:'依从性低',
						num:'16',
						type:'0'//0是未选1是选中2是存在
					},
					{
						title:'依从性高',
						num:'77',
						type:'0'//0是未选1是选中2是存在
					}
				],
				member:false,
				memberList:[
					{
						name:'王熙凤',
						male:'女',
						brithday:'1952-06-20',
						type:'0'//0是未选1是选中2是存在
					},
					{
						name:'史湘云',
						male:'男',
						brithday:'1982-06-20',
						type:'0'//0是未选1是选中2是存在
					},
					{
						name:'贾探春',
						male:'男',
						brithday:'1992-06-20',
						type:'0'//0是未选1是选中2是存在
					},
					{
						name:'张三',
						male:'男',
						brithday:'1982-08-20',
						type:'0'//0是未选1是选中2是存在
					},
					{
						name:'李四',
						male:'女',
						brithday:'1999-06-12',
						type:'0'//0是未选1是选中2是存在
					},
					{
						name:'王五',
						male:'男',
						brithday:'1998-12-20',
						type:'0'//0是未选1是选中2是存在
					},
					{
						name:'赵柳',
						male:'女',
						brithday:'2000-02-13',
						type:'0'//0是未选1是选中2是存在
					}
				],
			}
		},
		methods:{
			getData(){
				console.log("获取数据")
			},
			onKeyInput: function(event) {
				this.searchKey = event.target.value
			},
			unfoldClassify(){
				this.classify=!this.classify;
			},
			unfoldDefine(){
				this.define=!this.define;
			},
			unfoldMember(){
				this.member=!this.member;
			},
			check(item){
				if(item.type=='2'){
					return
				}
				if(item.type=='0'){
					item.type='1';
				}else{
					item.type='0';
				}
			},
			send(){
				console.log("发送")
			}
		},
		onReachBottom() {
			if (this.loadingType == 'nomore' || this.member==false) {
				return;
			}
			this.getData();
		},
	}
</script>

<style scoped lang="scss">

page{
	height: 100%;
	background: #fff;
}
.ser-btn{
	color: #0084FD;
	font-size: 28upx;
}
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
		padding-left: 15px;
		height: 64upx;
		line-height: 64upx;
		.uni-input-placeholder{
		   color: #93989D;
		   font-size: 28upx;
		}
	}
}
.content{
	padding-top: 186upx;
	.banner1{
		border-top: 16upx solid #F3F2F7;
		.contentHeader{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 24upx;
			height: 115upx;
			.headerLeft{
				display: flex;
				align-items: center;
				.type{
					width: 44upx;
					height: 44upx;
					margin-right: 20upx;
				}
				.title{
					color: #181818;
					font-size: 34upx;
					font-weight:500;
				}
			}
			.put{
				background-image: url(@/static/health/next.png);
				background-size: 100%;
				background-repeat: no-repeat;
				width:9upx ;
				height:16upx ;
			}
			.unfold{
				background-image: url(@/static/health/next.png);
				background-size: 100%;
				background-repeat: no-repeat;
				transform:rotate(90deg);
				width:9upx ;
				height:16upx ;
			}
		}
		.listBox{
			padding-left:24upx;
			.list{
				height: 98upx;
				display: flex;
				align-items: center;
				justify-content: flex-start;
				.checkBox{
					width: 66upx;
					.listImg{
						width: 36upx;
						height: 36upx;
					}
				}
				.listTitle{
					flex: 1;
					height: 100%;
					border-top:1upx solid #EBEDF6 ;
					display: flex;
					align-items: center;
					.outer1{
						color: #181818;
						font-size: 30upx;
						max-width: 470upx;
						white-space: nowrap; 
						  overflow: hidden;
						  text-overflow:ellipsis;
					}
					.outer2{
						margin-left: 6upx;
						color: #999;
						font-size: 24upx;
					}
					.outer3{
						margin-left: 30upx;
						color: #999;
						font-size: 24upx;
					}
				}
			}
		}
		
	}
	.bt{
		width: 100%;
		height: 16upx;
		background-color:  #F3F2F7;
	}
}
</style>
