import Vue from 'vue'
import Vuex from 'vuex'
import status from '../js/status.js'

Vue.use(Vuex)
const _status = new status()

const store = new Vuex.Store({
	state: {
		$status: _status		
	} 

})

export default store
