import React from 'react';
import { useState } from 'react'
//import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function SearchBar() {

  let [userInput, setUserInput] = useState("")

  function handleSearchSubmit(e) {
    e.preventDefault();
    setUserInput(userInput)
    let userValue = document.getElementById("user-input-value").value
    console.log(userValue);
  }

  return (
    <>
      <form>
        <InputGroup style={{ width: "15rem", marginRight: "20px" }} >
          <Form.Control
            id = "user-input-value"
            placeholder="Search Post..."
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <Button type='submit' variant="outline-secondary"
            onClick={handleSearchSubmit}
          >
            Search
          </Button>
        </InputGroup>

      </form>

    </>

  );
}

export default SearchBar;