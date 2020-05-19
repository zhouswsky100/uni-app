<template>
	<view class="warp">
		<view class="search content-center">			
			<view class="ser-input content-center"  @click="searchClick">
				<text class="cuIcon-search"></text>
				<text>医院、科室、医生</text>
			</view>			
		</view>
		<view class="factor b-b b-t">
			<view class="factor-button-box flex-row space-between">
				<view class="factior-button-item" @click="onFactorClick(1)">					
					<text>{{factorTitle.area}}</text>
					<text :class="factorCur==1?'cuIcon-fold':'cuIcon-unfold'"></text>
				</view>
				<view class="factior-button-item"  @click="onFactorClick(2)">
					<text>{{factorTitle.gap}}</text>
					<text :class="factorCur==2?'cuIcon-fold':'cuIcon-unfold'"></text>
				</view>
				<view class="factior-button-item"  @click="onFactorClick(3)">
					<text>刷选</text>
					<text :class="factorCur==3?'cuIcon-fold':'cuIcon-unfold'"></text>
				</view>
			</view>
			<view class="factor-mask factor-warp" v-show="factorCur>0" @click="onFactorClick(0)"></view>
			<view class="factor-warp  f-area-bg" v-show="factorCur>0">
				<view class="f-area" v-show="factorCur==1">
					<view class="flex-row space-between factor-opt solid-bottom" :class="{active:item.checked}" v-for="(item,index) in areaList" :key="index" @click="areaClick(index,item)">
						<text>{{item.dvalue}}</text>
						<text class="cuIcon-check" v-if="item.checked"></text>
					</view>
					
				</view>
				<view class="f-area" v-show="factorCur==2">
					<view class="flex-row space-between factor-opt active">
						<text>就近</text>
						<text class="cuIcon-check"></text>
					</view>					
				</view>
				<view class="f-area" v-show="factorCur==3">
					<view class="factor-opt" v-for="(item,index) in filterList" :key="index">
						<view class="choose-opt-item">
							{{item.name}}：<text>{{factorTitle.shaixuan[item.identify]}}</text>
						</view>
						<view class="choose-opt-item">
							<!-- <view class='cu-tag round' :class="{active:filered[index]==-1}" @click="fileredClick(index,-1)">不限</view> -->
							<view class='cu-tag round' :class="{active:subitem.checked}" v-for="(subitem,subindex) in item.itemList" :key="subindex"  @click="fileredClick(index,subindex,item.identify)">{{index==0?subitem.dvalues:subitem.dvalue}}</view>
							
						</view>
					</view>
				
					<view class="factor-opt flex-row">
						<view class="clear-factor-item content-center" @click="clearFalered">清空条件</view>
						<view class="clear-factor-item content-center" @click="sureFalered"><text>确 定</text></view>
					</view>
				</view>
				
			</view>
			
		</view>
		<view class="hospital-list-box">
			<view class="hos-list-cell flex-row space-between b-b" v-for="(item,index) in hospitalList" :key="index" @click="hospitalClick(item.orgUuid)">
				<view class="list-left-box">
					<view class="hos-name">{{item.oname}}</view>
					<view class="hos-ops flex-row">
						<view class="ops-item"><text class="cuIcon-rank self-style"> </text><text class="ops-item-title">{{item.otype}}</text></view>
						<view class="ops-item"><text class="cuIcon-ticket self-style"> </text><text class="ops-item-title">{{item.olevel}}</text></view>
					</view>
					<view class="flex-row hos-ops">
						<view class="ops-item"><text class="cuIcon-location self-style"></text><text class="ops-item-title"> {{item.addr}}</text></view>
						
					</view>
				</view>
				<view class="list-right-box content-center margin-left-sm">
					<text>{{item.distance}}</text>
					<text class="cuIcon-right"></text>
				</view>
			</view>
			<uni-load-more :status="loadingType"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				hospitalList:[],
				 filterList:[
					 {
					 identify:"olevel",
					 name:"级别",
					 itemList:[
						 {
							 checked:true,
							  dkey: "",
							  dvalues: "不限"
						 }			 
					 ]
					},
					{
					 identify:"orgType",
					 name:"类型",
					 itemList:[
						 {
							 checked:true,
							  dkey: "",
							  dvalue: "不限"
						 }
					 ]
					}
				 ],								
				areaList:[
					{
						dkey:"",
						dvalue:"全市",
						checked:true
					},		
				],
				factorCur:0,
				factorTitle:{
					area:"全市",
					gap:"就近",
					shaixuan:{
						olevel:"不限",
						orgType:"不限"
					}
				},
				pagenum:1,
				loadingType:"more",
				postDataObj:{
					gpsLongitude:"",
					gpsLatitude:"",
					county:"",
					orgType:"",
					olevel:"",
					onameKey:"",
					hotOrderTag:"",
					userId:0,
					oproperty:"",
					orgPertainType:"",
					orderPoolType:"9"
				},
				hasPros:false
				
			}
		},
		onLoad(){
			
			uni.getLocation({
			    type: 'wgs84',
			    success:(res)=>{
					this.postDataObj.gpsLongitude= res.longitude;
					this.postDataObj.gpsLatitude=res.latitude;
					this.getData("refresh");
			    },
				fail:(err)=>{
					console.log(err);
				},
				
			});
			this.getData();
			// #ifdef MP-WEIXIN
			wx.login({
				// provider:"weixin",
				success:(res)=>{
					console.log(res)
					if(res.code){
						wx.request({
							url:'https://jklz.jkluzhou.cn/healthy/getOpenId.do',
							method: 'POST',									
							data:{
								code:res.code
							},
							success:(openInfo)=>{
								console.log(openInfo);
							},
							fail:(err)=>{
								console.log(res.code)
								console.log(err);
							}
						})
			
					}
					// uni.getUserInfo({
					//       provider: 'weixin',
					//       success:  (infoRes)=>{
					//         console.log(infoRes);
					//       }
					//     });
				},
				fail:(err)=>{
					console.log(err)
				},
				
			})
			// #endif
		},
		methods: {
			searchClick(){
				uni.navigateTo({
					url: '/pages/appointment/search/search'
				});
			},
			onFactorClick(e){
				if(e==this.factorCur){
					this.factorCur=0;
					return;
				}				
				this.factorCur=e;
				if(!this.hasPros){
					this.getHospitalPros()
				}
			},
			fileredClick(index,subindex,identify){				
				this.filterList[index].itemList.forEach((v)=>{
					v.checked=false
				})				
				this.filterList[index].itemList[subindex].checked=true;
				let field="";
				field=index==0?"dvalues":"dvalue";
				this.factorTitle.shaixuan[identify]=this.filterList[index].itemList[subindex][field];
			},
			clearFalered(){
				for(let item of this.filterList){
					item.itemList.forEach((v)=>{						
							v.checked=false										
					})
					item.itemList[0].checked=true;
				}
			},
			sureFalered(){				
				for(let item of this.filterList){					
					item.itemList.forEach((v)=>{						
						if(v.checked==true){
							this.postDataObj[item.identify]=v.dkey;
						}									
					})					
				}
				this.getData("refresh");
				this.onFactorClick(0);
			},
			areaClick(index,value){
				this.areaList.forEach((item)=>{
					item.checked=false;
				})
				this.areaList[index].checked=true;
				this.postDataObj.orgPertainType=value.dkey;
				this.factorTitle.area=value.dvalue;
				this.getData("refresh");
				this.onFactorClick(0);
			},
			hospitalClick(orgUuid){
				let paramsUrl="?orgUuid="+orgUuid;
				uni.navigateTo({
					url: '/pages/appointment/hospital-dept/hospital-dept'+paramsUrl
				});
			},
			getHospitalPros(){
				this.hasPros=true;			
				this.$globalMethod.ds_api({
					method:"m=K001&token=SemXlsuV0Ko2Ugrp&pagesize=20&pagenum=1",
					loadmsg:"医院区域查询",
					showLoading:false,
					data:{
						"dcode":"DICT_ORG_PERTAIN_TYPE",
						"dkey":"",
						"dvalue":""
					},
					success:(res)=>{
						if(!res || res.data.data.length==0){
							return
						}
						let list=res.data.data;
						list.forEach((item)=>{
							this.$set(item,"checked",false);
							this.areaList.push(item);
						})	
					}					
				})
				this.$globalMethod.ds_api({
					method:"m=K001&token=SemXlsuV0Ko2Ugrp&pagesize=20&pagenum=1",
					loadmsg:"医院类型查询",
					showLoading:false,
					data:{
						"dcode":"DICT_ORG_TYPE",
						"dkey":"",
						"dvalue":""
					},
					success:(res)=>{
						if(!res || res.data.data.length==0){
							return
						}
						let list=res.data.data;
						list.forEach((item)=>{
							this.$set(item,"checked",false);
							this.filterList[1].itemList.push(item)
						})
					}					
				})
				this.$globalMethod.ds_api({
					method:"m=K002&token=SemXlsuV0Ko2Ugrp&pagesize=20&pagenum=1",
					loadmsg:"医院级别查询",
					showLoading:false,
					data:{},
					success:(res)=>{
						if(!res || res.data.data.length==0){
							return
						}
						let list=res.data.data;
						list.forEach((item)=>{
							this.$set(item,"checked",false);
							this.filterList[0].itemList.push(item)
						})
					}					
				})
				
				
			},
			getData(type="add"){
				if (this.loadingType == 'loading' || this.loadingType=="nomore") {
					//防止重复加载
					return;
				}
				//下拉刷新加载时页码为1
				if (type == 'refresh') {
					this.hospitalList = [];
					this.pagenum = 1;
				}
				this.loadingType = 'loading';
				
				this.$globalMethod.ds_api({
					method:"m=B001&token=SemXlsuV0Ko2Ugrp&pagesize=20&pagenum="+this.pagenum,
					loadmsg:"医院列表",
					data:this.postDataObj,
					success:(res)=>{
						if(!res || !res.data.data || res.data.data.length==0){
							this.loadingType = 'nomore';
							return
						}
						
						let list=res.data.data;
						this.loadingType=list.length>=20?'more' : 'nomore';
						list.forEach((item)=>{
							this.hospitalList.push(item);
						})
						this.pagenum++;
					},
					fail:(err)=>{						
						uni.showToast({
							title:"获取数据失败",
							icon:"none"
						})						
					}
					
				})
				
			},
			stopPrevent(){}
		},
		onReachBottom() {
			if (this.loadingType == 'nomore') {
				return;
			}
			this.getData();
		},
		onPullDownRefresh() {
			this.getData('refresh');
		},
		computed: {
			...mapState(['$status']),
		},
	}
