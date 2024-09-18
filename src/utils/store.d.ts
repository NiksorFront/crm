export type ElementType = {
    id: string;
    pos: {
        row: number | string;
        col: number | string;
    };
    title?: string;
    titles?: string;
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    valuesOrURLRequestValues?: Array<string> | string;
    dependsOn?: string | boolean;
    submitUrl?: {
        url: string;
        action: string;
    };
    acceptedValues?: Array<string>;
    elementsTabOne?: Record<string, ElementType>;
    elementsTabTwo?: Record<string, ElementType>;
    endpointForRequestDataTable?: string;
    forAddinDataTable?: {
        endpoint: string;
        action: string;
    };
};
export type TabType = {
    title: string;
    activeTab: boolean;
    dsbldTab: boolean;
    columns?: number;
    elements?: Record<string, ElementType>;
};
type SettingsType = {
    title: string;
    tabs?: Record<string, TabType>;
};
interface storeType {
    settings: SettingsType;
    newTabContent: (tabName: string, tabData: TabType) => void;
    newActiveTab: (tabName: string) => void;
    updateTitle: (newTitle: string) => void;
    updateTabTitle: (tabName: string, newTitle: string) => void;
    updateTabColumns: (tabName: string, newColumns: number) => void;
    addNewTab: () => void;
    removeTab: (tabName: string) => void;
    updateElementPos: (tabName: string, elementId: string, newValues: Record<string, {}>) => void;
    updateElement: (tabName: string, elementId: string, newValues: Partial<ElementType>) => void;
    newElement: (tabName: string, elementName: string, elementData: ElementType) => void;
}
export declare const useStore: import("zustand").UseBoundStore<import("zustand").StoreApi<storeType>>;
interface typeDepends {
    typeId: string;
    typeValue: string;
    vendor: string;
    newTypee: (newType: string, newTypeValue: string) => void;
    newVendor: (newVendor: string) => void;
}
export declare const useDepends: import("zustand").UseBoundStore<import("zustand").StoreApi<typeDepends>>;
interface typeUpdate {
    update: boolean;
    updating: () => void;
}
export declare const useCostil: import("zustand").UseBoundStore<import("zustand").StoreApi<typeUpdate>>;
interface typeTableRow {
    row: Record<string, string>;
    updateRowData: (row: Record<string, string>) => void;
}
export declare const useTableRow: import("zustand").UseBoundStore<import("zustand").StoreApi<typeTableRow>>;
export {};
