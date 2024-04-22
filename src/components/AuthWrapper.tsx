
import React, { ReactNode,useEffect, useState } from 'react';
import AuthForm from './AuthForm';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase';

interface AuthWrapperProps {
  children: ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? <>{children}</> : <AuthForm />;
};

export default AuthWrapper;
