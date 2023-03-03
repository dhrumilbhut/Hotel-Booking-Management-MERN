import React, { useState } from "react";
import axios from "axios";
import { Close } from "@mui/icons-material";
import { API_URL } from "../../../../API_URL";
// import { toast } from "react-toastify";
// import { host, v } from "../../config/config";

const EditHotel = ({ data, setOpenEditModal, hotelId, openEditModal }) => {
  const [editInputs, setEditInputs] = useState({
    name: data.name,
    title: data.title,
    type: data.type,
    desc: data.desc,
    city: data.city,
    address: data.address,
    distance: data.distance,
    cheapestPrice: data.cheapestPrice,
    featured: data.featured,
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
        `${API_URL}/hotels/${hotelId}`,
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
      //   position: "bottom-right",
      //   type: "success",
      //   autoClose: 1000,
      //   theme: "dark",
      // });

      setOpenEditModal(false);
      // reFetch()
    } catch (err) {
      // toast(err.message, {
      //   position: "bottom-right",
      //   type: "error",
      // });
    }
  };

  console.log(editInputs);

  return (
    <>
      <div className="editDetails">
        <div className="editDetailsOverlay">
          <form onSubmit={handleSubmit}>
            <div className="details">
              <div className="detailItem">
                <label htmlFor="name" className="itemKey">
                  Name:
                </label>
                <input
                  className="itemValue"
                  id="name"
                  value={editInputs.name}
                  onChange={handleEdit}
                />
              </div>
              <div className="detailItem">
                <label htmlFor="title" className="itemKey">
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
                <label htmlFor="desc" className="itemKey">
                  Description:
                </label>
                <input
                  className="itemValue"
                  id="desc"
                  value={editInputs.desc}
                  onChange={handleEdit}
                />
              </div>
              <div className="detailItem">
                <label htmlFor="type" className="itemKey">
                  Type:
                </label>
                <input
                  className="itemValue"
                  id="type"
                  value={editInputs.type}
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
                <label htmlFor="address" className="itemKey">
                  Address:
                </label>
                <input
                  className="itemValue"
                  id="address"
                  value={editInputs.address}
                  onChange={handleEdit}
                />
              </div>
              <div className="detailItem">
                <label htmlFor="distance" className="itemKey">
                  Distance from the capital:
                </label>
                <input
                  className="itemValue"
                  id="distance"
                  value={editInputs.distance}
                  onChange={handleEdit}
                />
              </div>
              <div className="detailItem">
                <label htmlFor="cheapestPrice" className="itemKey">
                  Cheapest price:
                </label>
                <input
                  className="itemValue"
                  id="cheapestPrice"
                  value={editInputs.cheapestPrice}
                  onChange={handleEdit}
                />
              </div>
              <div className="detailItem">
                <label htmlFor="featured" className="itemKey">
                  Featured:
                </label>
                <select
                  className="itemValue"
                  id="featured"
                  onClick={handleEdit}
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>
            </div>
            <div className="submitButton">
              <button type="submit">Update</button>
            </div>
            <Close
              className="editIconClose"
              onClick={() => {
                setOpenEditModal(!openEditModal);
              }}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default EditHotel;
