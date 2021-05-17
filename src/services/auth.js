import {auth, provider}from '../firebase/firebase'

export const signInWithGoogle = async () => {
    
    let user;

    await auth.signInWithPopup(provider)
    .then((res) => {
        console.log(res.user)
        user = res.user
    })
    .catch((error) => {
        console.log(error.message)
    });

    return user;
}


export const logout = async () => {
    let logout_status;
    await auth.signOut()
    .then(() => {
        logout_status = true;
    })
    .catch((error) => {
        console.log(error.message)
    });
    return logout_status;
}