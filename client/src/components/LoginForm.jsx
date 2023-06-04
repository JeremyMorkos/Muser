import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";


const LoginForm = () => {
  const { login, user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fields = Object.fromEntries(new FormData(e.target));
    try{
        await login(fields)
        navigate("/")
    }catch(err){
        console.log(err)
    }
  };


  return (
    <form onSubmit={ handleSubmit }>
        <input type = "email" name = "email" placeholder="email" />
        <input type = "password" name= "password" placeholder="Password"/>
        <input type = "submit" value ="Login" />
    </form>
  )
};

export default LoginForm