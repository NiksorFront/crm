const PATH = "https://service-v.com/";
// const PATHcrm = "https://service-v.com/crm/";
// const PATH = "https://test-branch1.service-v.com/";

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

async function sendingInfoFromButton(url: string, infoObject: object) {
  // console.log(infoObject);
  const res = await fetch(url, {
    method: "POST",
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

export { gettingData, sendingInfo, sendingInfoFromButton, deleteData };
