import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { useEffect, useState } from "react";

import { pushtoken } from "../api/fire";
import { useRecoilValue, useRecoilState } from "recoil";
import { MemberIdState, IsLoginState } from "../states/states";

function FirebaseComponent() {
  const islogin = useRecoilValue(IsLoginState);
  const memberId = useRecoilValue(MemberIdState);
  const [isLogin, setIsLogin] = useRecoilState(IsLoginState);
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "a201-822f6.firebaseapp.com",
    projectId: "a201-822f6",
    storageBucket: "a201-822f6.appspot.com",
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  };

  const app = initializeApp(firebaseConfig);
  const messaging = getMessaging(app);

  useEffect(() => {
    if (isLogin == "") {
      requestPermission();
    }
    async function registerSW() {
      await navigator.serviceWorker.register("/firebase-messaging-sw.js");
    }
    async function requestPermission() {
      console.log("권한 요청 중...");
      const permission = await Notification.requestPermission();
      if (permission === "denied") {
        console.log("알림 권한 허용 안됨");
        return;
      }
      if ("serviceWorker" in navigator && "PushManager" in window) {
        /* ... */
        await registerSW();
        console.log("알림 권한이 허용됨");
      }

      try {
        const token = await getToken(messaging, {
          vapidKey:
            "BIW70JkV0rCqXX0NUYzz9RNfKG1GxoWb6TTAIb22ZnG3-yqJL0L1ieBlJoZ_S_ALdyoJe_Zq4-AEKLql1BvYYRo",
        });
        if (token) {
          pushtoken(
            { firebaseToken: token },
            memberId,
            ({ success }) => {
              setIsLogin(true);
            },
            ({ error }) => {
              console.log(error);
            }
          );
        } else console.log("Can not get Token");
      } catch (error) {
        console.log("알림 설정 필요", error);
      }
    }
  }, [messaging]);
}
export default FirebaseComponent;
