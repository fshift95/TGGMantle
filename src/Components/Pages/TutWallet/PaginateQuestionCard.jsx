import { ethers } from "ethers";
import { useState } from "react";

const PaginateQuestionCard = (props) => {
  const { paginateNumber } = props;
  return (
    <div
      className={
        props.currentQNumber === props.paginateNumber
          ? "btn btn-xs  cursor-pointer btn-accent"
          : "btn btn-xs  cursor-pointer"
      }
      onClick={(paginateNumber) => {
        props.changeQuestion(props.paginateNumber);
      }}
    >
      {props.paginateNumber}
    </div>
  );
};
export default PaginateQuestionCard;
