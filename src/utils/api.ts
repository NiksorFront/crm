import { rejects } from "assert";

const PATH = "https://service-v.com/";
const PATHcrm = "https://service-v.com/crm/";

function getResponse(res) {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  // ? res.json()
  // : res.json().then((err) => Promise.reject(err));
}

async function gettingData(endpoint: string) {
  // const res = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
  const res = await fetch(PATH + endpoint, {
    method: "GET",
    // method: "HEAD",
  });

  // await getResponse(res).then((rs) => console.log(rs.body));
  return await getResponse(res);
  // return await getResponse(res);
}

function settingData() {}

export { gettingData };
