import React, {useEffect, useState} from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([])

    const navigator = useNavigate();

    useEffect(() => {
        getAllEmployees();
    }, [])

    function getAllEmployees() {
        listEmployees().then((response) => {
            setEmployees(response.data);
        }).catch(error => {
            console.error(error);
        })
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