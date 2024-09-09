// @ts-nocheck
const PATH = "https://service-v.com/";
// const PATHcrm = "https://service-v.com/crm/";

function getResponse(res) {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

async function gettingData(endpoint: string) {
  // const res = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
  const res = await fetch(PATH + endpoint, {
    method: "GET",
    // method: "HEAD",
  });

  // await getResponse(res).then((rs) => console.log(rs.body));
  return await getResponse(res);
}

//Сейчас она используется для создания нового типа
async function sendingInfo(endpoint: string, infoObject: object) {
  console.log(infoObject);
  const res = await fetch(
    "https://service-v.com/crm/devices/ajax/post", //?action=insertDeviceType
    {
      method: "POST",
      // mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({
        action: "insertDeviceType",
        display_name: "valueasssada",
      }),
    },
  );
  console.log(res);

  return (await res.ok)
    ? res.json()
    : res.json().then((err) => Promise.reject(err));
}

async function sendingInfoFromButton(url: string, data: object) {
  const res = await fetch(url, {
    method: "POST",
    // mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    data: data,
  });

  return await getResponse(res);
}

async function deleteId(endpoint: string, id: string | number) {
  const res = await fetch(PATH + endpoint, {
    method: "DELETE",
    data: JSON.stringify({ id: id }),
  });

  return await getResponse(res);
}

export { gettingData, sendingInfo, deleteId, sendingInfoFromButton };
