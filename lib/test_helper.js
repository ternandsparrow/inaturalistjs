"use strict";

var testHelper = class testHelper {
  static mockResponse( uri ) {
    return {
      total_results: 1,
      page: 1,
      per_page: 1,
      test_uri: uri,
      results: [{ id: 1 }]
    };
  }
}

module.exports = testHelper;
