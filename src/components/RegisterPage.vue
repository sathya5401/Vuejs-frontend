<template>
<!-- Navbar with Login button -->
    <nav class="navbar navbar-dark bg-dark navbar-expand-lg fixed-top">
        <div class="container">
        <!-- <span class="navbar-brand">Welcome, {{ currentUser.name }}</span> -->
        <a href="/login" class="btn btn-outline-light"> Login </a>
        </div>
    </nav>
    <!-- Form for registration -->
    <div class="form-container">
        <form @submit.prevent="register" class="register-form">
            <!-- Name, email, password & is_Admin inputs -->
            <input type="text" v-model="User.name" placeholder="Name" required />
            <!-- Display name error message -->
            <p v-if="errors.name" class="error">{{ errors.name }}</p>

            <input type="email" v-model="User.email" placeholder="Email" required />
            <!-- Display email error message -->
            <p v-if="errors.email" class="error">{{ errors.email }}</p>

            <input type="password" v-model="User.password" placeholder="Password" required />
            <!-- Display password error message -->
            <p v-if="errors.password" class="error">{{ errors.password }}</p>

            <select v-model="User.is_admin" required>
                <option value="" disabled selected>Select user type</option>
                <option value="1">Admin</option>
                <option value="0">Normal User</option>
            </select>
            <!-- Display is_admin error message -->
            <p v-if="errors.is_admin" class="error">{{ errors.is_admin }}</p>

            <!-- Submit button -->
            <button type="submit">Register</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Register',
  data() {
    return {
      User: {
        // Data model for the form inputs
        name: '',
        email: '',
        password: '',
        is_admin: '',
      },
      // Error messages array to store
      errors: {},
    };
  },
  methods: {
    register() {
      
      this.errors = {};

      // Validate form
      if (!this.User.name) {
        this.errors.name = 'Name is required';
      }
      if (!this.User.email) {
        this.errors.email = 'Email is required';
      }
      if (!this.User.password) {
        this.errors.password = 'Password is required';
      }
      if (!this.User.is_admin) {
        this.errors.is_admin = 'User type is required';
      }

      // Check if there are any errors
      if (Object.keys(this.errors).length === 0) {
        // If no errors, proceed to register user
        axios.post('http://localhost:8000/api/register', this.User)
          .then(response => {
            console.log('User registered successfully:', response.data);
            // navigate to login page once registered
            this.$router.push('/login');        
          })
          .catch(error => {
            console.error('Error registering user:', error);
          });
      }
    }
  }
};
</script>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 8%;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 300px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.register-form input,
.register-form select,
.register-form button {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
}

.register-form button {
  background-color: #007BFF;
  color: white;
  cursor: pointer;
}

.error {
  color: red;
}
</style>
