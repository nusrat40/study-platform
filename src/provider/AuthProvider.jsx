import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({children}) => {

    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);

    const googleProvider = new GoogleAuthProvider();
    const githubProvider =new GithubAuthProvider();
    const axiosPublic =useAxiosPublic();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleSignIn =()=>{
        setLoading(true);
        return signInWithPopup(auth,googleProvider);
    }

    const githubSignIn=()=>{
        setLoading(true);
        return signInWithPopup(auth,githubProvider);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const updateUserProfile = ({ displayName, photoURL }) => {
        return updateProfile(auth.currentUser, {
            displayName,
            photoURL,
        });
    };
    



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            // console.log('current user',currentUser);
            
            if(currentUser){
                //get token and store client
                const userInfo ={email: currentUser.email};
                axiosPublic.post('/jwt',userInfo)
                .then(res =>{
                    if (res.data.token) {
                        localStorage.setItem('access-token', res.data.token);
                        setLoading(false);
                    }
                })

            }
            else{
                
                 localStorage.removeItem('access-token');
                 setLoading(false);

            }
           
        });
        return () => {
            return unsubscribe();
        }
    }, [axiosPublic])

    const authInfo={
        user,
        loading,
        setUser,
        createUser,
        signIn,
        googleSignIn,
        logOut,
        updateUserProfile,
        githubSignIn

    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
        
    );
};

export default AuthProvider;