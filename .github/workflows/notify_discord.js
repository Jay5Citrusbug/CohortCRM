/**
 * This script sends a notification to Discord (success, failure, or system error).
 * It expects environment variables populated by the GitHub Actions workflow.
 */

const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
const reportUrl = process.env.REPORT_URL;
const total = process.env.TOTAL || "0";
const passed = process.env.PASSED || "0";
const failed = process.env.FAILED || "0";
const skipped = process.env.SKIPPED || "0";
const stagingStatus = process.env.STAGING_TESTS_STATUS || "success";
const userIds = ["1351863692731482136", "1351873147040694303"];
const mentions = userIds.length > 0 ? userIds.map(id => `<@${id}>`).join(" ") : "";

if (!webhookUrl) {
    console.error("❌ DISCORD_WEBHOOK_URL is not set.");
    process.exit(1);
}

// Determine run state
const isSystemFailure = stagingStatus !== "success";
const hasTestFailures = Number(failed) > 0;
const isFailure = isSystemFailure || hasTestFailures;

let content = "";
let color = 3066993; // Green color for success
let description = `**Total:** ${total}\n✅ Passed: ${passed}\n❌ Failed: ${failed}\n⚪ Skipped: ${skipped}`;

if (isSystemFailure) {
    content = `${mentions} 🚨 Playwright CI Run Failed (System/Build Error)`;
    color = 15158332; // Red color for failure
    description = `**Status:** CI run status is \`${stagingStatus}\`.\nCheck the GitHub Actions logs for build, setup, or dependency errors.`;
} else if (hasTestFailures) {
    content = `${mentions} 🚨 Playwright Tests Failed in Staging Environment`;
    color = 15158332; // Red color for failure
} else {
    content = `✅ Playwright Tests Passed Successfully in Staging Environment`;
    color = 3066993; // Green color for success
}

const payload = {
    username: "Playwright Bot",
    content: content,
    embeds: [
        {
            title: "🎭 Cohort CRM - Playwright Test Results",
            description: description,
            color: color,
            fields: [
                {
                    name: "📎 View Report",
                    value: reportUrl,
                },
            ],
            footer: {
                text: `GitHub Action - ${process.env.GITHUB_WORKFLOW || "Playwright Tests"}`,
            },
        },
    ],
};

async function sendNotification() {
    try {
        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            console.log("✅ Discord notification sent successfully.");
        } else {
            console.error(`❌ Failed to send Discord notification. Status: ${response.status}`);
            const text = await response.text();
            console.error(`Response: ${text}`);
            process.exit(1);
        }
    } catch (error) {
        console.error("❌ Error sending Discord notification:", error);
        process.exit(1);
    }
}

sendNotification();
