import { ethers } from "ethers";
import { useState } from "react";

const Page1 = (props) => {
  return (
    <div className=" relative bg-white md:w-1/2 w-full  h-screen flex flex-col justify-between items-center">
      <div className="pt-4 flex flex-col justify-center items-center">
        <div
          className="btn absolute left-8 top-0  mt-4 "
          onClick={() => {
            props.changePage(0);
          }}
        >
          {" "}
          back
        </div>
        <div className=" text-3xl font-bold"> Select Wallet Type</div>
        <div className="pb-4 text-gray-500 "> Lets Start the Game</div>

        <div className="flex flex-row z-10 ">
          <div
            className="card bg-base-100/75 w-64 shadow-xl  m-4 cursor-pointer hover:shadow-inner"
            onClick={() => {
              props.changePage(20);
            }}
          >
            <figure>
              <img src="./assets/img/wallet2.png" alt="silver wallet" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Silver Wallet</h2>
              <p>Check your Knowledge and win Wallet'Pharses</p>
            </div>
          </div>
          <div
            className="card bg-base-100/75 w-64 shadow-xl  m-4 cursor-pointer hover:shadow-inner"
            onClick={() => {
              props.changePage(40);
            }}
          >
            <figure>
              <img src="./assets/img/wallet.png" alt="golden wallet" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Golden Wallet</h2>
              <p>
                Play game and get highest score and hunt the Golden Wallet
                phrases
              </p>
            </div>
          </div>
        </div>
      </div>

      <img
        className="absolute w-full bottom-0 z-0"
        src="/assets/img/bg.png"
        alt=""
      />
    </div>
  );
};
export default Page1;
