import firebase from 'firebase/app'

export default {
	state: {
		records: []
	},
	mutations: {
		setRecords(state, records) {
			state.records = records
		},
	},
	actions: {
		async createRecord({commit, dispatch}, recordData) {
			try {
				const uid = await dispatch('getUid');
				return await firebase.database().ref(`/users/${uid}/records`).push(recordData)
			} catch (e) {
				commit('setError', e)
				throw e
			}
		},
		async fetchRecords({dispatch, commit}) {
			try {
				const uid = await dispatch('getUid');
				let records = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || {}
				records = Object.keys(records).map(key => ({...records[key], id: key }))
				commit('setRecords', records)
			} catch (e) {
				commit('setError', e)
				throw e
			}
		},
	},
	getters: {
		getRecords: s => s.records
	}
}
