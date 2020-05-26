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
			<view class="uni-textarea">
				<textarea placeholder-style="color:#b0b0b0;font-size: 30upx;" :placeholder="togglePlaceholder"/>
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
				navBarTitle:'',
				togglePlaceholder:'',
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
			switch(option.type){
				case '1':
					this.togglePlaceholder=''
				break;
				case '2':
					this.togglePlaceholder='您好，'
				break;
				case '3':
					this.togglePlaceholder='您好，因特殊情况，XXX医生于XX年XX月XX日暂停出诊，已预约订单将作废；请改约其他医生或改日再约；'
				break;
				case '4':
					this.togglePlaceholder='您好，您近期有一次高血压随访/糖尿病随访/中医药随访/老年人随访/健康体检，请您提前预约家庭医生，享受本次服务。'
				break;
				case '5':
					this.togglePlaceholder='后期再实现'
				break;
				case '6':
					this.togglePlaceholder='后期再实现'
				break;
			}
		},
		filters:{
			typeFilter(value){
				let title;
				switch(value){
					case '1':
						title='公告'
					break;
					case '2':
						title='社康通知'
					break;
					case '3':
						title='停诊公告'
					break;
					case '4':
						title='健康随访'
					break;
					case '5':
						title='健康教育'
					break;
					case '6':
						title='问卷调查'
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
	.uni-textarea{
		width: 100%;
		min-height:160upx;
		uni-textarea{
			width: 100%;
			min-height:160upx;
			font-size: 30upx;
		}
	}
}

</style>
