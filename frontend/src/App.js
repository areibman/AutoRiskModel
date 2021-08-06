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
  const [accData, setAccData] = useState(data);
  const [velData, setVelData] = useState(data);
  const [accelX, setAccelX] = useState(0);
  const [accelY, setAccelY] = useState(0);
  const [accelZ, setAccelZ] = useState(0);
  const [angularVelX, setAngularVelX] = useState(0);
  const [angularVelY, setAngularVelY] = useState(0);
  const [angularVelZ, setAngularVelZ] = useState(0);
  const [roadQuality, setRoadQuality] = useState(1);
  const [incr, setIncr] = useState(0);
  const [risk, setRisk] = useState(0);

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
      setAccelX(tel[incr]["acceleration_x"]);
      setAccelY(tel[incr]["acceleration_y"]);
      setAccelZ(tel[incr]["acceleration_z"]);
      setAngularVelX(tel[incr]["angular_velocity_x"]);
      setAngularVelY(tel[incr]["angular_velocity_y"]);
      setAngularVelZ(tel[incr]["angular_velocity_z"]);
      setRoadQuality(tel[incr]["QUALITY"] === "good" ? 1 : 0);

      const base = 7.32;
      const rqBeta = 0.5;
      const leftBeta = -5;
      const rightBeta = -3.1;
      const sharpRight = angularVelZ > 0.75 ? 1 : 0;
      const sharpLeft = angularVelZ > 0.25 ? 1 : 0;

      setRisk(
        (risk +
          base +
          rqBeta * roadQuality +
          leftBeta * sharpLeft +
          rightBeta * sharpRight) /
          (incr + 1)
      );

      const len = accData["labels"].length;
      setAccData({
        labels: accData["labels"].concat(len),
        datasets: [
          {
            label: "Accel. X",
            data: [
              ...accData["datasets"][0]["data"],
              { x: len, y: tel[incr]["acceleration_x"] },
            ],
            borderColor: "rgb(0,255,0)",
            backgroundColor: "rgb(0,255,0)",
          },
          {
            label: "Accel. Y",
            data: [
              ...accData["datasets"][1]["data"],
              { x: len, y: tel[incr]["acceleration_y"] },
            ],
            borderColor: "rgb(255,0,0)",
            backgroundColor: "rgb(255,0,0)",
          },
          {
            label: "Accel. Z",
            data: [
              ...accData["datasets"][2]["data"],
              { x: len, y: tel[incr]["acceleration_z"] },
            ],
            borderColor: "rgba(0, 0, 255)",
            backgroundColor: "rgba(0, 0, 255)",
          },
        ],
      });

      setVelData({
        labels: accData["labels"].concat(len),
        datasets: [
          {
            label: "Angular Vel. X",
            data: [
              ...velData["datasets"][0]["data"],
              { x: len, y: tel[incr]["angular_velocity_x"] },
            ],
            borderColor: "rgba(255, 0, 255)",
            backgroundColor: "rgba(255, 0, 255)",
          },
          {
            label: "Angular Vel. Y",
            data: [
              ...velData["datasets"][1]["data"],
              { x: len, y: tel[incr]["angular_velocity_y"] },
            ],
            borderColor: "rgba(0, 255, 255)",
            backgroundColor: "rgba(0, 255, 255)",
          },
          {
            label: "Angular Vel. Z",
            data: [
              ...velData["datasets"][2]["data"],
              { x: len, y: tel[incr]["angular_velocity_z"] },
            ],
            borderColor: "rgba(255, 155, 125)",
            backgroundColor: "rgba(255, 155, 125)",
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
            <VideoBox isGood={roadQuality} />
            <Graph right={accelX} left={accelY} damage={roadQuality} />
          </Col>
          <Col>
            <Score
              roadQuality={roadQuality}
              left={accelY}
              right={accelX}
              score={risk}
            />

            <FlowModel data={accData} />
            <FlowModel data={velData} />
          </Col>
        </Mid>
      </header>
    </div>
  );
}

export default App;
