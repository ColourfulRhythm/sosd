import Link from 'next/link';
import { Navbar} from "@/styles/request/adNavbar";
import Image from 'next/image';
import DropDown from "@/public/assets/dropdown.png"

const Adnavbar = () => {

    return ( 
        <Navbar>
            <nav className="adtype-navbar">
                <Link href='/placers/adcreator/request/visualAd'>
                    <a style={{color: '#808080'}}>
                        Visual Ad Request
                    </a>
                </Link>

                <Link href='/placers/adcreator/request/socialAd'>
                    <a style={{color: '#808080'}}>
                        Social Ad Request
                    </a>
                </Link>

                <Link href='/placers/adcreator/request/withdraw'>
                    <a style={{color: '#808080'}}> 
                        Withdrawal Request
                    </a>
                </Link>

                <Link href='/'>
                    <a style={{color: '#808080'}}>
                        Reported Adverts
                    </a>
                </Link>
            </nav>

            <div className="filter">
                <p>Filter</p>
                <div>
                 <Image src={DropDown} alt='dropdown' />
                </div>
            </div>
        </Navbar>
     );
}
 
export default Adnavbar;