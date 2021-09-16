///NEW SHORTCUT TO TEST//
    //  onChange={(evt) => {modifyParentOne(name, evt.target.value)}}

//OLD WAY IN EACH FORM INPUT ONCHANGE//
// (evt) => {
//     const copy = {...studentCard} //copy state of blank student object above
//     copy.name = evt.target.value //put user name input into copy
//     updateStudentCard(copy) //set name input from copy into the blank student object above (transient)
// }
            

import React, { useState } from "react"
import { useHistory } from "react-router-dom"


export const StudentForm = () => {
  
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

    const history = useHistory()

    
    /*~~~~~~~INVOKED IN FORM.  USER INPUT COPY GETS STORED ABOVE WITH USESTATE HOOKS ~~~~~~~~~~*/  //If these 3 don't work, old version @line 1 //     
    const modifyStudentCard = (propertyToModify, newValue) => {
        const studentCardCopy = {...studentCard} 
        studentCardCopy[propertyToModify] = newValue 
        updateStudentCard(studentCardCopy)
    }
    const modifyParentOne = (propertyToModify, newValue) => {
        const parentOneCopy = {...parentOne} 
        parentOneCopy[propertyToModify] = newValue 
        updateParentOne(parentOneCopy)
    }

    const modifyParentTwo = (propertyToModify, newValue) => {
        const parentTwoCopy = {...parentTwo} 
        parentTwoCopy[propertyToModify] = newValue 
        updateParentTwo(parentTwoCopy)
    }


//     /*~~~~~~~ INVOKED AT SAVE BUTTON ~~~~~~~~~~*/
//     const saveConferenceCard = () => {

//         /*~~~~~~~CREATE NEW STUDENT, PARENT ONE, PARENT TWO OBJECTS TO SEND TO API ~~~~~~~~~~*/
//         const newStudentCardData = {
//             name: studentCard.name,
//             teacherId: parseInt(localStorage.getItem("cc_teacher")),
//             mapMath: studentCard.mapMath,
//             mapReading: studentCard.mapReading,
//             tla: studentCard.tla,
//             rocketmath: studentCard.rocketmath,
//             writing: studentCard.writing,
//             socialEmotional: studentCard.socialEmotional
//         }

//         const fetchOptionStudentCardData = {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(newStudentCardData)
//         }

//         //invoked after the student object is posted
//         const getStudentIdForParentObjects = (studentArray) => {
//             const newStudentId = studentArray.length - 1
//             return newStudentId
//         }

//         const newParentOneCardData = {
//             //studentId: newStudentId,//<----------------needs value of newStudentId
//             parentName: parentOne.parentName,
//             primaryContact: parentOne.primaryContact,  
//             parentPhone: parentOne.parentPhone
//         }

//         const fetchOptionParentOneCardData = {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(newParentOneCardData)
//         }

//         const newParentTwoCardData = {
//             //studentId: newStudentId, //<----------------needs value of newStudentId
//             parentName: parentOne.parentName,
//             primaryContact: parentOne.primaryContact,  
//             parentPhone: parentOne.parentPhone
//         }

//         const fetchOptionParentTwoCardData = {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(newParentTwoCardData)
//         }

// /*~~~~~~~POST STUDENT, PARENT ONE, PARENT TWO STATE TO API; REROUTE TO ROSTER VIEW ~~~~~~~~~~*/
       
//             fetch("http://localhost:8088/students", fetchOptionStudentCardData)        
//             .then(
//                 fetch("http://localhost:8088/students")
//                     .then(response => response.json())
//                     .then((updatedStudentAPIArray) => {getStudentIdForParentObjects(updatedStudentAPIArray)})    //.id on end of updatedstudentapiarray to get the id for just the last posted object
//                     .then(fetch("http://localhost:8088/parents", fetchOptionParentOneCardData))
//                     .then(fetch("http://localhost:8088/parents", fetchOptionParentTwoCardData))
//                     //.then(() => {history.push("/students")})//back to roster view
//             )


/*~~~~~~~FORM STARTS HERE ~~~~~~~~~~*/

    return (
        <form className="studentForm">

            <h2 className="form-group">Student Conference Card</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="student-name">Name:</label>
                    <input
                        onChange={
                            (evt) => {
                                modifyStudentCard("name", evt.target.value)  //restricted globals??
                            }
                        }
                        required autoFocus
                        type="text" id="student-name"
                        className="form-control"
                        placeholder="First Last"
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
                        placeholder="First Last"
                        />
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
                        type="checkbox" />
                </div>
            </fieldset>


            <fieldset>
                <div className="form-group">
                    <label htmlFor="guardian-one-phone">Guardian 1 Phone:</label>
                    <input
                        onChange={
                            (evt) => {
                                modifyParentOne("parentOne", evt.target.value)
                            }
                        }
                        required autoFocus
                        type="text" id="guardian-one-phone"
                        className="form-control"
                        placeholder="xxx-xxx-xxxx"
                        />
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
                        placeholder="First Last"
                        />
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
                        type="checkbox" />
                </div>
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
                        placeholder="xxx-xxx-xxxx"
                        />
                </div>
            </fieldset>

{/*~~~~~~~FORM ACADEMIC DATA ~~~~~~~~~~*/}
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
                        placeholder="score"
                        />
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
                        placeholder="score"
                        />
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
                        placeholder="A"
                        />
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
                        placeholder="A"
                        />
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
                        placeholder="Teacher notes here"
                        />
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
                        placeholder="Teacher notes here"
                        />
                </div>
            </fieldset>

{/*~~~~~~~FORM BUTTONS ~~~~~~~~~~*/}            
<button /*onClick={saveConferenceCard}*/className="btn btn-primary">
                Save
            </button>

            <button className="btn btn-primary">
                Delete Student
            </button>
        </form>
    )}
//}