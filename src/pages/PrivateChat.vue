<script>
	export default {
	}
</script>

<template id="ChatTemplate">
	<div class="container-fluid">
		<div class="header text-center">
			<h3 class="title">Privat Chat #SyaRaNi</h3>
		</div>

		<div class="row">
		  <div class="col-md-4 left">
			<div class="top">
				<p style="font-weight: bold; font-size: 16px;">User Chat</p>
			</div>
			<ul class="people" style="padding-left: 0px !important; padding-right: 0px !important;">
				<li class="person">
					<img src="http://s13.postimg.org/ih41k9tqr/img1.jpg" alt="" />
					<span class="name">Thomas Bangalter</span>
				</li>
			</ul>
		  </div>
		  <div id="chat-wrapper-widget" class="col-md-8 right" style="padding-left: 0px !important; padding-right: 0px !important;">
		  <div class="top"><span>To: <span class="name">Dog Woofson</span></span></div>
			<div class="chats" style="padding-top: 15px !important; ">
				<div class="bubble you">
					Hello, can you hear me?
				</div>
				<div class="bubble you">
					I'm in California dreaming
				</div>
				<div class="bubble me">
					... about who we used to be.
				</div>
				<div class="bubble me">
					Are you serious?
				</div>
				<div class="bubble you">
					When we were younger and free...
				</div>
				<div class="bubble you">
					I've forgotten how it felt before
				</div>
			</div>
			<div id="chatt-add-widget" class="chat-message clearfix" style="padding:10px;">
				<form>
					<div class="input-group">
						<div class="form-group label-floating is-empty">
							<input type="text" name="messages" class="form-control" placeholder="Enter your message">
						</div>
						<span class="input-group-addon"><i class="material-icons" style="cursor: hand; cursor: pointer;">send</i></span>
					</div>
				</form>
			</div>
		  </div>
	  </div>
	</div>
</template>