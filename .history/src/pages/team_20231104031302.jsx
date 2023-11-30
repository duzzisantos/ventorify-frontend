import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import {
  EnvelopeFill,
  PeopleFill,
  PersonBadge,
  ShieldLock,
} from "react-bootstrap-icons";
const Team = () => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const getTeamData = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/team");
        setTeam(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getTeamData();
  }, []);
  return (
    <Container className="col-md-10 text-secondary">
      <div className="my-5 text-start mx-3">
        <h1 className="fw-bold">Team</h1>
        <p>View the complete profile of the inventory management team</p>
      </div>
      <hr />
      <div className="mx-3 mb-5 text-start d-flex flex-row flex-wrap">
        {team.map((member) => (
          <fieldset
            key={member._id}
            className="shadow-sm col-sm-5 me-auto ms-auto my-5 py-1 table-border shadow-sm"
          >
            <legend
              style={{
                height: "100px",
                width: "100px",
                borderRadius: "50%",
              }}
              className="bg-dark text-light mb-5 mx-3 float-none px-3 align-items-center justify-content-center d-flex"
            >
              {member.name[0]}
              {member.lastName[0]}
            </legend>
            <div className="mx-3">
              <p>
                <PersonBadge /> <strong>Name</strong>: {member.name}{" "}
                {member.lastName}
              </p>
              <p>
                <PeopleFill /> <strong>Role</strong>: {member.role}
              </p>
              <p>
                <ShieldLock /> <strong>Authorization</strong>:{" "}
                {member.isAdmin ? " Admin" : "Not admin"}
              </p>
              <p>
                <EnvelopeFill /> <strong>Email</strong>:{" "}
                <a
                  href={`mailto:${member.email}`}
                  className="card-href text-secondary"
                >
                  {member.email}
                </a>
              </p>
            </div>
          </fieldset>
        ))}
      </div>
    </Container>
  );
};

export default Team;
