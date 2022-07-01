import mysql from "mysql";

export const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ants_database'
});
connection.connect(error => {
    if (error) throw error;
    console.log("Database connected successfully!")
});