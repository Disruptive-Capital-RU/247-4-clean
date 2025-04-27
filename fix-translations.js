// Simple script to check for syntax issues in LanguageContext.tsx
const fs = require("fs");
const path = require("path");

try {
  // Read the file
  const filePath = path.join(__dirname, "src/lib/LanguageContext.tsx");
  const content = fs.readFileSync(filePath, "utf8");

  // Look for missing commas or quotes
  console.log("Checking for common syntax issues...");

  // Pattern to catch missing commas in multilanguage objects
  const missingCommaPattern = /(\w+): "(.*?)"(\s*?)(\w+):/g;
  let match;
  let lineNumber = 1;
  let lineMap = {};

  // Build line number mapping
  content.split("\n").forEach((line, index) => {
    lineMap[index + 1] = line;
  });

  // Find potential syntax errors
  const potentialErrors = [];

  // Check for missing commas after string values
  const lines = content.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // If a line has a key-value pair but no comma, and the next line has another key
    if (line.match(/"\s*$/) && !line.match(/,\s*$/) && i + 1 < lines.length) {
      const nextLine = lines[i + 1];
      if (nextLine.match(/^\s+\w+:/)) {
        potentialErrors.push({
          line: i + 1,
          text: line,
          issue: "Missing comma at end of line",
        });
      }
    }

    // Check for unbalanced quotes
    const quoteCount = (line.match(/"/g) || []).length;
    if (quoteCount % 2 !== 0 && !line.match(/\/\//)) {
      // Ignore comment lines
      potentialErrors.push({
        line: i + 1,
        text: line,
        issue: "Unbalanced quotes",
      });
    }
  }

  if (potentialErrors.length > 0) {
    console.error("⚠️ Potential syntax issues found:");
    potentialErrors.forEach((error) => {
      console.error(`Line ${error.line}: ${error.issue}`);
      console.error(`> ${error.text}`);
    });
  } else {
    console.log("✅ No obvious syntax issues found");
  }

  // Check for translation keys in the How It Works section
  const howItWorksKeys = [
    "howItWorks",
    "reachOut",
    "reachOutDesc",
    "weConfirm",
    "weConfirmDesc",
    "secureSimplePayment",
    "secureSimplePaymentDesc",
    "frequentlyAsked",
    "questions",
    "feeCoverQuestion",
    "feeCoverAnswer",
    "extendServiceQuestion",
    "extendServiceAnswer",
    "arabicClientsQuestion",
    "arabicClientsAnswer",
    "bookOnBehalfQuestion",
    "bookOnBehalfAnswer",
    "contactConciergeQuestion",
    "contactConciergeAnswer",
    "showMore",
  ];

  // Check if these keys exist in the file
  const missingKeys = [];
  howItWorksKeys.forEach((key) => {
    if (!content.includes(`${key}:`)) {
      missingKeys.push(key);
    }
  });

  if (missingKeys.length > 0) {
    console.error("\n⚠️ Missing translation keys:");
    console.error(missingKeys.join(", "));
  } else {
    console.log("\n✅ All How It Works translation keys found");
  }

  console.log("\nValidation completed");
} catch (error) {
  console.error("Error reading or processing file:", error);
}
