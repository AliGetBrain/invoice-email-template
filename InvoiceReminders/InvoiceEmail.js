const { registerHelpers } = require("../HandleBarHelpers");
const {
  initialMessage,
  fiveDaysOutMessage,
  threeDaysOutMessage,
  dueDayMessage,
  recentlyOverdueMessage,
} = require("./extras/OutReachMessages");
const {
  inspyrInitialMessage,
  inspyrTwoWeeksNewClient,
  inspyrTwoWeeksEstablishedClient,
  inspyrDueSoon,
  inspyrOverDue,
  inspyrWeeklyOverDue,
  inspyr60DaysOverDue,
} = require("./extras/InspyrOutReachMessages");
const Handlebars = require("handlebars");
const fs = require("node:fs");
const path = require("node:path");
const chokidar = require("chokidar");

// activate all helper functions
registerHelpers();

const subject = `
    {{#if (equals outReachMessage 'inspyrInitialMessage') }}
      Invoice #{{invoiceNumber}}- Client:{{contactCompanyName}}
    {{/if}}

     {{#if (equals outReachMessage 'inspyrTwoWeeksNewClient') }}
       Invoice #{{invoiceNumber}}- Client:{{contactCompanyName}}, Follow Up
    {{/if}}

     {{#if (equals outReachMessage 'inspyrTwoWeeksEstablishedClient') }}
       Invoice #{{invoiceNumber}}- Client:{{contactCompanyName}}, Follow Up
    {{/if}}

    {{#if (equals outReachMessage 'inspyrDueSoon') }}
      Invoice #{{invoiceNumber}}- Client:{{contactCompanyName}}, Due Soon
    {{/if}}

     {{#if (equals outReachMessage 'inspyrOverDue') }}
       Invoice #{{invoiceNumber}}- Client:{{contactCompanyName}}, Past Due
    {{/if}}

    {{#if (equals outReachMessage 'inspyrWeeklyOverDue') }}
       Invoice #{{invoiceNumber}}- Client:{{contactCompanyName}}, Past Due
    {{/if}}

     {{#if (equals outReachMessage 'inspyr60DaysOverDue') }}
       Invoice #{{invoiceNumber}}- Client:{{contactCompanyName}}, 60 Days Past Due
    {{/if}}
  `;

