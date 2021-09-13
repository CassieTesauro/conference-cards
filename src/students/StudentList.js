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
            {
                students.map(
                    (studentObject) => {
                        return <h4 key={`student--${studentObject.id}`}>{studentObject.name}</h4>
                    }
                )
            }
        </>
    )
}