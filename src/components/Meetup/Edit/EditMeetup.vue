<template>
<div>
    <v-btn class="primary" small accent fab slot="activator" @click.stop="dialog=true">
            <v-icon>mdi-border-color</v-icon>
        </v-btn>
    <v-dialog width="340px" persistent v-model="dialog">    
        <v-card v-if="dialog">
            <v-container>
                <v-layout row wrap>
                    <v-felx xs12>
                        <v-card-text>
                            <h5>Edit meetup</h5>
                        </v-card-text>
                    </v-felx>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs10 offset-xs1>
                        <v-text-field
                    name="title"
                    label="Title"
                    id="title"
                    required
                    v-model="editedTitle"
                    :rules="[()=>title.length > 0 || 'Required field']"
                    >
                    </v-text-field>
                    <v-textarea
                    name="description"
                    label="Description"
                    id="description"
                    required
                    rows="4"
                    v-model="editedDescription"
                    :rules="[()=> description.length > 0 || 'Required field']"
                    >
                    </v-textarea>                
                    </v-flex>
                </v-layout> 
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-felx s12>
                        <v-card-actions>
                            <v-btn flet class="red--text text-darken1" @click="dialog=false">Close</v-btn>
    
                            <v-btn flet class="red--text" @click="onSaveChanges">Save</v-btn>
                        </v-card-actions>
                    </v-felx>
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
        return{
            dialog:false,
            editedTitle:this.meetup.title,
            editedDescription: this.meetup.description
        }
    },
    methods:{
        onSaveChanges(){
            if(this.editedTitle.trim() === '' || this.editedDescription.trim() === ''){
                return
            }
            this.dialog = false
            this.$store.dispatch('updateMeetupData', {
                id: this.meetup.id,
                title: this.editedTitle,
                description: this.editedDescription
            })
        }
    }
}
</script>
