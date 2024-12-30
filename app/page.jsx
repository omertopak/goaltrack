"use client"
import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Moment.js ile yerel ayarları yapılandır
const localizer = momentLocalizer(moment);

const handleSelectEvent = (event) => {
  const newTitle = prompt("Yeni etkinlik adı:", event.title);
  if (newTitle) {
    const updatedEvents = events.map((e) =>
      e.title === event.title ? { ...e, title: newTitle } : e
    );
    setEvents(updatedEvents);
  }
};


const Home = () => {
  const [events, setEvents] = useState([
    {
      title: "Etkinlik 1",
      start: new Date(2024, 11, 15, 10, 0), // 2024-12-15, 10:00
      end: new Date(2024, 11, 15, 12, 0), // 2024-12-15, 12:00
    },
    {
      title: "Etkinlik 2",
      start: new Date(2024, 11, 20, 14, 0), // 2024-12-20, 14:00
      end: new Date(2024, 11, 20, 16, 0), // 2024-12-20, 16:00
    },
  ]);

  const handleSelectSlot = (slotInfo) => {
    const title = prompt("Etkinlik adı:");
    if (title) {
      const newEvent = {
        title,
        start: slotInfo.start,
        end: slotInfo.end,
      };
      setEvents([...events, newEvent]);
    }
  };
  const eventStyleGetter = (event) => {
    const style = {
      backgroundColor: event.title === "Etkinlik 1" ? "red" : "green", // Etkinlik türüne göre renk değiştir
      color: "white",
      borderRadius: "5px",
      border: "none",
    };
    return {
      style,
    };
  };
  const handleRangeChange = ({ start, end }) => {
    console.log("Yeni tarih aralığı:", start, end);
    // Burada yeni tarih aralığına göre etkinlikleri filtreleyebilirsiniz.
  };
  const handleNavigate = (date, view) => {
    console.log("Navigasyon değişti:", date, view);
  };
  
  
  return (
    <div>
      <h1>Takvim</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        style={{ height: 500 }}
        onSelectSlot={handleSelectSlot} // Yeni etkinlik eklemek için
        onSelectEvent={handleSelectEvent} // Etkinlik tıklandığında çalışacak fonksiyon
        eventPropGetter={eventStyleGetter} // Etkinlik stilini özelleştir
        defaultView="week"
        views={['month', 'week', 'day']} // Görünüm seçenekleri
        onRangeChange={handleRangeChange} // Tarih aralığı değiştiğinde
        onNavigate={handleNavigate} // Navigasyon işlemi (Next, Back, Today)
        toolbar={true} // Toolbar butonlarını aktif et

      />
    </div>
  );
};

export default Home;
