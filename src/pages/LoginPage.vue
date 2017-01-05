<script>
  import {loginUrl, userUrl, getHeader} from './../config'
  import {clientId, clientSecret} from './../env'
  import {mapState} from 'vuex'

  import alertify from 'alertify.js'

  export default {
    computed: {
      ...mapState({
        userStore: state => state.userStore
      })
    },
    data () {
      return {
        login: {
          email: '',
          password: ''
        }
      }
    },
    created () {
        var $page = $('.full-page');
        var image_src = $page.data('image');
        if(image_src !== undefined){
            var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/></div>'
            $page.append(image_container);
        }
        setTimeout(function() {
            $('.card').removeClass('card-hidden');
        }, 700)
    },
    methods: {
        handleLoginFormSubmit () {
            const postData = {
                grant_type: 'password',
                client_id: clientId,
                client_secret: clientSecret,
                username: this.login.email,
                password: this.login.password,
                scope: ''
            }

            const authUser = {}
            this.$http.post(loginUrl, postData)
                .then(response => {
                    if (response.status === 200) {
                        authUser.access_token = response.data.access_token
                        authUser.refresh_token = response.data.refresh_token
                        window.localStorage.setItem('syaraniSession', JSON.stringify(authUser))
                        this.$http.get(userUrl, {headers: getHeader()})
                            .then(response => {
                                authUser.email = response.body.email
                                authUser.name = response.body.name
                                window.localStorage.setItem('syaraniSession', JSON.stringify(authUser))
                                this.$store.dispatch('setUserObject', authUser)
                                this.$router.push({
                                    name: 'dashboard'
                                })
                            })
                    }
                })
                .catch(function (responseError) {
                    alertify.error(responseError.body.message)
                })
        }
    }
  }
</script>

<template>
  <div class="wrapper wrapper-full-page">
        <div class="full-page login-page syarani-background" filter-color="red">
            <div class="content" style="padding-top: 8vh !important;">
                <div class="container">
                    <div class="row">
                        <div class="col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3">
                            <form v-on:submit.prevent="handleLoginFormSubmit()">
                                <div class="card card-login card-hidden">
                                    <div class="card-header text-center" data-background-color="rose">
                                        <h4 class="card-title">SyaRaNi Web Console</h4>
                                    </div>
                                    <div class="card-content">
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="material-icons">email</i>
                                            </span>
                                            <div class="form-group label-floating">
                                                <label class="control-label">Email address</label>
                                                <input type="email" class="form-control" name="email" required autofocus v-model="login.email">
                                            </div>
                                        </div>
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="material-icons">lock_outline</i>
                                            </span>
                                            <div class="form-group label-floating">
                                                <label class="control-label">Password</label>
                                                <input type="password" class="form-control" name="password" required v-model="login.password">
                                            </div>
                                        </div>
                                        <div class="input-group">
                                            <div class="form-group label-floating">
                                                <div class="checkbox">
                                                    <label>
                                                        <input type="checkbox" name="remember">Remember Me
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="footer text-center">
                                        <button type="submit" class="btn btn-rose btn-wd btn-md">Log In</button>
                                        <p style="color: #ACACAC !important; padding: 10px;">Dont you remember your Password ?</p>
                                        <p><hr style="color: #ACACAC;"></p>
                                        <p style="color: #ACACAC !important; padding: 10px;">Dont you have an account ? <a href="#"> <b>Sign Up</b> </a></p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <footer class="footer" style="padding: 0px !important;">
                <div class="container">
                    <p class="copyright text-center">
                        &copy; 2016 <a href="http://www.edi-indonesia.co.id" target="_blank">Electronic Data Interchange Indonesia</a>
                    </p>
                </div>
            </footer>
        </div>
    </div>
</template>
