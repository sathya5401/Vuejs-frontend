<template>
    <!-- Navbar with Register button -->
    <nav class="navbar navbar-dark bg-dark navbar-expand-lg fixed-top">
        <div class="container">
        <!-- <span class="navbar-brand">Welcome, {{ currentUser.name }}</span> -->
        <a href="/register" class="btn btn-outline-light"> Register </a>
        </div>
    </nav>
    <!-- Form for login -->
    <div class="form-container">
        <form @submit.prevent="login" class="login-form">
        <!-- Email and password inputs -->
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <!-- Submit button -->
        <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
import axios from '@/axios';

export default {
    name: 'Login',
    data() {
        return {
        //Login Data
        email: '',
        password: '',
        // Error messages stores in errors
        errors : [] , 
        };
    },
    methods: {
        login() {
        // Send user data to submit form and login
        axios.post('http://localhost:8000/api/login', {
            email: this.email,
            password: this.password
        })
        .then(response => {
            console.log('User login successfully:', response.data);
            // Store token & status(isadmin) in local storage
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('status', response.data.user.is_admin);
                
                //check if the user is admin or not
                if (response.data.user.is_admin == '1') {
                // Redirect to /listing page if the user is admin
                    this.$router.push('/listing');
                    console.log("Admin succesfully login");
                }
                else if (response.data.user.is_admin == '0') {
                    // Redirect to /shape page if the user is normal user
                    this.$router.push('/shape');
                    console.log("Normal User sucessfully login");
                }
                //display the token and status
                console.log(localStorage.getItem('token'));
                console.log(localStorage.getItem('status'));
            }
        })
        .catch(error => {
            console.error('Error login:', error);
        });
        },
    }
};
</script>

<style scoped>
.form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top : 8%;

}

.login-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 300px;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.login-form input,
.login-form button {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
}

.login-form button {
    background-color: #007BFF;
    color: white;
}
</style>
