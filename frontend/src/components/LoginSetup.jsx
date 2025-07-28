import React, { useState } from "react";

const LoginSetup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <p>Username: {username}</p>
      <p>Password: {password}</p>
    </div>
  );
};

export default LoginSetup;