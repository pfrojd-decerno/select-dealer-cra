import React, { Component } from 'react';
import { mapConfig } from './mapConfig';
import DealerListComponent from 'volvo-dealer-map/dist/DealerList';
import DealerMap from 'volvo-dealer-map/dist/DealerMap';
import DealerSearch from 'volvo-dealer-map/dist/DealerSearch';


const userInputCoords = { lat: 51.50853, lng: -0.076132 };

class DealerMapWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      hasManuallySelectedDealer: false,
      dealerList: [],
      dealerDialogOpen: false,
      mapReady: false,
      justDidNewAddressSearchInDialog: false,
      coordsFromNewSearch: null,
      dealerListIndex: -1,
      selectedRetailer: {
        address: {
          country: 'United kingdom',
          city: 'LONDON',
          district: 'London',
          postalCode: 'W4 5PY',
          addressLine1: '115 Power Road',
          addressLine2: 'Chiswick',
          addressLine3: 'W4 5PY',
          addressLine4: '',
          addressLine5: '',
        },
        phone: '020 8834 5858',
        dealerId: 'AD4GV',
        name: 'Volvo Cars West London',
        geoCode: {
          latitude: 51.4941,
          longitude: -0.27987,
        },
        vccDealerId: 'UK56863',
      },
      location: null,
    };

    this.onFinished = this.onFinished.bind(this);
    this.onSelectRetailer = this.onSelectRetailer.bind(this);
    this.onReceiveSelectedDealer = this.onReceiveSelectedDealer.bind(this);
    this.handleJustDidNewAddressSearchInDialog = this.handleJustDidNewAddressSearchInDialog.bind(
      this
    );
    this.onSaveDealerListFromMap = this.onSaveDealerListFromMap.bind(this);
    this.handleMapReady = this.handleMapReady.bind(this);
    this.onSelectDealerFromChild = this.onSelectDealerFromChild.bind(this);
    this.onFetchError = this.onFetchError.bind(this);
  }

  handleMapReady() {
    this.setState({ mapReady: true });
  }

  onFinished() {
    const { history, setRetailer } = this.props;
    const { selectedRetailer } = this.state;
    setRetailer(selectedRetailer.name);
    history.push('/dealer/calendar');
  }

  onSelectRetailer(retailer) {
    const { selectedRetailer } = this.state;
    if (!selectedRetailer) {
      this.setState({
        selectedRetailer: retailer,
      });
      return;
    }

    if (retailer.dealerId === selectedRetailer.dealerId) {
      this.setState({
        selectedRetailer: null,
      });
      return;
    }

    this.setState({
      selectedRetailer: retailer,
    });
  }

  onReceiveSelectedDealer(dealer) {
    this.setState({ selectedRetailer: dealer });
  }

  handleJustDidNewAddressSearchInDialog() {
    this.setState({ justDidNewAddressSearchInDialog: true });
  }

  onSaveDealerListFromMap(dealerList) {
    this.setState({
      dealerList: dealerList,
      justDidNewAddressSearchInDialog: false,
    });
  }

  handleAutosuggestSelect(newSearchGeoCode) {
    const { dealerList, selectedRetailer } = this.state;
    this.setState({
      coordsFromNewSearch: newSearchGeoCode,
      dealerListIndex: dealerList.indexOf(selectedRetailer),
    });
  }

  onSelectDealerFromChild(dealer) {
    const index = this.state.dealerList.indexOf(dealer);
    this.setState({ selectedRetailer: dealer, dealerListIndex: index });
  }

  onFetchError() {
      console.log('failed to fetch');
  }

  render() {
    const _selectedDealerCoords =
      typeof this.state.selectedRetailer === 'undefined'
        ? null
        : this.state.selectedRetailer.geoCode;

    const _centerCoords =
      // descr: apply null values until context is accurate. If new search done inside dealer dialog, give highest priority.
      //        If user has manually selected a dealer from the dealerList inside dialog (via button) center map on selectedDealer's geoCode
      //        If user hasn't manually selected a dealer, center map on their home, if available. If not, center on assigned dealer's geoCode.
      //        If no useful coordinates available, center map on middle of country
      this.state.coordsFromNewSearch ||
      (this.state.hasManuallySelectedDealer || this.state.centerOnSelectedDealer
        ? _selectedDealerCoords
        : this.state.userCoordsFromGlobalState || _selectedDealerCoords) ||
      null;

    return (
      <div className="dealer-map">
        <div className="dealer-map__map" style={{height: "400px"}}>
          <DealerMap
            config={mapConfig}
            activeDealer={this.state.selectedRetailer}
            onSaveDealerListFromMap={this.onSaveDealerListFromMap}
            onSelectDealerFromMap={this.onSelectDealerFromChild}
            centerCoords={_centerCoords}
            justDidNewAddressSearchInDialog={
              this.state.justDidNewAddressSearchInDialog
            }
            userCoordsFromGlobalState={userInputCoords}
            mapReady={this.state.mapReady}
            handleMapReady={this.handleMapReady}
            onFetchError={this.onFetchError}
            useOnlyForRetrievingDealer={false}
            onReceiveClosestDealer={this.onReceiveClosestDealer} // unused
          />
        </div>
        <div className="dealer-map__search">
          <DealerSearch
            config={mapConfig}
            onClick={() => console.log('click')}
            handleAutosuggestSelect={this.handleAutosuggestSelect}
            handleJustDidNewAddressSearchInDialog={
              this.handleJustDidNewAddressSearchInDialog
            }
          />
        </div>
        <div className="dealer-map__list">
          <DealerListComponent
            config={mapConfig}
            centerCoords={_centerCoords}
            hasError={this.state.hasError}
            index={this.state.dealerListIndex}
            activeDealer={this.state.selectedRetailer}
            dealerList={this.state.dealerList}
            mapReady={this.state.mapReady}
            onSubmitDealer={this.onSubmitDealer}
            onClickChooseDealerBtn={this.onSelectDealerFromChild}
          />
        </div>
      </div>
    );
  }
}


export default DealerMapWrapper;