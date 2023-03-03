import axios from "axios";
import React, { useState } from "react";
import { API_URL } from "../../../../API_URL";
// import { toast } from "react-toastify";
// import { host, v } from "../../config/config";
import "./editRoom.scss";

const EditRoom = ({ data, roomId, openEditForm, setOpenEditForm }) => {
  const [editInputs, setEditInputs] = useState({
    title: data.title,
    price: data.price,
    maxPeople: data.maxPeople,
    desc: data.desc,
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
        `${API_URL}/rooms/${roomId}`,
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
    <div>
      <h1 className="title">Edit Room</h1>
      <form onSubmit={handleSubmit}>
        <div className="editRoomDetails">
          <div className="detailItem">
            <label htmlFor="username" className="itemKey">
              Title:
            </label>
            <input
              className="itemValue"
              id="title"
              value={editInputs.title}
              onChange={handleEdit}
            />
          </div>
          <div className="detailItem">
            <label htmlFor="email" className="itemKey">
              Price:
            </label>
            <input
              className="itemValue"
              id="price"
              value={editInputs.price}
              onChange={handleEdit}
            />
          </div>
          <div className="detailItem">
            <label htmlFor="phone" className="itemKey">
              Max People:
            </label>
            <input
              className="itemValue"
              id="maxPeople"
              value={editInputs.maxPeople}
              onChange={handleEdit}
            />
          </div>
          <div className="detailItem">
            <label htmlFor="country" className="itemKey">
              Description:
            </label>
            <textarea
              className="itemValue"
              id="desc"
              cols={30}
              rows={5}
              value={editInputs.desc}
              onChange={handleEdit}
            />
          </div>
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
};
export default EditRoom;
