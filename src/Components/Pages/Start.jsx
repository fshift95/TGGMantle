import { ethers } from "ethers";
import { useState } from "react";

const Start = (props) => {
  return (
    <div className="bg-custom md:w-1/2 w-full bg-white h-screen flex flex-col justify-between items-center">
      <div className="pt-4 flex flex-col">
        <div className=" text-3xl font-bold"> Welcome to Win Wallet Game</div>
        <div className="pb-4 text-gray-500 ">
          {" "}
          This Game (Dapp) has been developed for Mantle Hackathon
        </div>
        <div
          className="btn  mt-12"
          onClick={() => {
            props.changePage(1);
          }}
        >
          {" "}
          Start the Quest and win some Wallet
        </div>
      </div>

      <img src="/assets/img/bg.png" alt="" />
    </div>
  );
};
export default Start;
