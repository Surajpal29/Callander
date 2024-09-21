import React, { useState, useEffect } from "react";

const Calendar = ({ events }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null); // Track selected day
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility

  useEffect(() => {
    generateCalendar(currentDate);
  }, [currentDate]);

  const generateCalendar = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

    let days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(""); // Empty cells for days before the first day
    }
    for (let i = 1; i <= lastDayOfMonth; i++) {
      days.push(i); // Adding days of the month
    }
    const totalCells = 42;
    const remainingCells = totalCells - days.length;
    for (let i = 0; i < remainingCells; i++) {
      days.push(""); // Empty cells to make 7x6 grid
    }
    setDaysInMonth(days);
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const getMonthYear = (date) => {
    return date.toLocaleString("default", { month: "long", year: "numeric" });
  };

  const getMonth = (date) => {
    return date.toLocaleString("default", { month: "long" });
  };

  const currentDay = currentDate.getDay();
  const currentMonthDate = currentDate.getDate();

  const findEventsForDay = (day, month, year) => {
    return events.filter((event) => {
      const eventDay = parseInt(event.date);
      const eventMonth = parseInt(event.month);
      const eventYear = parseInt(event.year);
      return eventDay === day && eventMonth === month + 1 && eventYear === year;
    });
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedDay(null);
  };

  // Function to handle click outside the modal content
  const handleOverlayClick = (e) => {
    // If the user clicks on the overlay (not the modal content), close the modal
    if (e.target.className.includes("modal-overlay")) {
      closeModal();
    }
  };

  return (
    <div className="w-full mx-auto p-4 mt-5">
      <div className="w-full flex justify-between items-center mb-4">
        <p className="w-[13%] text-gray-500 font-bold md:text-xl">
          {getMonth(currentDate)}, {currentDate.getDate()}
          {currentDate.getDate() > 3
            ? "th"
            : currentDate.getDate() === 3
            ? "rd"
            : currentDate.getDate() === 2
            ? "nd"
            : currentDate.getDate() === 1
            ? "st"
            : ""}
        </p>
        <div className="w-[20%] flex">
          <button
            onClick={goToPreviousMonth}
            className="md:text-lg font-semibold p-2"
          >
            &lt;
          </button>
          <h2 className="md:text-xl font-bold px-5 py-2 bg-gray-100 rounded-sm">
            {getMonthYear(currentDate)}
          </h2>
          <button
            onClick={goToNextMonth}
            className="md:text-lg font-semibold p-2"
          >
            &gt;
          </button>
        </div>
        <button className="w-[18%] ml-16 md:ml-0 md:w-[10%] bg-black py-1 md:py-2 text-white rounded-md">
          Add New
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center font-medium">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
          <div
            key={day}
            className={`text-sm md:text-xl font-bold ${
              currentDay === index
                ? "bg-blue-500 text-white py-2 rounded-md"
                : "text-gray-500"
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 grid-rows-6 mt-2">
        {daysInMonth.map((day, index) => {
          const eventsForDay = day
            ? findEventsForDay(
                day,
                currentDate.getMonth(),
                currentDate.getFullYear()
              )
            : [];

          return (
            <div
              key={index}
              className={`p-2 text-start h-[15vw] font-bold ${
                day ? "border border-gray-300 border-t-0" : ""
              } ${
                day === currentMonthDate ? "border-blue-500 bg-blue-400" : ""
              }`}
              onClick={() => day && handleDayClick(day)}
            >
              <div>{day}</div>
              {eventsForDay.length > 0 &&
                eventsForDay.map((event, eventIndex) => (
                  <div
                    key={eventIndex}
                    className="text-sm  p-1 mt-1 rounded-md"
                  >
                    {event.eventName} <br />
                    {event.time}
                  </div>
                ))}
            </div>
          );
        })}
      </div>

      {modalVisible && selectedDay && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center modal-overlay"
          onClick={handleOverlayClick}
        >
          <div className="bg-white p-5 rounded-lg w-[80%] max-w-lg">
            <h2 className="text-xl font-bold mb-4">
              Events for {selectedDay} {getMonth(currentDate)}{" "}
              {currentDate.getFullYear()}
            </h2>
            <div className="flex flex-col">
              {Array.from({ length: 24 }, (_, hour) => (
                <div
                  key={hour}
                  className="flex justify-between items-center border-b py-2"
                >
                  <span>{hour}:00</span>
                  <div className="flex-1 pl-4">
                    {findEventsForDay(
                      selectedDay,
                      currentDate.getMonth(),
                      currentDate.getFullYear()
                    )
                      .filter((event) => event.time.startsWith(`${hour}:`))
                      .map((event, index) => (
                        <div
                          key={index}
                          className="text-sm bg-blue-400 p-1 rounded-md mb-2"
                        >
                          {event.eventName} at {event.time}
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={closeModal}
              className="mt-4 bg-red-500 text-white p-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
