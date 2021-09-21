import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"

//EDIT LOGIC NOTES on render for student's page, expanded objects, found parent one, found parent two all are running.  Since the two found parents depend on the expandedObjects data already being present, they will both be undefined on first render.  That means the three useEffects after the first one are rendering before the expandedObjects state has been set.  so the 3rd and 4th use effect will show up in the network tab as undefined, but the first one works because we're using the studentID.  Then when the expandedobjects state changes from the initial array to to the api state, those useeffects run again.   this time they have the expanded object state so they are able to work correctly.  

//a prop is a parameter/argument that you can pass to another component.  they can't me modified in the child that it's passed to.

export const EditStudentForm = () => {
    
    const [expandedObjects, storeExpandedObjects] = useState([]) //stores http://localhost:8088/parents?_expand=student
    const { studentId } = useParams() //studentId matches with the appview route path
    const history = useHistory()


    const [studentCard, updateStudentCard] = useState({ //on render stores `http://localhost:8088/students/${parseInt(studentId)}; changes as state is changed in form
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
    
    /*~~~~~~~NOTE!  THESE RUN AFTER INITIAL RENDER WHICH IS WHY THEY SHOW US AS UNDEFINED AT FIRST AND WHTY WE NEED A QUESTION MARKFIND THE MATCHING PARENT OBJECTS USING THESE FINDS INSTEAD OF MAP SOLVES DOUBLE FORM RENDER ISSUE ~~~~~~~~~~*/
    const foundParentOne = expandedObjects.find(parent => parent.studentId === parseInt(studentId))  //returns 1st parent object
    
    const foundParentTwo = expandedObjects.find(parent => parent.id !== foundParentOne.id ? parent.studentId === parseInt(studentId) : "")  //returns 2st parent object
    
    /*~~~~~~~all happening on initial render.  then all watch for dep array to change and running againFETCH PARENT OBJECTS EXPANDED WITH STUDENT OBJECT DATA; STORE IN 'expandedObjects' STATE HOOK~~~~~~~~*/

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
        
       
    
        //oRUNS ON INITIAL, ONLY STUDENT FOUND BC EXPANDED HASN'T BEEN POPULATED YET.  RUNDS AGAIN ALL ARE FOUND
    useEffect(
        () => {
            fetch(`http://localhost:8088/students/${parseInt(studentId)}`)
                .then(response => response.json())
                .then((fetchedData) => {
                    updateStudentCard(fetchedData)
                })
        },
        [studentId]
    )
    useEffect(
        () => {
            fetch(`http://localhost:8088/parents/${foundParentOne?.id}`)  //undefined at first render bc parent is not established u
                .then(response => response.json())
                .then((fetchedData) => {
                    updateParentOne(fetchedData)
                })
        },
        [expandedObjects]
    )
    useEffect(
        () => {
            fetch(`http://localhost:8088/parents/${foundParentTwo?.id}`) 
                .then(response => response.json())
                .then((fetchedData) => {
                    updateParentTwo(fetchedData)
                })
        },
        [expandedObjects]
    )


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


    /*~~~~~~~CALLED IN FORM AT CHECKBOX; SAVED BOOLEAN VALUE POPULATES ~~~~~~~~~~*/
    const parentOnePrimary = foundParentOne?.primaryContact ? true : false

    const parentTwoPrimary = foundParentTwo?.primaryContact ? true : false


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
            method: "PATCH",    
            headers: {
                "Content-Type": "application/json"    
            },
            body: JSON.stringify(newStudentCardData)
        }


        /*~~~~~~~CREATE REPLACEMENT PARENT ONE AND TWO OBJECTS AND FETCH OPTIONS ~~~~~~~~~~*/
        const newParentOneCardData = {
            studentId: parentOne.studentId,    
            parentName: parentOne.parentName,
            primaryContact: parentOne.primaryContact,
            parentPhone: parentOne.parentPhone
        }


        const fetchOptionParentOneCardData = {
            method: "PATCH", //patch instead of put.  if patch doesn't find an id it doesn't execute    
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


         /*~~~~~~~POST STUDENT, PARENT ONE, PARENT TWO STATE TO API; REROUTE TO ROSTER VIEW ~~~~~~~~~~*/
       
        
       return fetch(`http://localhost:8088/students/${parseInt(studentId)}`, fetchOptionStudentCardData)     //put student object
       .then(fetch(`http://localhost:8088/parents/${foundParentOne.id}`, fetchOptionParentOneCardData))    //put parent 1 object
       .then(fetch(`http://localhost:8088/parents/${foundParentTwo.id}`, fetchOptionParentTwoCardData))    //put parent 2 object
       .then(() => {return history.push("/students")})


    } //end SaveEditedCard()  







/*~~~~~~~FORM STARTS HERE ~~~~~~~~~~
note from steve- avoid default in react bd it's an uncontrolled value . use value instead and do value= statevariable.property  */
return (
    <>

        <h3>Edit or delete your Conference Card</h3>

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
                                modifyParentOne("primaryContact", evt.target.checked)
                            }
                        }
                        type="checkbox"
                        checked={parentOnePrimary ? "checked" : ""}  
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
                        checked={parentTwoPrimary ? "checked" : ""}  />                
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

                {/*~~~~~~~FORM BUTTONS ~~~~~~~~~~*/}
                <button className="btn btn-primary" onClick={SaveEditedCard}>
                    ✅ Save Changes
                </button>

                <button className="btn btn-primary">
                   🗑 Delete Student  {/*delete.then(whatever function fetches the data.  you have to refetch since you've made changes to the permanent state)*/}
                </button>
            </fieldset>
        </form>

    </>

) //end of return with form jsx
                    
} //end EditStudentForm()




