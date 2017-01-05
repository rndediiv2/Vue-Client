<script>
	import {mapState} from 'vuex'
	export default {
		computed: {
		  ...mapState({
			userStore: state => state.userStore
		  })
		},
		methods: {
			handleLogout() {
				this.$store.dispatch('clearAuthUser')
				window.localStorage.removeItem('syaraniSession');
				this.$router.push({name: 'home'})
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
									<a href="#">My Profile</a>
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
						<a data-toggle="collapse" href="#pagesExamples" aria-expanded="false" class="collapsed">
							<i class="material-icons">featured_play_list</i>
							<p>Admin Console<b class="caret"></b></p>
						</a>
						<div class="collapse" id="pagesExamples" aria-expanded="false" style="height: auto;">
							<ul class="nav">
								<li>
									<a href="#">Syarani Knowledge</a>
								</li>
								<li>
									<a href="#">Trending Dashboard</a>
								</li>
								<li>
									<a href="#">Message Broadcasting</a>
								</li>
								<li>
									<a href="#">User Management</a>
								</li>
							</ul>
						</div>
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
					<div class="collapse navbar-collapse">
						<ul class="nav navbar-nav navbar-right">
							<li class="dropdown">
								<a href="#" class="dropdown-toggle" data-toggle="dropdown">
									<i class="material-icons">notifications</i>
									<span class="notification">5</span>
									<p class="hidden-lg hidden-md">
										Notifications
										<b class="caret"></b>
									</p>
								</a>
								<ul class="dropdown-menu">
									<li>
										<a href="#">Mike John responded to your email</a>
									</li>
									<li>
										<a href="#">You have 5 new tasks</a>
									</li>
									<li>
										<a href="#">You're now friend with Andrew</a>
									</li>
									<li>
										<a href="#">Another Notification</a>
									</li>
									<li>
										<a href="#">Another One</a>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
			</nav>
			<div class="content" style="margin-top: 20px !important;" id="app-layout">
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