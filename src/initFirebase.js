import * as firebase from 'firebase';
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCo0MpzI4vD9DgD3uCY7_ire04AjCdfhI4",
    authDomain: "mix-a-pizza.firebaseapp.com",
    databaseURL: "https://mix-a-pizza.firebaseio.com",
    projectId: "mix-a-pizza",
    storageBucket: "mix-a-pizza.appspot.com",
    messagingSenderId: "277473586248",
    appId: "1:277473586248:web:ef0a9839864625d9713c7d",
    measurementId: "G-measurement-id"
}

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore()

export const getResource = resource => {
    return new Promise((resolve, reject) => {
        db.collection(resource)
            .get()
            .then(snapshots => resolve(snapshots.docs.map(doc => ({ _key: doc.id, ...doc.data() }))))
            .catch(err => reject(err))
    })
}

export const getResourceWhere = (resource, docRef) => {
    return new Promise((resolve, reject) => {
        db.collection(resource)
            .doc(docRef)
            .get()
            .then(doc => resolve(doc.data()))
            .catch(err => reject(err))
    })
}

export const getResourceCondition = (resource, column, operator, value) => {
    return new Promise((resolve, reject) => {
        db.collection(resource)
            .where(column, operator, value)
            .get()
            .then(snapshots => resolve(snapshots.docs.map(doc => ({ _key: doc.id, ...doc.data() }))))
            .catch(err => reject(err))
    })
}

export const getResourceTwoCondition = (resource, column1, operator1, value1, column2, operator2, value2) => {
    return new Promise((resolve, reject) => {
        db.collection(resource)
            .where(column1, operator1, value1)
            .where(column2, operator2, value2)
            .get()
            .then(snapshots => resolve(snapshots.docs.map(doc => ({ _key: doc.id, ...doc.data() }))))
            .catch(err => reject(err))
    })
}

export const deleteDocument = (resource, id) => {
    return new Promise((resolve, reject) => {
        db.collection(resource).doc(id)
            .delete()
            .then(() => resolve(true))
            .catch(err => reject(err))
    })
}

export const addDocumentToResource = (resource, document) => {
    return new Promise((resolve, reject) =>{
        db.collection(resource)
            .add(document)
            .then(docRef=> resolve(docRef.id))
            .catch(err => reject(err))
    })
}

export const updateDocumentTouchId = (resource, id, value) => {
    return new Promise((resolve, reject) => {
        db.collection(resource).doc(id)
            .update({touchId: value})
            .then(() => resolve(true))
            .catch(err => reject(err))
    })
}

export const updateUserSetting = (resource, id, value) => {
    const {
        notifications,
        touchId,
        facebook,
        google,
        apple,
        activities,
        helper
    } = value

    return new Promise((resolve, reject) => {
        db.collection(resource).doc(id)
            .update({
                notifications: notifications,
                touchId: touchId,
                facebook: facebook,
                google: google,
                apple: apple,
                activities: activities,
                helper: helper
            })
            .then(() => resolve(true))
            .catch(err => reject(err))
    })
}