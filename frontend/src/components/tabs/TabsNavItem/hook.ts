import { sortAscCriterio } from "@/commom/primitives/arrays";
import { obterValor } from "@/commom/primitives/object";
import { useState, useEffect } from "react";
import { FieldErrors } from "react-hook-form";

export function useTabErros({ context, errors }: UseTabErrosArgs) {

    const [tabsIds, setTabsIds] = useState<Record<string, boolean>>({});
    const errorsMessages = obterErrors(errors);

    useEffect(() => {

        if (!context)
            return;

        setTimeout(() => {
            const result = getTabsWithErrors(context);
            const resultKeys = Object.keys(result).sort((a, b) => sortAscCriterio(a, b)).join("");
            const tabsKeys = Object.keys(tabsIds).sort((a, b) => sortAscCriterio(a, b)).join("");
            if (resultKeys !== tabsKeys)
                setTabsIds(result);
        }, 0);

    }, [errorsMessages]);

    return { tabsIds };
}

export interface UseTabErrosArgs {
    context: HTMLElement | null;
    errors: FieldErrors;
}

const getTabsWithErrors = (form: HTMLElement) => {
    const tabIds: Record<string, boolean> = {};
    const errorElements = form.querySelectorAll(".form-control-feedback.error-message");
    for (const element of Array.from(errorElements)) {
        const tabElement = element.closest(".tab-pane");
        if (!tabElement)
            continue;

        const tabId = tabElement.getAttribute('id') ?? "";
        tabIds[tabId] = true;
    }

    return tabIds;
}

export const obterErrors = (errors: FieldErrors) => {
    return Object.keys(errors).map(key => obterValor(errors, key).message);
}