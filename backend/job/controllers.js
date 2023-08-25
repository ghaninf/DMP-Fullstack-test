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
      let config = {
        method: 'get',
        url: url,
        headers: {
          'Content-Type': 'application/json',
        },
      }

      let totalDocs = await axios(config)
        .then(response => {
          return response.data.length
        })
        .catch(error => {
          throw error
        })

      if (query.page) {
        url = url + '?page=' + page
      }
      if (query.description && query.description !== '') {
        url = url + '&description=' + query.description
      }
      if (query.location && query.description !== '') {
        url = url + '&location=' + query.location
      }

      config.url = url

      axios(config)
        .then((response) => {
          if (!response.data) {
            return res
              .status(200)
              .json(Pagination
                .buildPagination(
                  res.data,
                  {
                    limit: limit,
                    page: page,
                    total: totalDocs,
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
                  total: totalDocs,
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