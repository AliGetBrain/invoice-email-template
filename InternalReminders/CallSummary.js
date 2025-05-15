const { registerHelpers } = require("../HandleBarHelpers");
const Handlebars = require("handlebars");
const fs = require("node:fs");
const path = require("node:path");
const chokidar = require("chokidar");

// activate all helper functions
registerHelpers();

const emailMessage = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Call Summary</title>
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      background-color: #f5f5f5;
      color: #333333;
    "
  >
    <table
      cellpadding="0"
      cellspacing="0"
      border="0"
      width="100%"
      style="max-width: 600px; margin: 0 auto"
    >
      <!-- Client Info Card -->
      <tr>
        <td style="padding: 15px 20px 0 20px">
          <table
            cellpadding="0"
            cellspacing="0"
            border="0"
            width="100%"
            style="
              background-color: #ffffff;
              border-radius: 6px;
              box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            "
          >
            <tr>
              <td style="padding: 20px">
                <h2
                  style="
                    color: #578fca;
                    margin: 0 0 15px 0;
                    font-size: 18px;
                    border-bottom: 1px solid #eeeeee;
                    padding-bottom: 10px;
                  "
                >
                  Client Details
                </h2>
                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td
                      width="50%"
                      style="vertical-align: top; padding-right: 10px"
                    >
                      <p style="margin: 0; font-weight: bold; color: #666666">
                        Client:
                      </p>
                      <p style="margin: 0 0 10px 0; color: #333333">
                        Pinnacle LLC
                      </p>

                      <p style="margin: 0; font-weight: bold; color: #666666">
                        Call Date:
                      </p>
                      <p style="margin: 0 0 10px 0; color: #333333">
                        04/12/2025
                      </p>
                    </td>
                    <td
                      width="50%"
                      style="vertical-align: top; padding-left: 10px"
                    >
                      <p style="margin: 0; font-weight: bold; color: #666666">
                        Call Length:
                      </p>
                      <p style="margin: 0 0 10px 0; color: #333333">
                        4 minutes and 24 seconds
                      </p>

                      <p style="margin: 0; font-weight: bold; color: #666666">
                        Next Call Date:
                      </p>
                      <p style="margin: 0 0 10px 0; color: #333333">
                        04/17/2025
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Invoices Card -->
      <tr>
        <td style="padding: 15px 20px 0 20px">
          <table
            cellpadding="0"
            cellspacing="0"
            border="0"
            width="100%"
            style="
              background-color: #ffffff;
              border-radius: 6px;
              box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            "
          >
            <tr>
              <td style="padding: 20px">
                <h2
                  style="
                    color: #578fca;
                    margin: 0 0 15px 0;
                    font-size: 18px;
                    border-bottom: 1px solid #eeeeee;
                    padding-bottom: 10px;
                  "
                >
                  Invoices Discussed
                </h2>

                <!-- Invoice Item 1 -->
                <table
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  width="100%"
                  style="
                    margin-bottom: 10px;
                    background-color: #f9f9f9;
                    border-left: 4px solid #4caf50;
                    border-radius: 3px;
                  "
                >
                  <tr>
                    <td style="padding: 12px">
                      <p style="margin: 0; font-weight: bold; font-size: 16px">
                        Invoice #5901
                      </p>
                      <table
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        width="100%"
                      >
                        <tr>
                          <td width="50%">
                            <p style="margin: 5px 0 0 0; color: #666666">
                              Amount:
                              <span style="color: #333333; font-weight: bold"
                                >$1,200</span
                              >
                            </p>
                          </td>
                          <td width="50%">
                            <p style="margin: 5px 0 0 0; color: #666666">
                              Status:
                              <span style="color: #4caf50; font-weight: bold"
                                >Paid</span
                              >
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <!-- Invoice Item 2 -->
                <table
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  width="100%"
                  style="
                    margin-bottom: 10px;
                    background-color: #f9f9f9;
                    border-left: 4px solid #ffc107;
                    border-radius: 3px;
                  "
                >
                  <tr>
                    <td style="padding: 12px">
                      <p style="margin: 0; font-weight: bold; font-size: 16px">
                        Invoice #6701
                      </p>
                      <table
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        width="100%"
                      >
                        <tr>
                          <td width="50%">
                            <p style="margin: 5px 0 0 0; color: #666666">
                              Amount:
                              <span style="color: #333333; font-weight: bold"
                                >$1,000</span
                              >
                            </p>
                          </td>
                          <td width="50%">
                            <p style="margin: 5px 0 0 0; color: #666666">
                              Status:
                              <span style="color: #ffc107; font-weight: bold"
                                >Scheduled for 04/17/2025</span
                              >
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <!-- Invoice Item 3 -->
                <table
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  width="100%"
                  style="
                    margin-bottom: 0;
                    background-color: #f9f9f9;
                    border-left: 4px solid #f44336;
                    border-radius: 3px;
                  "
                >
                  <tr>
                    <td style="padding: 12px">
                      <p style="margin: 0; font-weight: bold; font-size: 16px">
                        Invoice #7749
                      </p>
                      <table
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        width="100%"
                      >
                        <tr>
                          <td width="50%">
                            <p style="margin: 5px 0 0 0; color: #666666">
                              Amount:
                              <span style="color: #333333; font-weight: bold"
                                >$1,800</span
                              >
                            </p>
                          </td>
                          <td width="50%">
                            <p style="margin: 5px 0 0 0; color: #666666">
                              Status:
                              <span style="color: #f44336; font-weight: bold"
                                >Pending Review</span
                              >
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Call Summary Card -->
      <tr>
        <td style="padding: 15px 20px 0 20px">
          <table
            cellpadding="0"
            cellspacing="0"
            border="0"
            width="100%"
            style="
              background-color: #ffffff;
              border-radius: 6px;
              box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            "
          >
            <tr>
              <td style="padding: 20px">
                <h2
                  style="
                    color: #578fca;
                    margin: 0 0 15px 0;
                    font-size: 18px;
                    border-bottom: 1px solid #eeeeee;
                    padding-bottom: 10px;
                  "
                >
                  Call Summary
                </h2>
                <p style="margin: 0; line-height: 1.5; color: #333333">
                  The call was between Pinnacle LLC and Kylie from the accounts
                  receivable team at Inspire Solutions regarding three open
                  invoices with Pinnacle. The invoices discussed were: Invoice
                  #5901 for $1200, which the user initially stated would be paid
                  on Monday but later revealed had already been paid that
                  morning; Invoice #6701 for $1000, which is planned for payment
                  on Wednesday, April 17th; and Invoice #7749 for $1800, which
                  is pending due to ongoing discussions about a possible cost
                  adjustment. The user confirmed that payments for the first two
                  invoices will be made by Pinnacle LLC. Kylie will update the
                  records and send a recap email to the user. The call ended
                  with both parties confirming the discussion and the user
                  appreciating Kylie's assistance.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Escalations Card -->
      <tr>
        <td style="padding: 15px 20px 0 20px">
          <table
            cellpadding="0"
            cellspacing="0"
            border="0"
            width="100%"
            style="
              background-color: #fff8e1;
              border-radius: 6px;
              box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
              border-left: 4px solid #ff9800;
            "
          >
            <tr>
              <td style="padding: 20px">
                <h2
                  style="
                    color: #ff9800;
                    margin: 0 0 15px 0;
                    font-size: 18px;
                    border-bottom: 1px solid #ffe0b2;
                    padding-bottom: 10px;
                  "
                >
                  Escalations
                </h2>
                <p style="margin: 0; line-height: 1.5; color: #333333">
                  <strong>Invoice #7749:</strong> The client is waiting to hear
                  back from INSPYR about a possible adjustment to the cost and
                  may be eligible for a refund or lower price.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Recording Link Card -->
      <tr>
        <td style="padding: 15px 20px 0 20px">
          <table
            cellpadding="0"
            cellspacing="0"
            border="0"
            width="100%"
            style="
              background-color: #ffffff;
              border-radius: 6px;
              box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
              margin-bottom: 20px;
            "
          >
            <tr>
              <td style="padding: 20px; text-align: center">
                <h2
                  style="
                    color: #578fca;
                    margin: 0 0 15px 0;
                    font-size: 18px;
                    border-bottom: 1px solid #eeeeee;
                    padding-bottom: 10px;
                  "
                >
                  Call Recording
                </h2>
                <a
                  href="https://drive.google.com/file/d/1qTsY7UIuV9l_rOJEHKOcHNVDiDcX0y6-/view?usp=sharing"
                  target="_blank"
                  style="
                    display: inline-block;
                    background-color: #578fca;
                    color: #ffffff;
                    text-decoration: none;
                    padding: 10px 20px;
                    border-radius: 4px;
                    font-weight: bold;
                  "
                  >Listen to Full Recording</a
                >
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

const template = Handlebars.compile(emailMessage);

const data = {};

function generateAndSaveHTML() {
  try {
    console.log("Generating HTML...");
    const html = template(data);

    const outputFile = path.join(__dirname, "call_summary.html");
    fs.writeFileSync(outputFile, html);
    console.log(`HTML generated successfully at: ${outputFile}`);
  } catch (error) {
    console.error("Error generating HTML:", error);
  }
}

console.log("Setting up file watcher with chokidar...");

// Watch JS files
const watcher = chokidar.watch(["./InternalReminders/*.js"], {
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
