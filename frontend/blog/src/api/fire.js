import http from "./http";

async function pushalarm(message, success, fail) {
  await http
    .post(`/api/v1/notification`, JSON.stringify(message))
    .then(success)
    .catch(fail);
}

async function pushtoken(token,id, success, fail) {
  await http
    .post(`/api/v1/notification/firebasetoken/${id}`, JSON.stringify(token))
    .then(success)
    .catch(fail);
}

export { pushalarm, pushtoken };
