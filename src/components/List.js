import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "./Card";
import styled from "styled-components";
import { RiAddLine } from "react-icons/ri";

const StyledLink = styled(Link)`
  position: fixed;
  bottom: 80px;
  right: 80px;
  border-radius: 50px;
  width: 90px;
  height: 90px;
  box-shadow: 10px 10px 10px #ccc;
  text-decoration: none;
  background-color: #fff;
  z-index: 999;
  color: #ddd;
  font-size: 80px;
  transition: 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #eee;
    color: #fff;
  }
  &:active {
    background-color: #fff;
    color: #ddd;
  }
`;

const List = () => {
  const data = useSelector((state) => state.words.words);
  const words = data.map((word) => <Card word={word} key={word.id} />);
  return (
    <>
      <StyledLink to="/addword">
        <RiAddLine />
      </StyledLink>
      {words}
    </>
  );
};

export default List;
