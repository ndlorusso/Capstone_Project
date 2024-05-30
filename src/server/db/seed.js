const db = require("./client");
const { createUser } = require("./users");
const { createShoe } = require("./shoes");
// const { createCart } = require("./cart");

const users = [
  {
    is_admin: true,
    username: "ndlorusso",
    email: "nick@gmail.com",
    password: "abc123",
  },
  {
    is_admin: false,
    username: "brendan123",
    email: "brendan@gmail.com",
    password: "qwe123",
  },
  {
    is_admin: false,
    username: "desiree123",
    email: "desiree@gmail.com",
    password: "zxc3",
  },
];

const shoes = [
  { brand: "crocs", size: 10, price: 60, color: "navy" },
  { brand: "grundens", size: 8, price: 120, color: "shrimp" },
  { brand: "jordans", size: 11, price: 220, color: "black" },
];

// how to get uuid for each users cart - use helper reduce function to grab prices and sums them up
// const cart = [
//   { total_price: shoes[0] + shoes[1], user_id: users[0].id },
//   { total_price: 120, user_id: users[1].id },
//   { total_price: 220, user_id: users[2].id },
// ];
// how to get total price for multiple shoes

const createTables = async () => {
  const SQL = `--sql
  DROP TABLE IF EXISTS cart;
  DROP TABLE IF EXISTS shoes;
  DROP TABLE IF EXISTS users;

  CREATE TABLE users(
    id UUID PRIMARY KEY,
    is_admin BOOLEAN DEFAULT FALSE,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
  );

  CREATE TABLE shoes(
    id UUID PRIMARY KEY,
    brand VARCHAR(255) NOT NULL,
    size INTEGER NOT NULL,
    price INTEGER NOT NULL,
    color VARCHAR(255) NOT NULL
  );

  CREATE TABLE cart(
    id UUID PRIMARY KEY,
    total_price INTEGER NOT NULL,
    user_id UUID REFERENCES users(id) NOT NULL,
    CONSTRAINT unique_user_cart UNIQUE (user_id)
  );
`;
  await db.query(SQL);
};

const insertUsers = async () => {
  try {
    for (const user of users) {
      await createUser({
        is_admin: user.is_admin,
        username: user.username,
        email: user.email,
        password: user.password,
      });
    }
    console.log("Users inserted successfully.");
  } catch (error) {
    console.error("Error inserting seed data:", error);
  }
};

const insertShoes = async () => {
  try {
    for (const shoe of shoes) {
      await createShoe({
        brand: shoe.brand,
        size: shoe.size,
        price: shoe.price,
        color: shoe.color,
      });
    }
    console.log("Shoes inserted successfully.");
  } catch (error) {
    console.error("Error inserting seed data:", error);
  }
};

// insert Cart function
// const insertCart = async () => {
//   try {
//     for (const carts of cart) {
//       await createCart({
//         total_price: carts.total_price,
//         user_id: carts.user_id,
//       });
//     }
//     console.log("Cart inserted successfully.");
//   } catch (error) {
//     console.error("Error inserting seed data:", error);
//   }
// };

const seedDatabase = async () => {
  try {
    db.connect();
    await createTables();
    await insertUsers();
    await insertShoes();
    // await insertCart();
  } catch (err) {
    throw err;
  } finally {
    db.end();
  }
};

seedDatabase();
