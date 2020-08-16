import React, {useEffect, useState} from 'react';
import LoginComponent from './components/LoginComponent/LoginComponent';
import TodoComponent from './components/TodoComponent/TodoComponent';

function App() {
  const [loggedin, setLoggedin] = useState(false);
  const [username, setUsername] = useState('');

  const onUsernameSubmit = (user: string) => {
    localStorage.setItem('username', user);
    setUsername(user);
    setLoggedin(true);
  };

  useEffect(() => {
    let username = localStorage.getItem('username');
    if (username) {
      setLoggedin(true);
      setUsername(username);
    }
  }, []);

  return (
    <>
      {loggedin ? <TodoComponent username={username}/> :
        <LoginComponent onUsernameSubmit={onUsernameSubmit}/>}
    </>
  );
}

export default App;
