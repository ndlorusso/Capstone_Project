const express = require("express");
const db = require("./client");
const uuid = require("uuid");

const createOrderItem = async ({ quantity, price, shoe_id, shoe_picture }) => {
  const SQL = `--sql
  INSERT INTO orderItem(id, quantity, price, shoe_id, shoe_picture)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *
  `;
  const response = await db.query(SQL, [
    uuid.v4(),
    quantity,
    price,
    shoe_id,
    shoe_picture,
  ]);
  return response.rows[0];
};

// orderItem table need that id
// FETCH ALL OrderItems
const fetchAllOrderItems = async () => {
  const SQL = `--sql
  SELECT * from orderItem
  `;
  const response = await db.query(SQL);
  return response.rows;
};

const fetchOrderItem = async (id) => {
  const SQL = `--sql
  SELECT * from orderItem
  WHERE user_id = $1
  `;
  const response = await db.query(SQL, [id]);
  console.log("orderItemID:", id);
  return response.rows;
};

const createCart = async ({ user_id }) => {
  console.log("user_id:", user_id);
  const SQL = `--sql
    INSERT INTO cart(id, user_id)
    VALUES ($1, $2)
    RETURNING *
    `;
  const response = await db.query(SQL, [uuid.v4(), user_id]);
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

const updateUserCart = async ({ total_price, user_id }) => {
  const SQL = `--sql
    UPDATE cart 
    SET total_price = $2
    WHERE user_id = $1
    `;
  await db.query(SQL, [uuid.v4(), total_price, user_id]);
};

const deleteAllOrderItems = async () => {
  const SQL = `--sql
  DELETE from orderItem
  WHERE id = $1
  RETURNING *
  `;
  const response = await db.query(SQL, [id]);
  return response.rows[0];
};

const deleteOrderItem = async (id) => {
  const SQL = `--sql
  DELETE from orderItem
  WHERE id = $1
  RETURNING *
  `;
  const response = await db.query(SQL, [id]);
  return response.rows[0];
};

module.exports = {
  createCart,
  fetchUserCart,
  updateUserCart,
  createCart,
  createOrderItem,
  fetchOrderItem,
  fetchAllOrderItems,
  deleteAllOrderItems,
  deleteOrderItem,
};
