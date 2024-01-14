import { useEffect } from 'react';
import axios from 'axios';



const BACKEND_DOMAIN = process.env.REACT_APP_BACKEND_DOMAIN;

const useTrackUserVisit = () => {
  useEffect(() => {
    const entryTime = new Date();
    console.log('방문자수 추적!!');
    
    // 페이지를 떠날 때 실행될 함수
    const trackExit = async () => {
      const exitTime = new Date();
      const visitDuration = exitTime - entryTime; // 밀리초 단위

      const visitData = {
        timestamp: entryTime.toISOString(),
        url: window.location.href,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        visitDuration, // 페이지에 머문 시간
        // IP는 서버 측에서 추출
      };

      try {
        await axios.post(BACKEND_DOMAIN +'/api/track-visit', visitData);
        console.log('Tracking data sent successfully');
      } catch (error) {
        console.error('Error sending tracking data:', error);
      }
    };

    // 페이지를 떠날 때 이벤트 리스너 추가
    window.addEventListener('beforeunload', trackExit);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('beforeunload', trackExit);
    };
  }, []);
};

export default useTrackUserVisit;
