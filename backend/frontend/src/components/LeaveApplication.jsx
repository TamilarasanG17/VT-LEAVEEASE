import React from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "./LeaveApplication.css";

const LeaveApplication = ({ formData }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/"); 
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const marginLeft = 20;
    const marginTop = 30;
    const contentWidth = doc.internal.pageSize.width - marginLeft * 2;

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(18);
    doc.text("Leave Application", marginLeft, 20); 

    doc.setFontSize(12);
    const content = `
From:
${formData.fromName},
${formData.className},
${formData.schoolName},
${formData.city}

To:
${formData.toDesignation},
${formData.toName},
${formData.toCity}

Respected Sir/Madam,
Subject:Leave Application

${formData.content}

Thanking You,
`;

    doc.text(content, marginLeft, marginTop, { maxWidth: contentWidth });

    const thankingYouText = "Thanking You,";
    const thankYouX = (doc.internal.pageSize.width - doc.getTextWidth(thankingYouText)) / 2;
    doc.text(thankingYouText, thankYouX, marginTop + 100);

    const yoursFaithfullyText = "Yours Faithfully,";
    const nameText = formData.fromName;

    const yoursFaithfullyX = doc.internal.pageSize.width - marginLeft - doc.getTextWidth(yoursFaithfullyText) - 10;
    const nameX = doc.internal.pageSize.width - marginLeft - doc.getTextWidth(nameText) - 10;

    doc.text(yoursFaithfullyText, yoursFaithfullyX, marginTop + 130);
    doc.text(nameText, nameX, marginTop + 140);

    const dateText = `Date: ${formData.date}`;
    const placeText = `Place: ${formData.place}`;

    doc.text(dateText, marginLeft, marginTop + 160);
    doc.text(placeText, marginLeft, marginTop + 170);

    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, marginLeft, doc.internal.pageSize.height - 10);

    doc.save("leave application.pdf");
};


  if (!formData) return <p className="no-data">No data to display</p>;

  return (
    <div className="leave-application-container">
      <div className="leave-application-content animate-fade-in">
        <h2>Leave Application Preview</h2>
        <div className="leave-letter">
          <p>
            <strong>From:</strong><br />
            {formData.fromName},<br />
            {formData.className},<br />
            {formData.schoolName},<br />
            {formData.city}
          </p>
          <p>
            <strong>To:</strong><br />
            {formData.toDesignation},<br />
            {formData.toName},<br />
            {formData.toCity}
          </p>
          <p>
            <strong>Respected Sir/Madam,</strong><br />
            <strong>Subject:Leave Application</strong>
          </p>
          <p>{formData.content}</p>
          <p className="thank-you">Thanking You,</p>
          <p className="yours-faithfully">
            <strong>Yours Faithfully,</strong><br />
            {formData.fromName}
          </p>
          <p>
            <strong>Date:</strong> {formData.date}<br />
            <strong>Place:</strong> {formData.place}
          </p>
        </div>
        <div className="button-group">
          <button className="btn edit-btn" onClick={handleEdit}>
            Edit
          </button>
          <button className="btn download-btn" onClick={handleDownloadPDF}>
            Download as PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveApplication;
