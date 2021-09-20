import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"

export const EditStudentForm = () => {

    const [expandedObjects, storeExpandedObjects] = useState([]) //stores the individual student we fetch in the useEffect
    const { studentId } = useParams() //studentId matches with the appview route path



    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~FROM STUDENTFORM.JS START~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    const [studentCard, updateStudentCard] = useState({
        name: "",
        mapMath: "",
        mapReading: "",
        tla: "",
        rocketmath: "",
        writing: "",
        socialEmotional: ""
    })

    const [parentOne, updateParentOne] = useState({
        parentName: "",
        primaryContact: false,
        parentPhone: ""
    })

    const [parentTwo, updateParentTwo] = useState({
        parentName: "",
        primaryContact: false,
        parentPhone: ""
    })

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~FROM STUDENTFORM.JS END~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/



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


    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~FROM STUDENTFORM.JS START~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    /*~~~~~~~INVOKED IN FORM.  USER INPUT COPY GETS STORED ABOVE WITH USESTATE HOOKS ~~~~~~~~~~*/
    const modifyStudentCard = (propertyToModify, newValue) => {
        const studentCardCopy = { ...studentCard }
        studentCardCopy[propertyToModify] = newValue
        updateStudentCard(studentCardCopy)
    }
    const modifyParentOne = (propertyToModify, newValue) => {
        const parentOneCopy = { ...parentOne }
        parentOneCopy[propertyToModify] = newValue
        updateParentOne(parentOneCopy)
    }

    const modifyParentTwo = (propertyToModify, newValue) => {
        const parentTwoCopy = { ...parentTwo }
        parentTwoCopy[propertyToModify] = newValue
        updateParentTwo(parentTwoCopy)
    }
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~FROM STUDENTFORM.JS END~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    /*~~~~~~~ INVOKED AT SAVE CHANGES BUTTON ~~~~~~~~~~*/
    const SaveEditedCard = (event) => {
        event.preventDefault()


        /*~~~~~~~CREATE REPLACEMENT STUDENT OBJECT AND FETCH OPTIONS ~~~~~~~~~~*/
        const newStudentCardData = {
            name: studentCard.name,
            teacherId: parseInt(localStorage.getItem("cc_teacher")),
            mapMath: studentCard.mapMath,
            mapReading: studentCard.mapReading,
            tla: studentCard.tla,
            rocketmath: studentCard.rocketmath,
            writing: studentCard.writing,
            socialEmotional: studentCard.socialEmotional
        }

        const fetchOptionStudentCardData = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newStudentCardData)
        }


        /*~~~~~~~CREATE NEW PARENT ONE AND TWO OBJECTS AND FETCH OPTIONS ~~~~~~~~~~*/
        const newParentOneCardData = {
            //studentId: newStudentId,
            parentName: parentOne.parentName,
            primaryContact: parentOne.primaryContact,
            parentPhone: parentOne.parentPhone
        }


        const fetchOptionParentOneCardData = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newParentOneCardData)
        }

        const newParentTwoCardData = {
            //studentId: newStudentId,
            parentName: parentTwo.parentName,
            primaryContact: parentTwo.primaryContact,
            parentPhone: parentTwo.parentPhone
        }

        const fetchOptionParentTwoCardData = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newParentTwoCardData)
        }


    } //end SaveEditedCard()  

 
   
   const foundParentOne = expandedObjects.find(parent => parent.studentId === parseInt(studentId))  //returns 1st p

   const foundParentTwo = expandedObjects.find(parent => parent.id !== foundParentOne.id ? parent.studentId === parseInt(studentId) : "")  //returns 2st p
  
    console.log(foundParentOne);
    console.log(foundParentTwo);
    
    return (
        <>
            
            <h3>Edit or delete your Conference Card</h3>
            {/* {expandedObjects.map(
                    (expandedObject) => {
                       if (expandedObject.studentId === parseInt(studentId)) { */}  
                       
                       
                       
                       
                       
                            
{/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~FROM STUDENTFORM.JS START~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
                            
                            /*~~~~~~~FORM STARTS HERE ~~~~~~~~~~*/}
                            
                            
                                
        <form className="studentForm">

            <h2 className="form-group">Student Conference Card</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="student-name">Name:</label>
                    <input
                        onChange={
                            (evt) => {
                                modifyStudentCard("name", evt.target.value)  
                            }
                        }
                        required autoFocus
                        type="text" id="student-name"
                        className="form-control"
                        defaultValue={foundParentOne?.student.name}  // ? = if that first property doesn't exist on first render, don't worry and move on
                        />
                </div>
            </fieldset>


            {/*~~~~~~~FORM PARENT ONE INFO ~~~~~~~~~~*/}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="guardian-one-name">Guardian 1 Name:</label>
                    <input
                        onChange={
                            (evt) => {
                                modifyParentOne("parentName", evt.target.value)
                            }
                        }
                        required autoFocus
                        type="text" id="guardian-one-name"
                        className="form-control"
                        defaultValue={foundParentOne?.parentName}                    />
                </div>
            </fieldset>


            <fieldset>
                <div className="form-group">
                    <label htmlFor="primary-contact">Primary Contact</label>
                    <input
                        onChange={
                            (evt) => {
                                modifyParentOne("primaryContact", evt.target.checked)
                            }
                        }
                        type="checkbox" 
                        checked={foundParentOne?.student.primaryContact}
                        />
                </div>
            </fieldset>


            <fieldset>
                <div className="form-group">
                    <label htmlFor="guardian-one-phone">Guardian 1 Phone:</label>
                    <input
                        onChange={
                            (evt) => {
                                modifyParentOne("parentPhone", evt.target.value)
                            }
                        }
                        required autoFocus
                        type="text" id="guardian-one-phone"
                        className="form-control"
                        defaultValue={foundParentOne?.parentPhone}                    />
                </div>
            </fieldset>


            {/*~~~~~~~FORM PARENT TWO INFO ~~~~~~~~~~*/}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="guardian-two-name">Guardian 2 Name:</label>
                    <input
                        onChange={
                            (evt) => {
                                modifyParentTwo("parentName", evt.target.value)
                            }
                        }
                        required autoFocus
                        type="text" id="guardian-two-name"
                        className="form-control"
                        defaultValue={foundParentTwo?.parentName}                    />
                </div>
            </fieldset>


            <fieldset>
                <div className="form-group">
                    <label htmlFor="primary-contact">Primary Contact</label>
                    <input
                        onChange={
                            (evt) => {
                                modifyParentTwo("primaryContact", evt.target.checked)
                            }
                        }
                        type="checkbox" 
                        checked={foundParentTwo?.student.primaryContact}/>                </div>
            </fieldset>


            <fieldset>
                <div className="form-group">
                    <label htmlFor="guardian-two-phone">Guardian 2 Phone:</label>
                    <input
                        onChange={
                            (evt) => {
                                modifyParentTwo("parentPhone", evt.target.value)
                            }
                        }
                        required autoFocus
                        type="text" id="guardian-two-phone"
                        className="form-control"
                        defaultValue={foundParentTwo?.parentPhone}                    />
                </div>
            </fieldset>

            {/*~~~~~~~STUDENT ACADEMIC INFO ~~~~~~~~~~*/}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="map-math-rit">MAP Math RIT:</label>
                    <input
                        onChange={
                            (evt) => {
                                modifyStudentCard("mapMath", evt.target.value)
                            }
                        }
                        required autoFocus
                        type="text" id="map-math-rit"
                        className="form-control"
                        defaultValue={foundParentOne?.student.mapMath}                    />
                </div>
            </fieldset>


            <fieldset>
                <div className="form-group">
                    <label htmlFor="map-reading-rit">MAP Reading RIT:</label>
                    <input
                        onChange={
                            (evt) => {
                                modifyStudentCard("mapReading", evt.target.value)
                            }
                        }
                        required autoFocus
                        type="text" id="map-reading-rit"
                        className="form-control"
                        defaultValue={foundParentOne?.student.mapReading}                    />
                </div>
            </fieldset>


            <fieldset>
                <div className="form-group">
                    <label htmlFor="tla">TLA Level:</label>
                    <input
                        onChange={
                            (evt) => {
                                modifyStudentCard("tla", evt.target.value)
                            }
                        }
                        required autoFocus
                        type="text" id="tla"
                        className="form-control"
                        defaultValue={foundParentOne?.student.tla}                    />
                </div>
            </fieldset>


            <fieldset>
                <div className="form-group">
                    <label htmlFor="rocket-math">Rocket Math Level:</label>
                    <input
                        onChange={
                            (evt) => {
                                modifyStudentCard("rocketmath", evt.target.value)
                            }
                        }
                        required autoFocus
                        type="text" id="rocket-math"
                        className="form-control"
                        defaultValue={foundParentOne?.student.rocketmath}                    />
                </div>
            </fieldset>


            <fieldset>
                <div className="form-group">
                    <label htmlFor="writing">Writing:</label>
                    <input
                        onChange={
                            (evt) => {
                                modifyStudentCard("writing", evt.target.value)
                            }
                        }
                        required autoFocus
                        type="text" id="writing"
                        className="form-control"
                        defaultValue={foundParentOne?.student.writing}                    />
                </div>
            </fieldset>


            <fieldset>
                <div className="form-group">
                    <label htmlFor="soc-emo">Social-Emotional:</label>
                    <input
                        onChange={
                            (evt) => {
                                modifyStudentCard("socialEmotional", evt.target.value)
                            }
                        }
                        required autoFocus
                        type="text" id="soc-emo"
                        className="form-control"
                        defaultValue={foundParentOne?.student.socialEmotional}                    />
                </div>
            </fieldset>


            <fieldset>

                {/*~~~~~~~FORM BUTTONS ~~~~~~~~~~*/}
                <button className="btn btn-primary" onClick={SaveEditedCard}>  
                    Save Changes
                </button>

                <button className="btn btn-primary">
                    Delete Student
                </button>
            </fieldset>
        </form>
    
        </>
    )



} //end EditStudentForm()





