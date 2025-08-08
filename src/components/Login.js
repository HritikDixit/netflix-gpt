import React, { useState, useRef } from "react";
import Header from "./Header";
import { checkValidateFunction } from "../utils/validateFunction";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { profile_photo, netflix_bg } from "../utils/constant";

const Login = () => {
  const [isSignForm, setIsSignForm] = useState(true);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    const validationError = checkValidateFunction(emailValue, passwordValue);
    console.log(validationError);
    if (validationError) {
      alert(validationError);
      return;
    }

    if (!isSignForm) {
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          // Signed up
          console.log(emailValue, "-", passwordValue);
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: name.current.value,
            photoURL: profile_photo,
          })
            .then(() => {
              console.log("User signed up:", user);
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              // An error occurred
              // ...
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("Error signing up:", errorCode, errorMessage);
        });
    } else {
      // Sign in logic can be added here
      signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("User signed in:", user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert("Error signing in: " + errorCode, "-", errorMessage);
          console.error("Error signing in:", errorCode, "-", errorMessage);
        });
    }
  };

  const toggleSignIn = () => {
    setIsSignForm(!isSignForm);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src= {netflix_bg}
          alt="Netflix bg image"
        />
      </div>
      <form className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 bg-opacity-80">
        <h1 className="font-bold text-3xl py-4 text-white">
          {isSignForm ? "Sign In" : "Sign Up"}
        </h1>
        <input
          type="text"
          ref={email}
          placeholder="Email Address"
          className="py-2 m-2 px-2 w-full rounded-lg"
        />
        {!isSignForm && (
          <input
            type="text"
            ref={name}
            placeholder="Full Name"
            className="py-2 m-2 px-2 w-full rounded-lg"
          />
        )}
        <input
          type="password"
          ref={password}
          placeholder="Password"
          className="py-2 m-2 px-2 w-full rounded-lg"
        />
        <button
          className="py-2 m-2 text-white bg-red-700 w-full rounded-lg"
          onClick={handleSubmit}
        >
          {isSignForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-6 text-white cursor-pointer" onClick={toggleSignIn}>
          {isSignForm
            ? "New to Netflix? Sign Up Now"
            : "Already Registered? Sign In"}
        </p>
      </form>
    </div>
  );
};

export default Login;
