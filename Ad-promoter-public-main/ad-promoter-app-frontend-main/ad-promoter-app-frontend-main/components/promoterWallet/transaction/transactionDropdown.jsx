import { TransactionDropdownStyles } from "../styles/transaction";
import Image from "next/image";
import refresh from "@/public/assets/refresh-2.svg";

const TransactionDrowdown = (props) => {
  return (
    <TransactionDropdownStyles>
      <div>
        <h3>Payment ID</h3>
        <p>#300923201</p>
      </div>
      <div>
        <h3>Invoice date</h3>
        <p>21, sept, 2019</p>
      </div>
      <div>
        <h3>Due date</h3>
        <p>21, sept, 2019</p>
      </div>
      <div>
        <h3>Date paid</h3>
        <p>21, sept, 2019</p>
      </div>
      <button onClick={props.onCloseDropdown}>
        <Image src={refresh} alt="Refresh icon"/>
        <p>Retry</p>
      </button>
    </TransactionDropdownStyles>
  );
};

export default TransactionDrowdown;
