const Handlebars = require("handlebars");
const { registerHelpers } = require("../HandleBarHelpers");
const fs = require("node:fs");
const path = require("node:path");
const chokidar = require("chokidar");

// activate all helper functions
registerHelpers();

const subject = `
Invoices on paused outreach reminder
`;

const emailMessage = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Third Call Miss</title>
</head>

<body
    style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #1f2937; max-width: 800px; margin: 0 auto; padding: 40px 20px; background-color: #f9fafb;">
    <div
        style="margin-bottom: 12px; background: {{primaryColor}}; border-radius: 8px 8px 0 0; padding: 24px; text-align: center; font-family: Arial, Helvetica, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
                <td>
                    <h1 style="color: white; margin: 0; font-size: 1.5rem; font-weight: 600; letter-spacing: 0.025em;">
                        CURRENT ESCALATED INVOICES</h1>
                    <p style="color: rgba(255, 255, 255, 0.9); margin: 8px 0 0 0; font-size: 1rem;"> Scheduled Reminder 
                    </p>
                </td>
            </tr>
        </table>
    </div>
    <div
        style="background: white; border-radius: 12px; padding: 40px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); position: relative; overflow: hidden;">

         <div style="margin-bottom: 12px; padding: 24px; background-color: white; border-radius: 8px; color: #4b5563; font-family: Arial, Helvetica, sans-serif;">
        <p style="margin: 0 0 16px 0; font-size: 1rem; font-weight: 500;">AR Team,</p>

        <p style="margin: 0 0 16px 0; font-size: 1rem; line-height: 1.6">
          The following invoices are currently paused for outreach and remain unpaid:
        </p>

       <table cellpadding="0" cellspacing="0" border="0" width="100%" style="
            margin: 0 auto 24px auto;
            font-family: Arial, sans-serif;
            max-width: 600px;
        ">
            <tr>
                <td align="center">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%"
                        style="border-radius: 8px">
                        <!-- Table Header -->
                        <tr style="border-radius: 8px 8px 0 0;">
                            <td style="background-color: #f9f9f9; padding: 12px; width: 18%; vertical-align: top; text-align: center;">
                                <p style="margin: 0; font-size: 11px; color: #333333; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                                    Client 
                                </p>
                            </td>
                            <td style="background-color: #f9f9f9; padding: 12px; width: 18%; vertical-align: top; text-align: center;">
                                <p style="margin: 0; font-size: 11px; color: #333333; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                                    Calls
                                </p>
                            </td>
                            <td style="background-color: #f9f9f9; padding: 12px 10px; width: 18%; vertical-align: top; text-align: center;">
                                <p style="margin: 0; font-size: 11px; color: #333333; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                                    Emails
                                </p>
                            </td>
                            <td style="background-color: #f9f9f9; padding: 12px 10px; width: 16%; vertical-align: top; text-align: center;">
                                <p style="margin: 0; font-size: 11px; color: #333333; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                                    Fully
                                </p>
                            </td>
                             <td style="background-color: #f9f9f9; padding: 12px; width: 30%; vertical-align: top; text-align: center;">
                                <p style="margin: 0; font-size: 11px; color: #333333; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                                    Collector
                                </p>
                            </td>
                        </tr>
                        
                        <!-- Invoice Data Rows -->
                        {{#each clientData}}
                        <tr>
                            <td style="padding: 10px; width: 18%; vertical-align: top; text-align: center;">
                                <p style="margin: 0; font-size: 0.9rem; color: #333333; font-weight: 600;">
                                     {{customerNumber}}
                                </p>
                            </td>
                            <td style="padding: 10px; width: 18%; vertical-align: top; text-align: center;">
                                <p style="margin: 0; font-size: 0.9rem; {{#if amountCallsPaused }} color: #e74c3c; {{else}} color: #333333; {{/if}} font-weight: 600;">
                                    {{#if amountCallsPaused }} {{amountCallsPaused}} {{else}} 0 {{/if}}
                                </p>
                            </td>
                            <td style="padding: 10px; width: 18%; vertical-align: top; text-align: center;">
                                <p style="margin: 0; font-size: 0.9rem; {{#if amountEmailsPaused }} color: #e74c3c; {{else}} color: #333333; {{/if}} font-weight: 600;">
                                    {{#if amountEmailsPaused }} {{amountEmailsPaused}} {{else}} 0 {{/if}}
                                </p>
                            </td>
                            <td style="padding: 10px; width: 16%; vertical-align: top; text-align: center;">
                                <p style="margin: 0; font-size: 0.9rem; {{#if amountFullyPaused }} color: #e74c3c; {{else}} color: #333333; {{/if}} font-weight: 600;">
                                    {{#if amountFullyPaused }} {{amountFullyPaused}} {{else}} 0 {{/if}}
                                </p>
                            </td>
                            <td style="padding: 10px; width: 30%; vertical-align: top; text-align: center;">
                                <p style="margin: 0; font-size: 0.9rem; color: #333333; font-weight: 600;">
                                    {{collector}}
                                </p>
                            </td>
                        </tr>
                        {{/each}}
                    </table>
                </td>
            </tr>
        </table>

        <p style="margin-bottom: 12px; font-size: 1rem;">
           Please verify these invoices are being addressed through appropriate escalation channels or update their status if resolved.
        </p>

          <p style="margin: 0; font-size: 1rem;">
            Thank you,<br>
            <span style="font-weight: 500;">Automated AR System</span>
        </p>
        </div>
</body>
</html>
`;

const data = {
  clientData: [
    {
      contactCompanyName: "Southern Ionics",
      customerNumber: 2189153,
      amountCallsPaused: 1,
      amountEmailsPaused: 0,
      amountFullyPaused: 0,
      collector: "Rachel Gonzales",
    },
    {
      contactCompanyName: "Southern Ionics",
      customerNumber: 2189153,
      amountCallsPaused: 4,
      amountEmailsPaused: 4,
      amountFullyPaused: 4,
      collector: "Rachel Gonzales",
    },
  ],
  primaryColor: "#0277BD",
};

const template = Handlebars.compile(emailMessage);
const subjectTemplate = Handlebars.compile(subject);

function generateAndSaveHTML() {
  try {
    console.log("Generating HTML...");
    const html = template(data);
    console.log("Subject: ", subjectTemplate(data));
    const outputFile = path.join(__dirname, "check_paused_invoices.html");
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
