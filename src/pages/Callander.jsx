import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import GenCallander from "../components/GenCallander.jsx";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const Callander = () => {
  const [isAddEvent, setIsAddEvent] = useState(false);
  const [eventData, setEventData] = useState({
    eventName: "",
    date: "",
    month: "",
    year: "",
    time: "",
  });
  const [events, setEvents] = useState([]);

  // Local storage se events ko load karna on initial render
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  };

  function HandleAddEvent() {
    setIsAddEvent(!isAddEvent);
  }

  function handleButtonCreate(e) {
    e.preventDefault();
    const { eventName, date, month, year, time } = eventData;

    // Naya event object
    const newEvent = {
      eventName,
      date,
      month,
      year,
      time,
    };

    // Local storage me events ko save karna
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));

    console.log("Event added successfully:", newEvent);

    // Form reset aur modal close
    setEventData({
      eventName: "",
      date: "",
      month: "",
      year: "",
      time: "",
    });
    setIsAddEvent(false);
  }

  return (
    <div className={`w-[99vw] px-[6.667vw] py-10 relative `}>
      {isAddEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="relative w-[90%] md:w-[50%] mx-auto border border-gray-200 shadow-sm rounded-md bg-white overflow-hidden">
            <div className="p-5 rounded-lg">
              <div
                onClick={HandleAddEvent}
                className="font-bold cursor-pointer mb-5"
              >
                <KeyboardBackspaceIcon /> Back
              </div>
              <form
                onSubmit={handleButtonCreate}
                className="leading-lineheight px-8 overflow-y-auto hide-scrollbar max-h-[60vh]"
              >
                <label htmlFor="eventName">Add event name</label>
                <input
                  type="text"
                  name="eventName"
                  value={eventData.eventName}
                  onChange={handleChange}
                  className="w-[90%] px-2 mb-4 border bg-inputbg rounded-md font-fontweight500"
                  placeholder="Eg. Quiz Competition 'Tech'"
                  required
                />
                <br />
                <label htmlFor="time">Time</label>
                <br />
                <input
                  type="time"
                  name="time"
                  value={eventData.time}
                  onChange={handleChange}
                  className="w-[90%] px-2 mb-4 border bg-inputbg rounded-md font-fontweight500"
                  required
                />
                <br />
                <label htmlFor="date">Date</label>
                <br />
                <div className="flex mb-4">
                  <input
                    type="number"
                    name="date"
                    value={eventData.date}
                    onChange={handleChange}
                    className="w-20 px-2 border bg-inputbg rounded-md font-fontweight500"
                    placeholder="DD"
                    min="1"
                    max="31"
                    required
                  />
                  <input
                    type="number"
                    name="month"
                    value={eventData.month}
                    onChange={handleChange}
                    className="w-20 px-2 border bg-inputbg rounded-md font-fontweight500 mx-5"
                    placeholder="MM"
                    min="1"
                    max="12"
                    required
                  />
                  <input
                    type="number"
                    name="year"
                    value={eventData.year}
                    onChange={handleChange}
                    className="w-20 px-2 border bg-inputbg rounded-md font-fontweight500"
                    placeholder="YYYY"
                    min="1900"
                    max={new Date().getFullYear()}
                    required
                  />
                </div>
                <div className="w-full flex items-center justify-center mt-10">
                  <button
                    type="submit"
                    className="w-[30%] bg-black text-white rounded-md py-2 uppercase"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="font-fontweight700 leading-lineheight md:text-xl">
        <h6>At this moment there is no event scheduled</h6>
      </div>
      <div className="w-full flex items-center justify-center">
        <div>
          <p className="font-fontweight700 uppercase leading-lineheight mt-5  md:ml-0">
            you can add only one event in one day
          </p>
          <button
            onClick={HandleAddEvent}
            className="w-[90%]  md:w-[30.417vw] border-2 border-dashed border-black text-xl py-5 rounded-md text-grayTextColor"
          >
            <AddIcon className="my-[-13px]" /> Add event
          </button>
        </div>
      </div>

      <GenCallander events={events} />
    </div>
  );
};

export default Callander;
