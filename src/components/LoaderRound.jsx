import React from "react";

const LoaderRound = ({ size = 15, color = "#fff" }) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={`inline-block animate-spin rounded-full border-2 border-solid border-[${
        color || "#000"
      }]  border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white`}
      role="status"
    />
  );
};

export default LoaderRound;
