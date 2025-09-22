import Image from 'next/image';
import { CardStyles } from '../styles/summary';
import { Spinner } from '@chakra-ui/react';

const Card = (props) => {
  return (
    <CardStyles bg={props.bg} shadow={props.shadow}>
      <div className="header">
        <Image src={props.img} alt="Money Icon" />
        <p>{props.text}</p>
      </div>
      {props.isLoading ? (
          <Spinner />
        ):(
        <div className="amount">{props.amount}</div>
      )}
    </CardStyles>
  );
};

export default Card;
