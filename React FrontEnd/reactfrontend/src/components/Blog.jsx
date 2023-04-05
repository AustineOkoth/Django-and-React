import React from 'react';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { useState, useEffect } from "react"
import Update from "./Update"
import Delete from './Delete'
//import { borderBottom } from '@mui/system';

function Blog(props) {
    const [allblogs, setAllBlogs] = useState([]);
    const [deleteId, setDeleteId] = useState(null);
    const [updateId, setUpdateId] = useState(null);
    const [updateTitle, setUpdateTitle] = useState(null);
    const [updateText, setUpdateText] = useState(null);


    const container = {
        backgroundColor: "white",
        marginTop: "-8px",
        padding: "10px",
        // backgroundImage :"url('https://img.freepik.com/free-vector/abstract-background-with-squares_23-2148995948.jpg?w=1060&t=st=1679578972~exp=1679579572~hmac=64f1351ffed73bca0382aa275858c47fa78fbf8a2430b9dfd987859e93ee1814')"
    }

    const blogPost = {
        border: "0px solid whitesmoke",
        padding: "10px",
        margin: "10px",
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
    }

    useEffect(() => {
        const getPostsData = () => {
            if (props.param === undefined) {
                axios
                    .get(`http://127.0.0.1:8000/post/`)
                    .then((data) => {
                        setAllBlogs(data.data);
                    })
                    .catch((error) => console.log(error));
            }
            else {
                axios
                    .get(`http://127.0.0.1:8000/post/${props.param}`)
                    .then((data) => {
                        setAllBlogs(data.data);
                    })
                    .catch((error) => console.log(error));
            }
        }

        getPostsData();
    }, [props.param]);


    return (
        <div className='blog-container' style={container}>
            {
              (Array.isArray(allblogs)) &&
                  allblogs.map((blog) => (
                  <div id={`userdata-${blog.id}`} data-id={blog.id} key={blog.id} style={blogPost}>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                          <h3 style={{ color: "darkblue", fontFamily: "serif" }}>{blog.title}</h3>
                      </div>
                      <Button variant="outline-secondary" onClick={() => {
                          setUpdateId(blog.id)
                          setUpdateTitle(blog.title)
                          setUpdateText(blog.text)
                          // window.location.assign("http://127.0.0.1:3000/update")
      
                      }} style={{ margin: "10px" }}>UPDATE</Button>
      
                      <Button variant="outline-danger" onClick={() => {
                          let setId = blog.id
                          setDeleteId(setId)
                      }} style={{ margin: "10px" }}>DELETE</Button>
      
                      <h6 style={{ fontSize: "smaller" }}>Published on : {blog.published_date}</h6>
                      <p style={{ padding: "3px", fontFamily: "serif" }}>{blog.text}</p>
      
                      <div id='update-container'>
                          {updateId === blog.id && <Update id={updateId} title={updateTitle} text={updateText} />}
                      </div>
                  </div>
      
                  ))
            }
            {deleteId && <Delete id={deleteId} />}
        </div>
    );
}

export default Blog;
