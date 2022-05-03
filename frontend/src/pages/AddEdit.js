import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddEdit.css";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  name: "",
  firstName: "",
  astronaut: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const { name, firstName, astronaut } = state;

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleUser(id);
    }
  }, [id]);

  const getSingleUser = async (id) => {
    const response = await axios.get(`http://localhost:8080/user/${id}`);
    if (response.status === 200) {
      setState({ ...response.data[0] });
    }
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const addUser = async (data) => {
    const response = await axios.post("http://localhost:8080/user", data);
    if (response.status === 200) {
      toast.success(response.data);
    }
  };

  const updateUser = async (data, id) => {
    const response = await axios.put(`http://localhost:8080/user/${id}`, data);
    if (response.status === 200) {
      toast.success(response.data);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !firstName ) {
      toast.error("Veuillez renseigner le champ");
    } else {
      if (!id) {
        addUser(state);
      } else {
        updateUser(state, id);
      }

      setTimeout(() => navigate.push("/"), 10);
    }
  };
  return (
    <div style={{ marginTop: "100px" }}>
     <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Nom</label>
        
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Entrer le nom..."
          onChange={handleInputChange}
          value={name}
        />
        <label htmlFor="firstName">Prenom</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="Entrer le prenom ..."
          onChange={handleInputChange}
          value={firstName}
        />
        <label htmlFor="astronaut">Astronaute ?</label>
        <input
          type="text"
          id="astronaut"
          name="astronaut"
          placeholder="Entrer si il est astronaute ..."
          onChange={handleInputChange}
          value={astronaut}
         
        />

        <input type="submit" value={id ? "Update" : "Add"} />
      </form>
    </div>
  );
};

export default AddEdit;