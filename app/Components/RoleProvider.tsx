"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface RoleContextType {
  role: string | null;
  isEmployer: boolean;
  isTalent: boolean;
  loading: boolean;
}

const RoleContext = createContext<RoleContextType>({
  role: null,
  isEmployer: false,
  isTalent: false,
  loading: true,
});

export function useRole() {
  return useContext(RoleContext);
}

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRole() {
      if (status === "loading") {
        return;
      }

      if (!session?.user) {
        setRole(null);
        setLoading(false);
        return;
      }

      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const userId = (session.user as any)?.id;
        if (!userId) {
          setLoading(false);
          return;
        }

        const response = await fetch(`/api/user/role?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          setRole(data.role);
        }
      } catch (error) {
        console.error("Error fetching role:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRole();
  }, [session, status]);

  const value: RoleContextType = {
    role,
    isEmployer: role === "employer",
    isTalent: role === "talent",
    loading,
  };

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}
