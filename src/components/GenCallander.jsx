import React, { useState, useEffect } from "react";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);

  useEffect(() => {
    generateCalendar(currentDate);
  }, [currentDate]);

  const generateCalendar = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

    let days = [];
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(""); // Adding empty cells
    }
    // Days of the current month
    for (let i = 1; i <= lastDayOfMonth; i++) {
      days.push(i); // Adding days of the month
    }
    // Empty cells for remaining spaces to make a 7x5 grid (35 cells total)
    const totalCells = 35; // 7 columns * 5 rows = 35 cells
    const remainingCells = totalCells - days.length;
    for (let i = 0; i < remainingCells; i++) {
      days.push(""); // Adding empty cells to the end
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

  const currentDay = currentDate.getDay(); // Day of the week (0-6)
  const currentMonthDate = currentDate.getDate(); // Date of the current day (1-31)

  return (
    <div className="w-full mx-auto p-4 my-5">
      <div className="w-full flex justify-between items-center mb-4 ">
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
        <div className="w-[20%] flex ">
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
                ? "bg-blue-500 text-white py-2 rounded-md "
                : "text-gray-500"
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 grid-rows-5 mt-2">
        {daysInMonth.map((day, index) => (
          <div
            key={index}
            className={`p-2 text-start h-[15vw] font-bold ${
              day ? "border border-gray-300 border-t-0" : ""
            } ${
              day === currentMonthDate ? "border-blue-500 bg-blue-400 " : ""
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
