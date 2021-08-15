import firebase from 'firebase';

export function login(email, password, loginComplete) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => loginComplete())
    .catch(error => console.log('error : ', error));

  console.log('Email', email);
  console.log('Password', password);
}

export function signUp(email, password, signUpComplete) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => login(email, password, signUpComplete))
    .catch(error => console.log('error : ', error));

  console.log('Signup Email', email);
  console.log('Signup Password', password);
}

export function subscribeToAuth(authStateChanged) {
  firebase.auth().onAuthStateChanged(user => {
    authStateChanged(user);
  });
}
