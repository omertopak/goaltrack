"use client";
import { useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa6";
import { FaListUl } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";
import { GiRank1 } from "react-icons/gi";
import { BiSolidColor } from "react-icons/bi";
import { TbProgressCheck } from "react-icons/tb";
//==================
import  useTodoStore  from '../../lib/stores/todoStore';
import AddTodoModal from "../(components)/AddTodoModal";


const Page = () => {

  // ============================== store
  const { todos,getTodos, deleteTodo, updateTodo, priorityTodo } = useTodoStore();

  useEffect(() => {
    getTodos();
  }, [])
  
//TODO modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // ============================== Items and selectons
  const [selectedButton, setSelectedButton] = useState("inprogress"); 
  const [selectedButton2, setSelectedButton2] = useState("in Progress"); 
  const handleClick = (buttonId, label) => {
    setSelectedButton(buttonId); 
    setSelectedButton2(label);
  };
  const renderButton = (id, label) => (
    <button
      key={id}
      onClick={() => handleClick(id, label)}
      className="italic flex items-center px-5 text-gray-400 m-2 w-40 text-left"
    >
      {selectedButton === id ? (
        <FaCircle className="mr-2 text-Gray-400" />
      ) : (
        <FaRegCircle className="mr-2 text-gray-400" />
      )}
      {label}
    </button>
  );
  // ============================== HandleClick
  const handleComplete = (id) => {
    updateTodo(id)
  };
  const handlePriority = (id) => {
    priorityTodo(id)
  };
  const handleDelete = (id) => {
    deleteTodo(id)
  };

  return (
    <div className="flex w-full m-10">
      <div className="w-3/4 h-full">
        <div className="w-full flex flex-col gap-3">
          <h2 className="text-3xl font-extrabold ">To Do List</h2>
          <div className="flex items-center gap-3  ml-3 justify-between">
            <div className="flex items-center gap-3  ml-3">
              <FaListUl />
              <h4 className="text-xl font-extrabold">{selectedButton2}</h4>
            </div>
            <button
              className="px-2 py-2 mr-5 bg-slate-400 text-white rounded-md"
              onClick={() => setIsModalOpen(true)}
            >
              + Add Todo
            </button>
            <AddTodoModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
          <ul className="flex flex-col gap-2 ml-5 mr-10">
            {todos?.map((todo, index) => (
              <li
                key={index}
                className="flex flex-row items-center justify-between"
              >
                <div className="flex flex-row items-center gap-4">
                  <GoDotFill />
                  {todo.todo}
                </div>
                <div className="flex items-center gap-8">
                  <button onClick={() => handleComplete(todo._id)}>
                    {todo.completed === true ? (
                      <IoMdDoneAll className="text-xl text-green-500" />
                    ) : (
                      <IoMdDoneAll className="text-xl" />
                    )}
                    {/* <IoMdDoneAll className="text-xl" /> */}
                  </button>
                  <button onClick={() => handlePriority(todo._id)}>
                    {todo.priority === "High" ? (
                      <GiRank1 className="text-xl text-red-700" />
                    ) : todo.priority === "Medium" ? (
                      <GiRank1 className="text-xl text-orange-600" /> 
                    ) : (
                      <GiRank1 className="text-xl text-green-700" /> 
                    )}
                    {/* <GiRank1 className="text-xl" /> */}
                  </button>
                  {/* <button onClick={() => handleProgress(todo._id)}>
                 <TbProgressCheck className="text-xl"/>
               </button>
               <button onClick={() => handleGroups(todo._id)}>
                 <BiSolidColor className="text-xl"/>
               </button> */}
                  <button onClick={() => handleDelete(todo._id)}>
                    <MdDelete className="text-xl" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-1/4 h-full overflow-scroll scrollbar-hide">
        <div className="flex flex-col text-start">
          <h2 className="text-2xl font-extrabold px-7">Status</h2>
          {renderButton("inprogress", "In Progress")}
          {renderButton("completed", "Completed")}
          {renderButton("removed", "Removed")}

          <h2 className="text-2xl font-extrabold px-7">Priority</h2>
          {renderButton("high", "High")}
          {renderButton("medium", "Medium")}
          {renderButton("low", "Low")}
        </div>
      </div>
    </div>
  );
};

export default Page;
