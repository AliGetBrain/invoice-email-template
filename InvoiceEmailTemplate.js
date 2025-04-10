const { registerHelpers } = require("./HandleBarHelpers");
const {initialMessage, fiveDaysBeforeMessage, threeDaysBeforeMessage, dueDayMessage, recentlyOverdueMessage} = require("./OutReachMessages")
const Handlebars = require("handlebars");
const fs = require("fs");

// activate all helper functions 
registerHelpers();

invoice = `<!DOCTYPE html>
<html lang="en">
<head> 
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice Template</title>
</head>
<body style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #1f2937; max-width: 800px; margin: 0 auto; padding: 40px 20px; background-color: #f9fafb;">
    {{#if (equals outReachMessage 'initialMessage') }}
      ${initialMessage}
    {{/if}}

    {{#if (equals outReachMessage 'fiveDaysBeforeMessage') }}
      ${fiveDaysBeforeMessage}
    {{/if}}

    {{#if (equals outReachMessage 'threeDaysBeforeMessage') }}
      ${threeDaysBeforeMessage}
    {{/if}}

    {{#if (equals outReachMessage 'dueDayMessage') }}
      ${dueDayMessage}
    {{/if}}

     {{#if (equals outReachMessage 'recentlyOverdueMessage') }}
      ${recentlyOverdueMessage}
    {{/if}}

    <div style="background: white; border-radius: 12px; padding: 40px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); position: relative; overflow: hidden;">
        <!-- Company Info -->
        <div style="display: flex; justify-content: space-between; margin-bottom: 40px;">
            <div style="font-size: 0.95rem; color: #4b5563;">
                {{#if companyName}}<div style="font-weight: 600; color: #374151;">{{companyName}}</div>{{/if}}
                {{#if companyAddress.streetAddress}}<div>{{companyAddress.streetAddress}}</div>{{/if}}
                {{#if (and companyAddress.city companyAddress.state)}}<div>{{companyAddress.city}}, {{companyAddress.state}} {{#if companyAddress.zipCode}}{{companyAddress.zipCode}}{{/if}}</div>{{/if}}
                {{#if companyEmailAddress}}<div>{{companyEmailAddress}}</div>{{/if}}
            </div>

          <!-- SVG Container - Add this section -->
         {{#if companyLogo}}
          <div style="width: 200px; text-align: right;">
              {{{companyLogo}}}
          </div>
          {{/if}}
        </div>

        <!-- Invoice Title -->
        <div style="color: {{primaryColor}}; font-size: 40px; font-weight: 700; margin: 0 0 40px 0; letter-spacing: -0.5px; position: relative; display: inline-block; padding-bottom: 10px; border-bottom: 3px solid {{primaryColor}};">
            INVOICE
        </div>

        <!-- Billing Info -->
        <table cellpadding="0" cellspacing="0" style="width: 100%; margin-bottom: 20px;">
            <tr>
                <td style="width: 33%; vertical-align: top;">
                    <div style="font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-bottom: 12px; font-weight: 600;">BILL TO</div>
                    {{#if contactName}}<div style="font-weight: 600; color: #374151;">{{contactName}}</div>{{/if}}
                    {{#if contactCompnayName}} {{#if (notEquals contactCompnayName contactName)}}<div>{{contactCompnayName}}</div>{{/if}} {{/if}}
                    {{#if contactBillAddr.streetAddress}}<div>{{contactBillAddr.streetAddress}}</div>{{/if}}
                    {{#if (and contactBillAddr.city contactBillAddr.state)}}<div>{{contactBillAddr.city}}, {{contactBillAddr.state}} {{#if contactBillAddr.zipCode}}{{contactBillAddr.zipCode}}{{/if}}</div>{{/if}}
                </td>
                {{#if contactShipAddr}}
                  <td style="width: 33%; vertical-align: top;">
                      <div style="font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-bottom: 12px; font-weight: 600;">SHIP TO</div>
                      {{#if contactShipAddr.city}}
                        {{#if contactName}}<div style="font-weight: 600; color: #374151;">{{contactName}}</div>{{/if}}
                        {{#if contactCompanyName}} {{#if (notEquals contactCompanyName contactName)}}<div>{{contactCompanyName}}</div>{{/if}} {{/if}}
                        {{#if contactShipAddr.streetAddress}}<div>{{contactShipAddr.streetAddress}}</div>{{/if}}
                        {{#if (and contactShipAddr.city contactShipAddr.state)}}<div>{{contactShipAddr.city}}, {{contactShipAddr.state}} {{#if contactShipAddr.zipCode}}{{contactShipAddr.zipCode}}{{/if}}</div>{{/if}}
                        {{/if}}
                  </td>
                {{/if}}
                <td style="width: 33%; vertical-align: top; text-align: right;">
                    {{#if invoiceNumber}}<div><span style="font-weight: 600; color: #374151;">INVOICE #</span> {{invoiceNumber}}</div>{{/if}}
                    {{#if transactionDate}}<div><span style="font-weight: 600; color: #374151;">DATE</span> {{formatDate transactionDate}}</div>{{/if}}
                    {{#if dueDate}}<div><span style="font-weight: 600; color: #374151;">DUE DATE</span> {{formatDate dueDate}}</div>{{/if}}
                    {{#if salesTerm}}<div><span style="font-weight: 600; color: #374151;">TERMS</span> {{salesTerm}}</div>{{/if}}
                </td>
            </tr>
        </table>

        <!-- Shipping Fields -->
        {{#if (tripleOr shipDate shipMethod trackingNumber)}}
        <table cellpadding="0" cellspacing="0" style="width: 100%; margin-bottom: 40px;">
            <tr>
                <td style="border-top: 1px solid #E5E7EB; padding-top: 16px;">
                    <table cellpadding="0" cellspacing="0" style="width: 100%;">
                        <tr>
                          <td style="vertical-align: top;">
                              <div style="font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-bottom: 12px; font-weight: 600;">SHIP DATE</div>
                              {{#if shipDate }}<div style="color: #374151;">{{formatDate shipDate}}</div> {{else}} N/A {{/if}}
                          </td>
                            <td style="vertical-align: top;">
                              <div style="font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-bottom: 12px; font-weight: 600;">SHIP VIA</div>
                               {{#if shipMethod }} <div style="color: #374151;">{{shipMethod}}</div> {{else}} N/A  {{/if}}
                          </td>
                          <td style="vertical-align: top;">
                              <div style="font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-bottom: 12px; font-weight: 600;">TRACKING NO.</div>
                               {{#if trackingNumber }} <div style="color: #374151;">{{trackingNumber}}</div> {{else}} N/A  {{/if}}
                          </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        {{/if}}

        <!-- Custom Fields -->
        {{#if customFields}}
        <table cellpadding="0" cellspacing="0" style="width: 100%; margin-bottom: 20px;">
            <tr>
                <td style="border-top: 1px solid #E5E7EB; padding-top: 16px;">
                    <table cellpadding="0" cellspacing="0" style="width: 100%;">
                        <tr>
                            {{#each customFields}}
                            {{#if fieldName}}
                              <td style="vertical-align: top;">
                                  <div style="font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-bottom: 12px; font-weight: 600;">{{fieldName}}</div>
                                  <div style="color: #374151;">{{value}}</div>
                              </td>
                              {{/if}}
                            {{/each}}
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        {{/if}}



        <!-- Invoice Table -->
        {{#if lineItems}}
          <table cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: separate; margin: 20px 0;">
            <thead>
              <tr>
                {{#each lineItems}}
                {{#if serviceDate}}
                <th style="background-color: {{primaryColor}}; padding: 12px 16px; text-align: left; font-size: 0.875rem; font-weight: 600; color: white; text-transform: uppercase; letter-spacing: 0.05em;">DATE</th>{{/if}}
                {{/each}}
                <th style="background-color: {{primaryColor}}; padding: 12px 16px; text-align: left; font-size: 0.875rem; font-weight: 600; color: white; text-transform: uppercase; letter-spacing: 0.05em;">PRODUCT/SERVICE</th>
                <th style="background-color: {{primaryColor}}; padding: 12px 16px; text-align: left; font-size: 0.875rem; font-weight: 600; color: white; text-transform: uppercase; letter-spacing: 0.05em;">DESCRIPTION</th>
                <th style="background-color: {{primaryColor}}; padding: 12px 16px; text-align: center; font-size: 0.875rem; font-weight: 600; color: white; text-transform: uppercase; letter-spacing: 0.05em;">QTY</th>
                <th style="background-color: {{primaryColor}}; padding: 12px 16px; text-align: right; font-size: 0.875rem; font-weight: 600; color: white; text-transform: uppercase; letter-spacing: 0.05em;">RATE</th>
                <th style="background-color: {{primaryColor}}; padding: 12px 16px; text-align: right; font-size: 0.875rem; font-weight: 600; color: white; text-transform: uppercase; letter-spacing: 0.05em;">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {{#each lineItems}}
                    <tr>
                      {{#if serviceDate}} <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #4b5563;">{{formatDate serviceDate}}</td> {{/if}}
                      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #4b5563;">{{service}}</td>
                      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #4b5563;">{{description}}</td>
                      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #4b5563; text-align: center;">{{qty}}</td>
                      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #4b5563; text-align: right;">{{format rate}}</td>
                      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #4b5563; text-align: right;">{{format amount}}</td>
                    </tr>
              {{/each}}
            </tbody>
          </table>
        {{/if}}

        <!-- Totals Section -->
        <table cellpadding="0" cellspacing="0" style="width: 100%; margin-top: 30px;">
            <tr>
                <td style="width: 50%; vertical-align: top;">
                    {{#if customInvoiceMessage}} <div style="color: #6b7280; font-size: 0.95rem; text-align: left; max-width: 300px;">
                        {{customInvoiceMessage}}
                    </div> {{/if}}
                </td>
            
                <td style="width: 50%; vertical-align: top;">
                    <table cellpadding="0" cellspacing="0" style="width: 100%; margin-left: auto;">
                      {{#if (greaterThan lineItems.length 2)}}
                          {{#if subTotal}}
                            <tr>
                                <td style="padding: 8px 0; font-size: 0.95rem;">SUBTOTAL</td>
                                <td style="padding: 8px 0; font-size: 0.95rem; text-align: right;">{{format subTotal}}</td>
                            </tr>
                          {{/if}}
                      {{/if}}

                      {{#if discounts}}
                        <tr>
                            <td style="padding: 8px 0; font-size: 0.95rem;">DISCOUNTS </td>
                            <td style="padding: 8px 0; font-size: 0.95rem; text-align: right;">- {{format discounts}}</td>
                        </tr>
                      {{/if}}
                        {{#if totalTax}}<tr>
                            <td style="padding: 8px 0; font-size: 0.95rem;">TAX </td>
                            <td style="padding: 8px 0; font-size: 0.95rem; text-align: right;">{{format totalTax}}</td>
                        </tr>
                      {{/if}}
                        
                      {{#if shippingAmount}}
                        <tr>
                            <td style="padding: 8px 0; font-size: 0.95rem;">SHIPPING</td>
                            <td style="padding: 8px 0; font-size: 0.95rem; text-align: right;">{{format shippingAmount}}</td>
                        </tr>
                      {{/if}}
                  
                      {{#if totalAmount}}
                        <tr>
                            <td style="padding: 8px 0; font-size: 0.95rem;">TOTAL</td>
                            <td style="padding: 8px 0; font-size: 0.95rem; text-align: right;">{{format totalAmount}}</td>
                        </tr>    
                      {{/if}}  
                      {{#if previousPayments}}      
                        <tr>
                            <td style="padding: 8px 0; font-size: 0.95rem;">PAYMENTS</td>
                            <td style="padding: 8px 0; font-size: 0.95rem; text-align: right;">- {{format previousPayments}}</td>
                        </tr> 
                      {{/if}}  
                       {{#if balanceDue}}   
                      <tr>
                          <td colspan="2" style="padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 1.25rem; font-weight: 700; color: {{primaryColor}}; text-align: right;">
                              BALANCE DUE {{format balanceDue}}
                          </td>
                      </tr>
                      {{/if}}
                      <!-- need to add a conditon for this -->
                         <tr>
                            <td colspan="2" style="padding-top: 10px; font-size: 1.25rem; font-weight: 700; color: #FF0000; text-align: right;">
                                OVERDUE {{formatDate transactionDate}}
                            </td>
                        </tr>
                    </table> 
                </td>
            </tr>
        </table>

        <!-- Buttons -->
        {{#if (and invoicePaymentLink pdfButton)}}
        <!-- Click Here To Pay Button and PDF Download Button -->
        <div style="margin:0; padding:0;">
          <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
            <tr>
              <td height="60" style="line-height: 60px; font-size: 60px;">&nbsp;</td>
            </tr>
          </table>
          <table style="border-collapse: collapse; margin: 0 auto;">
            <tr>
              <!-- Pay Button -->
              <td style="padding: 0 8px; text-align: right;">
                <a href="{{invoicePaymentLink}}" target="_blank" style="background-color: {{primaryColor}}; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 30px; font-weight: 600; font-family: Arial, sans-serif; font-size: 14px; display: inline-block;">
                  Click Here To Pay
                </a>
              </td>
              <td style="padding: 0 8px; font-weight: 500; font-family: Arial, sans-serif; font-size: 14px; color: #333333; text-transform: uppercase;">
                OR
              </td>
              <!-- PDF Button -->
              <td style="padding: 0 8px; text-align: left;">
                <a href="http://localhost:5678" target="_blank" style="background-color: {{primaryColor}}; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 30px; font-weight: 600; font-family: Arial, sans-serif; font-size: 14px; display: inline-block;">
                  Download PDF
                </a>
              </td>
            </tr>
          </table>
        </div>
        {{else}}
        <!-- Just PDF Download Button -->
          {{#if pdfButton}}
          <div style="text-align: center; margin-top: 40px; padding-top: 20px;">
              <a href="http://localhost:5678" target="_blank" style="display: inline-block; background-color: {{primaryColor}}; color: white; padding: 12px 24px; text-decoration: none; border-radius: 30px; font-weight: 600;">
                  Download PDF
              </a>
          </div>
          {{/if}}
        {{/if}}
    </div>
</body>
</html>`;
 

