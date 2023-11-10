import React, { useEffect,useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import styled, { keyframes } from "styled-components";
import ReturnResponse from "../returnresponse/ReturnResponse";
import { CSSTransition } from 'react-transition-group';
import { BsFillClipboard2CheckFill } from "react-icons/bs";
import { format, isWithinInterval, subSeconds } from 'date-fns';
import { useRecoilValue } from "recoil";
import { MemberIdState } from "../../states/states";
import http from "../../api/http";
const status = {
  Normal: "정상",
  Request: "진행 중",
  Upload: "데이터 업로드",
  Analysis: "분석 중",
  CustomerFault: "고객 귀책",
  SdiFault: "제품 결함",
};

const ServiceHistory = ({ data, page, setPage, totalPage, onStatusClick,fetchServiceHistory }) => {
  const [showReturnResponse, setShowReturnResponse] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const wrapperRef = useRef(null);
  const now = new Date();
  // 클릭 이벤트 리스너를 설정합니다.
  useEffect(() => {
    // 클릭 이벤트를 처리하는 함수입니다.
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        // 컴포넌트의 외부 클릭이 감지되면 ReturnResponse를 닫습니다.
        setShowReturnResponse(false);
      }
    }
    // 클릭 리스너를 추가합니다.
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // 컴포넌트가 언마운트될 때 리스너를 제거합니다.
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]); // 빈 배열을 넣으면 컴포넌트가 마운트될 때 한 번만 실행됩니다.
  const handleStatusButtonClick = (item) => {
    http.get(`/api/batteries/history/response/${item.historyId}`)
    .then((response) => {
      // 응답 데이터로 상태를 설정합니다.
      setSelectedItem({ ...item, responseData: response.data });
      setShowReturnResponse(true); // ReturnResponse 컴포넌트를 표시합니다.
    })
    .catch((error) => {
      console.error('There was an error fetching the response', error);
      // 필요하다면 여기서 오류 처리를 하세요.
    });
  };
  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
    fetchServiceHistory(pageNumber);
  };
  return (
    <S.Wrap ref={wrapperRef}>
      <S.Title className="d-flex align-items-center">
        <BsFillClipboard2CheckFill />{'\u00A0'}
        반송 신청 결과
      </S.Title>

      <Form>
        <S.Table bordered>
          <thead className={"table-secondary"}>
            <tr>
              <th className="w-auto text-center">제품명</th>
              <th className="w-auto text-center">신청일</th>
              <th className="w-25 text-center">결과</th>
            </tr>
          </thead>
          <tbody>
          {data.map((item, idx) => {
            // 상태에 따른 색상 결정
            const statusColor = {
              Normal: "#28a745", // 정상 - 녹색
              Request: "#ffc107", // 진행 중 - 노란색
              Upload: "#17a2b8", // 데이터 업로드 - 하늘색
              Analysis: "#007bff", // 분석 중 - 파란색
              CustomerFault: "#dc3545", // 고객 귀책 - 빨간색
              SdiFault: "#034F9E", // 제품 결함 - 검정색
            }[item.toStatus] || "#6c757d"; // 기본 - 회색
            
            // item.date 문자열을 Date 객체로 변환합니다.
            const itemDate = new Date(item.date);

            // item.date를 "YYYY-MM-DD" 형식으로 포맷합니다.
            const formattedDate = itemDate.toISOString().split('T')[0];

            // 현재 시간과 item.date의 차이를 계산합니다.
            const timeDifferenceInSeconds = Math.abs(now - itemDate) / 1000;

            // 차이가 5초 이내인지 확인합니다.
            const isRecent = timeDifferenceInSeconds <= 5;
            console.log(isRecent);
    return (
      <tr key={idx} className={isRecent ? "flash-highlight" : ""}>
        <FirstTd  className={isRecent ? "flash-highlight" : ""} statusColor={statusColor}>{item.code}</FirstTd >
        <td className={isRecent ? "flash-highlight" : ""}>{formattedDate}</td>
        <td className={isRecent ? "flash-highlight" : ""}>
        <StatusButton 
          onClick={() => handleStatusButtonClick(item)}
          status={item.toStatus} // status prop을 전달합니다
        >
          {status[item.toStatus]}
        </StatusButton>
        </td>
      </tr>
    );
  })}
          </tbody>
        </S.Table>
      </Form>
      <CSSTransition
        in={showReturnResponse}
        timeout={300}
        classNames="slide-down"
        unmountOnExit
        nodeRef={wrapperRef} // CSSTransition에 nodeRef를 추가합니다.
      >
        <S.ReturnResponseWrapper ref={wrapperRef}>
          <ReturnResponse onClose={() => setShowReturnResponse(false)} item={selectedItem} onSuccess={onStatusClick} />
        </S.ReturnResponseWrapper>
      </CSSTransition>
      <PageControl>
        {Array.from({ length: totalPage }, (_, index) => (
          <PageButton
            key={index}
            active={page === index + 1}
            onClick={() => handlePageClick(index + 1)}
          >
            {index + 1}
          </PageButton>
        ))}
      </PageControl>
    </S.Wrap>
  );
};
const buttonColors = {
  Normal: "#28a745", // 정상 - 녹색
  Request: "#ffc107", // 진행 중 - 노란색
  Upload: "#17a2b8", // 데이터 업로드 - 하늘색
  Analysis: "#007bff", // 분석 중 - 파란색
  CustomerFault: "#dc3545", // 고객 귀책 - 빨간색
  SdiFault: "#034F9E", // 제품 결함 - 검정색
};
export default ServiceHistory;
// TableRow styled component
// 첫 번째 td에 적용할 styled component
const FirstTd = styled.td`
position: relative; // 상대적 위치 지정
&:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 10px; // 선의 두께
  background: ${props => props.statusColor}; // prop에서 받은 색상 적용
}
// 필요한 추가 스타일
`;

