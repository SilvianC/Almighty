import axios from "axios";
import { useRecoilValue } from 'recoil';
import { AccessTokenState } from "../states/states";

const http = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true, // 쿠키를 포함시키기 위해 필요
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

http.interceptors.response.use(
  (response) => {
    // 정상 응답 처리
    return response;
  },
  async (error) => {
    // 에러 처리
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/reissue`);
        if (res.status === 200) {
          // 여기서 새로운 accessToken을 Recoil 상태에 저장
          // 예: setAccessTokenState(res.data.newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${res.data.newAccessToken}`;
          return http(originalRequest);
        }
      } catch (refreshError) {
        // 리프레시 토큰이 만료되었거나, 재요청이 실패한 경우
        // 로그아웃 처리 로직
        // 예: 로그아웃 상태를 Recoil로 관리하는 경우 해당 상태 업데이트
        http.post(
          process.env.REACT_APP_SERVER + `/api/auth/logout`,
          {
            headers: {
              Authorization: originalRequest.Authorization
            }
          }
        )
        .catch((err) => console.log(err))

        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
export default http;
