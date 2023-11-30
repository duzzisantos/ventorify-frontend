module.exports = function generateEmailBody(title, message) {
  return `<div style="border: 1px solid gray; height: 400px; width: 400px display: block; border-radius: 20px;">
  <h3>Purchase Request for ${title}</h3> <h4>Here are the details below:</h4> 
  
   <article>${message}</article>
   <p>Best regards,</p>
   <p>Your Ventorify Purchasing Team.</p>
  </div>`;
};
