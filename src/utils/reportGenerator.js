import { jsPDF } from 'jspdf';
import { formatBytes } from './exifReader';

export const generatePdfReport = (file, metadata) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 20;

  // Header Title
  doc.setFontSize(20);
  doc.setTextColor(37, 99, 235); // Brand Blue (#2563EB)
  doc.text("Privacy Analysis Report", 20, y);
  
  y += 8;
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, y);
  doc.text(`Target File: ${file.name} (${formatBytes(file.size)})`, 20, y + 5);

  y += 15;
  doc.setLineWidth(0.5);
  doc.setDrawColor(226, 232, 240);
  doc.line(20, y, pageWidth - 20, y);

  // Summary Section
  y += 12;
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.text("1. Privacy Risk Summary", 20, y);

  y += 8;
  doc.setFontSize(10);

  const hasGps = metadata && (metadata.latitude !== undefined || metadata.GPSLatitude !== undefined);
  const device = metadata?.Model || metadata?.Make ? `${metadata?.Make || ''} ${metadata?.Model || ''}`.trim() : 'Not detected';
  const dateTaken = metadata?.DateTimeOriginal ? new Date(metadata.DateTimeOriginal).toLocaleString() : 'Not detected';

  // GPS Risk Status
  doc.setFont("helvetica", "bold");
  doc.text("GPS Location:", 25, y);
  doc.setFont("helvetica", "normal");
  if (hasGps) {
    doc.setTextColor(220, 38, 38); // Red
    doc.text("FOUND (High Risk - Exact coordinates exposed)", 60, y);
  } else {
    doc.setTextColor(22, 163, 74); // Green
    doc.text("Not Found (Safe)", 60, y);
  }

  // Device Info
  y += 7;
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.text("Device/Camera:", 25, y);
  doc.setFont("helvetica", "normal");
  doc.text(device, 60, y);

  // Date/Time
  y += 7;
  doc.setFont("helvetica", "bold");
  doc.text("Date Taken:", 25, y);
  doc.setFont("helvetica", "normal");
  doc.text(dateTaken, 60, y);

  // Extracted Metadata Breakdown Table
  y += 15;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("2. Extracted EXIF Metadata Fields", 20, y);

  y += 8;
  doc.setFontSize(9);
  doc.setFillColor(241, 245, 249);
  doc.rect(20, y, pageWidth - 40, 7, 'F');
  
  doc.setTextColor(71, 85, 105);
  doc.text("Property", 25, y + 5);
  doc.text("Value", 90, y + 5);
  
  y += 10;
  doc.setFont("helvetica", "normal");

  const keys = Object.keys(metadata || {});
  if (keys.length === 0) {
    doc.setTextColor(100, 116, 139);
    doc.text("No EXIF metadata fields found in this image.", 25, y);
  } else {
    keys.forEach((key) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }

      let val = metadata[key];
      if (typeof val === 'object' && val !== null) {
        val = JSON.stringify(val);
      } else {
        val = String(val);
      }

      // Truncate long strings for cleaner presentation
      if (val.length > 55) val = val.substring(0, 52) + "...";

      doc.setTextColor(15, 23, 42);
      doc.text(String(key), 25, y);
      doc.setTextColor(71, 85, 105);
      doc.text(val, 90, y);

      y += 6;
    });
  }

  doc.save(`privacy_report_${file.name.replace(/\.[^/.]+$/, "")}.pdf`);
};