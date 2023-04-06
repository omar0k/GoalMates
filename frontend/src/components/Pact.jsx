import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToPact, getPact } from "../features/pact/pactSlice";
import { toast } from "react-toastify";
const Pact = () => {
  const [pactMember, setPactMember] = useState({
    email: "",
    name: "",
  });
  const dispatch = useDispatch();
  const { email, name } = pactMember;
  const { pact, isError, isSuccess, message, isLoading } = useSelector(
    (state) => state.pact
  );
  const onChange = (e) => {
    setPactMember((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitMember = (e) => {
    e.preventDefault();
    const pactData = {
      name,
      email,
    };
    dispatch(addToPact(pactData));
  };
  useState(() => {
    if (isError) {
      console.log(message);
      toast.error(message + "#2");
    }
  }, [isError, message]);
  console.log(pact);
  return (
    <div>
      <section className="form">
        <h4>
          Add a member to your pact to send your goals to. Whenever you create a
          goal, an email of your goal will be sent to random members of your
          pact.
        </h4>
      </section>
      <section className="form">
        <form onSubmit={handleSubmitMember}>
          <div className="form-group">
            <label htmlFor="pact-name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              minLength={3}
              className="form-control"
              onChange={onChange}
              value={name}
            />
            <label htmlFor="pact-email">Email</label>
            <input
              type="email"
              required
              name="email"
              id="email"
              value={email}
              onChange={onChange}
              className="form-control"
            />
            <button className="btn btn-block" type="submit">
              Add Member
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};
export default Pact;
