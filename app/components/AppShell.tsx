import type { ReactNode } from "react";
import Sidebar from "./Sidebar";

type AppShellProps = {
  children: ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  return (
    <>
      <Sidebar />

      <div
        style={{
          marginLeft: 240,
          minHeight: "100vh",
        }}
      >
        {children}
      </div>
    </>
  );
}