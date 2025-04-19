export default function Login() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex h-120 w-173 flex-col items-center rounded-[10px] border border-gray-200">
        <h1 className="logo-m text-primary-600 font-carter mt-18">Curio</h1>
        <p className="subtitle2 mt-2 text-center font-medium text-gray-300">
          읽고 싶은 뉴스만 골라,
          <br />
          원하는 방식으로 요약받는 맞춤형 뉴스 플랫폼
        </p>
        <button className="mt-6.5 h-15 w-75 rounded-[9.48px] bg-[#F2F2F2] text-black">
          google login
        </button>
        <button className="mt-5 h-15 w-75 rounded-[9.48px] bg-[#FEE500] text-black">
          kakao login
        </button>
      </div>
    </div>
  );
}
