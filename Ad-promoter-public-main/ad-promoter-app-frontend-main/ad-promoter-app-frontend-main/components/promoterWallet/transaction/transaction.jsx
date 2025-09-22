import Image from 'next/image';
import { TransactionStyles } from '../styles/transaction';
import profile from '@/public/assets/Profil.svg';

// const transactionsData = [
//   {
//     image: profile,
//     date: 'Today',
//     amount: '21,000.98',
//     status: 'FAILED',
//   },
//   {
//     image: profile,
//     date: 'Today',
//     amount: '21,000.98',
//     status: 'IN PROGRESS',
//   },
//   {
//     image: profile,
//     date: '21, sept, 2019 7:30AM',
//     amount: '21,000.98',
//     status: 'COMPLETE',
//   },
//   {
//     image: profile,
//     date: '21, sept, 2019 7:30AM',
//     amount: '21,000.98',
//     status: 'COMPLETE',
//   },
//   {
//     image: profile,
//     date: '21, sept, 2019 7:30AM',
//     amount: '21,000.98',
//     status: 'COMPLETE',
//   },
//   {
//     image: profile,
//     date: '21, sept, 2019 7:30AM',
//     amount: '21,000.98',
//     status: 'COMPLETE',
//   },
// ];

// const Transaction = (props) => {
//   return (
//     <>
//       {transactionsData.map((transactionData, i) => (
//         <TransactionStyles key={i}>
//           <div className="profile">
//             <Image
//               className="profile__img"
//               src={props.profileImg}
//               alt="User's profile image"
//             />
//             <p>Skylar Dias</p>
//           </div>
//           <div className="transaction">
//             <div className="transaction__date">{props.date}</div>
//             <div className="transaction__amount">-&#8358;21,000.98</div>
//           </div>
//           <div>
//             <button className="failed">FAILED</button>
//           </div>
//           <div className="arrow">
//             <i className="right"></i>
//           </div>
//         </TransactionStyles>
//       ))}
//     </>
//   );
// };

// export default Transaction;
