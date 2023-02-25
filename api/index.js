import app from "./app.js";
import connect from "./config/db.js";

app.listen(3001, () => {
  connect();
  console.log("connected to backend.");
});
