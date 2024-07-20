import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  flex-direction: column;
`;

const Form = styled.form`
  width: 400px;
  display: flex;
  flex-direction: column;
  padding: 30px 40px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  margin: 10px 0 5px;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #282c34;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #444;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://bever-aca-assignment.azurewebsites.net/users")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data) {
          setUsers(data.value);
        } else {
          setError("Invalid credentials");
        }
      })
      .catch((error) => {
        setError("An error occurred: " + error.message);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    let isLoginTrue = false;

    for (let i = 0; i < users.length; i++) {
      if (users[i].Name === username && users[i].Password === password) {
        console.log(users[i].Name);
        isLoginTrue = true;
        onLogin(users[i].UserId, users[i].Name);
        break;
      }
    }
    if (!isLoginTrue) {
      setError("Invalid username or password");
    }
  };

  return (
    <Container>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Label>Username:</Label>
        <Input
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setError("");
          }}
        />
        <Label>Password:</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
        />
        <Button type="submit">Login</Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Form>
    </Container>
  );
}

export default LoginPage;
