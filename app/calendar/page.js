"use client";

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Modal from '../(components)/Modal';
import DeleteModal from '../(components)/DeleteModal';
import useCalendarStore from "../../lib/stores/calendarStore";

const Calendar = () => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDelModalOpen, setIsDelModalOpen] = useState(false);
  const [DeleteId, setDeleteId] = useState("");
  const [newEventTitle, setNewEventTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const {isLoading,events,getEvents, createEvent,updateEvent,deleteEvent} = useCalendarStore();
  const sortedEvents = events?.sort((a, b) => new Date(a.start) - new Date(b.start));




  useEffect(() => {
    getEvents();
  }, []);  
  
  useEffect(() => {
    setCurrentEvents(events);
  }, [events]); 


  const handleDateClick = (arg) => {
    setSelectedDate(arg);
    setIsModalOpen(true);
    // console.log("handleClick calisti");
    // console.log("arg", arg);
  };

  // Yeni etkinlik ekle
  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    // console.log("Seçilen Etkinlik ID:", newEventTitle);
  // console.log("Etkinlik Başlığı:",selectedDate);
    if (newEventTitle && selectedDate) {
      try {
        const newEvent = {
          title: newEventTitle,
          start: selectedDate.date,
          end: selectedDate.date,
          allDay: selectedDate.allDay
        };
        createEvent(newEvent);
        setCurrentEvents(events);
        handleCloseModal();
      } catch (error) {
        console.error('Etkinlik eklenirken hata:', error);
        alert('Etkinlik eklenirken bir hata oluştu');
      }
    }
  };


  // Etkinlik sil
  const handleDeleteClick = async (e) => {
     e.preventDefault();
     try {
      deleteEvent(DeleteId)
      setCurrentEvents(events);
      handleDelCloseModal();
    } catch (error) {
      console.error('Etkinlik silinirken hata:', error);
      alert('Etkinlik silinirken bir hata oluştu');
    }
  }
  //etkinlik silme icin id yakala
  const handleEventClick = (info) => {
      setDeleteId(info.event._def.extendedProps._id);
      setIsDelModalOpen(true);
  };

  // Etkinlik taşıma
  // dropInfo yada herhangi bi isim ver ama icinde event altinda id,start ve end otomatik gelir
  const handleEventDrop = async (dropInfo) => {
    try {
      const updatedEvent = {
        start: dropInfo.event.start,
        end: dropInfo.event.end
      };
      const dropId = dropInfo.event._def.extendedProps._id;
      updateEvent(updatedEvent,dropId);
      setCurrentEvents(events);
    } catch (error) {
      console.error('Etkinlik güncellenirken hata:', error);
      alert('Etkinlik güncellenirken bir hata oluştu');
      dropInfo.revert();
    } 
  };

  // Etkinlik süresini değiştir
  const handleEventResize = async (resizeInfo) => {
    try {
      const updatedEvent = {
        start: resizeInfo.event.start,
        end: resizeInfo.event.end
      };
      const resizeId = resizeInfo.event._def.extendedProps._id;
      await updateEvent(updatedEvent, resizeId);
      setCurrentEvents(events);
    } catch (error) {
      console.error('Etkinlik güncellenirken hata:', error);
      alert('Etkinlik güncellenirken bir hata oluştu');
      resizeInfo.revert();
    }
  };
 

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewEventTitle("");
    setSelectedDate(null);
  };
  const handleDelCloseModal = () => {
    setIsDelModalOpen(false);
    setNewEventTitle("");
    setSelectedDate(null);
  };

  return (
    <>
      <div className="flex w-full m-10 relative gap-5">
        {isLoading && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}
        
        <div className="w-3/4 h-full">
          <FullCalendar
            height={"85vh"}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            eventDrop={handleEventDrop}
            eventResize={handleEventResize}
            events={currentEvents}
            eventClassNames={["bg-slate-400", "hover:bg-slate-600",   "text-white", "font-bold","border-none"]}
            eventTimeFormat={{
              hour: '2-digit',    
              minute: '2-digit',  
              meridiem: false     
            }}
          />
        </div>
        <div className="w-1/4 h-full flex flex-col ">
          <div className="text-2xl font-extrabold">
            Events
          </div>
          <ul className="space-y-4 overflow-scroll scrollbar-hide mt-5">
            {currentEvents?.length <= 0 && (
              <div className="italic px-7 dark:text-gray-400 text-gray-700">
                There is no event.
              </div>
            )}

            {sortedEvents?.map((event) => (
              <li
                className="border border-gray-200 shadow px-4 py-2 rounded-md  truncate min-w-0 italic  items-center  text-gray-400 my-1 w-full overflow-hidden text-left"
                key={event._id}
              >
                {event.title}
                <br />
                {event.start ? (
                  <label className="text-gray-600 flex justify-end">
                    {new Date(event.start).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </label>
                ) : (
                  <label className="text-slate-950">No date</label>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="text-lg font-bold mb-4 text-gray-700 dark:text-slate-700">Add a new event</div>
        <form onSubmit={handleSubmitEvent} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Event Title
            </label>
            <input
              type="text"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              placeholder=""
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-800  bg-gray-100 dark:bg-slate-200 text-slate-600"
              disabled={isLoading}
            />
          </div>
          {selectedDate && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date:
              </label>
              <div className="mt-1 text-gray-600">
                {new Date(selectedDate.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          )}
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-slate-200"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-slate-400 hover:bg-slate-600 dark:text-slate-200 dark:bg-zinc-800  text-white font-bold py-2 px-4  dark:border dark:border-gray-400 rounded-md border-2 h-10"
              disabled={isLoading}
            >
              {isLoading ? 'Ekleniyor...' : 'Submit'}
            </button>
          </div>
        </form>
      </Modal>
      <DeleteModal isOpen={isDelModalOpen} onClose={handleDelCloseModal}>
        <div className="text-lg font-bold mb-4 text-gray-700 dark:text-slate-700">Are you sure you want to delete the selected event?</div>
        <form onSubmit={handleDeleteClick} className="space-y-4">
         
        {selectedDate && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date:
              </label>
              <div className="mt-1 text-gray-600">
                {new Date(selectedDate.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={handleDelCloseModal}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-slate-200"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-slate-400 hover:bg-slate-600 dark:text-slate-200 dark:bg-zinc-800  text-white font-bold py-2 px-4  dark:border dark:border-gray-400 rounded-md"
              disabled={isLoading}
            >
              {isLoading ? 'Deleting...' : 'Submit'}
            </button>
          </div>
        </form>
      </DeleteModal>
    </>
  );
};

export default Calendar;