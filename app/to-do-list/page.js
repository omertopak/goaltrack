"use client";
import { useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa6";
import { FaListUl } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";
import { GiRank1 } from "react-icons/gi";
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
  const [selectedButton, setSelectedButton] = useState("all"); 
  const [selectedButton2, setSelectedButton2] = useState("All"); 
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
        <FaCircle className="mr-2 text-gray-400" />
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

  //Data to screen
  let renderData = todos;
  if(selectedButton==="all"){
    renderData = todos;
  }else if(selectedButton==="completed"){
    renderData = todos.filter((todo) => todo.completed === true);
  }else if (selectedButton==="incomplete"){
    renderData = todos.filter((todo) => todo.completed === false);
  }else if(selectedButton==="high"){
    renderData = todos.filter((todo) => todo.priority === "High");
  }else if(selectedButton==="medium"){
    renderData = todos.filter((todo) => todo.priority === "Medium");
  }else if(selectedButton==="low"){
    renderData = todos.filter((todo) => todo.priority === "Low");
  }


  return (
    <div className="flex w-full m-10">
      <div className="w-3/4 h-full overflow-scroll scrollbar-hide">
        <div className="w-full flex flex-col gap-3">
          <h2 className="text-3xl font-extrabold ">To Do List</h2>
          <div className="flex items-center gap-3  ml-3 justify-between ">
            <div className="flex items-center gap-3  ml-3">
              <FaListUl />
              <h4 className="text-xl font-extrabold">{selectedButton2}</h4>
            </div>
            
            <AddTodoModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
          <ul className="flex flex-col gap-2 ml-5 mr-10 ">
            {renderData?.map((todo, index) => (
              <li
                key={index}
                className="flex flex-row items-center justify-between"
              >
                <div className="flex flex-row items-center gap-4 overflow-hidden  mr-2">
                  <GoDotFill />
                  <span className="truncate">{todo.todo}</span>
                  
                </div>
                <div className="flex items-center gap-8">
                  <button onClick={() => handleComplete(todo._id)}>
                    {todo.completed === true ? (
                      <IoMdDoneAll className="text-xl text-green-500" />
                    ) : (
                      <IoMdDoneAll className="text-xl" />
                    )}
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
      <div className="w-1/4 h-full  flex flex-col justify-between">
        <div className="flex flex-col text-start overflow-scroll scrollbar-hide">
          <h2 className="text-2xl font-extrabold px-7">Status</h2>
          {renderButton("all", "All")}
          {renderButton("completed", "Completed")}
          {renderButton("incomplete", "Incomplete")}

          <h2 className="text-2xl font-extrabold px-7">Priority</h2>
          {renderButton("high", "High")}
          {renderButton("medium", "Medium")}
          {renderButton("low", "Low")}
        </div>
        <button
              className="bg-slate-400 hover:bg-slate-600 dark:text-gray-400 dark:bg-zinc-950  text-white font-bold py-2 px-4  dark:border dark:border-gray-50 rounded-md"
              onClick={() => setIsModalOpen(true)}
            >
              + Add Todo
            </button>
      </div>
    </div>
  );
};

export default Page;
