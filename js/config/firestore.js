const firebaseConfig = {
    apiKey: "AIzaSyDVw8ZuLDY0yQj-jlo7trBb5lZMnn-RrXI",
    authDomain: "tutorial-c89d7.firebaseapp.com",
    projectId: "tutorial-c89d7",
    storageBucket: "tutorial-c89d7.appspot.com",
    messagingSenderId: "597292058978",
    appId: "1:597292058978:web:78e4a627d9c3fe0dc3c43b",
    measurementId: "G-LQLCTWHL66"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.firestore();

database.settings({timestampsInSNapshots: true})