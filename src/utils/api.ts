import { rejects } from "assert";

const PATH = "https://service-v.com/";
const PATHcrm = "https://service-v.com/crm/";

function getResponse(res) {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  // ? res.json()
  // : res.json().then((err) => Promise.reject(err));
}

async function gettingData(endpoint: string) {
  const res = await fetch(PATH + endpoint);

  return await getResponse(res);
  // return await getResponse(res);
}

function settingData() {}

export { gettingData };
