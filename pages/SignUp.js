import SignupPage from "@/components/templates/SignupPage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const SignUp = () => {
    return (
        <div>
           <SignupPage/>
        </div>
    );
};

export default SignUp;