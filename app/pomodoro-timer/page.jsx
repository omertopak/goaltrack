"use client";
import { useState, useEffect } from "react";

const Page = () => {
  const [workDuration, setWorkDuration] = useState(0.05 * 60); 
  const [breakDuration, setBreakDuration] = useState(0.10 * 60); 
  const [isTimerRunning, setIsTimerRunning] = useState(false); 
  const [timeRemaining, setTimeRemaining] = useState(workDuration); 
  const [isBreakTime, setIsBreakTime] = useState(false); 
  const [cycle, setCycle] = useState(1)
  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeRemaining(workDuration)
    setCycle(1)
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  useEffect(() => {
    let timer;
    if (isTimerRunning) {
      // Timer çalışıyorsa, her saniye geri sayım yapıyoruz
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1) {
            // Eğer focus süresi bitti ise, break süresini başlat
            if (!isBreakTime) {
              setIsBreakTime(true);
              return breakDuration;
            } else {
              setIsBreakTime(false);
              setCycle(prevCount => prevCount + 0.5)
              return workDuration;
            }
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(timer); 
    }

    return () => clearInterval(timer); 
  }, [isTimerRunning, isBreakTime, workDuration, breakDuration]);

  const handleStartStop = () => {
    setIsTimerRunning((prev) => !prev);
  };

  return (
    <div className="flex w-full m-10">
      <div className="w-3/4 h-full flex flex-col">
        <h2 className="text-3xl font-extrabold ">Pomodoro Timer</h2>
        <h4 className="text-xl font-extrabold ml-5">Cycle:{cycle}</h4>
        <div className="h-full flex items-center justify-evenly">
          <h2 className="text-6xl font-mono text-gray-600">
          {formatTime(timeRemaining)}
        </h2>
        </div>
        
      </div>
      <div className="w-1/4 h-full">
        <form onSubmit={handleSubmit} className="flex flex-col h-full justify-between">
          <div className="flex flex-col gap-5">
            <label className="font-bold rounded border p-3 border-slate-500 flex justify-evenly overflow-hidden dark:text-gray-400 gap-3 flex-col">
              Focus (min) :
              <input
                type="number"
                value={workDuration / 60}
                onChange={(e) => setWorkDuration(e.target.value * 60)}
                className="border rounded-md border-slate-500"
              />
            </label>
            <label className="font-bold rounded border p-3 border-slate-500 flex flex-col justify-evenly overflow-hidden dark:text-gray-400 gap-3">
              Break (min) :
              <input
                type="number"
                value={breakDuration / 60}
                onChange={(e) => setBreakDuration(e.target.value * 60)}
                className="border rounded-md border-slate-500"
              />
            </label>
          </div>
          <div className="flex flex-col gap-5">
            <button
              type="button"
              onClick={handleStartStop}
              className="bg-slate-400 hover:bg-slate-600 dark:text-gray-400 dark:bg-zinc-950  text-white font-bold py-2 px-4  dark:border dark:border-gray-50 rounded-md"
            >
              {isTimerRunning ? "Pause" : "Start"}
            </button>
            <button
              type="submit"
              className="bg-slate-400 hover:bg-slate-600 dark:text-gray-400 dark:bg-zinc-950  text-white font-bold py-2 px-4  dark:border dark:border-gray-50 rounded-md"
            >
              Set
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
