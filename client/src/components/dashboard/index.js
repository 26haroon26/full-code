import axios from 'axios';
import { useState, useEffect } from "react"
import { baseUrl } from "./../../core"

import Box from '@mui/material/Box';
import  "../../App"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import  '../../App.css';


function upload() {

    var fileInput = document.getElementById("fileInput");
    const objectURL = URL.createObjectURL(fileInput.files[0])
    console.log("url:",objectURL);
    // // To convert a File into Blob (not recommended)
    // var blob = null;
    // var file = fileInput.files[0];
    // let reader = new FileReader();
    // reader.readAsArrayBuffer(file)
    // reader.onload = function (e) {
    //     blob = new Blob([new Uint8Array(e.target.result)], { type: file.type });
    //     console.log(blob);
    // }

    console.log("fileInput: ", fileInput);
    console.log("fileInput: ", fileInput.files[0]);

    let formData = new FormData();
    // https://developer.mozilla.org/en-US/docs/Web/API/FormData/append#syntax

    formData.append("myFile", fileInput.files[0]); // file input is for browser only, use fs to read file in nodejs client
    // formData.append("myFile", blob, "myFileNameAbc"); // you can also send file in Blob form (but you really dont need to covert a File into blob since it is Actually same, Blob is just a new implementation and nothing else, and most of the time (as of january 2021) when someone function says I accept Blob it means File or Blob) see: https://stackoverflow.com/questions/33855167/convert-data-file-to-blob
    formData.append("myName", "malik"); // this is how you add some text data along with file
    formData.append("myDetails",
        JSON.stringify({
            "subject": "Science",   // this is how you send a json object along with file, you need to stringify (ofcourse you need to parse it back to JSON on server) your json Object since append method only allows either USVString or Blob(File is subclass of blob so File is also allowed)
            "year": "2021"
        })
    );
console.log(formData);
    // you may use any other library to send from-data request to server, I used axios for no specific reason, I used it just because I'm using it these days, earlier I was using npm request module but last week it get fully depricated, such a bad news.
    axios({
        method: 'post',
        url: "http://localhost:3000/upload",
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
    })
        .then(res => {
            console.log(`upload Success` + res.data);
        })
        .catch(err => {
            console.log(err);
        })

    return false; // dont get confused with return false, it is there to prevent html page to reload/default behaviour, and this have nothing to do with actual file upload process but if you remove it page will reload on submit -->

}

function Scoreboard() {
return(
    <>

        <input type="file" id="fileInput"/>
        <button onClick={upload}> Upload </button>
    






    </>
);
    
}

export default Scoreboard;