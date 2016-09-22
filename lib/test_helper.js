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

  static taxonResponse( uri ) {
    return Object.assign( testHelper.mockResponse( uri ), {
      results: [
        {
          id: 1,
          default_photo: {
            square_url: "https://farm4.staticflickr.com/3194/2640144803_219b9ab6c5_s.jpg",
            attribution: "(c) Ken-ichi, some rights reserved (CC BY-NC)",
            medium_url: "https://farm4.staticflickr.com/3194/2640144803_219b9ab6c5.jpg",
            id: 1287,
            license_code: "cc-by-nc",
            url: "https://farm4.staticflickr.com/3194/2640144803_219b9ab6c5_s.jpg"
          },
          photos: [
            {
              square_url: "https://farm4.staticflickr.com/3194/2640144803_219b9ab6c5_s.jpg",
              native_page_url: "https://www.flickr.com/photos/ken-ichi/2640144803/",
              small_url: "https://farm4.staticflickr.com/3194/2640144803_219b9ab6c5_m.jpg",
              attribution: "(c) Ken-ichi, some rights reserved (CC BY-NC)",
              medium_url: "https://farm4.staticflickr.com/3194/2640144803_219b9ab6c5.jpg",
              id: 1287,
              license_code: "cc-by-nc",
              large_url: "https://farm4.staticflickr.com/3194/2640144803_219b9ab6c5_b.jpg",
              url: "https://farm4.staticflickr.com/3194/2640144803_219b9ab6c5_s.jpg",
              original_dimensions: null
            },
            {
              square_url: "https://farm4.staticflickr.com/3194/2640144803_219b9ab6c5_s.jpg",
              native_page_url: "https://www.flickr.com/photos/ken-ichi/2640144803/",
              small_url: "https://farm4.staticflickr.com/3194/2640144803_219b9ab6c5_m.jpg",
              attribution: "(c) Ken-ichi, some rights reserved (CC BY-NC)",
              medium_url: "https://farm4.staticflickr.com/3194/2640144803_219b9ab6c5.jpg",
              id: 1288,
              license_code: "cc-by-nc",
              large_url: "https://farm4.staticflickr.com/3194/2640144803_219b9ab6c5_b.jpg",
              url: "https://farm4.staticflickr.com/3194/2640144803_219b9ab6c5_s.jpg",
              original_dimensions: null
            }
          ]
        }
      ]
    } );
  }
}

module.exports = testHelper;
