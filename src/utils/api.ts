//@ts-nocheck
const PATH = "https://test-branch2.service-v.com/";
// const PATHcostil = "https://service-v.com/"; //Только для GET запросов работает

function getResponse(res) {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

async function gettingData(endpoint: string) {
  const res = await fetch(PATH + endpoint, {
    method: "GET",
  });

  return await getResponse(res);
}

async function sendingInfo(endpoint: string, infoObject: object) {
  console.log(infoObject);
  const res = await fetch(PATH + endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(infoObject),
  });

  return await getResponse(res);
}

async function sendingInfoFromButton(
  url: string,
  infoObject: object,
  method: string = "POST",
) {
  const res = await fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(infoObject),
  });

  return await getResponse(res);
}

async function deleteData(endpoint: string, infoObject: object) {
  const res = await fetch(PATH + endpoint, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(infoObject),
  });

  console.log(res.ok);

  return await getResponse(res);
}

export {
  gettingData,
  sendingInfo,
  sendingInfoFromButton,
  deleteData,
  gettingDataCostil,
};
