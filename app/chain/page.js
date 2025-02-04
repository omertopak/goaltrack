"use client";
import { useState, useEffect } from "react";
import { GiBreakingChain } from "react-icons/gi";
import ChainPage from "../(components)/ChainPage";
import useChainStore from "@/lib/stores/chainStore";
import AddChainModal from "../(components)/AddChainModal";
import { MdDelete } from "react-icons/md";

const Page = () => {
  const { chains, getChain, deleteChain,updateChain } = useChainStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ============================== Items and selectons
  const [title, setTitle] = useState(
    "Success is built on persistence—stay determined, and progress will follow!"
  );
  const [number, setNumber] = useState("?");

  useEffect(() => {
    getChain();
  }, []);

  const handleDelete = (id) => {
    deleteChain(id);
  };
  const handleUpdate = (id) => {
    updateChain(id);
  };

  const handleChain = (chain) => {
    setTitle(chain.chainName);
    setNumber(chain.dayNumber);
  };
  
  return (
    <div className="flex w-full m-10">
      <div className="w-3/4 h-full">
        <div className="w-full flex flex-col gap-3 h-full">
          <h2 className="text-3xl font-extrabold ">Chain</h2>
          <div className="flex items-center gap-3  ml-3">
            <h4 className="text-xl font-extrabold text-gray-600 dark:text-gray-400">
              {title}
            </h4>
          </div>
          <div 
          onClick={handleUpdate}
          className="relative w-full h-full mx-auto overflow-hidden scrollbar-hide group hover:cursor-pointer">
            <h2 className="h-full flex items-center justify-center text-9xl font-bold animate-bounce dark:text-slate-100 text-slate-800">
              {number}
            </h2>

            {/* Hover edildiğinde görünen "Merhaba" */}
            {number === "?" ? (
              <></>
            ) : (
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xl px-4 py-2 rounded transition-opacity">
                Click to complete day {number}!
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-1/4 h-full flex flex-col gap-3 justify-between">
        <div className="flex flex-col text-start overflow-scroll scrollbar-hide">
          <div className="flex text-start items-center">
            <h2 className="text-2xl font-extrabold px-7">Chains</h2>
            <GiBreakingChain className="text-3xl" />
          </div>
          <div className="overflow-scroll scrollbar-hide">
            <ul className="space-y-4">
              {chains?.map((chain, index) => (
                <div className="mt-5" key={index}>
                  <li
                    onClick={() => handleChain(chain)}
                    className="border border-gray-200 shadow px-4 py-2 rounded-md  flex justify-between items-center bg-slate-400 hover:bg-slate-600 dark:text-gray-400 dark:bg-zinc-950  text-white font-bold  "
                  >
                    {chain.chainName}{" "}
                    <button onClick={() => handleDelete(chain._id)}>
                      <MdDelete className="text-xl" />
                    </button>
                  </li>
                </div>
              ))}
            </ul>
          </div>
        </div>
        <button
          className="bg-slate-400 hover:bg-slate-600 dark:text-gray-400 dark:bg-zinc-950  text-white font-bold py-2 px-4  dark:border dark:border-gray-50 rounded-md"
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
