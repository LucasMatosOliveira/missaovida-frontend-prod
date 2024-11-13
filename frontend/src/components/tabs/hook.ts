import { useState } from "react";

export function useTabs(args: { initalTab: string }) {
    const [currentTab, setCurrentTab] = useState<string>(args.initalTab);
    const setTabActive = (tabId: string) => setCurrentTab(tabId);
    const isTabActive = (tabId: string) => tabId === currentTab;

    return {
        setTabActive,
        isTabActive
    };
}

export function setTabSufix<T extends Record<string, string>>(abas: T): T {

    const sufix = new Date().getTime();

    for (const key in abas) {
        abas[key] = (abas[key] + '-' + sufix) as any;
    }

    return abas;
}