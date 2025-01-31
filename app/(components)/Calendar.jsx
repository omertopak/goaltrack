"use client";

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from 'axios';
import Modal from '../(components)/Modal';
import useCalendarStore from "../../lib/stores/calendarStore";

const Calendar = () => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);

  const {isLoading,events,getEvents, createEvent} = useCalendarStore();

  // Etkinlikleri backend'den çek
  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/events');
      setCurrentEvents(response.data);
    } catch (error) {
      console.error('Etkinlikler yüklenirken hata:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDateClick = (arg) => {
    setSelectedDate(arg);
    setIsModalOpen(true);
  };

  // Yeni etkinlik ekle
  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    if (newEventTitle && selectedDate) {
      try {
        setIsLoading(true);
        const newEvent = {
          title: newEventTitle,
          start: selectedDate.date,
          allDay: selectedDate.allDay
        };
        
        const response = await axios.post('/api/events', newEvent);
        setCurrentEvents([...currentEvents, response.data]);
        handleCloseModal();
      } catch (error) {
        console.error('Etkinlik eklenirken hata:', error);
        alert('Etkinlik eklenirken bir hata oluştu');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Etkinlik sil
  const handleEventClick = async (clickInfo) => {
    if (window.confirm(`"${clickInfo.event.title}" etkinliğini silmek istediğinize emin misiniz?`)) {
      try {
        setIsLoading(true);
        await axios.delete(`/api/events/${clickInfo.event.id}`);
        setCurrentEvents(currentEvents.filter(event => event.id !== clickInfo.event.id));
      } catch (error) {
        console.error('Etkinlik silinirken hata:', error);
        alert('Etkinlik silinirken bir hata oluştu');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Etkinlik taşıma
  const handleEventDrop = async (dropInfo) => {
    try {
      setIsLoading(true);
      const updatedEvent = {
        id: dropInfo.event.id,
        start: dropInfo.event.start,
        end: dropInfo.event.end
      };

      await axios.put(`/api/events/${dropInfo.event.id}`, updatedEvent);
      
      setCurrentEvents(currentEvents.map(event => {
        if (event.id === dropInfo.event.id) {
          return {
            ...event,
            start: dropInfo.event.start,
            end: dropInfo.event.end
          };
        }
        return event;
      }));
    } catch (error) {
      console.error('Etkinlik güncellenirken hata:', error);
      alert('Etkinlik güncellenirken bir hata oluştu');
      dropInfo.revert();
    } finally {
      setIsLoading(false);
    }
  };

  // Etkinlik süresini değiştir
  const handleEventResize = async (resizeInfo) => {
    try {
      setIsLoading(true);
      const updatedEvent = {
        id: resizeInfo.event.id,
        start: resizeInfo.event.start,
        end: resizeInfo.event.end
      };

      await axios.put(`/api/events/${resizeInfo.event.id}`, updatedEvent);
      
      setCurrentEvents(currentEvents.map(event => {
        if (event.id === resizeInfo.event.id) {
          return {
            ...event,
            start: resizeInfo.event.start,
            end: resizeInfo.event.end
          };
        }
        return event;
      }));
    } catch (error) {
      console.error('Etkinlik güncellenirken hata:', error);
      alert('Etkinlik güncellenirken bir hata oluştu');
      resizeInfo.revert();
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
          />
        </div>
        <div className="w-1/4 h-full flex flex-col">
          <div className="text-2xl font-extrabold">
            Takvim Etkinlikleri
          </div>
          <ul className="space-y-4">
            {currentEvents.length <= 0 && (
              <div className="italic px-7 dark:text-gray-400 text-gray-700">
                Etkinlik Bulunmuyor
              </div>
            )}

            {currentEvents.map((event) => (
              <li
                className="border border-gray-200 shadow px-4 py-2 rounded-md text-blue-800"
                key={event.id}
              >
                {event.title}
                <br />
                {event.start ? (
                  <label className="text-slate-950">
                    {new Date(event.start).toLocaleDateString("tr-TR", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </label>
                ) : (
                  <label className="text-slate-950">Başlangıç tarihi yok</label>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="text-lg font-bold mb-4">Yeni Etkinlik Ekle</div>
        <form onSubmit={handleSubmitEvent} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Etkinlik Başlığı
            </label>
            <input
              type="text"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              placeholder="Etkinlik başlığını girin"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              disabled={isLoading}
            />
          </div>
          {selectedDate && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Seçilen Tarih
              </label>
              <div className="mt-1 text-gray-600">
                {new Date(selectedDate.date).toLocaleDateString("tr-TR", {
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
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              disabled={isLoading}
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={isLoading}
            >
              {isLoading ? 'Ekleniyor...' : 'Ekle'}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Calendar;