(async () => {
    const mysql = require('mysql2/promise')
    const cfg = {
        host: 'localhost',
        user: 'root',
        password: 'root1022',
        database: 'wxy'
    }
    const coon = await mysql.createConnection(cfg)
    console.log('========准备添加=======');
    const Create_SQL = `CREATE TABLE IF NOT EXISTS user(
        id INT NOT NULL AUTO_INCREMENT,
        message VARCHAR(45) NULL,
        PRIMARY KEY(id)
    )`;
    let ret = await coon.execute(Create_SQL)
    console.log("TCL: Create", ret)
    const INSERT_SQL = 'INSERT INTO user(message) VALUES(?)';
    ret = await coon.execute(INSERT_SQL, ['王新月'])
    console.log("TCL: INSERT", ret)
    const SELECT_SQL = 'SELECT * FROM user'
    const [row, fields] = await coon.execute(SELECT_SQL)
    console.log("TCL: row", row)
})()