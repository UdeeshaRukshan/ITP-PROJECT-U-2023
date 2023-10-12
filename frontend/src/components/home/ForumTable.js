import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { Document, Page, Text, View, PDFDownloadLink } from "@react-pdf/renderer";
import "./ForumTable.css"; // Update the CSS file name accordingly

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
};

const ForumTable = ({ forums }) => {
  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Forum Report</Text>
          {forums.map((forum, index) => (
            <Text key={forum._id} style={styles.forumItem}>
              {`${index + 1}. Title: ${forum.title}, Owner: ${forum.author}, Creation Date: ${forum.publishYear}, Content: ${forum.content}`}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );

  return (
    <div>
      <table className="table1">
        <thead>
          <tr>
            <th className="table-header">No</th>
            <th className="table-header">Title</th>
            <th className="table-header hidden md:table-cell">Owner</th>
            <th className="table-header hidden md:table-cell">Creation Date</th>
            <th className="table-header">Operations</th>
          </tr>
        </thead>
        <tbody>
          {forums.map((forum, index) => (
            <tr key={forum._id}>
              <td className="table-cell">{index + 1}</td>
              <td className="table-cell">{forum.title}</td>
              <td className="table-cell hidden md:table-cell">{forum.author}</td>
              <td className="table-cell hidden md:table-cell">
                {forum.publishYear}
              </td>
             
              <td className="table-cell">
                <div className="operation-icons">
                  <Link to={`/forums/edit/${forum._id}`}> {/* Update the route path */}
                    <AiOutlineEdit className="icon edit-icon" />
                  </Link>
                  <Link to={`/forums/delete/${forum._id}`}> {/* Update the route path */}
                    <MdOutlineDelete className="icon delete-icon" />
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
