
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

    /*~~~~~~~INVOKED IN CHAINED .THEN SECTION ~~~~~~~~~~*/
    const fetchParentArray = () => {
        fetch("http://localhost:8088/parents")
    }

    const fetchStudentArray = () => {
        fetch("http://localhost:8088/students")
            .then(response => response.json())
    }


    /*~~~~~~~INVOKED IN FORM.  USER INPUT COPY GETS STORED ABOVE WITH USESTATE HOOKS ~~~~~~~~~~*/  //If these 3 don't work, old version @line 1 //     
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


    /*~~~~~~~ INVOKED AT SAVE BUTTON ~~~~~~~~~~*/
    const SaveConferenceCard = () => {


        /*~~~~~~~CREATE NEW STUDENT OBJECT AND FETCH OPTIONS ~~~~~~~~~~*/
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
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newStudentCardData)
        }

        /*~~~~~~~CREATE NEW PARENT ONE AND TWO OBJECTS AND FETCH OPTIONS ~~~~~~~~~~*/
        const newParentOneCardData = {
            //studentId: //needs value of newStudentId
            parentName: parentOne.parentName,
            primaryContact: parentOne.primaryContact,
            parentPhone: parentOne.parentPhone
        }


        const fetchOptionParentOneCardData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newParentOneCardData)
        }

        const newParentTwoCardData = {
            //studentId: needs value of newStudentId
            parentName: parentOne.parentName,
            primaryContact: parentOne.primaryContact,
            parentPhone: parentOne.parentPhone
        }

        const fetchOptionParentTwoCardData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newParentTwoCardData)
        }

        //invoked after the student object is posted
        const getStudentIdForParentObjects = (studentArray) => {  
            const newStudentId = studentArray.length - 1
            return newStudentId
        }

        /*~~~~~~~POST STUDENT, PARENT ONE, PARENT TWO STATE TO API; REROUTE TO ROSTER VIEW ~~~~~~~~~~*/
        //return without halting the chain??
        fetch("http://localhost:8088/students", fetchOptionStudentCardData)
            .then(fetchStudentArray())
            .then((updatedStudentAPIArray) => { getStudentIdForParentObjects(updatedStudentAPIArray) })    
            .then(fetchParentArray(), fetchOptionParentOneCardData)
            .then(fetchParentArray(), fetchOptionParentTwoCardData)
            .then(() => {history.push("/students")})//back to roster view
   
     } //end SaveConferenceCard()


     /*~~~~~~~FORM STARTS HERE ~~~~~~~~~~*/

        return (
            <>
                <form onSubmit={(evt) => evt.preventDefault()} className="studentForm">

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


                    <fieldset>

                        {/*~~~~~~~FORM BUTTONS ~~~~~~~~~~*/}
                        <button className="btn btn-primary" onClick={() => SaveConferenceCard}>  
                            Save
                        </button>

                        <button className="btn btn-primary">
                            Delete Student
                        </button>
                    </fieldset>
                </form>
            </>

        )//end return with jsx form
    
}//end StudentForm()