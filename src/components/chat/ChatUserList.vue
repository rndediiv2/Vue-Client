<script>
	import {mapState} from 'vuex'
	export default {
		computed: {
			...mapState({
				chatStore: state => state.chatStore,
				userStore: state => state.userStore
			})
		},
		methods: {
			userActiveStyle (user) {
				if (this.chatStore.currentChatUser === null) {
					return false
				}
				if (this.chatStore.currentChatUser.id === user.id) {
					return true
				}
				return false
			},
			changeChatUser (user) {
				if (this.chatStore.currentChatUser === null || this.chatStore.currentChatUser.id !== user.id) {
				  this.$store.dispatch('setCurrentChatUser', user)
					.then(response => {
					  let element = document.getElementById('chat-wrapper-widget')
					  element.scrollIntoView(false)
					})
				}
			}
		}
	}
</script>

<template>
	<div class="people-list" id="people-list">
	  <ul class="list list-group">
		<li 
			class="clearfix"
			:class="[{activeChat: userActiveStyle(user)}]" 
			v-on:click="changeChatUser(user)"
			v-if="user.name !== userStore.authUser.name"
			v-for="user in chatStore.userList">
			<!--<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" style="padding: 20px;" />!-->
			  <div class="about">
				<div class="name">{{user.name}}</div>
				<div class="status">
				  <i class="fa fa-circle online"></i> online
				</div>
			  </div>
		</li>
	  </ul>
	</div>
</template>