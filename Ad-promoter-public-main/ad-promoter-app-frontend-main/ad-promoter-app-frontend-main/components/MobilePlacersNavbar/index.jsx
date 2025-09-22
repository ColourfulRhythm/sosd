import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { links } from './links'
import { motion } from 'framer-motion'
import { StyledMobileNav } from '@/components/MobilePromoterNavbar/style'

const Index = () => {
    const router = useRouter();
    const variants = {
        animate: { width: '60px', transition: { duration: .5 } },
        stop: { width: 0 }
    };
  return (
    <StyledMobileNav>
    
        {links.map(({icon,link,activeIcon})=>(
            <div className="link" key={link}>
                <Link href={link}>
                    <a>
                        {router.pathname === link ? 
                            <Image src={activeIcon} alt={activeIcon}/>
                        : 
                            <Image src={icon} alt={icon}/>
                        }
                    </a>
                </Link>
                <div className={router.pathname === link ? "bottom-dash" : ""}>

                </div>
            </div>
        ))}
        
    </StyledMobileNav>
  )
}

export default Index