//user clicks roster hyperlink and redirects to that student's form with the studentobject data already inputed.  Can make changes or delete.

//main component shoud render form with that student's data from api


import React from "react"
import { useParams } from "react-router-dom"



export const EditStudentForm = () => {
    
    const { studentId } = useParams()

    return (
        <>
        <h2>student is {studentId}</h2>
        </>
    )

}