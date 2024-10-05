import { create } from "zustand";
import { gettingData } from "./api";
import { title } from "process";

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
  fontSize?: string;
  align?: string;
  accept?: string; //Указание типов принимаемых файлов для InptFile.
  namePdf?: string; //Указание имени пдф, которую надо сгенерировать.
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
  getSettingsFromServer: () => void;
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
  deleteElement: (tabName: string, elementId: string) => void;
}

export const useStore = create<storeType>((set) => ({
  settings: { title: "Соединение с сервером..." },
  // gettingData(
  //   "crm/config/ajax/get?action=getByName&name=settings",
  // ).then((res) => res),

  getSettingsFromServer: async () => {
    const results = await gettingData(
      "crm/config/ajax/get?action=getByName&name=settings",
    )
      .then((res) => res)
      .catch(() => {
        title: "Ошибка получения данных";
      });

    set(() => ({
      settings: results,
    }));
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

  deleteElement: (tabName, elementId) => {
    set((state) => {
      const tab = state.settings.tabs?.[tabName];
      if (!tab || !tab.elements) {
        console.error(`Tab ${tabName} или его элементы не найдены`);
        return state;
      }

      const updatedElements = Object.fromEntries(
        Object.entries(tab.elements).filter(
          ([key, element]) => element.id !== elementId,
        ),
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