const emailMessage = `<!DOCTYPE html>
<html lang="en">
<head> 
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice Outreach</title>
</head>
<body style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #1f2937; max-width: 800px; margin: 0 auto; padding: 40px 20px; background-color: #f9fafb;">
    
    {{#if (equals outReachMessage 'initialMessage') }}
      ${initialMessage}
    {{/if}}

    {{#if (equals outReachMessage 'fiveDaysBeforeMessage') }}
      ${fiveDaysOutMessage}
    {{/if}}

    {{#if (equals outReachMessage 'threeDaysBeforeMessage') }}
      ${threeDaysOutMessage}
    {{/if}}

    {{#if (equals outReachMessage 'dueDayMessage') }}
      ${dueDayMessage}
    {{/if}}

     {{#if (equals outReachMessage 'recentlyOverdueMessage') }}
      ${recentlyOverdueMessage}
    {{/if}}

    {{#if (equals outReachMessage 'inspyrInitialMessage') }}
      ${inspyrInitialMessage}
    {{/if}}

     {{#if (equals outReachMessage 'inspyrTwoWeeksNewClient') }}
      ${inspyrTwoWeeksNewClient}
    {{/if}}

     {{#if (equals outReachMessage 'inspyrTwoWeeksEstablishedClient') }}
      ${inspyrTwoWeeksEstablishedClient}
    {{/if}}

    {{#if (equals outReachMessage 'inspyrDueSoon') }}
      ${inspyrDueSoon}
    {{/if}}

     {{#if (equals outReachMessage 'inspyrOverDue') }}
      ${inspyrOverDue}
    {{/if}}

    {{#if (equals outReachMessage 'inspyrWeeklyOverDue') }}
      ${inspyrWeeklyOverDue}
    {{/if}}

     {{#if (equals outReachMessage 'inspyr60DaysOverDue') }}
      ${inspyr60DaysOverDue}
    {{/if}}

    <div style="background: white; border-radius: 12px; padding: 40px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); position: relative; overflow: hidden;">
       <!-- Company Info -->
        <div style="display: flex; justify-content: space-between; margin-bottom: 40px;">
            <div>
                <div style="font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-bottom: 12px; font-weight: 600;">REMIT TO</div>
                {{#if ourCompanyName}}<div style="font-weight: 600; color: #374151;">{{ourCompanyName}}</div>{{/if}}
                {{#if ourCompanyAddr.streetAddress}}<div>{{ourCompanyAddr.streetAddress}}</div>{{/if}}
                {{#if (and ourCompanyAddr.city ourCompanyAddr.state)}}<div>{{ourCompanyAddr.city}}, {{ourCompanyAddr.state}} {{#if ourCompanyAddr.zipCode}}{{ourCompanyAddr.zipCode}}{{/if}}</div>{{/if}}
                {{#if ourCompanyEmail}}<div>{{ourCompanyEmail}}</div>{{/if}}
            </div>

          <!-- SVG Container - Add this section -->
         {{#if ourCompanyLogo}}
          <div style="width: 200px; text-align: right;">
              {{{ourCompanyLogo}}}
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
                <td style="width: 33%;">
                    <div style="font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-bottom: 12px; font-weight: 600;">BILL TO</div>
                    {{#if contactName}}<div style="font-weight: 600; color: #374151;">{{contactName}}</div>{{/if}}
                    {{#if contactCompanyName}} {{#if (notEquals contactCompanyName contactName)}}<div>{{contactCompanyName}}</div>{{/if}} {{/if}}
                    {{#if contactBillAddr.streetAddress}}<div>{{contactBillAddr.streetAddress}}</div>{{/if}}
                    {{#if (and contactBillAddr.city contactBillAddr.state)}}<div>{{contactBillAddr.city}}, {{contactBillAddr.state}} {{#if contactBillAddr.zipCode}}{{contactBillAddr.zipCode}}{{/if}}</div>{{/if}}
                </td>
                {{#if contactShipAddr}}
                  <td style="width: 33%;">
                      <div style="font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-bottom: 12px; font-weight: 600;">SHIP TO</div>
                      {{#if contactShipAddr.city}}
                        {{#if contactName}}<div style="font-weight: 600; color: #374151;">{{contactName}}</div>{{/if}}
                        {{#if contactCompanyName}} {{#if (notEquals contactCompanyName contactName)}}<div>{{contactCompanyName}}</div>{{/if}} {{/if}}
                        {{#if contactShipAddr.streetAddress}}<div>{{contactShipAddr.streetAddress}}</div>{{/if}}
                        {{#if (and contactShipAddr.city contactShipAddr.state)}}<div>{{contactShipAddr.city}}, {{contactShipAddr.state}} {{#if contactShipAddr.zipCode}}{{contactShipAddr.zipCode}}{{/if}}</div>{{/if}}
                        {{/if}}
                  </td>
                  {{else}}
                  <td style="width: 33%;"></td>
                {{/if}} 
                <td style="width: 33%; text-align: left; padding-left: 45px;">
                    {{#if customerNumber}}<div><span style="font-weight: 600; color: #374151; font-size: 0.8rem;">CUSTOMER</span> #{{customerNumber}}</div>{{/if}}
                    {{#if invoiceNumber}}<div><span style="font-weight: 600; color: #374151; font-size: 0.8rem;">INVOICE</span> #{{invoiceNumber}}</div>{{/if}}
                    {{#if transactionDate}}<div><span style="font-weight: 600; color: #374151; font-size: 0.8rem;">DATE-</span> {{formatDate transactionDate}}</div>{{/if}}
                    {{#if dueDate}}<div><span style="font-weight: 600; color: #374151; font-size: 0.8rem;">DUE DATE-</span> {{formatDate dueDate}}</div>{{/if}}
                    {{#if salesTerm}}<div><span style="font-weight: 600; color: #374151; font-size: 0.8rem;">TERMS-</span> {{salesTerm}}</div>{{/if}}
                </td>
            </tr>
        </table>

        <!-- Shipping Fields -->
        {{#if (tripleOr shippingInfo.shipDate shippingInfo.shipMethod shippingInfo.trackingNumber)}}
        <table cellpadding="0" cellspacing="0" style="width: 100%; margin-bottom: 40px;">
            <tr>
                <td style="border-top: 1px solid #E5E7EB; padding-top: 16px;">
                    <table cellpadding="0" cellspacing="0" style="width: 100%;">
                        <tr>
                          <td style="vertical-align: top;">
                              <div style="font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-bottom: 12px; font-weight: 600;">SHIP DATE</div>
                              {{#if shippingInfo.shipDate }}<div style="color: #374151;">{{formatDate shippingInfo.shipDate}}</div> {{else}} N/A {{/if}}
                          </td>
                            <td style="vertical-align: top;">
                              <div style="font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-bottom: 12px; font-weight: 600;">SHIP VIA</div>
                               {{#if shippingInfo.shipMethod }} <div style="color: #374151;">{{shippingInfo.shipMethod}}</div> {{else}} N/A  {{/if}}
                          </td>
                          <td style="vertical-align: top;">
                              <div style="font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-bottom: 12px; font-weight: 600;">TRACKING NO.</div>
                               {{#if shippingInfo.trackingNumber }} <div style="color: #374151;">{{shippingInfo.trackingNumber}}</div> {{else}} N/A  {{/if}}
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
          {{#if (hasServiceDate lineItems)}}
            <table cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: separate; margin: 25px 0;">
              <thead>
                <tr>
                  <th style="background-color: {{primaryColor}}; padding: 12px 24px; text-align: left; font-size: 0.875rem; font-weight: 600; color: white; text-transform: uppercase; letter-spacing: 0.05em; width: 10%;">DATE</th>
                  <th style="background-color: {{primaryColor}}; padding: 12px 16px; text-align: left; font-size: 0.875rem; font-weight: 600; color: white; text-transform: uppercase; letter-spacing: 0.05em; width: 20%;">SERVICE</th>
                  <th style="background-color: {{primaryColor}}; padding: 12px 4px; text-align: left; font-size: 0.875rem; font-weight: 600; color: white; text-transform: uppercase; letter-spacing: 0.05em; width: 42%;">DESCRIPTION</th>
                  <th style="background-color: {{primaryColor}}; padding: 12px 16px; text-align: center; font-size: 0.875rem; font-weight: 600; color: white; text-transform: uppercase; letter-spacing: 0.05em; width: 8%;">QTY</th>
                  <th style="background-color: {{primaryColor}}; padding: 12px 16px; text-align: center; font-size: 0.875rem; font-weight: 600; color: white; text-transform: uppercase; letter-spacing: 0.05em; width: 8%;">RATE</th>
                  <th style="background-color: {{primaryColor}}; padding: 12px 16px; text-align: center; font-size: 0.875rem; font-weight: 600; color: white; text-transform: uppercase; letter-spacing: 0.05em; width: 12%;">AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {{#each lineItems}}
                  <tr>
                    <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #4b5563; font-size: 0.875rem;">{{#if serviceDate}}{{formatDate serviceDate}}{{else}}&nbsp;{{/if}}</td>
                    <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #4b5563; font-size: 0.875rem;">{{service}}</td>
                    <td style="border-bottom: 1px solid #e5e7eb; color: #4b5563; font-size: 0.875rem;">{{description}}</td>
                    <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #4b5563; font-size: 0.875rem; text-align: center;">{{quantity}}</td>
                    <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #4b5563; font-size: 0.875rem; text-align: center;">{{formatValue rate}}</td>
                    <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #4b5563; font-size: 0.875rem; text-align: center;">{{formatValue amount}}</td>
                  </tr>
                {{/each}}
              </tbody>
            </table>
          {{else}}
            <table cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: separate; margin: 30px 0;">
              <thead>
                <tr>
              <th style="background-color: {{primaryColor}}; padding: 12px 20px; text-align: left; font-size: 0.875rem; font-weight: 600; color: white; text-transform: uppercase; letter-spacing: 0.05em; width: 20%;">SERVICE</th>
              <th style="background-color: {{primaryColor}}; padding: 12px 4px; text-align: left; font-size: 0.875rem; font-weight: 600; color: white; text-transform: uppercase; letter-spacing: 0.05em; width: 45%;">DESCRIPTION</th>
              <th style="background-color: {{primaryColor}}; padding: 12px 1px; text-align: center; font-size: 0.875rem; font-weight: 600; color: white; text-transform: uppercase; letter-spacing: 0.05em; width: 8%;">QTY</th>
              <th style="background-color: {{primaryColor}}; padding: 12px 16px; text-align: center; font-size: 0.875rem; font-weight: 600; color: white; text-transform: uppercase; letter-spacing: 0.05em; width: 12%;">RATE</th>
              <th style="background-color: {{primaryColor}}; padding: 12px 16px; text-align: center; font-size: 0.875rem; font-weight: 600; color: white; text-transform: uppercase; letter-spacing: 0.05em; width: 15%;">AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {{#each lineItems}}
                  <tr>
                    <td style="padding: 16px;border-bottom: 1px solid #e5e7eb; color: #4b5563; text-align: left; width: 20%; font-size: 0.875rem;">{{service}}</td>
                    <td style="border-bottom: 1px solid #e5e7eb; color: #4b5563; text-align: left; width: 45%; font-size: 0.875rem;">{{description}}</td>
                    <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #4b5563; text-align: center; width: 8%; font-size: 0.875rem;">{{quantity}}</td>
                    <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #4b5563; text-align: center; width: 12%; font-size: 0.875rem;">{{formatValue rate}}</td>
                    <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #4b5563; text-align: center; width: 15%; font-size: 0.875rem;">{{formatValue amount}}</td>
                  </tr>
                {{/each}}
              </tbody>
            </table>
          {{/if}}
        {{/if}}

        <!-- Totals Section -->
        <table cellpadding="0" cellspacing="0" style="width: 100%; margin-top: 30px;">
            <tr>
                <td style="width: 50%; vertical-align: top;">
                 <table cellpadding="0" cellspacing="0" style="width: 100%;">
                    <tr>
                        <td style="width: 50%; vertical-align: top;">
                            <table cellpadding="0" cellspacing="0"">
                                {{#if customMessage}}
                                <tr>
                                    <td style="color: #6b7280; font-size: 0.85rem; text-align: left; padding-bottom: 20px;">
                                        {{customMessage}}
                                    </td>
                                </tr>
                                {{/if}}
                                {{#if fixedCompanyMessage}}
                                <tr>
                                    <td style="border: 2px solid {{primaryColor}}; border-radius: 8px; padding: 25px; color: #4b5563; font-size: 0.85rem; text-align: left; line-height: 1.8;">
                                        {{{fixedCompanyMessage}}}
                                    </td>
                                </tr>
                                {{/if}}
                            </table>
                        </td>
                    </tr>
                </table>
              </td>
            
                <td style="width: 50%; vertical-align: top;">
                    <table cellpadding="0" cellspacing="0" style="width: 80%; margin-left: auto;">
                      {{#if (greaterThan lineItems.length 1)}}
                          {{#if subTotal}}
                            <tr>
                                <td style=" padding: 8px 0; font-size: 0.95rem;">SUBTOTAL</td>
                                <td style="padding: 8px 20px 8px 0; font-size: 0.95rem; text-align: right;">{{formatValue subTotal}}</td>
                            </tr>
                          {{/if}}
                      {{/if}}

                      {{#if discounts}}
                        <tr>
                            <td style=" padding: 8px 0px; font-size: 0.95rem;">DISCOUNTS </td>
                            <td style="padding: 8px 20px 8px 0; font-size: 0.95rem; text-align: right;">- {{formatValue discounts}}</td>
                        </tr>
                      {{/if}}
                        {{#if totalTax}}<tr>
                            <td style="padding: 8px 0; font-size: 0.95rem;">TAX </td>
                            <td style="padding: 8px 20px 8px 0; font-size: 0.95rem; text-align: right;">{{formatValue totalTax}}</td>
                        </tr>
                      {{/if}}
                        
                      {{#if shippingAmount}}
                        <tr>
                            <td style="padding: 8px 0; font-size: 0.95rem;">SHIPPING</td>
                            <td style="padding: 8px 20px 8px 0; font-size: 0.95rem; text-align: right;">{{formatValue shippingAmount}}</td>
                        </tr>
                      {{/if}}
                  
                      {{#if totalAmount}}
                        <tr>
                            <td style="padding: 8px 0; font-size: 0.95rem;">TOTAL</td>
                            <td style="padding: 8px 20px 8px 0; font-size: 0.95rem; text-align: right;">{{formatValue totalAmount}}</td>
                        </tr>    
                      {{/if}}  
                      {{#if amountPaid}}      
                        <tr>
                            <td style="padding: 8px 0; font-size: 0.95rem;">PAYMENTS</td>
                            <td style="padding: 8px 20px 8px 0; font-size: 0.95rem; text-align: right;">- {{formatValue amountPaid}}</td>
                        </tr> 
                      {{/if}}  
                       {{#if balanceDue}}   
                      <tr>
                          <td colspan="2" style="padding: 20px 10px 0px 0; border-top: 1px solid #e5e7eb; font-size: 1.2rem; font-weight: 700; color: {{primaryColor}}; text-align: right;">
                              BALANCE DUE {{formatValue balanceDue}}
                          </td>
                      </tr>
                      {{/if}}
                      {{#if (checkOverDue dueDate) }}
                         <tr>
                            <td colspan="2" style="padding: 10px 10px 0px 0; font-size: 1.2rem; font-weight: 700; color: #e74c3c; text-align: right;">
                                OVERDUE {{formatDate dueDate}}
                            </td>
                        </tr>
                      {{/if}}
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
                <a href="{{pdfButtonLink}}" target="_blank" style="background-color: {{primaryColor}}; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 30px; font-weight: 600; font-family: Arial, sans-serif; font-size: 14px; display: inline-block;">
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
              <a href="{{pdfButtonLink}}" target="_blank" style="display: inline-block; background-color: {{primaryColor}}; color: white; padding: 12px 24px; text-decoration: none; border-radius: 30px; font-weight: 600;">
                  Download PDF
              </a>
          </div>
          {{/if}}
        {{/if}}
        
        {{#if (and (notEquals outReachMessage 'inspyrInitialMessage') (notEquals outReachMessage 'inspyr60DaysOverDue')) }}
        <!-- Automated message -->
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-family: Arial, Helvetica, sans-serif; font-size: 0.8rem; color: #6b7280; line-height: 1.4; text-align: center;">
          <p style="margin: 0;">
              <strong style="color: #4b5563;">For questions, comments, or concerns contact your AR Specialist at <span style="color: #2563eb;">{{collectorEmail}}</span>.</strong>
          </p>
          <p style="margin: 8px 0 0 0;">
              Search "<span style="font-style: italic;">Invoice #{{invoiceNumber}}- Client: {{contactCompanyName}}</span>" in your inbox to find the original invoice sent.
          </p>
      </div>
      {{/if}}
    </div>
</body>
</html>`;

