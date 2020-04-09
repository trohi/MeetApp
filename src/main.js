import Vue from 'vue'
import App from './App.vue'
import * as firebase from 'firebase'
import router from './router'
import vuetify from './plugins/vuetify';
import { store } from './store/index.js'
import dateFilter from './filter/date.js'
import AlertComponent from './components/shared/Alert.vue'
import EditMeetup from './components/Meetup/Edit/EditMeetup.vue'
import EditMeetupDate from './components/Meetup/Edit/EditMeetupDate.vue'
import EditMeetupTime from './components/Meetup/Edit/EditMeetupTime.vue'
import RegisterDialog from './components/Meetup/RegisterMeetup/RegisterDialog.vue'

Vue.config.productionTip = false

Vue.filter('date', dateFilter)
Vue.component('app-alert', AlertComponent)
Vue.component('meetup-edit', EditMeetup)
Vue.component('meetup-edit-date', EditMeetupDate)
Vue.component('meetup-edit-time', EditMeetupTime)
Vue.component('register-dialog', RegisterDialog)


new Vue({
  router,
  vuetify,
  store,
  render: h => h(App),
  created(){
    firebase.initializeApp({
    apiKey: "AIzaSyAzeHM3P_YDhxHsb25iaBlR7GA3ESemRvo",
    authDomain: "devmeetup-40ee4.firebaseapp.com",
    databaseURL: "https://devmeetup-40ee4.firebaseio.com",
    projectId: "devmeetup-40ee4",
    storageBucket: "devmeetup-40ee4.appspot.com",
    })
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('fetchUserData')
      }
    })
    this.$store.dispatch('loadMeetups')
  }
}).$mount('#app')
