import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex justify-center flex-row items-center h-screen  bg-zinc-900">
      {children}
    </main>
  );
}
