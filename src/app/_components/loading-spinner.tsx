import { SpinnerIcon } from "assets";

export default function LoadingSpinner() {
  return (
    <div className="z-10 flex h-screen w-full items-center justify-center py-10">
      <SpinnerIcon className="h-30 w-30 animate-spin" />
    </div>
  );
}
