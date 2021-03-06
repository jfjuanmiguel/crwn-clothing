import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyDTDa1KMwJPjalOG-vzhLvcWFXqLzYSd3k',
  authDomain: 'crwn-db-5c16d.firebaseapp.com',
  projectId: 'crwn-db-5c16d',
  storageBucket: 'crwn-db-5c16d.appspot.com',
  messagingSenderId: '586909546923',
  appId: '1:586909546923:web:128851b5ff4b0953e83aee',
}

export const createUserProfileDocument = async (userAuth, addtionalData) => {
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapShot = await userRef.get()

  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...addtionalData,
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
