import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
  background-color: #282c34;
  padding: 20px;
  color: white;
  text-align: center;
  min-height: 30px;
`;

const Title = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 24px;
  align-items: center;
  gap: 42px;
  & > h1 {
    font-size: 24px;
    margin: 0;
  }
`;

const StyledButton = styled.button`
  width: 100px;
  height: fit-content;
  padding: 5px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

function Header({ userName, onLogout }) {
  const handleLogout = () => {
    onLogout();
  };

  return (
    <HeaderContainer>
      {userName && (
        <Title>
          <h1>{userName}</h1>
          <StyledButton onClick={handleLogout}>Log out</StyledButton>
        </Title>
      )}
    </HeaderContainer>
  );
}

export default Header;
