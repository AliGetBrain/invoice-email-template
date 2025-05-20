const greeting = `
    <div style="margin-bottom: 40px; padding: 24px; background-color: white; border-radius: 8px; color: #4b5563; font-family: Arial, Helvetica, sans-serif;">
    <!-- Message Section -->
        <p style="margin: 0 0 16px 0; font-size: 1rem; font-weight: 500;">Hello{{#if contactName}} {{contactName}},{{else}},{{/if}}</p>
         `;

const signOff = `
        <p style="margin: 0; font-size: 1rem;">
            Best regards,<br>
            <span style="font-weight: 500;">{{ourCompanyName}} - Billing Team</span>
        </p>
    </div>
`;

const initialMessage = `
    ${greeting}
        <p style="margin: 0 0 16px 0; font-size: 1rem; line-height: 1.6;">
            I hope you're doing well! Please find attached <span style="font-weight: 600; color: #374151;">Invoice #{{invoiceNumber}}</span> for your records. <br>
            This invoice is due on <span style="font-weight: 600; color: #374151;">{{formatDate dueDate}}</span>. Let me know if you have any questions—we're happy to help.
        </p>
        
        <p style="margin: 0 0 16px 0; font-size: 1rem; line-height: 1.6;">
            Thank you for your business!
        </p>
    ${signOff}
`;

const fiveDaysOutMessage = `
    ${greeting}
    <p style="margin: 0 0 16px 0; font-size: 1rem; line-height: 1.6;">
        Just a friendly reminder that <span style="font-weight: 600; color: #374151;">Invoice #{{invoiceNumber}}</span> is due soon on <span style="font-weight: 600; color: #374151;">{{formatDate dueDate}}</span>. <br>
        Please let us know if you need any assistance or have any questions regarding the payment.
    </p>
   
    <p style="margin: 0 0 16px 0; font-size: 1rem; line-height: 1.6;">
        Thank you for your business!
    </p>
    ${signOff}
`;

const threeDaysOutMessage = `
    ${greeting}
    <p style="margin: 0 0 16px 0; font-size: 1rem; line-height: 1.6;">
        We wanted to follow up as <span style="font-weight: 600; color: #374151;">Invoice #{{invoiceNumber}}</span> is due in just a few business days on <span style="font-weight: 600; color: #374151;">{{formatDate dueDate}}</span>.
    </p>

    <p style="margin: 0 0 16px 0; font-size: 1rem; line-height: 1.6;">
        Please ensure payment is arranged by the due date to avoid any delays. Let us know if you need any assistance.
    </p>

    <p style="margin: 0 0 16px 0; font-size: 1rem; line-height: 1.6;">
        Thank you for your business!
    </p>
    ${signOff}
`;

const dueDayMessage = `
    ${greeting}
    <p style="margin: 0 0 16px 0; font-size: 1rem; line-height: 1.6;">
        This is a final reminder that <span style="font-weight: 600; color: #374151;">Invoice #{{invoiceNumber}}</span> is due today. Please process the payment at your earliest convenience. 
    </p>

    <p style="margin: 0 0 16px 0; font-size: 1rem; line-height: 1.6;">
         If the payment has already been made, kindly disregard this message.
    </p>
   
    <p style="margin: 0 0 16px 0; font-size: 1rem; line-height: 1.6;">
        Thank you for your business!
    </p>
    ${signOff}
`;
const recentlyOverdueMessage = `
    ${greeting}
    <p style="margin: 0 0 16px 0; font-size: 1rem; line-height: 1.6;">
        We wanted to follow up as <span style="font-weight: 600; color: #374151;">Invoice #{{invoiceNumber}}</span> was recently due on <span style="font-weight: 600; color: #374151;">{{formatDate dueDate}}</span> and appears to be outstanding.<br>
    </p>

    <p style="margin: 0 0 16px 0; font-size: 1rem; line-height: 1.6;">
        Please arrange payment as soon as possible to bring your account up to date. Let us know if there's anything we need to be aware of regarding this payment.
    </p>

    <p style="margin: 0 0 16px 0; font-size: 1rem; line-height: 1.6;">
        If the payment has already been made, kindly disregard this message.
    </p>
   
    <p style="margin: 0 0 16px 0; font-size: 1rem; line-height: 1.6;">
        Thank you for your business!
    </p>
    ${signOff}
`;

module.exports = {
  initialMessage,
  fiveDaysOutMessage,
  threeDaysOutMessage,
  dueDayMessage,
  recentlyOverdueMessage,
};
