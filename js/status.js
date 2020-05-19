
function status() {
	this._status = {		
		userId:0,
		pname:"登录",
		mobile:"",
		hasLogin: false,
		headImgUrl:'../../../static/touxiang2.png',
		inFinish:"0",
		
	}	
	this.refreshVer={}
	
	
}

status.prototype.login = function(paramObj) {
	if (!paramObj) {
		paramObj={};
	}
	for (let key in this._status) {
		if (paramObj[key]) {
			this._status[key] = paramObj[key];
		}
	}
	this._status.hasLogin = true	
	uni.setStorageSync('loginInfo', {			
		hasLogin: true,
		mobile: paramObj.mobile,
		headImgUrl: paramObj.headImgUrl,
		password: paramObj.password,
		savePwd: false,			
	})
	
}
status.prototype.hasLogin = function(value) {
	if (value == null) {
		return this._status.hasLogin		
	} else {
		this._status.hasLogin = value
	}
}
status.prototype.logout = function() {
	this._status.hasLogin = false
	this._status = {
		userid:0,
		userName:"登录",
		mobile:"",
		hasLogin: false,
		headImgUrl:''
	}		
}
status.prototype.userId = function(value) {
	if (value == null) {
		return this._status.userId
	} else {
		this._status.userId = value
	}
}
status.prototype.addRefreshNum = function(key) {
	if (!this.refreshVer[key]) {
		this.refreshVer[key] = 0
	}
	this.refreshVer[key]++
}

status.prototype.getRefreshNum = function(key) {
	if (!this.refreshVer[key]) {
		this.refreshVer[key] = 0
	}
	return this.refreshVer[key]
}

export default status
