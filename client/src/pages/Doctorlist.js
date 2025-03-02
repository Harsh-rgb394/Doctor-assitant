import React from 'react'
import { useNavigate } from 'react-router-dom'
import "../styles/doctor.css"

const Doctorlist = ({doctor}) => {
    const navigate=useNavigate();
    // console.log(doctor)
  return (
   <>
   <div className='card '
   style={{cursor:"pointer"}} onClick={()=> navigate(`/doctor/appointments/${doctor._id}`)}>
    <div className='card-header  ' >
        Dr. {doctor.firstname} {doctor.lastname}
    </div>
    <div className='card-body'>
        <p>
            <b>Specialization - </b>{doctor.specialization}
        </p>
        <p>
            <b>Experience - </b>{doctor.experience}
        </p>
        <p>
            <b> Feesperconsulation - </b>{doctor.feesperconsulation}
        </p>
        <p>
            <b> Status - </b>{doctor.status}
        </p>

        <p>
            <b>  Timings - </b>{doctor.timings[0]}-{doctor.timings[1]}
        </p> 

    </div>
   </div>
   </>
  )
}

export default Doctorlist