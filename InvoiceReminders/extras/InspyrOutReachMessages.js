const greeting = `
    <div style="margin-bottom: 12px; padding: 24px; background-color: white; border-radius: 8px; color: #4b5563; font-family: Arial, Helvetica, sans-serif;">
    <!-- Message Section -->
        <p style="margin: 0 0 16px 0; font-size: 1rem; font-weight: 500;">Hello{{#if contactName}} {{contactName}},{{else}},{{/if}}</p>
         `;

const signOff = `
        <p style="margin: 0; font-size: 1rem;">
            Best regards,<br>
            <span style="font-weight: 500;">Accounts Receiveable Department</span>
        </p>
    </div>
`;

const inspyrInitialMessage = `
    <div style="margin-bottom: 12px; background: {{primaryColor}}; border-radius: 8px 8px 0 0; padding: 24px; text-align: center; font-family: Arial, Helvetica, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
                <td>
                    <h1 style="color: white; margin: 0; font-size: 1.5rem; font-weight: 600; letter-spacing: 0.025em;">NEW INVOICE RECORD</h1>
                    <p style="color: rgba(255, 255, 255, 0.9); margin: 8px 0 0 0; font-size: 1rem;">INSPYR SOLUTIONS LLC</p>
                </td>
            </tr>
        </table>
    </div>
     ${greeting}
        <p style="margin: 0 0 16px 0; font-size: 1rem; line-height: 1.6;">
            I hope you're doing well! Please find attached <span style="font-weight: 600; color: #374151;">Invoice #{{invoiceNumber}}</span> for your records. <br>
            This invoice is due on <span style="font-weight: 600; color: #374151;">{{formatDate dueDate}}</span>. Let us know if you have any questions—we're happy to help.
        </p>
        
    ${signOff}
`;

const inspyrTwoWeeksNewClient = `  
    <div style="margin-bottom: 12px; background: {{primaryColor}}; border-radius: 8px 8px 0 0; padding: 24px; text-align: center; font-family: Arial, Helvetica, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
                <td>
                    <h1 style="color: white; margin: 0; font-size: 1.5rem; font-weight: 600; letter-spacing: 0.025em;">INVOICE PAYMENT REMINDER</h1>
                    <p style="color: rgba(255, 255, 255, 0.9); margin: 8px 0 0 0; font-size: 1rem;">INSPYR SOLUTIONS LLC</p>
                </td>
            </tr>
        </table>
    </div>
    ${greeting}
    <p style="margin: 0 0 16px 0; font-size: 1rem; line-height: 1.6;">
        Hope this email finds you well.
    </p>

    <p style="margin: 0 0 16px 0; font-size: 1rem; line-height: 1.6;">
        Our records show that <span style="font-weight: 600; color: #374151;">Invoice #{{invoiceNumber}}</span> was delivered to you on <span style="font-weight: 600; color: #374151;">{{formatDate transactionDate}}</span> and is due on <span style="font-weight: 600; color: #374151;">{{formatDate dueDate}}</span>.
    </p>

    <p style="margin: 0 0 16px 0; font-size: 1rem; line-height: 1.6;">
        Could you let us know if you've received it and if everything's good to go on your end? <br> Also, just checking—will the payment be made via ACH, and is there anything else you need from us to get INSPYR Solutions LLC set up in your system?
    </p>
    ${signOff}
    `;

const inspyrTwoWeeksEstablishedClient = `
    <div style="margin-bottom: 12px; background: {{primaryColor}}; border-radius: 8px 8px 0 0; padding: 24px; text-align: center; font-family: Arial, Helvetica, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
              <td>
                  <h1 style="color: white; margin: 0; font-size: 1.5rem; font-weight: 600; letter-spacing: 0.025em;">INVOICE PAYMENT REMINDER</h1>
                  <p style="color: rgba(255, 255, 255, 0.9); margin: 8px 0 0 0; font-size: 1rem;">INSPYR SOLUTIONS LLC</p>
              </td>
          </tr>
      </table>
  </div>
    ${greeting}
    <p style="margin: 0 0 16px 0; font-size: 1rem; line-height: 1.6;">
        Hope this email finds you well.
    </p>

    <p style="margin: 0 0 16px 0; font-size: 1rem; line-height: 1.6;">
        Friendly reminder, our records indicate  <span style="font-weight: 600; color: #374151;">Invoice #{{invoiceNumber}}</span> is coming due on <span style="font-weight: 600; color: #374151;">{{formatDate dueDate}}</span>. <br> We would like
        to confirm you've received them and that they are scheduled for timely payment.
    </p>
    
    <p style="margin: 0 0 16px 0; font-size: 1rem; line-height: 1.6;">
        Please let us know if anything additional is required to process this invoice.
    </p>
    
    ${signOff}
`;

