const validation = (data)=>{

    const error = {}

    if(!data.email){
        error.email = "Your Email is empty"
    } else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)){
        error.email = "please Enter a valid email"} 
        else{
            delete error.email
        }
        
    if(!data.password){
        error.password = "Enter You password "
    } else if ( !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$/.test(data.password)) {
        error.password = "use at least 8 characters one uppercase , one lowercase and one number "

    } else {
        delete error.password
    }

    if (!data.confirm){
        error.confirm = "please confirm you password"
    } else if(data.confirm != data.password) 
    error.confirm = "password doesn't match" 
    else{
        delete error.confirm
    }

    if(data.checkbox){
        delete error.checkbox
    } else {
        error.checkbox = "please accept our terms and condition"
    }

   return error
}

export default validation