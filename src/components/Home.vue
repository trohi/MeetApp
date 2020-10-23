<template>
    <v-container>
        <v-layout row wrap style="margin:auto;" class="mb-2">
            <v-flex xs12 sm6 class="text-xs-center text-sm-right" >
                <v-btn class="primary" large router to="/meetups" style="margin:5px">Explore Meetups</v-btn>
            </v-flex>
            <v-flex xs12 sm6 class="text-xs-center text-sm-left">
                <v-btn class="primary" large  router to="/meetup/new" style="margin:5px">Organise Meetups</v-btn>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12 class="text-center">
                <v-progress-circular indeterminate
                 class="primary--text"
                 :width="9"
                 :size="90"
                 v-if="loading"
                 ></v-progress-circular>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12 md10 offset-md1 class="text-xs-center text-sm-center">
                <v-carousel v-if="!loading" style="cursor:pointer">
                    <v-carousel-item
                    v-for="meetup in meetups"
                    :src="meetup.imageUrl"
                    :key="meetup.id"
                    @click="onLoadMeetup(meetup.id)"
                    >
                    <div class="title">
                        {{meetup.title }}
                    </div>
                    </v-carousel-item>
                </v-carousel>
            </v-flex>
        </v-layout>
        <v-layout row wrap style="margin:auto;" class="mt-2">
            <v-flex xs12  class="text-xs-center text-sm-center" >
            <p>Join our awsome meetups</p>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    computed:{
        meetups(){
            return this.$store.getters.loadedMeetups
        },
        loading(){
            return this.$store.getters.loading
        }
    },
    methods:{
        onLoadMeetup(id){
            this.$router.push('/meetups/'+id)
        }
    }
}
</script>

<style scoped>
    .title{
        position: absolute;
        bottom: 50px;
        background-color:rgb(0, 0, 0, 0.5);
        color:white;
        font-size: 2em;
        padding:20px;
    }
</style>
