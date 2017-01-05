<script>
  import {mapState} from 'vuex'
  /*import TopMenu from './components/TopMenu'*/
  export default {
    /*components: {
        TopMenu
    },*/
    computed: {
      ...mapState({
        userStore: state => state.userStore
      })
    },
    created () {
        const userObj = JSON.parse(window.localStorage.getItem('syaraniSession'))
        this.$store.dispatch('setUserObject', userObj)
    }
  }
</script>

<template>
    <div>
        <router-view></router-view>
        <div id="contentapps"></div>
    </div>
</template>
