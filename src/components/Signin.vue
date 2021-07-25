<template>
<section style="padding-bottom:60px;padding-left:60px;">
<div class="container">
<div class="row no-gutters">
<div class="col-lg-5">
<img src="https://i.pinimg.com/originals/d4/f3/90/d4f390d31b17e3ad216ea54aac337569.png" class="img-fluid" alt="library-image">
</div>
<div class="col-lg-7 px-5 pt-5">
<h1 class="signin-text">Sign in</h1>
<h4 class="signin-subtext">Library Management System</h4>
<form @submit.prevent="signin">
<div class="text-red" v-if="error">{{ error }}</div>
<div class="form-row">
<div class="col-lg-7">
<input type="email" v-model="email" id="email" placeholder="email@address.com" class="form-control my-3 p-4">
</div>
</div>
<div class="form-row">
<div class="col-lg-7">
<input type="password" placeholder="Password" v-model="password" id="password" class="form-control my-3 p-4">
</div>
</div>
<div class="form-row">
<div class="col-lg-7">
<button type="submit" class="btn1 mt-3 mb-5">Sign In</button></div>
</div>
<div class="signin-links">Don't have an account? <router-link to="/signup" class="link-grey">Sign up</router-link></div>
</form>
</div>
</div>
</div>
</section>
</template>

<script>
export default {
  name: 'Signin',
  data () {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  created () {
    this.checkSignedIn()
  },
  updated () {
    this.checkSignedIn()
  },
  methods: {
    signin () {
      this.$http.plain.post('/signin', { email: this.email, password: this.password })
        .then(response => this.signinSuccessful(response))
        .catch(error => this.signinFailed(error))
    },
    signinSuccessful (response) {
      if (!response.data.csrf) {
        this.signinFailed(response)
      }
      localStorage.csrf = response.data.csrf
      localStorage.signedIn = true
      this.error = ''
      this.$router.replace('/books')
      window.location.reload()
      return false
    },
    signinFailed (error) {
      this.error = (error.response && error.response.data && error.response.data.error) || ''
      delete localStorage.csrf
      delete localStorage.signedIn
    },
    checkSignedIn () {
      if (localStorage.signedIn) {
        this.$router.replace('/books')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
padding: 0;
margin: 0;
box-sizing: border-box;
}
body{
background: rgb(56, 45, 45);
}
.row{
background: white;
border-radius: 30px;
}
img{
border-top-left-radius: 30px;
border-bottom-left-radius: 30px;
}
.btn1{
border: none;
outline: none;
height: 50px;
width: 100%;
background-color: black;
color: white;
border-radius: 4px;
font-weight: bold;
}
.btn1:hover{
background: white;
border: 1px solid;
color: black;
}
.signin-text {
font-weight: bold;
text-align: left;
padding-bottom: 1rem;
}
.signin-subtext {
text-align: left;
}
.signin-links {
text-align: left;
}
.img-fluid {
height: 100vh;
}
.sigin_body {
background: rgb(56, 45, 45);
}
</style>
