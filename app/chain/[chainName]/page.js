"use client";
import Cube from "@/app/(components)/Cube";
import React from "react";
import { use, useState } from "react";

const chains = ({ params }) => {
  const chainNo = use(params);
  const chainName = chainNo?.chainName;
  const arr = [1, 2];

  const [firstCubeColor, setFirstCubeColor] = useState("red");
  const [secondCubeVisible, setSecondCubeVisible] = useState(false);
  const [shift, setShift] = useState(false);

  const handleClick = () => {
    setFirstCubeColor("blue");
    setSecondCubeVisible(true);
    setShift(true);
  };

  return (
    <div className="flex flex-col w-full gap-5">
      <h2 className="text-4xl font-bold m-5">{chainName}</h2>
      <div className="flex flex-row m-10 h-full">
        <div className="mt-40 ml-10  w-3/4 ">
          <div className="flex flex-row">
            {arr.map((item) => (
              <div key={item} className="w-1/6 flex justify-between gap-10">
                <div className="mt-20 z-10">
                  <Cube />
                </div>
                <div className="">
                  <Cube />
                </div>
              </div>
            ))}
            <div className="w-1/6 flex justify-between gap-10">
            <div className="mt-20 z-10">
              <Cube color={firstCubeColor} />
            </div>

            <div
              className={` transition-all duration-2000 ${
                secondCubeVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <Cube color="red" />
            </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 w-1/4 justify-between">
          <div className="flex flex-col gap-6">
            <h3 className="text-center font-bold text-7xl">Day 45</h3>
            <h3 className="text-center text-6xl">Timer</h3>
          </div>
          <button
            className={`bg-slate-400 hover:bg-slate-600 text-white font-bold py-2 px-4 border-b-4 border-slate-500 hover:border-slate-700 rounded ${
              shift ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleClick}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default chains;
