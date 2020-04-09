<template>
<div>
    <v-btn class="primary" small accent slot="activator" @click.stop="dialog=true">
        Edit Date
    </v-btn>
    <v-dialog width="340px" persistent v-model="dialog">    
        <v-card v-if="dialog">
            <v-container>
                <v-layout row wrap>
                    <v-col xs12>
                        <v-card-text>
                            <h5>Edit Meetup Date</h5>
                        </v-card-text>
                    </v-col>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-col xs10 offset-xs1>
                        <v-date-picker v-model="Otherdate" style="width:100%" actions>
                            <template>
                            <v-btn class="blue--text darken1" text @click.native="dialog=false">Close</v-btn>
                            <v-btn class="blue--text darken1" text @click="onSaveChanges">Save</v-btn>
                            </template>  
                        </v-date-picker>       
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
            editableDate: null,
            Otherdate:''
        }
    },
    methods:{
        onSaveChanges(){
            let newDate = new Date(this.meetup.date)
            let newDay = new Date(this.Otherdate).getUTCDate()
            let newMonth = new Date(this.Otherdate).getUTCMonth()
            let newYear = new Date(this.Otherdate).getUTCFullYear()
            newDate.setUTCDate(newDay)
            newDate.setUTCMonth(newMonth)
            newDate.setUTCFullYear(newYear)
            this.$store.dispatch('updateMeetupData',{
                id:this.meetup.id,
                date:newDate
            })
        }
    },
    created(){
        this.Otherdate = new Date(this.meetup.date).toISOString().split('T')[0]
    }
}
</script>
