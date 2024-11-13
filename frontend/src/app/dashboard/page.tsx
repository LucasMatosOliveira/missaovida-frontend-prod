"use client";

import { useState, useEffect, useMemo, ReactNode, useRef } from "react";
import { useSession } from "next-auth/react";
import { PageLayout } from "@/components/ui/Page";
import { AppRoutes } from "@/commom/http/app-routes";
import { useRouter } from "next/navigation";
import { useSpinner } from "@/contexts/SpinnerContext";
import { addTab, tabsState } from "@/store/tabs";
import { createFakeTempGUID } from "@/commom/primitives/guid";
import { DashboardGrid } from "@/components/domains/dashboard";
import { InternoInsalt } from "@/components/domains/formulario";
import { useSnapshot } from "valtio";

export default function Dashboard(){
    const { showSpinner, hideSpinner } = useSpinner();
    const { data: session, status} = useSession();
    const id = useMemo(() => createFakeTempGUID(), []);
    const router = useRouter();
    const hasDefaultTabCreated = useRef(false);

    const snapshot = useSnapshot(tabsState);

    useEffect(() => {
        if (status === "loading") {
            showSpinner();
        } else {
            hideSpinner();
            if (!session) {
                router.push(AppRoutes.Login());
            }
        }

        console.log(session?.user)
    }, [session, status, router, showSpinner, hideSpinner]);

    const newTab = ({ content, title = "Novo Interno", isDefault = false, idInterno}: {
        content: ReactNode; title?: string; isDefault?: boolean; idInterno?: string;}) => {
        const newId = id.next();
        addTab(newId, title, content, isDefault);
    };

    useEffect(() => {
        console.log("Status da sessão:", session);
        console.log("Abas existentes:", snapshot.tabs);
        if (session && !hasDefaultTabCreated.current) {
            const hasDefaultTab = snapshot.tabs.some(tab => tab.isDefault);
            console.log("Já existe aba padrão:", hasDefaultTab);
            if (!hasDefaultTab) {
                console.log("Criando nova aba padrão");
                const defaultContent = (
                    <DashboardGrid
                        newTab={(idInterno, title) =>
                            newTab({ content: <InternoInsalt idInterno={idInterno} />, title: title })
                        }
                    />
                );
                newTab({ content: defaultContent, title: "Internos", isDefault: true });
                hasDefaultTabCreated.current = true;
            }
        }
    }, [session, snapshot.tabs]);

    const activeTab = snapshot.tabs.find(tab => tab.id === snapshot.activeTabId);
    const pageTitle = activeTab?.isDefault ? "Dashboard" : "Cadastro";

    return (
        <PageLayout title={pageTitle}>

        </PageLayout>
    );
};