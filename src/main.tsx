import { Component, ComponentElement, ComponentType, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Header from "./components/header.tsx";
import TablePage from "./pages/table-page/table-page.tsx";
import MenuMain from "./components/menu.tsx";
import "normalize.css";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

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

function Wrapper(element) {
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
    // prettier-ignore
    element: Wrapper(<TablePage title="Завершённые заявки" endpoint="crm/tickets/ajax?action=getCompletedTickets" />,),
  },
  {
    path: "deviceTypes/",
    element: Wrapper(<TablePage title="Типы устройств" endpoint="crm/devices/ajax?action=getTypes" exceptions={["type"]} />),
  },
  {
    path: "deviceVendors/",
    element: Wrapper(<TablePage title="Марки устройства" endpoint="crm/devices/ajax?action=getVendors" />),
  },
  {
    path: "devices/",
    element: Wrapper(<TablePage title="Устройства" endpoint="" />),
  },
  {
    path: "directIndividuals/",
    // prettier-ignore
    element: Wrapper(<TablePage title="Физические лица" endpoint="personal/users/ajax/get?action=getUsers" exceptions={["id"]} />),
  },
  {
    path: "directLegalEntities/",
    // prettier-ignore
    element: Wrapper(<TablePage title="Юридические лица" endpoint="personal/company/ajax/get?action=getCompanies" exceptions={["id"]} />),
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
