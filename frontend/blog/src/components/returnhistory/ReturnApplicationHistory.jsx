import React, { useState } from 'react';
import './ReturnApplicationHistory.css';
import { FaBeer, FaCheck } from 'react-icons/fa';  // 아이콘 임포트

const ReturnApplicationHistory = () => {
  const [selectedIcon, setSelectedIcon] = useState(null);

  return (
    <div className="return-application-history">
      <h2>반송신청내역</h2> {/* 해당 섹션의 제목 */}
        <div className="icons">
          <div className={`icon ${selectedIcon === 'icon-rma' ? 'active' : ''}`} onClick={() => setSelectedIcon('icon-rma')}>
            <FaBeer />  {/* 아이콘 사용 */}
            RMA
          </div>
          <div className={`icon ${selectedIcon === 'icon-check' ? 'active' : ''}`} onClick={() => setSelectedIcon('icon-check')}>
            <FaCheck />  {/* 아이콘 사용 */}
            Check
          </div>
        </div>

        <ul className="product-list">
          <li onClick={() => setSelectedIcon('icon-rma')}>B0056</li>
        </ul>
    </div>
  );
}

export default ReturnApplicationHistory;