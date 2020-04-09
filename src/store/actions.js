import * as firebase from 'firebase'

export default {
    loadMeetups({commit}){
        commit('setLoading', true)
        firebase.database().ref('meetups').once('value')
        .then(data=>{
            const meetups = []
            const obj = data.val()
            for(let key in obj){
                meetups.push({
                    id:key,
                    title: obj[key].title,
                    description: obj[key].description,
                    imageUrl: obj[key].imageUrl,
                    date: obj[key].date,
                    location: obj[key].location,
                    creatorId: obj[key].creatorId
                })
            }
            commit('setLoadedMeetups', meetups)
            commit('setLoading', false)
        })
        .catch(error=>{
            console.log(error)
            commit('setLoading', true)
        })
    },
    createMeetup({commit, getters}, payload){
        const meetup={
            title: payload.title,
            location: payload.location,
            imageUrl: payload.imageUrl,
            description: payload.description,
            date: payload.date.toISOString(),
            creatorId: getters.user.id
        }
        firebase.database().ref('meetups').push(meetup)
        .then((data)=>{
            const key = data.key 
            console.log(data)
            commit('createMeetup', {...meetup, id:key})
        })
        .catch(error=>{
            console.log(error)
        })
    },
    updateMeetupData({commit}, payload){
        commit('setLoading', true)
        const updateObj={}
        if(payload.title){
            updateObj.title = payload.title
        }
        if(payload.description){
            updateObj.description = payload.description
        }
        if(payload.date){
            updateObj.date = payload.date
        }
        firebase.database().ref('meetups').child(payload.id).update(updateObj)
        .then(()=>{
            commit('updateMeetup', payload)
            commit('setLoading', false)
        })
        .catch(error=>{
            console.log(error)
            commit('setLoading', false)
        })
    },
    signUserUp({commit},payload){
        commit('setLoading', true)
        commit('clearError')
        firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user=>{
            commit('setLoading', false)
            let newUser ={
                id: user.uid,
                registeredMeetups:[],
                fbKeys:{}
            }
            commit('setUser', newUser)
        })
        .catch(error=>{
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
        })
    },
    signUserIn({commit}, payload){
        commit('setLoading', true)
        commit('clearError')
        firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then( user=>{
            commit('setLoading', false)
            let newUser ={
                id: user.uid,
                registeredMeetups:[],
                fbKeys:{}
            }
            commit('setUser', newUser)
        })
        .catch(error=>{
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
        })
    },
    clearError({commit}){
        commit('clearError')
    },
    autoSignIn({commit}, payload){
        commit('setUser',
        {
            id: payload.uid,
            registeredMeetups:[],
            fbKeys:{}
        })
    },
    fetchUserData({commit, getters}){
        commit('setLoading', true)
        firebase.database().ref('/users/' + getters.user.id + '/registrations/').once('value')
        .then(data=>{
            const values = data.val()
            let registeredMeetups = []
            let reversedMeetupsVal ={}
            for( let key in values){
                registeredMeetups.push(values[key])
                reversedMeetupsVal[values[key]] = key
            }
            const updatedUser = {
                id: getters.user.id,
                registeredMeetups: registeredMeetups,
                fbKeys: reversedMeetupsVal
            }
            commit('setLoading', false)
            commit('setUser', updatedUser)
        })
        .catch(error=>{
            console.log(error)
            commit('setLoading', false)
        })
    },
    logout({commit}){
        firebase.auth().signOut()
        commit('setUser', null)
    },
    registerUserForMeetup({commit,getters}, payload){
        commit('setLoading', true)
        const user = getters.user
        firebase.database().ref('/users/' + user.id + '/registrations/')
        .push(payload)
        .then(data=>{
            commit('setLoading', false)
            commit('registerUserForMeetup', {id:payload, fbKey:data.key})
        })
        .catch(error=>{
            console.log(error)
            commit('setLoading', false)
        })
    },
    unregisterUserForMeetup({commit, getters}, payload){
        commit('setLoading', true)
        const user = getters.user
        if(!user.fbKeys){
            return
        }
        const fbKey = user.fbKeys[payload]
        firebase.database().ref('/users/' + user.id + '/registrations/').child(fbKey)
        .remove()
        .then(() =>{
            commit('setLoading', false)
            commit('unregisterUserForMeetup', payload)
        })
        .catch(error=>{
            console.log(error)
            commit('setLoading', false)
        })
    }
}
