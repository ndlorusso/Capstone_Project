const express = require("express");
const db = require("./client");
const uuid = require('uuid');

const createOrderItem = async ({quantity, price, shoe_id}) => {
  const SQL = `--sql
  INSERT INTO orderItem(id, quantity, price, shoe_id)
  VALUES ($1, $2, $3, $4)
  RETURNING *
  `;
  const response = await db.query (SQL, 
    [uuid.v4(), quantity, price, shoe_id]);
    // const orderItem = response.rows[0];
    return response.rows[0];
};

const createCart = async ({ user_id }) => {
  console.log("user_id:", user_id);
    const SQL = `--sql
    INSERT INTO cart(id, user_id)
    VALUES ($1, $2)
    RETURNING *
    `;
    const response = await db.query(SQL,
      [uuid.v4(), user_id]);
    // console.log("response:", response);
    // console.log("response.rows[0]:", response.rows[0]);
    return response.rows[0];
  };

  const fetchUserCart = async (user_id) => {
    const SQL = `--sql
    SELECT * from cart
    WHERE user_id = $1
    `;
    const response = await db.query(SQL, [user_id]);
    console.log("user_id", user_id);
    return response.rows;
  };

  const updateUserCart = async ({total_price, user_id }) => {
    const SQL = `--sql
    UPDATE cart 
    SET total_price = $2
    WHERE user_id = $1
    `;
    // const response =
    await db.query(SQL,
      [uuid.v4(), total_price, user_id]);

    // return response
    console.log("total_price:", total_price);    
    console.log("user_id", user_id);
  };

module.exports = {
    createCart,
    fetchUserCart,
    updateUserCart,
    createCart,
    createOrderItem,
};

