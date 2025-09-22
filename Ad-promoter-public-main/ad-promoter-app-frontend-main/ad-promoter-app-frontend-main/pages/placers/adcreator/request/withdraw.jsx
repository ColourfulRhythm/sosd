import Adnavbar from './adNavbar';
import Image from 'next/image';
import { Visual, Showcase} from "@/styles/request/visual";
import trash from "@/public/assets/trash.svg"
import del from "@/public/assets/del.png"
import marked from "@/public/assets/marked.png"
import Check from "@/public/assets/check.svg"
import Profile from "@/public/assets/Profile.png"

const Withdraw = () => {

    const adpromoters = [
        {
            id: 1,
            number: 1,
            avatar: Profile,
            name: 'Maharrm Hasanli',
            userID: '#300923201',
            amount: '₦21,000.98',
            balance: '₦21,000.98',
            del: del,
            check: Check,
            mark: marked
        },
        {
            id: 2,
            number: 2,
            avatar: Profile,
            name: 'Mariam Garza',
            userID: '#300923201',
            amount: '₦21,000.98',
            balance: '₦21,000.98',
            del: del,
            check: Check,
            mark: marked
        },
        {
            id: 3,
            number: 3,
            avatar: Profile,
            name: 'Tammy Spencer',
            userID: '#300923201',
            amount: '₦21,000.98',
            balance: '₦21,000.98',
            del: del,
            check: Check,
            mark: marked
        },
        {
            id: 4,
            number: 4,
            avatar: Profile,
            name: 'Brian Reed',
            userID: '#300923201',
            amount: '₦21,000.98',
            balance: '₦21,000.98',
            del: del,
            check: Check,
            mark: marked
        },
        {
            id: 5,
            number: 5,
            avatar: Profile,
            name: 'Dammy Garza',
            userID: '#300923201',
            amount: '₦21,000.98',
            balance: '₦21,000.98',
            del: del,
            check: Check,
            mark: marked
        },
        {
            id: 6,
            number: 6,
            avatar: Profile,
            name: 'Anthonio Farmag',
            userID: '#300923201',
            amount: '₦21,000.98',
            balance: '₦21,000.98',
            del: del,
            check: Check,
            mark: marked
        },
        {
            id: 7,
            number: 7,
            avatar: Profile,
            name: 'Jarome Runner',
            userID: '#300923201',
            amount: '₦21,000.98',
            balance: '₦21,000.98',
            del: del,
            check: Check,
            mark: marked
        },
        {
            id: 8,
            number: 8,
            avatar: Profile,
            name: 'Jarome Runner',
            userID: '#300923201',
            amount: '₦21,000.98',
            balance: '₦21,000.98',
            del: del,
            check: Check,
            mark: marked
        }
    ];
    return ( 
        <div className="withdraw">
             <Adnavbar />
            <Visual>
                <p>S/N</p>
                <p id='names'>Name</p>
                <p id='user-id'>User ID</p>
                <p id='amount'>Requested Amount</p>
                <p id='balance'>Balance</p>
                <p id='acts'>Action</p>
                <div id='trash'>
                    <Image src={trash} alt='trash' />
                </div>
            </Visual>

            <Showcase>
                {adpromoters.map(({name, number, avatar, userID, amount, balance, del, mark, check})=>(
                    <div key={adpromoters.id}>
                    <div className="showcase-contents">
                        <div>
                            <p id="num">{number}</p>
                        </div>
                        <div id="avatars">
                            <Image src={avatar} alt='profil' />
                        </div>
                        <div>
                            <p id="name">{name}</p>
                        </div>
                        <div>
                            <p id="user">{userID}</p>
                        </div>
                        <div>
                            <p id="amount">{amount}</p>
                        </div>
                        <div>
                            <p id="balance">{balance}</p>
                        </div>
                        <div id='dels'>
                            <Image src={del} alt='del' />
                        </div>
                        <div id='marks'>
                            <Image src={mark} alt='mark' />
                        </div>
                        <div id='checks'>
                            <Image src={check} alt='check' />
                        </div>
                    </div>
                    </div>
                ))} 
            </Showcase>

        </div>
     );
}
 
export default Withdraw;