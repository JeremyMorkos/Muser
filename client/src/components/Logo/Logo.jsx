import { NavLink } from 'react-router-dom'
import NavStyles from '../Nav/Nav.module.css'


const Logo = () =>{
    return (
        <div className="logo">
            <NavLink to={"/"}><img src="../public/images/muser-logo.png" alt="logo" className={NavStyles.muserLogo}/></NavLink>
        </div>
    )
}

export default Logo
