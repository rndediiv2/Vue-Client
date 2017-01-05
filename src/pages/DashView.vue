<script>
	import {mapState} from 'vuex'
	import Pusher from 'pusher-js'
	import notify from 'bootstrap-notify'
	export default {
		computed: {
		  ...mapState({
			userStore: state => state.userStore
		  })
		},
		data () {
			return {
				notifme: null,
				agent_chat_id: null,
				notifshow: null,
				sender_name: null,
				sender_time: null,
				agent_user_platform: null
			}
		},

		created () {
			this.pusher = new Pusher('78b9533cd7823e5444b6', {
				encrypted: true,
				cluster: 'mt1'
			})
			let that = this
			this.channel = this.pusher.subscribe('chat_channel')
			this.channel.bind('live_end_chat', function (data) {
				that.$emit('ending_chat', data)
			})
			this.$on('ending_chat', function (data) {
				this.endingChat(data)
			})

			const userObj = JSON.parse(window.localStorage.getItem('syaraniSession'))
			this.$store.dispatch('setNewIncomingNotification', userObj)
				.then(response => {
					var objNotif = JSON.parse(JSON.stringify(this.userStore.notification))
					if (objNotif.notifme == 1) {
						this.notifme = objNotif.notifme
						this.agent_chat_id = objNotif.agent_chat_id
						this.notifshow = objNotif.notifshow
						this.sender_name = objNotif.sender_name
						this.sender_time = objNotif.sender_time
						this.agent_user_platform = objNotif.agent_user_platform
					}
				})
			this.showAlert()
		},

		methods: {
			handleLogout () {
				this.$store.dispatch('clearAuthUser')
				window.localStorage.removeItem('syaraniSession');
				this.$router.push({name: 'login'})
			},
			handleNotificationToLiveChat (obj) {
				let postData = {id : obj}
				this.$router.push({name: 'live-chat', params: { chatId: this.agent_user_platform, ticketId: this.agent_chat_id }})
			},
			endingChat (message) {
				if (!message.data.notifme) {	
					const el = document.getElementById('badge-notification')
					el.setAttribute('style', 'display:none !important')
					setTimeout(function(){
						window.location.href = '#/dashboard'
						location.reload(true)
					}, 2000)
					
				}
			},
			showAlert () {
				$.notify({
					icon: "notifications",
					message: "Message API"

				},{
					type: 'warning',
					timer: 5000,
					placement: {
						from: 'bottom',
						align: 'right'
					}
				})
			}
		}
	}
</script>

<template>
	<div class="wrapper" v-if="userStore.authUser !== null && userStore.authUser.access_token">
		<div class="sidebar" data-active-color="rose" data-background-color="white">
			<div class="logo">
				<a class="simple-text" target="_blank">
					SyaRaNi
				</a>
			</div>
			<div class="logo logo-mini">
				<a class="simple-text">
					SRN
				</a>
			</div>
			<div class="sidebar-wrapper">
				<div class="user">
					<div class="photo">
						<img src="../assets/avatar.png">
					</div>
					<div class="info">
						<a data-toggle="collapse" href="#collapseExample" class="collapsed" aria-expanded="false">
							Nama User
							<b class="caret"></b>
						</a>
						<div class="collapse" id="collapseExample" aria-expanded="false" style="height: auto;">
							<ul class="nav">
								<li>
									<router-link :to="{name:'profile'}">My Profile</router-link>
								</li>
								<li>
									<a v-on:click="handleLogout()">Logout</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<ul class="nav">
					<li>
						<router-link :to="{name:'dashboard'}"><i class="material-icons">dashboard</i><p>Dashboard</p></router-link>
					</li>
					<li>
						<router-link :to="{name:'chat'}"><i class="material-icons">chat_bubble</i><p>Web Chat</p></router-link>
					</li>
				</ul>
			</div>
			<div class="sidebar-background"></div>
		</div>
		<div class="main-panel">
			<nav class="navbar navbar-transparent navbar-absolute">
				<div class="container-fluid">
					<div class="navbar-minimize">
						<button id="minimizeSidebar" class="btn btn-round btn-white btn-fill btn-just-icon">
						<i class="material-icons visible-on-sidebar-regular">more_vert</i>
						<i class="material-icons visible-on-sidebar-mini">view_list</i>
						<div class="ripple-container"></div></button>
					</div>
					<div class="navbar-header">
						<button type="button" class="navbar-toggle" data-toggle="collapse">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						</button>
						<a class="navbar-brand" href="#"> #SyaRaNi Web Console</a>
					</div>
					<div v-if="notifme" class="collapse navbar-collapse" id="badge-notification">
						<ul class="nav navbar-nav navbar-right">
							<li class="dropdown">
								<a href="#" class="dropdown-toggle" data-toggle="dropdown">
									<i class="material-icons">notifications</i>
									<span class="notification">{{notifshow}}</span>
									<p class="hidden-lg hidden-md">
										Notifications
										<b class="caret"></b>
									</p>
								</a>
								<ul class="dropdown-menu">
									<li>
										<a v-on:click="handleNotificationToLiveChat(agent_chat_id)">New conversation from 
										<br><b>{{sender_name}}</b></a> <span style="float:right; font-size: 10px; margin-right: 25px; font-weight: 700;">{{sender_time}}</span>
									</li>
								</ul>
							</li>
						</ul>
					</div>
					<div v-else>
					</div>
				</div>
			</nav>
			<div class="content" style="margin-top: 20px !important;" id="app-layout">
				<router-view></router-view>
			</div>
			<footer class="footer">
				<div class="container">
					<p class="copyright pull-right">
						&copy; 2016 R&D IT DEV - <a href="http://www.edi-indonesia.co.id" target="_blank">Electronic Data Interchange Indonesia</a>
					</p>
				</div>
			</footer>
		</div>
	</div>
</template>