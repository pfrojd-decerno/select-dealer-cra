import React from 'react';

import { fetchDealersApi } from './fetchDealersApi';
export const PRIMARY_C1 = '#2A78C6';
export const PRIMARY_C1_LIGHT = '#E8F5FF';
export const PRIMARY_C2 = '#999999';
export const PRIMARY_C2_MEDIUM = '#C0C0C6'; // used by Find N Try
export const PRIMARY_C2_LIGHT = '#C7C7C7'; // used by Find N Try
export const PRIMARY_C2_DARK = '#75757A';
export const SUGGESTION_HIGHLIGHT = 'F6F6F6';
export const WHITE = '#FFFFFF';


export const mapConfig = {
  font: {
    FONT_SIZE_ONE_REM: 1,
    FONT_WEIGHT_LIGHT: 300, // unused
    FONT_WEIGHT_NORMAL: 500,
    FONT_WEIGHT_BOLD: 700,
  },
  palette: {
    PRIMARY_C1: PRIMARY_C1,
    PRIMARY_C1_LIGHT: PRIMARY_C1_LIGHT,
    PRIMARY_C2: PRIMARY_C2,
    PRIMARY_C2_MEDIUM: PRIMARY_C2_MEDIUM,
    PRIMARY_C2_LIGHT: PRIMARY_C2_LIGHT,
    PRIMARY_C2_DARK: PRIMARY_C2_DARK,
    WHITE: WHITE,
  },
  fetchDealersApi: options => fetchDealersApi(options),
  sendGTMTrackEvents: {
    toggleDialog: opened => console.log('toggle dialog GTM', opened),
    onAutoCompleteSelect: () => console.log('onAutoCompleteChange GTM'),
    onChangeMapZoom: zoomAction =>
      console.log('change dealermap GTM', zoomAction),
    onClickDealerFromList: (name, index) =>
      console.log('clicked a dealer from list', name, 'index:', index),
    onClickChooseDealerBtn: (name, index) =>
      console.log('clicked CTA button list', name, 'index:', index),
  },
  customizations: {
    LoadingSpinner: <div>Loading</div>,
    minimumDealerResults: 2,
    maximumDealerResults: 25,
    countryCenterCoords: { lat: 51.50853, lng: -0.076132 },
    autoCompleteTypes: ['street_address', 'locality', 'premise', 'postal_code'],
    zoomLevels: {
      COUNTRY: 4,
      RESULT: {
        DEFAULT: 10,
        MIN: 7,
        MAX: 15,
      },
    },
  },
  elementIds: {
    dealerOptionName: 'dealerOptionName',
    dealerListChooseButton: 'dealerListChooseNow',
    dealerSearchAutoComplete: 'dealerSearchAutoComplete',
  },
  language: 'en',
  defaultLanguage: 'en',
  region: 'uk',
  intlStrings: {
    home: 'Home',
    dealer: 'Dealer',
    googleAutoCompletePlaceholder: 'TEMP: Enter an address, zip, or city',
    fetchError: 'Something went wrong :(',
    noDealerList:
      'Please use the search box above or enter your address on the main page to search for nearby dealers.',
    chooseDealer: 'Choose selected dealer',
  },
};
