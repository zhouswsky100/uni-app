<template>
	<transition name="fade">
		<view class="cu-modal bottom-modal" :class="showModal?'show':''" @tap="close">
			<view class="cu-dialog" @tap.stop="">
				<view class="cu-bar bg-white">
					<view class="action text-blue"  v-if="cancelButton" @tap="close">{{cancelText}}</view>
					<view class="action text-green"  v-if="confirmButton" @tap="confirm">{{confirmText}}</view>
				</view>
				<view>
					<slot></slot>
				</view>
			</view>
		</view>
	</transition>
</template>

<script>
	export default {
		data() {
			return {
				showModal: false
			};
		},
		props: {
			confirmText: {
				type: String,
				default: '确定'
			},
			// 取消按钮文字
			cancelText: {
				type: String,
				default: '取消'
			},
			// 是否显示确定按钮
			confirmButton: {
				type: Boolean,
				default: true
			},
			// 是否显示取消按钮
			cancelButton: {
				type: Boolean,
				default: true
			},
		},
		methods: {
			close() {
				this.showModal = false;
				this.$emit('hide');
			},
			confirm() {
				this.showModal = false;
				this.$emit('confirm');
			},
			show() {
				this.showModal = true;
			}
		}
	
	}
</script>

<style lang="scss" scoped>	
</style>
