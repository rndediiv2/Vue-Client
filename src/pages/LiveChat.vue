<script>
	import {mapState} from 'vuex'
	import LiveWidget from './../components/private/LiveWidget'
	import LiveAddWidget from './../components/private/LiveAddWidget'
	export default {
		components: {
			'live-chat-block': LiveWidget,
			'live-add-widget': LiveAddWidget
		},
		computed: {
			...mapState({
				privateStore: state => state.privateStore
			})
		},
		created () {
			const userObj = JSON.parse(window.localStorage.getItem('syaraniSession'))
			let posData = {
				'email': userObj.email,
				'id': this.$route.params.ticketId
			}
			this.$store.dispatch('setLiveChat', posData)
		}
	}
</script>

<template>
	<div class="container-fluid">
		<div class="header text-center">
			<h3 class="title">Private Chat</h3>
		</div>
		<div class="row">
			<div class="col-md-12 right" style="width:100% !important">
				<live-chat-block></live-chat-block>
				<live-add-widget></live-add-widget>
			</div>
		</div>
	</div>
</template>