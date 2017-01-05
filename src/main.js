
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import store from './store'

import App from './App'
import LoginPage from './pages/LoginPage'
import DashView from './pages/DashView'
import DashboardPage from './pages/DashboardPage'
import ChatPage from './pages/ChatPage'
import PrivateChat from './pages/PrivateChat'
import LiveChat from './pages/LiveChat'

import Logger from './plugins/Logger'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Logger, {loggin: true})

const routes = [
	{
		path: '/login', 
		component: LoginPage, 
		name: 'login'
	},
	{
		path: '/',
		component: DashView,
		name: 'home',
		meta: {
			requiresAuth: true
		},
		children: [
			{
				path: '/dashboard',
				component: DashboardPage,
				name: 'dashboard',
				meta: {
					requiresAuth: true
				}
			},
			{
				path: '/chat',
				component: ChatPage,
				name: 'chat',
				meta: {
					requiresAuth: true
				}
			},
			{
				path: '/private-chat',
				component: PrivateChat,
				name: 'private-chat',
				meta: {
					requiresAuth: true
				}
			},
			{
				path: '/live/:chatId/:ticketId',
				component: LiveChat,
				name: 'live-chat',
				meta: {
					requiresAuth: true
				}
			},
			{
				path:'/profile',
				name: 'profile'
			}
		]
	}
]

const router = new VueRouter({ 
	routes 
})

router.beforeEach((to, from, next) => {
	if (to.meta.requiresAuth) {
		const authUser = JSON.parse(window.localStorage.getItem('syaraniSession'))
		if (authUser && authUser.access_token) {
			next()
		} else {
			next({
				name: 'login'
			})
		}
	}
	next()
})

Vue.http.interceptors.push((request, next) => {
  next((response) => {
	if (response.status === 401) {
	  console.log('Need to login again')
	}
  })
})

new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App)
})