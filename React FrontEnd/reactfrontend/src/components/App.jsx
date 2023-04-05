import React from 'react'
import { useState } from 'react';
import Blog from "./Blog"
import Create from "./Create"
import Delete from "./Delete"
import Update from "./Update"
import axios from "axios";
//import { debounce } from 'lodash';
//import Search from "./SearchBar"
// import myIcon from "../pictures/iconLogo.png"
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
// import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

import "../styles/styles.css"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react'


function App() {
  let [userInput, setUserInput] = useState("")
  let [searchData, setSearchData] = useState([])

  useEffect(() => {
  }, [])

  let topNavStyling = {
    width: "max-content",
    marginLeft: "auto",
    display: "flex",
    marginTop: "8px"

  }

  function handleSearch(userInput) {
    axios
      .get(`http://127.0.0.1:8000/post/user_search?query=${userInput}`)
      .then((data) => {
        if (Array.isArray(data.data)) {
          setSearchData(data.data)
        }
      })
  }


  return (
    <div className='App'>
      <div id="top-nav" style={topNavStyling}>
        {/* <img src={myIcon}  style={{marginLeft : "auto"}} alt='Logo' /> */}
        <Button variant="outline-primary" size="sm" href="http://localhost:3000/create" >New Blog</Button>
        <Button variant="outline-primary" size="sm" style={{ marginLeft: "20px" }} href="http://localhost:3000" >All Blogs</Button>
        <DropdownButton variant="outline-primary" style={{ marginLeft: "20px" }} id="dropdown-basic-button" title="Created On">
          <Dropdown.Item href="http://localhost:3000/created_today">Today</Dropdown.Item>
          <Dropdown.Item href="http://localhost:3000/created_yesterday">Yesterday</Dropdown.Item>
          <Dropdown.Item href="http://localhost:3000/last_3_days">Last 3 days</Dropdown.Item>
        </DropdownButton>
        <Button variant="outline-primary" size="sm" style={{ marginLeft: "20px" }} href="http://localhost:3000/recent_post" >Recent 3 Posts</Button>

        <form>
          <InputGroup style={{ width: "15rem", marginLeft: "20px", marginRight: "20px" }} >
            <Form.Control
              id="user-input-value"
              type="search"
              placeholder="Search Post..."
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              onChange={(e) => {
                setUserInput(e.target.value)
              }
              }
            />
          </InputGroup>
        </form>

      </div>
      <Router>
        <Routes>
          <Route path='/create' element={< Create />} />
          <Route path='/delete' element={< Delete />} />
          <Route path='/update' element={< Update />} />

          {userInput ?
            <Route path="/" element={(< Blog param={`user_search?query=${userInput}`} searchData={searchData} handleSearch={handleSearch} />)} />
            :
            <Route path="/" element={< Blog searchData={searchData} handleSearch={handleSearch} />} />
          }

          {userInput && <Route path="/last_3_days" element={(< Blog param={`user_search?query=${userInput}`} searchData={searchData} handleSearch={handleSearch} />)} />}
          <Route path="/last_3_days" element={(< Blog param="created_3_days" searchData={searchData} handleSearch={handleSearch} />)} />

          {userInput && <Route path="/match_string" element={(< Blog param={`user_search?query=${userInput}`} searchData={searchData} handleSearch={handleSearch} />)} />}
          <Route path="/match_string" element={(< Blog param="match_string" searchData={searchData} handleSearch={handleSearch} />)} />

          {userInput && <Route path="/recent_post" element={(< Blog param={`user_search?query=${userInput}`} searchData={searchData} handleSearch={handleSearch} />)} />}
          <Route path="/recent_post" element={(< Blog param="get_recent_post" />)} />

          {userInput && <Route path="/created_today" element={(< Blog param={`user_search?query=${userInput}`} searchData={searchData} handleSearch={handleSearch} />)} />}
          <Route path="/created_today" element={(< Blog param="created_today" />)} />

          {userInput && <Route path="/created_yesterday" element={(< Blog param={`user_search?query=${userInput}`} searchData={searchData} handleSearch={handleSearch} />)} />}
          <Route path="/created_yesterday" element={(< Blog param="created_yesterday" />)} />

          {userInput && <Route path="/created_between" element={(< Blog param={`user_search?query=${userInput}`} searchData={searchData} handleSearch={handleSearch} />)} />}
          <Route path="/created_between" element={(< Blog param="created_between" />)} />

        </Routes>
      </Router>
    </div>
  );
}

export default React.memo(App);