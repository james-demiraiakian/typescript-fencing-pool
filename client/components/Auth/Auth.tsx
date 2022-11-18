import React, { useEffect, useState } from 'react';
import { useUser } from '../../Context/UserContext';

export default function Auth() {
  const [authType, setAuthType] = useState('');

  useEffect(() => {
    console.log(authType);
  }, [authType]);

  return (
    <div>
      {authType !== 'sign-in' ? (
        <button onClick={() => setAuthType('sign-in')}>
          Sign In
        </button>
      ) : (
        <>
          <input placeholder="Email" />
          <input placeholder="Password" />
        </>
      )}
      {authType !== 'register' ? (
        <button onClick={() => setAuthType('register')}>
          Register
        </button>
      ) : (
        <form>
          <input placeholder="Email" />
          <input placeholder="Password" />
          <input placeholder="Name" />
        </form>
      )}
      Auth
    </div>
  );
}