const inspyrDueSoon = `
 <div style="margin-bottom: 12px; background: {{primaryColor}}; border-radius: 8px 8px 0 0; padding: 24px; text-align: center; font-family: Arial, Helvetica, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
              <td>
                  <h1 style="color: white; margin: 0; font-size: 1.5rem; font-weight: 600; letter-spacing: 0.025em;">INVOICE PAYMENT DUE SOON</h1>
                  <p style="color: rgba(255, 255, 255, 0.9); margin: 8px 0 0 0; font-size: 1rem;">INSPYR SOLUTIONS LLC</p>
              </td>
          </tr>
      </table>
  </div>
   ${greeting}

    <p style="margin: 0 0 16px 0; font-size: 1rem; line-height: 1.6;">
       This is a friendly reminder that <span style="font-weight: 600; color: #374151;">Invoice #{{invoiceNumber}}</span> is due in a few days on <span style="font-weight: 600; color: #374151;">{{formatDate dueDate}}</span>.
    </p>
    <p style="margin: 0 0 16px 0; font-size: 1rem; line-height: 1.6;">
        Please let us know if anything additional is required to process this invoice.
    </p>
    
    ${signOff}
`;

const inspyrOverDue = `
    <div style="margin-bottom: 12px; background: {{primaryColor}}; border-radius: 8px 8px 0 0; padding: 24px; text-align: center; font-family: Arial, Helvetica, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
                <td>
                    <h1 style="color: white; margin: 0; font-size: 1.5rem; font-weight: 600; letter-spacing: 0.025em;">INVOICE EXCEEDED NET TERMS</h1>
                    <p style="color: rgba(255, 255, 255, 0.9); margin: 8px 0 0 0; font-size: 1rem;">INSPYR SOLUTIONS LLC</p>
                </td>
            </tr>
        </table>
    </div>
   ${greeting}
    <p style="margin: 0 0 16px 0; font-size: 1rem; line-height: 1.6;">
        Checking in as our records indicate that <span style="font-weight: 600; color: #374151;">Invoice #1234567</span> has exceeded net terms.
    </p>

    <p style="margin: 0 0 16px 0; font-size: 1rem; line-height: 1.6;">
        If payment has been made, can you kindly provide the remit date?
    </p>

    <p style="margin: 0 0 16px 0; font-size: 1rem; line-height: 1.6;">
        If payment has not been made, can you please provide the scheduled remit date?
    </p>

    <p style="margin: 0 0 16px 0; font-size: 1rem; line-height: 1.6;">
        Looking forward to your prompt response.
    </p> 
    ${signOff} 
`;

const inspyrWeeklyOverDue = `
${greeting}
<p style="margin: 0 0 16px 0; font-size: 1rem; line-height: 1.6;">
        We are reaching back out to you for an update on the invoice(s) listed below.
    </p>

    <p style="margin: 0 0 16px 0; font-size: 1rem; line-height: 1.6;">
        Please note all items shown are now considered past due and the resolution of this (these)
        charge(s) is (are) required:
    </p>

    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 0 auto 24px auto; font-family: Arial, sans-serif; max-width: 600px;">
        <tr>
            <td align="center">
                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f9f9f9; border-radius: 8px;">
                    <tr>
                        <td style="padding: 16px; width: 33%; vertical-align: top; text-align: center;">
                            <p style="margin: 0 0 8px 0; font-size: 14px; color: #666666; text-transform: uppercase; letter-spacing: 1px;">Invoice #</p>
                            <p style="margin: 0; font-size: 16px; color: #333333; font-weight: 600;">{{invoiceNumber}}</p>
                        </td>
                        <td style="padding: 16px; width: 33%; vertical-align: top; text-align: center;">
                            <p style="margin: 0 0 8px 0; font-size: 14px; color: #666666; text-transform: uppercase; letter-spacing: 1px;">Amount</p>
                            <p style="margin: 0; font-size: 16px; color: #333333; font-weight: 600;">{{formatValue totalAmount}}</p>
                        </td>
                        <td style="padding: 16px; width: 33%; vertical-align: top; text-align: center;">
                            <p style="margin: 0 0 8px 0; font-size: 14px; color: #666666; text-transform: uppercase; letter-spacing: 1px;">Due Date</p>
                            <p style="margin: 0; font-size: 16px; color: #333333; font-weight: 600;">{{formatDate dueDate}}</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

    <p style="margin: 0 0 16px 0; font-size: 1rem; line-height: 1.6;">
        If payment has already been made, please provide the payment date, the amount, and the
        payment delivery method.
    </p>

    <p style="margin: 0 0 16px 0; font-size: 1rem; line-height: 1.6;">
        If payment was made via check, please provide the address the check was mailed to.
    </p>

    <p style="margin: 0 0 16px 0; font-size: 1rem; line-height: 1.6;">
        If payment was made via ACH, please provide the date, the name of the bank, and account
        holder from which payment originated.
    </p>

    <p style="margin: 0 0 16px 0; font-size: 1rem; line-height: 1.6;">
        If payment has not been made, please provide an expected payment date for our records.
    </p>

    <p style="margin: 0 0 16px 0; font-size: 1rem; line-height: 1.6;">
        Thank you in advance for prompt attention to this inquiry.
    </p>

    <p style="margin: 0 0 16px 0; font-size: 1rem; line-height: 1.6;">
        Please let us know if anything additional is needed.
    </p>
      ${signOff}
`;

module.exports = {
  inspyrInitialMessage,
  inspyrTwoWeeksNewClient,
  inspyrTwoWeeksEstablishedClient,
  inspyrDueSoon,
  inspyrOverDue,
  inspyrWeeklyOverDue,
};
