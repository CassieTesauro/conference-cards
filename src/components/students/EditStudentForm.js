import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


export const EditStudentForm = () => {

    const [expandedObjects, storeExpandedObjects] = useState([]) //stores the individual student we fetch in the useEffect
    const { studentId } = useParams() //studentId matches with the appview route path
    

    /*~~~~~~~FETCH PARENT OBJECTS EXPANDED WITH STUDENT OBJECT DATA; STORE IN 'expandedObjects' ~~~~~~~~*/
    useEffect(
        () => {
                fetch(`http://localhost:8088/parents?_expand=student`)
                .then(response => response.json())
                .then((fetchedData) => {
                    storeExpandedObjects(fetchedData)
                })
        },
        [studentId]
    )

return(
    <>
    <h3>"hello"</h3>
    </>
)

} //end EditStudentForm()





/*~~~~~~~FIND PARENT OBJECTS CONNECTED TO CORRECT STUDENT VIA PARAM ~~~~~~~~*/
        // if (cardData.studentId === parseInt(studentId)) {
        //    console.log("data match found")
        // }