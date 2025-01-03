"use client"

import React, { useState } from 'react'
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { CgDarkMode } from "react-icons/cg";
import ThemeSwitch from '../ThemeSwitch';
const Sidebar = () => {
    const list = {
        "Calendar": ["Reminders", "Meetings", "Studies","Events"],
        "To-Do List": ["All notes", "Urgent", "Removed"],
        "Notes & Ideas": ["All notes", "Urgent", "Removed"],
        "Pomodoro Timer": [],
        "Chain": ["Chain1", "Chain2"],
        "Statistics":[],
        "Gantt":[],

        // "Profile":["aska", "reposrt"],
    }
    //==========================================
    // Her bir öğe için openDown durumunu saklamak için bir obje
    const [openState, setOpenState] = useState(
        Object.keys(list).reduce((acc, key) => {
            acc[key] = false; // Her bir anahtar için başlangıçta 'false'
            return acc;
        }, {})
    );
    // openState'i güncelleme fonksiyonu
    const toggleOpen = (key) => {
        setOpenState((prevState) => ({
            ...prevState,
            [key]: !prevState[key], // Sadece ilgili öğenin durumunu değiştir
        }));
    };
    //==========================================

    //==========================================

    //==========================================

    return (
        <div className="relative flex justify-between h-screen w-full max-w-[20rem] flex-col rounded-xl bg-clip-border p-4  shadow-xl shadow-blue-gray-900/5 dark:text-gray-400 text-gray-700 dark:bg-black bg-slate-200">
            <div className="p-4 mb-2">
                <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    Goal Rock!
                </h5>
            </div>
            <nav className="flex min-w-[240px] flex-col gap-1 p-2 h-full font-sans text-base font-normal text-blue-gray-700 overflow-scroll scrollbar-hide">
            
                <div className="flex flex-col w-full ">
                    {Object.keys(list).map((mainKey) => (
                        <React.Fragment key={mainKey}>
                            <div role="button"
                                className="flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none bg-blue-gray-50/50 text-start text-blue-gray-700 hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                                <button onClick={() => toggleOpen(mainKey)} type="button"
                                    className="flex items-center justify-between w-full p-3 font-sans text-xl antialiased font-semibold leading-snug text-left transition-colors border-b-0 select-none border-b-blue-gray-100 text-blue-gray-900 hover:text-blue-gray-900">
                                    <div className="grid mr-4 place-items-center">
                                        <FaAngleDoubleRight />
                                    </div>
                                    <p className="block mr-auto font-sans text-base antialiased font-normal leading-relaxed text-blue-gray-900">
                                        {mainKey}
                                    </p>
                                    <span className="ml-4">
                                        {openState[mainKey] ? <FaChevronUp /> : <FaChevronDown />}
                                    </span>
                                </button>
                            </div>
                            {openState[mainKey] && (
                                <div className="overflow-hidden">
                                    <div className="block w-full py-1 font-sans text-sm antialiased font-light leading-normal text-gray-700 dark:text-gray-500">
                                        <nav className="flex min-w-[240px] flex-col gap-1 p-0 font-sans text-base font-normal text-blue-gray-700">
                                            {list[mainKey].map((subItem, index) => (
                                                <div key={`${mainKey}-${index}`} role="button"
                                                    className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                                                    <div className="grid mr-4 place-items-center">
                                                        <FaAngleRight />
                                                    </div>
                                                    {subItem}
                                                </div>
                                            ))}
                                        </nav>
                                    </div>
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>      
            </nav>
            <div>
                <ThemeSwitch/>
                <div role="button"
                    className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                    <div className="grid mr-4 place-items-center">
                    <BiLogOut className='text-2xl'/>
                    </div>
                    Log Out
                </div>
            </div>
            
        </div>
    )
}

export default Sidebar;
