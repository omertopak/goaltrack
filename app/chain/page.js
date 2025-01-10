"use client";
import { useState } from "react";
import { FaCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa6";
import { FaListUl } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";
import { GiRank1 } from "react-icons/gi";
import { BiSolidColor } from "react-icons/bi";
import { TbProgressCheck } from "react-icons/tb";
import { GiBreakingChain } from "react-icons/gi";
import ChainPage from "../(components)/ChainPage";

const Page = () => {
  const list = [1,2,3,4]

  // ============================== Items and selectons
  const [selectedButton, setSelectedButton] = useState("inprogress"); 
  const [selectedButton2, setSelectedButton2] = useState("in Progress"); 
  const handleClick = (buttonId, label) => {
    setSelectedButton(buttonId); 
    setSelectedButton2(label);
  };
 


  return (
    <div className="flex w-full m-10">
      <div className="w-3/4 h-full">
        <div className="w-full flex flex-col gap-3 h-full">
          <h2 className="text-3xl font-extrabold ">Chain</h2>
          <div className="flex items-center gap-3  ml-3">
            <h4 className="text-xl font-extrabold">{selectedButton2}</h4>
          </div>
          <ChainPage/>
        </div>
      </div>
      <div className="w-1/4 h-full overflow-scroll scrollbar-hide">
        <div className="flex text-start items-center">
          <h2 className="text-2xl font-extrabold px-7">Chains</h2>
          <GiBreakingChain className="text-3xl"/>
        </div>
        <div>
          liste...
        </div>
      </div>
    </div>
  );
};

export default Page;
