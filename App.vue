<script>
	
	export default {
		onLaunch: function() {
			console.log('App Launch');
		
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/*引入colorui-css */
	@import "colorui/main.css";
	@import "colorui/icon.css";
	
	/*弹性盒子布局*/
	.flex-row {
		display: flex;
		flex-direction: row;
	}
	
	.flex-column {
		display: flex;
		flex-direction: column;
	}
	.content-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.content-around {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.space-between {
		justify-content: space-between;
	}
	
	
	/*横向左中右*/
	.x-start {
		display: flex;
		justify-content: flex-start;
	}
	
	.x-center {
		display: flex;
		justify-content: center;
	}
	
	.x-end {
		display: flex;
		justify-content: flex-end;
	}
	/*纵向上中下*/
	.y-start {
		display: flex;
		align-items: flex-start;
	}
	
	.y-center {
		display: flex;
		align-items: center;
	}
	
	.y-end {
		display: flex;
		align-items: flex-end;
	}
	/*其他基础线条/圆角/主色调*/
	.b-b{
		border-bottom:1upx solid #E4E7ED;
	}
	.b-t{
		border-top:1upx solid #E4E7ED;
	}
	.radius-df{
		border-radius: 15upx;
	}
	.bg-base{
		background: #157BC7;
	}
	.color-base{
		color: #157BC7;
	}
	.text-spec{
		font-size:26upx;
	}
</style>
