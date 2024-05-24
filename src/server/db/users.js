const db = require('./client')
const bcrypt = require('bcrypt');
const SALT_COUNT = 12;

// NICK FUNCTION
const createUser = async ({ username, password }) => {
    const SQL = `--sql
    INSERT INTO users(id, username, password)
    VALUES ($1, $2, $3)
    RETURNING *
    `;
    const response = await client.query(SQL, [uuid.v4(), username , await bcrypt.hash(password, SALT_COUNT)]);
    return response.rows[0];
  };
  
// const createUser = async({ name='first last', email, password }) => {
//     const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
//     try {
//         const { rows: [user ] } = await db.query(`
//         INSERT INTO users(name, email, password)
//         VALUES($1, $2, $3)
//         ON CONFLICT (email) DO NOTHING
//         RETURNING *`, [name, email, hashedPassword]);

//         return user;
//     } catch (err) {
//         throw err;
//     }
// }

const getUser = async({email, password}) => {
    if(!email || !password) {
        return;
    }
    try {
        const user = await getUserByEmail(email);
        if(!user) return;
        const hashedPassword = user.password;
        const passwordsMatch = await bcrypt.compare(password, hashedPassword);
        if(!passwordsMatch) return;
        delete user.password;
        return user;
    } catch (err) {
        throw err;
    }
}

const getUserByEmail = async(email) => {
    try {
        const { rows: [ user ] } = await db.query(`
        SELECT * 
        FROM users
        WHERE email=$1;`, [ email ]);

        if(!user) {
            return;
        }
        return user;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    createUser,
    getUser,
    getUserByEmail
};