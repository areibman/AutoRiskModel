import "./App.css";
import { Header } from "./Header";
import { VideoBox } from "./VideoBox";
import { Graph } from "./Graph";
import styled from "styled-components";
import { FlowModel } from "./FlowModel";
import { Score } from "./Score";
import { telemetry } from "./telemetry";
import { useEffect, useState } from "react";

const Mid = styled.div`
  display: flex;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

var data = {
  labels: [],
  datasets: [
    {
      label: "X",
      data: [],
      borderColor: "rgb(0,255,0)",
      backgroundColor: "rgb(0,255,0)",
    },
    {
      label: "Y",
      data: [],
      borderColor: "rgb(255,0,0)",
      backgroundColor: "rgb(255,0,0)",
    },
    {
      label: "Z",
      data: [],
      borderColor: "rgba(0, 0, 255)",
      backgroundColor: "rgba(0, 0, 255)",
    },
  ],
};

function App() {
  const [timeData, setTimeData] = useState(data);
  const [right, setRight] = useState(2);
  const [left, setLeft] = useState(2);
  const [roadQuality, setRoadQuality] = useState(1);
  const [incr, setIncr] = useState(0);

  const tel = Object.values(telemetry).sort((a, b) => {
    const cleanA = parseInt(a[0].split(".jpg")[0].split("frame")[1]);
    const cleanB = parseInt(b[0].split(".jpg")[0].split("frame")[1]);
    if (cleanA < cleanB) {
      return -1;
    }
    if (cleanA > cleanB) {
      return 1;
    }
    return 1;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(tel[incr]);
      setIncr(incr + 1);
      setRight(tel[incr]["acceleration_x"]);
      setLeft(tel[incr]["acceleration_x"]);
      setRoadQuality(tel[incr]["QUALITY"] === "good" ? 1 : 0);

      const len = timeData["labels"].length;
      setTimeData({
        labels: timeData["labels"].concat(len),
        datasets: [
          {
            label: "X",
            data: [
              ...timeData["datasets"][0]["data"],
              { x: len, y: tel[incr]["acceleration_x"] },
            ],
            borderColor: "rgb(0,255,0)",
            backgroundColor: "rgb(0,255,0)",
          },
          {
            label: "Y",
            data: [
              ...timeData["datasets"][1]["data"],
              { x: len, y: tel[incr]["acceleration_y"] },
            ],
            borderColor: "rgb(255,0,0)",
            backgroundColor: "rgb(255,0,0)",
          },
          {
            label: "Z",
            data: [
              ...timeData["datasets"][2]["data"],
              { x: len, y: tel[incr]["acceleration_x"] },
            ],
            borderColor: "rgba(0, 0, 255)",
            backgroundColor: "rgba(0, 0, 255)",
          },
        ],
      });
    }, 30 / 1000);
    return () => clearInterval(interval);
  }, [incr]);

  return (
    <div>
      <header className="App-header">
        <Header />
        <Mid>
          <Col>
            <VideoBox />
            <Score roadQuality={roadQuality} left={left} right={right} />
          </Col>
          <Col>
            <Graph right={right} left={left} damage={roadQuality} />
            <FlowModel data={timeData} />
          </Col>
        </Mid>
      </header>
    </div>
  );
}

export default App;
