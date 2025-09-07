const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" })
    };
  }

  let productLists, total, userDetails;
  try {
    const body = JSON.parse(event.body);
    productLists = body.productLists;
    total = body.total;
    userDetails = body.userDetails;
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

    // Create HTML table for products (excluding idx)
    let tableRows = productLists.map(product => `
      <tr>
        <td>${product.name}</td>
        <td>${product.description}</td>
         <td>${product.count}</td>
       
        <td>${product.packType}</td>
        <td>${product.category}</td>
         <td>${product.price}</td>
        <td>${product.discountedPrice}</td>
       
      </tr>
    `).join('');

    const htmlTable = `
      <table border="1" cellpadding="5" cellspacing="0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Count</th>
            <th>Pack Type</th>
            <th>Category</th>
            <th>Price</th>
            <th>Discounted Price</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
           <tr>
              <td colspan="7" style="text-align:right;font-weight:bold;">Total: ${total}</td>
            </tr>
        </tbody>
      </table>
    `;

            
  // Extract user details and format them as "Field: Value" lines
  const userDetailsHtml = Object.entries(userDetails)
    .map(([key, value]) => `<p>${key}: ${value}</p>`)
    .join('');

  const mailOptions = {
    from: "cmprabhakarjan27@gmail.com",
    to: userDetails.email,
    subject: 'Order Confirmation',
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