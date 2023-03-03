import "./singleUser.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
// import { host, v } from "../../config/config";
import { useEffect, useState } from "react";
import EditUser from "../../components/editUser/EditUser";
import { API_URL } from "../../../../API_URL";

const SingleUser = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const { data, reFetch } = useFetch(`/users/${id}`, {
    credentials: "include",
  });

  // to open and close the edit modal
  const [openEditForm, setOpenEditForm] = useState(false);

  useEffect(() => {
    reFetch();
    // eslint-disable-next-line
  }, [openEditForm]);

  return (
    <div className="singleUser">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div
              className="editButton"
              onClick={() => {
                setOpenEditForm(!openEditForm);
              }}
            >
              Edit
            </div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img src={data.img} alt="avatar" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">{data.username}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{data.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{data.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">City:</span>
                  <span className="itemValue">{data.city}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">{data.country}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Admin:</span>
                  <span className="itemValue">
                    {data.isAdmin ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* edit form */}
        {openEditForm && (
          <div className="bottom">
            <EditUser
              data={data}
              userId={id}
              openEditForm={openEditForm}
              setOpenEditForm={setOpenEditForm}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleUser;
