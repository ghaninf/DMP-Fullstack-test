import axios from "axios";
import authHeader from "./auth-header";

class JobService {
  async getList(data) {
    const URL = `${process.env.REACT_APP_API_URL}/job/list`
    return axios
      .get(
        URL,
        {
          params: data,
          headers: authHeader()
        }
      )
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error
      })
  }

  async getDetail(id) {
    const URL = `${process.env.REACT_APP_API_URL}/job/:id`.replace(':id', id)
    return axios
      .get(
        URL,
        {
          headers: authHeader()
        }
      )
      .then(response => {
        return response.data
      })
      .catch(error => {
        throw error
      })
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new JobService();