import React from "react";

const PulseLoader = () => {
  return (
    <div className="flex space-x-2">
      <div className="h-2 w-2 animate-pulse  rounded-full bg-emerald-300"></div>
      <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-300 delay-150"></div>
      <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-300 delay-300"></div>
    </div>
  );
};

export default PulseLoader;
