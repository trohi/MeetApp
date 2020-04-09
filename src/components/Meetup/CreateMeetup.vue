<template>
    <v-container>
        <v-layout row >
            <v-flex xs12 sm6 offset-sm5>
                <h1 class="grey--text text-lighten3 mb-5">Create a Meetup</h1>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3 >
                <form @submit.prevent="onCreateMeetup">
                    <v-layout row>
                        <v-flex xs10 sm6 offset-sm3 offset-xs1>
                    <v-text-field
                    name="title"
                    label="Title"
                    id="title"
                    required
                    v-model="title"
                    :rules="[()=>title.length > 0 || 'Required field']"
                    >
                    </v-text-field>                
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs10 sm6 offset-sm3 offset-xs1>               
                    <v-text-field
                    name="location"
                    label="Location"
                    id="location"
                    required
                    v-model="location"
                    :rules="[()=> location.length > 0 || 'Required field']"
                    >
                    </v-text-field>              
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs10 sm6 offset-sm3 offset-xs1>
                    <v-text-field
                    name="imageUrl"
                    label="Image URL"
                    id="image-url"
                    required
                    v-model="imageUrl"
                    :rules="[()=> imageUrl.length > 0 || 'Required field']"
                    >
                    </v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-img :src="imageUrl" height="250px"></v-img>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3 offset-xs1>
                    <v-textarea
                    name="description"
                    label="Description"
                    id="description"
                    required
                    rows="4"
                    v-model="description"
                    :rules="[()=> description.length > 0 || 'Required field']"
                    >
                    </v-textarea>
            </v-flex>
        </v-layout>
        <v-layout row class="mb-3">
            <v-flex xs12 sm6 offset-sm3 offset-xs1>
                <h3>Choose date & time</h3>
            </v-flex>
        </v-layout>
        <v-layout row class="mb-3">
            <v-flex xs12 sm10 offset-sm3>
                <v-date-picker v-model="date"></v-date-picker>
            </v-flex>
        </v-layout>
        <v-layout row class="mb-5">
            <v-flex xs12 sm10 offset-sm3>
                <v-time-picker format='24' v-model="time"></v-time-picker>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12 offset-sm3>
                <v-btn class="secondary" type="submit" :disabled="!formIsValid">Create Meetup</v-btn>
            </v-flex>
        </v-layout>
        </form>
    </v-flex>
    </v-layout>
    </v-container>
</template>

<script>
export default {
    data(){
        return{
            title:'',
            location:'',
            imageUrl:'',
            description:'',
            time:'',
            date:''
        }
    },
    computed:{
        formIsValid(){
            return this.title !== "" &&
            this.location !== "" &&
            this.imageUrl !== "" &&
            this.description !== ""
        },
        submitableDandT(){
            const date = new Date(this.date)
            if(typeof this.date == 'string'){
                let hours = this.time.match(/^(\d+)/)[1]
                let minutes = this.time.match(/:(\d+)/)[1]
                date.setHours(hours)
                date.setMinutes(minutes)
            } else {
                date.setHours(this.time.getHours())
                date.setMinutes(this.time.getMinutes())
            }
            return date
        }
    },
    methods:{
        onCreateMeetup(){
            if(!this.formIsValid){
                return;
            }
            const meetupData = {
                title: this.title,
                location: this.location,
                imageUrl: this.imageUrl,
                description: this.description,
                date: this.submitableDandT,
                id:"3"
            }
            this.$store.dispatch('createMeetup', meetupData)
            this.$router.push('/meetups')
        }
    }
}
</script>
