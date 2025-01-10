"use client";
import { useState, useEffect } from "react";

const Page = () => {
  const [workDuration, setWorkDuration] = useState(25 * 60); // Varsayılan 25 dakika
  const [breakDuration, setBreakDuration] = useState(5 * 60); // Varsayılan 5 dakika
  const [isTimerRunning, setIsTimerRunning] = useState(false); // Timer'ın çalışıp çalışmadığını kontrol etmek için

  const [timeRemaining, setTimeRemaining] = useState(workDuration); // Geriye kalan zamanı tutar
  const [isBreakTime, setIsBreakTime] = useState(false); // Break zamanında olup olmadığını kontrol eder

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeRemaining(workDuration)
  };

  //==================================
  // Clock
  const [time, setTime] = useState(new Date());
  
  
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
              return workDuration;
            }
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(timer); // Timer durduğunda interval'ı temizle
    }

    return () => clearInterval(timer); // Cleanup
  }, [isTimerRunning, isBreakTime, workDuration, breakDuration]);

  const handleStartStop = () => {
    setIsTimerRunning((prev) => !prev);
  };

  return (
    <div className="flex w-full m-10">
      <div className="w-3/4 h-full flex items-center justify-evenly">
        <h2 className="text-6xl font-mono text-gray-600">
          {formatTime(timeRemaining)}
        </h2>
      </div>
      <div className="w-1/4 h-full">
        <form onSubmit={handleSubmit} className="flex flex-col h-full justify-between">
          <div className="flex flex-col gap-5">
            <label className="font-bold rounded border p-3 border-slate-500 flex justify-evenly overflow-hidden">
              Focus (min) :
              <input
                type="number"
                value={workDuration / 60}
                onChange={(e) => setWorkDuration(e.target.value * 60)}
              />
            </label>
            <label className="font-bold rounded border p-3 border-slate-500 flex justify-evenly overflow-hidden">
              Break (min) :
              <input
                type="number"
                value={breakDuration / 60}
                onChange={(e) => setBreakDuration(e.target.value * 60)}
              />
            </label>
          </div>
          <div className="flex flex-col gap-5">
            <button
              type="button"
              onClick={handleStartStop}
              className="bg-slate-400 hover:bg-slate-600 text-white font-bold py-2 px-4 border-b-4 border-slate-500 hover:border-slate-700 rounded"
            >
              {isTimerRunning ? "Pause" : "Start"}
            </button>
            <button
              type="submit"
              className="bg-slate-400 hover:bg-slate-600 text-white font-bold py-2 px-4 border-b-4 border-slate-500 hover:border-slate-700 rounded"
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
