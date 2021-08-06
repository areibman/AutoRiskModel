import styled from "styled-components";
import { Card } from "./Card";
import model from "./model.png";
import RotateRightIcon from "@material-ui/icons/RotateRight";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import WarningIcon from "@material-ui/icons/Warning";
import CachedIcon from "@material-ui/icons/Cached";
import { green, red } from "@material-ui/core/colors";

const Container = styled.div`
  width: 50vw;
`;

const Result = styled(CachedIcon)`
  position: relative;
  bottom: 130px;
  right: 55px;
  z-index: 100;
`;

const Damage = styled(WarningIcon)`
  position: relative;
  bottom: 135px;
  right: 520px;
  z-index: 100;
`;

const Right = styled(RotateRightIcon)`
  position: relative;
  bottom: 255px;
  right: 522px;
  z-index: 100;
`;

const Left = styled(RotateLeftIcon)`
  position: relative;
  bottom: 20px;
  right: 552px;
  z-index: 100;
`;

export const Graph = ({ right, left, damage, result }) => {
  return (
    <Container>
      <Card>
        <img src={model} alt="" />
        <Result
          fontSize={"large"}
          style={result > 0 ? { color: green[500] } : { color: red[500] }}
        ></Result>
        <Damage
          fontSize={"large"}
          style={damage > 0 ? { color: green[500] } : { color: red[500] }}
        ></Damage>
        <Right
          fontSize={"large"}
          style={right > 0 ? { color: green[500] } : { color: red[500] }}
        ></Right>
        <Left
          fontSize={"large"}
          style={left > 0 ? { color: green[500] } : { color: red[500] }}
        ></Left>
      </Card>
    </Container>
  );
};
