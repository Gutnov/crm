import firebase from 'firebase/app'

export default {
	state: {
		info: {}
	},
	mutations: {
		setInfo(state, info) {
			state.info = info
		}
	},
	actions: {
		async fetchInfo({dispatch, commit}) {
			try {
				const uid = await dispatch('getUid');
				const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val();
				commit('setInfo', info)
			} catch (e) {console.log(e)}
		},
		async updateInfo({dispatch, commit, getters}, toUpdate) {
			try {
				const uid = await dispatch('getUid');
				const updateData = {...getters.getInfo, ...toUpdate}
				await firebase.database().ref(`/users/${uid}/info`).update(updateData)
				commit('setInfo', updateData)
			} catch (e) {
				commit('setError', e)
				throw e
			}
		},
		async fetchCurrency() {
			try {
				const key = process.env.VUE_APP_FIXER;
				const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,RUB,EUR`);
				return await res.json()
			} catch (e) {
				console.log(e)
				commit('setError', e)
				throw e
			}
		}
	},
	getters: {
		getInfo: s => s.info
	}
}
