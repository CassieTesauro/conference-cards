import React, { useEffect, useState } from "react"

export const ConferenceCards = () => {
    
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
            <h1>Conference Cards</h1>
            {
                students.map(
                    (studentObject) => {
                        return <h4>{studentObject.name}</h4>
                    }
                )
            }
        </>
    )
}