const db = require("./client");
const { createUser } = require("./users");
const { createShoe } = require("./shoes");

const users = [
  {
    is_admin: true,
    email: "nick@gmail.com",
    password: "abc123",
  },
  {
    is_admin: false,
    email: "brendan@gmail.com",
    password: "qwe123",
  },
  {
    is_admin: false,
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
  {
    brand: "Grundens",
    size: 8,
    price: 125,
    color: "black camo",
    shoe_picture:
      "https://grundens.com/cdn/shop/files/60008_908_01.jpg?v=1707975370",
  },
  {
    brand: "Crocs",
    size: 10,
    price: 60,
    color: "hot pink",
    shoe_picture:
      "https://media.crocs.com/images/t_pdphero/f_auto%2Cq_auto/products/10001_6UB_ALT100/crocs",
  },
  {
    brand: "Nike Air Monarch IV",
    size: 9,
    price: 60,
    color: "white/navy blue",
    shoe_picture:
      "https://academy.scene7.com/is/image/academy/20372911?$pdp-gallery-ng$",
  },
  {
    brand: "Nike Air Max 1/97 Wotherspoon",
    size: 10,
    price: 600,
    color: "multicolor",
    shoe_picture:
      "https://www.sneakerfiles.com/wp-content/uploads/2018/02/sean-wotherspoon-nike-air-max-1-97-AJ4219-400-side.png",
  },
];

const createTables = async () => {
  const SQL = `--sql
    DROP TABLE IF EXISTS cart;
    DROP TABLE IF EXISTS orderItem;
    DROP TABLE IF EXISTS shoes;
    DROP TABLE IF EXISTS users;

  CREATE TABLE users(
    id UUID PRIMARY KEY,
    is_admin BOOLEAN DEFAULT FALSE,
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
   
CREATE TABLE orderItem(
    id UUID PRIMARY KEY,
    shoe_picture VARCHAR(1000) NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL (10,2) NOT NULL,
    shoe_id UUID REFERENCES shoes(id)
);

CREATE TABLE cart(
  id UUID PRIMARY KEY,
  total_price INTEGER,
  orderItem_id UUID REFERENCES orderItem(id),
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
  } catch (error) {
    console.error("Error inserting seed data:", error);
  }
};

const seedDatabase = async () => {
  try {
    db.connect();
    await createTables();
    await insertUsers();
    await insertShoes();
  } catch (err) {
    throw err;
  } finally {
    db.end();
  }
};

seedDatabase();
