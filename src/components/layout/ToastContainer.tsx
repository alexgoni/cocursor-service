'use client';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CustomToastContainer() {
  return <ToastContainer autoClose={2500} hideProgressBar newestOnTop />;
}