const StatusButton = styled(Button)`
  /* 여기에 버튼 스타일 추가 */
  width:90px;
  font-size: 17px !important;
  border-radius: 5px;
  font-weight: bold;
  height:30px;
  padding:2px;
  background-color: ${props => buttonColors[props.status] || "#B6C0C9"} !important;
  color: #000 !important;
  &:hover {
    background-color: #ffffff !important;  /* 호버 스타일링 */
  }
`;
const S = {
  Wrap: styled.div`
    border: 1px solid #d3d3d3;
    margin: 20px;
    padding: 60px;
    padding-top: 20px; // 상단 navbar의 높이만큼 패딩을 줍니다.
    padding-left: 20px; // 왼쪽 navbar의 너비만큼 패딩을 줍니다.
    padding-right: 20px;
    border-radius: 10px;
    background-color: #F2F2F2;
    height:600px;
    box-shadow: 0px 2.77px 2.21px rgba(0, 0, 0, 0.0197), 0px 12.52px 10.02px rgba(0, 0, 0, 0.035), 0px 20px 80px rgba(0, 0, 0, 0.07);
    @media(max-width: 768px){
      height:300px; 
     }
  `,
  ReturnResponseWrapper: styled.div`
    position: absolute;
    top: 0; // 상단에서 시작
    width: 100%; 
    right:1px;
    z-index: 2; // 필요에 따라 적절한 z-index 설정
  `,
  Title: styled.span`
  font-size: 30px;
  font-weight: bold;
  color: #1D1F25;
  padding-bottom: 10px;
  @media(max-width: 768px){
    font-size: 20px;
  }
  `,
  PageArea: styled.div`
    text-align: center;
  `,
  PageBox: styled.span``,
  Table: styled(Table)`
    border-collapse: collapse; // 테이블의 선을 없애기 위해 collapse 설정
    background-color: #F2F2F2;
    text-align: center;
    padding:1px;
    thead tr, tbody tr {
      border: none !important;
      font-weight: bold;
      font-size: 18px;
    }
    tr:hover td {background:#E7ECF2 !important}
    .flash-highlight{
      @keyframes fadeInOut {
        from, to {
          background-color: #F2F2F2;
        }
        50% {
          background-color: #5998DA;
        }
      }
      animation: fadeInOut 0.8s!important;
    }
    th, td {
      border: none !important; // 모든 th, td 태그에 적용된 기본 선을 제거
      font-weight: bold;
      font-size: 18px;
      background-color: #F2F2F2;
      
    }

    th{
      background-color: #E7ECF2; // 하늘색 배경 적용
      color: #034F9E;
      font-weight: bold;
      font-size: 20px;
      
    }
  `,
  
};
// 페이징 컨트롤 스타일드 컴포넌트
const PageControl = styled.div`
  display: flex;
  justify-content: center;
  height:40px;
`;

const PageButton = styled.button`

  padding: 5px 10px;
  background-color: ${props => (props.active ? '#007bff' : 'transparent')};
  color: ${props => (props.active ? 'white' : 'black')};
  border: 1px solid #dee2e6;
  border-radius: 5px;
  cursor: pointer;
`;