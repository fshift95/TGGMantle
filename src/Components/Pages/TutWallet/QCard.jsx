import { ethers } from "ethers";
import { useState } from "react";

const QCard = (props) => {
  if (props.visibility == props.number) {
    console.log("number", props.number);
    const selectedButtonStyle =
      "btn bg-lime-100 rounded-xl w-2/3 text-left text-lime-700 border-slate-800";
    console.log("visibility", props.visibility);
    return (
      <div className="   bg-base-200/75 py-4 h-96 shadow-inner  w-full flex flex-col  z-10 p-4">
        <div className="font-bold text-xl pb-8 text-lime-600 ">
          {props.question}
        </div>

        <div className="flex flex-col justify-center items-center gap-y-4">
          <button
            className={
              props.answered === "a"
                ? selectedButtonStyle
                : "btn btn-primary  rounded-xl w-2/3 text-left "
            }
            onClick={() => {
              props.answerRegister("a");
            }}
          >
            <div className="w-full text-left"> A-{props.a}</div>
          </button>
          <button
            className={
              props.answered === "b"
                ? selectedButtonStyle
                : "btn btn-primary rounded-xl w-2/3 text-left"
            }
            onClick={() => {
              props.answerRegister("b");
            }}
          >
            <div className="w-full text-left"> B-{props.b}</div>
          </button>
          <button
            className={
              props.answered === "c"
                ? selectedButtonStyle
                : "btn btn-primary rounded-xl w-2/3 text-left"
            }
            onClick={() => {
              props.answerRegister("c");
            }}
          >
            <div className="w-full text-left"> C-{props.c}</div>
          </button>
          <button
            className={
              props.answered === "d"
                ? selectedButtonStyle
                : "btn btn-primary rounded-xl w-2/3 text-left"
            }
            onClick={() => {
              props.answerRegister("d");
            }}
          >
            <div className="w-full text-left"> D-{props.d}</div>
          </button>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
export default QCard;
