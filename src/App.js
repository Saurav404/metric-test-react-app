import logo from "./logo.svg";
import "./App.css";
import Analytics from "analytics";
import Perfume from "perfume.js";
import perfumePlugin from "@analytics/perfumejs";
import axios from "axios";
console.log("perfume", Perfume);

const analytics = Analytics({
  app: "sample-react-app",
  plugins: [
    {
      name: "test-plugin",
      track: ({ payload }) => {
        console.log(payload);
        sendMessage(payload);
      },
    },
    perfumePlugin({
      perfume: Perfume,
    }),
  ],
});

function App() {
  return (
    <div className="navbar">
      <div className="container">
        <div className="left">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          <span>Homepage</span>
          <span>Series</span>
          <span>Movies</span>
          <span>New and Popular</span>
          <span>My List</span>
        </div>
        <div className="right">
          <span>KID</span>

          <img
            src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          />
          <div className="profile">
            <div className="options">
              <span>Settings</span>
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
async function sendMessage(payload) {
  const headers = {
    "Content-type": "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_HOSTEDHOOKS_API_KEY}`,
  };
  axios
    .post(
      `https://www.hostedhooks.com/api/v1/apps/${process.env.REACT_APP_APP_ID}/messages`,
      {
        data: {
          user: {
            id: "1337",
            notes: "The event",
          },
          event_details: payload,
          about_event: "this is result",
        },
        version: "1.0",
        event_type: "metric.event",
      },
      { headers }
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}
