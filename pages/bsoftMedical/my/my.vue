<template>
	<view class="warp">
		<view class="myBox">
			<view class="infoBox">
				<view class="cu-avatar round headImg"></view>
				<view class="info">
					<view class="infoDetail1">庄伟华</view>
					<view class="infoDetail2">深圳市福田区景田社康服务中心</view>
				</view>
			</view>
			<view class="headListBox">
				<view class="headList" @click="notYet()">
					<view class="listImgBox">
						<image class="performance" src="@/static/my/performance.png"></image>
					</view>
					<view class="listTitle">我的绩效</view>
				</view>
				<view class="headList" @click="notYet()">
					<view class="listImgBox">
						<image class="team_interact" src="@/static/my/team_interact.png"></image>
					</view>
					<view class="listTitle">团队互动</view>
				</view>
				<view class="headList" @click="notYet()">
					<view class="listImgBox">
						<image class="knowledge_base" src="@/static/my/knowledge_base.png"></image>
					</view>
					<view class="listTitle">医药知识库</view>
				</view>
			</view>
			<view class="bg"></view>
			<view class="xiaoxi" @click="notYet()">
				<view class="hasInfoFlag"></view>
			</view>
		</view>
		<view class="banner1">
			<view class="titleBox" @click="screen()">
				<view class="span">{{projectName}}</view>
				<view class="down"></view>
			</view>
			<view class="titleBox">
				<view class="span">计划随访时间</view>
				<view class="topbottom">
					<view class="ctopBox">
						<view class="cTop"></view>
					</view>
					<view class="cbottomBox">
						<view class="cBottom"></view>
					</view>
				</view>
			</view>
		</view>
		<view class="contentBox">
			<view class="inner1" v-for="(item,index) in showList" :key="index" >
				<view class="p">{{item.title}}</view>
				<view class="outer1">
					<view class="detail">姓名：{{item.name}}</view>
					<view class="detail">计划随访时间：{{item.time}}</view>
				</view>
				<view class="outer2">
					<view class="contactBox">
						<image class="call" src="@/static/my/call.png"></image>
						<view>{{item.phone}}</view>
					</view>
					<view class="contactBox">
						<image class="new" src="@/static/my/news.png"></image>
						<view>消息</view>
					</view>
				</view>
				<button @click="process(item)">处理</button>
			</view>
		</view>
		<view v-if="screenShow" class="dialogBox" @click="closeDialog">
			<view class="dialog">
				<view class="dialogList" v-for="(item,index) in projectList" :key="index" @click.stop="checkProject(item)">{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue'
export default {
	components: {uniPopup},
	data() {
		return {
			projectName:'随访项目',
			itemList:[
				{
					title:'糖尿病随访',
					name:'范秋阳',
					age:'65',
					male:'男',
					phone:'13678768888',
					time:'2020-05-30',
					type:'1',
					id:0
				},
				{
					title:'高血压随访',
					name:'史朝雨',
					age:'48',
					male:'男',
					phone:'18779868123',
					time:'2020-05-31',
					type:'0',
					id:1
				},
				{
					title:'老年人随访',
					name:'詹一璇',
					age:'68',
					male:'女',
					phone:'13145632453',
					time:'2020-06-01',
					type:'3',
					id:2
				},
				{
					title:'中医体质辨识',
					name:'田幻波',
					age:'78',
					male:'男',
					phone:'18998766732',
					time:'2020-06-02',
					type:'2',
					id:3
				},
				{
					title:'糖尿病随访',
					name:'申秀美',
					age:'61',
					male:'女',
					phone:'15645729871',
					time:'2020-06-03',
					type:'1',
					id:4
				},
				{
					title:'高血压随访',
					name:'朱浦泽',
					age:'63',
					male:'男',
					phone:'13554543232',
					time:'2020-06-04',
					type:'0',
					id:5
				},
				{
					title:'老年人随访',
					name:'翟子明',
					age:'54',
					male:'男',
					phone:'17698124334',
					time:'2020-06-05',
					type:'3',
					id:6
				},
				{
					title:'中医体质辨识',
					name:'许子健',
					age:'65',
					male:'男',
					phone:'18712674376',
					time:'2020-06-06',
					type:'2',
					id:7
				},
				{
					title:'中医体质辨识',
					name:'宋弘文',
					age:'69',
					male:'男',
					phone:'18979868291',
					time:'2020-06-07',
					type:'2',
					id:8
				},
				{
					title:'中医体质辨识',
					name:'廖鸿德',
					age:'62',
					male:'男',
					phone:'13333489961',
					time:'2020-06-08',
					type:'2',
					id:9
				},
				
			],
			showList:'',
			projectId:'-1',
			projectList:[
				{
					name:'默认',
					id:'-1',
					value:'随访项目'
				},
				
				{
					name:'高血压',
					id:'0',
					value:'高血压'
				},
				{
					name:'糖尿病',
					id:'1',
					value:'糖尿病'
				},
				{
					name:'中医药',
					id:'2',
					value:'中医药'
				},
				{
					name:'老年人',
					id:'3',
					value:'老年人'
				},
			],
			screenShow:false,
		}
	},
	methods:{
		screen(){
			this.screenShow=!this.screenShow;
			//this.$refs.popup.open()
		},
		checkProject(obj){
			this.screenShow=false;
			this.projectName= obj.value;
			if(obj.id=='-1'){
				this.showList = this.itemList;
			}else{
				this.showList=[];
				this.itemList.map((item)=>{
					if(item.type==obj.id){
						this.showList.push(item)
					}
				})
			}
		},
		closeDialog(){
			this.screenShow=false;
		},
		//跳转随访
		process(obj){
			let type = obj.type;
			switch(type){
				case '3':
					//老年人
					uni.showToast({
					    title: '暂无开发',
					    duration: 2000,
						icon:'none',
					});
				break;
				case '0':
					//高血压
					uni.navigateTo({
					    url: '/pages/bsoftMedical/health/hypertensive-manage'
					});
				break;
				case '1':
					//糖尿病
					uni.navigateTo({
					    url: '/pages/bsoftMedical/health/diabetes-manage'
					});
				break;
				case '2':
					//中医药
					uni.navigateTo({
					    url: '/pages/bsoftMedical/health/medicine-manage?id='+obj.id
					});
				break;
			}
		},
		notYet(){
			uni.showToast({
			    title: '功能完善中',
			    duration: 2000,
				icon:'none'
			});
		},
	},
	onShow(){
		this.showList = this.itemList;
	},
	
}
</script>

<style lang="scss" scoped>
.warp{
	font-size:30upx;		
	width:100%;
	height:100%;
	background-color: #F2F4F9;
	.myBox{
		height: 328upx;
		background: linear-gradient(to right,#4b9bff,#027bfd,#027bfd);
		padding-top: 38upx;
		.infoBox{
			width: 100%;
			padding: 0 24upx;
			display: flex;
			margin-bottom: 60upx;
			z-index: 2;
			.headImg{
				background-image: url(@/static/touxiang2.png);
				margin-right: 22upx;
			}
			.info{
				display: flex;
				flex-direction: column;
				
				>view{
					flex: 1;
					display: flex;
					align-items: center;
					&.infoDetail1{
						font-size: 38upx;
						color: #FEFEFF;
					}
					&.infoDetail2{
						font-size: 24upx;
						color: #D9E9FF;
					}
				}
			}
		}
		.headListBox{
			display: flex;
			z-index: 2;
			height: 100upx;
			
			.headList{
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: center;
				.listImgBox{
					height: 45upx;
					margin-bottom: 10upx;
					.performance{
						width: 44upx;
						height: 40upx;
					}
					.team_interact{
						width: 56upx;
						height: 40upx;
					}
					.knowledge_base{
						width: 44upx;
						height: 45upx;
					}
				}
				.listTitle{
					font-size: 24upx;
					color: #fff;
				}
			}
		}
		.bg{
			margin-top: -200upx;
			background-image: url(@/static/my/bg.png);
			background-size: 100%;
			background-repeat: no-repeat;
			width: 750upx;
			height: 221upx;
		}
		.xiaoxi{
			position: absolute;
			top: 28upx;
			right:30upx;
			background-image: url(@/static/my/inform.png);
			background-size: 100%;
			background-repeat: no-repeat;
			width: 36upx;
			height: 33upx;
			.hasInfoFlag{
				position: absolute;
				width: 10upx;
				height: 10upx;
				border-radius: 10upx;
				background: #FF5633;
				top:-8upx;
				right: -8upx;
			}
		}
	}
	.banner1{
		height: 93upx;
		padding:0 27upx;
		width: 100%;
		display: flex;
		.titleBox{
			display: flex;
			align-items: center;
			margin-right: 60upx;
			.span{
				color:#07103C;
				font-size: 28upx;
				margin-right: 13upx;
			}
			.cBox{
				display: flex;
				flex-direction: column;
			}
			.down{
				background-image: url(@/static/my/down.png);
				background-size: 100%;
				background-repeat: no-repeat;
				width:12upx ;
				height:6upx ;
			}
			.topbottom{
				height: 100%;
				display: flex;
				flex-direction: column;
				width: 40upx;
				.ctopBox{
					flex: 1;
					display: flex;
					align-items: flex-end;
					margin-bottom: 4upx;
					.cTop{
						background-image: url(@/static/my/top.png);
						background-size: 100%;
						background-repeat: no-repeat;
						width:18upx ;
						height:10upx ;
					}
				}
				.cbottomBox{
					flex: 1;
					display: flex;
					align-items: flex-start;
					margin-top: 4upx;
					.cBottom{
						background-image: url(@/static/my/bottom.png);
						background-size: 100%;
						background-repeat: no-repeat;
						transform:rotate(180deg);
						width:18upx ;
						height:10upx ;
					}
				}
			}
			
			
		}
	}
	.contentBox{
		width: 100%;
		padding: 0 24upx;
		position: absolute;
		left: 0;
		top:421upx;
		height: calc(100% - 421upx);
		overflow-y: scroll;
		.inner1{
			height: 200upx;
			padding: 30upx;
			width: 100%;
			background: #fff;
			border-radius: 20upx;
			margin-bottom: 20upx;
			position: relative;
			.p{
				width: 100%;
				font-size: 30upx;
				color: #07103C;
				margin-bottom: 10upx;
			}
			.outer1{
				display: flex;
				align-items: center;
				margin-bottom: 26upx;
				.detail{
					margin-right: 40upx;
					color: #A6ADC1;
					font-size: 24upx;
				}
			}
			.outer2{
				display: flex;
				.contactBox{
					display: flex;
					align-items: center;
					margin-right: 50upx;
					.call{
						width: 26upx;
						height: 32upx;
						
					}
					.new{
						width: 30upx;
						height: 26upx;
					}
					view{
						margin-left: 15upx;
						color: #A6ADC1;
						font-size: 24upx;
					}
				}
			}
			button{
				position: absolute;
				top:30upx;
				right: 30upx;
				width: 124upx;
				height: 48upx;
				border-radius: 24upx;
				background: #207EFA;
				color: #fff;
				font-size: 26upx;
				line-height: 48upx;
			}
			uni-button:after {
				display: none;
			}
				
		}
	}
	.dialogBox{
		width: 100%;
		
		position: absolute;
		left: 0;
		top:421upx;
		background: rgba($color: #000000, $alpha: .5);
		height: calc(100% - 421upx);
		z-index:66;
		.dialog{
			background: #fff;
			.dialogList{
				padding: 0 24upx;
				height: 86upx;
				border-bottom: 1upx solid #E9E9E9;
				line-height: 86upx;
				color: #020221;
				font-size: 30upx;
			}
		}
	}
}
</style>
