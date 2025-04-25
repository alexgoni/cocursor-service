import { app } from '@/utils/firebase';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';

export const signUp = async ({
  nickname,
  email,
  password,
}: {
  nickname: string;
  email: string;
  password: string;
}) => {
  try {
    const auth = getAuth(app);

    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, {
      displayName: nickname,
    });
  } catch (error) {
    console.error('signUp 함수에서 오류 발생:', error);
    throw error;
  }
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const auth = getAuth(app);

    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error('login 함수에서 오류 발생:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const auth = getAuth(app);

    await signOut(auth);
  } catch (error) {
    console.error('logout 함수에서 오류 발생:', error);
    throw error;
  }
};
