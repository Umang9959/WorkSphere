import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const HeaderComponent = () => {
  return (
  <header className='app-header'>
    <nav className='navbar navbar-expand-lg navbar-dark'>
      <div className='container'>
        <Link className='navbar-brand d-flex align-items-center gap-2' to='/'>
          <span className='brand-mark'>EMS</span>
          <span className='brand-text'>Employee Management System</span>
        </Link>
        <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav ms-auto gap-lg-2'>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/employees'>Employees</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link btn btn-sm btn-light text-primary px-3' to='/add-employee'>
                Add Employee
              </NavLink>
              
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  )
}

export default HeaderComponent