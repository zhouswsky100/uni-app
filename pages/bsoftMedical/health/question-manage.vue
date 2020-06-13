<template>
	<view>
		<semp-navbar :back="true" btnFlag='true' navBg="#fff">
			<view slot="default">
				问卷
			</view>
		</semp-navbar>
		<view class="warp">
			
			 <view class="progress-box banner1">
				<progress class="progress" active active-mode="forwards" :percent="progressValue" border-radius="7" backgroundColor="#F1F1F1" activeColor="#0084FD"/>
				<view class="inner1"><view class="outer1">{{current}}</view>/{{questionTotal}}</view>
			</view>
			<view class="content">
				<view class="inner2" v-for="(item,index) in questionList" :key="index" v-if="item.id==current">
					<view class="title">{{index+1}}.{{item.title}}</view>
					<view class="outer2" v-for="(i,k) in item.optionList" :key="k"  @click="checkOption(item,i)">
						<view>({{k+1}})&nbsp;&nbsp;{{i.optionTitle}}</view>
						<image v-if="i.optionChecked==true" class="checkQuestion" src="@/static/health/mchoose.png"></image>
					</view>
				</view>
			</view>
			<view class="fixed">
				<view class="onTopic" @click="goUp">上一题</view>
				<view v-if="current!=questionTotal" class="onTopic2" @click="goDown">下一题</view>
				<view v-else class="onTopic2" @click="goDown">完成</view>
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
			listId:'',
			questionList:[
				{
					title:'您精力充沛么吗？（指精神头足，乐于做事）',
					id:'1',
					optionList:[
						{
							optionTitle:'没有',
							optionId:'1',
							optionChecked:false,
						},
						{
							optionTitle:'很少',
							optionId:'2',
							optionChecked:false,
						},
						{
							optionTitle:'有时',
							optionId:'3',
							optionChecked:false,
						},
						{
							optionTitle:'经常',
							optionId:'4',
							optionChecked:false,
						},
						{
							optionTitle:'总是',
							optionId:'5',
							optionChecked:false,
						},
					],
				},
				{
					title:'您容易疲乏吗？（指体力如何，是否稍微活动一下或做一点家务劳动就感到累）',
					id:'2',
					optionList:[
						{
							optionTitle:'没有',
							optionId:'1',
							optionChecked:false,
						},
						{
							optionTitle:'很少',
							optionId:'2',
							optionChecked:false,
						},
						{
							optionTitle:'有时',
							optionId:'3',
							optionChecked:false,
						},
						{
							optionTitle:'经常',
							optionId:'4',
							optionChecked:false,
						},
						{
							optionTitle:'总是',
							optionId:'5',
							optionChecked:false,
						},
					],
				},
				{
					title:'您容易气短，呼吸短促，接不上气吗？',
					id:'3',
					optionList:[
						{
							optionTitle:'没有',
							optionId:'1',
							optionChecked:false,
						},
						{
							optionTitle:'很少',
							optionId:'2',
							optionChecked:false,
						},
						{
							optionTitle:'有时',
							optionId:'3',
							optionChecked:false,
						},
						{
							optionTitle:'经常',
							optionId:'4',
							optionChecked:false,
						},
						{
							optionTitle:'总是',
							optionId:'5',
							optionChecked:false,
						},
					],
				},
				{
					title:'您说话声音低弱无力吗？（指说话没有力气）',
					id:'4',
					optionList:[
						{
							optionTitle:'没有',
							optionId:'1',
							optionChecked:false,
						},
						{
							optionTitle:'很少',
							optionId:'2',
							optionChecked:false,
						},
						{
							optionTitle:'有时',
							optionId:'3',
							optionChecked:false,
						},
						{
							optionTitle:'经常',
							optionId:'4',
							optionChecked:false,
						},
						{
							optionTitle:'总是',
							optionId:'5',
							optionChecked:false,
						},
					],
				},
				{
					title:'您感到闷闷不乐，情绪低沉吗？（指心情不愉快，情绪低落）',
					id:'5',
					optionList:[
						{
							optionTitle:'没有',
							optionId:'1',
							optionChecked:false,
						},
						{
							optionTitle:'很少',
							optionId:'2',
							optionChecked:false,
						},
						{
							optionTitle:'有时',
							optionId:'3',
							optionChecked:false,
						},
						{
							optionTitle:'经常',
							optionId:'4',
							optionChecked:false,
						},
						{
							optionTitle:'总是',
							optionId:'5',
							optionChecked:false,
						},
					],
				},
				{
					title:'您容易精神紧张，焦虑不安吗？（指遇事是否心情紧张）',
					id:'6',
					optionList:[
						{
							optionTitle:'没有',
							optionId:'1',
							optionChecked:false,
						},
						{
							optionTitle:'很少',
							optionId:'2',
							optionChecked:false,
						},
						{
							optionTitle:'有时',
							optionId:'3',
							optionChecked:false,
						},
						{
							optionTitle:'经常',
							optionId:'4',
							optionChecked:false,
						},
						{
							optionTitle:'总是',
							optionId:'5',
							optionChecked:false,
						},
					],
				},
				{
					title:'您因为生活状态改变而感到孤独、失落吗？',
					id:'7',
					optionList:[
						{
							optionTitle:'没有',
							optionId:'1',
							optionChecked:false,
						},
						{
							optionTitle:'很少',
							optionId:'2',
							optionChecked:false,
						},
						{
							optionTitle:'有时',
							optionId:'3',
							optionChecked:false,
						},
						{
							optionTitle:'经常',
							optionId:'4',
							optionChecked:false,
						},
						{
							optionTitle:'总是',
							optionId:'5',
							optionChecked:false,
						},
					],
				},
				{
					title:'您容易感到害怕或受到惊吓吗？',
					id:'8',
					optionList:[
						{
							optionTitle:'没有',
							optionId:'1',
							optionChecked:false,
						},
						{
							optionTitle:'很少',
							optionId:'2',
							optionChecked:false,
						},
						{
							optionTitle:'有时',
							optionId:'3',
							optionChecked:false,
						},
						{
							optionTitle:'经常',
							optionId:'4',
							optionChecked:false,
						},
						{
							optionTitle:'总是',
							optionId:'5',
							optionChecked:false,
						},
					],
				},
				{
					title:'您感到身体超重不轻松吗？（感觉身体沉重）[BMI指数＝体重（kg）/身高2（m）]',
					id:'9',
					optionList:[
						{
							optionTitle:'（BMI<24）',
							optionId:'1',
							optionChecked:false,
						},
						{
							optionTitle:'（24≤BMI<25）',
							optionId:'2',
							optionChecked:false,
						},
						{
							optionTitle:'（25≤BMI<26）',
							optionId:'3',
							optionChecked:false,
						},
						{
							optionTitle:'（26≤BMI<28）',
							optionId:'4',
							optionChecked:false,
						},
						{
							optionTitle:'（BMI≥28）',
							optionId:'5',
							optionChecked:false,
						},
					],
				},
				{
					title:'您眼睛干涩吗？？',
					id:'10',
					optionList:[
						{
							optionTitle:'没有',
							optionId:'1',
							optionChecked:false,
						},
						{
							optionTitle:'很少',
							optionId:'2',
							optionChecked:false,
						},
						{
							optionTitle:'有时',
							optionId:'3',
							optionChecked:false,
						},
						{
							optionTitle:'经常',
							optionId:'4',
							optionChecked:false,
						},
						{
							optionTitle:'总是',
							optionId:'5',
							optionChecked:false,
						},
					],
				},
				{
					title:'您手脚发凉吗？（不包含因周围温度低或穿的少导致的手脚发冷）',
					id:'11',
					optionList:[
						{
							optionTitle:'没有',
							optionId:'1',
							optionChecked:false,
						},
						{
							optionTitle:'很少',
							optionId:'2',
							optionChecked:false,
						},
						{
							optionTitle:'有时',
							optionId:'3',
							optionChecked:false,
						},
						{
							optionTitle:'经常',
							optionId:'4',
							optionChecked:false,
						},
						{
							optionTitle:'总是',
							optionId:'5',
							optionChecked:false,
						},
					],
				},
				{
					title:'您胃脘部、背部或腰膝部怕冷吗？（指上腹部、背部、腰部或膝关节等，有一处或多处怕冷）',
					id:'12',
					optionList:[
						{
							optionTitle:'没有',
							optionId:'1',
							optionChecked:false,
						},
						{
							optionTitle:'很少',
							optionId:'2',
							optionChecked:false,
						},
						{
							optionTitle:'有时',
							optionId:'3',
							optionChecked:false,
						},
						{
							optionTitle:'经常',
							optionId:'4',
							optionChecked:false,
						},
						{
							optionTitle:'总是',
							optionId:'5',
							optionChecked:false,
						},
					],
				},
				{
					title:'您比一般人耐受不了寒冷吗？（指比别人容易害怕冬天或是夏天的冷空调，电扇等）',
					id:'13',
					optionList:[
						{
							optionTitle:'没有',
							optionId:'1',
							optionChecked:false,
						},
						{
							optionTitle:'很少',
							optionId:'2',
							optionChecked:false,
						},
						{
							optionTitle:'有时',
							optionId:'3',
							optionChecked:false,
						},
						{
							optionTitle:'经常',
							optionId:'4',
							optionChecked:false,
						},
						{
							optionTitle:'总是',
							optionId:'5',
							optionChecked:false,
						},
					],
				},
			],
			questionTotal:'',
			current:1,
			checkList:[],
		}
	},
	computed:{
		progressValue:function(){
			return (this.current/this.questionTotal)*100;
		}
	},
	methods:{
		checkOption(obj1,obj2){
			obj1.optionList.map((item)=>{
				item.optionChecked=false;
			})
			obj2.optionChecked=true;
			let currentQuestionId = Number(obj1.id) - 1;
			this.checkList.splice(currentQuestionId, 1 ,Number(obj2.optionId));
		},
		goUp(){
			//上一题
			if(this.current=='1'){
				uni.showToast({
				    title: '这已经是第一题了，不能再往前了哦`',
				    duration: 2000,
					icon:'none'
				});
			}else{
				this.current--;
			}
		},
		goDown(){
			//下一题
			if(this.current==this.questionTotal){
				if(this.checkList.includes('no')){
					uni.showToast({
					    title: '您还有题目没有完成哦',
					    duration: 2000,
						icon:'none'
					});
				}else{
					uni.setStorage({
					    key: 'finishIdentify',
					    data: this.listId+',1',
					    success: function () {
					        console.log('success');
					    }
					});
					// uni.redirectTo({
					//      url: '/pages/bsoftMedical/health/medicine-manage'
					// });
					uni.navigateBack({
					    delta: 2
					});
				}
			}else{
				this.current++;
			}
		},
	},
	onLoad(option){
		this.listId = option.id;
	},
	onShow(){
		this.questionTotal = this.questionList.length;
		let arr = Array.from(new Array(this.questionTotal).keys()).fill('no');
		this.checkList = arr;
	}
}
</script>

