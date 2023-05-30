import Vue from 'vue';
import App from './App.vue';
import {Form} from 'vant';
import {Field} from 'vant';
import {Popup} from 'vant';
import {RadioGroup, Radio} from 'vant';
import {Cell, CellGroup} from 'vant';
import {Button} from 'vant';
import {Dialog} from 'vant';
import {Toast} from 'vant';

Vue.use(Toast);
Vue.use(Dialog);
Vue.use(Button);
Vue.use(Form);
Vue.use(Field);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Popup);
Vue.use(Form);
Vue.use(Field);
Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
}).$mount('#app');