const data = {
  outReachMessage: "inspyr60DaysOverDue",
  invoiceNumber: 1049438,
  transactionDate: "2024-04-20",
  dueDate: "2025-05-20",
  customerNumber: 2189153,
  collector: "Rachel Gonzalez",
  collectorEmail: "rgonzalez@inspyrsolutions.com",
  contactCompanyName: "Southern Ionics",
  contactName: "Kealy Baxter",
  contactEmail: "",
  contactBillAddr: {
    streetAddress: "P.O. Drawer 1217",
    city: "West Point",
    state: "MS",
    zipCode: "39773",
  },
  shippingInfo: {
    shipDate: "",
    shipMethod: "",
    trackingNumber: 0,
  },
  salesTerm: "Net 30",
  lineItems: [
    {
      service: "Invoice 1 of 2 ",
      serviceDate: "2025-04-12",
      description:
        "Southern Ionics Incorporated - INSPYR-2024-12-30-11 - Fidelity_401K Import",
      quantity: "1",
      rate: "1800",
      amount: "1800",
    },
  ],
  subTotal: 1880,
  discounts: 0,
  totalAmount: 1880,
  shippingAmount: 0,
  amountPaid: 0,
  balanceDue: 1880,
  customMessage: "Thank you for your business and have a great day!",
  ourCompanyName: "INSPYR Solutions, LLC",
  ourCompanyAddr: {
    streetAddress: "P.O. Box 737249",
    city: "Dallas",
    state: "TX",
    zipCode: "75373-7249",
  },
  ourCompanyEmail: "",
  customFields: [],
  fixedCompanyMessage:
    '<div style="font-weight: 600; margin-bottom: 12px; font-size: 0.875rem;">ACH DELIVERY INSTRUCTIONS:</div><div>Beneficiary Bank: JP Morgan Chase</div><div>ABA Routing Number: 267084131</div><div>Account Name: INSPYR Solutions, LLC</div><div>Account Number: 909331909</div><div>Remittance: cashposting@INSPYRSolutions.com</div><div style="margin-top: 12px; font-style: italic;">Please include your invoice number with your payment.</div>',
  invoicePaymentLink: "",
  pdfButton: false,
  pdfButtonLink: "",
  ourCompanyLogo: "",
  primaryColor: "#0277BD",
};

