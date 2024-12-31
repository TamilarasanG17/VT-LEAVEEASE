import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import "./InputPage.css";

const InputPage = ({ setFormData }) => {
  const navigate = useNavigate();
  const [formData, setLocalFormData] = useState({
    fromName: "",
    className: "",
    schoolName: "",
    city: "",
    toDesignation: "",
    toName: "",
    toCity: "",
    content: "",
    date: "",
    place: "",
  });

  const [reasons, setReasons] = useState([]);

  useEffect(() => {
    const fetchReasons = async () => {
      try {
        const response = await fetch("https://vt-leavease.onrender.com/api/reasons");
        const data = await response.json();
        setReasons(data);
      } catch (error) {
        console.error("Error fetching reasons:", error);
      }
    };

    fetchReasons();
  }, []);

  const handleReasonChange = (e) => {
    const selectedReason = reasons.find((reason) => reason.reason === e.target.value);
    setLocalFormData({ ...formData, content: selectedReason?.contentTemplate || "" });
  };

  const handleChange = (e) => {
    setLocalFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://vt-leavease.onrender.com/api/leaves", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        swal({
          title: "Success!",
          text: "Leave application saved successfully.",
          icon: "success",
          button: "OK",
        }).then(() => {
          setFormData(formData);
          navigate("/leave-application");
        });
      } else {
        swal({
          title: "Error!",
          text: result.message || "Error saving leave application.",
          icon: "error",
          button: "Try Again",
        });
      }
    } catch (error) {
      swal({
        title: "Error!",
        text: "Failed to save leave application.",
        icon: "error",
        button: "Try Again",
      });
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="form-container">
      <div className="page-header">
        <h1 className="form-title">Leave Application</h1>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>From Name:</label>
          <input
            type="text"
            name="fromName"
            value={formData.fromName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>
        <div className="form-group">
          <label>Class:</label>
          <input
            type="text"
            name="className"
            value={formData.className}
            onChange={handleChange}
            placeholder="Enter your class"
            required
          />
        </div>
        <div className="form-group">
          <label>School/College Name:</label>
          <input
            type="text"
            name="schoolName"
            value={formData.schoolName}
            onChange={handleChange}
            placeholder="Enter the name of your school/college"
            required
          />
        </div>
        <div className="form-group">
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter the city name"
            required
          />
        </div>
        <div className="form-group">
          <label>To :</label>
          <input
            type="text"
            name="toDesignation"
            value={formData.toDesignation}
            onChange={handleChange}
            placeholder="Enter the Receiver"
            required
          />
        </div>
        <div className="form-group">
          <label>School/College Name:</label>
          <input
            type="text"
            name="toName"
            value={formData.toName}
            onChange={handleChange}
            placeholder="Enter the name of the College"
            required
          />
        </div>
        <div className="form-group">
          <label>City:</label>
          <input
            type="text"
            name="toCity"
            value={formData.toCity}
            onChange={handleChange}
            placeholder="Enter the city"
            required
          />
        </div>
        <div className="form-group">
          <label>Reason:</label>
          <select name="reason"  onChange={handleReasonChange} required>
            <option value=" ">Select a reason</option>
            {reasons.map((reason) => (
              <option key={reason._id} value={reason.reason}>
                {reason.reason}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Content:</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Select the Reason First"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={today}
            required
          />
        </div>
        <div className="form-group">
          <label>Place:</label>
          <input
            type="text"
            name="place"
            value={formData.place}
            onChange={handleChange}
            placeholder="Enter the place of leave"
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn">Generate Application</button>
        </div>
      </form>
    </div>
  );
};

export default InputPage;
