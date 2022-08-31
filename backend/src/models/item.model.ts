import { Sequelize, STRING } from "sequelize"

export const reqisterItem = (sequelize: Sequelize) => {
  const Item = sequelize.define("items", {
    title: {
      type: STRING
    },
    image: {
      type: STRING
    }
  });
  return Item;
};