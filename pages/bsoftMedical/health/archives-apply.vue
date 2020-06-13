<template>
	<view class="wrap">
		<view :class="[isUnfold?'transCard messageCard':'messageCard']">
			<view class="title">
				<image src="@/static/health/doc_note.png"></image>
				<text class="titleText">病人基本信息</text>
				<view class="collapseBtn" v-if="isCollapse" @click="isUnfold = !isUnfold">
					<view v-if="isUnfold">展开</view>
					<view v-if="!isUnfold">收起</view>
					<image :class="[isUnfold?'':'transUnfold']" src="@/static/my/unfold.png"></image>
				</view>
			</view>
			<view :class="[isUnfold?'content transCont':'content']">
					<view>
						<text class="label">姓名</text>
						<text class="context">{{infoData.pname}}</text>
					</view>
					<view>
						<text class="label">本人电话</text>
						<text class="context">{{infoData.mobile}}</text>
					</view>
					<view>
						<text class="label">户籍地址</text>
						<text class="context">{{infoData.baddress}}</text>
					</view>
					<view>
						<text class="label">地址</text>
						<text class="context">{{infoData.naddress}}</text>
					</view>
					<view class="underlineTag">
						<text class="label">性别</text>
						<text class="context">{{sex}}</text>
					</view>
					<view>
						<text class="label">出生日期</text>
						<text class="context">{{infoData.birthday}}</text>
					</view>
					<view>
						<text class="label">证件类型</text>
						<text class="context">{{cardType}}</text>
					</view>
					<view>
						<text class="label">证件号码</text>
						<text class="context">{{infoData.cardId}}</text>
					</view>
					<view>
						<text class="label">工作单位</text>
						<text class="context">{{infoData.workunit}}</text>
					</view>
					<view>
						<text class="label">联系人姓名</text>
						<text class="context">{{infoData.urgentName}}</text>
					</view>
					<view>
						<text class="label">联系人电话</text>
						<text class="context">{{infoData.urgentPhone}}</text>
					</view>
					<view>
						<text class="label">常驻类型</text>
						<text class="context">{{homeType}}</text>
					</view>
					<view>
						<text class="label">民族</text>
						<text class="context">{{nation}}</text>
					</view>
					<view>
						<text class="label">文化程度</text>
						<text class="context">{{cultural}}</text>
					</view>
					<view>
						<text class="label">职业</text>
						<text class="context">{{occupation}}</text>
					</view>
					<view>
						<text class="label">婚姻状况</text>
						<text class="context">{{marriage}}</text>
					</view>
					<view>
						<text class="label">费用支付</text>
						<text class="context">{{payType}}</text>
					</view>
			</view>
			<view class="opButton" v-if="isShowButton">
				<text class="refused" @click="refused">拒绝</text>
				<text class="agree" @click="isShowButton = false,isCollapse = true,isUnfold = true">同意</text>
			</view>
		</view>
		<view class="docWrite" v-if="!isShowButton">
			<view class="title">
				<image src="@/static/health/doc_edit.png"></image>
				<text class="titleText">医生填写</text>
			</view>
			<view class="formItemBox">
				<view class="itemTitle">
					<view class="itemLabel">血型<view class="requiredTitle">*</view></view>
					<view style="margin-bottom: 0;" :class="[formShow.isSelected1 == 0?'selectItem selected':'selectItem']" @click="formShow.isSelected1 = 0">有</view>
					<view style="margin-bottom: 0;" :class="[formShow.isSelected1 == 1?'selectItem selected':'selectItem']" @click="formShow.isSelected1 = 1;selectBlood='-1'">无</view>
				</view>
				<view class="itemContent" v-show="formShow.isSelected1 == 0">
					<view class="selectBar">
						<view class="selectItem" v-for="(item,index) in bloodList" :class="{selected:item.type==selectBlood}" @click="checkBlood(item.type)" :key="index">{{item.title}}</view>
					</view>
				</view>
			</view>
			<view class="formItemBox">
				<view class="itemTitle">
					<view class="itemLabel">RH<view class="requiredTitle">*</view></view>
					<view style="margin-bottom: 0;" :class="[formShow.isSelected2 == 0?'selectItem selected':'selectItem']" @click="formShow.isSelected2 = 0">有</view>
					<view style="margin-bottom: 0;" :class="[formShow.isSelected2 == 1?'selectItem selected':'selectItem']" @click="formShow.isSelected2 = 1;selectRH='-1'">无</view>
				</view>
				<view class="itemContent" v-show="formShow.isSelected2 == 0">
					<view class="selectBar">
						<view class="selectItem" v-for="(item,index) in RHList" :class="{selected:item.type==selectRH}" @click="checkRH(item.type)" :key="index">{{item.title}}</view>
					</view>
				</view>
			</view>
			<view class="formItemBox">
				<view class="itemTitle">
					<view class="itemLabel">药物过敏史</view>
					<view style="margin-bottom: 0;" :class="[formShow.isSelected3 == 0?'selectItem selected':'selectItem']" @click="formShow.isSelected3 = 0;selectAllergy=[]">有</view>
					<view style="margin-bottom: 0;" :class="[formShow.isSelected3== 1?'selectItem selected':'selectItem']" @click="noAllergy">无</view>
				</view>
				<view class="itemContent" v-show="formShow.isSelected3 == 0">
					<view class="selectBar">
						<view class="selectItem" v-for="(item,index) in allergyList" :class="{selected:item.checked}" @click="checkAllergy(item)" :key="index">{{item.title}}</view>
					</view>
					<view class="uni-textarea textarea" v-if="allergyDescType">
						<textarea :value="allergyDesc" maxlength="20" @input="allergyInput" placeholder-style="color:#ccc" placeholder="可补充其他过敏药物"/>
						<view class="garyBox">{{allergyDescLength}}/20</view>
					</view>
				</view>
			</view>
			<view class="formItemBox">
				<view class="itemTitle">
					<view class="itemLabel">暴露史</view>
					<view style="margin-bottom: 0;" :class="[formShow.isSelected4 == 0?'selectItem selected':'selectItem']" @click="formShow.isSelected4 = 0;selectExpose=[]">有</view>
					<view style="margin-bottom: 0;" :class="[formShow.isSelected4 == 1?'selectItem selected':'selectItem']" @click="noExpose">无</view>
				</view>
				<view class="itemContent" v-show="formShow.isSelected4 == 0">
					<view class="selectBar">
						<view class="selectItem" v-for="(item,index) in exposeList" :class="{selected:item.checked}" @click="checkExpose(item)" :key="index">{{item.title}}</view>
					</view>
				</view>
			</view>
			<view class="formItemBox">
				<view class="itemTitle">
					<view class="itemLabel">既往史</view>
					<view style="margin-bottom: 0;" :class="[formShow.isSelected5 == 0?'selectItem selected':'selectItem']" @click="formShow.isSelected5 = 0">有</view>
					<view style="margin-bottom: 0;" :class="[formShow.isSelected5 == 1?'selectItem selected':'selectItem']" @click="noPast">无</view>
				</view>
				<view class="itemContent" v-show="formShow.isSelected5 == 0">
					<view class="inner1" v-for="(item,index) in pastList" :key="index">
						<view class="innerTitleBox" >
							<view class="innerTitle" :class="{innerTitle2:!item.pickerDis}" @click="checkPast(item)">{{item.title}}</view>
						</view>
						<input v-if="item.isHasName" :disabled="item.pickerDis" :value="item.inputValue" class="uni-input inner2" :placeholder="item.placeholder" @input="bindInput($event,item)"/>
						<picker :disabled="item.pickerDis"  class="pickerBox" :class="{disPicker:item.pickerDis}" :value="item.date" mode="date" :start="startDate" :end="endDate" @change="bindDateChange($event,item)">
							<view class="uni-input">{{item.date}}</view>
							<image class="down" src="@/static/health/dateDown.png"></image>
						</picker>
					</view>
				</view>
			</view>
			<view class="formItemBox">
				<view class="itemTitle">
					<view class="itemLabel">手术史</view>
					<view style="margin-bottom: 0;" :class="[formShow.isSelected6 == 0?'selectItem selected':'selectItem']" @click="formShow.isSelected6 = 0;operation='0302';">有</view>
					<view style="margin-bottom: 0;" :class="[formShow.isSelected6 == 1?'selectItem selected':'selectItem']" @click="noSurgery">无</view>
				</view>
				<view class="itemContent" v-show="formShow.isSelected6 == 0">
					<view class="inner1" v-for="(item,index) in surgeryList" :key="index">
						<input :value="item.inputValue"  class="uni-input inner2" placeholder="手术名称" @input="bindInput($event,item)"/>
						<picker class="pickerBox" :value="item.date"  mode="date" :start="startDate" :end="endDate" @change="bindDateChange($event,item)">
							<view class="uni-input">{{item.date}}</view>
							<image class="down" src="@/static/health/dateDown.png"></image>
						</picker>
					</view>
					<view class="addBox">
						<view @click="addSurgery">
							<image class="add" src="@/static/health/addarchives.png" ></image>添加
						</view>
					</view>
				</view>
			</view>
			<view class="formItemBox">
				<view class="itemTitle">
					<view class="itemLabel">外伤史</view>
					<view style="margin-bottom: 0;" :class="[formShow.isSelected7 == 0?'selectItem selected':'selectItem']" @click="formShow.isSelected7 = 0;trauma='0602';">有</view>
					<view style="margin-bottom: 0;" :class="[formShow.isSelected7 == 1?'selectItem selected':'selectItem']" @click="noTrauma">无</view>
				</view>
				<view class="itemContent" v-show="formShow.isSelected7 == 0">
					<view class="inner1" v-for="(item,index) in traumaList" :key="index">
						<input :value="item.inputValue"  class="uni-input inner2" placeholder="填写名称" @input="bindInput($event,item)"/>
						<picker class="pickerBox" :value="item.date"  mode="date" :start="startDate" :end="endDate" @change="bindDateChange($event,item)">
							<view class="uni-input">{{item.date}}</view>
							<image class="down" src="@/static/health/dateDown.png"></image>
						</picker>
					</view>
					<view class="addBox">
						<view @click="addTrauma">
							<image class="add" src="@/static/health/addarchives.png" ></image>添加
						</view>
					</view>
				</view>
			</view>
			<view class="formItemBox">
				<view class="itemTitle">
					<view class="itemLabel">输血史</view>
					<view style="margin-bottom: 0;" :class="[formShow.isSelected8 == 0?'selectItem selected':'selectItem']" @click="formShow.isSelected8 = 0;transfusion='0402';">有</view>
					<view style="margin-bottom: 0;" :class="[formShow.isSelected8 == 1?'selectItem selected':'selectItem']" @click="noTransfusion">无</view>
				</view>
				<view class="itemContent" v-show="formShow.isSelected8 == 0">
					<view class="inner1" v-for="(item,index) in bloodTransfusionList" :key="index">
						<input :value="item.inputValue"  class="uni-input inner2" placeholder="添加原因" @input="bindInput($event,item)"/>
						<picker class="pickerBox" :value="item.date"  mode="date" :start="startDate" :end="endDate" @change="bindDateChange($event,item)">
							<view class="uni-input">{{item.date}}</view>
							<image class="down" src="@/static/health/dateDown.png"></image>
						</picker>
					</view>
					<view class="addBox">
						<view @click="addBloodTransfusion">
							<image class="add" src="@/static/health/addarchives.png" ></image>添加
						</view>
					</view>
				</view>
			</view>
			<view class="formItemBox">
				<view class="itemTitle">
					<view class="itemLabel">家族史|父亲</view>
					<view style="margin-bottom: 0;" :class="[formShow.isSelected9 == 0?'selectItem selected':'selectItem']" @click="formShow.isSelected9 = 0">有</view>
					<view style="margin-bottom: 0;" :class="[formShow.isSelected9 == 1?'selectItem selected':'selectItem']" @click="noFatherDis">无</view>
				</view>
				<view class="itemContent" v-show="formShow.isSelected9 == 0">
					<view class="selectBar">
						<view class="selectItem" v-for="(item,index) in fatherDiseaseList" :class="{selected:item.checked}" @click="checkFatherDisease(item)" :key="index">{{item.title}}</view>
					</view>
					<view class="uni-textarea textarea" v-if="fatherDisType">
						<textarea :value="diseaseFatherDesc" @input="disFatherInput" placeholder-style="color:#ccc" placeholder="填写其他疾病"/>
					</view>
				</view>
			</view>
			<view class="formItemBox">
				<view class="itemTitle">
					<view class="itemLabel">家族史|母亲</view>
					<view style="margin-bottom: 0;" :class="[formShow.isSelected10 == 0?'selectItem selected':'selectItem']" @click="formShow.isSelected10 = 0">有</view>
					<view style="margin-bottom: 0;" :class="[formShow.isSelected10 == 1?'selectItem selected':'selectItem']" @click="noMotherDis">无</view>
				</view>
				<view class="itemContent" v-show="formShow.isSelected10 == 0">
					<view class="selectBar">
						<view class="selectItem" v-for="(item,index) in motherDiseaseList" :class="{selected:item.checked}" @click="checkMotherDisease(item)" :key="index">{{item.title}}</view>
					</view>
					<view class="uni-textarea textarea" v-if="motherDisType">
						<textarea :value="diseaseMotherDesc" @input="disMotherInput" placeholder-style="color:#ccc" placeholder="填写其他疾病"/>
					</view>
				</view>
			</view>
			<view class="formItemBox">
				<view class="itemTitle">
					<view class="itemLabel">家族史|兄弟姐妹</view>
					<view style="margin-bottom: 0;" :class="[formShow.isSelected11 == 0?'selectItem selected':'selectItem']" @click="formShow.isSelected11 = 0">有</view>
					<view style="margin-bottom: 0;" :class="[formShow.isSelected11 == 1?'selectItem selected':'selectItem']" @click="noBroDis">无</view>
				</view>
				<view class="itemContent" v-show="formShow.isSelected11 == 0">
					<view class="selectBar">
						<view class="selectItem" v-for="(item,index) in broDiseaseList" :class="{selected:item.checked}" @click="checkBroDisease(item)" :key="index">{{item.title}}</view>
					</view>
					<view class="uni-textarea textarea" v-if="broDisType">
						<textarea :value="diseaseBrotherDesc" @input="disBroInput" placeholder-style="color:#ccc" placeholder="填写其他疾病"/>
					</view>
				</view>
			</view>
			<view class="formItemBox">
				<view class="itemTitle">
					<view class="itemLabel">家族史|子女</view>
					<view style="margin-bottom: 0;" :class="[formShow.isSelected12 == 0?'selectItem selected':'selectItem']" @click="formShow.isSelected12 = 0">有</view>
					<view style="margin-bottom: 0;" :class="[formShow.isSelected12 == 1?'selectItem selected':'selectItem']" @click="noChildDis">无</view>
				</view>
				<view class="itemContent" v-show="formShow.isSelected12 == 0">
					<view class="selectBar">
						<view class="selectItem" v-for="(item,index) in childDiseaseList" :class="{selected:item.checked}" @click="checkChildDisease(item)" :key="index">{{item.title}}</view>
					</view>
					<view class="uni-textarea textarea" v-if="childDisType">
						<textarea :value="diseaseChildrenDesc" @input="disChildInput" placeholder-style="color:#ccc" placeholder="填写其他疾病"/>
					</view>
				</view>
			</view>
			<view class="formItemBox">
				<view class="itemTitle">
					<view class="itemLabel">遗传病史</view>
					<view style="margin-bottom: 0;" :class="[formShow.isSelected13 == 0?'selectItem selected':'selectItem']" @click="formShow.isSelected13 = 0;inherit=2;">有</view>
					<view style="margin-bottom: 0;" :class="[formShow.isSelected13 == 1?'selectItem selected':'selectItem']" @click="formShow.isSelected13 = 1;inherit=1;">无</view>
				</view>
				<view class="itemContent" v-show="formShow.isSelected13 == 0">
					<view class="inner1">
						<input :value="inheritDesc" class="uni-input inner2" style="margin-bottom: 0;" placeholder="填写疾病名称" @input="inheritInput"/>
					</view>
				</view>
			</view>
			<view class="formItemBox">
				<view class="itemTitle">
					<view class="itemLabel">残疾情况</view>
					<view style="margin-bottom: 0;" :class="[formShow.isSelected14 == 0?'selectItem selected':'selectItem']" @click="formShow.isSelected14 = 0">有</view>
					<view style="margin-bottom: 0;" :class="[formShow.isSelected14 == 1?'selectItem selected':'selectItem']" @click="noDisability">无</view>
				</view>
				<view class="itemContent" v-show="formShow.isSelected14 == 0">
					<view class="selectBar">
						<view class="selectItem" v-for="(item,index) in disabilityList" :class="{selected:item.checked}" @click="checkDisability(item)" :key="index">{{item.title}}</view>
					</view>
					<view class="uni-textarea textarea" v-if="disabilityType">
						<textarea :value="disableDesc" @input="disabilityInput" placeholder-style="color:#ccc" placeholder="填写其他疾病"/>
					</view>
				</view>
			</view>
			<view class="submitBtn" @click="submit()">
				提交
			</view>
		</view>
		<uni-popup  ref="popup" type="bottom">
			<view class="addPharmacy">
				<view class="h2">拒绝原因</view>
				<view class="uni-textarea dialogTextarea">
					<textarea  maxlength="1000" @input="refusedInput" placeholder-style="color:#A5A8AF" placeholder="请填写拒绝原因"/>
					<view class="garyBox">{{titleLength}}/1000</view>
				</view>
				<view class="refusedButton" @click="refusedSubmit">提交</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
	    components: {uniPopup},
		data() {
			return {
				infoData:'',//病人基本信息
				isCollapse: false,
				isShowButton: true,
				isUnfold: false,
				isShowCheck: true,
				index: 0,
				titleLength:'0',
				formShow: {
					isSelected1: 1,
					isSelected2: 1,
					isSelected3: 1,
					isSelected4: 1,
					isSelected5: 1,
					isSelected6: 1,
					isSelected7: 1,
					isSelected8: 1,
					isSelected9: 1,
					isSelected10: 1,
					isSelected11: 1,
					isSelected12: 1,
					isSelected13: 1,
					isSelected14: 1,
				},
				bloodList:[//血型
					{
						title:'A型',
						type:'1',
					},
					{
						title:'B型',
						type:'2',
					},
					{
						title:'O型',
						type:'3',
					},
					{
						title:'AB型',
						type:'4',
					},
					{
						title:'不详',
						type:'5',
					}
				],
				selectBlood:'-1',
				RHList:[//RH
					{
						title:'阴性',
						type:'1',
					},
					{
						title:'阳性',
						type:'2',
					},
					{
						title:'不详',
						type:'3',
					}
				],
				selectRH:'-1',
				allergyList:[//药物过敏史
					{
						title:'青霉素',
						type:'0102',
						checked:false,
					},
					{
						title:'磺胺',
						type:'0103',
						checked:false,
					},
					{
						title:'链霉素',
						type:'0104',
						checked:false,
					},
					{
						title:'其他',
						type:'0109',
						checked:false,
					}
				],
				selectAllergy:['0101'],
				allergyDescType:false,
				allergyDesc:'',
				allergyDescLength:'0',
				exposeList:[//暴露史
					{
						title:'化学品',
						type:'1202',
						checked:false,
					},
					{
						title:'毒物',
						type:'1203',
						checked:false,
					},
					{
						title:'射线',
						type:'1204',
						checked:false,
					}
				],
				selectExpose:['1201'],
				pastList:[//既往史
					{
						title:'高血压',
						date:'选择确诊日期',
						type:2,
						isHasName:false,
						pickerDis:true,
					},
					{
						title:'糖尿病',
						date:'选择确诊日期',
						type:3,
						isHasName:false,
						pickerDis:true,
					},
					{
						title:'冠心病',
						date:'选择确诊日期',
						type:4,
						isHasName:false,
						pickerDis:true,
					},
					{
						title:'慢性阻塞性肺疾病',
						date:'选择确诊日期',
						type:5,
						isHasName:false,
						pickerDis:true,
					},
					{
						title:'恶性肿瘤',
						date:'选择确诊日期',
						type:6,
						isHasName:true,
						pickerDis:true,
						placeholder:'请填写肿瘤名称',
						inputValue:'',
					},
					{
						title:'脑卒中',
						date:'选择确诊日期',
						type:7,
						isHasName:false,
						pickerDis:true,
					},
					{
						title:'严重精神障碍',
						date:'选择确诊日期',
						type:8,
						isHasName:false,
						pickerDis:true,
					},
					{
						title:'结核病',
						date:'选择确诊日期',
						type:9,
						isHasName:false,
						pickerDis:true,
					},
					{
						title:'肝炎',
						date:'选择确诊日期',
						type:10,
						isHasName:false,
						pickerDis:true,
					},
					{
						title:'先天畸形',
						date:'选择确诊日期',
						type:11,
						isHasName:false,
						pickerDis:true,
					},
					{
						title:'职业病',
						date:'选择确诊日期',
						type:12,
						isHasName:true,
						pickerDis:true,
						placeholder:'填写疾病名称',
						inputValue:'',
					},
					{
						title:'其他法定传染病',
						date:'选择确诊日期',
						type:98,
						isHasName:true,
						pickerDis:true,
						placeholder:'填写疾病名称',
						inputValue:'',
					},
					{
						title:'其他',
						date:'选择确诊日期',
						type:99,
						isHasName:true,
						pickerDis:true,
						placeholder:'填写疾病名称',
						inputValue:'',
					},
				],
				surgeryList:[//手术史
					{
						inputValue:'',
						date:'选择日期',
					}
				],
				operation:'0301',
				traumaList:[//外伤史
					{
						inputValue:'',
						date:'选择日期',
					}
				],
				trauma:'0601',
				bloodTransfusionList:[//输血史
					{
						inputValue:'',
						date:'选择日期',
					}
				],
				transfusion:'0401',
				familyDiseaseList:[//家族史
					{
						title:'高血压',
						type:'0702',
						checked:false,
					},
					{
						title:'糖尿病',
						type:'0703',
						checked:false,
					},
					{
						title:'冠心病',
						type:'0704',
						checked:false,
					},
					{
						title:'慢性阻塞性肺疾病',
						type:'0705',
						checked:false,
					},
					{
						title:'恶性肿瘤',
						type:'0706',
						checked:false,
					},
					{
						title:'脑卒中',
						type:'0707',
						checked:false,
					},
					{
						title:'严重精神障碍',
						type:'0708',
						checked:false,
					},
					{
						title:'结核病',
						type:'0709',
						checked:false,
					},
					{
						title:'肝炎',
						type:'0710',
						checked:false,
					},
					{
						title:'先天畸形',
						type:'0711',
						checked:false,
					},
					{
						title:'其他',
						type:'0799',
						checked:false,
					},
				],
				fatherDiseaseList:'',//父亲
				fatherDisType:false,
				diseaseFatherDesc:'',
				selectFatherDis:[],
				motherDiseaseList:'',//母亲
				motherDisType:false,
				diseaseMotherDesc:'',
				selectMotherDis:[],
				broDiseaseList:'',//兄弟姐妹
				broDisType:false,
				diseaseBrotherDesc:'',
				selectBroDis:[],
				childDiseaseList:'',//子女
				childDisType:false,
				diseaseChildrenDesc:'',
				selectChildDis:[],
				inherit:1,//遗传
				inheritDesc:'',
				disabilityList:[
					{
						title:'视力残疾',
						type:'1102',
						checked:false,
					},
					{
						title:'听力残疾',
						type:'1103',
						checked:false,
					},
					{
						title:'言语残疾',
						type:'1104',
						checked:false,
					},
					{
						title:'肢体残疾',
						type:'1105',
						checked:false,
					},
					{
						title:'智力残疾',
						type:'1106',
						checked:false,
					},
					{
						title:'精神残疾',
						type:'1107',
						checked:false,
					},
					{
						title:'其他残疾',
						type:'1199',
						checked:false,
					},
				],
				disabilityType:false,
				disableDesc:'',
				selectDisability:[],
				date: '',
				pastRequire:true,
			}
		},
		computed: {
			startDate() {
				return this.getDate('start')
			},
			endDate() {
				return this.getDate('end')
			},
			sex(){
				return this.$globalMethod.yhdFuncSex(this.infoData.psex);
			},
			nation(){
				return this.$globalMethod.yhdFuncNation(this.infoData.nation);
			},
			cardType(){
				return this.$globalMethod.yhdFuncCardType(this.infoData.cardType);
			},
			homeType(){
				return this.$globalMethod.yhdFuncHometype(this.infoData.homeType);
			},
			cultural(){
				return this.$globalMethod.yhdFuncCultural(this.infoData.cultural);
			},
			occupation(){
				return this.$globalMethod.yhdFuncOccupation(this.infoData.occupation);
			},
			marriage(){
				return this.$globalMethod.yhdFuncMarriage(this.infoData.marriage);
			},
			payType(){
				return this.$globalMethod.yhdFuncPayType(this.infoData.payType);
			}
		},
		methods: {
			bindDateChange(e,obj) {
				obj.date= e.target.value
			},
			bindInput(e,obj){
				obj.inputValue= e.target.value.trim();
			},
			inheritInput(e){
				this.inheritDesc= e.target.value.trim();
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
			refused(){
				this.$refs.popup.open()
			},
			refusedInput(e){
				this.titleLength = e.detail.value.length;
			},
			refusedSubmit(){
				this.$refs.popup.close()
			},
			checkBlood(type){
				this.selectBlood = type;
			},
			checkRH(type){
				this.selectRH = type;
			},
			noAllergy(){//药物过敏史点击无
				this.allergyList.map((item=>{
					item.checked=false;
				}))
				this.allergyDescType = false;
				this.allergyDesc = '';
				this.formShow.isSelected3=1;
				this.selectAllergy=[];
				this.selectAllergy.push('0101')
			},
			checkAllergy(obj){
				obj.checked = !obj.checked;
				if(this.selectAllergy.includes(obj.type)){
					if(obj.type=='0109'){
						this.allergyDescType = false;
					}
					this.selectAllergy.splice(this.selectAllergy.findIndex(item => item === obj.type), 1)
				}else{
					if(obj.type=='0109'){
						this.allergyDescType = true;
					}
					this.selectAllergy.push(obj.type);
				}
			},
			allergyInput(e){
				this.allergyDescLength = e.detail.value.length;
				this.allergyDesc = e.detail.value;
			},
			noExpose(){//暴露史点击无
				this.exposeList.map((item=>{
					item.checked=false;
				}))
				this.formShow.isSelected4=1;
				this.selectExpose=[];
				this.selectExpose.push('1201');
			},
			checkExpose(obj){
				obj.checked = !obj.checked;
				if(this.selectExpose.includes(obj.type)){
					this.selectExpose.splice(this.selectExpose.findIndex(item => item === obj.type), 1)
				}else{
					this.selectExpose.push(obj.type);
				}
			},
			checkPast(obj){//既往史
				obj.pickerDis = !obj.pickerDis;
				obj.date="选择确诊日期";
				if(obj.hasOwnProperty('inputValue')){
					obj.inputValue='';
				}
			},
			noPast(){
				this.formShow.isSelected5 = 1;
				this.pastList.map((item)=>{
					item.date='选择确诊日期';
					item.pickerDis=true;
					if(item.hasOwnProperty('inputValue')){
						item.inputValue='';
					}
				})
				console.log(this.pastList)
			},
			addSurgery(){//添加手术
				let newObj = {
					inputValue:'',
					date:'选择日期',
				};
				this.surgeryList.push(newObj);
			},
			noSurgery(){
				this.formShow.isSelected6 = 1;
				this.operation='0301';
				this.surgeryList=[//手术史
					{
						inputValue:'',
						date:'选择日期',
					}
				]
			},
			addTrauma(){//添加外伤
				let newObj = {
					inputValue:'',
					date:'选择日期',
				};
				this.traumaList.push(newObj);
			},
			noTrauma(){
				this.formShow.isSelected7 = 1;
				this.trauma='0601';
				this.traumaList=[//外伤史
					{
						inputValue:'',
						date:'选择日期',
					}
				]
			},
			addBloodTransfusion(){//添加输血
				let newObj = {
					inputValue:'',
					date:'选择日期',
				};
				this.bloodTransfusionList.push(newObj);
			},
			noTransfusion(){
				this.formShow.isSelected8 = 1;
				this.transfusion='0401';
				this.bloodTransfusionList=[//输血史
					{
						inputValue:'',
						date:'选择日期',
					}
				]
			},
			checkFatherDisease(obj){//家族史父亲
				obj.checked = !obj.checked;
				if(this.selectFatherDis.includes(obj.type)){
					if(obj.type=='0799'){
						this.fatherDisType = false;
					}
					this.selectFatherDis.splice(this.selectFatherDis.findIndex(item => item === obj.type), 1)
				}else{
					if(obj.type=='0799'){
						this.fatherDisType = true;
					}
					this.selectFatherDis.push(obj.type);
				}
			},
			noFatherDis(){
				this.fatherDiseaseList.map((item=>{
					item.checked=false;
				}))
				this.fatherDisType = false;
				this.diseaseFatherDesc = '';
				this.formShow.isSelected9=1;
				this.selectFatherDis=[];
			},
			disFatherInput(e){
				this.diseaseFatherDesc = e.detail.value.trim();
			},
			checkMotherDisease(obj){//家族史母亲
				obj.checked = !obj.checked;
				if(this.selectMotherDis.includes(obj.type)){
					if(obj.type=='0799'){
						this.motherDisType = false;
					}
					this.selectMotherDis.splice(this.selectMotherDis.findIndex(item => item === obj.type), 1)
				}else{
					if(obj.type=='0799'){
						this.motherDisType = true;
					}
					this.selectMotherDis.push(obj.type);
				}
			},
			noMotherDis(){
				this.motherDiseaseList.map((item=>{
					item.checked=false;
				}))
				this.motherDisType = false;
				this.diseaseMotherDesc = '';
				this.formShow.isSelected10=1;
				this.selectMotherDis=[];
			},
			disMotherInput(e){
				this.diseaseMotherDesc = e.detail.value.trim();
			},
			checkBroDisease(obj){//家族史兄弟姐妹
				obj.checked = !obj.checked;
				if(this.selectBroDis.includes(obj.type)){
					if(obj.type=='0799'){
						this.broDisType = false;
					}
					this.selectBroDis.splice(this.selectBroDis.findIndex(item => item === obj.type), 1)
				}else{
					if(obj.type=='0799'){
						this.broDisType = true;
					}
					this.selectBroDis.push(obj.type);
				}
			},
			noBroDis(){
				this.broDiseaseList.map((item=>{
					item.checked=false;
				}))
				this.broDisType = false;
				this.diseaseBrotherDesc= '';
				this.formShow.isSelected11=1;
				this.selectBroDis=[];
			},
			disBroInput(e){
				this.diseaseBrotherDesc = e.detail.value.trim();
			},
			checkChildDisease(obj){//家族史子女
				obj.checked = !obj.checked;
				if(this.selectChildDis.includes(obj.type)){
					if(obj.type=='0799'){
						this.childDisType = false;
					}
					this.selectChildDis.splice(this.selectChildDis.findIndex(item => item === obj.type), 1)
				}else{
					if(obj.type=='0799'){
						this.childDisType = true;
					}
					this.selectChildDis.push(obj.type);
				}
			},
			noChildDis(){
				this.childDiseaseList.map((item=>{
					item.checked=false;
				}))
				this.childDisType = false;
				this.diseaseChildrenDesc= '';
				this.formShow.isSelected12=1;
				this.selectChildDis=[];
			},
			disChildInput(e){
				this.diseaseChildrenDesc = e.detail.value.trim();
			},
			checkDisability(obj){
				obj.checked = !obj.checked;
				if(this.selectDisability.includes(obj.type)){
					if(obj.type=='1199'){
						this.disabilityType = false;
					}
					this.selectDisability.splice(this.selectDisability.findIndex(item => item === obj.type), 1)
				}else{
					if(obj.type=='1199'){
						this.disabilityType = true;
					}
					this.selectDisability.push(obj.type);
				}
			},
			noDisability(){
				this.disabilityList.map((item=>{
					item.checked=false;
				}))
				this.disabilityType = false;
				this.disableDesc= '';
				this.formShow.isSelected14=1;
				this.selectDisability=[];
			},
			disabilityInput(e){
				this.disableDesc= e.target.value;
			},
			pastRequireFunc(obj){
				obj.map(item=>{ //既往史
					if(!item.pickerDis){
						let inputType = false;
						if(item.hasOwnProperty('inputValue')&&item.inputValue.length=='0'){
							inputType = true;
						}
						if(item.date=='选择确诊日期' || inputType){
							uni.showToast({
								title: '选择的既往史疾病必须填写完整！',
								duration: 2000,
								icon:'none'
							});
							this.pastRequire = false;
							return false;
						}else{
							this.pastRequire = true
						}
					}
				})
			},
			otherRequireFunc(obj,title){
				let type=true;
				obj.map(item=>{
					if(item.inputValue.length!='0' && item.date=='选择日期'){
						uni.showToast({
							title: '选择的'+title+'必须填写完整！',
							duration: 2000,
							icon:'none'
						});
						type=false;
					}else if(item.inputValue.length=='0' && item.date!='选择日期'){
						uni.showToast({
							title: '选择的'+title+'必须填写完整！',
							duration: 2000,
							icon:'none'
						});
						type=false;
					}else{
						type=true;
					}
				})
				return type;
			},
			familyRequire(obj,text){
				let type=true;
				if(obj.includes('0799') && text.length==0){
					uni.showToast({
						title: '选择其他时，详情必须填写！',
						duration: 2000,
						icon:'none'
					});
					type = false;
				}else{
					type = true;
				}
				return type;
			},
			submit(){
				const self = this;
				console.log(self.infoData.cardType);
				//血型和RH
				if(self.selectBlood=='-1' || self.selectRH=='-1'){
					uni.showToast({
					    title: '请选择必选项！',
					    duration: 2000,
						icon:'none'
					});
					return false;
				}
				let allergy = self.$globalMethod.arrSplicedh(self.selectAllergy);//药物过敏史
				let expose = self.$globalMethod.arrSplicedh(self.selectExpose);//暴露史
				self.pastRequireFunc(self.pastList);//既往史
				let surgeryRequire = self.otherRequireFunc(self.surgeryList,'手术史');//手术史
				let traumaRequire = self.otherRequireFunc(self.traumaList,'外伤史');//外伤史
				let transfusionRequire = self.otherRequireFunc(self.bloodTransfusionList,'输血史');//输血史
				let fatherRequire = self.familyRequire(self.selectFatherDis,self.diseaseFatherDesc);//父亲史
				let motherRequire = self.familyRequire(self.selectMotherDis,self.diseaseMotherDesc);//母亲史
				let brotherRequire = self.familyRequire(self.selectBroDis,self.diseaseBrotherDesc);//兄弟姐妹史
				let childRequire = self.familyRequire(self.selectChildDis,self.diseaseChildrenDesc);//子女史
				let disableRequire = self.familyRequire(self.selectDisability,self.disableDesc);//残疾情况
				if(self.pastRequire && surgeryRequire && traumaRequire && transfusionRequire && fatherRequire && motherRequire && brotherRequire && childRequire && disableRequire){
					let disease = self.$globalMethod.arrSpliceDisease(self.pastList);//既往史
					let operationRec = self.$globalMethod.arrSpliceStr(self.surgeryList,self.operation);//手术史
					let traumaRec = self.$globalMethod.arrSpliceStr(self.traumaList,self.trauma);//手术史
					let transfusionRec = self.$globalMethod.arrSpliceStr(self.bloodTransfusionList,self.transfusion);//输血史
					let diseaseFather = self.$globalMethod.arrSplicedh(self.selectFatherDis);//父亲史
					let diseaseMother = self.$globalMethod.arrSplicedh(self.selectMotherDis);//母亲史
					let diseaseBrother = self.$globalMethod.arrSplicedh(self.selectBroDis);//兄弟姐妹史
					let diseaseChildren = self.$globalMethod.arrSplicedh(self.selectChildDis);//子女史
					let disable = self.$globalMethod.arrSplicedh(self.selectDisability);//残疾情况
					let queryObj = {
						token:'xxxxxx',
						tosType:'10',
						lsType:'2',
						pname:self.infoData.pname,
						cardId:self.infoData.cardId,
						psex:self.infoData.psex,
						birthday:self.infoData.birthday,
						nation:self.infoData.nation,
						marriage:self.infoData.marriage,
						workunit:self.infoData.workunit,
						homeType:self.infoData.homeType,
						regionCode:self.infoData.regionCode,
						regionText:self.infoData.regionText,
						naddress:self.infoData.naddress,
						baddress:self.infoData.baddress,
						residentPhone:self.infoData.residentPhone,
						mobile:self.infoData.mobile,
						urgentName:self.infoData.urgentName,
						urgentPhone:self.infoData.urgentPhone,
						cultural:self.infoData.cultural,
						occupation:self.infoData.occupation,
						cardType:self.infoData.cardType,
						payType:self.infoData.payType,
						bloodAbo:self.selectBlood,
						bloodRh:self.selectRH,
						allergy:allergy,
						allergyDesc:self.allergyDesc,
						expose:expose,
						disease:disease,
						operation:self.operation,
						operationRec:operationRec,
						trauma:self.trauma,
						traumaRec:traumaRec,
						transfusion:self.transfusion,
						transfusionRec:transfusionRec,
						diseaseFather:diseaseFather,
						diseaseFatherDesc:self.diseaseFatherDesc,
						diseaseMother:diseaseMother,
						diseaseMotherDesc:self.diseaseMotherDesc,
						diseaseBrother:diseaseBrother,
						diseaseBrotherDesc:self.diseaseBrotherDesc,
						diseaseChildren:diseaseChildren,
						diseaseChildrenDesc:self.diseaseChildrenDesc,
						inherit:self.inherit,//遗传
						inheritDesc:self.inheritDesc,
						disable:disable,
						disableDesc:self.disableDesc,
					};
					let timestamp=new Date().getTime();
					self.$globalMethod.ds_api({
						method:"apply?reqtime="+timestamp,
						loadmsg:"",
						showLoading:false,
						data:queryObj,
						success:(res)=>{
							console.log(res);
							
							
						}					
					})
				}
			},
		},
		onLoad(option){
			this.infoData = JSON.parse(option.detailData);
			this.fatherDiseaseList=JSON.parse(JSON.stringify(this.familyDiseaseList));
			this.motherDiseaseList=JSON.parse(JSON.stringify(this.familyDiseaseList));
			this.broDiseaseList=JSON.parse(JSON.stringify(this.familyDiseaseList));
			this.childDiseaseList=JSON.parse(JSON.stringify(this.familyDiseaseList));
		},
	}
