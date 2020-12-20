import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import "firebase/storage";

export const config={
    apiKey: "AIzaSyCKwRlzaI3ongfrxXx9KgXGXiX-Bm1I53A",
    authDomain: "oppo-af57c.firebaseapp.com",
    projectId: "oppo-af57c",
    storageBucket: "oppo-af57c.appspot.com",
    messagingSenderId: "612059882739",
    appId: "1:612059882739:web:3f2c6a8338d174ab974386"
  }

firebase.initializeApp(config)
export const auth=firebase.auth()
export const firestore=firebase.firestore()
export const storage=firebase.storage()



export const createUserProfileDocument=async(userAuth,data)=>{
   if(!userAuth) return;
  const userRef=firestore.doc(`users/${userAuth.uid}`)
  const snapShot=await userRef.get()
  

   if (!snapShot.exists)
   {
    const {displayName,email}=userAuth
    const createdAt=new Date()
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...data
      })
    } catch(error)
    {
      console.log("Error creating user",error.message)
    }
   }

   return userRef
}

export const addUser=async(name,email,phone)=>{

    

    const user={
         name,
         email,
         phone
     }
    await firestore.collection("users").doc().set({
       name,email,phone
    })
    .then(function() {
        console.log("Document successfully written!");
        return user
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });

}

export const addScores=async(name,email,phone)=>{

  await firestore.collection("scores").doc(phone).set({
     name,email,phone,score:0,
     quiz:{
       last_played:0
     },
     hangman:{
       last_played:0
     }
  })
  .then(function(doc) {
      console.log("Document successfully written!");
      return doc.id
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });

}

export const updateScores=async(phone,score,date,game)=>{
  console.log(score)
  try {
  
  var washingtonRef = firestore.collection("scores").doc(phone)

// Atomically increment the population of the city by 50.
if (game==="QUIZ")
{
await washingtonRef.update({
    score: firebase.firestore.FieldValue.increment(score),
    "quiz.last_played":date
});
}
else if(game==="HANG")
{
  await washingtonRef.update({
    score: firebase.firestore.FieldValue.increment(score),
    "hang.last_played":date
});
}

console.log("Updated")
  }
  catch(err)
  {
    console.log(err)
  }
}

export default firebase