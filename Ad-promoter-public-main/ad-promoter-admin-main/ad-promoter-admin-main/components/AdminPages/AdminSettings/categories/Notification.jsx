import { useState } from "react";
import { StyledNotification, Button, ball } from "../settings.style"

const Notification = () => {
    const [clicked, setClicked] = useState(false);
    const [email , setEmail] = useState(true);
    const [desktop , setDesktop] = useState(false);
    const [others , setOthers] = useState(true);
    const [isChangesMade, setIsChangesMade] = useState(false)

    const handleSaveChanges = (e) =>{
        e.preventDefault()
        setIsChangesMade(false)
    }

    return (
        <StyledNotification>
            <ul className='notifications-selection'>
                    <li> 
                        <div className='container'>
                            <input 
                                className='checkbox'
                                id='checkbox'
                                type='checkbox'
                                onChange={() => {setClicked(!clicked),setIsChangesMade(true)} }
                                checked={!clicked}
                            />

                            <label htmlFor='checkbox'>
                                <i className='one'></i>
                                <i className='two'></i>
                                <div className='ball' style={{ backgroundColor: !clicked ? 'var(--light-blue)' : '#EDEDED' }}  />
                            </label>   
                        </div>
                        <span> Browser notification </span>

                    </li>

                    <li key={2}>
                        <div className='container'>
                            <input 
                                className='checkbox'    
                                id="checkbox-2"      
                                type='checkbox'
                                onChange={() => {setEmail(!email), setIsChangesMade(true)}}
                                checked={!email}
                            />

                            <label htmlFor='checkbox-2'>
                                <i className='one'></i>
                                <i className='two'></i>
                                <div className='ball' style={{ backgroundColor: !email ? 'var(--light-blue)' : '#EDEDED' }}  />
                            </label>   
                        </div>
                        <span> Email notification </span>

                    </li>

                    <li key={3}> 
                        <div className='container'>
                            <input 
                                className='checkbox'                       
                                type='checkbox'
                                id="checkbox-3"
                                onChange={() => {setDesktop(!desktop), setIsChangesMade(true)}}
                                checked={!desktop}
                            />

                            <label htmlFor='checkbox-3'>
                                <i className='one'></i>
                                <i className='two'></i>
                                <div className='ball' style={{ backgroundColor: desktop ? '#EDEDED' : 'var(--light-blue)'}}  />
                            </label>   
                        </div>
                        <span> Dektop notification </span>

                    </li>

                    <li key={4}> 
                        <div className='container'>
                            <input 
                                className='checkbox'          
                                type='checkbox'
                                id="checkbox-4"
                                onChange={() => {setOthers(!others),setIsChangesMade(true)}}
                                checked={!others}
                            />

                            <label htmlFor='checkbox-4'>
                                <i className='one'></i>
                                <i className='two'></i>
                                <div className='ball' style={{ backgroundColor: others ? '#EDEDED' : 'var(--light-blue)' }}  />
                            </label>   
                        </div>
                        <span> Notify me on all offers </span>

                    </li>


            </ul>

            <div className="controls">
                <Button onClick={handleSaveChanges} className={isChangesMade ? '' : 'inactive'}> Save changes </Button>
            </div>
        </StyledNotification>
    )
}

export default Notification

