import Link from 'next/link'
import { StyledNavBar } from '@/components/PromoterNavbar/style'
import { links } from './links'
import logo from '@/public/assets/newest-logo.png'
import notif from '@/public/assets/notif.svg'
import profile from '@/public/assets/Profil.svg'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useContext } from 'react'
import NotificationContext from '@/context/notificationContext'
import NotificationContainer from '@/components/Notification/index'

const Index = () => {
    const router = useRouter();
    const { isNotifClicked,setIsNotifClicked } = useContext(NotificationContext)
    const variants = {
        animate: { width: '60px', transition: { duration: .5 } },
        stop: { width: 0 }
    };
  return (
    <StyledNavBar>
        <div className="logo">
            <Link href='/placers'>
                <a>
                    <Image 
                        src={logo}
                        alt='ad-promoter'
                        width={184}
                        height={19}/>
                </a>
            </Link>
        </div>

        <div className="links">
            {links.map(({name,link})=>(
                <div className="link" key={link}>
                    <Link href={link}>
                        <a className={router.pathname === link ? "activeLink" : ""}>{name}</a>
                    </Link>
                    <motion.div 
                        className={router.pathname === link ? "bottom-dash" : ""}
                        variants={variants}
                        animate={router.pathname === link ? 'animate' : 'stop'}
                        ></motion.div>
                </div>
            ))}
        </div>

        <div className="profile">
            <div className="notif" onClick={()=>setIsNotifClicked(!isNotifClicked)}>
                <div className="notif-img">
                    <Image src={notif} alt='notification bell'/>
                </div>
                {isNotifClicked &&(
                    <NotificationContainer />
                )}
            </div>
             <Image src={profile} alt='profile picture'/>
         </div>
    </StyledNavBar>
  )
}

export default Index;