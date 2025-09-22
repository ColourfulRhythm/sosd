import { useState } from "react"
import { StyledPayment, Button } from "../settings.style"
import { HiOutlineTrash } from 'react-icons/hi'
import Image from "next/image"
import visa from '../../../public/assets/visa.png'
import mastercard from '../../../public/assets/mastercard.png'


const Payment = () => {
    const [clicked, setClicked] = useState(false);
    const [selected, setSelected] = useState(true);
    const [isChangesMade, setIsChangesMade] = useState(false)
    const handleClick = () => {
        setSelected(false);
        setClicked(true);
        setIsChangesMade(true)
    }
    const handleSelected = () => {
        setClicked(false);
        setSelected(true);
        setIsChangesMade(true)
    }

    const handleSaveChanges = (e) =>{
        e.preventDefault()
        setIsChangesMade(false)
    }

    return (
        <StyledPayment>
            <div className="details">
                <p> Payment Details </p>
                <span> Update your account details </span>
            </div>

            <div>
                <div className="top">
                    <p> Card details </p>
                    <HiOutlineTrash className='trash-icon' />
                </div>
            </div>

            <div className="payment-selection">
                <div className="card" onClick={handleSelected} style={{ backgroundColor: selected && '#DCE4FF', border: selected ? '0.2rem solid var(--light-blue)' : '0.145rem solid #DCE4FF' }}>
                    <div className="holder">
                        <div className="image-wrapper">
                            <Image style={{ borderRadius: '3px' }} src={visa} height={50} width={50} objectFit='contain' alt="visa"/>
                        </div>
                        
                        <div className="info">
                            <span style={{ color: selected && 'var(--primary)' }}> Visa ending in 2345 </span> <br />
                            <span style={{ color: selected && 'var(--primary)' }} className="name"> Expiry: May 2025  </span>
                        </div>
                    </div>   

                    {/* <input type='checkbox' checked /> */}
                    <span style={{ marginTop: '3rem', height: '20px', width: '20px', borderRadius: '50%', border: selected ? '6px solid var(--light-blue)' : '5.5px solid #E1E1E1' }}></span>
                
                    
                </div>

                <div className="card" onClick={handleClick} style={{ backgroundColor: clicked && '#DCE4FF', border: clicked ? '0.2rem solid var(--light-blue)' : '0.145rem solid #DCE4FF' }}>
                    <div className="holder">
                        <div className="image-wrapper">
                            <Image src={mastercard} height={50} width={50} objectFit='contain' alt="master card"/>
                        </div>

                        <div className="info">
                            <span style={{ color: clicked && 'var(--primary)' }}> Visa ending in 2345 </span> <br />
                            <span style={{ color: clicked && 'var(--primary)' }} className="name"> Expiry: May 2024  </span>
                        </div>
                    </div>   

                    {/* <input type='checkbox' checked /> */}        
                    <span style={{ marginTop: '3rem', height: '20px', width: '20px', borderRadius: '50%', border: clicked ? '6px solid var(--light-blue)' : '5.5px solid #E1E1E1' }}></span>
                    
                    
                </div>
                
            </div>

            <div className="controls">
                <Button onClick={handleSaveChanges} className={isChangesMade ? '' : 'inactive'}> Save changes </Button>
            </div>
        </StyledPayment>
    )
}

export default Payment

