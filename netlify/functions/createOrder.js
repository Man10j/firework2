const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" })
    };
  }

  let productLists, usermail;
  try {
    const body = JSON.parse(event.body);
    productLists = body.productLists;
    usermail = body.usermail;
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid JSON" })
    };
  }

  // Simulate order creation logic
  const orderId = Math.floor(Math.random() * 1000000);

  // Send email using Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "cmprabhakarjan27@gmail.com",
      pass: "ppnh rtlp yjrn rvnf" // Use App Passwords for better security
    }
  });

  const mailOptions = {
    from: "cmprabhakarjan27@gmail.com",
    to: "cmprabhakarjan27@gmail.com",
    subject: 'Order Confirmation',
    text: `Your order #${orderId} has been created.\nProducts: ${JSON.stringify(productLists)}`
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Order created, but email failed to send', details: err.message })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Order created successfully and email sent",
      orderId,
      products: productLists
    })
  };
};