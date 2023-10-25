import http from "./http";

async function pushalarm(message, success, fail) {
  await http
    .post(`/api/v1/notification`, JSON.stringify(message))
    .then(success)
    .catch(fail);
}

export { pushalarm };
