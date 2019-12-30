(async () => {
    const Sequelize = require("sequelize");
    // 建立连接
    const sequelize = new Sequelize("wxy", "root", "root1022", {
        host: "localhost",
        dialect: "mysql",
        operatorsAliases: false
    })
    // 定义模型
    const Fruit = sequelize.define("Fruit", {
        name: { type: Sequelize.STRING(20), allowNull: false },
        price: { type: Sequelize.FLOAT, allowNull: false },
        stock: { type: Sequelize.INTEGER, defaultValue: 0 }
    });
    // 同步数据库sync()，force: true则会删除已存在表 
    let ret = await Fruit.sync()
    console.log("TCL: rets", ret)
    // 创建
    // ret = await Fruit.create({
    //     name: '橘子',
    //     price: 2.89
    // })
    // 查询
    // ret = await Fruit.findAll()
    // console.log("TCL: ret", ret)
    // 修改
    await Fruit.update(
        { price: 3.00 },
        { where: { name: '香蕉' } }
    )
    //查询
    const Op = Sequelize.Op
    ret = await Fruit.findAll({
        where: { price: { [Op.lt]: 4, [Op.gt]: 2 } }
    })
    console.log('findAll', JSON.stringify(ret, '', '\t'))
})()