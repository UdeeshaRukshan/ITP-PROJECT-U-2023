import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import FeedbackReport from "../../pages/FeedbackReport";

const PdfDownloadComponent = () => {
  const handleDownloadPDF = () => {
    const input = document.getElementById("pdf-content");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save("downloaded-pdf.pdf");
    });
  };

  return (
    <div>
      <button onClick={handleDownloadPDF}>Download PDF</button>
      <div id="pdf-content">
        <FeedbackReport />
      </div>
    </div>
  );
};

export default PdfDownloadComponent;
