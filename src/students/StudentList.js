import React, { useEffect, useState } from "react"

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
            <h1>Roster</h1>
            <h3>Click on a student to view or edit their data.</h3>
            {
                students.map(
                    (studentObject) => {
                       if (studentObject.teacherId === parseInt(localStorage.getItem("cc_teacher"))) {
                            return <h4 key={`student--${studentObject.id}`}>{studentObject.name}</h4> 
                        } 
                        else {
                            <h4> Go to New Student to start building your roster</h4>
                        }
                    }
                )
            } 
        </>
    )
}