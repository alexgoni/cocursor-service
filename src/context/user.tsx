'use client';

import { app } from '@/utils/firebase';
import { type User, getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

interface UserContextType {
  user: User | null;
  authReady: boolean;
}

const UserContext = createContext<UserContextType | null>(null);

export function useUserContext() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('User 컨텍스트를 호출할 수 없는 범위입니다.');
  }

  return context;
}

export default function UserProvider({ children }: { children: ReactNode }) {
  const auth = getAuth(app);
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setAuthReady(true);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <UserContext.Provider value={{ user, authReady }}>
      {children}
    </UserContext.Provider>
  );
}
