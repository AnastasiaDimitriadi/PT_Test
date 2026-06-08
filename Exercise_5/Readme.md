# Exercise 5 - Oracle Node.js Integration

##Description
This project demonstrates how to connect a Node.js application to an Oracle Database using Docker.  
It executes SQL queries and PL/SQL blocks and prints the results in the console.

---

## ⚙️ Tech Stack

- Node.js (v18+ recommended)
- Oracle Database (gvenzl/oracle-free Docker image)
- oracledb Node.js driver
- dotenv for environment variables

---

## 🐳 Database Setup (Docker)

The Oracle DB runs inside a Docker container.

### Run the container:
```bash
docker run -d --name oracle-free -p 1521:1521 -e ORACLE_PASSWORD=Oracle12345 gvenzl/oracle-free
Default Service Name: FREEPDB1 (or XEPDB1 depending on container setup)
