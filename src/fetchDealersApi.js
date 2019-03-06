export async function fetchDealersApi(options) {
    const { bounds, market = 'uk', lang = 'en' } = options;
  
    const url =
      'https://www.volvocars.com/api/dealerlocator/v1/dealers/testDrive/findInBounds?' +
      'market_id=' +
      'uk' +
      '&language_id=' +
      lang +
      '&nwLongitude=' +
      bounds.nw.lng +
      '&nwLatitude=' +
      bounds.nw.lat +
      '&seLongitude=' +
      bounds.se.lng +
      '&seLatitude=' +
      bounds.se.lat;
  
    // const url = '../../dealers.json';
  
    try {
      const res = await fetch(url);
      return res.json();
    } catch (error) {
      return {
        hasError: true,
        error: error,
      };
    }
  }
  