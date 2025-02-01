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
        <h2 className="text-lg font-bold mb-4 text-black">Write your new chain</h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Input */}
          <input
            type="text"
            placeholder="Todo..."
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            value={chain}
            onChange={(e) => setChain(e.target.value)}
            required
          />

          {/* Kapatma ve Kaydet Butonları */}
          <div className="flex justify-between">
            <button
              type="button"
              className="px-4 py-2 bg-red-500 text-white rounded-md"
              onClick={onClose}
            >
              Kapat
            </button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md">
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>

  );
}
export default AddChainModal;