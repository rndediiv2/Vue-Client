<script>
	import {mapState} from 'vuex'
	import Pusher from 'pusher-js'
	export default {
		created () {
			this.pusher = new Pusher('78b9533cd7823e5444b6', {
				encrypted: true,
				cluster: 'mt1'
			})
			let that = this
			this.channel = this.pusher.subscribe('chat_channel')
			this.channel.bind('chat_saved', function (data) {
				that.$emit('incoming_chat', data)
			})
			this.$on('incoming_chat', function (chatMessage) {
				this.incomingChat(chatMessage)
			})
		},
		computed: {
			...mapState({
				chatStore: state => state.chatStore,
				userStore: state => state.userStore
			})	
		},
		data () {
			return {
				message: null,
				pusher: null,
				channel: null
			}
		},
		methods: {
			handleAddChat () {
				if( this.message !== null) {
					let postData = {
						'receiver_id': this.chatStore.currentChatUser.id,
						'chat': this.message
					}

					this.$store.dispatch('addNewChatToConversation', postData)
						.then(response => {
							this.message = null
							let element = document.getElementById('chat-wrapper-widget')
							element.scrollIntoView(false);
						})
				}
			},
			incomingChat (chatMessage) {
				//console.log('Incoming Message', chatMessage)
				if (this.chatStore.currentChatUser.id === chatMessage.message.sender_id) {
					if (chatMessage.message.receiver.email === this.userStore.authUser.email) {
						this.$store.dispatch('newIncomingChat', chatMessage.message)
							.then(res => {
								let element = document.getElementById('chat-wrapper-widget')
								element.scrollIntoView(false);	
							})
					} else {
						console.log('Message for some other user by the selected user')
					}
				}
			}
		}
		
	}	
</script>

<template>
	<div id="chatt-add-widget" class="chat-message clearfix">
		<form v-on:submit.prevent="handleAddChat()">
			<div class="input-group">
				<div class="form-group label-floating is-empty">
					<textarea name="messages" class="form-control" placeholder="Enter your message" v-model="message"></textarea>
				</div>
				<span class="input-group-addon"><i class="material-icons" v-on:click="handleAddChat()" style="cursor: hand; cursor: pointer;">send</i></span>
			</div>
		</form>
	</div>
</template>