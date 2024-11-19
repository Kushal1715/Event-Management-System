import React from "react";

const TitleDisplayCard = ({ title }) => {
  return (
    <div className="">
      <h1 className="text-3xl sm:text-5xl md:text-4xl lg:text-5xl font-bold min-w-full h-72 flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        {title}
      </h1>
    </div>
  );
};

export default TitleDisplayCard;
