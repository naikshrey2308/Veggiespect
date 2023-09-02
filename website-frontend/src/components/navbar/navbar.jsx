import { memo, useEffect, useRef } from "react";
import "./navbar.css";

function Navbar(props) {

    const navbar = useRef();

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 25) {
                navbar.current.classList.add("navbar-light", "bg-light", "shadow", "border");
                navbar.current.classList.remove("navbar-dark", "bg-transparent");
            } else {
                navbar.current.classList.add("navbar-dark", "bg-transparent");
                navbar.current.classList.remove("navbar-light", "bg-light", "shadow", "border");
            }
        });
    });

    return (
        <>
            <nav ref={navbar} className="navbar navbar-expand-lg fixed-top p-3 navbar-dark bg-transparent">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img src={"./assets/images/logo.png"} width={40} className="br-50p p-1 bg-white" />
                    <span className="ms-3">Veggiespect</span>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav d-flex w-100 justify-content-end me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#intro-div">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#upload-div">Detect</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#">Contact</a>
                    </li>
                </ul>
                </div>
            </div>
            </nav>
        </>
    );
}

export default memo(Navbar);