const data = {
  outReachMessage: 'initialMessage',
  invoiceNumber: 1007,
  transactionDate: "2024-12-24",
  dueDate: "2025-01-23",
  contactCompanyName: "John Melton",
  contactName: "John Melton",
  contactEmail: "John@Melton.com",
  contactBillAddr: {
    streetAddress: "Fake Street 123",
    city: "Fake City",
    state: "CA",
    zipCode: "12345"
  },
  customerShipAddr: {
    streetAddress: "Fake Street 123",
    city: "Fake City",
    state: "CA",
    zipCode: "12345"
  },
  shipDate: "2025-4-15",
  shipMethod: "Plane",
  trackingNumber: 444,
  salesTerm: "Net 30",
  lineItems: [
    {
      service: "Item 3",
      serviceDate: "",
      description: "Some Description Here" ,
      qty: "1",
      rate: "50",
      amount: "50" 
    },
    {
      service: "Item 2",
      serviceDate: "",
      description: "Some Description Here" ,
      qty: "1",
      rate: "35",
      amount: "35"
    },
    {
      service: "Item 3",
      serviceDate: "",
      description: "Some Description Here" ,
      qty: "2",
      rate: "50",
      amount: "100",
    },
  ],
  subTotal: 185,
  discounts: 10,
  totalAmount: 175,
  shippingAmount:10,
  previousPayments: 20,
  balanceDue: 165,
  customInvoiceMessage: "Thank you for your business and have a great day! ",
  companyName: "Our Company",
  companyAddress: {
    streetAddress: "Super Fake Street 123",
    city: "Fake City",
    state: "TX",
    zipCode: "12345"
  },
  companyEmailAddress: "fakemail@example.com",
  customFields: [
    {
      fieldName: "Custom Field",
      value: "this is a custom value"
    },
    {
      fieldName: "Custom Field 2",
      value: "this is a custom value 2"
    },
  ],
  invoicePaymentLink: 'localhost:5678',
  pdfButton: true,
  companyLogo: "",
  primaryColor: '#0000FF',
};


const template = Handlebars.compile(invoice);

function generateAndSaveHTML() {
  const html = template(data);
  fs.writeFileSync("invoice_template.html", html);
  console.log("HTML updated");
}

// Watch for changes
fs.watch("./", (eventType, filename) => {
  if (filename.endsWith(".js") || filename.endsWith(".hbs")) {
    generateAndSaveHTML();
  }
});

// Initial generation
// generateAndSaveHTML();