// custom fields look like this
// customFields: [
//   {
//     fieldName: "Custom Field",
//     value: "this is a custom value",
//   },
//   {
//     fieldName: "Custom Field 2",
//     value: "this is a custom value 3",
//   },
// ],

const template = Handlebars.compile(emailMessage);
const subjectTemplate = Handlebars.compile(subject);

function generateAndSaveHTML() {
  try {
    console.log("Generating HTML");
    const html = template(data);
    console.log("Subject:", subjectTemplate(data));
    const outputFile = path.join(__dirname, "invoice.html");
    fs.writeFileSync(outputFile, html);
    console.log(`HTML generated successfully at: ${outputFile}`);
  } catch (error) {
    console.error("Error generating HTML:", error);
  }
}

console.log("Setting up file watcher with chokidar...");

// Watch JS files
const watcher = chokidar.watch(["./InvoiceReminders/*.js"], {
  ignored: /(node_modules|\.git)/,
  persistent: true,
  ignoreInitial: true,
  awaitWriteFinish: {
    stabilityThreshold: 300,
    pollInterval: 100,
  },
});

// Add event listeners
watcher
  .on("change", (path) => {
    console.log(`File ${path} has changed, regenerating HTML...`);
    generateAndSaveHTML();
  })
  .on("error", (error) => console.error(`Watcher error: ${error}`))
  .on("ready", () =>
    console.log("Initial scan complete. Ready for changes...")
  );

// Initial generation
console.log("Performing initial HTML generation...");
generateAndSaveHTML();
