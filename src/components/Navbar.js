function Navbar() {
    return (
        <>
            <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
                <div className='container-fluid d-flex justify-content-between align-items-center'>
                    <div>
                        <a className='navbar-brand'>Admin console</a>
                    </div>
                    <div className="" id="navbarSupportedContent">
                        <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                            <li className='nav-item'>
                                <a className='nav-link'>Support</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Jane
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    {/* <li><hr className="dropdown-divider"></li> */}
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav> {/* nav */}
        </>
    )
}

export default Navbar