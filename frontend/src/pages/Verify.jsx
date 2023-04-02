import {  useLocation, useNavigate } from "react-router-dom";
const Verify = ({ location }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const email = state?.email;
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h5>
          Account registered. Please check your email{" "}
          <span style={{ color: "blue" }}>{email}</span> for verification
          instructions.
        </h5>
        <button
          className="btn"
          onClick={() => {
            navigate("/");
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};
export default Verify;
