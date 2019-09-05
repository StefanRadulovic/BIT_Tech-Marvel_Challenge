import React from 'react'
import './header.css'
import logo from '../shared/logo.png'


const Header = (props) => {

    return (
        <div className='header'>
            <img src={logo} className='logoImg' alt='logo' />
            {(props.isList) ? <i className="iconHeader material-icons" onClick={props.onClickHandler}>view_module</i> : <i onClick={props.onClickHandler} className="iconHeader material-icons">view_list</i>}
        </div>
    )
}

export default Header;