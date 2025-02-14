import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import React from "react";
import { Startup } from "@prisma/client";

const styles = StyleSheet.create({
  page: { padding: 20, fontSize: 12 },
  section: { marginBottom: 10 },
  header: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  text: { marginBottom: 3 },
  separator: {
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

const StartupResumePDF = ({ startup }: { startup: Startup | null }) => {
  const date = new Date(startup?.registrationDate as Date).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>Startup Resume</Text>
          <Image
            src={
              startup?.image ||
              "https://res.cloudinary.com/dlriuadjv/image/upload/v1729353205/xbbb0zw6js60dxnq64qj.png"
            }
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
          <Text style={styles.text}>{startup?.name}</Text>
          <Text style={styles.text}>{startup?.registeredName || "N/A"}</Text>
          <Text style={styles.text}>{startup?.description || "N/A"}</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.section}>
          <Text style={styles.header}>Progress</Text>
          <Text style={styles.text}>
            Product Stage: {startup?.productStage || "N/A"}
          </Text>
          <Text style={styles.text}>
            Funding Stage: {startup?.fundingStage || "N/A"}
          </Text>
          <Text style={styles.text}>
            TRL Level: {startup?.trlLevel || "N/A"}
          </Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.section}>
          <Text style={styles.header}>Product</Text>
          <Text style={styles.text}>Idea: {startup?.idea || "N/A"}</Text>
          <Text style={styles.text}>Problem: {startup?.problem || "N/A"}</Text>
          <Text style={styles.text}>
            Market Size: {startup?.marketSize || "N/A"}
          </Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.section}>
          <Text style={styles.header}>Team</Text>
          <Text style={styles.text}>
            Founders: {startup?.foundersDetail || "N/A"}
          </Text>
          <Text style={styles.text}>
            Team Size: {startup?.teamSize || "N/A"}
          </Text>
          <Text style={styles.text}>
            Full-time members: {startup?.noOfFte || "N/A"}
          </Text>
          <Text style={styles.text}>
            Part-time members: {startup?.noOfInterns || "N/A"}
          </Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.section}>
          <Text style={styles.header}>Other Details</Text>
          <Text style={styles.text}>
            DPIIT Recognized: {startup?.dpiitRecognized ? "Yes" : "No"}
          </Text>
          <Text style={styles.text}>Registration Date: {date || "N/A"}</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.section}>
          <Text style={styles.header}>Contact</Text>
          <Text style={styles.text}>
            Contact Number: {startup?.contactNumber || "N/A"}
          </Text>
          <Text style={styles.text}>Email: {startup?.email || "N/A"}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default StartupResumePDF;
