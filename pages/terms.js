import Link from 'next/link';
import React from 'react';

const Terms = () => {
    return (
        <div className='termcontainer'>
            <h1 className='termHeader'>Hey I am terms and conditions you successuly read me <span> 😝</span> </h1>
            <Link href="/SignUp"> Fine ! bring me back 🥱 </Link>
        </div>
    );
};

export default Terms;