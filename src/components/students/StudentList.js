import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./StudentList.css"

export const StudentList = () => {
    
    const [students, setStudents] = useState([])

    useEffect(
        () => {
            fetch("http://localhost:8088/students")
            .then(response => response.json())
            .then((studentAPIArray) => {
                setStudents(studentAPIArray)
            })
        },
        []
    )

    return (
        <>
            <h1 className="roster__heading">Roster</h1>
            <div className="roster__box">
            <h3 className="roster__subheading">Click on a student to view or edit their data.</h3>
            <div className="roster__inner__box">
            {   students ? 
                students.map(
                    (studentObject) => {
                       if (studentObject.teacherId === parseInt(localStorage.getItem("cc_teacher"))) {
                            return <h4 className="roster__name" key={`student--${studentObject.id}`}><Link to={`/students/${studentObject.id}`}>{studentObject.name}</Link></h4> 
                        } 
                        else {
                            return ""
                        }
                    }
                ) :  <h4 key={`student--`}> Go to New Student to start building your roster</h4>
            } 
            </div>
            </div>
        </>
    )
}