import http from "./http";

async function changeStatus(batteryId, status, success, fail){
    await http
        .put(`/api/batteries/${batteryId}`, status)
        .then(success)
        .catch(fail);
}

async function postHistory(statusHistory, success, fail){
    await http
        .put(`/api/batteries/history`, JSON.stringify(statusHistory))
        .then(success)
        .catch(fail);
}

export { changeStatus, postHistory };