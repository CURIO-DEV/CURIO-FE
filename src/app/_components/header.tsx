import { SearchIcon } from "assets";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname === "/search") {
      const keyword = searchParams.get("keyword");
      const trends = searchParams.get("trends");
      setKeyword(keyword ?? trends ?? "");
    } else {
      setKeyword("");
    }
  }, [pathname, searchParams]);

  const handleClick = () => {
    if (!keyword.trim()) return;
    router.push(`/search?keyword=${encodeURIComponent(keyword)}`);
  };

  const handleLogoClick = () => {
    router.push("/");
  };
  return (
    <header className="flex h-20 items-center justify-between border-b border-gray-200 px-20">
      <h1
        className="logo-s font-carter text-primary-600 cursor-pointer"
        onClick={handleLogoClick}
      >
        Curio
      </h1>
      <div className="bg-primary-50 flex w-124.5 rounded-2xl pr-3 pl-6">
        <input
          className="w-full py-2.5 outline-none"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleClick();
            }
          }}
        />
        <button type="button" onClick={handleClick}>
          <SearchIcon />
        </button>
      </div>
    </header>
  );
}
