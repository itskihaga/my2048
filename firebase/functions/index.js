const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
    const hoge = db.collection("game_status").doc("hoge")
    hoge.set({aaa:new Date().toString}).then(res=>{
        console.log(res);
        response.send("Hell from Firebase!");
        return true;
    }).catch(err =>{
        console.log(err);
        return false;
    })
    
});
