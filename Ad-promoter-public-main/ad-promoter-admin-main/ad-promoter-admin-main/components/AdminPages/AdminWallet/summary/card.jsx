import { useWidth } from '@/hooks';
import Image from 'next/image';
import { CardStyles, CardStylesMobile } from '../styles/summary';

const breakpoint = 1024;

const Card = (props) => {
  const { responsive } = useWidth(breakpoint);

  return (
    <>
      {responsive ? (
        <CardStyles bg={props.bg} shadow={props.shadow}>
          <div className="header">
            <Image src={props.img} alt="Money Icon" />
            <p>{props.text}</p>
          </div>
          <div className="amount">&#8358;{props.amount}</div>
        </CardStyles>
      ) : (
        <CardStylesMobile bg={props.bg} shadow={props.shadow}>
          <div className="header">
            <Image src={props.img} alt="Money Icon" />
            <p>{props.text}</p>
          </div>
          <div className="amount">&#8358;{props.amount}</div>
        </CardStylesMobile>
      )}{' '}
    </>
  );
};

export default Card;
