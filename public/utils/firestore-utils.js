import {getFirestore} from './firebase-config.js';

const FirestoreDB = getFirestore();

export function addMessageToFirestore(user, msg) {
    console.log("ADD to firestore= " + user + ": " + msg);
    var timestamp = new Date().getTime();
    var newMessage = {
        name: user,
        message: msg,
        timestamp: timestamp
    };
    FirestoreDB.doc(timestamp + "_" + user)
        .set(newMessage)
        .then(function(docRef) {
            console.log("Document written!");
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
}

export function detatchListener() {
    var unsubscribe = FirestoreDB.collection(DBName)
        .onSnapshot(function () {});
    unsubscribe();
}