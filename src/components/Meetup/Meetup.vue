<template>
    <v-container>
        <v-layout row v-if="loading">
            <v-flex xs12 class="text-center">
                <v-progress-circular indeterminate
                 class="primary--text"
                 :width="9"
                 :size="90"
                 
                 ></v-progress-circular>
            </v-flex>
        </v-layout>
        <v-layout row wrap v-else>
            <v-flex xs10 offset-sm1 offset-xs1>
                <v-card>
                    <v-card-title class="indigo--text text--darken-1">
                        <h4>{{meetup.title}}</h4>
                        <template v-if="userIsCreator">
                            <v-spacer></v-spacer>
                            <meetup-edit :meetup="meetup"></meetup-edit>
                        </template>
                    </v-card-title>
                    <v-img
                    :src="meetup.imageUrl"
                    height="400px"
                    >
                    </v-img>
                    <v-card-text>
                        <div class="info--text" >{{meetup.date | date}} - {{meetup.location}}</div>
                        <v-card-actions>
                            <meetup-edit-date :meetup="meetup" v-if="userIsCreator"></meetup-edit-date>
                            
                            <meetup-edit-time :meetup="meetup" v-if="userIsCreator"></meetup-edit-time>
                        </v-card-actions>
                        <div>{{ meetup.description }}</div>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <register-dialog
                        :meetupId="meetup.id"
                        v-if="userIsAuthenticated && !userIsCreator"
                        ></register-dialog>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    props:['id'],
    computed:{
        meetup(){
            return this.$store.getters.loadedMeetup(this.id)
        },
        userIsAuthenticated(){
            return this.$store.getters.user !== null && this.$store.getters.user !== undefined
        },
        userIsCreator(){
            if(!this.userIsAuthenticated){
                return false
            }
            return this.$store.getters.user.id === this.meetup.creatorId
        },
        loading(){
            return this.$store.getters.loading
        }
    }
}
</script>
