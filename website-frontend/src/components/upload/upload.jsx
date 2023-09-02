import { memo, useRef, useState } from "react";
import "./upload.css";
import { MdDownload, MdRefresh, MdUpload } from "react-icons/md";
import axios from "axios";
import ENVS from "../../config";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const steps = [
    {
        "description": "Select a vegetable or fruit from the list of available options.",
    },
    {
        "description": "Click on upload pic button to upload the picture of a leaf that is affected.",
    },
    {
        "description": "Wait for a few seconds so that our model can process your image.",
    },
    {
        "description": "Get your results and a confidence rating for the prediction. That's it!",
    },
];

const options = [
    {
        "name": "Potato",
        "status": true,
        "image": "./assets/images/potato.jpg",
        "url": "/predict"
    },
    {
        "name": "Tomato",
        "status": false,
        "image": "./assets/images/tomato.jpg",
    },
    {
        "name": "Bell Pepper",
        "status": false,
        "image": "./assets/images/bell-pepper.png",
    },
];

function Upload() {

    const [active, setActive] = useState(-1);
    const [disease, setDisease] = useState(null);
    const [confidence, setConfidence] = useState(-1);
    const [results, setResults] = useState(false);
    const [uploadedImage, setUploadedImage] = useState(null);
    const uploadBtn = useRef();

    function uploadPic() {
        uploadBtn.current.click();
    }

    async function predict() {
        let imageURL = URL.createObjectURL(uploadBtn.current.files[0]);
        let formdata = new FormData();
        formdata.append("file", uploadBtn.current.files[0]);
        const req = await axios.post(ENVS.API_URL + options[active].url, formdata);
        const res = req.data;
        setDisease(res.disease);
        setConfidence(res.confidence);
        setUploadedImage(imageURL);
        setResults(true);
    }

    function reset() {
        setDisease(null);
        setConfidence(-1);
        setUploadedImage(null);
        setResults(false);
    }

    return (
        <>
            <div id="upload-div" className="how-to-use py-5 px-3">
                <div className="row g-0">
                    <div className="col-4 text-center position-relative bg-light px-5 py-3 br-10 border">
                        {
                            (!results) &&
                            <h5 className="text-center mt-3 mb-5">
                                Upload A Picture
                            </h5>
                        }
                        {
                            (results) &&
                            <button onClick={reset} title="Upload New Picture" className="btn btn-light position-absolute end-0 top-0 m-3">
                                <MdRefresh className="text-secondary" size={25} />
                            </button>
                        }
                        <div className="center-div w-100">
                            {
                                (active == -1) && <>
                                <img src="./assets/images/leaf.png" style={{opacity: "60%"}} width={150} />
                                <p className="font-jost mt-3">
                                    Select a plant to continue!
                                </p>
                                </>
                            }
                            {
                                (active != -1) && (!results) && <>
                                <input onChange={predict} ref={uploadBtn} type="file" accept="image/jpeg" className="d-none" />
                                <button onClick={uploadPic} className="btn btn-primary">
                                    Upload Picture
                                    <MdUpload size={25} className="ms-2"></MdUpload>
                                </button>
                                </>
                            }
                            {
                                (results) && <>
                                    <img src={uploadedImage} width={250} className="mx-3 mt-4 br-10" />
                                    <div className="w-100 d-flex justify-content-center align-items-center pt-5">
                                        <div style={{width: 75, height: 75}}>
                                            <CircularProgressbar 
                                                value={confidence}  
                                                text={`${confidence}%`}
                                                styles={buildStyles({
                                                    textSize: 24,
                                                    textColor: "#37AC5E",
                                                    strokeLinecap: 'round',
                                                    pathTransition: 'stroke-line',
                                                    pathTransitionDuration: 0.5,
                                                    pathColor: '#37AC5E',
                                                })} />
                                        </div>
                                        <div className="ms-3 font-jost">
                                            chance of <span className="ms-3 font-belanosima text-primary">{disease}</span>
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                    <div className="col-4 my-auto">
                        <div className="bg-light px-5 py-3 br-10 border mx-3">
                            <h5 className="text-center mt-3 mb-5">
                                Download APK for mobile
                            </h5>
                            <p className="text-secondary font-jost">
                                We also have a mobile application available for the same purpose. Download it here. It's completely free!
                            </p>
                            <button className="btn btn-primary mx-auto d-block mt-4 px-3 py-2">
                                {/* Download Veggiespect (.apk) */}
                                Coming Soon!
                                {/* <MdDownload className="ms-2" size={25}></MdDownload> */}
                            </button>
                        </div>
                        <div className="bg-light px-5 py-3 br-10 border mt-3 mx-3">
                            <h5 className="text-center mt-3 mb-3">
                                Select A Plant
                            </h5>
                            <p className="font-jost text-secondary">
                                Currently, only Potato is available. Tomato and Bell Pepper are coming soon. Stay tuned!
                            </p>
                            <div className="d-flex justify-content-center mb-3">
                            {
                                options.map((ele, ind) => {
                                    return (
                                        <button title={ele.name} onClick={() => setActive(ind)} className={(ele.status ? "border border-2" : "") + " " + (active == ind ? "border-primary" : "") + " btn mx-1 br-50p p-2"} disabled={!ele.status}>
                                            <img src={ele.image} width={30} height={30} />
                                        </button>
                                    );
                                })
                            }
                            </div>
                        </div>
                    </div>
                    <div className="col bg-light px-5 py-3 br-10 border">
                        <h5 className="text-center mt-3 mb-5">
                            Really Simple To Use
                        </h5>
                        {
                            steps.map((ele, ind) => {
                                return (
                                    <p className="text-start font-jost d-flex text-muted mb-5">
                                        <div className="bullet me-3">
                                            {ind + 1}    
                                        </div>
                                        <span className="w-100 font-jost">
                                            {ele.description}
                                        </span>
                                    </p>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default memo(Upload);