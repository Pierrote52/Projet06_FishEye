const uuid = require('uuid/v1');
const Data = require('../models/Data');

exports.getAllDatas = (req, res, next) => {
  Data.find().then(
    (datas) => {
      const mappedDatas = datas.map((data) => {
       return data;
      });
      res.status(200).json(mappedDatas);
    }
  ).catch(
    () => {
      res.status(500).send(new Error('Database error!'));
    }
  );
};
