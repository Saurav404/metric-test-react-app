import logo from "./logo.svg";
import "./App.css";
import Perfume from "perfume.js";
import axios from "axios";

const perfume = new Perfume({
  analyticsTracker: async (options) => {
    const { attribution, metricName, data, navigatorInformation, rating } =
      options;
    switch (metricName) {
      case "navigationTiming":
        if (data && data.timeToFirstByte) {
          await sendMessage("navigationTiming", data);
          console.log(data);
        }
        break;
      case "networkInformation":
        if (data && data.effectiveType) {
          await sendMessage("networkInformation", data);
          console.log(data);
        }
        break;
      case "storageEstimate":
        await sendMessage("storageEstimate", data);
        console.log(data);
        break;
      case "TTFB":
        await sendMessage("timeToFirstByte", { duration: data });
        console.log({ duration: data });
        break;
      case "RT":
        await sendMessage("redirectTime", { duration: data });
        console.log({ duration: data });
        break;
      case "FCP":
        await sendMessage("firstContentfulPaint", { duration: data });
        console.log({ duration: data });
        break;
      case "FID":
        await sendMessage("firstInputDelay", { duration: data });
        console.log({ duration: data });
        break;
      case "LCP":
        await sendMessage("largestContentfulPaint", { duration: data });
        console.log({ duration: data });
        break;
      case "CLS":
        await sendMessage("cumulativeLayoutShift", { value: data });
        console.log({ duration: data });
        break;
      case "INP":
        await sendMessage("interactionToNextPaint", { value: data });
        console.log({ duration: data });
        break;
      case "TBT":
        await sendMessage("totalBlockingTime", { duration: data });
        console.log({ duration: data });
        break;
      case "elPageTitle":
        await sendMessage("elementTimingPageTitle", { duration: data });
        console.log({ duration: data });
        break;
      default:
        await sendMessage(metricName, { duration: data });
        console.log({ duration: data });
        break;
    }
  },
});

console.log(perfume)
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
async function sendMessage(message, payload) {
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
          about_event: message,
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
