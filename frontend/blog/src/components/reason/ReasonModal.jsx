import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import http from "../../api/http";
function ReasonModal({ itemCode }) {
  const [reason, setReason] = useState("");
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    if (isSent) window.location.reload();
  }, [isSent]);

  const handleSendData = () => {
    http
      .put(`/api/batteries/request`, { code: itemCode, reason: reason })
      .then(() => {
        setIsSent(true);
      })
      .catch();
  };

  return (
    <div>
      <div>{itemCode} 요청</div>
      <div>
        <textarea value={reason} onChange={(e) => setReason(e.target.value)} />
      </div>
      <Button onClick={handleSendData}>전송</Button>
      {isSent && <div>전송 완료</div>}
    </div>
  );
}

export default ReasonModal;
