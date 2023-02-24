const Sequelize=require('sequelize')
const sequelize=require('../util/datbase')

const User=sequelize.define('user',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      Name:{
        type:Sequelize.STRING,
        allowNull:false
      },
      Number:{
        type:Sequelize.INTEGER
      },
      Email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique: true
      },
      Password:{
        type:Sequelize.STRING,
        allowNull:false
      },
      ispremium:Sequelize.BOOLEAN
})

module.exports=User