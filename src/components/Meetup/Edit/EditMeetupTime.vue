<template>
<div class="ml-2">
    <v-btn class="primary" small accent slot="activator" @click.stop="dialog=true">
        Edit Time
    </v-btn>
    <v-dialog width="340px" persistent v-model="dialog">    
        <v-card v-if="dialog">
            <v-container>
                <v-layout row wrap>
                    <v-col xs12>
                        <v-card-text>
                            <h5>Edit Meetup Time</h5>
                        </v-card-text>
                    </v-col>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-col xs10 offset-xs1>
                        <v-time-picker v-model="editableTime" format="24hr" style="width:100%" actions>
                            <template>
                            <v-btn class="blue--text darken1" text @click.native="dialog=false">Close</v-btn>
                            <v-btn class="blue--text darken1" text @click="onSaveChanges">Save</v-btn>
                            </template>  
                        </v-time-picker>       
                    </v-col>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
export default {
    props:['meetup'],
    data(){
        return {
            dialog: false,
            editableTime: null,
            Otherdate:''
        }
    },
    methods:{
        onSaveChanges(){
            let newDate = new Date(this.meetup.date)
            const hours = this.editableTime.match(/^(\d+)/)[1]
            const minutes = this.editableTime.match(/:(\d+)/)[1]
            newDate.setHours(hours)
            newDate.setMinutes(minutes)
            this.$store.dispatch('updateMeetupData',{
                id:this.meetup.id,
                date:newDate
            })
        }
    },
    created(){
        this.editableTime = new Date(this.meetup.date).toTimeString().split(' ')[0]
    }
}
</script>
