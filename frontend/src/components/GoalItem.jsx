import { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { deleteGoal } from "../features/goals/goalSlice";
function GoalItem({ goal }) {
  const dispatch = useDispatch();
  const dueDate = useMemo(() => new Date(goal.dueDate), [goal.dueDate]);
  const [timeLeft, setTimeLeft] = useState(dueDate - Date.now());


  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(dueDate - Date.now());
    }, 1000);
    return () => clearInterval(intervalId);
  }, [dueDate]);

  const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutesLeft = Math.floor((timeLeft / (1000 * 60)) % 60);
  const secondsLeft = Math.floor((timeLeft / 1000) % 60);

  return (
    <div className="goal">
      <div>
        <p>Created: {new Date(goal.createdAt).toLocaleString("en-US")}</p>
        <p>Due Date: {new Date(goal.dueDate).toLocaleString("en-US")}</p>
      </div>
      <p style={{ color: "orange" }}>
        Time left: {daysLeft} days, {hoursLeft} hours, {minutesLeft} minutes,{" "}
        {secondsLeft} seconds
      </p>
      <h2>{goal.text}</h2>
      <button className="close" onClick={() => dispatch(deleteGoal(goal._id))}>
        X
      </button>
    </div>
  );
}
export default GoalItem;
