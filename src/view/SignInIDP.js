import React, { useEffect, useState } from 'react';
import firebase from '../firebase/firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

if (window.Cypress) {
  // firebase.auth().signOut();
  firebase.auth().useEmulator('http://localhost:9099');
}

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
}


export default function SignInIDP() {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      console.log('onAuthStateChanged', user)
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  if (!isSignedIn) {
    return (
      <div>
        <h1>Firebase Sign-in with IDP</h1>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>
    );
  }
  return (
    <div>
      <h1 data-testid="sign-in-success">Sign-in with IDP!</h1>
      <p data-testid="welcome-text">Welcome {firebase.auth().currentUser.email}! You are now signed-in!</p>
      <button onClick={() => firebase.auth().signOut()}>Sign-out</button>
    </div>
  );
}