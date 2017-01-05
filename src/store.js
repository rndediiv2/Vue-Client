import Vue from 'vue'
import Vuex from 'vuex'

import userStore from './components/user/userStore'
import chatStore from './components/chat/chatStore'
import privateStore from './components/private/privateStore'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	modules: {
		userStore, chatStore, privateStore
	},
	strict: debug
})