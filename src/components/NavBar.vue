<template>
 <!-- Navbar with logout button-->
 <nav class="navbar navbar-dark bg-dark navbar-expand-lg fixed-top">
    <div class="container">
      <button @click="logout" class="btn btn-outline-light">Logout</button> 
    </div>
</nav>
</template>


<script>


export default {
methods: {
    logout(){
    // Remove the token from local storage
      localStorage.removeItem('token');
      // Redirect to the login page
      this.$router.push('/login');
    }
}
}
</script>