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
    
    /*~~~~~~~FIND PARENT OBJECTS CONNECTED TO CORRECT STUDENT VIA PARAM; RENDER FORM WITH CORRECT DATA~~~~~~~~*/
           
    return (
        <>
            
            <h3>Edit or delete your Conference Card</h3>
            {expandedObjects.map(
                    (expandedObject) => {
                       if (expandedObject.studentId === parseInt(studentId)) {
                            return <h4>{expandedObject.parentName}</h4> //can I get the form here with saved input already populated and able to save changes to input?
                        } 
                        else {
                            return ""
                        }
                    }
                ) 
            } 
        </>
    )

} //end EditStudentForm()




