"use client";
import { useState,useEffect } from "react";

const Page = ({ onSave }) => {
  const [workDuration, setWorkDuration] = useState(25 * 60); // Varsayılan 25 dakika
  const [breakDuration, setBreakDuration] = useState(5 * 60); // Varsayılan 5 dakika

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(workDuration, breakDuration);
  };

  //==================================
  //Clock
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
        setTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Bileşen unmount olduğunda timer'ı temizle
}, []);
  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
};
  //==================================
  //==================================


  
  return (
    <div className="flex w-full m-10 ">
      <div className="w-3/4 h-full flex items-center justify-evenly">
      <h2 className="text-6xl font-mono text-gray-600">{formatTime(time)}</h2>
      </div>
      <div className="w-1/4 h-full">
        <form onSubmit={handleSubmit} className="flex flex-col h-full justify-between">
          <div className="flex flex-col gap-5">
            <label className="font-bold rounded border p-3 border-slate-500 flex justify-evenly">
              Focus (min) :
              <input
                type="number"
                value={workDuration / 60}
                onChange={(e) => setWorkDuration(e.target.value * 60)}
              />
            </label>
            <label className="font-bold rounded border p-3 border-slate-500 flex justify-evenly">
              Break (min) :
              <input
                className=""
                type="number"
                value={breakDuration / 60}
                onChange={(e) => setBreakDuration(e.target.value * 60)}
              />
            </label>
          </div>
          <div className="flex flex-col gap-5">
            <button type="submit" className="bg-slate-400 hover:bg-slate-600 text-white font-bold py-2 px-4 border-b-4 border-slate-500 hover:border-slate-700 rounded" >Restart</button>
            <button type="submit"  className="bg-slate-400 hover:bg-slate-600 text-white font-bold py-2 px-4 border-b-4 border-slate-500 hover:border-slate-700 rounded" >Start</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
