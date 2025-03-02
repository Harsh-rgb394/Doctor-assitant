import React from "react";



const DoctorProfile = ({doctor,onEditProfile}) => {
    


    return(
        <div>
            <div className="profile-container">
            <div className="profile-card">
                <div className="profile-header">
                    <h2>Doctor Profile</h2>
                    {/* <button className="edit-btn" onClick={onEditProfile}>Edit Profile</button> */}
                </div>

                <div className="profile-section">
                    <h3>Personal Information</h3>
                    <div className="profile-row">
                        <span className="label">Name:</span>
                        <span className="value">Dr. {doctor.firstname} {doctor.lastname}</span>
                    </div>
                    <div className="profile-row">
                        <span className="label">Specialization:</span>
                        <span className="value">{doctor.specialization}</span>
                    </div>
                    <div className="profile-row">
                        <span className="label">Experience:</span>
                        <span className="value">{doctor.experience} years</span>
                    </div>
                    <div className="profile-row">
                        <span className="label">Fees Per Consultation:</span>
                        <span className="value">₹{doctor.feesperconsulation}</span>
                    </div>
                    <div className="profile-row">
                        <span className="label">Status:</span>
                        <span className={`status-badge ${doctor.status}`}>
                            {doctor.status}
                        </span>
                    </div>
                </div>

                <div className="profile-section">
                    <h3>Contact Information</h3>
                    <div className="profile-row">
                        <span className="label">Phone:</span>
                        <span className="value">{doctor.phone}</span>
                    </div>
                    <div className="profile-row">
                        <span className="label">Email:</span>
                        <span className="value">{doctor.email}</span>
                    </div>
                    <div className="profile-row">
                        <span className="label">Website:</span>
                        <span className="value">{doctor.website}</span>
                    </div>
                    <div className="profile-row">
                        <span className="label">Address:</span>
                        <span className="value">{doctor.address}</span>
                    </div>
                </div>

                <div className="profile-section">
                    <h3>Timings</h3>
                    <div className="timings-grid">
                        {doctor.timings?.map((time, index) => (
                            <div className="timing-slot" key={index}>
                                {time}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}


export default DoctorProfile;