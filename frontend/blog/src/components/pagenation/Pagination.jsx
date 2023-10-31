import styled from "styled-components";

function Pagination({ total, page, setPage }) {
  const numPages = total;
  const pageList = [];
  const totalPagesToShow = 5;
  // const generatePageNumbers = () => {
  //   const pages = [];

  //   if (numPages <= total) {
  //     // 전체 페이지 수가 표시할 총 페이지 수보다 작을 경우, 모든 페이지를 표시
  //     for (let i = 1; i <= numPages; i++) {
  //       pages.push(i);
  //     }
  //   } else {
  //     // 전체 페이지 수가 표시할 총 페이지 수보다 클 경우, 중간에 "..." 표시
  //     const firstPages = [1, 2, 3];
  //     const lastPages = [numPages - 2, numPages - 1, numPages];
  //     const middlePages = [1, "...", numPages];

  //     pages.push(...firstPages);
  //     pages.push(...middlePages);
  //     pages.push(...lastPages);
  //   }

  //   return pages;
  // };

  return (
    <Nav>
      <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
        &lt;
      </Button>
      {Array(total)
        .fill()
        .map((_, i) => (
          <Button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            aria-current={page === i + 1 ? "page" : undefined}
          >
            {i + 1}
          </Button>
        ))}
      <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
        &gt;
      </Button>
    </Nav>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  background: black;
  color: white;
  font-size: 1rem;

  &:hover {
    background: tomato;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: grey;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: deeppink;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

export default Pagination;
