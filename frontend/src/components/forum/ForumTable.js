import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import {
  Document,
  Page,
  Text,
  View,
  PDFDownloadLink,
  StyleSheet,
} from "@react-pdf/renderer";

// Define a stylesheet for the PDF document
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
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
    marginBottom: 10,
  },
  table1: {
    width: "100%",
    borderCollapse: "collapse",
    fontFamily: "Sans-serif",
  },
  tableHeader: {
    backgroundColor: "#284FBC",
    border: "1px solid #d0d0d0",
    height: "8vh",
  },
  tableCell: {
    border: "1px solid #d0d0d0",
    padding: 8,
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
    fontSize: 18,
    marginLeft: 5,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    color: "#0000FF",
  },
  createLink: {
    textDecoration: "none",
    color: "white",
  },
  createButton: {
    backgroundColor: "#284FBC",
    padding: "4px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    textDecoration: "none",
    width: "20vh",
    fontSize: "13px",
    color: "white",
    height: "7vh",
  },
  downloadButton: {
    backgroundColor: "#4AA16D",
    padding: "4px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    textDecoration: "none",
    color: "Black",
    width: "20vh",
    fontSize: "13px",
  },
  searchInput: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    border: "1px solid #d0d0d0",
    borderRadius: "4px",
  },
});

const ForumTable = ({ forums }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredForums = forums.filter((forum) =>
    forum.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Article Report</Text>
          {filteredForums.map((forum, index) => (
            <View key={forum._id} style={styles.forumItem}>
              <Text>{`${index + 1}. Title: ${forum.title}`}</Text>
              <Text>{`Owner: ${forum.author}`}</Text>
              <Text>{`Creation Date: ${forum.createdDate}`}</Text>
              <Text>{`Content: ${forum.content}`}</Text>
              <br></br>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search by Title"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={styles.searchInput}
      />

      <table style={styles.table1}>
        <thead>
          <tr>
            <th style={{ ...styles.tableHeader, ...styles.hiddenOnMobile }}>
              No
            </th>
            <th style={styles.tableHeader}>Title</th>
            <th style={{ ...styles.tableHeader, ...styles.hiddenOnMobile }}>
              Name
            </th>
            <th style={{ ...styles.tableHeader, ...styles.hiddenOnMobile }}>
              Creation Date
            </th>
            <th style={styles.tableHeader}>Operations</th>
          </tr>
        </thead>
        <tbody>
          {filteredForums.map((forum, index) => (
            <tr key={forum._id}>
              <td style={{ ...styles.tableCell, ...styles.hiddenOnMobile }}>
                {index + 1}
              </td>
              <td style={styles.tableCell}>{forum.title}</td>
              <td style={{ ...styles.tableCell, ...styles.hiddenOnMobile }}>
                {forum.author}
              </td>
              <td style={{ ...styles.tableCell, ...styles.hiddenOnMobile }}>
                {forum.createdDate}
              </td>
              <td style={styles.tableCell}>
                <div style={styles.operationIcons}>
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

      <div style={styles.buttonContainer}>
        <Link to="/forums/create" style={styles.createLink}>
          <button style={styles.createButton}>Create</button>
        </Link>

        <PDFDownloadLink
          document={<MyDocument />}
          fileName="Article_report.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? (
              "Loading document..."
            ) : (
              <button style={styles.downloadButton}>Download PDF Report</button>
            )
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default ForumTable;