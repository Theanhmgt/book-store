import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, getAdditionalUserInfo } from "firebase/auth";
import { toast } from "react-toastify"

import { collection, query, where, getDocs, doc, setDoc } from "firebase/firestore";
import { GoogleLogin, FaceBookLogin } from '~/redux/authSlice';

const firebaseConfig = {
    apiKey: "AIzaSyAb3DtUFKvJ8Wc6yfimLe_yrm9vAUixIcg",
    authDomain: "book-store-64e36.firebaseapp.com",
    projectId: "book-store-64e36",
    storageBucket: "book-store-64e36.appspot.com",
    messagingSenderId: "449910523598",
    appId: "1:449910523598:web:f075142124cec4ad4bb29f",
    measurementId: "G-2DR9E3P9JX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export const loginWithFirebase = async (userInfoDispatch, userCartDispatch, navigate, type) => {
    if (type === "googleLogin") {
        const result = await GoogleLogin()
        const { isNewUser, profile } = getAdditionalUserInfo(result)
        if (isNewUser) {
            try {
                await setDoc(doc(db, "users", profile.id), {
                    displayName: profile.name,
                    email: profile.email,
                    uid: profile.id,
                    photoURL: profile.picture,
                    password: -1,
                    cart: {
                        cartItems: [],
                        cartTotalAmount: 0,
                        cartTotalQuantity: 0,
                    }
                });
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
    }
    else if (type === "facebookLogin") {
        const result = await FaceBookLogin()
        const { isNewUser, profile } = getAdditionalUserInfo(result)
        console.log(isNewUser, profile)
        if (isNewUser) {
            try {
                await setDoc(doc(db, "users", profile.id), {
                    displayName: profile.name,
                    email: profile.email ? profile.email : 'Do not have eamil to display',
                    uid: profile.id,
                    photoURL: profile.picture.data.url,
                    password: -1,
                    cart: {
                        cartItems: [],
                        cartTotalAmount: 0,
                        cartTotalQuantity: 0,
                    }
                });
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
    }
    auth.onAuthStateChanged(user => {
        if (user) {
            (async () => {
                const { uid } = user.providerData[0]
                const q = query(collection(db, "users"), where("uid", "==", uid));
                const querySnapshot = await getDocs(q);
                // tim thay user
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    const data = doc.data()
                    const { cart, ...userInfo } = data
                    userInfoDispatch({
                        ...userInfo
                    })
                    userCartDispatch({
                        ...cart
                    })
                    navigate()
                });
            })()
        }
    })
}

export const updateCartData = async (data) => {
    const { uid } = JSON.parse(localStorage.getItem("userLocal"))
    if (uid) {
        const docRef = doc(db, "users", uid);
        setDoc(docRef, {
            cart: {
                ...data
            }
        }, { merge: true })
            .then()
            .catch(e => {
                console.log(e)
            })
    }
}

export const getPasswordFromFirebase = async () => {
    const { uid } = JSON.parse(localStorage.getItem("userLocal"))
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    // tim thay user
    if (querySnapshot.docs.length === 1) {
        let data = null
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            data = doc.data()
        });
        return data.password
    }
}

export const LogOut = (dispatchLogoutUser, dispatchLogoutCart) => {
    dispatchLogoutUser()
    dispatchLogoutCart()
    auth.signOut()
    toast.success(`Đăng xuất thành công`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export { db, app, auth }