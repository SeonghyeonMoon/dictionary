import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadFB } from "./redux/modules/words";
import AddWord from "./components/AddWord";
import List from "./components/List";
import UpdateWord from "./components/UpdateWord";
import styled from "styled-components";
import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  ${reset}

  html, body {
    height: 100%;
    font-family: 'Noto Sans KR', sans-serif;
    background-color: #eee;
  }
`;

const Loading = styled.h1`
  position: fixed;
  top: -300px;
  left: 0;
  width: 100vw;
  height: 120vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eee;
  color: #999;
  font-size: 50px;
`;

const StyledApp = styled.div`
  padding: 50px;
`;

const Header = styled.h1`
  margin-left: 30%;
  font-size: 45px;
  font-weight: bold;
  color: #999;
  margin-top: 20px;
  margin-bottom: 80px;
`;

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadFB());
  }, [dispatch]);
  const data = useSelector((state) => state.words.status);
  if (data === "loading") {
    return <Loading>Loading...</Loading>;
  }
  return (
    <>
      <GlobalStyle />
      <StyledApp>
        <Header>My Dictionary</Header>
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/addword" element={<AddWord />} />
          <Route path="/updateword" element={<UpdateWord />} />
        </Routes>
      </StyledApp>
    </>
  );
}

export default App;
