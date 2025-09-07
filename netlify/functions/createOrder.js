const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" })
    };
  }

  let productLists, total, userDetails, orderId;
  try {
    const body = JSON.parse(event.body);
    productLists = body.productLists;
    total = body.total;
    userDetails = body.userDetails;
    orderId = body.orderId;
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid JSON" })
    };
  }

  // Simulate order creation logic
  // Send email using Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.userEmail,
      pass: process.env.pass // Use App Passwords for better security
    }
  });

    // Create HTML table for products (excluding idx)
    let tableRows = productLists.map((product,index) => `
      <tr>
      <td>${index + 1}.</td>
        <td>${product.description}</td>
     <td>${product.packType}</td>
         <td>${product.count}</td>
         <td>₹${product.discountedPrice}</td>
        <td>₹${product.discountedPrice * product.count}</td>
      </tr>
    `).join('');

    const htmlTable = `
      <table border="1" cellpadding="5" cellspacing="0">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Pack Type</th>
            <th>Count</th>
            <th>Unit Price</th>
            <th>Total Price</th>
           
          </tr>
        </thead>
        <tbody>
          ${tableRows}
           <tr>
              <td colspan="7" style="text-align:right;font-weight:bold;">Amount : ₹${total}</td>
            </tr>
        </tbody>
      </table>
    `;

            
  // Extract user details and format them as "Field: Value" lines
  const userDetailsHtml = `
    <p>Name: ${userDetails.name}</p>
    <p>Phone: ${userDetails.phone}</p>
    <p>Address: ${userDetails.address}</p>
  `;

  const mailOptions = {
    from: process.env.userEmail,
    to: process.env.receiverEmail,
    subject: `Order Confirmation ${orderId}`,
    html: `
      ${userDetailsHtml}
      <p>Your order #${orderId} has been created.</p>
      ${htmlTable}
    `
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