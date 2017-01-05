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
			isYourConversation (chat) {
				if (this.chatStore.yourMessage === null) {
					return false
				}
				if (this.chatStore.yourMessage.name === chat.sender.name) {
					return true
				}
				return false
			}
		}
	}
</script>

<template>
<div>
	<div class="chat-header clearfix">
		<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar" />
		<div class="chat-about">
			<div class="chat-with">Chat with ...  </div>
		</div>
	</div>
	<div id="chat-wrapper-widget" class="chat-history">
		<ul>
			<li class="clearfix" 
				:class="[{kanan: isYourConversation(chat)}]"
				v-for="chat in chatStore.conversation">
				<div 
					class="message-data"
					:class="[{kanan: isYourConversation(chat)}]"
					>
					<span class="message-data-name" >{{chat.sender.name}}</span> <i class="fa fa-circle online"></i> <span class="message-data-time" >{{chat.created_at}}</span>
				</div>
				<div 
					class="message my-message"
					:class="[{others: isYourConversation(chat)}]"
					>
					{{chat.chat}}
				</div>
			</li>
			
		</ul>
	</div>
</div
</template>