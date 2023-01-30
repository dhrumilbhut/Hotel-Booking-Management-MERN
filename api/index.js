import app from "./app.js";
import connect from "./config/db.js";

app.listen(8800, () => {
  connect();
  console.log("connected to backend.");
});
