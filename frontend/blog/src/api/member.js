import http from "./http";

async function login(user, success, fail) {
  await http
    .post(`/api/auth/login`, JSON.stringify(user))
    .then(success)
    .catch(fail);
}

function joinMember(user, success, fail) {
  http.post(`/api/auth/signup`, JSON.stringify(user)).then(success).catch(fail);
}
async function findById(id, success, fail) {
  http.defaults.headers["access-token"] =
    sessionStorage.getItem("access-token");
  await http.get(`/api/users/info/${id}`).then(success).catch(fail);
}


async function logout(userid, success, fail) {
  await http.get(`/api/users/logout/${userid}`).then(success).catch(fail);
}

export { login, findById, joinMember, logout };
