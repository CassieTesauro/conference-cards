import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"


export const EditStudentForm = () => {

    const [expandedObjects, storeExpandedObjects] = useState([])
    const { studentId } = useParams() //studentId matches with the appview route path
    const history = useHistory()


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


    /*~~~~~~~~~~~MATCHING PARENT OBJECTS USING THESE FINDS~~~~~~~~~~*/

//     /*~NOTE!  THESE RUN AFTER INITIAL RENDER WHICH IS WHY THEY SHOW UP AS UNDEFINED AT FIRST~~*/
   const foundParentOne = expandedObjects.find(parent => parent.studentId === parseInt(studentId))
// //2 not working!!!
    const foundParentTwo = expandedObjects.find(parent => parent.id !== foundParentOne.id ? parent.studentId === parseInt(studentId) : "")

//making a more specific fetch below instead



/*~~~~~~~FETCH EXISTING API INFO FOR STUDENT & PARENTS YOU CLICKED ON; STORE IN STATE VARIABLES AT TOP ~~~~~~~~~~*/
    /*~~~~FETCH PARENT OBJECTS EXPANDED W/ STUDENT DATA; STORE IN 'expandedObjects' STATE HOOK~~~~~~~~*/

    
    useEffect(
        () => {
            return fetch(`http://localhost:8088/parents?_expand=student&studentId=${studentId}`)
                .then(response => response.json())
                .then((fetchedData) => {
                    storeExpandedObjects(fetchedData)
                })
        },
        [studentId]
    )



    



    /*~~~~~~~INVOKED IN FORM.  USER INPUT COPY STATE GETS STORED AT TOP WITH USESTATE HOOKS ~~~~~~~~~~*/
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


    /*~~~~~~~CALLED IN FORM AT CHECKBOX; SAVED BOOLEAN VALUE POPULATES [IF PRIMARY, BOX IS CHECKED] ~~~~~~~~~~*/
    const parentOnePrimary = foundParentOne?.primaryContact ? true : false

    const parentTwoPrimary = foundParentTwo?.primaryContact ? true : false

//need to be state variables if used in jsx

    /*~~~~~~~ INVOKED AT SAVE CHANGES BUTTON ~~~~~~~~~~*/
    const SaveEditedCard = (event) => {
        event.preventDefault()

        /*~~~~~~~CREATE STUDENT OBJECT TO REPLACE CURRENT API OBJECT FOR THAT STUDENT~~~~~~~~~~*/
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

        return fetch(`http://localhost:8088/parents/${foundParentOne.id}`, fetchOptionParentOneCardData)
            .then(fetch(`http://localhost:8088/parents/${foundParentTwo.id}`, fetchOptionParentTwoCardData))
            .then(fetch(`http://localhost:8088/students/${parseInt(studentId)}`, fetchOptionStudentCardData))
            .then(() => { return history.push("/students") })


    } //end SaveEditedCard()  



    /*~~~~~~~INVOKED IN DELETE BUTTON~~~~~~~~~~*/ //REMEMBER- needs parameter   //ALWAYS RETURN OR FETCH WILL BE UNDEFINED!!!

    const DeleteParentTwo = (parentTwo) => {
        return fetch(`http://localhost:8088/parents/${parseInt(parentTwo)}`, {
            method: "DELETE"
        })
    }
    const DeleteParentOne = (parentOne) => {
        return fetch(`http://localhost:8088/parents/${parseInt(parentOne)}`, {
            method: "DELETE"
        })
    }
    const DeleteStudent = (student) => {
        return fetch(`http://localhost:8088/students/${parseInt(student)}`, {
            method: "DELETE"
        })
    }


    /*~~~~~~~FORM STARTS HERE ~~~~~~~~~~*/

    return (
        <>

            <h3>Edit or delete your Conference Card</h3>

            <form className="studentForm" onSubmit={(event) => { event.preventDefault() }}>

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
                            value={studentCard.name}  // ? = optional chaining; if that first property doesn't exist on first render, don't worry and move on
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
                            value={parentOne.parentName} />
                    </div>
                </fieldset>


                <fieldset>
                    <div className="form-group">
                        <label htmlFor="primary-contact">Primary Contact</label>
                        <input
                            onChange={
                                (evt) => { 
                                    debugger
                                    modifyParentOne("primaryContact", evt.target.checked)
                                }
                            }
                            type="checkbox"
                            checked={parentOne.primaryContact}
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
                            value={parentOne.parentPhone} />
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
                            value={parentTwo.parentName} />
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
                            checked={parentTwo.primaryContact} />
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
                            value={parentTwo.parentPhone} />
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
                            value={studentCard.mapMath} />
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
                            value={studentCard.mapReading} />
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
                            value={studentCard.tla} />
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
                            value={studentCard.rocketmath} />
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
                            value={studentCard.writing} />
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
                            value={studentCard.socialEmotional} />  {/*reflects the state at the top that we're manipulating */}
                    </div>
                </fieldset>


                <fieldset>

                    {/*~~~~~~~FORM SAVE CHANGES BUTTON ~~~~~~~~~~*/}
                    <button className="btn btn-primary" onClick={SaveEditedCard}>
                        ✅ Save Changes
                    </button>


                    {/*~~~~~~~FORM SAVE CHANGES BUTTON ~~~~~~~~~~*/}
                    <button className="btn btn-primary"
                        onClick={
                            () => {
                                DeleteParentTwo(foundParentTwo?.id)
                                    .then(() => { return DeleteParentOne(foundParentOne?.id) })
                                    .then(() => { return DeleteStudent(studentId) })
                                    .then(() => { history.push("/students") })
                            }}>
                        🗑 Delete Student
                    </button>
                </fieldset>
            </form>

        </>

    ) //end of return with form jsx

} //end EditStudentForm()




