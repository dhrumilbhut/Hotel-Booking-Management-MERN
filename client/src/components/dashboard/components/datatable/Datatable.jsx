import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { API_URL } from "../../../../API_URL";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [list, setList] = useState([]);
  const { data } = useFetch(`/${path}`);

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id) => {
    if (path === "rooms") {
      const { data } = await axios.get(`${API_URL}/hotels`);

      let hotelId = [];

      data.forEach((hotel) => {
        const isRoomPresent = hotel.rooms.some((roomid) => roomid === id);
        if (isRoomPresent) {
          // return hotel._id
          hotelId.push(hotel._id);
        }
      });

      console.log(hotelId);

      try {
        await Promise.all(
          hotelId.map(async (hotel_id) => {
            await axios.delete(`${API_URL}/rooms/${id}/${hotel_id}`);
          })
        );
        setList(list.filter((item) => item._id !== id));
      } catch (err) {
        console.log(err);
      }
    }
    try {
      await axios.delete(`${API_URL}/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (err) {
      console.log(err.message);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/dashboard/${path}/${params.row._id}`} className="link">
              <button className="viewButton">View</button>
            </Link>

            <button
              className="deleteButton"
              onClick={() => {
                handleDelete(params.row._id);
              }}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/dashboard/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;
