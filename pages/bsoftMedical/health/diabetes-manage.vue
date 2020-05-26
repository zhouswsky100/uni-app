<template>
	<view class="warp">
		<view class="stepone" v-if="isStepone">
			<view class="banner1">
				<view class="uni-list inner6">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							<image src="@/static/health/followup_date.png"></image>
							随访日期
						</view>
						<view class="uni-list-cell-db">
							<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
								<view class="uni-input">{{date}}</view>
							</picker>
						</view>
					</view>
				</view>
			</view>	
			<view class="banner1">
				<uni-collapse >
					<uni-collapse-item title="随访方式"  thumb="../../../static/health/followup_way.png" imgWidth='39' imgHeight='38' mRight='25'>
						<view class="contentBox uni-list">
							<view class="inner5">
								<view class="radioBox" v-for="(item,index) in wayList" :key="index">
									<view :class="{current:item.id==checkWayed}" @click="checkWay(item.id)">
										<image style="margin-left: -8upx;" v-show="item.id==checkWayed" class="tick" src="@/static/health/choose.png"></image>
									</view>{{item.title}}
								</view>
							</view>
						</view>
					</uni-collapse-item>
					<uni-collapse-item title="转归"  thumb="../../../static/health/outcom.png" imgWidth='31' imgHeight='38' mRight='28'>
						<view class="contentBox uni-list">
							<view class="inner5">
								<view class="radioBox" v-for="(item,index) in vestList" :key="index">
									<view :class="{current:item.id==checkVested}" @click="checkVest(item.id)">
										<image style="margin-left: -8upx;" v-show="item.id==checkVested" class="tick" src="@/static/health/choose.png"></image>
									</view>{{item.title}}
								</view>
							</view>
							<view class="uni-textarea" v-show="checkVested==1">
								<textarea placeholder-style="color:#8f8f8f" placeholder="请输入失访原因"/>
							</view>
							<view class="deathBox" v-show="checkVested==2">
								<view class="titleBox" style="padding-left: 0;color: #999;">原因：</view>
								<view class="inner4">
									<view class="pulseBox" v-for="(item,index) in deathList" :key="index" :class="{checkPulseBox:item.id==checkDeathed}" @click="checkDeath(item.id)">
										{{item.title}}
									</view>
								</view>
								<view v-show="checkDeathed=='0'">
									<view class="timeBox">
										<image class="time" src="@/static/health/time.png"></image>
										<view style="display: flex;align-items: center;">
											<picker mode="date" :value="deathDate" :start="startDate" :end="endDate" @change="bindDeathDateChange">
												<view class="uni-input">{{deathDate}}</view>
											</picker>
											<image class="next" src="@/static/health/next.png"></image>
										</view>
									</view>
									<view class="uni-textarea">
										<textarea placeholder-style="color:#8f8f8f" placeholder="请输入死亡原因"/>
									</view>
								</view>
							</view>
						</view>
					</uni-collapse-item>
				</uni-collapse >
			</view>
			<view class="titleBox2">
				<view class="btn" @click="nextStep()">下一步</view>
			</view>
		</view>
		<view class="stepTwo" v-else>
			<view class="banner1">
				<uni-collapse >
					<uni-collapse-item title="症状" :content="content" :keyPoint="keyType">
						<view class="contentBox uni-list">
							<checkbox-group class="contentList" @change="checkboxChange">
								<label class="uni-list-cell uni-list-cell-pd" v-for="item in symptomList" :key="item.value">
									<view class="inner1">
										<checkbox :value="item.value" :checked="item.checked" />
										<image v-show="item.checked" class="tick" src="@/static/health/choose.png"></image>
									</view>
									<view>{{item.name}}</view>
								</label>
							</checkbox-group>
							<input class="uni-input inner2"  placeholder="其他症状" />
						</view>
					</uni-collapse-item>
				</uni-collapse>
			</view>
			<view class="titleBox">体征</view>
			<view class="banner1">
				<uni-collapse >
					<uni-collapse-item title="血压(mmHg)" :content="bloodCont" :keyPoint="keyType">
						<view class="contentBox uni-list">
							<view class="inner3">
								<view class="inputBox">
									收缩压：<input class="uni-input inner2" style="width: 220upx;" />
								</view>
								<view class="inputBox">
									舒张压：<input class="uni-input inner2" style="width: 220upx;"/>
								</view>
							</view>
						</view>
					</uni-collapse-item>
					<uni-collapse-item title="体重(kg)">
						<view class="contentBox uni-list">
							<view class="inner3">
								<view class="inputBox">
									当前：<input class="uni-input inner2" style="width: 220upx;" />
								</view>
								<view class="inputBox">
									目标：<input class="uni-input inner2" style="width: 220upx;"/>
								</view>
							</view>
						</view>
					</uni-collapse-item>
					<uni-collapse-item title="体质指数(kg/㎡)" :content="weightCont">
						<view class="contentBox uni-list">
							<view class="inner3">
								<view class="inputBox">
									BMI：<input class="uni-input inner2" style="width: 220upx;" />
								</view>
								<view class="inputBox">
									目标：<input class="uni-input inner2" style="width: 220upx;"/>
								</view>
							</view>
						</view>
					</uni-collapse-item>
					<uni-collapse-item title="足背动脉搏动" :content="pulseCont" :keyPoint="keyType">
						<view class="contentBox uni-list">
							<view class="inner5">
								<view class="radioBox" v-for="(item,index) in pulseList" :key="index">
									<view :class="{current:item.id==checkPulseed}" @click="checkPulse(item.id)">
										<image style="margin-left: -8upx;" v-show="item.id==checkPulseed" class="tick" src="@/static/health/choose.png"></image>
									</view>{{item.title}}
								</view>
							</view>
							<view class="titleBox" style="padding-left: 0;color: #999;">搏动方侧：</view>
							<view class="inner4">
								<view class="pulseBox" v-for="(item,index) in directionList" :key="index" :class="{checkPulseBox:item.id==checkDirectioned}" @click="checkDirection(item.id)">
									{{item.title}}
								</view>
							</view>
						</view>
					</uni-collapse-item>
					<uni-collapse-item title="其他" >
						<view class="contentBox uni-list">
							<input class="uni-input inner2"/>
						</view>
					</uni-collapse-item>
				</uni-collapse>
			</view>
			<view class="titleBox">生活指导方式</view>
			<view class="banner1">
				<uni-collapse >
					<uni-collapse-item title="日吸烟量(支)" :content="smokeCont" :keyPoint="keyType">
						<view class="contentBox uni-list">
							<view class="inner3">
								<view class="inputBox">
									当前：<input class="uni-input inner2" style="width: 220upx;" />
								</view>
								<view class="inputBox">
									目标：<input class="uni-input inner2" style="width: 220upx;"/>
								</view>
							</view>
						</view>
					</uni-collapse-item>
					<uni-collapse-item title="日饮酒量(两)" :content="drinkCont" :keyPoint="keyType">
						<view class="contentBox uni-list">
							<view class="inner3">
								<view class="inputBox">
									当前：<input class="uni-input inner2" style="width: 220upx;" />
								</view>
								<view class="inputBox">
									目标：<input class="uni-input inner2" style="width: 220upx;"/>
								</view>
							</view>
						</view>
					</uni-collapse-item>
					<uni-collapse-item title="运动" :content="runCont" :keyPoint="keyType">
						<view class="contentBox uni-list">
							<view class="inner7" style="margin-bottom: 30upx;">
								当前：
								<view class="inner7InputBox">
									<view class="inner7Input">
										<input class="uni-input inner2" style="flex:1"/>
										<view>次/周</view>
									</view>
									<view class="inner7Input">
										<input class="uni-input inner2"  style="flex:1"/>
										<view>分钟/次</view>
									</view>
								</view>
							</view>
							<view class="inner7">
								目标：
								<view class="inner7InputBox">
									<view class="inner7Input">
										<input class="uni-input inner2" style="flex:1"/>
										<view>次/周</view>
									</view>
									<view class="inner7Input">
										<input class="uni-input inner2"  style="flex:1"/>
										<view>分钟/次</view>
									</view>
								</view>
							</view>
						</view>
					</uni-collapse-item>
					<uni-collapse-item title="主食(克/天)" :content="foodCont" :keyPoint="keyType">
						<view class="contentBox uni-list">
							<view class="inner3">
								<view class="inputBox">
									现摄入量：<input class="uni-input inner2" style="width: 220upx;" />
								</view>
								<view class="inputBox">
									目标量：<input class="uni-input inner2" style="width: 220upx;"/>
								</view>
							</view>
						</view>
					</uni-collapse-item>
					<uni-collapse-item title="心理调整" :content="mentalityCont" >
						<view class="contentBox uni-list">
							<view class="inner5">
								<view class="radioBox" v-for="(item,index) in mentalityList" :key="index">
									<view :class="{current:item.id==checkMentalityed}" @click="checkMentality(item.id)">
										<image style="margin-left: -8upx;" v-show="item.id==checkMentalityed" class="tick" src="@/static/health/choose.png"></image>
									</view>{{item.title}}
								</view>
							</view>
						</view>
					</uni-collapse-item>
					<uni-collapse-item title="遵医行为" :content="actionCont" >
						<view class="contentBox uni-list">
							<view class="inner5">
								<view class="radioBox" v-for="(item,index) in mentalityList" :key="index">
									<view :class="{current:item.id==checkActioned}" @click="checkAction(item.id)">
										<image style="margin-left: -8upx;" v-show="item.id==checkActioned" class="tick" src="@/static/health/choose.png"></image>
									</view>{{item.title}}
								</view>
							</view>
						</view>
					</uni-collapse-item>
				</uni-collapse >
			</view>	
			<view class="titleBox">辅助检查</view>
			<view class="banner1">
				<uni-collapse>
					<uni-collapse-item title="空腹血糖值(mmol/L)" :keyPoint="keyType">
						<view class="contentBox uni-list">
							<view class="inner8">
								血糖值：
								<view class="inner8View">
									<input class="uni-input inner2" />
								</view>
							</view>
							<view class="inner9">
								测量方式：
								<view class="inner5" style="margin-left: 80upx;flex: 1;">
									<view class="radioBox" style="margin-bottom: 0;" v-for="(item,index) in measureList" :key="index">
										<view :class="{current:item.id==checkMeasureed}" @click="checkMeasure(item.id)">
											<image style="margin-left: -8upx;" v-show="item.id==checkMeasureed" class="tick" src="@/static/health/choose.png"></image>
										</view>{{item.title}}
									</view>
								</view>
							</view>
						</view>
					</uni-collapse-item>
					<uni-collapse-item title="随机糖值(mmol/L)" >
						<view class="contentBox uni-list">
							<view class="inner8">
								血糖值：
								<view class="inner8View">
									<input class="uni-input inner2" />
								</view>
							</view>
							<view class="inner9">
								测量方式：
								<view class="inner5" style="margin-left: 80upx;flex: 1;">
									<view class="radioBox" style="margin-bottom: 0;" v-for="(item,index) in measureList" :key="index">
										<view :class="{current:item.id==checkRandomed}" @click="checkMeasureRandom(item.id)">
											<image style="margin-left: -8upx;" v-show="item.id==checkRandomed" class="tick" src="@/static/health/choose.png"></image>
										</view>{{item.title}}
									</view>
								</view>
							</view>
						</view>
					</uni-collapse-item>
					<uni-collapse-item title="其他检查" :keyPoint="keyType">
						<view class="contentBox uni-list">
							<view class="inner8">
								血糖化血红蛋白(%)：
								<view class="inner8View">
									<input class="uni-input inner2" />
								</view>
							</view>
							<view class="timeBox">
								<image class="time" src="@/static/health/time.png"></image>
								<view style="display: flex;align-items: center;">
									<picker mode="date" :value="inspectDate" :start="startDate" :end="endDate" @change="bindInspectDateChange">
										<view class="uni-input">{{inspectDate}}</view>
									</picker>
									<image class="next" src="@/static/health/next.png"></image>
								</view>
							</view>
							<input class="uni-input inner2"  placeholder="其他" />
						</view>
					</uni-collapse-item>
				</uni-collapse>
			</view>
			<view class="titleBox">其他</view>
			<view class="banner1">
				<uni-collapse>
					<uni-collapse-item title="服药依从性" :content="takeCont" :keyPoint="keyType">
						<view class="contentBox uni-list">
							<view class="inner5">
								<view class="radioBox" v-for="(item,index) in takeList" :key="index">
									<view :class="{current:item.id==checktakeed}" @click="checkTake(item.id)">
										<image style="margin-left: -8upx;" v-show="item.id==checktakeed" class="tick" src="@/static/health/choose.png"></image>
									</view>{{item.title}}
								</view>
							</view>
						</view>
					</uni-collapse-item>
					<uni-collapse-item title="用药情况" >
						<view class="contentBox uni-list">
							<view v-if="pharmacyList.length>0" class="pharmacyList"></view>
							<view class="addBox" @click="addPop">
								<image class="add" src="@/static/health/addpharmacy.png"></image>添加
							</view>
						</view>
					</uni-collapse-item>
					<uni-collapse-item title="药物不良反应" :content="badCont" :keyPoint="keyType">
						<view class="contentBox uni-list">
							<view class="inner5">
								<view class="radioBox">
									<view :class="{current:checkBaded=='0'}" @click="checkBad('0')">
										<image style="margin-left: -8upx;" v-show="checkBaded=='0'" class="tick" src="@/static/health/choose.png"></image>
									</view>无
								</view>
								<view class="radioBox">
									<view :class="{current:checkBaded=='1'}" @click="checkBad('1')">
										<image style="margin-left: -8upx;" v-show="checkBaded=='1'" class="tick" src="@/static/health/choose.png"></image>
									</view>有
								</view>
							</view>
							<input v-show="checkBaded=='1'" class="uni-input inner2"  placeholder="药物不良反应" />
						</view>
					</uni-collapse-item>
					<uni-collapse-item title="低血糖反应" :content="lowxtCont" :keyPoint="keyType">
						<view class="contentBox uni-list">
							<view class="inner5">
								<view class="radioBox" v-for="(item,index) in lowxtList" :key="index">
									<view :class="{current:item.id==checklowxted}" @click="checkLowxt(item.id)">
										<image style="margin-left: -8upx;" v-show="item.id==checklowxted" class="tick" src="@/static/health/choose.png"></image>
									</view>{{item.title}}
								</view>
							</view>
						</view>
					</uni-collapse-item>
					<uni-collapse-item title="此次随访分类" :content="classifyCont" :keyPoint="keyType">
						<view class="contentBox uni-list">
							<view class="inner5">
								<view class="radioBox" v-for="(item,index) in classifyList" :key="index">
									<view :class="{current:item.id==checkClassifyed}" @click="checkClassify(item.id)">
										<image style="margin-left: -8upx;" v-show="item.id==checkClassifyed" class="tick" src="@/static/health/choose.png"></image>
									</view>{{item.title}}
								</view>
							</view>
						</view>
					</uni-collapse-item>
					<uni-collapse-item title="转诊" >
						<view class="contentBox uni-list">
							<view class="titleBox" style="padding-left: 0;color: #999;">原因：</view>
							<input class="uni-input inner2"/>
							<view class="titleBox" style="padding-left: 0;color: #999;">机构及科别：</view>
							<input class="uni-input inner2"/>
						</view>
					</uni-collapse-item>
				</uni-collapse>
			</view>
			<view class="titleBox">下次随访</view>
			<view class="banner1">
				<view class="uni-list inner6">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							下次随访日期<view>*</view>
						</view>
						<view class="uni-list-cell-db">
							<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
								<view class="uni-input">{{date}}</view>
							</picker>
						</view>
					</view>
				</view>
				<view class="currentInner">
					<view class="currentOuter1">随访医生</view>
					<view class="currentOuter2">王文杰</view>
				</view>
			</view>	
			<view class="titleBox2">
				<view class="btn">完成</view>
			</view>
			<uni-popup  ref="popup" type="bottom">
				<view class="addPharmacy">
					<view class="h2">用药情况</view>
					<view class="pharmacyInput">
						<input class="uni-input"  placeholder="药物名称" />
					</view>
					<view class="pharmacyInput">
						<input class="uni-input"  placeholder="用药剂量" />
					</view>
					<view class="pharmacyInput">
						<input class="uni-input"  placeholder="用药次数" />
					</view>
					<view class="pharmacyInput" style="margin-bottom: 92upx;">
						<input class="uni-input"  placeholder="用药单位" />
					</view>
					<view class="addBtnBox">
						<view class="addBtn1">继续添加</view>
						<view class="addBtn2" @click="finishPharmacy">完成</view>
					</view>
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
import uniPopup from '@/components/uni-popup/uni-popup.vue'
export default {
    components: {uniCollapse,uniCollapseItem,uniPopup},
	data(){
		const currentDate = this.getDate({
			format: true
		})
		return{
			isStepone:true,
			keyType:true, //是否需要必填
			checkWayed:-1,	//选中的随访方式
			wayList:[//随访方式列表
				{
					title:'门诊',
					id:0,
				},
				{
					title:'家庭',
					id:1,
				},
				{
					title:'电话',
					id:2,
				},
			],
			checkVested:-1,//选中的转归
			vestList:[//转归列表
				{
					title:'继续随访',
					id:0,
				},
				{
					title:'暂时失访',
					id:1,
				},
				{
					title:'终止管理',
					id:2,
				},
			],
			deathList:[//终止管理列表
				{
					title:'死亡',
					id:0,
				},
				{
					title:'迁出',
					id:1,
				},
				{
					title:'失访',
					id:2,
				},
				{
					title:'拒绝',
					id:3,
				},
			],
			checkDeathed:-1,//选中终止管理方式
			content:'无症状',    //症状
			bloodCont:'收缩压:127/舒张压:87', //血压
			weightCont:'当前:22.86/目标:22.86', //体重
			symptomList:[//症状列表
				{
					value: '无症状',
					name: '无症状',
				},
				{
					value: '多饮',
					name: '多饮',
				},
				{
					value: '多食',
					name: '多食'
				},
				{
					value: '多尿',
					name: '多尿'
				},
				{
					value: '视力模糊',
					name: '视力模糊'
				},
				{
					value: '感染',
					name: '感染'
				},
				{
					value:'手脚麻木',
					name:'手脚麻木'
				},
				{
					value: '下肢浮肿',
					name: '下肢浮肿'
				},
				{
					value:'体重明显下降',
					name:'体重明显下降'
				},
				{
					value: '其他',
					name: '其他'
				}
			],
			pulseCont:'触及正常',//足背动脉搏动
			checkPulseed:-1,//选中足背动脉搏动
			pulseList:[//足背动脉搏动列表
				{
					title:'触及正常',
					id:0,
				},
				{
					title:'减弱',
					id:1,
				},
				{
					title:'消失',
					id:2,
				},
			],
			checkDirectioned:-1,//选中搏动方侧
			directionList:[//搏动方侧列表
				{
					title:'双侧',
					id:0,
				},
				{
					title:'左侧',
					id:1,
				},
				{
					title:'右侧',
					id:2,
				},
			],
			smokeCont:'当前:8/目标:2',//日吸烟内容
			drinkCont:'当前:8/目标:2',//日饮酒内容
			runCont:'当前:3次  30分钟/目标:3次  30分钟',//日运动内容
			foodCont:'当前:8/目标:2',//主食内容
			mentalityCont:'良好',//心理调整内容
			checkMentalityed:-1,//选中的心理调整
			mentalityList:[//心理调整、遵医行为列表
				{
					title:'良好',
					id:0,
				},
				{
					title:'一般',
					id:1,
				},
				{
					title:'差',
					id:2,
				},
			],
			actionCont:'良好',//遵医行为内容
			checkActioned:-1,//选中的遵医行为
			measureList:[//测量方式列表
				{
					title:'末梢血',
					id:0,
				},
				{
					title:'血浆',
					id:1,
				},
			],
			checkMeasureed:-1,//空腹血糖选中的测量方式
			checkRandomed:-1,//随机血糖选中的测量方式
			checktakeed:-1,//选中的服药依次性
			takeCont:'规律',//服药依次性内容
			takeList:[//服药依次性列表
				{
					title:'规律',
					id:0,
				},
				{
					title:'间断',
					id:1,
				},
				{
					title:'不服药',
					id:2,
				},
			],
			badCont:'无',//药物不良反应内容
			checkBaded:-1,//药物不良反应选择
			lowxtCont:'无',//低血糖内容
			lowxtList:[//低血糖反应方式列表
				{
					title:'无',
					id:0,
				},
				{
					title:'偶尔',
					id:1,
				},
				{
					title:'频繁',
					id:2,
				},
			],
			checklowxted:-1,//选中的低血糖反应方式
			classifyCont:'控制满意',//随访分类内容
			checkClassifyed:-1,//选中随访分类方式
			classifyList:[//随访分类列表
				{
					title:'控制满意',
					id:0,
				},
				{
					title:'控制不满意',
					id:1,
				},
				{
					title:'不良反应',
					id:2,
				},
				{
					title:'并发症',
					id:3,
				},
			],
			date: currentDate,
			deathDate:'请选择死亡时间',
			inspectDate:'请选择检查日期',
			pharmacyList:[],//用药列表
		}
	},
	 computed: {
		startDate() {
			return this.getDate('start');
		},
		endDate() {
			return this.getDate('end');
		}
	},
	methods:{
		checkboxChange: function (e) {
			console.log(e)
			var items = this.symptomList,
				values = e.detail.value;
			for (var i = 0, lenI = items.length; i < lenI; i++) {
				const item = items[i];
				if(values.includes(item.value)){
					this.$set(item,'checked',true)
				}else{
					this.$set(item,'checked',false)
				}
			}
		},
		checkWay(id){
			this.checkWayed=id;
		},
		checkVest(id){
			this.checkVested=id;
		},
		checkDeath(id){
			this.checkDeathed=id;
		},
		nextStep(){
			this.isStepone=false;
		},
		checkPulse(id){
			this.checkPulseed=id;
		},
		checkDirection(id){
			this.checkDirectioned=id;
		},
		checkMentality(id){
			this.checkMentalityed=id;
		},
		checkAction(id){
			this.checkActioned=id;
		},
		checkTake(id){
			this.checktakeed=id;
		},
		checkClassify(id){
			this.checkClassifyed=id;
		},
		checkMeasure(id){//空腹血糖值测量方式
			this.checkMeasureed = id;
		},
		checkMeasureRandom(id){//空腹血糖值测量方式
			this.checkRandomed = id;
		},
		checkBad(id){//药物不良事件
			this.checkBaded = id;
		},
		checkLowxt(id){//低血糖方式
			this.checklowxted = id;
		},
		bindDateChange: function(e) {
			this.date = e.target.value
		},
		bindDeathDateChange:function(e) {
			this.deathDate = e.target.value
		},
		bindInspectDateChange:function(e) {
			this.inspectDate = e.target.value
		},
		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();

			if (type === 'start') {
				year = year - 60;
			} else if (type === 'end') {
				year = year + 2;
			}
			month = month > 9 ? month : '0' + month;;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		},
		addPop(){
			this.$refs.popup.open()
		},
		//关闭用药情况弹出层
		finishPharmacy(){
			this.$refs.popup.close()
		}
	}
}
</script>

