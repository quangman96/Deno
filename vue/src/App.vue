<template>
  <div id="app">
    <div class="p-4 text-white bg-blue-800">
      <router-link v-if="loggedIn" class="mr-4" to="/">Home</router-link>
      <router-link v-else class="mr-4" to="/login">Login</router-link>
      <a v-if="loggedIn" href="" @click="logout">Logout</a>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  data(){
    return {
      loggedIn : window.loggedIn
    }
  },
  methods:{
    logout(){
      window.loggedIn = false
      window.location = '/'
      this.$cookies.remove('token')
    }
  }
}
</script>
<style></style>
