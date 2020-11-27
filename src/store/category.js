import firebase from 'firebase/app'

export default {
	state: {
		categories: []
	},
	mutations: {
		setCategories(state, categories) {
			state.categories = categories
		},
		pushCategory(state, category) {
			state.categories = [...state.categories, category]
		}
	},
	actions: {
		async createCategory({state, dispatch, commit}, {name, limit}) {
			try {
				const uid = await dispatch('getUid');
				const category = await firebase.database().ref(`/users/${uid}/categories`).push({name, limit})
				commit('pushCategory', {name, limit, id: category.key})
				console.log(state.categories)
				//return {name, limit, id: category.key}
			} catch (e) {
				commit('setError', e)
				throw e
			}
		},
		async fetchCategories({dispatch, commit}) {
			try {
				const uid = await dispatch('getUid');
				let categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {}
				categories = Object.keys(categories).map(key => ({...categories[key], id: key }))
				commit('setCategories', categories)
			} catch (e) {
				commit('setError', e)
				throw e
			}
		},
		async updateCategory({dispatch, commit}, {name, limit, id}) {
			try {
				const uid = await dispatch('getUid');
				await firebase.database().ref(`/users/${uid}/categories`).child(id).update({name, limit})
				await dispatch('fetchCategories')
			} catch (e) {
				commit('setError', e)
				throw e
			}
		},
		
	},
	getters: {
		getCategories: s => s.categories
	}
}
