<script>
	import Vue from 'vue'
	import {mapState} from 'vuex'
	import {setEndLiveChat, getHeader} from './../../config'
	import alertify from 'alertify.js'
	export default {
		data () {
			return {
				UserChatId: null,
				FullName: null,
				Platform: null,
				Since: null,
				CurrentTime: null
			}
		},
		computed: {
			...mapState({
				privateStore: state => state.privateStore,
				userStore: state => state.userStore
			})
		},
		created () {
			this.UserChatId = this.$route.params.chatId
			let postData = {
						'id': this.$route.params.ticketId,
						'agent_user_platform': this.$route.params.chatId
					}
			this.$store.dispatch('setAttributeLiveChat', postData)
				.then(response => {
					this.FullName = this.privateStore.liveAttribute.agent_user_platform_name
					this.Platform = this.privateStore.liveAttribute.reff_desc
					this.Since = this.privateStore.liveAttribute.agent_chat_start
				})
			const m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
			const d = new Date();
			const curr_date = d.getDate();
			const curr_month = d.getMonth();
			const curr_year = d.getFullYear();
			this.CurrentTime = curr_date + " " + m_names[curr_month] + " " + curr_year
		},
		methods: {
			isYours (live) {
				if (live.sender_id == this.UserChatId) {
					return true
				} 
			},
			handleEndChat () {
				const userObj = JSON.parse(window.localStorage.getItem('syaraniSession'))
				let postData = {
					'id': this.$route.params.ticketId,
					'agent_user_platform': this.$route.params.chatId,
					'user_email': userObj.email
				}
				alertify.okBtn("Ok").cancelBtn("Cancel").confirm("Are you sure want to stop chat ?", function (ev){
					Vue.http.post(setEndLiveChat, postData, {headers: getHeader()})
					.then(response => {
						if (response.status === 200) {
							window.location.href = '#/dashboard'
						}
					})
				},
				function(ev){
					ev.preventDefault();
					return false;
				})
			}
		}
	}
</script>
<template>
<div>
	<div class="top">
		<div>
			<span class="name">{{FullName}} ({{Platform}})</span>
			<span>
				<ul class="navbar-right" style="list-style: none;">
					<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
						<i class="material-icons">more_vert</i></a>
						<ul class="dropdown-menu">
							<li>
								<a v-on:click="handleEndChat()" style="cursor: hand;">End Chat</a>
							</li>
						</ul>
					</li>
				</ul>
			</span>
		</div>
		<div>
			<p style="font-size: 12px;">Start at : {{Since}}</p>
		</div>
	</div>
	<div class="chats" style="padding-top: 15px !important;" id="live-chat-wrapper-widget">
		<div v-for="live in privateStore.liveChatUser" :key="live.formated">
			<div 
			class="bubble you"
			:class="[{me: isYours(live)}]">
			{{live.chat}}
			<br>
			<span style="float:right; margin-right: 5px; font-size: 12px; margin-top: 5px;">{{live.created_at}}</span>
			</div>
		</div>
	</div>
</div>
</template>