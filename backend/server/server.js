import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const server = express();
server.use(express.json());

const connection = await mysql.createConnection({
  host: process.env.MY_HOST,
  user: process.env.MY_USER,
  password: process.env.MY_PASSWORD,
  database: process.env.MY_DATABASE,
});

server.use(cors());

server.get("/", async function (req, res) {
  const [results, fields] = await connection.query("SELECT * FROM `bicycle`");
  res.json(results);
});

server.get("/mainCarousel", async function (req, res) {
  const [results, fields] = await connection.query(
    "SELECT * FROM `mainCarousel`"
  );
  res.json(results);
});

server.get("/brand", async function (req, res) {
  const [results, fields] = await connection.query("SELECT *  from `brand`");
  res.json(results);
});

server.get("/brand/:brand", async function (req, res) {
  const brand = req.params.brand;
  const [results, fields] = await connection.query(
    "SELECT * FROM `bicycle` WHERE brand = ?",
    [brand]
  );
  res.json(results);
});

server.get("/type/:type", async function (req, res) {
  const bikeType = req.params.type;
  const [results, fields] = await connection.query(
    "SELECT * FROM `bicycle` WHERE type = ?",
    [bikeType]
  );
  res.json(results);
});

server.get("/type/:type/brand/:brand", async function (req, res) {
  const bikeType = req.params.type;
  const bikeBrand = req.params.brand;
  const [results, fields] = await connection.query(
    "SELECT * FROM `bicycle` WHERE type = ? AND brand = ?",
    [bikeType, bikeBrand]
  );
  res.json(results);
});
server.get("/shopping-cart", async function (req, res) {
  const id = req.query.id;
  let query = "SELECT * FROM `bicycle`";
  let queryEnd;
  if (typeof id === "string") {
    queryEnd = `${query} WHERE idbike = ${id}`;
  }
  if (typeof id === "object") {
    query = `${query} WHERE `;
    id.map((item) => {
      query += `idbike = ${item} OR `;
    });
    queryEnd = query.slice(0, -3);
  }
  if (id != undefined) {
    const [results, fields] = await connection.query(queryEnd);
    res.json(results);
  }
});

server.get("/type/:type/id/:id", async function (req, res) {
  const id = req.params.id;
  const type = req.params.type;
  const [results, fields] = await connection.query(
    `SELECT 
        bicycle.*, 
        bike_color.color, 
        bike_frame_size.frame_size
      FROM 
        bicycle
      LEFT JOIN 
        bike_color ON bicycle.idbike = bike_color.idbike
      LEFT JOIN 
        bike_frame_size ON bicycle.idbike = bike_frame_size.idbike
      WHERE 
        bicycle.idbike = ? AND bicycle.type = ?;`,
    [id, type]
  );
  res.json(results);
});

