import { createWebHistory, createRouter } from 'vue-router'

import Dashboard from './pages/Dashboard.vue'

const routes = [
    { path: '/dashboard', component: Dashboard }
 ] 

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;