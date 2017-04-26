"use strict";
require("../models");

module.exports = function(sequelize, DataType) {
    var Word = sequelize.define('Word',
        {
            spelling: {
                type: DataType.STRING,
                field: 'spelling'
            }
        }, {
            classMethods: {
                associate: function(models) {
                    Word.hasMany(models.Meaning);
                }
            }
        }
    );

    return Word;
};
