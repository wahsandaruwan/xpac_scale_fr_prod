import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#d11fb6",
    color: "white",
  },
  section: {
    margin: 10,
    padding: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  viewer: {
    width: window.innerWidth, //the pdf viewer will take up all of the width and height
    height: window.innerHeight,
  },
});

// Create Document Component
const BasicDocPdf = ({
  itemCount,
  totalWeight,
  batteryPercentage,
  batteryVoltage,
  title,
  id,
}: {
  itemCount: string;
  totalWeight: string;
  batteryPercentage: string;
  batteryVoltage: string;
  title: string;
  id: string;
}) => {
  return (
    <PDFViewer style={styles.viewer}>
      {/* Start of the document*/}
      <Document>
        {/*render a single page*/}
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>{id}</Text>
            <Text>{title}</Text>
            <Text>{itemCount}</Text>
            <Text>{totalWeight}</Text>
            <Text>{batteryPercentage}</Text>
            <Text>{batteryVoltage}</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};
export default BasicDocPdf;
