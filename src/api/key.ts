/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from '@/utils/firebase';
import {
  type Timestamp,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';

export const saveAPIKey = async ({
  uid,
  name,
  apiKey,
  isProduction,
  url,
}: {
  uid: string;
  name: string;
  apiKey: string;
  isProduction: boolean;
  url?: string;
}) => {
  try {
    const apiKeysData: Record<string, any> = {
      name,
      uid,
      isProduction,
      createdAt: serverTimestamp(),
    };
    const usersData: Record<string, any> = {
      name,
      isProduction,
      createdAt: serverTimestamp(),
    };
    if (url) {
      apiKeysData.url = url;
      usersData.url = url;
    }

    await setDoc(doc(db, 'apiKeys', apiKey), apiKeysData);
    await setDoc(doc(db, 'users', uid, 'apiKeys', apiKey), usersData);
  } catch (error) {
    console.error('saveAPIKey 함수에서 오류 발생:', error);
    throw error;
  }
};

export type APIKeyListDTO = {
  id: string;
  isProduction: boolean;
  name: string;
  url?: string;
  createdAt: Timestamp;
}[];

export const getAPIKeyList = async (uid: string): Promise<APIKeyListDTO> => {
  try {
    const apiKeysRef = collection(db, 'users', uid, 'apiKeys');
    const q = query(apiKeysRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    const apiKeys = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<APIKeyListDTO[number], 'id'>),
    }));

    return apiKeys;
  } catch (error) {
    console.error('getAPIKeyList 함수에서 오류 발생:', error);
    throw error;
  }
};

export const deleteAPIKey = async ({
  uid,
  apiKey,
}: {
  uid: string;
  apiKey: string;
}) => {
  try {
    await deleteDoc(doc(db, 'apiKeys', apiKey));
    await deleteDoc(doc(db, 'users', uid, 'apiKeys', apiKey));
  } catch (error) {
    console.error('deleteAPIKey 함수에서 오류 발생:', error);
    throw error;
  }
};
