import { memo } from "react";
import "./intro.css";

function Intro(props) {
    return (
        <>
            <div id="intro-div" className="intro-div min-vh-100 bg-dark">
                <div className="center-div text-light">
                    <img src="./assets/images/logo.png" className="mx-auto d-block my-5 p-2 bg-light br-50p" width={150} />
                    <h1 className="text-center display-5 w-100">
                        Know your plant's condition anytime!
                    </h1>
                    <div className="d-flex justify-content-center">
                    <a href="#know-more" role="button" style={{textDecoration: "none"}}><button className="btn btn-lg mt-4 mx-3 d-block text-light border btn-transparent">
                        I want to know more
                    </button></a>
                    <a href="#upload-div" role="button" style={{textDecoration: "none"}}><button className="btn btn-lg mt-4 d-block btn-light">
                        Inspect my plant
                    </button></a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default memo(Intro);