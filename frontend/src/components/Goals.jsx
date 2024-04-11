import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import GoalItem from "./GoalItem";
import GoalForm from "./GoalForm";
const Goals = () => {
  const { goals,  isError, message } = useSelector(
    (state) => state.goals
  );
  useEffect(() => {
    if (isError) {
      toast.error(message+"32");
    }
  }, [isError, message]);
  return (
    <div>
      <GoalForm />
      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => {
              return <GoalItem key={goal._id} goal={goal} />;
            })}
          </div>
        ) : (
          <h3> You have not set any goals.</h3>
        )}
      </section>
    </div>
  );
};
export default Goals;
