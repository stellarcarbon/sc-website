"use client";

import Drawer from "./components/Drawer";
import TopBar from "./components/TopBar";
import { useAppContext } from "./context/appContext";

export default function App({ children }: { children: React.ReactNode }) {
  const { isDrawerOpen } = useAppContext();

  if (isDrawerOpen) {
    return <Drawer />;
  }

  return (
    <>
      <TopBar />
      {children}
    </>
  );
}
