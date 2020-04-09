<template>
<div>
    <v-btn class="primary" small accent slot="activator" @click.stop="registeredDialog=true">
       {{ userIsRegistered ? 'Unregister' : 'Register'}}
    </v-btn>
    <v-dialog  persistent v-model="registeredDialog">    
        <v-card v-if="registeredDialog" class="text-center">
            <v-container >
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-text >
                            <h5 v-if="userIsRegistered">Unregister from meetup ?</h5>
                            <h5 v-else>Register for meetup ?</h5>
                        </v-card-text>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs10 offset-xs1>
                        <v-card-text>You can always change your decision later on.</v-card-text>      
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs8 class="content-center">
                        <v-card-actions>
                            <v-btn class="red--text darken-1" text @click="registeredDialog = false">Cancel</v-btn>
                            <v-btn class="green--text darken-1" text @click="onAgree">Confirm</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
export default {
    data(){
        return{
            registeredDialog:false
        }
    },
    props:['meetupId'],
    computed:{
        userIsRegistered(){
            return this.$store.getters.user.registeredMeetups.findIndex(meetupId =>{
                return meetupId == this.meetupId
            }) >= 0
        }
    },
    methods:{
        onAgree(){
            if(this.userIsRegistered){
                this.$store.dispatch('unregisterUserForMeetup', this.meetupId)
            } else {
                this.$store.dispatch('registerUserForMeetup', this.meetupId)
            }
        }
    }
}
</script>
