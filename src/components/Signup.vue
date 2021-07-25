<template>
<section style="padding-bottom:60px;padding-left:60px;">
<div class="container">
<div class="row no-gutters">
<div class="col-lg-5">
<img src="https://i.pinimg.com/originals/d4/f3/90/d4f390d31b17e3ad216ea54aac337569.png" class="img-fluid" alt="library-image">
</div>
<div class="col-lg-7 px-5 pt-5">
<h1 class="signup-text">Sign up</h1>
<h4 class="signup-subtext">Library Management System</h4>
<form @submit.prevent="signup">
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
<input type="password" placeholder="Confirm Password" v-model="password_confirmation" id="password_confirmation" class="form-control my-3 p-4">
</div>
</div>
<div class="form-row">
<div class="col-lg-7">
<button type="submit" class="btn1 mt-3 mb-5">Sign up</button></div>
</div>
<div class="signup-links">Already have an account? <router-link to="/" class="link-grey">Sign in</router-link></div>
</form>
</div>
</div>
</div>
</section>
</template>

<script>
export default {
  name: 'Signup',
  data () {
    return {
      email: '',
      password: '',
      password_confirmation: '',
      error: ''
    }
  },
  created () {
    this.checkedSignedIn()
  },
  updated () {
    this.checkedSignedIn()
  },
  methods: {
    signup () {
      this.$http.plain.post('/signup', { email: this.email, password: this.password, password_confirmation: this.password_confirmation })
        .then(response => this.signupSuccessful(response))
        .catch(error => this.signupFailed(error))
    },
    signupSuccessful (response) {
      if (!response.data.csrf) {
        this.signupFailed(response)
        return
      }

      localStorage.csrf = response.data.csrf
      localStorage.signedIn = true
      this.error = ''
      this.$router.replace('/books')
      window.location.reload()
      return false
    },
    signupFailed (error) {
      this.error = (error.response && error.response.data && error.response.data.error) || 'Something went wrong'
      delete localStorage.csrf
      delete localStorage.signedIn
    },
    checkedSignedIn () {
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
color:white;
border-radius: 4px;
font-weight: bold;
}
.btn1:hover{
background: white;
border: 1px solid;
color: black;
}
.signup-text{
font-weight: bold;
text-align: left;
padding-bottom: 1rem;
}
.signup-subtext {
text-align: left;
}
.signup-links {
text-align: left;
}
.img-fluid {
height: 100vh;
}
.sigin_body {
background: rgb(56, 45, 45);
}
</style>
