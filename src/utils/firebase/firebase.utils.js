// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//add methods from authentication service  (firebase/auth)
import { 
    getAuth, 
    signInWithRedirect,
    signInWithPopup, 
    GoogleAuthProvider, //we can use any provider we wanted such as Facebook, google , own emailaddress ...
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth"

//get methods from firestore service (firebase/firestore)
import {
    getFirestore,
    doc, //read data
    getDoc, //access data
    setDoc, //set data,
    collection, // get "table" references
    writeBatch, // write data to the table
    query,
    getDocs

} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4JaDPkVkkTxET8lhKJXm8G9ri1iUmO8Y",
  authDomain: "crwn-clothing-db-c2f7c.firebaseapp.com",
  projectId: "crwn-clothing-db-c2f7c",
  storageBucket: "crwn-clothing-db-c2f7c.appspot.com",
  messagingSenderId: "491909931851",
  appId: "1:491909931851:web:50249c74747d499e043ece"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//collectionKey: table name such as "users", "categories"...
// objectsToAdd: data row for that table
// RUN ONE TIME TO ADD DATA TO FIRESTORE
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    
    //create table in firestore
    const collectionRef = collection(db, collectionKey);

    const batch = writeBatch(db);
    objectsToAdd.forEach(item => {
        const docRef = doc(collectionRef, item.title.toLowerCase());
        batch.set(docRef, item)
    } );
    await batch.commit();

    console.log("done write data to firestore")

}


export const getCategoriesAndDocuments = async() => {
    /*
        // SAMPLE DATA STRUCTURE
        hats:{
            title: "Hats"
            items: [
                {
                    id,
                    name, 
                    price,
                },
                {},
            ]
        }
    */

    //if not available, firestore will generate one
    const collectionRef = collection(db, "categories");
    const qry = query(collectionRef);

    const querySnapshot = await getDocs(qry);

    // give an array of all documents(data) inside collection(table)
    const categoryMap =  querySnapshot.docs.reduce((acc, docSnapshot) => {
        const { title, items} = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;

    },{})
    
    return categoryMap;
}

const gooleProvider = new GoogleAuthProvider();
//config for sign in with google accounts
gooleProvider.setCustomParameters({
    prompt: "select_account"
})

const auth = getAuth();
export { auth }; // its not export defaut so we need {} OR we can write it like this export const auth = getAuth();

export const signInWithGooglePopup =  () => signInWithPopup(auth, gooleProvider);

export const signInWithGoogleRedirect = () => signInWithRedirect(auth, gooleProvider); // NOT WORKING

export const db = getFirestore(); //get db from firebase

export const createUserDocumentFromAuth =  async (userAuth, additionalInformation = {}) => {
    if(!userAuth) return;
    
    //read user information when user sign in with google account (or this google account is valid/available)
    const userDocRef = doc(db, "users", userAuth.uid ) //path: table name in FireStore
    //console.log(userDocRef)

    //getDoc : get type "document" of userDocRef to check existed
    const userSnapshot = await getDoc(userDocRef);
   // console.log(userSnapshot)
    //console.log("user existed?? :" + userSnapshot.exists()) // check if this user is existed in db of firestore or not

    //if user not existed => create user in "users" table
    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createAt = new Date();

        try {
            //create this user to "users" table
            await setDoc(userDocRef, { displayName, email, createAt, ...additionalInformation });

        } catch (error) {
            console.log("cannot create user ", error.message);
        }
    }
    return userDocRef;

}

//sign up
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password); // just a service, not create user in db yet
}

//sign in with email & password
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password); // just a service, not create user in db yet
}

export const signOutUser = async () => {
    return await signOut(auth)
}

//create an Observer to listen all changes of authentication procedure
export const onAuthStateChangedListenter = (callback) =>  onAuthStateChanged(auth, callback)
