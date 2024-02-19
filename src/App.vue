<template>
  <div>
    <!-- Conditionally render the navbar based on the current route -->
    <NavBar v-if="showNavBar" />
    <div id="app">
      <!-- Insertion point for views based on the current route -->
      <router-view/>
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  // Registering Navbar component
  components: {
    NavBar,
  },
  // Name of the root component
  name: 'App',
  data() {
    return {
      showNavBar: true, // Initial value to show navbar
    };
  },
  created() {
    // Listen to route changes and update showNavBar accordingly
    this.$router.beforeEach((to, from, next) => {
      // Define an array of routes where the navbar should be hidden
      const routesWithoutNavBar = ['/login', '/register']; // routes that dont need navbar with logout

      // Check if the current route is in the array of routes without navbar
      this.showNavBar = !routesWithoutNavBar.includes(to.path);
      next();
    });
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
