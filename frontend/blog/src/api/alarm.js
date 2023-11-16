import http from "./http";

async function pushalarm(message, success, fail) {
  await http
    .post(`/api/v1/notification`, JSON.stringify(message))
    .then(success)
    .catch(fail);
}

async function pushtoken(token, id, success, fail) {
  await http
    .post(`/api/v1/notification/firebase/${id}`, JSON.stringify(token))
    .then(success)
    .catch(fail);
}

async function getalarmlog(id, page, success, fail) {
  await http
    .get(`/api/alarm/${id}?pageIdx=${page - 1}`)
    .then(success)
    .catch(fail);
}

async function getuseralarmlog(id, page, success, fail) {
  await http
    .get(`/api/alarm/user/${id}?pageIdx=${page - 1}`)
    .then(success)
    .catch(fail);
}

async function countAlarm(id, success, fail) {
  await http
    .get(`/api/alarm/count/${id}`)
    .then(success)
    .catch(fail);
}

async function updateAlarm(id, success, fail) {
  await http
    .put(`/api/alarm/${id}`)
    .then(success)
    .catch(fail);
}

async function deleteAlarm(id, success, fail) {
  await http
    .delete(`/api/alarm/${id}`)
    .then(success)
    .catch(fail);
}

export { pushalarm, pushtoken, getalarmlog,getuseralarmlog,countAlarm,deleteAlarm,updateAlarm };
