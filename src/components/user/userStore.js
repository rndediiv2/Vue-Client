import Vue from 'vue'
import {
	getNotification,
	getHeader
} from './../../config'

const state = {
	authUser: null,
	notification: null
}

const mutations = {
	SET_AUTH_USER(state, userObj) {
		state.authUser = userObj
	},
	CLEAR_AUTH_USER(state) {
		state.authUser = null
	},
	SET_SHOW_NOTIFICATION(state, notif) {
		state.notification = notif
	}
}

const actions = {
	setUserObject: ({commit}, userObj) => {
		commit('SET_AUTH_USER', userObj)
	},
	clearAuthUser: ({commit}) => {
		commit('CLEAR_AUTH_USER')
	},
	setNewIncomingNotification: ({commit}, userObj) => {
		let postData = {email: userObj.email}
		return Vue.http.post(getNotification, postData, {headers: getHeader()})
			.then(response => {
				commit('SET_SHOW_NOTIFICATION', response.body.data)
			})
	},
}

export default {
	state, mutations, actions
}