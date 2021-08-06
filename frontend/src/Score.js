import { MathComponent } from "mathjax-react";
import { Card } from "./Card";
import styled from "styled-components";

const Total = styled.div`
  font-weight: bold;
  font-size: 1.5em;
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Score = ({ roadQuality, left, right, score }) => {
  return (
    <Container>
      <Card>
        <MathComponent
          tex={
            String.raw`\hat{y} = \beta_{\text{base risk}} + \beta_{\text{road quality}}(` +
            roadQuality +
            String.raw`) + \beta_{\text{hard left}}(` +
            left +
            String.raw`) + \beta_{\text{hard right}}(` +
            right +
            `)`
          }
        />
        <Total>Risk Score:</Total>
        <Total>{score}</Total>
      </Card>
    </Container>
  );
};
