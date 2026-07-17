import type { ReactNode } from "react";
import Sidebar from "./Sidebar";

type AppShellProps = {
  children: ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  return (
    <>
      <Sidebar />

      <main
        style={{
          marginLeft: 240,
          padding: 32,
          minHeight: "100vh",
        }}
      >
        {children}
      </main>
    </>
  );
}
