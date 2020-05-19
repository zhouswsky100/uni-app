<template>
	<view class="wrap">
		<view class="banner1">群组名称</view>
		<view class="banner2">
			<input class="uni-input" type="text" placeholder="输入自定义群组名称" :value="listName" @input="input" />
		</view>
		<view class="banner1">群组成员</view>
		<view class="banner3">
			<view class="inner1 inner2">
				<image @click="add" src="@/static/juming/add.png"></image>
				<image v-if="contentList.length>0" @click="del" src="@/static/juming/delete.png"></image>
			</view>
			<view v-if="contentList.length>0" class="inner1" v-for="(item,index) in contentList" :key="index">
				<view class="outer1">{{item.name}}</view>
				<view class="outer2">{{item.phone}}</view>
			</view>
		</view>
		<view class="btnBox">
			<button class="btnTrue">确认</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				listName:'',
				contentList:'',
			}
		},
		methods:{
			input(e) {
				this.listName = e.detail.value;
			},
			add(){
				uni.navigateTo({
				    url: '/pages/bsoftMedical/dwellings/add'
				});
			},
			del(){
				uni.navigateTo({
				    url: '/pages/bsoftMedical/dwellings/del'
				});
			}
		},
		onLoad() {
			const self = this;
			uni.getStorage({
			    key: 'addListBegin',
			    success: function (res) {
					let data = JSON.parse(res.data);
					let list=[];
					data.map((item)=>{
						if(item.type=='1'){
							list.push(item)
						}
					})
					self.contentList = list;
			    }
			});
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		font-size: 30upx;
		width: 100%;
		height: 100%;
		.banner1{
			padding: 0 25upx;
			height: 84upx;
			line-height: 84upx;
			color: #838BA3;
			font-size: 26upx;
		}
		.banner2{
			height: 108upx;
			padding: 0 25upx;
			background: #fff;
			.uni-input{
			   height: 100%;
			   border:0;
			   .uni-input-placeholder{
				   color: #CBCFD7;
				   font-size: 32upx;
			   }
			}
		}
		.banner3{
			padding: 30upx 15upx;
			background: #fff;
			display: flex;
			flex-wrap: wrap;
			.inner1{
				width: 220upx;
				margin: 0 10upx;
				height: 100upx;
				background:rgba(233,240,255,1);
				border-radius:10upx;
				margin-bottom: 20upx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.outer1{
					color: #0084FD;
					font-size: 28upx;
				}
				.outer2{
					color: #67A7FF;
					font-size: 26upx;
				}
				&.inner2{
					flex-direction: row;
					justify-content: space-between;
					background: #fff;
					image{
						width: 100upx;
						height: 100upx;
					}
				}
			}
		}
	}
</style>
