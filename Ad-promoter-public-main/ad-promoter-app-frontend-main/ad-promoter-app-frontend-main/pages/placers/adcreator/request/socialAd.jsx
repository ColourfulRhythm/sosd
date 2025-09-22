import Adnavbar from './adNavbar';
import Image from 'next/image';
import { Visual, Showcase} from "@/styles/request/visual";
import trash from "@/public/assets/trash.svg"
import del from "@/public/assets/del.png"
import marked from "@/public/assets/marked.png"
import Check from "@/public/assets/check.svg"
import Profile from "@/public/assets/Profile.png"

const SocialAd = () => {
   
    const adpromoters = [
        {
            id: 1,
            number: 1,
            avatar: Profile,
            name: 'Maharrm Hasanli',
            email: 'MaharrmHasanli@gmail.com',
            link: 'https://mobile.twitter.com/talehahasanli/with_replies',
            del: del,
            check: Check,
            mark: marked
        },
        {
            id: 2,
            number: 2,
            avatar: Profile,
            name: 'Mariam Garza',
            email: 'Mariamgarza@gmail.com',
            link: 'https://mobile.twitter.com/talehahasanli/with_replies',
            del: del,
            check: Check,
            mark: marked
        },
        {
            id: 3,
            number: 3,
            avatar: Profile,
            name: 'Tammy Spencer',
            email: 'Mariamgarza@gmail.com',
            link: 'https://mobile.twitter.com/talehahasanli/with_replies',
            del: del,
            check: Check,
            mark: marked
        },
        {
            id: 4,
            number: 4,
            avatar: Profile,
            name: 'Brian Reed',
            email: 'Mariamgarza@gmail.com',
            link: 'https://mobile.twitter.com/talehahasanli/with_replies',
            del: del,
            check: Check,
            mark: marked
        },
        {
            id: 5,
            number: 5,
            avatar: Profile,
            name: 'Dammy Garza',
            email: 'Mariamgarza@gmail.com',
            link: 'https://mobile.twitter.com/talehahasanli/with_replies',
            del: del,
            check: Check,
            mark: marked
        },
        {
            id: 6,
            number: 6,
            avatar: Profile,
            name: 'Anthonio Farmag',
            email: 'Mariamgarza@gmail.com',
            link: 'https://mobile.twitter.com/talehahasanli/with_replies',
            del: del,
            check: Check,
            mark: marked
        },
        {
            id: 7,
            number: 7,
            avatar: Profile,
            name: 'Jarome Runner',
            email: 'Mariamgarza@gmail.com',
            link: 'https://mobile.twitter.com/talehahasanli/with_replies',
            del: del,
            check: Check,
            mark: marked
        },
        {
            id: 8,
            number: 8,
            avatar: Profile,
            name: 'Jarome Runner',
            email: 'Mariamgarza@gmail.com',
            link: 'https://mobile.twitter.com/talehahasanli/with_replies',
            del: del,
            check: Check,
            mark: marked
        }
    ];


    return ( 
        <div className="visualAd">
            <Adnavbar />
            <Visual>
                <p>S/N</p>
                <p id='name'>Name</p>
                <p id='email'>Email Address</p>
                <p id='socials'>Social Link</p>
                <p id='act'>Action</p>
                <div id='trash'>
                    <Image src={trash} alt='trash' />
                </div>
            </Visual>



            <Showcase>
                {adpromoters.map(({name, number, avatar, link, del, email, mark, check})=>(
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
                            <p id="email">{email}</p>
                        </div>
                        <div>
                            <p id="link">{link}</p>
                        </div>
                        <div id='del'>
                            <Image src={del} alt='del' />
                        </div>
                        <div id='mark'>
                            <Image src={mark} alt='mark' />
                        </div>
                        <div id='check'>
                            <Image src={check} alt='check' />
                        </div>
                    </div>
                    </div>
                ))} 
            </Showcase>
            
        </div>
     );
}
 
export default SocialAd;