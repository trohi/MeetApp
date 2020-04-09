export default {
    loadedMeetups:state=>{
        return state.loadedMeetups.sort((meetup1, meetup2)=>{
            return meetup1.date > meetup2.date
        })
    },
    featuredMeetups:(state, getters)=>{
        return getters.loadedMeetups.slice(0,5)
    },
    loadedMeetup:state =>{
        return (meetupId)=>{
            return state.loadedMeetups.find((meetup)=>{
                return meetup.id == meetupId
            })
        }
    },
    user:state=>{
        return state.user
    },
    error:state=>{
        return state.error
    },
    loading:state=>{
        return state.loading
    }
}