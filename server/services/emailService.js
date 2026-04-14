const transporter = require('../config/mail');

exports.sendPhishingEmail = async ({
  recipientEmail,
  campaignId,
  userId,
  subject,
  template
}) => {
  const trackingLink = `http://localhost:5000/api/track/${campaignId}/${userId}`;

  const htmlTemplate = `
    <div style="font-family: Arial;">
      <!--<h2>${subject}</h2>-->
      <p>${template}</p>
      <!--<p>Please reset your password immediately.</p>-->
      <a href="${trackingLink}">
        Click here to proceed
      </a>
    </div>
  `;

  await transporter.sendMail({
    from: '"Security Team" <security@test.com>',
    to: recipientEmail,
    subject: subject,
    html: htmlTemplate
  });
};