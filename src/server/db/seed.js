const db = require("./client");
const { createUser } = require("./users");
const { createShoe } = require("./shoes");
const { createCart } = require("./cart");
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
  {
    brand: "Travis Scott 1 Low's",
    size: 10,
    price: 150,
    color: "Reverse Mocha",
    shoe_picture:
      "https://img.buzzfeed.com/buzzfeed-static/complex/images/Y19jcm9wLGhfMTAyNix3XzE4MjUseF85Nix5XzY2MQ==/xukbggiq2isyr3ekafrx/travis-scott-air-jordan-1-low-reverse-mocha-release-date-dm7866-162-pair.jpg?downsize=1840:*&output-format=auto&output-quality=auto",
  },
  {
    brand: "Off-White Air Jordan 1's",
    size: 8,
    price: 190,
    color: "UNC",
    shoe_picture:
      "https://img.buzzfeed.com/buzzfeed-static/complex/images/Y19jcm9wLGhfNTMwLHdfOTQwLHhfMCx5XzMw/mbgke3li5gctnhikxqog/off-white-air-jordan-1-i-unc-release-date-aq0818-148-main.jpg?downsize=1840:*&output-format=auto&output-quality=auto",
  },
  {
    brand: "Air Jordan 4 X Union",
    size: 11,
    price: 225,
    color: "black",
    shoe_picture:
      "https://img.buzzfeed.com/buzzfeed-static/complex/images/Y19jcm9wLGhfMTEyNSx3XzIwMDAseF8wLHlfNTk4/uig5o0lyrszqf9ckutho/union-air-jordan-4-retro-off-noir-dc9533-001-pair.jpg?downsize=1840:*&output-format=auto&output-quality=auto",
  },
];

// how to get uuid for each users cart - use helper reduce function to grab prices and sums them up
// user_id is NULL in postbird
// const cart = [
//   { total_price: 1000, user_id: users[0].id },
//   { total_price: 120, user_id: users[1].id },
//   { total_price: 220, user_id: users[2].id },
// ];
// how to get total price for multiple shoes

// line 68 - NOT NULL?
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
    color VARCHAR(255) NOT NUll,
    shoe_picture VARCHAR(1000) NOT NULL
  );

  CREATE TABLE cart(
    id UUID PRIMARY KEY,
    total_price INTEGER NOT NULL,
    user_id UUID REFERENCES users(id),
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
        shoe_picture: shoe.shoe_picture,
      });
    }
    console.log("Shoes inserted successfully.");
    console.log("link to shoe image", shoes[0].shoe_picture);
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