server.get("/filter-params", async function (req, res) {
  let queryParamsStart = `SELECT * FROM bicycle `;
  let queryParamsPrice = "";
  let queryParamsType = "";
  let queryParamsBrand = "";
  let queryParamsWheel = "";
  const paramsType = req.query.type;
  const paramsBrand = req.query.brand;
  const paramsWheel = req.query.wheel;
  const paramsPrice = {
    priceFrom: req.query.priceFrom,
    priceTo: req.query.priceTo,
  };

  if (paramsPrice) {
    if (paramsPrice.priceFrom) {
      queryParamsPrice += `price >= ${paramsPrice.priceFrom} AND `;
    }
    if (paramsPrice.priceTo) {
      queryParamsPrice += `price <= ${paramsPrice.priceTo} AND `;
    }
    queryParamsPrice = queryParamsPrice.slice(0, -4);
  }

  if (paramsType) {
    if (typeof paramsType === "string") {
      queryParamsType += `type = '${paramsType}' `;
    }
    if (typeof paramsType === "object") {
      const queryParamsForTypeObject = paramsType
        .map((item) => {
          return `type='${item}' OR `;
        })
        .join(" ");
      queryParamsType += queryParamsForTypeObject;
      queryParamsType = queryParamsType.slice(0, -4);
      queryParamsType = `(${queryParamsType})`;
    }
  }

  if (paramsBrand) {
    if (typeof paramsBrand === "string") {
      queryParamsBrand += `brand = '${paramsBrand}' `;
    }
    if (typeof paramsBrand === "object") {
      const queryParamsForBrandObject = paramsBrand
        .map((item) => {
          return `brand='${item}' OR `;
        })
        .join(" ");
      queryParamsBrand += queryParamsForBrandObject;
      queryParamsBrand = queryParamsBrand.slice(0, -4);
      queryParamsBrand = `(${queryParamsBrand})`;
    }
  }
  if (paramsWheel) {
    if (typeof paramsWheel === "string") {
      queryParamsWheel += `wheel_diameter = ${paramsWheel} `;
    }
    if (typeof paramsWheel === "object") {
      const queryParamsForWheelObject = paramsWheel
        .map((item) => {
          return `wheel_diameter= ${item} OR `;
        })
        .join(" ");
      queryParamsWheel += queryParamsForWheelObject;
      queryParamsWheel = queryParamsWheel.slice(0, -4);
      queryParamsWheel = `(${queryParamsWheel})`;
    }
  }
  let EndQueryParams;
  if (!queryParamsPrice) {
    EndQueryParams = queryParamsStart;
  } else {
    EndQueryParams = `${queryParamsStart} WHERE ${queryParamsPrice}`;
  }
  if (queryParamsType) {
    EndQueryParams += ` AND ${queryParamsType}`;
  } else {
  }

  if (queryParamsBrand) {
    EndQueryParams += ` AND ${queryParamsBrand}`;
  }
  if (queryParamsWheel) {
    EndQueryParams += ` AND ${queryParamsWheel}`;
  }

  const [results, fields] = await connection.query(EndQueryParams);
  res.json(results);
});

server.get("/get-filter-params/type", async function (req, res) {
  const [results, fields] = await connection.query(
    "SELECT DISTINCT  type  FROM bicycle"
  );
  res.json(results);
});
server.get("/get-filter-params/brand", async function (req, res) {
  const [results, fields] = await connection.query(
    "SELECT DISTINCT  brand  FROM bicycle"
  );
  res.json(results);
});
server.get("/get-filter-params/wheel", async function (req, res) {
  const [results, fields] = await connection.query(
    "SELECT DISTINCT  wheel_diameter  FROM bicycle"
  );
  res.json(results);
});

server.post("/subscribe", async function (req, res) {
  try {
    const { email } = req.body;
    const query = `INSERT INTO subscribe_email (email_subscribe) VALUES (?)`;
    const [results] = await connection.query(query, [[email]]);

    res.status(200).json({ message: "Subscription successful!" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "An error occurred while subscribing" });
  }
});
server.post("/order", async function (req, res) {
  try {
    const orderObject = req.body;

    console.log(orderObject);

    const queryOrder =
      "INSERT INTO `order` (id_order, name, surname, email, num_phone, city_post, number_post_office, call_back) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    const [results1] = await connection.query(queryOrder, [
      orderObject.orderID,
      orderObject.name,
      orderObject.surname,
      orderObject.email,
      orderObject.phone,
      orderObject.city,
      orderObject.num_post,
      orderObject.call_back,
    ]);
    let paramsQuery = "";

    orderObject.productID.forEach((item) => {
      paramsQuery += `(${orderObject.orderID}, ${item.idbike}, ${item.count}), `;
    });
    paramsQuery = paramsQuery.slice(0, -2);

    let queryOrderProduct = `INSERT INTO order_products (id_order, id_product, count) VALUES ${paramsQuery}`;
    const [results2] = await connection.query(queryOrderProduct);

    res.status(200).json({ message: "Order accepted!" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "An error occurred while Order" });
  }
});

server.listen(3000, () => {
  console.log("Start server");
});
