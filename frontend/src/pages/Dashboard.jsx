import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import { getGoals, reset } from "../features/goals/goalSlice";
import Goals from "../components/Goals";
import Pact from "../components/Pact";
function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [displayType, setDisplayType] = useState("goals");
  const { user } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.goals);
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    dispatch(getGoals());
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Dashboard</p>
      </section>
      <section
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <button
          className="btn"
          onClick={() => {
            setDisplayType("goals");
          }}
        >
          Goals
        </button>
        <button className="btn" onClick={() => setDisplayType("pact")}>
          Pact
        </button>
      </section>
      <div>{displayType === "goals" ? <Goals /> : <Pact />}</div>
    </>
  );
}

export default Dashboard;
