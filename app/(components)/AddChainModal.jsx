import { useState } from "react";
import useChainStore from "@/lib/stores/chainStore";

const AddChainModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Modal kapalıysa hiçbir şey gösterme
    const {createChain} = useChainStore();
    const [chain, setChain] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      createChain({ chainName:chain });
      onClose();
    };

  return (
     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4 text-gray-700 dark:text-slate-700">Add your new chain</h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Input */}
          <input
            type="text"
            placeholder=""
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-800  bg-gray-100 dark:bg-slate-200 mb-10 text-slate-600 border-2 h-10"
            value={chain}
            onChange={(e) => setChain(e.target.value)}
            required
          />

          {/* Kapatma ve Kaydet Butonları */}
          <div className="flex justify-between">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-slate-200"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="bg-slate-400 hover:bg-slate-600 dark:text-slate-200 dark:bg-zinc-800  text-white font-bold py-2 px-4  dark:border dark:border-gray-400 rounded-md">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>

  );
}
export default AddChainModal;