import React,{useEffect,useState} from 'react'
import Button from '@mui/material/Button';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import jsPDF from'jspdf'



function Report({notifications}) {


      const jsPDFGenarator = () => {

        const doc = new jsPDF();
      
        let y = 20;
      
        const pageWidth = doc.internal.pageSize.width;
        const textWidth = doc.getStringUnitWidth("AuctionPal Notification Report") * doc.internal.getFontSize();
        const centerX = (pageWidth - textWidth) / 2;
      
        const underlineX1 = centerX;
        const underlineX2 = centerX + textWidth;
      
        doc.setFontSize(20);
        doc.text("AuctionPal Notification Report", centerX, y);
        doc.setLineWidth(0.5);
        doc.line(underlineX1, y + 2, underlineX2, y + 2);
      
        y += 20;
      
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text("Image", 15, y);
        doc.text("Description", 65, y);
        doc.text("Selected User Name", 145, y);
      
        y += 10;
      
        doc.setFont("helvetica", "");
        notifications.forEach((notification) => {
          const { image, description, selectedUserName } = notification;
      
          doc.addImage(image, "JPEG", 15, y, 40, 0);
          doc.text(description, 65, y + 5);
          doc.text(selectedUserName, 145, y + 5);
      
          y += 50;
        });
      
        doc.addPage();
      
        doc.save("notifications.pdf");
      };
      
      
      
      
      
      

  return (
    <>
      <Button variant="contained" startIcon={<DownloadForOfflineIcon />} style={{ marginLeft: '250px',marginBottom:'20px' }} onClick={jsPDFGenarator}>
        Genarate PDF Report
      </Button>
    </>
  )
}

export default Report