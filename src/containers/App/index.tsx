import * as React from 'react';
import * as style from './style.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from '../../reducers';
import { WaitTime, Toggle, ToggleList, LastUpdated } from '../../components';
import * as realTimeManager from '../../utils/realTimeManager';

export namespace App {
  export interface Props extends RouteComponentProps<void> {
    /* empty */
  }

  export interface State {
    /* empty */
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export class App extends React.Component<App.Props, App.State> {

  render() {
    // load the provider ID query string param
    const params = new URLSearchParams(this.props.location.search);
    const providerID = params.get('providerID') || realTimeManager.PROVIDER_ID_URGENT_CARE;

    const { children } = this.props;
    return (
      <div>
        <header><img src={require('../../images/CareIQLogo.png')} /></header>
        <div className={style.main}>
          <div className={style.header}>
            <img src={require('../../images/SoundMentalLogo.png')} />
            <h1>Sound Mental Health<br />of Seattle</h1>
          </div>
          <div className={style.componentContainer}>
            <div className={style.componentHeader} >
              <div>
                <span>Welcome to the Waiting Room</span>
                <LastUpdated providerID={providerID} />
              </div>
            </div>
            <div className={style.componentContainerLayout}>
              <div className={style.componentItem}>
                <div className={style.componentItemHeader}>
                  <img src={require('../../images/WaitTimeIcon.png')} />
                  <span>Wait Time</span>
                </div>
                <hr />
                <div className={style.componentGrid} >

                  <WaitTime providerID={providerID} />
                </div>
                <hr />
                <div className={style.componentGrid} >
                  <Toggle providerID={providerID} />
                </div>
              </div>
              <div className={style.componentItem}>
                <div className={style.componentItemHeader}>
                  <img src={require('../../images/InsuranceIcon.png')} />
                  <span>Accepted Insurance</span>
                </div>
                <hr />
                <div className={style.componentGrid} >
                  <ToggleList providerID={providerID} />
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}
