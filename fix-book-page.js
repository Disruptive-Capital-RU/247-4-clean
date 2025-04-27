const fs = require("fs");
const path = require("path");

try {
  // Define file paths
  const bookPagePath = path.join(__dirname, "src/app/book/page.tsx");
  const backupPath = path.join(__dirname, "src/app/book/page.tsx.bak");

  // Create a backup
  if (fs.existsSync(bookPagePath)) {
    console.log("Creating backup of book/page.tsx...");
    fs.copyFileSync(bookPagePath, backupPath);
    console.log("Backup created at", backupPath);
  } else {
    console.error("Book page file not found at", bookPagePath);
    process.exit(1);
  }

  console.log("Backup process completed.");
} catch (error) {
  console.error("Error during backup process:", error);
  process.exit(1);
}
