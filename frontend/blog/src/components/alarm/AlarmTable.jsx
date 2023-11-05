import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BsFillBellFill } from "react-icons/bs";
import { getalarmlog, getuseralarmlog } from "../../api/alarm";
import Pagination from "../pagenation/Pagination";
import { useRecoilValue } from "recoil";
import { MemberIdState, RoleState } from "../../states/states";
const AlarmTable = () => {
  const memberId = useRecoilValue(MemberIdState);
  const role = useRecoilValue(RoleState);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [toggle, setToggle] = useState(false);
  const [totalElements, setTotalElements] = useState(0);
  function handle(toggle) {
    setToggle(!toggle);
  }
  useEffect(() => {
    if (role == "USER") {
      getuseralarmlog(
        memberId,
        page,
        ({ data }) => {
          console.log(data);
          setData(() => {
            return data.data;
          });
          setPage(() => {
            return data.number + 1;
          });
          setTotal(() => {
            return data.totalPages;
          });
          setTotalElements(() => {
            return data.totalElements;
          })
        },
        ({ error }) => {
          console.log(error);
        }
      );
    } else if (role == "ADMIN") {
      getalarmlog(
        "관리자",
        page,
        ({ data }) => {
          console.log(data);
          setData(() => {
            return data.data;
          });
          setPage(() => {
            return data.number + 1;
          });
          setTotal(() => {
            return data.totalPages;
          });
          setTotalElements(() => {
            return data.totalElements;
          })
        },
        ({ error }) => {
          console.log(error);
        }
      );
    }
  }, [page]);

  return (
    <S.Wrap>
      <S.Title className="d-flex align-items-center">
        <BsFillBellFill />
        알림 내역
      </S.Title>

      <S.BODY>
        {
          totalElements == 0 &&
          <h2>"알림 내역이 없습니다."</h2>
        }

        {data.map(({ title, time, content, isRead, company }) => {
          const formattedTime = new Date() - new Date(time);
          const MonthDifference = formattedTime / (1000 * 60 * 60 * 24 * 31); // 달
          const daysDifference = formattedTime / (1000 * 60 * 60 * 24); // 하루
          const month = Math.floor(MonthDifference);
          const days = Math.floor(daysDifference); // 하루
          const hours = Math.floor((daysDifference - days) * 24); //시간
          return (
            <>
              { totalElements != 0 &&
              <section className="hovering">
              <tr>
                <td style={{ width: "20px" }}></td>
                <td className="image">{"이미지"}</td>
                <td className="content">{`[${title}] ${company}으로 반송신청 들어옴`}</td>
                <td className="time">
                  {(() => {
                    if (month > 0) {
                      return `${month}달 전`;
                    } else if (days > 0) {
                      return `${days}일 전`;
                    } else if (hours > 0) {
                      return `${hours}시간 전`;
                    } else {
                      return "방금 전";
                    }
                  })()}
                </td>
                <td>
                  <button>삭제</button>
                </td>
              </tr>
            </section>
              }

            </>
            
          );
        })}
      </S.BODY>

      <footer>
        <Pagination total={total} page={page} setPage={setPage} />
      </footer>
    </S.Wrap>
  );
};

export default AlarmTable;

const S = {
  Wrap: styled.div`
    margin: 20px;
    padding: 0px;
    padding-top: 0px; // 상단 navbar의 높이만큼 패딩을 줍니다.

    border-radius: 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    background-color: #d5dfe9;
  `,
  Title: styled.span`
    font-size: 20px;
    font-weight: bold;
    color: #1428a0;
    padding-bottom: 30px;
  `,
  TD: styled.td`
    colspan: 4;
  `,
  BODY: styled.body`
    &::focus {
      box-shadow: 0 0 0 3px purple;
    }
    overflow: scroll;
    height: 500px;

    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      border-bottom-right-radius: 30px;
      border-bottom-left-radius: 40px;
      background: rgba(0, 0, 0, 0);
    }
    &::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.3);
      border-bottom-right-radius: 30px;
      border-bottom-left-radius: 40px;
    }

    section {
      padding: 16px 16px 16px 0;
    }

    section > tr > .time {
      width: 100px;
    }

    section > tr > .content {
      width: 300px;
      font-weight: bold;
    }

    .hovering:hover {
      background: #f1f3f5;
    }
  `,
};
