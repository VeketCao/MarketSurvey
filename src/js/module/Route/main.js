/**
 * Created by Veket on 2019/9/10.
 */
import VueRouter from 'vue-router';

import Designer from '../Designer/main'
import Login from '../Login/main';
import Preview from '../Preview/main'

Vue.use(VueRouter);

const routesMap = [
    {
        path: '/',redirect:'/d',
    },
    {
        path:'/login',
        name:'login',
        component:Login,
    },
    {
        path:'/d',
        name:'designer',
        component:Designer,
    },
    {
        path:'/p',
        name:'preview',
        component:Preview,
    }

];

const router = new VueRouter({
    mode: 'hash',
    base: __dirname,
    routes: routesMap
});

export default router