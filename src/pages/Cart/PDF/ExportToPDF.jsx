import React from "react";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import logo from "../../../images/Header/logo.png";

Font.register({
  family: "Roboto",
  src: "https://fonts.gstatic.com/s/roboto/v29/KFOmCnqEu92Fr1Mu72xKOzY.woff2",
});

// Styles for the PDF document
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Roboto",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 15,
  },
  heading: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
    textDecoration: "underline",
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
    fontSize: 12,
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  value: {
    textAlign: "right",
  },
  line: {
    borderBottom: "1px solid #ddd",
    marginVertical: 10,
  },
  disclaimer: {
    marginTop: 20,
    fontSize: 10,
    textAlign: "center",
    color: "#888",
  },
  freeDelivery: {
    color: "green",
    fontSize: 12,
  },
  redText: {
    color: "red",
    fontSize: 12,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottom: "1px solid #ddd", // Horizontal line between rows
  },
  tableHeader: {
    fontWeight: "bold",
    fontSize: 12, // Same size as table cell for formality
    borderBottom: "1px solid #ddd", // Horizontal line under the header
    borderRight: "1px solid #ddd",
  },
  tableCell: {
    fontSize: 12, // Formal size for consistent styling
    width: "25%", // Adjust column widths as needed
    textAlign: "left",
    paddingHorizontal: 5,
    borderRight: "1px solid #ddd",
  },
  rightAligned: {
    textAlign: "right",
    width: 120,
  },
  grandTotal: {
    fontWeight: "bold",
    fontSize: 14,
  },
  qty: { textAlign: "center", width: 100 },
  description: {
    width: 300,
  },
  unitPrice: {
    width: 120,
    textAlign: "center",
  },

  discount: {
    color: "red",
    fontSize: 12,
  },
  free: {
    color: "green",
  },
  charges: {
    color: "red",
  },
  trend: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

const PDFDocument = (orderData) => {
  // Calculate discount if total and grand total are different
  // const discountAmount =
  //   orderData.total !== orderData.grandTotal
  //     ? (orderData.total - orderData.grandTotal).toFixed(2)
  //     : "0.00";
  const items = orderData.items || [];
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Image src={logo} style={styles.logo} />
          <Text style={styles.title}>ORDER RECEIPT</Text>
        </View>

        {/* Company Information */}
        <View style={styles.section}>
          <Text style={[styles.text, styles.trend]}>Trendy Online</Text>
          <Text style={styles.text}>Hyderabad</Text>
          <Text style={styles.text}>Hyderabad, Telangana, 500001</Text>
        </View>
        <View style={styles.line}></View>
        {/* Billing & Shipping Information */}
        <View style={styles.infoContainer}>
          <View>
            <Text style={styles.heading}>BILL TO</Text>
            <Text style={styles.text}>
              {orderData.firstname} {orderData.lastname}
            </Text>
          </View>
          <View>
            <Text style={styles.heading}>SHIP TO</Text>
            <Text style={styles.text}>
              {orderData.firstname} {orderData.lastname}
            </Text>
            <Text style={styles.text}>{orderData.address}</Text>
            <Text style={styles.text}>
              {orderData.country}, {orderData.postcode}
            </Text>
          </View>
        </View>

        <View style={styles.line}></View>
        {/* Receipt Details */}
        <View style={styles.section}>
          <Text style={styles.text}>
            <Text style={styles.label}>Receipt ID: </Text>
            {orderData.receiptId}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Date: </Text>
            {new Date().toLocaleDateString()}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Payment Mode: </Text>
            {orderData.payMode}
          </Text>
        </View>
        <View style={styles.line}></View>
        {/* Product Details */}
        <View style={styles.section}>
          <Text style={styles.heading}>Product Details</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.tableCell, styles.description]}>
                DESCRIPTION
              </Text>
              <Text style={[styles.tableCell, styles.qty]}>QTY</Text>
              <Text style={[styles.tableCell, styles.unitPrice]}>
                UNIT PRICE
              </Text>
              <Text style={[styles.tableCell, styles.unitPrice]}>AMOUNT</Text>
            </View>
            {items.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.description]}>
                  {item.name}
                </Text>
                <Text
                  style={[styles.tableCell, styles.rightAligned, styles.qty]}
                >
                  {item.quantity}
                </Text>
                <Text style={[styles.tableCell, styles.rightAligned]}>
                  {typeof item.price === "number"
                    ? item.price.toFixed(2)
                    : parseFloat(item.price).toFixed(2)}
                </Text>
                <Text style={[styles.tableCell, styles.rightAligned]}>
                  {item.quantity && item.price
                    ? (
                        parseInt(item.quantity, 10) *
                        (typeof item.price === "number"
                          ? item.price
                          : parseFloat(item.price))
                      ).toFixed(2)
                    : "N/A"}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Subtotal:</Text>
            <Text style={styles.text}>{orderData.total}</Text>
          </View>
          {/* <View style={styles.infoContainer}>
            <Text style={styles.label}>Discount:</Text>
            <Text style={styles.text}>{discountAmount}</Text>
          </View> */}

          <View style={styles.infoContainer}>
            <Text style={styles.label}>Delivery Charges:</Text>
            <Text style={styles.text}>
              {orderData.deliveryCharges === 0 ? (
                <Text style={[styles.text, styles.free]}>Free</Text>
              ) : (
                <Text style={[styles.text, styles.charges]}>
                  {orderData.deliveryCharges}
                </Text>
              )}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={[styles.label, styles.grandTotal]}>Grand Total:</Text>
            <Text style={[styles.text, styles.grandTotal]}>
              {orderData.grandTotal}
            </Text>
          </View>
        </View>
        <View style={styles.line}></View>
        {/* Disclaimer */}
        <Text style={styles.disclaimer}>
          * This receipt is generated electronically and does not require a
          signature.
        </Text>
      </Page>
    </Document>
  );
};

// Export component that triggers PDF download
const ExportToPDF = (orderData) => (
  <PDFDownloadLink
    document={<PDFDocument orderData={orderData} />}
    fileName={`order_receipt_${orderData.receiptId}.pdf`}
  >
    {({ loading }) =>
      loading ? (
        "Loading document..."
      ) : (
        <Text style={{ fontSize: 25, color: "#0E4158", textAlign: "center" }}>
          <ion-icon name="download-outline" />
        </Text>
      )
    }
  </PDFDownloadLink>
);

export default ExportToPDF;
