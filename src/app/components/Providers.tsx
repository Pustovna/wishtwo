"use client";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Providers({session, children }: {session: any, children: React.ReactNode }) {
  return (
    <>
    <SessionProvider session={session}>
      {children}
      <ToastContainer position="bottom-right" hideProgressBar />
    </SessionProvider>
    </>
  );
}
