//user clicks roster hyperlink and redirects to that student's form with the studentobject data already inputed.  Can make changes or delete.

//main component shoud render form with that student's data from api


import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"



export const EditStudentForm = () => {

    const [student, viewStudent] = useState({}) //stores the individual student we fetch in the useEffect
    const { studentId } = useParams() //studentId matches with the appview route 

    useEffect(
        () => {//function fetches student object state from api based on studentid.  make a useState to store it.
            return fetch(`http://localhost:8088/students/${studentId}`)
                .then(response => response.json())
                .then((fetchedStudentData) => {
                    viewStudent(fetchedStudentData)
                })
        },
        [studentId]
    )


    return (
        <>
            <h2>Update or Delete your Conference Card for {student.name}</h2>
        </>
    )

}