<style scoped lang="scss">
.warp{
	width: 100%;
	.banner1{
		background: #fff;
		padding: 0 24upx;
		.contentBox{
			width: 100%;
			border-top:2upx dashed rgba(243,243,243,1);
			padding: 40upx 0 35upx;
			.tick{
				width: 16upx;
				height: 12upx;
				position: absolute;
				top:50%;
				left: 50%;
				margin-top: -6upx;
				margin-left: -12upx;
			}
			.addBox{
				display: flex;
				align-items: center;
				color: #0084FD;
				font-size: 30upx;
				.add{
					width: 30upx;
					height: 30upx;
					margin-right: 10upx;
				}
			}
			.contentList{
				display: flex;
				 flex-wrap:wrap;
				  label{
					  display: flex;
					  align-items: center;
					  margin-bottom: 40upx;
					  margin-right: 50upx;
					  .inner1{
						  position: relative;
						  checkbox{
							  margin-right: 10upx;	  
						  }
					  }
					  
					  /deep/.uni-checkbox-input,.uni-checkbox-input-checked{
						  width: 28upx;
						  height: 28upx;
					  }
					  /deep/uni-checkbox::before{
						  display: none;
					  }
					  /deep/.uni-checkbox-input-checked{
						  border-color: #0084FD;
					  }
						/deep/uni-checkbox:not([disabled]) .uni-checkbox-input:hover {
						    border-color: rgb(0,132,253);
						}
				  }
			}
			.inner2{
				width: 100%;
				height:74upx;
				background:rgba(249,249,249,1);
				border-radius:10upx;
				padding-left: 23upx;
				line-height: 74upx;
				.uni-input-placeholder{
				   color: #8f8f8f;
				   font-size: 26upx;
				}
			}
			.inner3{
				display: flex;
				justify-content: space-between;
				.inputBox{
					display: flex;
					align-items: center;
				}
			}
			.inner4{
				display: flex;
				.pulseBox{
					width:160upx;
					height:54upx;
					border:1upx solid rgba(228,228,228,1);
					border-radius:27upx;
					margin-right: 20upx;
					text-align: center;
					line-height: 54upx;
					color: #000;
					&.checkPulseBox{
						border-color: #0084FD;
						color: #0084FD;
					}
				}
			}
			.inner5{
				display: flex;
				flex-wrap: wrap;
				.radioBox{
					display: flex;
					align-items: center;
					margin-right: 54upx;
					margin-bottom: 30upx;
					>view{
						width:28upx;
						height:28upx;
						border:1upx solid rgba(204,204,204,1);
						border-radius:4upx;
						margin-right: 10upx;
						position: relative;
						&.current{
							border-color: #0084FD;
						}
					}
				}
			}
			.inner7{
				display: flex;
				align-items: center;
				.inner7InputBox{
					flex: 1;
					display: flex;
					justify-content: space-between;
					.inner7Input{
						width:280upx;
						height:74upx;
						padding-right: 20upx;
						background:rgba(249,249,249,1);
						border-radius:10upx;
						display: flex;
						align-items: center;
						color: #8F8F8F;
						font-size: 26upx;
					}
				}
			}
			.inner8{
				display: flex;
				align-items: center;
				margin-bottom: 40upx;
				.inner8View{
					flex: 1;
					margin-left: 26upx;
				}
			}
			.inner9{
				display: flex;
				align-items: center;
			}
			.uni-textarea{
				width:100%;
				min-height:160upx;
				background:rgba(249,249,249,1);
				border-radius:10upx;
				uni-textarea{
					width: 100%;
					min-height:160upx;
					padding: 30upx 24upx;
					font-size: 26upx;
				}
			}
			.timeBox{
				margin: 30upx 0;
				width: 100%;
				height: 74upx;
				padding: 0 30upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border:1upx solid rgba(243,243,243,1);
				border-radius:10upx;
				color: #8F8F8F;
				font-size: 26upx;
				.time{
					width: 27upx;
					height: 28upx;
				}
				.next{
					width: 9upx;
					height: 16upx;
					margin-left: 20upx;
				}
			}
		}
		.inner6{
			height: 116upx;
			.uni-list-cell{
				height: 100%;
				display: flex;
				align-items: center;
				.uni-list-cell-left{
					flex: 1;
					color: #07103C;
					font-size: 30upx;
					display: flex;
					image{
						width: 37upx;
						height: 37upx;
						margin-right: 27upx;
					}
					>view{
						color: #fe2338;
					}
				}
				.uni-list-cell-db{
					flex: 1;
					color: #999999;
					font-size: 24upx;
				}
			}
		}
		.currentInner{
			display: flex;
			align-items: center;
			height: 116upx;
			color: #07103C;
			font-size: 28upx;
			.currentOuter1{
				flex: 1;
			}
			.currentOuter2{
				flex: 1;
				color: #999999;
				font-size: 24upx;
			}
		}
	}
	
	.titleBox{
		height: 74upx;
		padding:0 24upx;
		color: #8C92A2;
		font-size: 28upx;
		line-height: 74upx;
		
	}
	.titleBox2{
		padding: 0 24upx;
		margin: 60upx 0 100upx;
		.btn{
			width:100%;
			height:88upx;
			background:rgba(0,132,253,1);
			border-radius:44upx;
			text-align: center;
			color: #fff;
			font-size: 36upx;
			line-height: 88upx;
		}
	}
	.addPharmacy{
		background:rgba(255,255,255,1);
		border-radius:20upx 20upx 0upx 0upx;
		width: 100%;
		padding: 88upx 24upx 37upx;
		.h2{
			width: 100%;
			color: #07103C;
			font-size: 44upx;
			margin-bottom: 30upx;
			font-weight:bold;
			
		}
		.pharmacyInput{
			width: 100%;
			height: 88upx;
			background:rgba(242,243,245,1);
			border-radius:10upx;
			margin-bottom: 20upx;
			.uni-input{
				width: 100%;
				padding-left: 30upx;
				height: 88upx;
				line-height: 88upx;
				.uni-input-placeholder{
				   color: #999999;
				   font-size: 30upx;
				}
			}
		}
		.addBtnBox{
			padding: 0 36upx;
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.addBtn1{
				width:300upx;
				height:78upx;
				background:rgba(250,250,250,1);
				border:2upx solid rgba(235,235,235,1);
				border-radius:39upx;
				color: #31394C;
				font-size: 36upx;
				line-height: 78upx;
				text-align: center;
			}
			.addBtn2{
				width:300upx;
				height:78upx;
				background:rgba(0,132,253,1);
				border-radius:39upx;
				color: #fff;
				font-size: 36upx;
				line-height: 78upx;
				text-align: center;
			}
		}
	}
}	
</style>

