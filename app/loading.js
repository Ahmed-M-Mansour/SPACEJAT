function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <svg
        className="animate-spin -ml-1 mr-3 h-10 w-10 text-red-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 0116 0H4z"
        ></path>
      </svg>
      <span className="text-xl text-red-600 font-semibold">Loading...</span>
    </div>
  );
}

export default Loading;
