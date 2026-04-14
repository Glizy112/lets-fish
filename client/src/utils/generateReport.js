import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function generateReport(stats, timing) {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.text('Phishing Simulation Report', 20, 20);

  // Campaign summary
  doc.setFontSize(12);
  doc.text(`Campaign Name: ${stats.name}`, 20, 35);
  doc.text(`Trigger Type: ${stats.trigger_type}`, 20, 45);
  doc.text(`Sent At: ${stats.sent_at}`, 20, 55);

  // Metrics table
  autoTable(doc, {
    startY: 70,
    head: [['Metric', 'Value']],
    body: [
      ['Click Count', stats.click_count],
      ['Login Count', stats.login_count],
      ['Click Rate', stats.click_rate],
      ['Submission Rate', stats.submission_rate],
      ['First Click', timing?.first_click || 'N/A'],
      ['First Login', timing?.first_login || 'N/A']
    ]
  });

  // Human factor analysis
  const finalY = doc.lastAutoTable.finalY + 20;

  doc.text('Human Factor Analysis', 20, finalY);

  doc.text(
    `Primary psychological trigger: ${stats.trigger_type}`,
    20,
    finalY + 10
  );

  doc.text(
    'Observed susceptibility to social engineering prompts.',
    20,
    finalY + 20
  );

  // Recommendations
  doc.text('Recommendations', 20, finalY + 40);

  doc.text(
    '- Improve phishing awareness training',
    20,
    finalY + 50
  );

  doc.text(
    '- Conduct regular simulations',
    20,
    finalY + 60
  );

  doc.text(
    '- Train users on urgency-based attacks',
    20,
    finalY + 70
  );

  doc.save('phishing-simulation-report.pdf');
}