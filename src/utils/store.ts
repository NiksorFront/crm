import { title } from "process";
import { create } from "zustand";

export type ElementType = {
  id: string;
  pos: { row: number; col: number };
  title?: string;
  placeholder?: string;
  disabled?: boolean;
  urlRequestValues?: string;
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
        columns: 2,
        elements: {
          element1: {
            id: "inpt-email",
            pos: { row: 2, col: 1 },
            title: "Почта",
            placeholder: "vasya@mail.ru",
          },
          element2: {
            id: "inpt-fio",
            pos: { row: 1, col: 1 },
            title: "ФИО",
            placeholder: "Дуров Николас Стивович",
          },
          element3: {
            id: "inpt-phone",
            pos: { row: 3, col: 1 },
            title: "Телефон",
            placeholder: "+7(913)666-01-12",
          },
          element4: {
            id: "combBox-type",
            pos: { row: 1, col: 2 },
            title: "Тип устройства",
            urlRequestValues: "https://",
          },
          element5: {
            id: "combBox-vendor",
            pos: { row: 2, col: 2 },
            title: "Марка",
            urlRequestValues: "https://",
          },
          element6: {
            id: "combBox-model",
            pos: { row: 3, col: 2 },
            title: "Модель",
            urlRequestValues: "https://",
          },
          element7: {
            id: "inpt-serial",
            pos: { row: 4, col: 2 },
            title: "Серийный номер",
          },
          element8: {
            id: "inptBig-description",
            pos: { row: 5, col: 2 },
            title: "Описание проблемы",
          },
          element9: {
            id: "inptBig-comment",
            pos: { row: 6, col: 2 },
            title: "Комментарий к заявке",
          },
          element10: {
            id: "btnPdf-pdf",
            pos: { row: 7, col: 1 },
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
            title: "Скачать pdf",
            disabled: true,
            submitUrl: "https://chet-tam.com",
          },
          element11: {
            id: "btnSubmit-1",
            pos: { row: 7, col: 2 },
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
            title: "Отправить форму",
            submitUrl: "https://service-v.com/crm/tickets/ajax/post?action=createTicket",

          },
        },
      },
      tab2: {
        title: "Диагностика",
        // pos: 2,
        columns: 3,
        dsbldTab: true,
        dsbldElements: false,
      },
      tab3: {
        title: "Проценка",
        // pos: 3,
        columns: 7,
        dsbldTab: true,
        dsbldElements: false,
      },
    },
  },
  // addTab: (title) => set(state => {})
}));
