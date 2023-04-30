import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createGoal } from "../features/goals/goalSlice";
import { emailPact } from "../features/pact/pactSlice";
import "react-datetime/css/react-datetime.css";
function GoalForm() {
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState("");
  const { pact } = useSelector((state) => state.pact);
  const dispatch = useDispatch();
  const getRandomPactMembers = () => {
    const selectedMembers = [];
    const total = pact.pact.length;
    const pactCopy = [...pact.pact, pact.pact];
    const numToSelect = Math.round(total * 0.5);
    for (let i = 0; i < numToSelect; i++) {
      const randomIdx = Math.floor(Math.random() * total);
      const randomMember = pactCopy[randomIdx];
      selectedMembers.push(randomMember);
      pactCopy.splice(randomIdx, 1);
    }
    return selectedMembers;
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const selectedMembers = getRandomPactMembers();
    dispatch(createGoal({ text, dueDate })).then((result) => {
      dispatch(
        emailPact({ pactMembers: selectedMembers, goalId: result.payload._id })
      );
    });
    setText("");
  };
  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
  };
  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Goal</label>
          <input
            style={{ borderColor: "black" }}
            type="text"
            name="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <label htmlFor="date">Due Date</label>
          <input
            type="datetime-local"
            onChange={handleDueDateChange}
            value={dueDate}
            min={new Date(Date.now()).toISOString().slice(0, 16)}
            name="due-date"
            id="due-date"
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add Goal
          </button>
        </div>
      </form>
    </section>
  );
}
export default GoalForm;
