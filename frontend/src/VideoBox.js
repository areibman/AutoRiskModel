import styled from "styled-components";
import { Card } from "./Card";
import lula from "./lulalogo.png";
import { Button } from "./Button";
import vid from "./vid.mp4";

const Video = styled.video`
  width: 100%;
`;

const Container = styled.div`
  width: 50vw;
`;

const Quality = styled.div`
  position: relative;
  display: flex;
  font-size: 1.25em;
  border: solid 1px ${(props) => (props.good ? "green" : "red")};
  justify-content: center;
  align-items: center;
  color: ${(props) => (props.good ? "green" : "red")};
`;

export const VideoBox = ({ isGood }) => {
  return (
    <Container>
      <Card>
        <Video src={vid} autoPlay muted type="video/mp4"></Video>
        <Quality good={isGood}>
          {isGood ? "Good Road Conditions" : "Bad Road Conditions"}
        </Quality>
      </Card>
    </Container>
  );
};
