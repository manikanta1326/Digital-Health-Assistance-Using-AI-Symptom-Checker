import jsPDF from "jspdf";

const generatePDF = (result) => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("Health Assessment Report", 20, 20);

  doc.setFontSize(12);

  doc.text(
    `Disease: ${result.disease}`,
    20,
    50
  );

  doc.text(
    `Confidence: ${result.confidence}`,
    20,
    70
  );

  doc.text(
    `Severity: ${result.severity}`,
    20,
    90
  );

  doc.text(
    "Precautions:",
    20,
    110
  );

  result.precautions.forEach(
    (item, index) => {
      doc.text(
        `• ${item}`,
        30,
        130 + index * 15
      );
    }
  );

  doc.save("Health_Report.pdf");
};

export default generatePDF;