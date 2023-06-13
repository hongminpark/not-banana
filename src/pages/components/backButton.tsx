import { useRouter } from "next/router";

const BackButton = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <button
      className="absolute left-4 top-4 cursor-pointer p-2"
      onClick={goBack}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-white"
        fill="none"
        stroke="currentColor"
      >
        <path strokeWidth={2} d="M3 12h30M9 5l-7 7 7 7" />
      </svg>
    </button>
  );
};

export default BackButton;
