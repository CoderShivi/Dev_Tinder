import { configureStore } from '@reduxjs/toolkit'
import userReduser from './userSlice'
const appStore=configureStore({
    reducer:{
         user:userReduser,
    },
   
})
console.log("Initial Redux Store:", appStore.getState());
export default appStore; 