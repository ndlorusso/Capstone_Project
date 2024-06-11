import React, { useState } from 'react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

const register = async () => {
  try {
  const response = await fetch('http://localhost:3000/api/users/register', {
    method: 'POST',
    headers: {
        'Content-Type' : 'application/json'
    }, 
    body: JSON.stringify({
        email,
        password
    })
});
  // console.log('response:', response);
  const result = await response.json();
  setMessage(result.message);
  // console.log('result:', result);
  if(!response.ok) {
    throw(result)
  }
  setEmail('');
  setPassword('');
} catch (err) {
  console.error(`${err.name}: ${err.message}`);
}
};

  const handleSubmit = (e) => {
    e.preventDefault();
    register();
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
