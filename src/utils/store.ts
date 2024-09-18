//@ts-nocheck
import { create } from "zustand";

export type ElementType = {
  id: string; //id состоит из двух частей: названия компонента и имени(реальному id)  Пример: Inpt-email, CombBox-type
  pos: { row: number | string; col: number | string }; //Позиция в сетке
  title?: string; //Заголовок для подписи каждого элемента
  titles?: string; //Для двух Tab'ного элемента - <TwoTab /> Через - записывается заголовок перового и втрого таба  Пример: Заголово1-Заголовок2
  value?: string; //Значение кого-то Inpt или CombBox
  placeholder?: string; //заполнитель
  disabled?: boolean; //Активен элемент или нет
  valuesOrURLRequestValues?: Array<string> | string; //Для CombBox. Записываем или массив с данными или строку для получения данных
  //dependsOn?: string; //Содержание(value) и активность(disabled) зависят от содержимоного другого поля. Записвается имя этого поля
  dependsOn?: string | boolean;
  submitUrl?: { url: string; action: string }; //Для BtnSubmit. Записывается ссылка для отправки данных на сервер
  /*Написать тож самое, что выше, но для ссылки на получение информации о том какие данные нужны сыылки для отправки.*/
  acceptedValues?: Array<string>; //Для BtnPdf и BtnSubmit. Записывается список элементов из которых надо извлекать значения.
  elementsTabOne?: Record<string, ElementType>; //Для TwoTab. Спиосок компонентов типа ElementType, которые будут отображаться в 1м табе
  elementsTabTwo?: Record<string, ElementType>; //Для TwoTab. Спиосок компонентов типа ElementType, которые будут отображаться во 2м табе
  endpointForRequestDataTable?: string;
  forAddinDataTable?: { endpoint: string; action: string };
};

export type TabType = {
  title: string;
  // pos: number;
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
  updateElementPos: (
    tabName: string,
    elementId: string,
    newValues: Record<string, {}>,
  ) => void;
  updateElement: (
    tabName: string,
    elementId: string,
    newValues: Partial<ElementType>,
  ) => void;
  newElement: (
    tabName: string,
    elementName: string,
    elementData: ElementType,
  ) => void;
}

