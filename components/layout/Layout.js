import Link from 'next/link';
import {BsListCheck} from 'react-icons/bs';
import {CgProfile} from 'react-icons/cg';
import {BiAddToQueue} from 'react-icons/bi'
import {FiLogIn} from 'react-icons/fi'
import { useSession } from 'next-auth/react';
import MobileSide from '../module/MobileSide';

const Layout = ({children}) => {

    const session = useSession()


    return (

        <div className='container'>
        <header className='header'>
        <h4> Esi Todo FullStack Project &copy; all right reserved </h4>
         </header>
       
            <div className='mobile'>
            <MobileSide/>
            </div>
            
        <div className='container--main'>
            <aside className='sidebar'>
                <div className='welcome'>
                <h1> Welcome 👋 </h1>
                {!session &&  <span> Sign up and Take Control of Your Tasks! </span> }
              

                </div>

                <ul>
                    <Link href="/"> 
                    <li>
                        <BsListCheck />
                           Todos  
                    </li>
                    </Link>

                    <Link href="/Add-todo"> 
                    <li>
                        <BiAddToQueue />
                          Add Todo  
                    </li>
                    </Link>

                

                {session.status === "unauthenticated" &&  
                
                  <li >
                      <Link className='login-or-signup-container' href="/SignUp"> 
                     <FiLogIn/> Sign Up or Login
                     </Link>
                    </li>
                
                }

                
        
                {session.status === "authenticated" &&  
                  
                      <Link href="/Profile">
                        <li>
                            <CgProfile/>
                            Profile
                        </li>
                    </Link>
                       
                }
               
                    
                </ul>
            </aside>
            <section className='children'>
                {children}
            </section>
        </div>
    </div>


    )

}
    
;

export default Layout;