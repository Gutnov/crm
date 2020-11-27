import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import info from './info'
import category from './category'
import record from './record'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		error: null
	},
	mutations: {
		setError(state, e) {
			state.error = e  
		}
	},
	actions: {
	},
	modules: {
		auth, info, category, record
	},
	getters: {
		getError: s => s.error
	}
})
