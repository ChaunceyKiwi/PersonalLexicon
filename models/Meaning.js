"use strict";
require("../models");

module.exports = function(sequelize, DataType) {
    var Meaning = sequelize.define('Meaning',
        {
            POS: {
                type: DataType.STRING,
                field: 'POS'
            },
            definition: {
                type: DataType.STRING,
                field: 'definition'
            },
            synonyms: {
                type: DataType.STRING,
                field: 'synonyms'
            },
            antonyms: {
                type: DataType.STRING,
                field: 'antonyms'
            },
            example: {
                type: DataType.STRING,
                field: 'example'
            }
        }, {
            classMethods: {
                associate: function(models) {
                    Meaning.belongsToMany(models.Word, {
                        through: 'Words_Meanings'
                    });
                }
            }
        }
    );

    return Meaning;
};
