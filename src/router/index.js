import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import CreateMeetup from '../components/Meetup/CreateMeetup.vue'
import Meetups from '../components/Meetup/Meetups.vue'
import Signin from '../components/User/SignIn.vue'
import Signup from '../components/User/SignUp.vue'
import Meetup from '../components/Meetup/Meetup.vue'
import AuthGuard from './authGuard.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/meetups',
    name: 'Meetups',
    component: Meetups
  },
  {
    path: '/meetup/new',
    name: 'Create-meetups',
    component: CreateMeetup,
    beforeEnter: AuthGuard
  },
  {
    path:'/meetups/:id',
    name:'Meetup',
    props:true,
    component:Meetup
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
]

const router = new VueRouter({
  routes,
  mode:"history"
})

export default router
