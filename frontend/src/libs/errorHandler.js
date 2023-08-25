import * as ErrorMessage from './errorMessage'

class ErrorHandler {
  name = 'ERROR_HANDLER'
  message = ErrorMessage.GLOBAL
  enableDebug = process.env.DEBUG === '1'
  
  httpRequest(error) {
    this.name = 'HTTP_ERROR'

    if (this.enableDebug) console.log(`${this.name} -> ${error}`)
    if (error.response) {
      if (error.response.status > 500) {
        this.message = ErrorMessage.SERVER_5XX
      }

      if (error.response.status === 401) {
        this.message = ErrorMessage.INVALID_USER
      }

      this.message = error.response.data.message || this.message
    } else if (error.request) {
      this.message = ErrorMessage.SERVER_IS_GONE
    }

    const errObj = new Error(this.message)
    errObj.name = this.name

    return errObj
  }

  objectNotFound(error) {
    this.name = 'Object Not Found'

    if (this.enableDebug) console.log(`${this.name} -> ${error}`)

    this.message = ErrorMessage.OBJECT_NOT_FOUND
    const errObj = new Error(this.message)
    errObj.name = this.name
    
    return errObj
  }

  /**
   * 
   * @param {Object} params
   * @param {Object} params.error
   * @param {Object} params.state
   * @param {Object} params.setState
   */
  validation(params) {
    return params.setState({
      ...params.state,
      error: params.error.message,
      disabled: true
    })
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ErrorHandler()