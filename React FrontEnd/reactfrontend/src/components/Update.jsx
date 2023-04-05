import React from 'react';
import axios from 'axios'
import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

function Update(props) {
    let [updateTitle, setUpdateTitle] = useState(props.title)
    let [updateText, setUpdateText] = useState(props.text)
    let [updateButton, setUpdateBtn] = useState("visible")
    let [updating, setUpdating] = useState("hidden")

    let updateRoot = {
        width: "700px",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "50px",
        textAlign: "center",
        borderRadius: "25px",
        boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",


    }


    let inputStyling = {
        padding: "20px",
        margin: "15px",
        border: "0px",
        backgroundColor: "white",
        width: "500px",
        height: "max-content",
        fontSize: "17px",
        fontFamily: "serif",
        boxShadow: "rgba(17, 17, 26, 0.1) 0px 0px 16px"

    }

    let updateBtn = {
        backgroundColor: "skyblue",
        color: "white",
        margin: "10px",
        border: "0px",
        padding: "10px",
        visibility: `${updateButton}`
    }

    let updateContainer = {
        backgroundColor: " white"
    }

    const updateData = async () => {
        setUpdateBtn("hidden")
        setUpdating("visible")

        try {
            await axios.put(`http://127.0.0.1:8000/post/${props.id}/`, {
                author: 1,
                title: `${updateTitle}`,
                text: `${updateText}`
            })

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="updateRoot" id="updateRoot" style={updateRoot}>

            <form id="updateForm" onSubmit={updateData} style={updateContainer}>
                <h1 style={{ textAlign: "center", color: "darkblue", fontFamily: "serif" }}>{props.title}</h1>
                <input
                    style={inputStyling}
                    type="text"
                    defaultValue={props.title}
                    onChange={(e) => { setUpdateTitle(e.target.value) }}
                    placeholder="Update Title of your Blog"
                    required
                />
                <br />

                <textarea
                    style={inputStyling}
                    type="text"
                    defaultValue={props.text}
                    onChange={(e) => { setUpdateText(e.target.value) }}
                    required
                >
                </textarea>
                <br />
                <input
                    style={inputStyling}
                    placeholder="Published Date"
                    type="date"
                />
                <br />
                <Button style={updateBtn} type="submit">Update</Button>

                <Button variant="primary" style={{visibility : `${updating}`, marginLeft : "-70px"}} disabled>
                    <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                    Updating...
                </Button>

            </form>
        </div>
    )
}

export default Update;