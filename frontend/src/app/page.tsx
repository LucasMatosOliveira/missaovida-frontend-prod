'use client'
import { useRouter } from "next/navigation";
import { AppRoutes } from "@/commom/http/app-routes";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Home() {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (!session) {
        router.push(AppRoutes.Login());
      }
    }, [session, router]);

    return null;
}
