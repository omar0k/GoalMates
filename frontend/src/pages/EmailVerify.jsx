import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail } from ".././features/verify/verifySlice";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
const EmailVerify = () => {
  const params = useParams();
  const { verificationError, verificationLoading, message } = useSelector(
    (state) => state.verify
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const verifyEmailUrl = async () => {
      const userData = { id: params.id, token: params.token };
      try {
        await dispatch(verifyEmail(userData));
      } catch (error) {
        toast.error(message);
      }
    };
    if (params.id && params.token) {
      verifyEmailUrl();
    }
  }, [dispatch, params.id, params.token, message]);
  useEffect(() => {
    if (verificationError) {
      toast.error(message);
    }
  }, [verificationError, dispatch, message]);
  if (verificationLoading) {
    return <Spinner />;
  }
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
        <h1>Email Verified Successfully</h1>
        <Link to="/login">
          <button className="btn">Login</button>
        </Link>
      </div>
    </>
  );
};
export default EmailVerify;
