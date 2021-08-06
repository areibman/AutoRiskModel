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

export const Score = ({ roadQuality, left, right }) => {
  const base = 7.32;
  const rqBeta = 0.5;
  const leftBeta = -5;
  const rightBeta = -3.1;

  return (
    <Container>
      <Card>
        <MathComponent
          tex={
            String.raw`\hat{y} = \beta_{\text{base risk}} + \beta_{\text{road quality}}(` +
            roadQuality +
            String.raw`) - \beta_{\text{hard left}}(` +
            left +
            String.raw`)- \beta_{\text{hard right}}(` +
            right +
            `)`
          }
        />
        <Total>
          Risk Score:
          {base + rqBeta * roadQuality + leftBeta * left + rightBeta * right}
        </Total>
      </Card>
    </Container>
  );
};
