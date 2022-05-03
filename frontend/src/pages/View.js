import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./View.css";

const View = () => {
  const [user, setUser] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleUser(id);
    }
  }, [id]);

  console.log("user", id);

  const getSingleUser = async (id) => {
    const response = await axios.get(`http://localhost:8080/user/${id}`);
    console.log("response", response);
    if (response.status === 200) {
      setUser({ ...response.data[0] });
    }
  };
  return (
    <div style={{ marginTop: "150px" }}>
      <div className="card">
        <div className="card-header">
          <p>Detail de l'Astronaute</p>
        </div>
        <div className="container">
          <strong>ID: </strong>
          <span>{id} </span>
          <br />
          <br />
          <strong>Name: </strong>
          <span>{user && user.name} </span>
          <br />
          <br />
          <strong>Prenom: </strong>
          <span>{user && user.firstName} </span>
          <br />
          <br />
          <Link to="/">
            <button className="btn btn-edit">Retour</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default View;