<style scoped lang="scss">
page{
	height: 100%;
	background: #fff;
}
.warp{
	width: 100%;
	height: 100%;
	position: relative;
	.banner1{
		margin: 148upx 0 50upx;
		padding: 0 24upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.progress{
			width: 574upx;
			/deep/ .uni-progress-bar{  // 这主要是加上deep才能改变它原来的样式 
				border-radius:7upx !important;
				.uni-progress-inner-bar{
					border-radius:7upx !important;
				}
			 }  
		}
		.inner1{
			font-size: 34upx;
			color: #5E6A84;
			display: flex;
			.outer1{
				color: #0084FD;
			}
		}
	}
	.content{
		margin-bottom: 118upx;
		.inner2{
			.title{
				padding: 0 24upx;
				color: #020221;
				font-size: 34upx;
				margin-bottom: 70upx;
			}
			.outer2{
				margin: 0 auto 24upx;
				padding: 0  30upx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				width:640upx;
				height:104upx;
				background:rgba(243,244,248,1);
				border-radius:10upx;
				color: #5E6A84;
				font-size: 30upx;
				.checkQuestion{
					width: 34upx;
					height: 24upx;
				}
			}
		}
	}
	.fixed{
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		padding:0 50upx 34upx;
		display: flex;
		justify-content: space-between;
		.onTopic{
			width:300upx;
			height:84upx;
			background:rgba(250,250,250,1);
			border:2upx solid rgba(235,235,235,1);
			border-radius:42upx;
			color: #31394C;
			font-size: 36upx;
			text-align: center;
			line-height: 84upx;
		}
		.onTopic2{
			width:300upx;
			height:84upx;
			background:rgba(0,132,253,1);
			border-radius:42upx;
			color: #fff;
			font-size: 36upx;
			text-align: center;
			line-height: 84upx;
		}
	}
}
</style>
