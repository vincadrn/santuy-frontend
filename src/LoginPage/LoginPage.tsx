// import React from "react";
// import { useSignInWithGoogle } from "react-firebase-hooks/auth";
// import { auth, provider } from "./firebaseConfig.js";
// import "./LoginPage.css";

// const LoginPage: React.FC = () => {
//   const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

//   const handleGoogleLogin = () => {
//     signInWithGoogle();
//   };

//   return (
//     <div className="login-page">
//       <div className="login-container">
//         <img src="/path/to/your/logo.png" alt="Logo" className="logo" />
//         <h2>Log in to Travelonika</h2>
//         <button onClick={handleGoogleLogin} className="google-login-button">
//           Log in with Google
//         </button>
//         {error && <p className="error-text">Error: {error.message}</p>}
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
