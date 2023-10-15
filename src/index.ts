import  express ,  { Request, Response } from "express";
import mysql, { Connection, createConnection } from "mysql2/promise";
import cors from "cors";

const app = express();
const port = process.env.PUERTO || 4000;

const dbConfig = {
  host: "localhost", // Cambia esto por la dirección de tu servidor MySQL
  user: "root",
  password: "",
  database: "sis_farmacia",
};

let dbConnection: Connection;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Middleware para conectar a la base de datos antes de las solicitudes
app.use(async (req, res, next) => {
  try {
    dbConnection = await createConnection(dbConfig);
    next();
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    res.status(500).json({ error: "Error al conectar a la base de datos" });
  }
});

app.get("/selectventas", async (req: Request, res: Response) => {
  try {
    // Ejemplo de consulta
    const [rows] = await dbConnection.query(
      "SELECT COUNT(DISTINCT id_venta) as ventas FROM sis_farmacia.detalle_venta"
    );
    const resultado = res.json({ message: "Conexión exitosa", data: rows });
  } catch (error) {
    console.error("Error en la consulta:", error);
    res.status(500).json({ error: "Error en la consulta" });
  }
});

app.get("/ventasmes", async (req: Request, res: Response) => {
  try {
    // Ejemplo de consulta
    const [rows] = await dbConnection.query(
      "select * from vista_ventas_meses"
    );
    const resultado = res.json({ message: "Conexión exitosa", data: rows });
  } catch (error) {
    console.error("Error en la consulta:", error);
    res.status(500).json({ error: "Error en la consulta" });
  }
});

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});


export default app;
