"use client";

import { useEffect } from "react";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.setAttribute("data-hydrated", "");
  }, []);

  return <>{children}</>;
}
