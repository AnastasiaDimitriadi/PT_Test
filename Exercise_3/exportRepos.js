const fs = require("fs");
require("dotenv").config();

const token = process.env.GITHUB_TOKEN;
const org = process.env.ORG_NAME;

if (!token) {
  throw new Error("Missing GITHUB_TOKEN in .env");
}

if (!org) {
  throw new Error("Missing ORG_NAME in .env");
}

console.log("Starting export...");
console.log("Organization:", org);

async function getRepos() {
  try {
    let page = 1;
    let repos = [];

    while (true) {
      const url = `https://api.github.com/orgs/${org}/repos?per_page=100&page=${page}`;

      console.log(`Fetching page ${page}...`);

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`GitHub API error ${res.status}: ${errorText}`);
      }

      const data = await res.json();

      console.log(`Page ${page} repos: ${data.length}`);

      if (data.length === 0) break;

      repos.push(...data);
      page++;
    }

    console.log(`✅ Total repos found: ${repos.length}`);

    if (repos.length === 0) {
      console.log("No repositories returned from API.");
      console.log("This usually means:");
      console.log("- wrong ORG_NAME");
      console.log("- or token has no access to private repos");
      console.log("- or repos are not visible to this token");
    }

    const csvHeader = "name;full_name;id";

    const csvRows = repos.map((repo) =>
      `${repo.name};${repo.full_name};${repo.id}`
    );

    const csv = [csvHeader, ...csvRows].join("\n");

    fs.writeFileSync("repositories.csv", csv, "utf8");

    console.log("CSV created: repositories.csv");
  } catch (err) {
    console.error("Failed to export repositories");
    console.error(err.message);
    process.exit(1);
  }
}

getRepos();