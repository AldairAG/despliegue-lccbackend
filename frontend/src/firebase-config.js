import { initializeApp } from "firebase/app";

const firebaseConfig= {
  apiKey: "AIzaSyDL1Ri4_VXxiWkB7E6eVEfRWXpGQasQTjw",
  authDomain: "legalcapital-corp.firebaseapp.com",
  databaseURL: "https://legalcapital-corp-default-rtdb.firebaseio.com",
  projectId: "legalcapital-corp",
  storageBucket: "legalcapital-corp.appspot.com",
  messagingSenderId: "669174083220",
  appId: "1:669174083220:web:61390e57f33eea2b90ce81"
};
const firebaseConfigT = {
  apiKey: "AIzaSyA93BtPlPo7f8ZK8HSRpLrklCbLfs5Sv_Q",
  authDomain: "lcc-test-26ffe.firebaseapp.com",
  databaseURL: "https://lcc-test-26ffe-default-rtdb.firebaseio.com/",
  projectId: "lcc-test-26ffe",
  storageBucket: "lcc-test-26ffe.appspot.com",
  messagingSenderId: "308292454007",
  appId: "1:308292454007:web:cea1512701f7727f802872"
};

const appFirebase=initializeApp(firebaseConfigT);
export default appFirebase;