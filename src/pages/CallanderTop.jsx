import React, { useEffect, useState } from "react";

const CallanderTop = () => {
  const item = [
    "Feed",
    "Events",
    "Callander",
    "Tasks",
    "Students",
    "Query",
    "All Competitions",
  ];

  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const divTop = document.getElementById("scroll-div").offsetTop;

      // Jab scrollTop divTop ke barabar ya usse zyada ho jaye, toh div fixed ho jaye
      if (scrollTop > divTop) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Top Section */}
      <div className="w-[99vw] h-[775px] bg-topBgColor flex items-center justify-between px-[6.667vw]">
        <div className="w-[43.958vw] leading-lineheight">
          <div className="w-[100px] h-[100px] bg-blue-400 rounded-full"></div>
          <h5 className="text-grayTextColor text-xl mt-[23px]">Ranking #1</h5>
          <h5 className="text-custom-40 font-fontweight700 font-inter mt-[23px]">
            XYZ College Of Engineering & Technology, Bhilai CG.
          </h5>
          <div className="flex gap-10 mt-[23px]">
            <button className="w-[143px] h-[44px] rounded-[14px] bg-bgblack text-white">
              ANALYTICS
            </button>
            <button className="w-[143px] h-[44px] rounded-[14px] bg-transparent border border-black font-semibold">
              CONTACT
            </button>
          </div>
        </div>
        <div className="w-[336.37px] h-[343.49px] bg-gradient-to-b from-pink-500 to-yellow-300 rounded-full rotate-[-15.82deg] relative opacity-45 blur">
          <div className="absolute top-[-30px] right-[3px] w-[237.16px] h-[237.16px] bg-gradient-to-r from-pink-700 to-purple-400 rounded-full rotate-[-15.82deg] opacity-95"></div>
        </div>
      </div>

      <div
        id="scroll-div"
        className={`${
          isFixed ? "fixed top-0 left-0 w-full z-50" : "relative"
        } bg-white  w-[99vw] overflow-hidden overflow-x-auto scroll-smooth  h-[100px] flex items-center justify-start gap-7 font-semibold text-xl px-[6.667vw] shadow-md transition-all duration-300 ease-in-out`}
      >
        {item.map((item, index) => (
          <p key={index} className="cursor-pointer">
            {item}
          </p>
        ))}
      </div>
    </>
  );
};

export default CallanderTop;
