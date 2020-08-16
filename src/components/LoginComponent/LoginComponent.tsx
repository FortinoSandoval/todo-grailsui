import React, {ChangeEvent, FormEvent, useState} from 'react';

import styles from './LoginForm.module.scss';

type LoginProps = {
  onUsernameSubmit: ((username: string) => void)
}
const LoginComponent = ({onUsernameSubmit}: LoginProps) => {
  const [user, setUser] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser(event.target.value)
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (user) {
      onUsernameSubmit(user);
    }
  };

  return (
    <div className={styles.loginFormContainer}>
      <form onSubmit={handleSubmit}>
        <label className={styles.usernameLabel}>
          Username:
          <input type="text" value={user}
                 onChange={handleChange}
                 placeholder={'Please enter your username'}
                 className={styles.usernameInput}/>
        </label>
        <input type="submit" value="Login" className={styles.submitBtn}/>
      </form>
    </div>
  )
};

export default LoginComponent;
