import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { Document, Page, Text, View, PDFDownloadLink } from "@react-pdf/renderer";

const styles = {
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  forumItem: {
    fontSize: 12,
  },
  table1: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeader: {
    backgroundColor: "#f2f2f2",
    border: "1px solid #d0d0d0",
  },
  tableCell: {
    border: "1px solid #d0d0d0",
    padding: "8px",
    textAlign: "center",
  },
  hiddenOnMobile: {
    display: "table-cell",
  },
  operationIcons: {
    display: "flex",
    justifyContent: "space-between",
  },
  icon: {
    fontSize: "1.5rem",
    margin: "0 5px",
  },
};

const ForumTable = ({ forums }) => {
  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Forum Report</Text>
          {forums.map((forum, index) => (
            <Text key={forum._id} style={styles.forumItem}>
              {`${index + 1}. Title: ${forum.title}, Owner: ${forum.author}, Creation Date: ${forum.createdDate}, Content: ${forum.content}`}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );

  return (
    <div>
      <table style={styles.table1}>
        <thead>
          <tr>
            <th style={{ ...styles.tableHeader, ...styles.hiddenOnMobile }}>No</th>
            <th style={styles.tableHeader}>Title</th>
            <th style={{ ...styles.tableHeader, ...styles.hiddenOnMobile }}>Name</th>
            <th style={{ ...styles.tableHeader, ...styles.hiddenOnMobile }}>Creation Date</th>
            <th style={styles.tableHeader}>Operations</th>
          </tr>
        </thead>
        <tbody>
          {forums.map((forum, index) => (
            <tr key={forum._id}>
              <td style={{ ...styles.tableCell, ...styles.hiddenOnMobile }}>{index + 1}</td>
              <td style={styles.tableCell}>{forum.title}</td>
              <td style={{ ...styles.tableCell, ...styles.hiddenOnMobile }}>{forum.author}</td>
              <td style={{ ...styles.tableCell, ...styles.hiddenOnMobile }}>{forum.createdDate}</td>

              <td style={styles.tableCell}>
                <div style={styles.operationIcons}>
                  <Link to={`/forums/details/${forum._id}`}>
                    <BsInfoCircle style={styles.icon} />
                  </Link>
                  <Link to={`/forums/edit/${forum._id}`}>
                    <AiOutlineEdit style={styles.icon} />
                  </Link>
                  <Link to={`/forums/delete/${forum._id}`}>
                    <MdOutlineDelete style={styles.icon} />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PDFDownloadLink document={<MyDocument />} fileName="forum_report.pdf">
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download PDF Report"
        }
      </PDFDownloadLink>
    </div>
  );
};

export default ForumTable;
