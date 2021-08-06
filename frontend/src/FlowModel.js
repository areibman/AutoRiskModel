import React from "react";
import { Line } from "react-chartjs-2";
import { Card } from "./Card";
import styled from "styled-components";
import { defaults } from "react-chartjs-2";
defaults.animation = false;
const data = {
  labels: ["1", "2", "3", "4", "5", "6"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgba(255, 99, 132, 0.2)",
    },
    {
      label: "fum of Votes",
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: "rgb(255, 0, 132)",
      borderColor: "rgba(255, 0, 132, 0.2)",
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const Container = styled.div`
  width: 50vw;
`;

export const FlowModel = ({ data }) => {
  return (
    <Container>
      <Card>
        <Line data={data} options={options} height={115} />
      </Card>
    </Container>
  );
};
