import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';

Font.register({
  family: 'Style',
  src: 'https://cdn.fontshare.com/wf/HEBCMTNZLJDXIF7JJGHPXVQC52PHYOY3/57O2ZCYUIM6LVBBIAMBRKUEHOVUAZMVS/3O7IDHHZB6WCZLVWYOMQDQ73WV4QFLTL.ttf'
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 40,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    minWidth: '100%',
    minHeight: '100%',
    display: 'block',
    height: '115%',
    width: '110%',
    marginLeft: '-5%',
    marginTop: '-5%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    marginHorizontal: 'auto',
  },
  content: {
    padding: 30,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3498DB',
    marginBottom: 20,
    textAlign: 'center',
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#34495E',
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 1.5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  signature: {
    width: 200,
    textAlign: 'center',
  },
  signatureText: {
    fontSize: 12,
    color: '#2C3E50',
    marginTop: 5,
  },
  signatureName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
    fontFamily: 'Style',
  },
  signatureLine: {
    borderTop: '2px solid #3498DB',
    width: '100%',
    marginTop: 5,
  },
  date: {
    marginTop: 20,
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'right',
  },
  watermark: {
    position: 'absolute',
    top: '50%',
    left: '20%',
    transform: 'translate(-50%, -50%) rotate(-45deg)',
    fontSize: 60,
    color: 'rgba(0, 0, 0, 0.35)',
    opacity: 0.25,
  },
});

// Create Document Component
const MyDocument = ({ name, date = new Date().toLocaleDateString(), instructorSignature, directorSignature, courseName, courseDescription, selectedLogo, selectedBorder }) => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      <View fixed={true}>
        <Image src={selectedBorder} style={styles.backgroundImage} />
        <Text style={styles.watermark}>certificate-generator</Text>
        <View style={styles.header}>
          <Image src={selectedLogo} style={styles.logo} />
        </View>
        <View style={styles.content}>
          <Text style={styles.subtitle}>{courseName}</Text>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.description}>
            {courseDescription}
          </Text>
          <View style={styles.footer}>
            <View style={styles.signature}>
              <Text style={styles.signatureName}>{instructorSignature}</Text>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureText}>Course Instructor</Text>
            </View>
            <View style={styles.signature}>
              <Text style={styles.signatureName}>{directorSignature}</Text>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureText}>Program Director</Text>
            </View>
          </View>
        </View>
        <Text style={styles.date}>Date of Completion: {date}</Text>
      </View>
    </Page>
  </Document>
);

export default MyDocument;
