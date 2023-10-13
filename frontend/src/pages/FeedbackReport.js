import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RatingCountsChart from "../components/feedback/RateChart";
import MonthChart from "../components/feedback/MonthChart";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
const FeedbackReport = () => {

  const [cookies, removeCookie] = useCookies([]);
  const [reviewsCount, rCount] = useState(0);
  const [usersCount, uCount] = useState(0);
  const navigate = useNavigate();

  

  useEffect(() => {

    
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      await axios.post(
        "http://localhost:4042",
        {},
        { withCredentials: true }
      );

    };


   


    verifyCookie();
    loadReport();
  }, [cookies, navigate, removeCookie]);

  function loadReport() {
    fetch("http://localhost:4042/api/feedback/report/stats", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {

          rCount(data.totalReviewCount)
          uCount(data.uniqueUserCount)
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  const report = () => {
    const input = document.getElementById('pdf_content');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF();
      pdf.addImage(imgData, 'JPEG', 0, 0);
      pdf.save('downloaded-pdf.pdf');
    });
  };

  return (
    <div class="main">
<button onClick={report}>Generate PDF</button>
      <div class="analytics" id="pdf_content">
        <div class="ttl">
          Reviews Count : <span>{reviewsCount}</span>
        </div>
        <div class="ttl">
          Users Count : <span>{usersCount}</span>
        </div>
      </div>
      <div class="chart-wrap">
        <div class="chart-card">
          <div class="title">
            Analytics using rated category
            <RatingCountsChart />
          </div>
        </div>
        <div class="chart-card">
          <div class="title">
            Analytics using rated month
            <MonthChart />
          </div>
        </div>
      </div>



    </div>
  );
};

export default FeedbackReport;
