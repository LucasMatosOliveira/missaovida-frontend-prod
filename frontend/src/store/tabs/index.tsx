import { ReactNode } from 'react';
import { proxy } from 'valtio';

export interface MenuTabs {
    activeTabId: string;
    tabs: TabData[];
  }

  export interface TabData {
    id: string;
    title: string;
    display: 'd-none' | 'block';
    isDefault: boolean;
    props?: ReactNode;
  }

  export const tabsState = proxy<MenuTabs>({
    activeTabId: '',
    tabs: [],
  });

  export const setActiveTab = (id: string) => {
    if (tabsState.tabs.some(tab => tab.id === id)) {
        tabsState.activeTabId = id;

        tabsState.tabs.forEach(tab => {
            tab.display = tab.id === id ? 'block' : 'd-none';
        });
    }
};

export const addTab = (id: string, title: string, component: ReactNode, isDefault: boolean = false) => {
    if (!tabsState.tabs.some(tab => tab.id === id)) {
        tabsState.tabs.push({ id, title, props: component, isDefault, display: 'block' });
        tabsState.activeTabId = id;
    }
}

export const closeTab = (id: string) => {
    const tabToClose = tabsState.tabs.find(tab => tab.id === id);

    if (tabToClose?.isDefault) {
        alert("Você não pode remover a aba padrão.");
        return;
    }

    tabsState.tabs = tabsState.tabs.filter(tab => tab.id !== id);

    if (tabsState.activeTabId === id && tabsState.tabs.length > 0) {
        setActiveTab(tabsState.tabs[0].id);
    } else if (tabsState.tabs.length === 0) {
        tabsState.activeTabId = '';
    }
};