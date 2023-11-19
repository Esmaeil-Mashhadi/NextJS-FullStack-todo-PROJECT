import Link from 'next/link';
import { useEffect, useState } from 'react';
import {RiMenuUnfoldLine} from 'react-icons/ri'
import {RiMenuFoldLine} from 'react-icons/ri'
import {BsListCheck} from 'react-icons/bs';
import {CgProfile} from 'react-icons/cg';
import {BiAddToQueue} from 'react-icons/bi'
import {FiLogIn} from 'react-icons/fi'
import { useSession } from 'next-auth/react';
const MobileSide = () => {

    const [toggle , setToggle]= useState(false)
    const [number , setNumber] = useState(-100)

    const transformStyle = {
        "--number" :`${number}%`
    }

    const toggleHandler = ()=>{        
        setToggle(!toggle)
    }   

    useEffect(()=>{
        if(toggle){
            setNumber(0)
        }else{
            setNumber(-100)
        }
    },[toggle])

    const session = useSession()

    return (
        <>
            <div onClick={toggleHandler} className="hamSvg">
                {toggle ? <p> close <RiMenuFoldLine/></p>  : <p> <RiMenuUnfoldLine/>Menu</p>} 
            </div>

        <div style={transformStyle} className='mobileContainer'>
            <aside>
                <ul >
                    <Link onClick={()=>setToggle(false)} href="/"> 
                    <li>
                        <BsListCheck />
                           Todos  
                    </li>
                    </Link>

                    <Link onClick={()=>setToggle(false)} href="/Add-todo"> 
                    <li>
                        <BiAddToQueue />
                           Add todo  
                    </li>
                    </Link>

                {session.status === "unauthenticated" &&  
                
                  <li >
                      <Link onClick={()=>setToggle(false)} className='login-or-signup-container' href="/SignUp"> 
                     <FiLogIn/> Sign Up or Login
                     </Link>
                    </li>
                
                }
                {session.status === "authenticated" &&  
                  
                      <Link onClick={()=>setToggle(false)} href="/Profile">
                        <li>
                            <CgProfile/>
                            Profile
                        </li>
                    </Link>
                       
                }
               
                    
                </ul>
            </aside>
            
        </div>
     </>

    );
};

export default MobileSide;