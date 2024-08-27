import { title } from "process";
import { create } from "zustand";

export type ElementType = {
  id: string;
  pos: { row: number; col: number };
  submitUrl?: string;
  acceptedValues?: Array<string>;
};

export type TabType = {
  title: string;
  // pos: number;
  dsbldTab: boolean;
  dsbldElements: boolean;
  columns?: number;
  elements?: Record<string, ElementType>;
};

type SettingsType = {
  title: string;
  tabs?: Record<string, TabType>;
};

interface storeType {
  settings: SettingsType;
}

export const useStore = create<storeType>((set) => ({
  settings: {
    title: "Создать тикет",
    tabs: {
      tab1: {
        title: "Приёмка",
        // pos: 0,
        dsbldTab: false,
        dsbldElements: false,
        columns: 0,
        elements: {
          element1: {
            id: "inpt-email",
            pos: { row: 0, col: 0 },
          },
          element2: {
            id: "inpt-fio",
            pos: { row: 1, col: 0 },
          },
          element3: {
            id: "inpt-phone",
            pos: { row: 2, col: 0 },
          },
          element4: {
            id: "combBox-type",
            pos: { row: 0, col: 1 },
          },
          element5: {
            id: "combBox-vendor",
            pos: { row: 2, col: 1 },
          },
          element6: {
            id: "combBox-model",
            pos: { row: 3, col: 1 },
          },
          element7: {
            id: "inpt-serial",
            pos: { row: 4, col: 1 },
          },
          element8: {
            id: "inptBig-description",
            pos: { row: 5, col: 1 },
          },
          element9: {
            id: "inptBig-comment",
            pos: { row: 6, col: 1 },
          },
          element10: {
            id: "btnSubmit-1",
            pos: { row: 8, col: 1 },
            acceptedValues: [
              "inpt-email",
              "inpt-fio",
              "inpt-phone",
              "combBox-type",
              "combBox-vendor",
              "combBox-model",
              "inpt-serial",
              "inptBig-description",
              "inptBig-comment",
            ],
            submitUrl: "https://chet-tam.com",
          },
        },
      },
      tab2: {
        title: "Диагностика",
        // pos: 2,
        dsbldTab: true,
        dsbldElements: false,
      },
      tab3: {
        title: "Проценка",
        // pos: 3,
        dsbldTab: true,
        dsbldElements: false,
      },
    },
  },
  // addTab: (title) => set(state => {})
}));
