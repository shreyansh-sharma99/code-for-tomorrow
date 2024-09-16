import React, { useState } from "react";
import { Provider } from "react-redux";
import styled from "styled-components";
import store from "./store";
import PostList from "./PostList";
import Box from "./Box";
import SideBar from "./SideBar";

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  margin: 0;
  font-family: Arial, sans-serif;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 1.5rem;
  background-color: #f4f4f4;
  display: flex;
  flex-direction: column;
`;

const App = () => {
  const [viewMode, setViewMode] = useState("box"); // Default view mode

  const handleViewChange = (mode) => {
    setViewMode(mode);
  };

  return (
    <Provider store={store}>
      <AppContainer>
        <SideBar onViewChange={handleViewChange} />
        <MainContent>
          {viewMode === "box" && <Box />}
          {viewMode === "list" && <PostList />}
        </MainContent>
      </AppContainer>
    </Provider>
  );
};

export default App;
