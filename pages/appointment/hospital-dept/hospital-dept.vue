<template>
	<view class="warp">
		<view class="g-item">
			<image :src="hospitalDetail.logoUrl"></image>
			<view class="right">
				<view class="title flex-row space-between y-center" @click="hospitalInfo"><text>{{hospitalDetail.oname}}</text><text class="cuIcon-right"></text></view>				
				<view class="ops-box">
					<text class="number">{{hospitalDetail.olevel}}</text> 
					<text class="number">|</text>
					<text class="number">{{hospitalDetail.otype}}</text>
				</view>
				<view class="ops-box flex-row space-between">
					<view><text class="cuIcon-locationfill"></text><text class="number">{{hospitalDetail.addr}}</text></view>
					<text class="cuIcon-phone self-style" @click="telphone(hospitalDetail.phone)"></text>
				</view>
			</view>
		</view>
		<view class="search">
			<view class="search-box flex-row y-center">
				<text class="cuIcon-search"></text>
				<view><input type="text" placeholder="科室" @input="search" v-model="inputVal" /></view>
			</view>
		</view>
		<view class="dept-list-box flex-row">
			<view class="dept-list-left">
				<scroll-view scroll-y class="left-aside">
					<view v-for="(item,index) in deptList" :key="index" class="f-item b-b" :class="{active: currentId==index}" @click="tabtap(index,item.id)">
						{{item.name}}
					</view>
				</scroll-view>
			</view>
			<view class="dept-list-right">
				<view class="dept-item flex-row y-center space-between" v-for="(item,index) in rightCheckedList" :key="index" @click="deptDetalClick(item.orgDeptUuid,item.dname)">					
					<text>{{item.dname}}</text>
					<text class="cuIcon-right"></text>
				</view>
			</view>
		</view>
		
	</view>	
</template>

<script>
	export default {
		data() {
			return {
				inputVal:'',
				hospitalDetail:{},
				deptList:[],
				rightCheckedList:null,
				currentId:0,
				orgUuid:"",
				deptListTemp:[],
				filterNameTimer:0
				
			}
		},
		onLoad(e){
			this.orgUuid=e.orgUuid;
			this.getData();
			this.getHospList();
			
		},
		methods:{
			telphone(phone){
				uni.makePhoneCall({
				    phoneNumber: phone
				});
			},
			tabtap(index){	
				if(this.currentId==index){
					return
				}
				this.rightCheckedList=this.deptList[index].itemList				
				this.currentId=index;				
				
			},			
			deptDetalClick(orgDeptUuid,deptName){
				uni.navigateTo({
					url: '/pages/appointment/dept-detal/dept-detal?orgDeptUuid='+orgDeptUuid+"&orgUuid="+this.orgUuid+'&deptName='+deptName
				});
			},
			hospitalInfo(){
				uni.navigateTo({
					url: '/pages/appointment/hospital-dept/hospital-info?orgUuid='+this.orgUuid
				});
			},
			search(){	
				setTimeout(()=>{
					if(this.inputVal){													   
							this.deptList=[];												
							for(let item of this.deptListTemp){
								if(this.$globalMethod.hqkFuncStartWith(item.name,this.inputVal)){
									this.deptList.push(item);	
								}else{
									let isfiler=item.itemList.some((val)=>{
										return this.$globalMethod.hqkFuncStartWith(val.dname,this.inputVal)
									})
									if(isfiler){
										this.deptList.push(item);
									}
								}								
							}							
							this.rightCheckedList=this.deptList.length>0?this.deptList[0].itemList:"";										
					}else{
						this.deptList=[];
						for(let item of this.deptListTemp){
							this.deptList.push(item)
						}						
						this.rightCheckedList=this.deptList[this.currentId].itemList;
					}
				},0)
			},
			getData(){
				this.$globalMethod.ds_api({
					method:"m=B0012&token=SemXlsuV0Ko2Ugrp",
					loadmsg:"医院详情",					
					data:{
						orgUuid:this.orgUuid,
						
					},
					success:(res)=>{
						if(!res || !res.data.data){
							return
						}						
						this.hospitalDetail=res.data.data;
						this.hospitalDetail.logoUrl='../../../static/hosptialDefault.png';
						// this.hospitalDetail.logoUrl=this.hospitalDetail.logoUrl==''?'../../../static/hosptialDefault.png':this.hospitalDetail.logoUrl
						console.log(this.hospitalDetail);
					}					
				})
			},
			getHospList(){
				this.$globalMethod.ds_api({
					method:"m=B002&token=SemXlsuV0Ko2Ugrp",
					loadmsg:"科室列表",					
					data:{
						orgUuid:this.orgUuid,						
					},
					success:(res)=>{
						if(!res || res.data.data.length==0){
							return
						}						
						let detailObj=res.data.data;
						for(let key in detailObj){
							let list=detailObj[key];
							this.deptList.push({
								name:key,
								itemList:list
							})							
						}
						for(let item of this.deptList){
							this.deptListTemp.push(item);
						}
						this.rightCheckedList=this.deptList[0].itemList;
					}					
				})
			}
		}
	}
</script>


<style lang="scss">
		
	.warp{
		font-size:30upx;		
		width:100%;
		height:100%;
		background-color: #fff;
	}
	.g-item {
		display: flex;
		padding: 20upx;
	
		image {
			flex-shrink: 0;
			display: block;
			width: 120upx;
			height: 120upx;
			border-radius: 5000upx;
		}
	
		.right {
			flex: 1;
			padding-left: 24upx;
			overflow: hidden;
		}	
		.title{			
			flex:1;
			text{
				font-size: 30upx;
				color: #333;
			}
		}
		.ops-box {
			display: flex;
			align-items: center;
			font-size: 28upx;
			color:#999;
			padding-top: 10upx;		
			.number {
				font-size: 26upx;
				color: #999;
				margin-right: 15upx;
			}
		}
	}
	.self-style{
		font-size:34upx;
	}
	.search{
		background-color: #fff;
		padding:10upx 20upx;
		border-top:20upx solid #f2f2f2;
	}
	.search-box{
		height:56upx;
		border:1upx solid #ccc;
		padding: 0 15upx;
		view{
			margin-left:10px;
			input[type=text]{
				height:50upx;
				text-indent: 20upx;
				line-height: 50upx;
				
			}
		}
		
	}
	.dept-list-box{
		height:1000upx;
		.dept-list-left{
			flex: 2;
			background-color: #eee;
			
		}
		.dept-list-right{
			flex: 3;
			.dept-item{
				padding:15upx;
				text{
					color:#333
				}
			}
		}
	}
	.left-aside{
		height:100%;
		background: #f2f2f2;
		
	}
	.f-item{
		padding:15upx;
		&.active{
			background: #fff;
		}
	}
</style>
