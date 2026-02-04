import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { clearAuth, isAuthenticated } from '../services/AuthStorage'

const HeaderComponent = () => {
  const navigator = useNavigate()
  const loggedIn = isAuthenticated()

  function handleLogout() {
    clearAuth()
    navigator('/login', { replace: true })
  }

  return (
  <header className='app-header'>
    <nav className='navbar navbar-expand-lg navbar-dark'>
      <div className='container'>
        {loggedIn ? (

          <Link className='navbar-brand d-flex align-items-center gap-2' to='/employees'>
            <span className='brand-mark'>WS</span>
            <span className='brand-text'>WorkSphere</span>
          </Link>
          
        ) : (
          <span className='navbar-brand d-flex align-items-center gap-2'>
            <span className='brand-mark'>WS</span>
            <span className='brand-text'>WorkSphere</span>
          </span>
        )}
        <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav ms-auto gap-lg-2'>
            {loggedIn && (
              <>
                <li className='nav-item'>
                  <NavLink
                    className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}
                    to='/employees'
                  >
                    Employees
                  </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink
                    className={({ isActive }) => `nav-link btn btn-sm btn-light text-primary px-3${isActive ? ' is-active' : ''}`}
                    to='/add-employee'
                  >
                    Add Employee
                  </NavLink>
                </li>
                <li className='nav-item'>
                  <button className='nav-link btn btn-sm btn-outline-light px-3' type='button' data-bs-toggle='modal' data-bs-target='#logoutModal'>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
    <div className='modal fade' id='logoutModal' tabIndex='-1' aria-hidden='true'>
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Confirm logout</h5>
            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
          </div>
          <div className='modal-body'>Are you sure you want to log out?</div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-outline-secondary' data-bs-dismiss='modal'>Cancel</button>
            <button type='button' className='btn btn-danger' data-bs-dismiss='modal' onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  </header>
  )
}

export default HeaderComponent