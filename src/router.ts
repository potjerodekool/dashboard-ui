import { createWebHistory, createRouter } from 'vue-router'

import Dashboard from './pages/Dashboard.vue'
import Config from './pages/Config.vue'

const routes = [
    { path: '/dashboard', component: Dashboard },
    { path: '/dashboard/config', component: Config}
 ] 

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;