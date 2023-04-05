import React from 'react';
import axios from 'axios'

function Delete(props) {
    console.log(props.id);
    const deleteData = async () => {
        try {
            await axios.delete(`http://127.0.0.1:8000/post/${props.id}`, {
            });

        } catch (error) {
            console.error(error);
        }
        window.location.replace('http://localhost:3000/');
    }
    deleteData()
    return (
        <div className="delete">
        </div>
    )
}
export default Delete;