import React from "react";
import { Line } from "react-chartjs-2";
import { Card } from "./Card";
import styled from "styled-components";
import { defaults } from "react-chartjs-2";
defaults.animation = false;

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
