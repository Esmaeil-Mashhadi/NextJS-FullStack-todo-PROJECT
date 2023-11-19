function validateProfile (data) { 

const error = {}


    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)){
    error.email = "please Enter a valid email"} 
    else{
        delete error.email
    }
       
     if (data.name.length <3){
        error.name = "name is too short"
    }

     if (data.lastName.length <3){
        error.lastName = "Last name is too short"
    }

    return error
 
}

export {validateProfile}