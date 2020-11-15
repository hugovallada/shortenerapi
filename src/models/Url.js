import sequelize from 'sequelize';

export default class Url extends sequelize.Model {
  static init(conn) {
    super.init({
      url: sequelize.STRING,
      short: sequelize.STRING,
      accessed: sequelize.INTEGER,
    }, {
      sequelize: conn,
    });
  }
}
