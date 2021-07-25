<template>
  <div style="padding:0 3rem;">
    <nav class="navbar navbar-expand-md navbar-dark">
      <a href="#" class="navbar-brand">Library Management System</a>
      <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#toggleMobileMenu"
      aria-controls="toggleMobileMenu"
      aria-expanded="false"
      aria-label="Toggle Navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="toggleMobileMenu">
        <ul class="navbar-nav ms-auto text-center">
          <li>
            <router-link to="/" class="nav-link" v-if="!signedIn()">Sign in</router-link>
          </li>
          <li>
            <router-link to="/signup" class="nav-link" v-if="!signedIn()">Sign Up</router-link>
          </li>
          <li>
            <router-link to="/books" class="nav-link" v-if="signedIn()">Books</router-link>
          </li>
          <li>
            <router-link to="/borrow" class="nav-link" v-if="signedIn()">Borrow Books</router-link>
          </li>
          <li>
            <router-link to="/students" class="nav-link" v-if="signedIn()">Manage Students</router-link>
          </li>
          <li>
            <a href="#" @click.prevent="signOut" class="nav-link" v-if="signedIn()">Sign out</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Header',
  created () {
    this.signedIn()
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    signedIn () {
      return localStorage.signedIn
    },
    signOut () {
      this.$http.secured.delete('/signin')
        .then(response => {
          delete localStorage.csrf
          delete localStorage.signedIn
          this.$router.replace('/')
          window.location.reload()
          return false
        })
        .catch(error => this.setError(error, 'Cannot sign out'))
    }
  }
}
</script>
