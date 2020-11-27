import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import "materialize-css/dist/js/materialize.min.js"
import "./registerServiceWorker"
import tooltipDirective from '@/directives/tooltip.directive'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import message  from '@/utils/message.plugin'
import Preloader from '@/components/Preloader'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(message);
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Preloader', Preloader)

firebase.initializeApp({
	apiKey: "AIzaSyAvhMDK-PLZOu69plB1nCFlfg2xqTrG6Rc",
	authDomain: "vladilen-test.firebaseapp.com",
	databaseURL: "https://vladilen-test.firebaseio.com",
	projectId: "vladilen-test",
	storageBucket: "vladilen-test.appspot.com",
	messagingSenderId: "456797517745",
	appId: "1:456797517745:web:de6e5efc7ea71575adef90",
	measurementId: "G-Z84602BYW7"
});

let app;

firebase.auth().onAuthStateChanged(() => {
	if (!app) {
		app = new Vue({
			router,
			store,
			render: h => h(App)
		}).$mount('#app')
	}
})