</script>

<style lang="scss">
	
	.warp{
		font-size:30upx;		
		width:100%;
		height:100%;
		background-color: #fff;
	}
	.search{
		height:84upx;
		width:100%;
		.ser-input{
			width:90%;
			height:56upx;
			border:1upx solid #ccc;
			text-align: center;
			font-size:28upx;
			color:#888;
			border-radius: 9upx;
			text:nth-child(1){
				margin-right:20upx
			}
		}
	}
	.factor{
		font-size:28upx;
		padding:20upx;
		position: relative;
		.factior-button-item{
			font-size:28upx;
			color:#888;
			
		}
		.factor-warp{
			position: absolute;
			width:100%;			
			top:80upx;
			left:0;
			z-index: 3;
			&.factor-mask{
				z-index: 2;
				height:80vh;
				background: rgba(0,0,0,.4);
			}
		}
		
	}
	.f-area-bg{
		background: #fff;
	}
	.f-area{
		font-size:28upx;		
		.factor-opt{
			padding:20upx;
			.choose-opt-item{
				padding:5upx 0;
				view{
					margin:5upx 15upx 5upx 0;
				}
				text{
					color:#157BC7;
				}
				.active{
					background:rgb(193, 221, 240);
				}
				
			}
			&.active{
				color:#157BC7;
			}
		}
	}
	.clear-factor-item{
		flex:1;
		color:#999;
		text{
			padding:3upx 30upx;
			color:#fff;
			background:#488aff;
			border-radius: 5upx;
			font-size:26upx;
		}
	}
	.hos-list-cell{
		padding:20upx;
	}
	.hos-name{
		height:50upx;
	}
	.hos-ops{
		height:50upx;
		.ops-item .ops-item-title{
			font-size: 28upx;
			color:#888;
			margin-right:30upx;
			margin-left:5upx;
		}
		
	}
	.cuIcon-rank{
		&.self-style{
			color:#888;
		}
	}
	.list-left-box{
		flex-shrink: 1;
		
		
	}
	.list-right-box{
		flex-shrink:0;
		
	}
</style>
