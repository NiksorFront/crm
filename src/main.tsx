import { createRoot } from "react-dom/client";
import Header from "./components/header.tsx";
import TablePage from "./pages/table-page/table-page.tsx";
import MenuMain from "./components/menu.tsx";
import "normalize.css";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import CreateRequestPage from "./pages/create-request-page.tsx";
import CreateRequestEditedPage from "./pages/create-request-edited-page/create-request-edited-page.tsx";

const userAuthorized = true; //Тут через post с AuthorizedToken будем получать данные авторизован ппользователь или нет

const formLogin = document.querySelector("#sing-in");
const submitLogin = document.querySelector("#sing-in__submit");

formLogin!.classList.remove("hidden");
if (document.location.pathname !== "/" && userAuthorized) {
  formLogin!.classList.add("hidden");
}

submitLogin!.addEventListener("click", () => {
  formLogin!.classList.add("hidden");
  document.location.pathname = "requests/";
});
// submitLogin.click();

createRoot(document.getElementById("header")!).render(<Header />);

// createRoot(document.getElementById("menu")!).render(
//   <StrictMode>
//     <RouterProvider
//       router={createBrowserRouter([{ path: "*", element: <MenuMain /> }])}
//     />
//   </StrictMode>,
// );

function Wrapper(element: React.ReactNode) {
  return (
    <>
      <section id="menu" className="w-2/12 md:w-fit max-w-56 bg-slate-100">
        <MenuMain />
      </section>
      <section id="content" className="w-full h-full">
        {element}
      </section>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "requests/",
    // prettier-ignore
    element: userAuthorized ? (Wrapper(<TablePage title="Активные заяки" endpoint="crm/tickets/ajax?action=getFreeTickets"/>,)) : (<></>),
  },
  {
    path: "completedRequests/",
    element: Wrapper(<TablePage 
      title="Завершённые заявки" 
      endpoint="crm/tickets/ajax?action=getCompletedTickets"/>
    ),
  },
  {
    path: "deviceTypes/",
    element: Wrapper(<TablePage 
      title="Типы устройств" 
      endpoint="crm/devices/ajax?action=getTypes"
      exceptions={["type"]}
      forAdd={{endpoint: "crm/devices/ajax/post", action: "insertDeviceType"}}
      forEdit={{endpoint: "тут будет url", action: ""}}
      forDelete={{endpoint: "crm/devices/ajax/delete", action: "deleteDeviceType"}}/> //Только id нужно
    ),
  },
  {
    path: "deviceVendors/",
    element: Wrapper(<TablePage 
      title="Марки устройства" 
      endpoint="crm/devices/ajax?action=getVendors" 
      forAdd={{endpoint: "crm/devices/ajax/post", action: "insertDeviceVendor"}}
      forEdit={{endpoint: "тут будет url", action: ""}}
      forDelete={{endpoint: "crm/devices/ajax/delete", action: "deleteDeviceVendor"}} //Только id нужно
      />
    ),
  },
  {
    path: "devices/",
    element: Wrapper(<TablePage 
      title="Устройства" 
      endpoint="" />
    ),
  },
  {
    path: "directIndividuals/",
    element: Wrapper(<TablePage 
      title="Физические лица" 
      endpoint="personal/users/ajax/get?action=getUsers" 
      exceptions={["id"]}
      forEdit={{endpoint: "тут будет url", action: ""}}
      forResetPassword={{endpoint: "personal/users/ajax/post", action: "newUserPassword"}} //"data":{"email":"user@mail.ru","phone":null,"newPassword":"123"}
      />
    ),
  },
  {
    path: "directLegalEntities/",
    element: Wrapper(<TablePage 
      title="Юридические лица"
      forEdit={{endpoint: "тут будет url", action: ""}}
      endpoint="personal/company/ajax/get?action=getCompanies" 
      exceptions={["id"]}
      />
    ),
  },
  {
    path: "сreateRequest/",
    element: Wrapper(<CreateRequestPage/>),
  },
  {
    path: "сreateRequestEdited/",
    element: Wrapper(<CreateRequestEditedPage/>)
  },
  {
    path: "*",
    element: userAuthorized ? <p>Ошибка</p> : <></>,
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("main")!).render(
  // <StrictMode>
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>,
  // </StrictMode>,
);
