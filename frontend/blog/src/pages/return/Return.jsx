import React, { useEffect, useState, useRef } from "react";
import BuyTable from "../../components/table/BuyTable";
import styled, { css, createGlobalStyle } from "styled-components";
import http from "../../api/http";
import ServiceHistory from "../../components/servicehistory/ServiceHistory";
import ReturnRequest from "../../components/returnrequest/ReturnRequest";
import { CSSTransition } from "react-transition-group";
import { useRecoilValue } from "recoil";
import { MemberIdState } from "../../states/states";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideBar from "../../components/sidebar/Sidebar";

const Return = () => {
  const returnRequestRef = useRef(null); // ReturnRequest 컴포넌트를 위한 ref 생성
  const serviceHistoryRef = useRef(null); // ServiceHistory 컴포넌트를 위한 ref 생성
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [history, setHistory] = useState([]);
  const memberId = useRecoilValue(MemberIdState);
  const [selectedItem, setSelectedItem] = useState(null);
  //const memberId = 1;
  const [showReturnRequest, setShowReturnRequest] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleSuccess = () => {
    toast.success("반품 요청이 성공적으로 처리되었습니다.");
    fetchServiceHistory();
    fetchBatteryItems();
  };

  // 에러 시 호출될 함수
  const handleError = () => {
    toast.error("반품 요청 처리 중 오류가 발생했습니다.");
  };

  const fetchBatteryItems = () => {
    http
      .get(`/api/batteries/member/${memberId}`)
      .then(({ data }) => {
        setData(() => {
          return data["data"];
        });
      })
      .catch((error) => {
        console.error("Error fetching batteries data", error);
      });
  };

  // 서비스 히스토리 데이터를 불러오는 함수
  const fetchServiceHistory = (pageNum) => {
    http
      .get(`/api/batteries/history/members/${memberId}?page=${pageNum - 1}`)
      .then(({ data }) => {
        setData2(data.data.content);
        setTotalPages(data.data.totalPages);
        // 추가된 상태로 현재 페이지와 총 페이지 수를 설정합니다.
        setHistory(() => {
          return data["data"]["content"];
        });
      })
      .catch((error) => {
        console.error("Error fetching service history", error);
      });
  };

  // useEffect(() => {
  //   const fetchServiceHistory = (pageNum) => {
  //     http
  //       .get(`/api/batteries/history/members/${memberId}?page=${pageNum - 1}`)
  //       .then(({ data }) => {
  //         setData(data.data.content);
  //         setTotalPages(data.data.totalPages);
  //         // 추가된 상태로 현재 페이지와 총 페이지 수를 설정합니다.
  //         setHistory(() => {
  //           return data["data"]["content"];
  //         });
  //       })
  //       .catch(error => {
  //         console.error("Error fetching service history", error);
  //       });
  //   };

  //   fetchServiceHistory(page);
  // }, [page, memberId]);

  useEffect(() => {
    http
      .get(`/api/batteries/member/${memberId}`)
      .then(({ data }) => {
        setData(() => {
          return data["data"];
        });
      })
      .catch((error) => {
        console.error("Error fetching batteries data", error);
      });
    // http
    //   .get(`/api/batteries/history/members/${memberId}`)
    //   .then(({ data }) => {
    //     setHistory(() => {
    //       return data["data"]["content"];
    //     });
    //   })
    //   .catch();
    fetchServiceHistory(page);
  }, [memberId, page]);
  return (
    <>
      <GlobalStyles />
      <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />

      <S.Container>
        <S.BuyTableContainer>
          <BuyTable
            data={data}
            onApplyClick={(item) => {
              setSelectedItem(item);
              setShowReturnRequest(true);
            }}
          ></BuyTable>
        </S.BuyTableContainer>

        <S.ReturnResultTableContainer>
          <CSSTransition
            in={!showReturnRequest}
            timeout={300}
            classNames="fade"
            unmountOnExit
            nodeRef={serviceHistoryRef} // CSSTransition에 ref를 지정
          >
            <div ref={serviceHistoryRef}>
              <ServiceHistory
                data={history}
                page={page}
                setPage={setPage}
                totalPage={totalPages}
                fetchServiceHistory={fetchServiceHistory}
              />
            </div>
          </CSSTransition>

          <CSSTransition
            in={showReturnRequest}
            timeout={300}
            classNames="slide-down"
            unmountOnExit
            nodeRef={returnRequestRef} // CSSTransition에 ref를 지정
          >
            <S.ReturnRequestWrapper ref={returnRequestRef}>
              <ReturnRequest
                onClose={() => setShowReturnRequest(false)}
                item={selectedItem}
                onSuccess={handleSuccess}
                onError={handleError}
              />
            </S.ReturnRequestWrapper>
          </CSSTransition>
        </S.ReturnResultTableContainer>
      </S.Container>
    </>
  );
};

export default Return;

const S = {
  Container: styled.div`
    display: flex;
    width: 100%;
    // 태블릿 크기 이하에서는 컴포넌트를 세로로 배치합니다.
    @media (max-width: 768px) {
      flex-direction: column;
    }
  `,
  BuyTableContainer: styled.div`
    flex: 0.8;
    @media (max-width: 768px) {
      padding-top: 60px;
    }
  `,
  ReturnResultTableContainer: styled.div`
    flex: 1;
    position: relative; // 이 부분이 추가되어야 합니다.
  `,
  Title: styled.div`
    font-size: 30px;
    font-weight: bold;
    color: #1428a0;
  `,
  ReturnRequestWrapper: styled.div`
    position: absolute;
    top: 1px; // 가장 위에서 시작
    width: 100%;
    z-index: 2;
  `,
};
const GlobalStyles = createGlobalStyle`
// Fade 애니메이션 관련 스타일
.fade-enter {
  opacity: 0; // 초기 투명도 0
  transform: translateY(-20px); // 시작 위치를 조금 위로 설정
}

.fade-enter-active {
  opacity: 1; // 완전 불투명
  transform: translateY(0); // 원래 위치로 이동
  transition: opacity 300ms, transform 300ms; // 투명도와 위치의 변화에 대한 전환 효과 지정
}

.fade-exit {
  opacity: 1; // 완전 불투명
}

.fade-exit-active {
  opacity: 0; // 투명해짐
  transition: opacity 300ms; // 투명도의 변화에 대한 전환 효과 지정
}

// ReturnRequest가 펼쳐지는 애니메이션 스타일
.slide-down-enter {
  transform: scaleY(0);
  transform-origin: top;
}

.slide-down-enter-active {
  transform: scaleY(1);
  transition: transform 300ms;
}

.slide-down-exit {
  transform: scaleY(1);
}

.slide-down-exit-active {
  transform: scaleY(0);
  transition: transform 300ms;
}
`;
