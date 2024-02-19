import React from "react"
import {Link} from "react-router-dom";

const Header = () => {

    return(
        <div className="app-header">
            <nav>
                <ul>
                    <li>
                        <Link to="/users">Users</Link>
                    </li>
                    <li>
                        <Link to="/banks">Banks</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Header