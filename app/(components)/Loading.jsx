import React from "react";

const Loading = () => {
  return (
    <span class="relative flex size-3">
      <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
      <span class="relative inline-flex size-3 rounded-full bg-sky-500"></span>
    </span>
    
  );
};

export default Loading;

// {isLoading && (
//   <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
//     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
//   </div>
// )}