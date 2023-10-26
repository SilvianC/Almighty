import React from 'react';
//import './ServiceUseHistory.css';
import * as components from "../../components";
import './ServiceUseHistory.css';
const ServiceUseHistory = () => {
  return (
    <div className="service-use-history">
      {/* 알림내역 컴포넌트는 이미 완성되었다고 가정하고 생략 */}
      {/* ... */}
      <h1>서비스 이용내역</h1>
      <components.ReturnApplicationHistory />
    </div>
  );
}

export default ServiceUseHistory;