export const useStore = create<storeType>((set) => ({
  settings: {
    title: "Создать тикет",
    tabs: {
      tab1: {
        title: "Приёмка",
        // pos: 0,
        activeTab: true,
        dsbldTab: false,
        columns: 2,
        elements: {
          element1_3: {
            id: "twoTab-Ind_Leg", //Individul, Legal
            pos: { row: "1/12", col: 1 }, //Пиздец короче с этими grid'ами
            title: "Клиент",
            titles: "Физическое лицо - Юридическое лицо",
            elementsTabOne: {
              element1: {
                id: "inpt-full_name",
                pos: { row: 1, col: 1 },
                title: "ФИО",
                placeholder: "Дуров Николас Стивович",
              },
              element2: {
                id: "inpt-email",
                pos: { row: 2, col: 1 },
                title: "Почта",
                placeholder: "vasya@mail.ru",
              },
              element3: {
                id: "inpt-phone",
                // id: "inpt-phone",
                pos: { row: 3, col: 1 },
                title: "Телефон",
                placeholder: "+7(913)666-01-12",
              },
              element4: {
                id: "btnSearchInModal-user_id",
                pos: { row: 4, col: 1 },
                title: "Выбрать из базы физ. лиц",
                endpointForRequestDataTable:
                  "personal/users/ajax/get?action=getUsers",
                forAddinDataTable: {
                  endpoint: "/personal/users/ajax/post",
                  action: "preregisterUser",
                },
              },
            },
            elementsTabTwo: {
              element1: {
                id: "inpt-inn",
                pos: { row: 1, col: 1 },
                title: "ИНН",
                placeholder: "123456789012",
              },
              element2: {
                id: "inpt-name",
                pos: { row: 2, col: 1 },
                title: "Наименование организации",
                placeholder: "ООО Сервис-в",
              },
              element3: {
                id: "inpt-legalform",
                pos: { row: 3, col: 1 },
                title: "Правовая форма",
                placeholder: "общество с ограниченной ответственностью",
              },
              element4: {
                id: "inpt-doljnost",
                pos: { row: 4, col: 1 },
                title: "Должность руководителя",
                placeholder: "Директор",
              },
              element5: {
                id: "inpt-directorFullName",
                pos: { row: 5, col: 1 },
                title: "ФИО руководителя",
                placeholder: "Иванов Иван Тимурович",
              },
              element6: {
                id: "btnSearchInModal-company_id",
                pos: { row: 6, col: 1 },
                title: "Выбрать из базы юр. лиц",
                endpointForRequestDataTable:
                  "personal/company/ajax/get?action=getCompanies",
              },
              element7: {
                id: "inpt-full_name",
                pos: { row: 1, col: 1 },
                title: "ФИО контактного лица",
                placeholder: "Дуров Николас Стивович",
              },
              element8: {
                id: "inpt-email",
                pos: { row: 2, col: 1 },
                title: "Почта контактного лица",
                placeholder: "vasya@mail.ru",
              },
              element9: {
                id: "inpt-phone",
                // id: "inpt-phone",
                pos: { row: 3, col: 1 },
                title: "Телефон контактного лица",
                placeholder: "+7(913)666-01-12",
              },
              element10: {
                id: "btnSearchInModal-user_id",
                pos: { row: 4, col: 1 },
                title: "Выбрать из базы физ. лиц",
                endpointForRequestDataTable:
                  "personal/users/ajax/get?action=getUsers",
                forAddinDataTable: {
                  endpoint: "/personal/users/ajax/post",
                  action: "preregisterUser",
                },
              },
            },
          },
          element4: {
            id: "combBox-type",
            pos: { row: 1, col: 2 },
            title: "Тип устройства",
            valuesOrURLRequestValues: "crm/devices/ajax?action=getTypes",
            dependsOn: "type",
          },
          element5: {
            id: "inpt-mileage",
            pos: { row: 2, col: 2 },
            title: "Пробег",
            placeholder: "0",
            dependsOn: true,
            // dependsOn: "combBox-type",
          },
          element6: {
            id: "combBox-vendor",
            pos: { row: 3, col: 2 },
            title: "Марка",
            disabled: true,
            valuesOrURLRequestValues:
              "crm/devices/ajax?action=getVendorsByTypeId&type_id=1",
            dependsOn: "type",
            // dependsOn: "combBox-type",
          },
          element7: {
            // id: "combBox-model",
            id: "combBox-device", //combBox-device_id
            pos: { row: 4, col: 2 },
            title: "Модель",
            disabled: true,
            valuesOrURLRequestValues: ["1", "2", "3", "4", "5", "6"],
            dependsOn: "vendor",
            // dependsOn: "combBox-vendor",
          },
          element8: {
            id: "inpt-serial_number",
            pos: { row: 5, col: 2 },
            title: "Серийный номер",
          },
          element13: {
            id: "combBox-completeness",
            pos: { row: 6, col: 2 },
            title: "Комплектность",
            valuesOrURLRequestValues: ["0", "1"],
            // valuesOrURLRequestValues: [
            //   "Устройство",
            //   "Разукомплектованное устройство",
            // ],
          },
          element9: {
            id: "inptBig-problem_description",
            pos: { row: 7, col: 2 },
            title: "Описание проблемы",
          },
          element10: {
            id: "inptBig-comment",
            pos: { row: 8, col: 2 },
            title: "Комментарий к заявке",
          },
          element21: {
            id: "combBox-device_id",
            pos: { row: 10, col: 2 },
            title: "Устройство id",
            // value: "1",
            valuesOrURLRequestValues: ["1", "2", "3"],
            // dependsOn: "combBox-type",
          },
          element11: {
            id: "btnPdf-pdf",
            pos: { row: 12, col: 1 },
            acceptedValues: [
              "email",
              "fio",
              "phone",
              "type",
              "vendor",
              "model",
              "serial",
              "description",
              "comment",
            ],
            title: "Скачать pdf",
            disabled: true,
            submitUrl: { url: "https://chet-tam.com", action: "" },
          },
          element12: {
            id: "btnSubmit-1",
            pos: { row: 12, col: 2 },
            acceptedValues: [
              "user_id",
              "company_id",
              "device_id",
              "completeness",
              "mileage",
              // "combBox-model",
              "serial_number",
              "problem_description",
              "comment",
            ],
            title: "Отправить форму",
            submitUrl: {
              url: "https://test-branch2.service-v.com/crm/tickets/ajax/post",
              action: "createTicket",
            },
          },
        },
      },
      tab2: {
        title: "Диагностика",
        // pos: 2,
        columns: 2,
        activeTab: false,
        dsbldTab: true,

        elements: {
          element1: {
            id: "inpt-email",
            pos: { row: 1, col: 1 },
            title: "Таб-2",
            placeholder: "vasya@mail.ru",
          },
          element2: {
            id: "btnNext-1",
            pos: { row: 2, col: 2 },
            title: "следующая страница",
            placeholder: "vasya@mail.ru",
          },
        },
      },
      tab3: {
        title: "Проценка",
        // pos: 3,
        columns: 3,
        activeTab: false,
        dsbldTab: true,
        elements: {
          element1: {
            id: "btnNext-1",
            pos: { row: 1, col: 1 },
            title: "следующая страница",
            placeholder: "vasya@mail.ru",
          },
        },
      },
    },
  },

  newTabContent: (tabName, tabData) =>
    set((state) => ({
      settings: {
        ...state.settings,
        tabs: {
          ...state.settings.tabs,
          [tabName]: tabData, // Добавляем новый ключ с именем tabName и значением tabData
        },
      },
    })),

  newActiveTab: (tabName) => {
    set((state) => ({
      settings: {
        ...state.settings,
        tabs: Object.fromEntries(
          Object.entries(state.settings.tabs).map(([key, tab]) => [
            key,
            {
              ...tab,
              activeTab: key === tabName,
            },
          ]),
        ),
      },
    }));
  },

  //Функция для обновления главного заголовка
  updateTitle: (newTitle) => {
    set((state) => ({
      settings: {
        ...state.settings,
        title: newTitle, // Обновление заголовка
      },
    }));
  },

  //Функция для обновления заголовка таба
  updateTabTitle: (tabName, newTitle) =>
    set((state) => ({
      settings: {
        ...state.settings,
        tabs: {
          ...state.settings.tabs,
          [tabName]: {
            ...state.settings.tabs[tabName],
            title: newTitle, // Обновляем title у выбранного таба
          },
        },
      },
    })),

  //функция для обновления columns
  updateTabColumns: (tabName, newColumns) =>
    set((state) => ({
      settings: {
        ...state.settings,
        tabs: {
          ...state.settings.tabs,
          [tabName]: {
            ...state.settings.tabs![tabName],
            columns: newColumns, // Обновляем значение columns для указанного таба
          },
        },
      },
    })),

  // Функция для добавления новой вкладки
  addNewTab: () => {
    const newTabName = `tab${Date.now()}`; // Генерация уникального имени вкладки
    const newTabData: TabType = {
      title: "вкладка",
      activeTab: false,
      dsbldTab: false,
      columns: 1,
      elements: {}, // Добавляем пустые элементы, если потребуется можно добавить данные
    };

    set((state) => ({
      settings: {
        ...state.settings,
        tabs: {
          ...state.settings.tabs,
          [newTabName]: newTabData, // Добавляем новую вкладку
        },
      },
    }));
  },

  // Функция для удаления вкладки
  removeTab: (tabName: string) => {
    set((state) => {
      const updatedTabs = { ...state.settings.tabs };
      delete updatedTabs[tabName]; // Удаляем вкладку по ключу tabName
      return {
        settings: {
          ...state.settings,
          tabs: updatedTabs, // Обновляем состояние вкладок
        },
      };
    });
  },

  // Новая функция для изменения любого элемента
  updateElementPos: (tabName, elementId, newValues) => {
    const element = (state) => {
      let itg = { elem: { pos: { row: 0, col: 0 }, id: "none-0" } };

      const spisochek = state.settings.tabs![tabName].elements;
      Object.keys(spisochek).forEach((element) => {
        if (spisochek[element].id === elementId) {
          itg = { [element]: { ...spisochek[element], ...newValues } };
        }
      });

      return itg;
    };

    set((state) => ({
      settings: {
        ...state.settings,
        tabs: {
          ...state.settings.tabs,
          [tabName]: {
            ...state.settings.tabs![tabName],
            elements: {
              ...state.settings.tabs![tabName].elements,
              ...element(state),
            },
          },
        },
      },
    }));
  },

  // Обновление элемента значений элемента
  updateElement: (tabName, elementId, newValues) => {
    set((state) => {
      const tab = state.settings.tabs?.[tabName];
      if (!tab || !tab.elements) {
        console.error(`Tab ${tabName} или его элементы не найдены`);
        return state;
      }

      const updatedElements = Object.fromEntries(
        Object.entries(tab.elements).map(([key, element]) => {
          if (element.id === elementId) {
            return [key, { ...element, ...newValues }];
          }
          return [key, element];
        }),
      );

      return {
        settings: {
          ...state.settings,
          tabs: {
            ...state.settings.tabs,
            [tabName]: {
              ...tab,
              elements: updatedElements,
            },
          },
        },
      };
    });
  },

  // Функция для добавления нового элемента
  newElement: (tabName, elementName, elementData) => {
    set((state) => ({
      settings: {
        ...state.settings,
        tabs: {
          ...state.settings.tabs,
          [tabName]: {
            ...state.settings.tabs![tabName],
            elements: {
              ...state.settings.tabs![tabName].elements,
              [elementName]: elementData, // Добавляем новый элемент
            },
          },
        },
      },
    }));
  },
}));

interface typeDepends {
  typeId: string;
  typeValue: string;
  vendor: string;
  newTypee: (newType: string, newTypeValue: string) => void;
  newVendor: (newVendor: string) => void;
}

//Костыль чтобы не делать логику нового типа
export const useDepends = create<typeDepends>((set) => ({
  typeId: "",
  typeValue: "",
  vendor: "",
  newTypee: (newTypeId, newTypeValue) =>
    set({ typeId: newTypeId, typeValue: newTypeValue }),
  newVendor: (newVendor) => set({ vendor: newVendor }),
}));

interface typeUpdate {
  update: boolean;
  updating: () => void;
}

//Костыль, чтобы не пробрасывать useState переменную для обновления таблицы через кучу Компонентов
export const useCostil = create<typeUpdate>((set) => ({
  update: true,
  updating: () => set((state) => ({ update: !state.update })),
}));

interface typeTableRow {
  row: Record<string, string>;
  updateRowData: (row: Record<string, string>) => void;
}

export const useTableRow = create<typeTableRow>((set) => ({
  row: {},
  updateRowData: (row) => set(() => ({ row: row })),
}));
