// 👇 ❇️ Riki for the group success 10 Abril 👊

// src/components/Quote/PdfDocument.jsx
import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font
} from '@react-pdf/renderer';

// Montserrat (Google Fonts)
Font.register({
  family: 'Montserrat',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/montserrat/v25/JTURjIg1_i6t8kCHKm45_cJD3gnD-w.ttf',
      fontWeight: 700,
    },
  ]
});

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Montserrat',
    padding: 30,
    fontSize: 12,
  },
  title: {
    fontSize: 18,
    color: '#4682B4',
    borderBottom: '1px solid #198754',
    marginBottom: 10,
  },
  section: {
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    color: '#198754',
  },
});

const PdfDocument = ({ user, field, cropType, hectares, services, frequency, pricePerHectare, total, validUntil }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.title}>🌾 Presupuesto de Servicios Agrícolas</Text>

      <View style={styles.section}>
        <Text><Text style={styles.label}>Cliente:</Text> {user}</Text>
        <Text><Text style={styles.label}>Parcela:</Text> {field}</Text>
        <Text><Text style={styles.label}>Cultivo:</Text> {cropType}</Text>
        <Text><Text style={styles.label}>Área:</Text> {hectares} ha</Text>
        <Text><Text style={styles.label}>Servicios:</Text> {services}</Text>
        <Text><Text style={styles.label}>Periodicidad:</Text> {frequency}</Text>
      </View>

      <View style={styles.section}>
        <Text><Text style={styles.label}>Precio por hectárea:</Text> {pricePerHectare} €</Text>
        <Text><Text style={styles.label}>Total estimado:</Text> {total} €</Text>
        <Text><Text style={styles.label}>Válido hasta:</Text> {validUntil}</Text>
      </View>
    </Page>
  </Document>
);

export default PdfDocument;

