const SHA1 = require('sha1');
const { Token, Pagination } = require("../libs");
const db = require("../db/db_config");
const axios = require('axios');


const JobController = {
  async getList(req, res, next) {
    try {
      const query = req.query
      const { page, offset, limit } = Pagination
        .getSpec(query.page, query.limit);

      let url = `http://dev3.dansmultipro.co.id/api/recruitment/positions.json`;

      if (query.page) {
        url = url + '?page=' + page
      }
      console.log(url)
      if (query.search) {
        
      }

      const config = {
        method: 'get',
        url: url,
        headers: {
          'Content-Type': 'application/json',
        },
      }

      axios(config)
        .then((response) => {
          if (!response.data) {
            return res
              .status(200)
              .json(Pagination
                .buildPagination(
                  [],
                  {
                    limit: limit,
                    page: page,
                    total: 0,
                  }))
          }

          return res
            .status(200)
            .json(Pagination
              .buildPagination(
                response.data,
                {
                  limit: limit,
                  page: page,
                  total: response.data.length,
                }))
        })
        .catch((error) => {
          throw error
        });

      return 
    } catch (error) {
      next(error);
    }
  },
  
  async get(req, res, next) {
    try {
      const id = req.params.id
      data = []
      return res
        .status(200)
        .json(data);
    } catch (error) {
      next(error);
    }
  },
}

module.exports = JobController;