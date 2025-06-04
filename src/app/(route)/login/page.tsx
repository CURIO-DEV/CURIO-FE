"use client";

import { GoogleSimbol, KakaoSimbol } from "assets";

export default function Login() {
  const handleKakaoLogin = () => {
    const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY!;
    const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!;

    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    window.location.href = kakaoAuthURL;
  };

  const handleGoogleLogin = () => {
    const REST_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_REST_API_KEY!;
    const REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!;

    const googleAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=openid%20email%20profile&access_type=offline`;
    window.location.href = googleAuthURL;
  };
  return (
    <div className="flex h-[calc(100vh-80px)] items-center justify-center">
      <div className="flex h-120 w-173 flex-col items-center rounded-[10px] border border-gray-200">
        <h1 className="logo-m text-primary-600 font-carter mt-18">Curio</h1>
        <p className="subtitle2 mt-2 text-center font-medium text-gray-300">
          읽고 싶은 뉴스만 골라,
          <br />
          원하는 방식으로 요약받는 맞춤형 뉴스 플랫폼
        </p>
        <button
          className="subtitle2 mt-5 flex h-15 w-75 items-center rounded-[12px] bg-[#F2F2F2] px-4"
          onClick={handleGoogleLogin}
        >
          <GoogleSimbol className="h-7" />
          <div className="font-roboto w-full font-medium opacity-70">
            Google로 로그인
          </div>
        </button>
        <button
          className="subtitle2 mt-5 flex h-15 w-75 items-center rounded-[12px] bg-[#FEE500] px-4"
          onClick={handleKakaoLogin}
        >
          <KakaoSimbol className="h-7" />
          <div className="font-roboto w-full font-medium opacity-85">
            카카오로 로그인
          </div>
        </button>
      </div>
    </div>
  );
}
