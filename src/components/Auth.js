// import React, { useState } from "react";
// import { auth } from "../firebase";
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// const Auth = ({ onAuth }) => {
// 	  const [email, setEmail] = useState("");
// 	  const [password, setPassword] = useState("");
// 	  const [isSignUp, setIsSignUp] = useState(true);
// 	  const [error, setError] = useState("");

// 	  const handleSubmit = async (e) => {
// 		      e.preventDefault();
// 		      try {
// 			            if (isSignUp) {
// 					            await createUserWithEmailAndPassword(auth, email, password);
// 					          } else {
// 							          await signInWithEmailAndPassword(auth, email, password);
// 							        }
// 			            onAuth(auth.currentUser);
// 			          } catch (err) {
// 					        setError(err.message);
// 					      }
// 		    };

// 	  return (
// 		      <div>
// 		        <h1>{isSignUp ? "Sign Up" : "Sign In"}</h1>
// 		        <form onSubmit={handleSubmit}>
// 		          <input
// 		            type="email"
// 		            placeholder="Email"
// 		            value={email}
// 		            onChange={(e) => setEmail(e.target.value)}
// 		            required
// 		          />
// 		          <input
// 		            type="password"
// 		            placeholder="Password"
// 		            value={password}
// 		            onChange={(e) => setPassword(e.target.value)}
// 		            required
// 		          />
// 		          <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
// 		        </form>
// 		        <p style={{ color: "red" }}>{error}</p>
// 		        <button onClick={() => setIsSignUp(!isSignUp)}>
// 		          {isSignUp ? "Already have an account? Sign In" : "New user? Sign Up"}
// 		        </button>
// 		      </div>
// 		    );
// };

// export default Auth;

import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const Auth = ({ onAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let userCredential;
      
      if (isSignUp) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }

      // Trigger the onAuth callback and pass the current user
      onAuth(userCredential.user);  // This will trigger fetching invoices and setting the user

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>{isSignUp ? "Sign Up" : "Sign In"}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
      </form>
      <p style={{ color: "red" }}>{error}</p>
      <button onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? "Already have an account? Sign In" : "New user? Sign Up"}
      </button>
    </div>
  );
};

export default Auth;
