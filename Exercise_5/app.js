const { connect, runQueries } = require("./db");

require("dotenv").config();

async function main() {
  let conn;

  try {
    console.log("Starting app...");

    conn = await connect();

    if (conn) {
      await runQueries(conn);
    }

  } catch (err) {
    console.error("App error:", err);
  } finally {
    if (conn) {
      await conn.close();
      console.log("Connection closed");
    }
  }
}

main();