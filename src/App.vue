<template>
  <v-app>
    <v-toolbar max-height="64px" dark class="indigo darken-3">
      <v-icon left @click.stop="sideNav = !sideNav" class="hidden-sm-and-up">mdi-format-align-justify</v-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor:pointer">DevMeetup</router-link> 
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only" v-for="item in menuItems" :key="item.title">        
        <v-btn text dark>
         <router-link tag="span" :to="item.link">
           <v-icon left light>{{item.icon}}</v-icon>
          {{item.title}}
          </router-link>
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items class="hidden-xs-only" v-if="userIsAuthenticated" @click="onLogout">        
        <v-btn text dark>
           <v-icon left light>mdi-plex</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer absolute dark clipped v-model="sideNav">
       <v-list >
         <v-list-item name="list"  v-for="item in menuItems" :key="item.title"> 
           <v-list-item tag="span" router :to="item.link">
            <v-list-item-action>
             <v-icon left>{{item.icon}}</v-icon>
             </v-list-item-action>
            <v-list-item-content right>{{item.title}}</v-list-item-content>
           </v-list-item>
         </v-list-item>
          <v-list-item class="ml-4" @click="onLogout" v-if="userIsAuthenticated"> 
            <v-list-item-action v-if="userIsAuthenticated">
             <v-icon left>mdi-plex</v-icon>
             </v-list-item-action>
            <v-list-item-content>Log out</v-list-item-content>
         </v-list-item>
       </v-list>
    </v-navigation-drawer>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data(){
    return{
      sideNav:false,
    }
  },
  computed:{
    menuItems(){
      let menuItems = [
        {icon:'mdi-face', title:'Sign up', link:"/signup"},
        {icon:'mdi-lock-open', title:'Sign in', link:"/signin"}
      ]
      if( this.userIsAuthenticated ){
        menuItems=[
        {icon:'mdi-account-multiple', title:'View Meetups', link:"/meetups"},
        {icon:'mdi-fountain-pen-tip', title:'Organise Meetups', link:"/meetup/new"}
        ]
      }
      return menuItems
    },
    usersID(){
      return this.$store.getters.user.id
    },
    userIsAuthenticated(){
      return this.$store.getters.user !== null && this.$store.getters.user !==undefined
    }
  },
  methods:{
    onLogout(){
      this.$store.dispatch('logout')
    }
  }
};
</script>