</script>

<style scoped lang="scss">
	page{
		height: 100%;
		background: #F8F9FF;
	}
	.wrap {
		width: 100%;
		padding: 20upx 24upx;
		font-size: 36upx;
		.title {
			display: flex;
			padding: 23upx 25upx;
			line-height: 48upx;
			uni-image {
				width: 44upx;
				height: 44upx;
				margin-right: 17upx;
			}
			.titleText {
				color: #223263;
				width: 75%;
				font-size: 34upx;
			}
		}
		.messageCard.transCard {
			height: 92upx;
		}
		.messageCard {
			width: 100%;
			border-radius: 20upx;
			background-color: #ffffff;
			overflow: hidden;
			// transition: height 0.5s linear;
			.title {
				.collapseBtn {
					display: flex;
					align-items: center;
					font-size: 24upx;
					color: #898894;
					uni-image {
						width: 22upx;
						height: 13upx;
						margin-left: 12upx;
						transition: all 0.2s;
					}
					.transUnfold {
						transform: rotateZ(-180deg);
					}
				}
			}
			.content.transCont {
				border-top: none;
			}
			.content {
				border-top: 2upx solid #EBEBEB;
				padding: 29upx 30upx;
				font-size: 30upx;
				& > uni-view {
					display: flex;
					justify-content: flex-start;
					padding: 16upx 0upx;
				}
				& > uni-view:last-child {
					padding: 0 0;
				}
				.label {
					width: 185upx;
				}
				.context {
					color: #ACB3C5;
				}
				.paddingTag.context {
					padding-left: 68upx;
				}
				.underlineTag {
					border-top: 2upx dashed #E3E7EC;
				}
			}
			.opButton {
				height: 108upx;
				display: flex;
				border-top: 2upx solid #EBEBEB;
				padding: 22upx 0upx; 
				box-sizing: border-box;
				text {
					display: inline-block;
					width: 210upx;
					height: 64upx;
					text-align: center;
					line-height: 64upx;
					border-radius: 32upx;
					margin-left: 84upx;
				}
				.refused {
					background-color: #EFF0F2;
				}
				.agree {
					background-color: #0084FD;
					color: #ffffff;
				}
			}
		}
		.docWrite {
			margin-top: 71upx;
			.formItemBox {
				width: 100%;
				border-radius: 20upx;
				background-color: #FFFFFF;
				margin-bottom: 20upx;
				.itemTitle {
					padding: 20upx;
					display: flex;
					color: #020221;
					font-size: 30upx;
					line-height: 56upx;
					.itemLabel {
						min-width: 220upx;
						display: flex;
						.requiredTitle{
							color: #FE2338;
							font-size: 30upx;
						}
					}
				}
				.selectItem {
					min-width: 124upx;
					height: 60upx;
					border-radius: 10upx;
					background-color: #FAFAFA;
					padding: 0 16upx;
					color: #666666;
					text-align: center;
					line-height: 60upx;
					margin-right: 34upx;
					margin-bottom: 30upx;
				}
				.selectItem.selected {
					background-color: #E8F2FA;
					color: #0084FD;
				}
				.itemContent {
					border-top: 1px solid #EBEBEB;
					padding: 20upx;
					.selectBar {
						display: flex;
						font-size: 30upx;
						flex-wrap: wrap;
					}
					.textarea{
						background:#fff;
						position: relative;
						margin-top: 40upx;
						uni-textarea{
							width: 100%;
							height: 80upx;
							padding-bottom: 30upx;
							color: #020221;
							font-size: 28upx;
						}
						.garyBox{
							position: absolute;
							bottom: 0;
							right: 0;
							color: #ccc;
							font-size: 24upx;
						}
					}
					.diseaseBox {
						.uni-list-cell {
							height: 80upx;
						}
					}
					.addBox{
						width: 100%;
						display: flex;
						justify-content: flex-end;
						view{
							color: #0084FD;
							font-size: 28upx;
							display: flex;
							align-items: center;
							.add{
								width: 30upx;
								height: 30upx;
								margin-right: 14upx;
							}
						}
					}
					.inner1{
						margin-bottom: 40upx;
						display: flex;
						flex-direction: column;
						.inner2{
							width: 100%;
							height:80upx;
							border:2upx solid rgba(237,237,237,1);
							border-radius:8upx;
							padding-left: 23upx;
							line-height: 80upx;
							margin-bottom: 30upx;
							.uni-input-placeholder{
							   color: #ccc;
							   font-size: 26upx;
							}
						}
						.innerTitleBox{
							width: 100%;
							display: flex;
							margin-bottom: 20upx;
							.innerTitle{
								color: #666;
								font-size: 30upx;
								background:#fafafa;
								border-radius:10px;
								padding: 12upx 16upx;
								&.innerTitle2{
									background-color: #E8F2FA;
									color: #0084FD;
								}
							}
						}
						.pickerBox{
							height:80upx;
							padding: 0 24upx;
							border:2upx solid rgba(237,237,237,1);
							border-radius:8upx;
							font-size: 28upx;
							color: #020221;
							line-height: 80upx;
							position: relative;
							&.disPicker{
								color: #666;
							}
							.down{
								position: absolute;
								right: 24upx;
								top:50%;
								margin-top: -6upx;
								width: 20upx;
								height: 13upx;
							}
						}
					}
				}
			}
			.submitBtn {
				margin-top: 71upx;
				width: 100%;
				height: 88upx;
				color: #FFFFFF;
				font-size: 34upx;
				line-height: 88upx;
				text-align: center;
				background-color: #0084FD;
				border-radius: 44upx;
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
			.dialogTextarea{
				background:rgba(242,243,245,1);
				border-radius:20upx;
				position: relative;
				margin-bottom: 55upx;
				uni-textarea{
					width: 100%;
					height: 210upx;
					padding: 30upx 24upx 50upx;
					color: #020221;
					font-size: 26upx;
				}
				.garyBox{
					position: absolute;
					bottom: 20upx;
					right: 30upx;
					color: #B5B5B5;
					font-size: 24upx;
				}
			}
			.refusedButton{
				width:500upx;
				height:78upx;
				background:rgba(0,132,253,1);
				border-radius:39upx;
				margin: 0 auto;
				line-height: 78upx;
				text-align: center;
				font-size: 34upx;
				color: #fff;
			}
		}
	}
	
</style>
