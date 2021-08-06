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

export const VideoBox = () => {
  return (
    <Container>
      <Card>
        <Video src={vid} autoPlay muted type="video/mp4"></Video>
      </Card>
    </Container>
  );
};
