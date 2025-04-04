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
                {{#if CompanyName}}<div style="font-weight: 600; color: #374151;">{{CompanyName}}</div>{{/if}}
                {{#if CompanyAddress.Line1}}<div>{{CompanyAddress.Line1}}</div>{{/if}}
                {{#if (and CompanyAddress.City CompanyAddress.CountrySubDivisionCode)}}<div>{{CompanyAddress.City}}, {{CompanyAddress.CountrySubDivisionCode}} {{#if CompanyAddress.PostalCode}}{{CompanyAddress.PostalCode}}{{/if}}</div>{{/if}}
                {{#if CompanyEmailAddress}}<div>{{CompanyEmailAddress}}</div>{{/if}}
            </div>

          <!-- SVG Container - Add this section -->
         {{#if CompanyLogo}}
          <div style="width: 200px; text-align: right;">
              {{{CompanyLogo}}}
          </div>
          {{/if}}
        </div>

        <!-- Invoice Title -->
        <div style="color: {{PrimaryColor}}; font-size: 40px; font-weight: 700; margin: 0 0 40px 0; letter-spacing: -0.5px; position: relative; display: inline-block; padding-bottom: 10px; border-bottom: 3px solid {{PrimaryColor}};">
            INVOICE
        </div>

        <!-- Billing Info -->
        <table cellpadding="0" cellspacing="0" style="width: 100%; margin-bottom: 20px;">
            <tr>
                <td style="width: 33%; vertical-align: top;">
                    <div style="font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-bottom: 12px; font-weight: 600;">BILL TO</div>
                    {{#if CustomerName}}<div style="font-weight: 600; color: #374151;">{{CustomerName}}</div>{{/if}}
                    {{#if CustomerCompanyName}} {{#if (notEquals CustomerCompanyName CustomerName)}}<div>{{CustomerCompanyName}}</div>{{/if}} {{/if}}
                    {{#if CustomerBillAddr.Line1}}<div>{{CustomerBillAddr.Line1}}</div>{{/if}}
                    {{#if (and CustomerBillAddr.City CustomerBillAddr.CountrySubDivisionCode)}}<div>{{CustomerBillAddr.City}}, {{CustomerBillAddr.CountrySubDivisionCode}} {{#if CustomerBillAddr.PostalCode}}{{CustomerBillAddr.PostalCode}}{{/if}}</div>{{/if}}
                </td>
                {{#if CustomerShipAddr}}
                  <td style="width: 33%; vertical-align: top;">
                      <div style="font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-bottom: 12px; font-weight: 600;">SHIP TO</div>
                      {{#if CustomerShipAddr.City}}
                        {{#if CustomerName}}<div style="font-weight: 600; color: #374151;">{{CustomerName}}</div>{{/if}}
                        {{#if CustomerCompanyName}} {{#if (notEquals CustomerCompanyName CustomerName)}}<div>{{CustomerCompanyName}}</div>{{/if}} {{/if}}
                        {{#if CustomerShipAddr.Line1}}<div>{{CustomerShipAddr.Line1}}</div>{{/if}}
                        {{#if (and CustomerShipAddr.City CustomerShipAddr.CountrySubDivisionCode)}}<div>{{CustomerShipAddr.City}}, {{CustomerShipAddr.CountrySubDivisionCode}} {{#if CustomerShipAddr.PostalCode}}{{CustomerShipAddr.PostalCode}}{{/if}}</div>{{/if}}
                      {{else}}
                        {{#each CustomerShipAddr as |value key|}}
                          {{#if (startsWith key "Line")}}
                            <div>{{value}}</div>
                          {{/if}}
                          {{/each}}
                        {{/if}}
                  </td>
                {{/if}}
                <td style="width: 33%; vertical-align: top; text-align: right;">
                    {{#if DocNumber}}<div><span style="font-weight: 600; color: #374151;">INVOICE #</span> {{DocNumber}}</div>{{/if}}
                    {{#if TxnDate}}<div><span style="font-weight: 600; color: #374151;">DATE</span> {{formatDate TxnDate}}</div>{{/if}}
                    {{#if DueDate}}<div><span style="font-weight: 600; color: #374151;">DUE DATE</span> {{formatDate DueDate}}</div>{{/if}}
                    {{#if SalesTerm}}<div><span style="font-weight: 600; color: #374151;">TERMS</span> {{SalesTerm}}</div>{{/if}}
                </td>
            </tr>
        </table>

        <!-- Shipping Fields -->
        {{#if (tripleOr ShipDate ShipMethod TrackingNumber)}}
        <table cellpadding="0" cellspacing="0" style="width: 100%; margin-bottom: 40px;">
            <tr>
                <td style="border-top: 1px solid #E5E7EB; padding-top: 16px;">
                    <table cellpadding="0" cellspacing="0" style="width: 100%;">
                        <tr>
                          <td style="vertical-align: top;">
                              <div style="font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-bottom: 12px; font-weight: 600;">SHIP DATE</div>
                              {{#if ShipDate }}<div style="color: #374151;">{{formatDate ShipDate}}</div> {{else}} N/A {{/if}}
                          </td>
                            <td style="vertical-align: top;">
                              <div style="font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-bottom: 12px; font-weight: 600;">SHIP VIA</div>
                               {{#if ShipMethod }} <div style="color: #374151;">{{ShipMethod}}</div> {{else}} N/A  {{/if}}
                          </td>
                          <td style="vertical-align: top;">
                              <div style="font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-bottom: 12px; font-weight: 600;">TRACKING NO.</div>
                               {{#if TrackingNumber }} <div style="color: #374151;">{{TrackingNumber}}</div> {{else}} N/A  {{/if}}
                          </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        {{/if}}

        <!-- Custom Fields -->
        {{#if CustomField}}
        <table cellpadding="0" cellspacing="0" style="width: 100%; margin-bottom: 20px;">
            <tr>
                <td style="border-top: 1px solid #E5E7EB; padding-top: 16px;">
                    <table cellpadding="0" cellspacing="0" style="width: 100%;">
                        <tr>
                            {{#each CustomField}}
                            {{#if StringValue}}
                              <td style="vertical-align: top;">
                                  <div style="font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-bottom: 12px; font-weight: 600;">{{Name}}</div>
                                  <div style="color: #374151;">{{StringValue}}</div>
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
        {{#if (hasServiceDates LineItems)}}
          <table cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: separate; margin: 20px 0;">
            <thead>
              <tr>
                <th style="background-color: {{PrimaryColor}}; padding: 12px 16px; text-align: left; font-size: 0.875rem; font-weight: 600; color: white; text-transform: uppercase; letter-spacing: 0.05em;">DATE</th>
                <th style="background-color: {{PrimaryColor}}; padding: 12px 16px; text-align: left; font-size: 0.875rem; font-weight: 600; color: white; text-transform: uppercase; letter-spacing: 0.05em;">PRODUCT/SERVICE</th>
                <th style="background-color: {{PrimaryColor}}; padding: 12px 16px; text-align: left; font-size: 0.875rem; font-weight: 600; color: white; text-transform: uppercase; letter-spacing: 0.05em;">DESCRIPTION</th>
                <th style="background-color: {{PrimaryColor}}; padding: 12px 16px; text-align: center; font-size: 0.875rem; font-weight: 600; color: white; text-transform: uppercase; letter-spacing: 0.05em;">QTY</th>
                <th style="background-color: {{PrimaryColor}}; padding: 12px 16px; text-align: right; font-size: 0.875rem; font-weight: 600; color: white; text-transform: uppercase; letter-spacing: 0.05em;">RATE</th>
                <th style="background-color: {{PrimaryColor}}; padding: 12px 16px; text-align: right; font-size: 0.875rem; font-weight: 600; color: white; text-transform: uppercase; letter-spacing: 0.05em;">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {{#each LineItems}}
                {{#if (equals DetailType 'SalesItemLineDetail')}}
                  {{#if (notEquals SalesItemLineDetail.ItemRef.value 'SHIPPING_ITEM_ID')}}
                    <tr>
                      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #4b5563;">{{formatDate ServiceDate}}</td>
                      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #4b5563;">{{SalesItemLineDetail.ItemRef.name}}</td>
                      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #4b5563;">{{Description}}</td>
                      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #4b5563; text-align: center;">{{SalesItemLineDetail.Qty}}</td>
                      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #4b5563; text-align: right;">{{format SalesItemLineDetail.UnitPrice}}</td>
                      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #4b5563; text-align: right;">
                        <div>{{format Amount}}</div>
                        {{#if SalesItemLineDetail.DiscountAmt}}
                          <div style="font-size: 0.8rem">(after {{format SalesItemLineDetail.DiscountAmt}} discount)</div>
                        {{/if}}
                      </td>
                    </tr>
                  {{/if}}
                {{/if}}

                {{#if (equals DetailType 'GroupLineDetail')}}
                  <tr>
                    <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #4b5563;">{{formatDate GroupLineDetail.ServiceDate}}</td>
                    <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #4b5563;">{{GroupLineDetail.GroupItemRef.name}}</td>
                    <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #4b5563;"></td>
                    <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #4b5563; text-align: center;">{{GroupLineDetail.Quantity}}</td>
                    <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #4b5563; text-align: right;">{{format (sumBundleRates GroupLineDetail)}}</td>
                    <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #4b5563; text-align: right;">
                      <div>{{format Amount}}</div>
                      {{#if SalesItemLineDetail.DiscountAmt}}
                        <div style="font-size: 0.8rem">(after {{format SalesItemLineDetail.DiscountAmt}} discount)</div>
                      {{/if}}
                    </td>
                  </tr>
                {{/if}}
              {{/each}}
            </tbody>
          </table>

        {{else}}
        <table cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: separate; margin: 20px 0;">
            <thead>
                <tr>
                    <th style="background-color: {{PrimaryColor}}; padding: 12px 16px; text-align: left; font-size: 0.875rem; font-weight: 600; color: white; text-transform: uppercase; letter-spacing: 0.05em;">PRODUCT/SERVICE</th>
                    <th style="background-color: {{PrimaryColor}}; padding: 12px 16px; text-align: left; font-size: 0.875rem; font-weight: 600; color: white; text-transform: uppercase; letter-spacing: 0.05em;">DESCRIPTION</th>
                    <th style="background-color: {{PrimaryColor}}; padding: 12px 16px; text-align: center; font-size: 0.875rem; font-weight: 600; color: white; text-transform: uppercase; letter-spacing: 0.05em;">QTY</th>
                    <th style="background-color: {{PrimaryColor}}; padding: 12px 16px; text-align: right; font-size: 0.875rem; font-weight: 600; color: white; text-transform: uppercase; letter-spacing: 0.05em;">RATE</th>
                    <th style="background-color: {{PrimaryColor}}; padding: 12px 16px; text-align: right; font-size: 0.875rem; font-weight: 600; color: white; text-transform: uppercase; letter-spacing: 0.05em;">AMOUNT</th>
                </tr>
            </thead>
            <tbody>
              {{#each LineItems}}
                {{#if (equals DetailType 'SalesItemLineDetail')}}
                  {{#if (notEquals SalesItemLineDetail.ItemRef.value 'SHIPPING_ITEM_ID')}}
                  <tr>
                    <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #4b5563;">{{SalesItemLineDetail.ItemRef.name}}</td>
                    <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #4b5563;">{{Description}}</td>
                    <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #4b5563; text-align: center;">{{SalesItemLineDetail.Qty}}</td>
                    <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #4b5563; text-align: right;">{{format SalesItemLineDetail.UnitPrice}}</td>
                    <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #4b5563; text-align: right;"> <div>{{format Amount}}</div>
                    {{#if SalesItemLineDetail.DiscountAmt}}
                      <div style="font-size: 0.8rem">(after {{format SalesItemLineDetail.DiscountAmt}} discount)</div>
                    {{/if}}
                    </td>
                  </tr>
                 {{/if}}
                {{/if}}

                {{#if (equals DetailType 'GroupLineDetail')}}
                <tr>
                  <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #4b5563;">{{GroupLineDetail.GroupItemRef.name}}</td>
                  <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #4b5563;"></td>
                  <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #4b5563; text-align: center;">{{GroupLineDetail.Quantity}}</td>
                  <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #4b5563; text-align: right;">{{format (sumBundleRates GroupLineDetail)}}</td>
                  <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #4b5563; text-align: right;"> <div>{{format Amount}}</div>
                  {{#if SalesItemLineDetail.DiscountAmt}}
                    <div style="font-size: 0.8rem">(after {{format SalesItemLineDetail.DiscountAmt}} discount)</div>
                  {{/if}}
                  </td>
                </tr>
              {{/if}}
              {{/each}}
            </tbody>
        </table>
        {{/if}}

        <!-- Totals Section -->
        <table cellpadding="0" cellspacing="0" style="width: 100%; margin-top: 30px;">
            <tr>
                <td style="width: 50%; vertical-align: top;">
                    {{#if CustomerMemo}} <div style="color: #6b7280; font-size: 0.95rem; text-align: left; max-width: 300px;">
                        {{CustomerMemo}}
                    </div> {{/if}}
                </td>
            
                <td style="width: 50%; vertical-align: top;">
                    <table cellpadding="0" cellspacing="0" style="width: 100%; margin-left: auto;">
                      {{#if (greaterThan LineItems.length 2)}}
                        {{#each LineItems}}
                          {{#if (equals DetailType 'SubTotalLineDetail')}}
                            <tr>
                                <td style="padding: 8px 0; font-size: 0.95rem;">SUBTOTAL</td>
                                <td style="padding: 8px 0; font-size: 0.95rem; text-align: right;">{{format Amount}}</td>
                            </tr>
                          {{/if}}
                        {{/each}}
                      {{/if}}
                      {{#each LineItems}}
                        {{#if (equals DetailType 'DiscountLineDetail')}}
                        <tr>
                            <td style="padding: 8px 0; font-size: 0.95rem;">DISCOUNT ({{DiscountLineDetail.DiscountPercent}}%) </td>
                            <td style="padding: 8px 0; font-size: 0.95rem; text-align: right;">- {{format Amount}}</td>
                        </tr>
                        {{/if}}
                      {{/each}}
                        {{#if TaxDetails.TotalTax}}<tr>
                            <td style="padding: 8px 0; font-size: 0.95rem;">TAX {{#if TaxDetails.TaxLine}}({{sumTaxPercent TaxDetails.TaxLine}}%){{/if}} </td>
                            <td style="padding: 8px 0; font-size: 0.95rem; text-align: right;">{{format TaxDetails.TotalTax}}</td>
                        </tr>
                        {{/if}}
                        
                        {{#each LineItems}}
                          {{#if (equals SalesItemLineDetail.ItemRef.value 'SHIPPING_ITEM_ID')}}
                            <tr>
                                <td style="padding: 8px 0; font-size: 0.95rem;">SHIPPING</td>
                                <td style="padding: 8px 0; font-size: 0.95rem; text-align: right;">{{format Amount}}</td>
                            </tr>
                          {{/if}}
                        {{/each}}
                        {{#if TotalAmount}}
                          <tr>
                              <td style="padding: 8px 0; font-size: 0.95rem;">TOTAL</td>
                              <td style="padding: 8px 0; font-size: 0.95rem; text-align: right;">{{format TotalAmount}}</td>
                          </tr>    
                        {{/if}}  
                        {{#if PreviousPayments}}      
                          <tr>
                              <td style="padding: 8px 0; font-size: 0.95rem;">PAYMENTS</td>
                              <td style="padding: 8px 0; font-size: 0.95rem; text-align: right;">- {{format PreviousPayments}}</td>
                          </tr> 
                        {{/if}}  
                        {{#if Deposit}}      
                          <tr>
                              <td style="padding: 8px 0; font-size: 0.95rem;">DEPOSIT</td>
                              <td style="padding: 8px 0; font-size: 0.95rem; text-align: right;">- {{format Deposit}}</td>
                          </tr> 
                        {{/if}}  
                        <tr>
                            <td colspan="2" style="padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 1.25rem; font-weight: 700; color: {{PrimaryColor}}; text-align: right;">
                                BALANCE DUE {{format Balance}}
                            </td>
                        </tr>
                         <tr>
                            <td colspan="2" style="padding-top: 10px; font-size: 1.25rem; font-weight: 700; color: #FF0000; text-align: right;">
                                OVERDUE {{formatDate TxnDate}}
                            </td>
                        </tr>
                    </table> 
                </td>
            </tr>
        </table>

        <!-- Buttons -->
        {{#if (and InvoicePaymentLink pdfButton)}}
        <!-- Click Here To Pay Button and PDF Download Button -->
        <div style="margin:0; padding:0;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
            <tr>
              <td height="60" style="line-height: 60px; font-size: 60px;">&nbsp;</td>
            </tr>
          </table>
          <table align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
            <tr>
              <!-- Pay Button -->
              <td align="right" style="padding: 0 8px;">
                <a href="{{InvoicePaymentLink}}" target="_blank" style="background-color: {{PrimaryColor}}; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 30px; font-weight: 600; font-family: Arial, sans-serif; font-size: 14px; display: inline-block;">
                  Click Here To Pay
                </a>
              </td>
              <td style="padding: 0 8px; font-weight: 500; font-family: Arial, sans-serif; font-size: 14px; color: #333333; text-transform: uppercase;">
                OR
              </td>
              <!-- PDF Button -->
              <td align="left" style="padding: 0 8px;">
                <a href="http://localhost:5678/webhook-test/pdf-download?invoiceid={{InvoiceID}}&companyid={{CompanyID}}&customerid={{CustomerID}}" target="_blank" style="background-color: {{PrimaryColor}}; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 30px; font-weight: 600; font-family: Arial, sans-serif; font-size: 14px; display: inline-block;">
                  Download PDF
                </a>
              </td>
            </tr>
          </table>
        </div>
        {{else}} 
        <!-- Just PDF Download Button -->
        <div style="text-align: center; margin-top: 40px; padding-top: 20px;">
            <a href="http://localhost:5678/webhook-test/pdf-download?invoiceid={{InvoiceID}}&companyid={{CompanyID}}&customerid={{CustomerID}}" target="_blank" style="display: inline-block; background-color: {{PrimaryColor}}; color: white; padding: 12px 24px; text-decoration: none; border-radius: 30px; font-weight: 600;">
                Download PDF
            </a>
        </div> 
        {{/if}}
    </div>
</body>
</html>`;

const data2 = {
  DocNumber: "1012",
  TxnDate: "2024-12-26",
  LineItems: [
    {
      Id: "1",
      LineNum: 1,
      Description: "Sprinkler Heads",
      Amount: 30,
      DetailType: "SalesItemLineDetail",
      SalesItemLineDetail: {
        ItemRef: {
          value: "16",
          name: "Sprinkler Heads",
        },
        UnitPrice: 2,
        Qty: 15,
        DiscountAmt: 10,
        TaxCodeRef: {
          value: "NON",
        },
      },
    },
    {
      Id: "2",
      LineNum: 2,
      Description: "Rock Fountain",
      Amount: 275,
      DetailType: "SalesItemLineDetail",
      SalesItemLineDetail: {
        ItemRef: {
          value: "5",
          name: "Rock Fountain",
        },
        UnitPrice: 275,
        Qty: 1,
        TaxCodeRef: {
          value: "NON",
        },
      },
    },
    {
      Amount: 305,
      DetailType: "SubTotalLineDetail",
      SubTotalLineDetail: {},
    },
    {
      Amount: 30.5,
      DetailType: "DiscountLineDetail",

      DiscountLineDetail: {
        PercentBased: true,
        DiscountPercent: 10,
        DiscountAccountRef: {
          value: "86",
          name: "Discounts given",
        },
      },
    },
  ],
  CustomerCompanyName: "Barnett Design",
  CustomerName: "Shara Barnett",
  CustomerBillAddr: {
    Id: "24",
    Line1: "19 Main St.",
    City: "Middlefield",
    CountrySubDivisionCode: "CA",
    PostalCode: "94303",
    Lat: "37.445013",
    Long: "-122.1391443",
  },
  SalesTerm: "Net 30",
  CustomerBillEmail: "Design@intuit.com",
  DueDate: "2025-01-25",
  TaxDetails: {
    TxnTaxCodeRef: { value: "3" },
    TotalTax: 4.5,
    TaxLine: [
      {
        Amount: 1.5,
        DetailType: "TaxLineDetail",
        TaxLineDetail: {
          TaxRateRef: { value: "5" },
          PercentBased: true,
          TaxPercent: 5.0,
          NetAmountTaxable: 30.0,
        },
      },
      {
        Amount: 3.0,
        DetailType: "TaxLineDetail",
        TaxLineDetail: {
          TaxRateRef: { value: "6" },
          PercentBased: true,
          TaxPercent: 10.0,
          NetAmountTaxable: 30.0,
        },
      },
    ],
  },
  TotalAmount: 274.5,
  Balance: 274.5,
  CustomerMemo: "Thank you for your business and have a great day!",
  CompanyName: "Sandbox Company_US_1",
  CompanyAddress: {
    Id: "1",
    Line1: "123 Sierra Way",
    City: "San Pablo",
    CountrySubDivisionCode: "CA",
    PostalCode: "87999",
    Lat: "36.6788345",
    Long: "-5.4464622",
  },
  CompanyEmailAddress: "noreply@quickbooks.com",
  pdfButton: true,
};

const data = {
  initialMessage: true,
  DocNumber: 1007,
  TxnDate: "2024-12-24",
  LineItems: [
    {
      Id: "1",
      LineNum: 1,
      Description: "Custom Design",
      Amount: 750,
      DetailType: "SalesItemLineDetail",
      SalesItemLineDetail: {
        ItemRef: {
          value: "4",
          name: "Design",
        },
        UnitPrice: 75,
        Qty: 10,
        ItemAccountRef: {
          value: "82",
          name: "Design income",
        },
        TaxCodeRef: {
          value: "NON",
        },
      },
    },
    {
      Amount: 750,
      DetailType: "SubTotalLineDetail",
      SubTotalLineDetail: {},
    },
  ],
  CustomerCompanyName: "John Melton",
  CustomerName: "John Melton",
  CustomerBillAddr: {
    Id: "13",
    Line1: "85 Pine St.",
    City: "Menlo Park",
    CountrySubDivisionCode: "CA",
    PostalCode: "94304",
    Lat: "37.4451342",
    Long: "-122.1409626",
  },
  CustomerShipAddr: {
    Id: "13",
    Line1: "85 Pine St.",
    City: "Menlo Park",
    CountrySubDivisionCode: "CA",
    PostalCode: "94304",
    Lat: "37.4451342",
    Long: "-122.1409626",
  },
  SalesTerm: "Net 30",
  CustomerBillEmail: "John@Melton.com",
  DueDate: "2025-01-23",
  TaxDetails: {
    TotalTax: 0,
  },
  TotalAmount: 750,
  Balance: 450,
  CustomerMemo: "Thank you for your business and have a great day! ",
  CompanyName: "Sandbox Company_US_2",
  CompanyAddress: {
    Id: "1",
    Line1: "123 Sierra Way",
    City: "San Pablo",
    CountrySubDivisionCode: "CA",
    PostalCode: "87999",
    Lat: "36.6788345",
    Long: "-5.4464622",
  },
  CompanyEmailAddress: "noreply@quickbooks.com",
  InvoiceID: 16,
  CompanyID: 9341454074596632,
  CustomerID: 13,
  PreviousPayments: 300,
  Deposit: 10,
  CustomField: [
    {
      DefinitionId: "3",
      Name: "Custom field 2",
      Type: "StringType",
      StringValue: "custom",
    },
  ],
  ShipDate: "",
  TrackingNumber: 0,
  ShipMethod: null,
  InvoicePaymentLink: 'localhost:5678',
  pdfButton: true,
  CompanyLogo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" fill="#6200EE" rx="10" ry="10"/>
  <polyline points="20,80 40,40 60,60 80,30" fill="none" stroke="white" stroke-width="4"/>
  <circle cx="20" cy="80" r="5" fill="white"/>
  <circle cx="40" cy="40" r="5" fill="white"/>
  <circle cx="60" cy="60" r="5" fill="white"/>
  <circle cx="80" cy="30" r="5" fill="white"/>
</svg>`,
PrimaryColor: '#6200EE',
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
