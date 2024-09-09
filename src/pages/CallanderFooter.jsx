import React from "react";

const CallanderFooter = () => {
  return (
    <div className="w-[99vw]   bg-black px-[6.667vw] py-10 text-white ">
      <div className="flex items-center justify-center gap-3">
        <hr className="h-[.5px] w-[40%] bg-grayTextColor" />
        <div className="w-fit flex-col items-center justify-items-center text-grayTextColor">
          <p>MADE WITH ❤️ BY</p>
          <p className="text-xl text-white px-12">
            C<span className="text-blue-600">r</span>x
          </p>
        </div>
        <hr className="h-[.5px] w-[40%] bg-grayTextColor" />
      </div>
      <div className="md:w-[50.048vw] mx-[20%] mt-8 flex items-start justify-between gap-4 md:gap-0 ">
        <div className="">
          <p className="text-grayTextColor font-bold mb-8">COMPANY</p>
          <p>About us</p>
          <p className="leading-lineheight">Team</p>
          <p>Carrers</p>
          <p className="leading-lineheight">Blog</p>
        </div>
        <div className="">
          <p className="text-grayTextColor font-bold mb-8">Contact</p>
          <p>Health & Support</p>
        </div>
        <div className="">
          <p className="text-grayTextColor font-bold mb-8">Legal</p>
          <p>Terms & condition</p>
          <p className="leading-lineheight">Privacy policy</p>
          <p>Cookie Policy</p>
        </div>
      </div>
      <p className="text-grayTextColor md:mx-[30%] mt-8 md:text-xl">
        Copyright © 2023 - All rights reserved by Coderscruxx
      </p>
    </div>
  );
};

export default CallanderFooter;
