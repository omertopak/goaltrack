"use client";
import { useState, useEffect } from "react";
import { GiBreakingChain } from "react-icons/gi";
import ChainPage from "../(components)/ChainPage";
import useChainStore from "@/lib/stores/chainStore";
import AddChainModal from "../(components)/AddChainModal";
import { MdDelete } from "react-icons/md";

const Page = () => {
  const { chains, getChain, deleteChain } =
    useChainStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ============================== Items and selectons
  const [selectedButton, setSelectedButton] = useState("inprogress");
  const [selectedButton2, setSelectedButton2] = useState("in Progress");
  const handleClick = (buttonId, label) => {
    setSelectedButton(buttonId);
    setSelectedButton2(label);
  };

  useEffect(() => {
    getChain();
  }, []);

  const handleDelete = (id) =>{
    deleteChain(id)
  }

  return (
    <div className="flex w-full m-10">
      <div className="w-3/4 h-full">
        <div className="w-full flex flex-col gap-3 h-full">
          <h2 className="text-3xl font-extrabold ">Chain</h2>
          <div className="flex items-center gap-3  ml-3">
            <h4 className="text-xl font-extrabold">{selectedButton2}</h4>
          </div>
          {/* <ChainPage /> */}
        </div>
      </div>
      <div className="w-1/4 h-full flex flex-col gap-3 justify-between">
        <div className="flex flex-col text-start overflow-scroll scrollbar-hide">
          <div className="flex text-start items-center">
            <h2 className="text-2xl font-extrabold px-7">Chains</h2>
            <GiBreakingChain className="text-3xl" />
          </div>
          <div>
            <ul className="space-y-4">
              {chains?.map((chain, index) => (
                <>
                  <li
                    className="border border-gray-200 shadow px-4 py-2 rounded-md text-blue-800 flex justify-between items-center"
                    key={index}
                  >
                    {chain.chainName} <button onClick={() => handleDelete(chain._id)}>
                    <MdDelete className="text-xl" />
                  </button>
                  </li>
                 
                </>
              ))}
            </ul>
          </div>
        </div>
        <button
          className="px-2 py-2  bg-slate-400 text-white rounded-md"
          onClick={() => setIsModalOpen(true)}
        >
          + Add Chain
        </button>
        <AddChainModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default Page;
