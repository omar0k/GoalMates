import { useState } from "react";
const Pact = () => {
  const [pactMember, setPactMember] = useState({
    pactEmail: "",
    pactName: "",
  });
  const { pactEmail, pactName } = pactMember;
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
        <div className="form-group">
          <label htmlFor="pact-name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            value={pactName}
          />
          <label htmlFor="pact-email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={pactEmail}
            className="form-control"
          />
        </div>
      </section>
    </div>
  );
};
export default Pact;
