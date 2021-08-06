import styled from "styled-components";
import { Card } from "./Card";
import lula from "./lulalogo.png";
import { Button } from "./Button";

const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  align-items: center;
`;

const Word = styled.div`
  font-size: 3em;
  font-weight: bold;
`;

export const Header = () => {
  return (
    <Card>
      {
        <Title>
          {<img src={lula} style={{ height: "5em" }} />}
          {<Word>Eyes on the Road</Word>}
          {<Button>Made with ❤️ at Miami Hack Week</Button>}
        </Title>
      }
    </Card>
  );
};
