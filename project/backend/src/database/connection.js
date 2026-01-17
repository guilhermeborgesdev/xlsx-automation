import sql from "mssql";

const config = {
  user: "sa",
  password: "7053#Gui",
  server:"localhost",
  port: 1433,
  database: "AUTOMACAO-PLANILHAS",
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
