import React from 'react'
import { Link } from 'react-router-dom'

const Menu = (props) => {
    return (
        <>
            <Link to={props.link}>
                <div class="bg-white text-dark p-10 rounded-lg hover:text-white hover:bg-blue">
                    {props.name}
                </div>
            </Link>
            
        </>
        
    )
}

export default Menu