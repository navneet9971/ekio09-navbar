import React, { useState } from 'react';
import './Start.css';


const MAX_COUNT = 5;

function Start() {
    const [inputs, setInputs, uploadedFiles, setUploadedFiles] = useState({});
    const [fileLimit, setFileLimit] = useState(false);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(inputs);
    }

    const handleUploadFiles = files => {
        const uploaded = [...uploadedFiles];
        let limitExceeded = false;
        files.some((file) => {
            if (uploaded.findIndex((f) => f.name === file.name) === -1) {
                uploaded.push(file);
                if (uploaded.length === MAX_COUNT) setFileLimit(true);
                if (uploaded.length > MAX_COUNT) {
                    alert(`You can only add a maximum of ${MAX_COUNT} files`);
                    setFileLimit(false);
                    limitExceeded = true;
                    return true;
                }
            }
            return true
        })
        if (!limitExceeded) setUploadedFiles(uploaded)

    }

    const handleFileEvent = (e) => {
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        handleUploadFiles(chosenFiles);
    }


    return (

        <section id='form-add'>
            <div className="form_start">
                <form onSubmit={handleSubmit}>
                    <div class="form-header">
                        <h1>FORM</h1>
                    </div>


                    <div className="first"> First Name:
                        <input
                            type="text1"
                            name="username"
                            value={inputs.username}
                            onChange={handleChange}
                        />
                    </div>


                    <div className="last">Last Name:
                        <input
                            type="text1"
                            name="lastname"
                            value={inputs.lastname}
                            onChange={handleChange}
                        />
                    </div>



                    <div className="email">Email:
                        <input
                            type="email"
                            name="email"
                            value={inputs.email}
                            onChange={handleChange}
                        />
                    </div>


                    <div className="mobile">Mobile no.
                        <input
                            type="number"
                            name="mobile"
                            value={inputs.mobile}
                            onChange={handleChange}
                        />
                    </div>



                    <div className="field">Your Field
                        <input
                            type="text1"
                            name="field"
                            value={inputs.field}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="upload">Upload Documents
                    </div>

                    <div className='btnii'>
                        <input id='fileUpload' type='file' multiple accept='application/pdf, image/png'
                            onChange={handleFileEvent}
                            disabled={fileLimit}
                        />

                        <button type="submit" className="btni">Signup</button>
                        <button type="submit" className="batn">Save</button>
                        <button type="submit" className="botn">Continue</button>
                    </div>
                </form>
            </div>
        </section>

    )
}



export default Start; 