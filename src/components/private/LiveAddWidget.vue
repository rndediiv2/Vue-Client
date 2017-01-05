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
			this.channel.bind('live_chat_platform', function (data) {
				that.$emit('incoming_live_chat', data)
			})
			this.$on('incoming_live_chat', function (chatMessage) {
				this.incomingLiveChat(chatMessage)
			})
		},
		computed: {
			...mapState({
				privateStore: state => state.privateStore,
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
			handleLiveAddChat () {
				if( this.message !== null) {
					let postData = {
						'receiver_id': this.$route.params.chatId,
						'chat': this.message,
						'agent_chat_id': this.$route.params.ticketId
					}

					this.$store.dispatch('addLiveChatToConversation', postData)
						.then(response => {
							this.message = null
							let element = document.getElementById('live-chat-wrapper-widget')
							element.scrollIntoView(false)
							return false
						})
				}
			},
			incomingLiveChat (chatMessage) {
				if (chatMessage.message.sender_id == this.$route.params.chatId) {
					this.$store.dispatch('newIncomingLiveChat', chatMessage.message)
						.then(res => {
							let element = document.getElementById('live-chat-wrapper-widget')
							element.scrollIntoView(false)
						})
				} else {
					console.log('Message for some other user')
				}
			}
		}
	}
</script>

<template>
	<div>
		<div id="chatt-add-widget" class="chat-message clearfix" style="padding:20px;">
			<form>
				<div class="input-group">
					<div class="form-group label-floating is-empty">
						<textarea name="messages" class="form-control" placeholder="Enter your message" v-model="message"></textarea>
					</div>
					<span class="input-group-addon"><i class="material-icons" v-on:click="handleLiveAddChat()" style="cursor: hand; cursor: pointer;">send</i></span>
				</div>
			</form>
		</div>
	</div>
</template>