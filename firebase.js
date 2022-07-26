require('dotenv').config()

const {initializeApp, applicationDefault}=require('firebase-admin/app')
require('firebase-admin/auth');
initializeApp({
    credential: applicationDefault()
})