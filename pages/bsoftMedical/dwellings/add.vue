<template>
	<view class="wrap">
		<view class="banner1">
			<view class="contentBox" v-for="(item,index) in addList" :key="index">
				<view class="content">
					<view class="name">{{item.name}}</view>
					<view class="infoBox">
						<view class="inner1 inner3">年龄：{{item.age}}</view>
						<view class="inner1">性别：{{item.male}}</view>
						<view class="inner1 inner2">电话:{{item.phone}}</view>
					</view>
				</view>
				<view class="rightBox">
					<image v-if="item.type==1" src="@/static/juming/opted.png"></image>
					<image @click="cancel(item)" v-if="item.type==2" src="@/static/juming/opt.png"></image>
					<view @click="check(item)" v-if="item.type==3" class="right"></view>
				</view>
			</view>
		</view>
		<view class="btnBox">
			<button class="btnTrue" @click="added">确认</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				addListBegin:[
					{
						name:'范秋阳',
						age:'65',
						male:'男',
						phone:'13678768888',
						type:'3'//1.已选2.选中3.未选
					},
					{
						name:'史朝雨',
						age:'48',
						male:'男',
						phone:'18779868123',
						type:'3'//1.已选2.选中3.未选
					},
					{
						name:'詹一璇',
						age:'68',
						male:'女',
						phone:'13145632453',
						type:'3'//1.已选2.选中3.未选
					},
					{
						name:'田幻波',
						age:'58',
						male:'男',
						phone:'18998766732',
						type:'3'//1.已选2.选中3.未选
					},
					{
						name:'申秀美',
						age:'61',
						male:'女',
						phone:'15645729871',
						type:'3'//1.已选2.选中3.未选
					},
					{
						name:'朱浦泽',
						age:'63',
						male:'男',
						phone:'13554543232',
						type:'3'//1.已选2.选中3.未选
					},
					{
						name:'翟子明',
						age:'54',
						male:'男',
						phone:'17698124334',
						type:'3'//1.已选2.选中3.未选
					},
					{
						name:'许子健',
						age:'65',
						male:'男',
						phone:'18712674376',
						type:'3'//1.已选2.选中3.未选
					},
					{
						name:'宋弘文',
						age:'59',
						male:'男',
						phone:'18979868291',
						type:'3'//1.已选2.选中3.未选
					},
					{
						name:'廖鸿德',
						age:'62',
						male:'男',
						phone:'13333489961',
						type:'3'//1.已选2.选中3.未选
					},
					{
						name:'张和歌',
						age:'62',
						male:'男',
						phone:'18754009889',
						type:'3'//1.已选2.选中3.未选
					},
				],
				addList:''
			}
		},
		methods:{
			check(item){
				item.type='2';
			},
			cancel(item){
				item.type='3';
			},
			added(){
				const self = this;
				self.addList.map((item)=>{
					if(item.type=='2'){
						item.type=1
					}
				})
				let addListStorage = JSON.stringify(self.addList)
				uni.setStorage({
				    key: 'addListBegin',
				    data: addListStorage,
				    success: function () {
						uni.redirectTo({
						    url: '/pages/bsoftMedical/dwellings/custom-list'
						});
				    }
				});
			}
		},
		onShow() {
			const self=this;
			let addListBeginStorage = JSON.stringify(self.addListBegin)
			uni.setStorage({
			    key: 'addListBegin',
			    data: addListBeginStorage,
			    success: function () {
					uni.getStorage({
					    key: 'addListBegin',
					    success: function (res) {
							self.addList = JSON.parse(res.data);
					    }
					});
			    }
			});
			
		}
	}
</script>

<style lang="scss" scoped>
	.wrap{
		font-size: 30upx;
		width: 100%;
		height: 100%;
		
		.banner1{
			padding-bottom: 139upx;
			.contentBox{
				padding: 30upx 24upx 0;
				height: 140upx;
				background-color: #fff;
				margin-bottom: 2upx;
				position: relative;
				.content{
					width: 100%;
					height: 100%;
					.name{
						color: #07103C;
						font-size: 32upx;
						margin-bottom: 10upx;
					}
					.infoBox{
						display: flex;
						align-items: center;
						font-size: 24upx;
						color: #8B8C8F;
						.inner1{
							height: 100%;
							padding: 0 27upx;
							border-right: 2upx solid #eee;
						}
						.inner2{
							border: 0;
						}
						.inner3{
							padding-left: 0;
						}
					}
				}
				.rightBox{
					width: 32upx;
					height: 32upx;
					right: 24upx;
					position: absolute;
					top: 50%;
					margin-top: -16upx;
					image{
						width: 32upx;
						height: 32upx;
					}
					.right{
						width: 30upx;
						height: 30upx;
						border-radius: 15upx;
						border: 2upx solid #B8BCC0;
					}
					
				}
			}
		}
	}
</style>
