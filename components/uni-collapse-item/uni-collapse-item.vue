<template>
	<view :class="{ 'uni-collapse-cell--disabled': disabled,'uni-collapse-cell--notdisabled': !disabled, 'uni-collapse-cell--open': isOpen,'uni-collapse-cell--hide':!isOpen }"
	 class="uni-collapse-cell">
		<view class="uni-collapse-cell__title" @click="onClick">
			<image v-if="thumb" :src="thumb" v-bind:style="{ width:  imgWidth + 'upx', height:imgHeight+'upx', marginRight: mRight + 'upx'}" />
			<text class="uni-collapse-cell__title-text">
				<text>{{ title }}</text><text class="keypointClass" :class="{'keypointClass2':keyPoint===true}">*</text>
			</text>
			<text class="uni-collapse-cell__title-text"><text class="content">{{content}}</text></text>
			<text v-if="point" class="uni-collapse-cell__title-text"><text class="point">{{point}}</text></text>
			<!-- #ifdef MP-ALIPAY -->
			<view :class="{ 'uni-collapse-cell__title-arrow-active': isOpen, 'uni-collapse-cell--animation': showAnimation === true }"
			 class="uni-collapse-cell__title-arrow">
				<uni-icons color="#999" size="20" type="arrowdown" />
			</view>
			<!-- #endif -->
			<!-- #ifndef MP-ALIPAY -->
			<uni-icons :class="{ 'uni-collapse-cell__title-arrow-active': isOpen, 'uni-collapse-cell--animation': showAnimation === true }"
			 class="uni-collapse-cell__title-arrow" color="#999" size="20" type="arrowdown" />
			<!-- #endif -->
		</view>
		<view :class="{'uni-collapse-cell__content--hide':!isOpen}" class="uni-collapse-cell__content">
			<view :class="{ 'uni-collapse-cell--animation': showAnimation === true }" class="uni-collapse-cell__wrapper" :style="{'transform':isOpen?'translateY(0)':'translateY(-50%)','-webkit-transform':isOpen?'translateY(0)':'translateY(-50%)'}">
				<slot />
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from '../uni-icons/uni-icons.vue'
	export default {
		name: 'UniCollapseItem',
		components: {
			uniIcons
		},
		props: {
			title: {
				// 列表标题
				type: String,
				default: ''
			},
			content: {
				// 列表标题
				type: String,
				default: ''
			},
			point: {
				// 列表标题
				type: Number,
				default: 0
			},
			keyPoint: {
				// 列表标题
				type: Boolean,
				default: false
			},
			name: {
				// 唯一标识符
				type: [Number, String],
				default: 0
			},
			disabled: {
				// 是否禁用
				type: Boolean,
				default: false
			},
			showAnimation: {
				// 是否显示动画
				type: Boolean,
				default: true
			},
			open: {
				// 是否展开
				type: Boolean,
				default: false
			},
			thumb: {
				// 缩略图
				type: String,
				default: ''
			},
			imgWidth:{
				type: String,
				default: ''
			},
			imgHeight:{
				type: String,
				default: ''
			},
			mRight:{
				type: String,
				default: ''
			}
		},
		data() {
			return {
				isOpen: false
			}
		},
		watch: {
			open(val) {
				this.isOpen = val
			}
		},
		inject: ['collapse'],
		created() {
			this.isOpen = this.open
			this.nameSync = this.name ? this.name : this.collapse.childrens.length
			this.collapse.childrens.push(this)
			if (String(this.collapse.accordion) === 'true') {
				if (this.isOpen) {
					let lastEl = this.collapse.childrens[this.collapse.childrens.length - 2]
					if (lastEl) {
						this.collapse.childrens[this.collapse.childrens.length - 2].isOpen = false
					}
				}
			}
		},
		methods: {
			onClick() {
				if (this.disabled) {
					return
				}
				if (String(this.collapse.accordion) === 'true') {
					this.collapse.childrens.forEach(vm => {
						if (vm === this) {
							return
						}
						vm.isOpen = false
					})
				}
				this.isOpen = !this.isOpen
				this.collapse.onChange && this.collapse.onChange()
				this.$forceUpdate()
			}
		}
	}
</script>

<style lang="scss" scoped>

	.uni-collapse-cell {
		flex-direction: column;
		border-color: rgba(243,243,243,1);
		border-bottom-width: 2upx;
		border-bottom-style: solid;
	}


	.uni-collapse-cell--hover {
		background-color: #fff;
	}

	.uni-collapse-cell--open {
		background-color: #fff;
	}

	.uni-collapse-cell--disabled {
		background-color: #fff;
		// opacity: 0.3;
	}


	.uni-collapse-cell--hide {
		height: 116upx;
	}

	.uni-collapse-cell--animation {
		// transition: transform 0.3s ease;
		transition-property: transform;
		transition-duration: 0.3s;
		transition-timing-function: ease;
	}

	.uni-collapse-cell__title {
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		width: 100%;
		box-sizing: border-box;
		/* #endif */
		height: 116upx;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.uni-collapse-cell__title:active {
		background-color: #fff;
	}

	// .uni-collapse-cell__title-img {
	// 	height: $uni-img-size-base;
	// 	width: $width;
	// 	margin-right: 25upx;
	// }

	.uni-collapse-cell__title-arrow {
		width: 20px;
		height: 20px;
		transform: rotate(0deg);
		transform-origin: center center;

	}

	.uni-collapse-cell__title-arrow-active {
		transform: rotate(180deg);
	}

	.uni-collapse-cell__title-text {
		flex: 1;
		font-size: 30upx;
		/* #ifndef APP-NVUE */
		white-space: nowrap;
		color: #07103C;
		/* #endif */
		/* #ifdef APP-NVUE */
		lines: 1;
		/* #endif */
		overflow: hidden;
		text-overflow: ellipsis;
		.content{
			width: 100%;
			color: #999;
			font-size: 24upx;
			display: flex;
			justify-content: flex-start;
		}
		.point{
			width: 100%;
			color: #0084FD;
			font-size: 30upx;
			display: flex;
			justify-content: flex-end;
		}
		.keypointClass{
			color: #fff;
		}
		.keypointClass2{
			color: #fe2338;
		}
	}

	.uni-collapse-cell__content {
		overflow: hidden;
	}

	.uni-collapse-cell__wrapper {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
	}

	.uni-collapse-cell__content--hide {
		height: 0upx;
		line-height: 0upx;
	}
</style>
