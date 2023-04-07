import RegisterForm from "./register/RegisterForm";
import {NavbarLogin} from "./homepage/Navbar"

export const Register = ()=>{
    return (
        <>
          <NavbarLogin />
          <RegisterForm/>
        </>
      );
}