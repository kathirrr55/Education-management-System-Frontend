// src/pages/User/Certificate.js
import React from "react";
import "./Certificate.css"; // Make sure this file exists for styling
import { useLocation, useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import UserappBar from "../../Navbar/User";
import axios from "axios";
import { API_BASE_URL } from "../../../config";

const Certificate = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Fallback values to prevent crash if location.state is missing
  const { name, course } = location.state || {
    name: "Student",
    course: "Course"
  };

  const today = new Date().toISOString().slice(0, 10);

  const downloadCertificate = async (e) => {
    e.preventDefault();
    const element = document.getElementById("certificate");

    if (!element) {
      alert("Certificate element not found!");
      return;
    }

    const options = {
      filename: `${name}-certificate.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
    };

    try {
      // Download PDF
      await html2pdf().from(element).set(options).save();

      // Update subscription status in backend
      const subId = localStorage.getItem("sub_id");
      if (!subId) {
        alert("Subscription ID missing!");
        return;
      }

      const res = await axios.put(API_BASE_URL + "updatesubscriptionstatus", {
        id: subId,
        status: "completed"
      });

      if (res.data.status === 200) {
        alert(res.data.message || "Subscription completed successfully!");
        navigate("/userhome");
      } else {
        alert("Something went wrong while updating status!");
      }
    } catch (err) {
      console.error("Error while generating certificate:", err);
      alert("Failed to generate certificate. Try again.");
    }
  };

  return (
    <div>
      <UserappBar />

      {/* Certificate Design */}
      <div id="certificate" className="certificate">
        <div className="certificate-header">
          <h1>Certificate of Completion</h1>
        </div>
        <div className="certificate-body">
          <p>This is to certify that</p>
          <h2>{name}</h2>
          <p>has successfully completed the course</p>
          <h3>{course}</h3>
          <p>on</p>
          <h4>{today}</h4>
        </div>
        <div className="certificate-footer">
          <p>Authorized Signature</p>
        </div>
      </div>

      {/* Download Button */}
      <button onClick={downloadCertificate} className="download-btn">
        Download Certificate
      </button>
    </div>
  );
};

export default Certificate;

// // src/Certificate.js
// import React from "react";
// import "./Certificate.css"; // Optional for styling
// import { useLocation, useNavigate } from "react-router-dom";
// import html2pdf from "html2pdf.js";
// import UserappBar from "../../Navbar/User";
// import axios from "axios";
// import { API_BASE_URL } from "../../../config";

// const Certificate = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   let today = new Date().toISOString().slice(0, 10);
//   const { name, course } = location.state;

//   const downloadCertificate = e => {
//     e.preventDefault();
//     const element = document.getElementById("certificate");
//     const options = {
//       filename: "course-certificate.pdf",
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
//     };
//     html2pdf().from(element).set(options).save();
//     axios
//       .put(API_BASE_URL + "updatesubscriptionstatus", {
//         id: localStorage.getItem("sub_id"),
//         status: "completed"
//       })
//       .then(res => {
//         console.log(res.data);
//         if (res.data.status === 200) {
//           alert(res.data.message);
//           navigate("/userhome");
//         }
//       });
//   };

//   return (
//     <div>
//       <UserappBar />
//       <div id="certificate" className="certificate">
//         <div className="certificate-header">
//           <h1>Certificate of Completion</h1>
//         </div>
//         <div className="certificate-body">
//           <p>This is to certify that</p>
//           <h2>
//             {name}
//           </h2>
//           <p>has successfully completed the course</p>
//           <h3>
//             {course}
//           </h3>
//           <p>on</p>
//           <h4>
//             {today}
//           </h4>
//         </div>
//         <div className="certificate-footer">
//           <p>Authorized Signature</p>
//         </div>
//       </div>
//       <button onClick={downloadCertificate} className="download-btn">
//         Download Certificate
//       </button>
//     </div>
//   );
// };

// export default Certificate;
