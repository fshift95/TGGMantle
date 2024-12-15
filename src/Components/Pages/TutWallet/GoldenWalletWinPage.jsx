import { ethers } from "ethers";
import { useState } from "react";
import { toast } from "react-toastify";

const GoldenWalletWinPage = (props) => {
  return (
    <div className="flex w-full flex-col justify-centrer items-center bg-slate-200 z-20 pt-4 px-2">
      <div className="text-2xl gfont3">Congrats!</div>
      <div className="text-2xl gfont3 pb-4">You won</div>
      <img className="w-52" src="./assets/img/winn.png" alt="" />
      <div>save this phrases somewhere safe.</div>
      <div className="font-bold text-center p-2 text-xl bg-white rounded-xl my-2 shadow-xl">
        {props.phrases}
      </div>
      <div
        className="btn mb-4  "
        onClick={() => {
          navigator.clipboard.writeText(props.phrases).then(() => {
            toast.success("Address has been Copied to clipboard");
          });
        }}
      >
        Copy
      </div>
    </div>
  );
};
export default GoldenWalletWinPage;
