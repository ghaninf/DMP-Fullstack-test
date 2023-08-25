class Pagination {
  /**
   * 
   * @param {String|Number} page 
   * @param {String|Number} limit 
   * @returns 
   */
  static getSpec(page, limit) {
    let tempPage = parseInt(page);
    let tempLimit = parseInt(limit);

    if (!tempPage || tempPage < 1) tempPage = 1;
    if (!tempLimit || tempLimit > 10 || tempLimit < 1) tempLimit = 10;

    const offset = tempLimit * tempPage;

    return {
      page: tempPage,
      offset: offset,
      limit: tempLimit
    };
  }

  /**
   * 
   * @param {Array} items 
   * @param {Object} pageSpec
   * @param {String|Number} pageSpec.limit
   * @param {String|Number} pageSpec.page
   * @param {String|Number} pageSpec.total
   * @returns 
   */
  static buildPagination(items, pageSpec) {
    return {
      data: items,
      page: {
        limit: parseInt(pageSpec.limit),
        page: parseInt(pageSpec.page),
        total: parseInt(pageSpec.total)
      }
    };
  }
} 

module.exports = Pagination;