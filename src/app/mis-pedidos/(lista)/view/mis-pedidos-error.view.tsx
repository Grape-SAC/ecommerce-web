'use client';

import { LoadingPage } from "@/components/ui/loading-page/loading-page";
import { ApiResponseError } from "@/shared/types/api-response-error";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function MisPedidosErrorView({ error }: { error: ApiResponseError }) {
    const router = useRouter();

    useEffect(() => {
        console.log("MisPedidosErrorView ERROR:", error);

        if (error.code === 401) {
            router.replace(`/iniciar-sesion?next=/mis-pedidos`);
        }
    }, [error, router]);

    return <LoadingPage />;
}
