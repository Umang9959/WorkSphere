import React, {useEffect, useState} from 'react'
import { deleteEmployee, listEmployees, searchEmployees } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([])
    const [searchQuery, setSearchQuery] = useState('')

    const navigator = useNavigate();

    useEffect(() => {
        getAllEmployees();
    }, [])

    useEffect(() => {
        const handler = setTimeout(() => {
            const trimmedQuery = searchQuery.trim();
            if (!trimmedQuery) {
                getAllEmployees();
                return;
            }

            searchEmployees(trimmedQuery).then((response) => {
                setEmployees(response.data);
            }).catch(error => {
                console.error(error);
            })
        }, 300);

        return () => clearTimeout(handler);
    }, [searchQuery])

    function getAllEmployees() {
        listEmployees().then((response) => {
            setEmployees(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function clearSearch() {
        setSearchQuery('');
        getAllEmployees();
    }
    function addNewEmployee(){
        navigator('/add-employee')
    }

    function updateEmployee(id) {
        navigator(`/edit-employee/${id}`)
    }

    function removeEmployee(id){
        console.log(id);

        deleteEmployee(id).then((response) =>{
            getAllEmployees();
        }).catch(error => {
            console.error(error);
        })
    }

  return (
    <div className='page-card'>
        <div className='page-header'>
            <div>
                <h2 className='page-title'>Employees</h2>
                <p className='page-subtitle'>Manage your team, update records, and keep everything organized.</p>
            </div>
            <button className='btn btn-primary btn-lg shadow-sm' onClick={addNewEmployee}>Add Employee</button>
        </div>
        <div className='d-flex flex-wrap gap-2 align-items-center mb-3'>
            <div className={`animated-search ${searchQuery ? 'is-active' : ''}`}>
                <span className='animated-search__icon' aria-hidden='true'>
                    <svg viewBox='0 0 24 24' role='img' aria-hidden='true'>
                        <path d='M11 4a7 7 0 0 1 5.65 11.22l3.57 3.58a1 1 0 0 1-1.42 1.41l-3.58-3.57A7 7 0 1 1 11 4m0 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10' />
                    </svg>
                </span>
                <input
                    type='text'
                    className='animated-search__input'
                    placeholder='Search by id, first name, last name, or email'
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                />
            </div>
            <button className='btn btn-outline-secondary' onClick={clearSearch}>Clear</button>
        </div>
        <div className='table-responsive'>
        <table className='table table-hover align-middle table-theme'>
            <thead>
                <tr>
                    <th>Employee Id</th>
                    <th>Employee First Name</th>
                    <th>Employee Last Name</th>
                    <th>Employee Email Id</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    employees.map(employee => 
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>
                                <div className='d-flex gap-2 flex-wrap'>
                                    <button className='btn btn-outline-primary btn-sm' onClick={() => updateEmployee(employee.id)}>Update</button>
                                    <button className='btn btn-outline-danger btn-sm' onClick={() => removeEmployee(employee.id)}>Delete</button>
                                </div>
                            </td>
                        </tr>)
                }
            </tbody>
        </table>
        </div>
    </div>
  )
}

export default ListEmployeeComponent