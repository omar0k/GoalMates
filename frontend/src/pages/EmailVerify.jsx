import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verify } from ".././features/auth/authSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import { valid } from "joi";
const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(false);
  const params = useParams();
  console.log();
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  useEffect(() => {
    const verifyEmailUrl = async () => {
      const userData = { id: params.id, token: params.token };
      console.log(userData);
      try {
        await dispatch(verify(userData));
        setValidUrl(true);
      } catch (error) {
        setValidUrl(false);
      }
    };
    if (params.id && params.token) {
      verifyEmailUrl();
    }
  }, [dispatch, params.id, params.token]);
  console.log(isSuccess);
  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isSuccess && validUrl && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1>Email verified successfully.</h1>
          <Link to="/login">
            <button className="btn">Login</button>
          </Link>
        </div>
      )}
      {isError && <h2>{"404 Not Found"}</h2>}
    </>
  );
};
export default EmailVerify;
