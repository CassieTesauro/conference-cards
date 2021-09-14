import React, { useState } from "react"

export const StudentForm = () => {
    
    return (
        <form className="studentForm">
            <h2 className="form-group">Student Conference Card</h2>
           
            <fieldset>
                <div className="form-group">
                    <label htmlFor="student-name">Name:</label>
                    <input
                        required autoFocus
                        type="text" id="student-name"
                        className="form-control"
                        placeholder="First Last"
                        />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="guardian-one-name">Guardian 1 Name:</label>
                    <input
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
                        type="checkbox" />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="guardian-one-phone">Guardian 1 Phone:</label>
                    <input
                        required autoFocus
                        type="text" id="guardian-one-phone"
                        className="form-control"
                        placeholder="xxx-xxx-xxxx"
                        />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="guardian-two-name">Guardian 2 Name:</label>
                    <input
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
                        type="checkbox" />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="guardian-two-phone">Guardian 2 Phone:</label>
                    <input
                        required autoFocus
                        type="text" id="guardian-two-phone"
                        className="form-control"
                        placeholder="xxx-xxx-xxxx"
                        />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="map-math-rit">MAP Math RIT:</label>
                    <input
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
                        required autoFocus
                        type="text" id="soc-emo"
                        className="form-control"
                        placeholder="Teacher notes here"
                        />
                </div>
            </fieldset>

            <button className="btn btn-primary">
                Save
            </button>
            <button className="btn btn-primary">
                Delete Student
            </button>
        </form>
    )}
