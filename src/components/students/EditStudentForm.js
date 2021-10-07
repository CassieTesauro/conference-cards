import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"
import "./StudentForm.css"



export const EditStudentForm = () => {

    const [studentWithParents, storeStudentWithParents] = useState({}) //fetch has obj with student. parents embedded as an array o 2 obj in main object
    const { studentId } = useParams() //studentId matches with the appview route path
    const history = useHistory()



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



/*~~~~~~~FETCH EXISTING API INFO FOR STUDENT & PARENTS CLICKED ON IN ROSTER; STORE IN STATE VARIABLES AT TOP ~~~~~~~~~~*/
    
    //Fetch the studentId from the useParams hook to fetch the correct student (w/parents embedded) from permanent state.  Store state locally in state variables
    useEffect(
        () => {
            return fetch(`http://localhost:8088/students/${studentId}?_embed=parents`)
                .then(response => response.json())
                .then((fetchedData) => {
                    storeStudentWithParents(fetchedData)
                    updateParentOne(fetchedData.parents[0]) //studentobject-->parentarray-->parentobject index 0
                    updateParentTwo(fetchedData.parents[1])
                })
        },
        [] //empty bc the useEffect only fires once after initial jsx render
    )



    



    /*~~~~~~~INVOKED IN FORM.  USER INPUT COPY STATE GETS STORED AT TOP WITH USESTATE HOOKS ~~~~~~~~~~*/
    const modifyStudentCard = (propertyToModify, newValue) => {
        const studentCardCopy = { ...studentWithParents }
        studentCardCopy[propertyToModify] = newValue
        storeStudentWithParents(studentCardCopy)
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


    /*~~~~~~~CALLED IN FORM AT CHECKBOX; SAVED BOOLEAN VALUE POPULATES [IF PRIMARY, BOX IS CHECKED] ~~~~~~~~~~*/
    const parentOnePrimary = parentOne?.primaryContact ? true : false

    const parentTwoPrimary = parentTwo?.primaryContact ? true : false
                            //^^^^^^^need to be state variables if used in jsx


    /*~~~~~~~ INVOKED AT SAVE CHANGES BUTTON ~~~~~~~~~~*/
    const SaveEditedCard = (event) => {
        event.preventDefault()

        /*~~~~~~~CREATE STUDENT OBJECT TO REPLACE CURRENT API OBJECT FOR THAT STUDENT.~~~~~~~~~~*/
        const newStudentCardData = {
            name: studentWithParents.name,
            teacherId: parseInt(localStorage.getItem("cc_teacher")),
            mapMath: studentWithParents.mapMath,
            mapReading: studentWithParents.mapReading,
            tla: studentWithParents.tla,
            rocketmath: studentWithParents.rocketmath,
            writing: studentWithParents.writing,
            socialEmotional: studentWithParents.socialEmotional
        }

        const fetchOptionStudentCardData = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newStudentCardData)
        }


        /*~~~~~~~CREATE PARENT ONE AND PARENT TWO OBJCTS TO REPLACE CURRENT API OBJECTS FOR THOSE PARENTS~~~~~~~~~~*/
        const newParentOneCardData = {
            studentId: parentOne.studentId,
            parentName: parentOne.parentName,
            primaryContact: parentOne.primaryContact,
            parentPhone: parentOne.parentPhone
        }

        const fetchOptionParentOneCardData = {
            method: "PATCH", //patch instead of put BC if patch doesn't find an id, it doesn't execute and alter the api like put   
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newParentOneCardData)
        }

        const newParentTwoCardData = {
            studentId: parentTwo.newStudentId,
            parentName: parentTwo.parentName,
            primaryContact: parentTwo.primaryContact,
            parentPhone: parentTwo.parentPhone
        }

        const fetchOptionParentTwoCardData = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newParentTwoCardData)
        }


        /*~~~~~~~POST UPDATED STUDENT, PARENT ONE, PARENT TWO STATE TO API; REROUTE TO ROSTER VIEW ~~~~~~~~~~*/

        return fetch(`http://localhost:8088/parents/${parentOne.id}`, fetchOptionParentOneCardData)
            .then(fetch(`http://localhost:8088/parents/${parentTwo.id}`, fetchOptionParentTwoCardData))
            .then(fetch(`http://localhost:8088/students/${studentId}`, fetchOptionStudentCardData)) //don't need parseint, it will still be a string
            .then(() => { return history.push("/students") })


    } //end SaveEditedCard()  



    /*~~~~~~~INVOKED IN DELETE BUTTON~~~~~~~~~~*/ //REMEMBER- needs parameter   //ALWAYS RETURN OR FETCH WILL BE UNDEFINED!!!

    const DeleteParentTwo = (parentTwo) => {
        return fetch(`http://localhost:8088/parents/${parentTwo}`, {
            method: "DELETE"
        })
    }
    const DeleteParentOne = (parentOne) => {
        return fetch(`http://localhost:8088/parents/${parentOne}`, {
            method: "DELETE"
        })
    }
    const DeleteStudent = (student) => {
        return fetch(`http://localhost:8088/students/${student}`, {
            method: "DELETE"
        })
    }


    /*~~~~~~~FORM STARTS HERE ~~~~~~~~~~*/

    return (
        <>  
            <h2 className="form-group">Student Conference Card</h2>

            <form className="studentForm" onSubmit={(event) => { event.preventDefault() }}>
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
                            value={studentWithParents.name}  
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
                            value={parentOne?.parentName} />  
                    </div>
                </fieldset>


                <fieldset>
                <div className="form-group check">
                        <label htmlFor="primary-contact">Primary</label>
                        <input
                            onChange={
                                (evt) => { 
                                    modifyParentOne("primaryContact", evt.target.checked)
                                }
                            }
                            type="checkbox" className="checkbox-size"
                            checked={parentOne?.primaryContact}
                        />
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
                            value={parentOne?.parentPhone} />
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
                            value={parentTwo?.parentName} />
                    </div>
                </fieldset>


                <fieldset>
                <div className="form-group check">
                        <label htmlFor="primary-contact">Primary</label>
                        <input
                            onChange={
                                (evt) => {
                                    modifyParentTwo("primaryContact", evt.target.checked)
                                }
                            }
                            type="checkbox" className="checkbox-size"
                            checked={parentTwo?.primaryContact} />
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
                            value={parentTwo?.parentPhone} />
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
                            value={studentWithParents.mapMath} />
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
                            value={studentWithParents.mapReading} />
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
                            value={studentWithParents.tla} />
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
                            value={studentWithParents.rocketmath} />
                    </div>
                </fieldset>


            
                <fieldset>
                    <div className="form-group large">
                        <label htmlFor="writing">Writing:</label>
                        <textarea  /*changed from input*/
                            onChange={
                                (evt) => {
                                    modifyStudentCard("writing", evt.target.value)
                                }
                            }
                            required autoFocus
                            type="text" id="writing"
                            className="form-control"
                            value={studentWithParents.writing} />
                    </div>
                </fieldset>


                <fieldset>
                    <div className="form-group large">
                        <label htmlFor="soc-emo">Social-Emotional:</label>
                        <textarea  /*changed from input*/
                            onChange={
                                (evt) => {
                                    modifyStudentCard("socialEmotional", evt.target.value)
                                }
                            }
                            required autoFocus
                            type="text" id="soc-emo"
                            className="form-control"
                            value={studentWithParents.socialEmotional} />  {/*reflects the state at the top that we're manipulating */}
                    </div>
                </fieldset>


                <fieldset>

                    {/*~~~~~~~FORM SAVE CHANGES BUTTON ~~~~~~~~~~*/}
                    <button className="btn btn-primary save-changes" onClick={SaveEditedCard}>
                        Save Changes
                    </button>


                    {/*~~~~~~~FORM SAVE CHANGES BUTTON ~~~~~~~~~~*/}
                    <button className="btn btn-primary delete-student"
                        onClick={
                            () => {
                                DeleteParentTwo(parentTwo?.id)
                                    .then(() => { return DeleteParentOne(parentOne?.id) })
                                    .then(() => { return DeleteStudent(studentId) })
                                    .then(() => { history.push("/students") })
                            }}>
                        Delete Student
                    </button>
                </fieldset>
            </form>

        </>

    ) //end of return with form jsx

} //end EditStudentForm()




