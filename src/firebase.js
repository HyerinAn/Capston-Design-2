import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/database";

const firebaseConfig = {
    // firebase 설정과 관련된 개인 정보
    apiKey: "AIzaSyBJiNAHVrH3ct3jhbGvkNDGshpG68SMqlk",
    authDomain: "capstone2-fad5e.firebaseapp.com",
    projectId: "capstone2-fad5e",
    storageBucket: "capstone2-fad5e.appspot.com",
    messagingSenderId: "750232481167",
    appId: "1:750232481167:web:aa6119369f74ef23f16ffa",
    measurementId: "G-Z014NY5X1C"
};

// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const firestore = firebase.firestore();
const database = firebase.database();

// 필요한 곳에서 사용할 수 있도록 내보내기
export { firestore, database };