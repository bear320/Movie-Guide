import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

createApp(App).use(store).use(router).mount("#app");

// Firebase
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyC41hTY84wJbasI0SSOZ8iwMl5S-5l-Kf8",
    authDomain: "movie-guide-db57a.firebaseapp.com",
    projectId: "movie-guide-db57a",
    storageBucket: "movie-guide-db57a.appspot.com",
    messagingSenderId: "270930601740",
    appId: "1:270930601740:web:ccddc3662fdd85a3ac8b29",
};

initializeApp(firebaseConfig);
