
import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import "./StudentForm.css"


export const StudentForm = () => {
//STATE VARIABLES
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

//WILL GET THE UPDATED STUDENT STATE WHEN PATH CHANGES TO ROSTER
    const history = useHistory()


    


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



    /*~~~~~~~ INVOKED AT SAVE BUTTON ~~~~~~~~~~*/
    const SaveConferenceCard = (event) => {
        event.preventDefault()


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


        /*~~~~~~~POST NEW STUDENT; THEN CREATE THE DEPENDENT P1 AND P2 OBJECTS; THEN TAKE USER TO ROSTER~~~~~~~~~~*/


        return fetch("http://localhost:8088/students", fetchOptionStudentCardData)  //post student object        
            .then(response => response.json())
            .then(newStudentData => {  //use the new student object's PK in the creation of P1/P2 objects
               
                //add two new parents to parent array that match this student.  
                //P1/P2 care created at the same time because they are dependent on the student object, but not each other

                //create first parent.  P1 is dependent on the first fetch (student obj) because it needs the student id
                const newParentOneCardData = {
                    studentId: newStudentData.id,
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
                fetch("http://localhost:8088/parents", fetchOptionParentOneCardData)


                //create second parent.  P2 is dependent on first fetch (student obj) because it needs id from new student obj
                const newParentTwoCardData = {
                    studentId: newStudentData.id,
                    parentName: parentTwo.parentName,
                    primaryContact: parentTwo.primaryContact,
                    parentPhone: parentTwo.parentPhone
                }

                const fetchOptionParentTwoCardData = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newParentTwoCardData)
                }
                fetch("http://localhost:8088/parents", fetchOptionParentTwoCardData)   

            })
            //After the 3 objects are posted, user is sent to roster.  Since roster useEffect fetches from the API, the 3 new obj will be included.
            .then(() => { history.push("/students") })                                

    } //end SaveConferenceCard()


    /*~~~~~~~INVOKED AT CANCEL BUTTON ~~~~~~~~~~*/
    const CancelConferenceCard = (event) => {
        event.preventDefault()
        history.push("/students")  
    }


    /*~~~~~~~FORM STARTS HERE ~~~~~~~~~~*/

    return (
        <>
            <h2 className="form-group">Student Conference Card</h2>

            <form className="studentForm newStudentForm">

                <fieldset>
                    <div className="form-group medium">
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
                            placeholder="First Last"
                        />
                    </div>
                </fieldset>


                {/*~~~~~~~FORM PARENT ONE INFO ~~~~~~~~~~*/}
              
                <div className="guardian-grouping">
                <fieldset>
                    <div className="form-group medium">
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
                    <div className="form-group check">
                        <label htmlFor="primary-contact">Primary Contact</label>
                        <input
                            onChange={
                                (evt) => {
                                    modifyParentOne("primaryContact", evt.target.checked)
                                }
                            }
                            type="checkbox" className="checkbox-size"/>
                    </div>
                </fieldset>
                </div>

                <fieldset>
                    <div className="form-group medium">
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
                            placeholder="xxx-xxx-xxxx"
                        />
                    </div>
                </fieldset>


                {/*~~~~~~~FORM PARENT TWO INFO ~~~~~~~~~~*/}
                <div className="guardian-grouping">
                <fieldset>
                    <div className="form-group medium">
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
                    <div className="form-group check">
                        <label htmlFor="primary-contact">Primary Contact</label>
                        <input
                            onChange={
                                (evt) => {
                                    modifyParentTwo("primaryContact", evt.target.checked)
                                }
                            }
                            type="checkbox" className="checkbox-size"/>
                    </div>
                </fieldset>
                </div>           

                <fieldset>
                    <div className="form-group medium">
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

                {/*~~~~~~~STUDENT ACADEMIC INFO ~~~~~~~~~~*/}
                <fieldset>
                    <div className="form-group small">
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
                    <div className="form-group small">
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
                    <div className="form-group small">
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
                    <div className="form-group small">
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
                    <div className="form-group large">
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
                    <div className="form-group large">
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
                    <button className="btn btn-save save-changes" onClick={SaveConferenceCard}>
                        Save
                    </button>

                    <button className="btn btn-cancel delete-student" onClick={CancelConferenceCard}>
                        Cancel
                    </button>
                </fieldset>
            </form>
        </>

    )//end return with jsx form

}//end StudentForm()