import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function UpdateUser() {
  const { id } = useParams();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [age, setAge] = useState();
  const navigate = useNavigate();

  //fetch the record(id) we need from db
  // here DB used is crudcrud.com
  useEffect(() => {
    axios
      .get(
        `https://crudcrud.com/api/4da140e958804923868d9b97cbc5982d/createUser/${id}`
      )
      .then((result) => {
        const userData = result.data;
        // console.log(userData);
        if (!name) setName(userData.name);
        if (!email) setEmail(userData.email);
        if (!age) setAge(userData.age);
      })
      .catch((err) => console.log(err));
  }, [id, name, email, age]);

  const Update = (e) => {
    e.preventDefault();
    axios
      .put(
        "https://crudcrud.com/api/4da140e958804923868d9b97cbc5982d/createUser/" +
          id,
        { name, email, age }
      )
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-info justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={Update}>
          <h2>Update User</h2>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Age</label>
            <input
              type="number"
              placeholder="Enter Age"
              className="form-control"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <button className="btn btn-success">Update</button>
        </form>
      </div>
    </div>
  );
}
export default UpdateUser;
