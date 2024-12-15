import { ethers } from "ethers";
import { useState } from "react";
import QCard from "./QCard";
import PaginateQuestionCard from "./PaginateQuestionCard";
import { toast } from "react-toastify";
import { Wallet } from "ethers";
import GoldenWalletWinPage from "./GoldenWalletWinPage";
import { useAccount } from "@metamask/sdk-react-ui";

const Page20 = (props) => {
  const [qvisibilty, setQvisibilty] = useState({
    qNumber: 1,
  });
  const [showQ, setShowQ] = useState(true);
  const [pendingT, setPendingT] = useState(false);
  const { isConnected } = useAccount();
  const [answer, setAnswer] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: "",
    q7: "",
    q8: "",
    q9: "",
    q10: "",
    q11: "",
    q12: "",
  });
  const { contract } = props.state;
  const { provider } = props.state;
  const [goldenWalletPhrase, setGoldenWalletPhrase] = useState("");
  const claimwinner = async () => {
    if (!isConnected) {
      toast.error("Connect your Wallet");
      return;
    }
    const GoldenWalletBalance = await contract
      .getGoldenWalletPrize()
      .then((addr) => {
        toast.success("Congrats! You are the winner");
        setGoldenWalletPhrase(addr);
        setShowQ(false);
      })
      .catch((d) => {
        toast.error("You did Not Win :( Try again");
      });
  };

  const submitAnswers = async () => {
    if (!isConnected) {
      toast.error("Connect your Wallet");
      return;
    }
    let answerr = "";
    Object.values(answer).forEach((v, index) => {
      answerr = answerr.concat(v);
    });
    if (pendingT) {
      toast.info("please wait until transaction has been confimed");
      return;
    }
    setPendingT(true);
    if (answerr.length == 12) {
      toast.info("Please confirm the transaction sent to your wallet");
      const wallet = Wallet.fromPhrase(
        ethers.Mnemonic.entropyToPhrase(ethers.randomBytes(16))
      );
      // let aanswer = "acbbbcbbcbdb";
      const rss = await contract
        .claimGoldenWallet(wallet.mnemonic.phrase, wallet.address, answerr)
        .then((addr) => {
          toast.info("Please Wait Until We Notify You");
          addr.wait().then((s) => {
            setPendingT(false);
            toast.success("Now Claim Your Prize");
          });
        })
        .catch((err) => {
          setPendingT(false);
          console.log(err.reason);
          if (err.reason != undefined && err.reason.length > 0) {
            toast.error(err.reason);
          } else {
            toast.error("Ooops! something is wrong please Try again");
          }
        });
    } else {
      toast.error("answer all the question");
    }
  };

  return (
    <div className=" relative bg-white md:w-1/2 w-full  h-screen flex flex-col justify-start items-center ">
      <div>
        <div className="flex my-4">
          <div
            className="btn btn   gfont3 text-sm "
            onClick={() => {
              props.changePage(0);
            }}
          >
            {" "}
            back
          </div>
          <div className=" text-2xl font-bold gfont3 text-center px-2">
            Find Golden Wallet Phrase
          </div>
        </div>

        <div className="pb-4 text-gray-500 px-4 ">
          {" "}
          answer 12 question correctly and claim the phrases. These question are
          copied from "Mantle Developer" course in Hackquest Website for The
          Mantle hackathon Only. you can check and find correct answers and alot
          of usefull things about Mantle Network and Web3 there.
        </div>
      </div>

      <div className="pt-4 flex flex-col justify-center items-center w-full  ">
        <div className="w-full flex flex-col">
          <div className="w-full flex flex-col">
            {!showQ ? (
              <GoldenWalletWinPage phrases={goldenWalletPhrase} />
            ) : (
              <>
                <QCard
                  answerRegister={(a) => {
                    setAnswer((prev) => ({ ...prev, q1: a }));
                  }}
                  answered={answer.q1}
                  visibility={qvisibilty.qNumber}
                  question="1- What problems does Layer 2 technology emerge to solve in blockchain?"
                  answer="a"
                  number={1}
                  a="Low throughput and high transaction fees"
                  b="Decentralization and security"
                  c="High scalability and low costs"
                  d="Strong privacy protection and disintermediation"
                />
                <QCard
                  answerRegister={(a) => {
                    setAnswer((prev) => ({ ...prev, q2: a }));
                  }}
                  answered={answer.q2}
                  visibility={qvisibilty.qNumber}
                  answer="c"
                  number={2}
                  question="2- The main advantage of sidechains over state channels is:"
                  a="Higher transaction speed"
                  b="Lower technical complexity"
                  c="Ability to handle a wider range of transaction types"
                  d="Lower transaction costs"
                />
                <QCard
                  answerRegister={(a) => {
                    setAnswer((prev) => ({ ...prev, q3: a }));
                  }}
                  answered={answer.q3}
                  visibility={qvisibilty.qNumber}
                  answer="b"
                  number={3}
                  question="3-Why can Ethereum, a Layer1 protocol, support the challenge mechanism of Optimistic Rollup?"
                  a="Ethereum has fast transaction confirmation speed."
                  b="Ethereum supports smart contracts, making it easy to implement complex challenge logic."
                  c="Ethereum has higher security."
                  d="Ethereum's block size is better suited for the needs of the challenge mechanism."
                />
                <QCard
                  answerRegister={(a) => {
                    setAnswer((prev) => ({ ...prev, q4: a }));
                  }}
                  answered={answer.q4}
                  visibility={qvisibilty.qNumber}
                  question="4-What is the principle of zero-knowledge proof?"
                  answer="b"
                  number={4}
                  a="Disclosing all transaction details."
                  b="Mathematically proving transaction correctness without revealing details."
                  c="Submitting challenges every time."
                  d="Having validators verify all transactions."
                />
                <QCard
                  answerRegister={(a) => {
                    setAnswer((prev) => ({ ...prev, q5: a }));
                  }}
                  answered={answer.q5}
                  visibility={qvisibilty.qNumber}
                  question="5-What Layer 2 technology does Mantle use as its foundation?"
                  answer="b"
                  number={5}
                  a="Proof of Work"
                  b="Optimistic Rollup"
                  c="Proof of Stake"
                  d="zk-SNARKs"
                />
                <QCard
                  answerRegister={(a) => {
                    setAnswer((prev) => ({ ...prev, q6: a }));
                  }}
                  answered={answer.q6}
                  visibility={qvisibilty.qNumber}
                  question="6-How does modular architecture enhance the overall performance of a blockchain system?"
                  answer="c"
                  number={6}
                  a="By consolidating all functionalities into a single layer to reduce communication overhead"
                  b="By limiting the functionalities of each layer to reduce complexity"
                  c="By allowing each layer to be independently optimized, improving the system's flexibility and scalability"
                  d="By implementing synchronous operations across all layers to ensure data consistency"
                />
                <QCard
                  answerRegister={(a) => {
                    setAnswer((prev) => ({ ...prev, q7: a }));
                  }}
                  answered={answer.q7}
                  visibility={qvisibilty.qNumber}
                  question="7-Generally, what is the first step for a user to initiate a transaction on Mantle Network?"
                  answer="b"
                  number={7}
                  a="Directly send a transaction request to Mantle network."
                  b="Install a digital wallet and add the RPC node address of Mantle network."
                  c="Purchase Mantle tokens."
                  d="Directly contact the Sequencer node to initiate a transaction."
                />
                <QCard
                  answerRegister={(a) => {
                    setAnswer((prev) => ({ ...prev, q8: a }));
                  }}
                  answered={answer.q8}
                  visibility={qvisibilty.qNumber}
                  question="8-What is the role of State Root in Mantle network?"
                  answer="b"
                  number={8}
                  a="Storing detailed information about each transaction."
                  b="Serving as a cryptographic digest of the current complete state of the blockchain."
                  c="Directly processing and validating transactions."
                  d="Managing user accounts and assets."
                />
                <QCard
                  answerRegister={(a) => {
                    setAnswer((prev) => ({ ...prev, q9: a }));
                  }}
                  answered={answer.q9}
                  visibility={qvisibilty.qNumber}
                  question="9-What is the role of Fraud Proof in Mantle network?"
                  answer="c"
                  number={9}
                  a="Storing detailed information about each transaction."
                  b="Serving as a cryptographic digest of the current complete state of the blockchain."
                  c="Directly processing and validating transactions."
                  d="Managing user accounts and assets."
                />
                <QCard
                  answerRegister={(a) => {
                    setAnswer((prev) => ({ ...prev, q10: a }));
                  }}
                  answered={answer.q10}
                  visibility={qvisibilty.qNumber}
                  question="10-What is the primary responsibility of MantleDA in Mantle network?"
                  answer="b"
                  number={10}
                  a="Directly process and confirm transactions."
                  b="Store all Layer2 transaction data."
                  c="Generate new Stateroot data."
                  d="Manage users' wallets and funds."
                />
                <QCard
                  answerRegister={(a) => {
                    setAnswer((prev) => ({ ...prev, q11: a }));
                  }}
                  answered={answer.q11}
                  visibility={qvisibilty.qNumber}
                  question="11-In comparison to traditional OP Rollups, what significant improvements does Mantle achieve?"
                  answer="d"
                  number={11}
                  a="Improvements only at the execution layer."
                  b="Storage optimization at the data availability layer."
                  c="Consensus mechanism at the settlement layer."
                  d="Comprehensive optimization across the execution layer, settlement layer, and data availability layer."
                />
                <QCard
                  answerRegister={(a) => {
                    setAnswer((prev) => ({ ...prev, q12: a }));
                  }}
                  answered={answer.q12}
                  visibility={qvisibilty.qNumber}
                  question="12-What problem is the introduction of meta transactions (Meta Transaction) in Mantle aimed to solve?"
                  answer="b"
                  number={12}
                  a="Increase the speed of transaction processing"
                  b="Lower the barrier to user participation"
                  c="Improve blockchain security"
                  d="Increase the issuance of new tokens"
                />
              </>
            )}
          </div>
          {showQ ? (
            <div className="flex w-full justify-center gap-2 py-2 z-10">
              <PaginateQuestionCard
                currentQNumber={qvisibilty.qNumber}
                paginateNumber={1}
                changeQuestion={(s) => {
                  setQvisibilty({ qNumber: s });
                }}
              />
              <PaginateQuestionCard
                currentQNumber={qvisibilty.qNumber}
                paginateNumber={2}
                changeQuestion={(s) => {
                  setQvisibilty({ qNumber: s });
                }}
              />
              <PaginateQuestionCard
                currentQNumber={qvisibilty.qNumber}
                paginateNumber={3}
                changeQuestion={(s) => {
                  setQvisibilty({ qNumber: s });
                }}
              />
              <PaginateQuestionCard
                currentQNumber={qvisibilty.qNumber}
                paginateNumber={4}
                changeQuestion={(s) => {
                  setQvisibilty({ qNumber: s });
                }}
              />
              <PaginateQuestionCard
                currentQNumber={qvisibilty.qNumber}
                paginateNumber={5}
                changeQuestion={(s) => {
                  setQvisibilty({ qNumber: s });
                }}
              />
              <PaginateQuestionCard
                currentQNumber={qvisibilty.qNumber}
                paginateNumber={6}
                changeQuestion={(s) => {
                  setQvisibilty({ qNumber: s });
                }}
              />
              <PaginateQuestionCard
                currentQNumber={qvisibilty.qNumber}
                paginateNumber={7}
                changeQuestion={(s) => {
                  setQvisibilty({ qNumber: s });
                }}
              />
              <PaginateQuestionCard
                currentQNumber={qvisibilty.qNumber}
                paginateNumber={8}
                changeQuestion={(s) => {
                  setQvisibilty({ qNumber: s });
                }}
              />
              <PaginateQuestionCard
                currentQNumber={qvisibilty.qNumber}
                paginateNumber={9}
                changeQuestion={(s) => {
                  setQvisibilty({ qNumber: s });
                }}
              />
              <PaginateQuestionCard
                currentQNumber={qvisibilty.qNumber}
                paginateNumber={10}
                changeQuestion={(s) => {
                  setQvisibilty({ qNumber: s });
                }}
              />
              <PaginateQuestionCard
                currentQNumber={qvisibilty.qNumber}
                paginateNumber={11}
                changeQuestion={(s) => {
                  setQvisibilty({ qNumber: s });
                }}
              />
              <PaginateQuestionCard
                currentQNumber={qvisibilty.qNumber}
                paginateNumber={12}
                changeQuestion={(s) => {
                  setQvisibilty({ qNumber: s });
                }}
              />
            </div>
          ) : null}

          {showQ ? (
            <div className="w-full flex flex-col justify-center items-center gap-2 pt-10 justify-center z-10">
              {" "}
              <button
                onClick={submitAnswers}
                className="btn bg-amber-400/75 w-2/3  gfont3"
              >
                SubmitAllQuestion
              </button>
              <button
                onClick={claimwinner}
                className="btn bg-amber-400/75 w-2/3  gfont3"
              >
                CLAIM PRIZE
              </button>
            </div>
          ) : null}
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
export default Page20;
