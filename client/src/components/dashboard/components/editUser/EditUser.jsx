import axios from "axios";
import React, { useState } from "react";
import { API_URL } from "../../../../API_URL";
// import { toast } from "react-toastify";
// import { host, v } from "../../config/config";
import "./editUser.scss";
const EditUser = ({ data, userId, openEditForm, setOpenEditForm }) => {
  // to take user editInputs
  const [editInputs, setEditInputs] = useState({
    username: data.username,
    email: data.email,
    phone: data.phone,
    country: data.country,
    city: data.city,
    isAdmin: data.isAdmin,
  });

  const handleEdit = (e) => {
    setEditInputs((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        `${API_URL}/users/${userId}`,
        editInputs,
        {
          credentials: "include",
          headers: {
            authorization: `Bearer ${JSON.parse(
              localStorage.getItem("authorization")
            )}`,
          },
        }
      );

      // toast(data.message, {
      //   position: "bottom-center",
      //   type: "success",
      // });

      setOpenEditForm(!openEditForm);
    } catch (err) {
      // toast(err.message, {
      //   position: "bottom-center",
      //   type: "error",
      // });
    }
  };

  return (
    <>
      <h1 className="title">Edit Details</h1>
      <form onSubmit={handleSubmit}>
        <div className="editUserDetails">
          <div className="detailItem">
            <label htmlFor="username" className="itemKey">
              Name:
            </label>
            <input
              className="itemValue"
              id="username"
              value={editInputs.username}
              onChange={handleEdit}
            />
          </div>
          <div className="detailItem">
            <label htmlFor="email" className="itemKey">
              Email:
            </label>
            <input
              className="itemValue"
              id="email"
              value={editInputs.email}
              onChange={handleEdit}
            />
          </div>
          <div className="detailItem">
            <label htmlFor="phone" className="itemKey">
              Phone:
            </label>
            <input
              className="itemValue"
              id="phone"
              value={editInputs.phone}
              onChange={handleEdit}
            />
          </div>
          <div className="detailItem">
            <label htmlFor="country" className="itemKey">
              Country:
            </label>
            <input
              className="itemValue"
              id="country"
              value={editInputs.country}
              onChange={handleEdit}
            />
          </div>
          <div className="detailItem">
            <label htmlFor="city" className="itemKey">
              City:
            </label>
            <input
              className="itemValue"
              id="city"
              value={editInputs.city}
              onChange={handleEdit}
            />
          </div>
          <div className="detailItem">
            <label htmlFor="isAdmin" className="itemKey">
              Make Admin:
            </label>
            <select id="isAdmin" onChange={handleEdit}>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <button type="submit">Update</button>
        </div>
      </form>
    </>
  );
};

export default EditUser;
