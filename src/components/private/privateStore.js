import Vue from 'vue'
import {
	getLiveChat,
	saveLiveChatMessageUrl,
	getAttributeLiveChat,
	getHeader
} from './../../config'

const state = {
	liveChatUser: null,
	liveAttribute: null
}

const mutations = {
	SET_LIVE_CHAT_USER (state, user) {
		state.liveChatUser = user
	},
	ADD_LIVE_CHAT_TO_CONVERSATION (state, chat) {
		state.liveChatUser.push(chat)
	},
	SET_LIVE_ATTRIBUTE_CHAT (state, attributes)
	{
		state.liveAttribute = attributes
	}
}

const actions = {
	setLiveChat: ({commit}, obj) => {
		return Vue.http.post(getLiveChat, obj, {headers: getHeader()})
			.then(response => {
				commit('SET_LIVE_CHAT_USER', response.body.data)
			})
	},
	setAttributeLiveChat: ({commit}, postData) => {
		return Vue.http.post(getAttributeLiveChat, postData, {headers: getHeader()})
			.then(response => {
				commit('SET_LIVE_ATTRIBUTE_CHAT', response.body)
			})
	},
	addLiveChatToConversation: ({commit}, postData) => {
		return Vue.http.post(saveLiveChatMessageUrl, postData, {headers: getHeader()})
			.then(response => {
				commit('ADD_LIVE_CHAT_TO_CONVERSATION', response.body.data)
			})
	},
	newIncomingLiveChat: ({commit}, message) => {
		commit('ADD_LIVE_CHAT_TO_CONVERSATION', message)
	}
}

export default {
	state, mutations, actions
}