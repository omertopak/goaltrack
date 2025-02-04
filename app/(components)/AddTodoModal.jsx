import { useState } from "react";
import useTodoStore from "@/lib/stores/todoStore";
const AddTodoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; 
    const {createTodo} = useTodoStore();
    const [todo, setTodo] = useState("");
    const [priority, setPriority] = useState("Low");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      createTodo({ todo, priority });
      onClose();
    };

  return (
     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4 text-gray-700 dark:text-slate-700">Add a new todo</h2>

        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder=""
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-800  bg-gray-100 dark:bg-slate-200 text-slate-600 mb-5 border-2 h-10"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            required
          />

          <select
            className="w-full p-2 border border-gray-300 rounded-md mb-4 dark:bg-slate-200 dark:text-slate-600 bg-gray-100"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

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
export default AddTodoModal;