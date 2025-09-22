import { TransactionDropdownStyles, TransactionDropdownStylesMobile } from '../styles/transaction';
import Image from 'next/image';
import refresh from '@/public/assets/refresh-2.svg';
import { useWidth } from '@/hooks';

const breakpoint = 1024;
const TransactionDrowdown = ({ data, onCloseDropdown }) => {
  const { responsive } = useWidth(breakpoint);
  // console.log(data._id);
  return (
    <>
      {responsive ? (
        <TransactionDropdownStyles>
          <div>
            <h3>Payment ID</h3>
            <p>#{data ? data._id.slice(0, 8) : null}</p>
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
          <button onClick={onCloseDropdown}>
            <Image src={refresh} alt="Refresh icon" />
            <p>Retry</p>
          </button>
        </TransactionDropdownStyles>
      ) : (
        <TransactionDropdownStylesMobile>
          <div>
            <h3>Payment ID</h3>
            <p>#{data ? data._id.slice(0, 8) : null}</p>
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
          <button onClick={onCloseDropdown}>
            <Image src={refresh} alt="Refresh icon" />
            <p>Retry</p>
          </button>
        </TransactionDropdownStylesMobile>
      )}{' '}
    </>
  );
};

export default TransactionDrowdown;
