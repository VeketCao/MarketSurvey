import '../../css/base'
import App from '../module/App/main'
import router from '../module/Route/main'
import 'iview/dist/styles/iview.css';
import iView from 'iview';
Vue.use(iView);

import '../components/main'//注册组件
window.Bus = new Vue();
new Vue({
    el:'#app',
    router,
    render: h => h(App)
})
