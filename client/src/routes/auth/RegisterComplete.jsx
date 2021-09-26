import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { signInWithEmailLink, updatePassword, getIdTokenResult } from "firebase/auth";
import { toast } from "react-toastify";

const RegisterComplete = ({history}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!email || !password) {
        toast.error("Email and password are required.");
        return;
    }
    if(password.length < 6) {
        toast.error("Password must be at least six characters long.");
        return;
    }
    try {
        const result = await signInWithEmailLink(auth, email, window.location.href);
        if(result.user.reloadUserInfo.emailVerified) {
            window.localStorage.removeItem('emailForRegistration');
            let user = auth.currentUser;
            await updatePassword(user, password);
            const idTokenResult = await getIdTokenResult(user);
            // console.log('user', user);
            // console.log('idTokenResult', idTokenResult);
            history.push("/");
        }
    } catch(error) {
        console.log(error);
        toast.error(error.message);
    }
  };

  const completeRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        readOnly
      />
      <input
        type="password"
        className="form-control mt-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter new password"
        autoFocus
      />
      <button type="submit" className="btn btn-primary w-100 mt-2">
        Complete Registration
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Complete Registration</h4>
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
