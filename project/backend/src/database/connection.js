import sql from "mssql";

const config = {
  user: process.env.DB_USER || "sa",
  password: process.env.DB_PASSWORD || "7053#Gui",
  server: process.env.DB_SERVER || "localhost",
  port: Number(process.env.DB_PORT || 1433),
  database: process.env.DB_DATABASE || "AUTOMATIZATION-XLSX",
  options: {
    encrypt: true,
    trustServerCertificate: true,
    enableArithAbort: true,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

export async function connectDB() {
  try {
    const pool = await sql.connect(config);
    return pool;
  } catch (err) {
    // log útil e objetivo
    console.error("DB connect error:", {
      code: err?.code,
      message: err?.message,
      original: err?.originalError?.message,
      server: config.server,
      port: config.port,
      user: config.user,
      database: config.database,
    });
    throw err;
  }
}
