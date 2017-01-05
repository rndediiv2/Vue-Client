<script>
	import {mapState} from 'vuex'
	import ChatUserList from './../components/chat/ChatUserList'
	import ChatWidget from './../components/chat/ChatWidget'
	import ChatAddWidget from './../components/chat/ChatAddWidget'

	export default {
		components: {
			'user-list': ChatUserList,
			'chat-block': ChatWidget,
			'add-chat': ChatAddWidget
		},
		computed: {
			...mapState({
				chatStore: state => state.chatStore
			})
		},
		created () {
			this.$store.dispatch('setUserList')
		}
	}
</script>

<template id="ChatTemplate">
	<div class="container-fluid">
		<div class="header text-center">
			<h3 class="title">Privat Chat #SyaRaNi</h3>
		</div>
		<div class="row">
		  <div class="col-md-4" style="padding-left: 0px !important; padding-right: 0px !important;">
			<user-list></user-list>
		  </div>
		  <div id="chat-wrapper-widget" class="col-md-8" style="padding-left: 0px !important; padding-right: 0px !important;">
			<div class="chat">
				<chat-block></chat-block>
				<add-chat></add-chat>
			</div>
		  </div>
	  </div>
	</div>
</template>