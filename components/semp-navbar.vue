<template>
	<view>	
		
		<view class="semp-nav" :class="{noheight:type=='transparent'}" >
			
			<view class="header" :class="{fixed: type == 'fixed',normal: type == 'normal' ,line: navLine}"  :style="{'background-color':navBg}">
				 <!-- #ifndef H5-->
				<view class="status_bar">
				    <!-- 这里是状态栏 -->
				</view>
				 <!-- #endif-->
				<view class="nav-content">
					<view class="left-info" v-if="back || $slots.left">
						<view class="back cuIcon-back" v-if="back" @click="onBackPage"></view>
						<slot name="left"></slot>
					</view>
					<view class="middle-info" v-if="navTitle || $slots.default">
						<view class="title" :class="{ center: titleCenter }" v-if="navTitle" style="{color:titleColor}">
							{{navTitle}}
						</view>
						<slot name="default"></slot>
					</view>
					<view class="right-info" v-if="$slots.right">
						<slot name="right"></slot>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{						
			type:{
				type: String,
				default: "fixed" //normal:滚动是导航栏不会跟着滚动，fixed:滚动时浮动在固定位置，transparent：透明渐变
			},
			navBg:{
				type: String,
				default: "#fff"
			},
			navLine:{
				type: Boolean,
				default: true
			},
			back:{
				type: Boolean,
				default: false
			},
			navTitle:{
				type: String,
				default: ""
			},
			titleColor:{
				type: String,
				default: "#333"
			},
			titleCenter:{
				type: Boolean,
				default: true
			},
			//透明渐变是字体的颜色
			transparentFontColor:{
				type: String,
				default: "#fff"
			}
		},
		data() {
			return {				
				statusBarHeight:0
			};
		},
		// created() {
		// 	this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight'];
		// },
		methods:{
			onBackPage() {
				uni.navigateBack();
			},
		},
		computed: {
			 // opacityValue(){				
			 // 	return this.transparentValue;				
			 // }
		}
	}
</script>

<style lang="scss" scoped>
	 .semp-nav{
		 /* #ifndef H5 */
		 padding-top:var(--status-bar-height);
		/* #endif */
		&.noheight{
			position: fixed;
			left:0;
			top:0;
			width:100%;
			z-index: 3;
		}
	 }
	
	.header{
		
		align-items: center;
		position: relative;		
		box-sizing:content-box;
		 /* #ifndef H5 */
		 // padding-top:var(--status-bar-height);
		 /* #endif */
		 /* #ifdef MP */
		padding-right: 230upx;
		/* #endif */
		.nav-content{
			display: flex;
			height: 88upx;			
			width:100%;
			flex-direction: row;
			align-items: center;
		}
		.status_bar {
		    height: var(--status-bar-height);		
			width:100%;
		}
		&.fixed {
			position: fixed;
			top: 0;
			/* #ifndef H5 */
			// top:var(--status-bar-height);
			/* #endif */
			left: 0;
			right: 0;
			z-index: 99;
		}
		&.normal {
			position:static;
		}
		&.line {
			//需要显示线条的在这打开
			 border-bottom: 2upx solid #eee;
			//box-shadow: 0 0 6upx 0 #ddd;
		}
		
	}
	$height: 56upx;
	.left-info{
		flex-shrink: 0;	
		display: flex;
		align-items: center;
		height: $height;
		transition: all 0.6s;
		margin-left:16upx;
		.back{
			color:#fff;
			font-size:34upx;
		}
	}
	.right-info {
		flex-shrink: 0;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right:16upx;
		
	}
	.middle-info{
		width:100%;
		.title{
			height: 88upx;
			font-size: 32upx;
			padding-left: 30upx;
			font-weight: 700;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			display: flex;
			align-items: center;
			/* #ifndef APP-PLUS||H5 */
			max-width: 60vw;
			/* #endif */
			&.center {
				justify-content: center;
				
				
			}
		}
	}


</style>
