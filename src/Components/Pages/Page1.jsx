import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAccount } from "@metamask/sdk-react-ui";
const Page1 = (props) => {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const { isConnected } = useAccount();

  useEffect(() => {
    const contract = props.state.contract;
    const provider = props.state.provider;

    contract?.walletAddress1().then((addr) => {
      console.log(addr);
      setAddress(addr);
      provider.getBalance(addr).then((t) => {
        setBalance(t);
      });
    });
  }, []);

  return (
    <div className=" relative bg-white md:w-1/2 w-full  h-screen flex flex-col justify-start items-center ">
      <div className="flex my-4">
        <div
          className="btn   gfont3 text-sm "
          onClick={() => {
            props.changePage(0);
          }}
        >
          {" "}
          back
        </div>
        <div className="gfont3 px-4">
          <div className=" text-2xl font-bold  text-center ">
            {" "}
            Select Wallet Type
          </div>
          <div className="pb-4 text-gray-500 text-center  ">
            {" "}
            Lets Start the Game
          </div>
        </div>
      </div>

      <div className="pt-4 flex flex-col justify-center items-center overflow-auto sm:pt-48 ">
        <div className=" flex flex-row justify-center items-center w-full z-10  flex-wrap  ">
          <div
            className="p-2 flex flex-col items-center rounded-2xl bg-base-100/75 w-64 shadow-xl  m-4 cursor-pointer hover:shadow-inner  hover:bg-base-300"
            onClick={() => {
              props.changePage(20);
            }}
          >
            <figure>
              <img
                className="w-40"
                src="./assets/img/wallet.png"
                alt="golden wallet"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title gfont3">Golden Wallet</h2>
              <p>
                Check your Web3 & Mantle Network Knowledge and win
                Wallet'Pharses
              </p>
              <div className="text-sm font-bold">
                you are going to win below wallet
              </div>
              <div className="w-4 text-accent  break-normal">{address}</div>
            </div>
          </div>
          <div
            className="p-2 flex flex-col items-center rounded-2xl bg-base-100/75 w-64 shadow-xl  m-4 cursor-pointer hover:shadow-inner hover:bg-base-300"
            onClick={() => {
              // props.changePage(40);
              toast.info("Under Construction!");
            }}
          >
            <figure>
              <img
                className="w-40"
                src="./assets/img/wallet2.png"
                alt="silver wallet"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title gfont3">Silver Wallet</h2>
              <p>
                Play game and get highest score and hunt the Golden Wallet
                phrases
              </p>
            </div>
          </div>

          <div
            className="p-2 flex flex-col items-center rounded-2xl bg-base-100/75 w-64 shadow-xl  m-4 cursor-pointer hover:shadow-inner  hover:bg-base-300"
            onClick={() => {
              //props.changePage(60);
              toast.info("Under Construction!");
            }}
          >
            <figure>
              <img
                className="w-40"
                src="./assets/img/wallet-g.png"
                alt="green wallet"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title gfont3">Green Wallet</h2>
              <p>Play Puzzle game and take out a wallet phrase</p>
            </div>
          </div>
        </div>
      </div>

      <img
        className="absolute w-full bottom-0 z-0"
        src="/assets/img/basea-2.png"
        alt=""
      />
    </div>
  );
};
export default Page1;
