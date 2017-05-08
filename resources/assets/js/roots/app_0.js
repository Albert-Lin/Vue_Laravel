/**
 * Created by Albert Lin on 2017/5/2.
 */

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('../bootstrap');

window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// require('../components/SuperComponent.js');

// Vue.component('example', require('./components/Example.vue'));

	
	import {Component0} from '../components/Component_0.vue';
	
	console.log(Component0);
	
const app = new Vue({
	el: '#app',
	components:{
		component_0: require('../components/Component_0.vue')
	}
});