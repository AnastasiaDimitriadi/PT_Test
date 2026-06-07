const oracledb = require("oracledb");
const { db } = require("./env");

async function connect() {
  try {
    const conn = await oracledb.getConnection(db);
    console.log("Connected to Oracle DB");
    return conn;
  } catch (err) {
    console.error("Connection failed:", err);
    throw err;
  }
}

async function runQueries(conn) {
  try {
    await conn.execute(`
      BEGIN
        EXECUTE IMMEDIATE '
          CREATE TABLE users (
            id NUMBER PRIMARY KEY,
            name VARCHAR2(100)
          )
        ';
      EXCEPTION
        WHEN OTHERS THEN
          IF SQLCODE != -955 THEN
            RAISE;
          END IF;
      END;
    `);

    console.log("Table ready");

    await conn.execute(
      `INSERT INTO users (id, name) VALUES (:id, :name)`,
      { id: 1, name: "Alice" },
      { autoCommit: true }
    );

    await conn.execute(
      `INSERT INTO users (id, name) VALUES (:id, :name)`,
      { id: 2, name: "Bob" },
      { autoCommit: true }
    );

    console.log("Data inserted");

    const result = await conn.execute(
      `SELECT * FROM users ORDER BY id`
    );

    console.log("Users:");
    console.log(result.rows);

    await conn.execute(`
      BEGIN
        UPDATE users SET name = 'Alice Updated' WHERE id = 1;
        INSERT INTO users (id, name) VALUES (3, 'PLSQL User');
        COMMIT;
      END;
    `);

    console.log("PL/SQL executed");

    const final = await conn.execute(
      `SELECT * FROM users ORDER BY id`
    );

    console.log("Final state:");
    console.log(final.rows);

  } catch (err) {
    console.error("DB error:", err);
  }
}

module.exports = {
  connect,
  runQueries
};