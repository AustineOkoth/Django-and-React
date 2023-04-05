import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

//import { fontFamily } from '@mui/system';

function Create() {

    const [titleValue, setTitleValue] = useState('');
    const [textValue, setTextValue] = useState('');
    const [publishedValue, setPublishedValue] = useState('');
    let [createButton, setCreateBtn] = useState("visible")
    let [creating, setCreating] = useState("hidden")

    const inputStyling = {
        margin: '15px',
        backgroundColor: "white",
        fontSize: "15px",
        padding: "15px",
        color: "black",
        fontWeight: "lighter",
        width: "500px"
    };

    const handleSubmit = async (event) => {
        setCreateBtn("hidden")
        setCreating("visible")
        event.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/post/', {
                author: 1,
                title: titleValue,
                text: textValue,
                published_date: publishedValue,
            });
            setTitleValue('');
            setTextValue('');
            setPublishedValue('');
        } catch (error) {
            console.error(error);
        }
        // alert("SUCCESSFULLY ADDED")
        window.location.replace('http://localhost:3000/');
    };

    return (
        <div className="blog" style={{ backgroundColor: "white", borderRadius : "15PX", boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset", width: "70%", marginLeft: "auto", marginRight: "auto", marginTop: "20px", marginBottom: "auto" }}>

            <h3 style={{ color: "darkblue", textAlign: "center", fontFamily: "fantacy" }}>CREATE NEW POST HERE</h3>
            <form onSubmit={handleSubmit} style={{ width: "fit-content", marginLeft: "auto", marginRight: "auto" }}>
                <b>Title</b>
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="Title of your post"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        onChange={(e) => setTitleValue(e.target.value)}
                        required
                    />
                </InputGroup>
                <b> Whats on your mind</b>  <br />
                <InputGroup>
                    <Form.Control as="textarea" aria-label="With textarea"
                        placeholder="Enter Your text"
                        onChange={(e) => setTextValue(e.target.value)}
                        required />
                </InputGroup><br />

                <b>Published Date</b>
                <InputGroup>
                    <Form.Control style={inputStyling}
                        onChange={(e) => setPublishedValue(e.target.value)}
                        type="date"
                        required />
                </InputGroup>

                <Button type="submit" style={{ marginLeft: "50%", marginBottom: "5%", visibility : `${createButton}` }} variant="outline-dark" size="sm" >Post Blog</Button>
                <Button variant="primary" style={{visibility : `${creating}`, marginLeft : "-100px"}} disabled>
                    <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                    Creating...
                </Button>
            </form>
        </div>
    );
}

export default Create;
