import CircularText from "./blocks/TextAnimations/CircularText/CircularText";
import React from "react";

function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary-black">
      {/* Background overlay with subtle animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-black via-primary-black to-blue-900 opacity-10 animate-pulse"></div>

      {/* Main loader container */}
      <div className="relative flex flex-col items-center justify-center space-y-8">
        {/* Circular Text Animation */}
        <div className="relative w-40 h-40 flex items-center justify-center">
          {/* Outer ring with CircularText */}
          <div className="absolute inset-0">
            <CircularText
              text="TECHLOGS • LOADING • PLEASE WAIT • "
              spinDuration={15}
              onHover="speedUp"
              className="text-blue-400 font-semibold text-lg w-full h-full flex items-center justify-center"
            />
          </div>

          {/* Inner spinning ring */}
          <div className="w-24 h-24 border-2 border-blue-400/30 border-t-primary-blue rounded-full animate-spin"></div>

          {/* Center logo/icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-primary-blue rounded-lg flex items-center justify-center shadow-lg">
              <div className="w-6 h-6 bg-primary-white rounded-sm opacity-90"></div>
            </div>
          </div>
        </div>

        {/* Loading text */}
        <div className="text-center space-y-2">
          <h2 className="text-primary-white text-xl font-bold tracking-wider">
            TechLogs
          </h2>
          <p className="text-blue-400 opacity-70 text-sm font-medium">
            Loading amazing content...
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-primary-blue rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-primary-blue rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-primary-blue rounded-full animate-bounce"></div>
        </div>
      </div>

      {/* Subtle particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400 opacity-40 rounded-full animate-ping [animation-delay:1s]"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400 opacity-40 rounded-full animate-ping [animation-delay:2s]"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-blue-400 opacity-40 rounded-full animate-ping [animation-delay:3s]"></div>
      </div>
    </div>
  );
}

export default Loader;
