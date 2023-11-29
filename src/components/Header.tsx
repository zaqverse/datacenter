import React, { useState } from 'react';
import { auth, googleProvider } from '../firebaseConfig';
import { signInWithPopup, signOut } from 'firebase/auth';
import {} from 'prop-types';
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  layout: {
    padding: '10px 0',
    textAlign: 'right',
  },
});

const Header = () => {
  const classes = useStyles();
  const [userState, setUserState] = useState<undefined | string>()

  const handleLogin = async () => {
    const { user: { email } } = await signInWithPopup(auth, googleProvider);
    setUserState(email || '')
  }

  const handleLogout = async () => {
    await signOut(auth);
    setUserState(undefined);
    // sessionStorage.removeItem("user");
  };

  return (
    <div className={classes.layout}>
      {userState ? <Button onClick={handleLogout}>logout</Button> : <Button onClick={handleLogin}>Login</Button>}
    </div>);
}

export default Header;
