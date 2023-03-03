import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";

const List = ({ columns, item }) => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainerAdmin">
        <Navbar />
        <Datatable columns={columns} item={item} />
      </div>
    </div>
  );
};

export default List;
