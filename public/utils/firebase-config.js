import Firebase from "firebase";
import {Firestore} from "firebase/firestore";

const DBName = "MessageBox";

Firebase.initializeApp({
    apiKey: 'AIzaSyA570K65bcQZlUpiF_gULogZPhU108k7E0',
    authDomain: 'chatroom-582bf.firebaseapp.com',
    projectId: 'chatroom-582bf'
});

// Initialize Cloud Firestore through Firebase
var db = Firebase.firestore();

export function GetFirestore() {
    console.log("get firestore");
    return db.collection(DBName);
}