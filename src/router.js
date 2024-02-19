import { createRouter, createWebHistory } from 'vue-router';


import ShapeDetails from './components/ShapeDetails.vue';
import ShapeListing from './components/ShapeListing.vue';
import Login from './components/LoginPage.vue';
import Register from './components/RegisterPage.vue';

import HelloWorld from './components/HelloWorld.vue'



const routes = [
{
path: '/shape',
name: 'ShapeDetails',
component: ShapeDetails ,
meta: { public: false } // Mark this route as private
},
{
path: '/listing',
name: 'ShapeListing',
component: ShapeListing ,
meta: { public: false } // Mark this route as private
},
{
path: '/login', // Add this route
name: 'Login',
component: Login,
meta: { public: true } // Mark this route as public
},
{
path: '/register', // Add this route
name: 'Register',
component: Register,
meta: { public: true } // Mark this route as public
}
    
];


const router = createRouter({
history: createWebHistory(),
routes,
});



router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('token');
    const isAdmin = localStorage.getItem('status') === '1'; // Check if the user is an admin

    if (!to.meta.public && !isAuthenticated) {
        // If the route is not public and the user is not authenticated, redirect to login
        next({ name: 'Login' });
    } else if ((to.name === 'Login' || to.name === 'Register') && isAuthenticated) {
        // If the user is authenticated and tries to access the Login or Register page, redirect based on role
        if (isAdmin) {
            next({ name: 'ShapeDetails' }); // Redirect admin to ShapeDetails
        } else {
            next({ name: 'ShapeListing' }); // Redirect normal user to ShapeListing
        }
    } else if ( to.name === 'ShapeDetails' && !isAdmin) {
        next({ name: 'ShapeListing' }); // Redirect normal user to ShapeListing

    } else if ( to.name === 'ShapeListing' && isAdmin )  {
        next({ name: 'ShapeDetails' }); // Redirect admin to ShapeDetails

    } else {
        // Otherwise, allow navigation
        next();
    }
});

  


export default router;