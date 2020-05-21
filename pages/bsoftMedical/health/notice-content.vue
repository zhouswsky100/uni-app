<template>
	<view>
		<!--自定义导航------>
		<semp-navbar :back="true" navBg="#fff">
			<view slot="default">
				{{navBarTitle | typeFilter}}
			</view>
			<!-- #ifndef MP -->
			<view slot="right" class="ser-btn" @click="check()">
				选择发送对象
			</view>
			 <!-- #endif -->
		</semp-navbar>
		<view class="content">
			随访通知：您好，xx年xx月xx日，您有一次高血压随访/糖尿病随访/中医药健康管理服务，请您提前预约家庭医生，享受本次服务。
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
				navBarTitle:'',
			}
		},
		methods:{
			check(){
				uni.navigateTo({
				    url: '/pages/bsoftMedical/health/select-send',
				});
			},
		},
		onLoad(option) {
			this.navBarTitle = option.type;
		},
		filters:{
			typeFilter(value){
				let title;
				switch(value){
					case '1':
						title='健康随访'
						break;
				}
				return title;
			}
		}
	}
</script>

<style scoped lang="scss">
.ser-btn{
	color: #0084FD;
	font-size: 28upx;
}
page{
	height: 100%;
	background: #fff;
}
.content{
	padding: 138upx 24upx 0;
	font-size: 30upx;
	color: #b0b0b0;
}
</style>
