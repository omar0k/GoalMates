import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail } from ".././features/verify/verifySlice";
import { Link } from "react-router-dom";
const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(false);
  const params = useParams();
  console.log();
  const {
    verificationSuccess,
    verificationError,
    verificationLoading,
    message,
  } = useSelector((state) => state.verify);
  const dispatch = useDispatch();
  useEffect(() => {
    const verifyEmailUrl = async () => {
      const userData = { id: params.id, token: params.token };
      try {
        await dispatch(verifyEmail(userData));
        setValidUrl(true);
      } catch (error) {
        setValidUrl(false);
      }
    };
    if (params.id && params.token) {
      verifyEmailUrl();
    }
  }, [dispatch, params.id, params.token]);
  console.log(message);
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>{message}</h1>
        <Link to="/login">
          <button className="btn">Login</button>
        </Link>
      </div>
    </>
  );
};
export default EmailVerify;
