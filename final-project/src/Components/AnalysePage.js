import React, { useState, useEffect } from "react";
import { FaLeaf, FaExclamationTriangle } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import Navbar from "../Components/Navbar";
import '../Styles/LandingPage.css';
import "../Styles/AnalysePage.css";
import axios from "axios"; // Import axios

const AnalysePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Retrieve query parameters
  const totalCarbonFootprint = searchParams.get("totalCarbonFootprint");
  const loginStatus = searchParams.get("loginStatus");
  const [inheritedValue, setInheritedValue] = useState(700);
  const [userInput, setUserInput] = useState("");
  const [difference, setDifference] = useState(0);
  const [remedies, setRemedies] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    setInheritedValue(totalCarbonFootprint);
  }, [totalCarbonFootprint]);

  const handleLogout = () => {
    navigate(`/loginsignup?loginStatus=${null}`);
  };

  const handleProfile = () => {
    navigate(`/profile?loginStatus=${loginStatus}`);
  };

  const validateForm = () => {
    if (!userInput) {
      setError("Please enter your estimated carbon footprint.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Store the footprint in history
        const response = await axios.post(
          "http://localhost:3001/cfhistorystored",
          {
            email: loginStatus,
            calculatedValue: totalCarbonFootprint,
            calculationType: "total", // Type for this calculator
          }
        );

        if (response.status === 200) {
          console.log("Carbon footprint stored successfully!");
        } else {
          console.error("Failed to store carbon footprint.");
        }
        const userInputNumber = parseFloat(userInput);
        if (isNaN(userInputNumber)) {
          setError("Please enter a valid number for your carbon footprint.");
          return;
        }
        setError("");

        let diff = userInputNumber - inheritedValue;
        setDifference(diff);
        generateRemedies(diff);
      } catch (error) {
        console.error("Error occurred while storing carbon footprint:", error);
      }
    }
  };

  const generateRemedies = (diff) => {
    if (diff <= 0) {
      setRemedies([
        "Great job! Your carbon footprint is already lower than or equal to the inherited value.",
      ]);
    } else {
      setRemedies([
        "Reduce energy consumption by using energy-efficient appliances.",
        "Use public transportation or carpool to reduce vehicle emissions.",
        "Implement a recycling program to minimize waste.",
        "Switch to renewable energy sources like solar or wind power.",
        "Plant trees to offset carbon emissions.",
      ]);
    }
  };

  return (
    <>
       <nav className="navbar navbar-expand-lg navbar-dark pt-4" style={{ background: 'linear-gradient(to right, #2d3748, #2f855a)' }}>
      <div className="container-fluid">
        <a className="navbar-brand fw-bold fs-2" href="/">
          <img
            className="rounded-circle"
            src="images/co2.png"
            height="44.8px"
            width="86.8"
            alt="logo"
          ></img>
          <span className="BrandName1">EcoMine</span>
          <span className="BrandName2">Insight</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="/navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          {/* <li className="nav-item">
            <a
              className="nav-link fs-6 rounded-3 m-1"
              aria-current="page"
              href="/loginsignup"
            >
              Home
            </a>
          </li> */}
          <li className="nav-item">
                    <a className="nav-link fs-6 rounded-3 m-1" href={`/history?loginStatus=${loginStatus}`}>History</a>
                </li>
                {/* <li className="nav-item">
                    <a className="nav-link fs-6 rounded-3 m-1" href="#about">Profile</a>
                </li> */}
        </ul>
        <ul className="navbar-nav ms-auto mb-lg-0">
          <li className="nav-item">
                        <button type="button" onClick={handleProfile} className="opt btn btn-outline-dark m-2">Profile</button>
                </li>
                <li className="nav-item">
                        <button type="button" onClick={handleLogout} className="opt btn btn-outline-dark m-2">LogOut</button>
                </li>
        </ul>
      </div>
      <div></div>
    </nav>
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center p-4"
        style={{ background: "linear-gradient(to right, #2d3748, #2f855a)" }}
      >
        <div
          className="container w-50 my-5 p-4 text-white rounded shadow"
          style={{ background: "#0D1321" }}
        >
          <h1 className="text-center mb-4" style={{ color: "#55E91F" }}>
            Carbon Footprint Calculator
          </h1>

          <div className="form-group mb-3">
            <label htmlFor="inheritedValue" style={{ fontSize: "20px" }}>
              Calculated Carbon Footprint Value (tons)
            </label>
            <input
              type="text"
              id="inheritedValue"
              value={inheritedValue}
              readOnly
              className="form-control"
              aria-label="Inherited Carbon Footprint Value"
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="userInput" style={{ fontSize: "20px" }}>
              Your Estimated Carbon Footprint Value (tons)
            </label>
            <input
              type="number"
              id="userInput"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="form-control"
              aria-label="Your Estimated Carbon Footprint"
            />
          </div>

          <button className="btns btn w-100 mb-3" onClick={handleSubmit}>
            Calculate Difference
          </button>

          {error && (
            <div className="alert alert-danger d-flex align-items-center">
              <FaExclamationTriangle className="me-2" />
              {error}
            </div>
          )}

          {difference !== 0 && (
            <div className="alert alert-info">
              <h5>Difference in Carbon Footprint</h5>
              <p
                className={`h5 ${
                  difference > 0 ? "text-danger" : "text-success"
                }`}
              >
                {difference > 0 ? "+" : ""}
                {difference.toFixed(2)}
              </p>
            </div>
          )}

          {remedies.length > 0 && (
            <div className="alert alert-secondary">
              <h5>Recommended Remedies</h5>
              <ul>
                {remedies.map((remedy, index) => (
                  <li key={index} className="mb-1">
                    <FaLeaf className="text-success me-2" />
                    {remedy}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* <div
            className="mt-4 p-3 bg-light rounded"
            style={{ color: "#0D1321" }}
          >
            <h5>Carbon Footprint Impact</h5>
            <div className="progress my-2">
              <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{ width: inheritedValue ? `${inheritedValue}%` : "0%" }}
                aria-valuenow="0"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {difference ? `${difference}%` : "0%"}
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default AnalysePage;
