import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:8080/users");
    if (response.status === 200) {
      setData(response.data);
    }
  };

  const onDeleteUser = async (id) => {
    if (
      window.confirm("Etes-vous sur de vouloir supprimer cet utilisateur ? ")
    ) {
      const response = await axios.delete(`http://localhost:8080/user/${id}`);
      if (response.status === 200) {
        toast.success(response.data);
        getUsers();
      }
    }
  };

  console.log("data=>", data);

  return (
    <div style={{ marginTop: "150px" }}>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>Numero</th>
            <th style={{ textAlign: "center" }}>Nom</th>
            <th style={{ textAlign: "center" }}>Prenom</th>
            <th style={{ textAlign: "center" }}>Astronaute ?</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.firstName}</td>
                  <td>{item.astronaut}</td>
                  <td>
                    <Link to={`/update/${item.id}`}>
                      <button className="btn btn-edit">Editer</button>
                    </Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => onDeleteUser(item.id)}
                    >
                      Supprimer
                    </button>
                    <Link to={`/view/${item.id}`}>
                      <button className="btn btn-view">Voir</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;