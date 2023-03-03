import "./singleRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
// import { host, v } from "../../config/config";
import EditRoom from "../../components/editRoom/EditRoom";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { API_URL } from "../../../../API_URL";

const SingleRoom = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const { data, loading, reFetch } = useFetch(`/rooms/${id}`, {
    credentials: "include",
  });

  // to show editmodal
  const [openEditForm, setOpenEditForm] = useState(false);

  useEffect(() => {
    reFetch();
    // eslint-disable-next-line
  }, [openEditForm]);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="roomDetails">
            <div
              className="editButton"
              onClick={() => setOpenEditForm(!openEditForm)}
            >
              Edit
            </div>
            <h1 className="title">Information</h1>
            <div className="item">
              {loading ? (
                "Loading..."
              ) : (
                <div className="details">
                  <h1 className="itemTitle">{data.title}</h1>
                  <div className="detailItem">
                    <span className="itemKey">Description:</span>
                    <span className="itemValue">{data.desc}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Max People:</span>
                    <span className="itemValue">{data.maxPeople}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Price:</span>
                    <span className="itemValue">{data.price}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Updated :</span>
                    <span className="itemValue">
                      {new Date(data.updatedAt).getMinutes()} mins ago
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Rooms:</span>
                    {data.roomNumbers &&
                      data.roomNumbers.map((room) => (
                        <span
                          className="itemValue"
                          style={{ marginRight: "5px" }}
                        >
                          {room.number},
                        </span>
                      ))}
                  </div>
                  <div className="detailItem">
                    <span className="itemKey" style={{ marginBottom: "10px" }}>
                      Unavailable Dates:
                    </span>
                    {data.roomNumbers &&
                      data.roomNumbers.map((room, index) => (
                        <span className="itemValue" key={index}>
                          {room.unavailableDates.map((date) => (
                            <div key={date}>
                              {format(new Date(date), "do/MMM/yy")}
                            </div>
                          ))}
                        </span>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {openEditForm && (
          <div className="bottom">
            <EditRoom
              roomId={id}
              openEditForm={openEditForm}
              setOpenEditForm={setOpenEditForm}
              data={data}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleRoom;
