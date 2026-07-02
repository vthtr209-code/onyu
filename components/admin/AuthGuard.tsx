"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function check() {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setAuthenticated(true);
      } else {
        if (pathname !== "/admin/login") {
          router.replace("/admin/login");
          return;
        }
      }
      setChecked(true);
    }
    check();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
        if (pathname !== "/admin/login") {
          router.replace("/admin/login");
        }
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [router, pathname]);

  // Login page doesn't need auth
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!checked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ivory">
        <p className="text-[14px] text-ink-soft">Loading...</p>
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  return <>{children}</>;
}
