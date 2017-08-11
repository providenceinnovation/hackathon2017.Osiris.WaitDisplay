import * as React from 'react';
import * as style from './style.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from '../../reducers';
import { WaitTime, ToggleList } from '../../components';
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
      <div className={style.main}>
        <div className={style.header}>
          <img src={require('../../images/SoundMentalLogo.png')} />
          <h1>Sound Mental Health<br />of Seattle</h1>
        </div>
        <div className={style.componentContainer}>
          <div className={style.componentHeader} >
            <div>
              <span>Availability</span><span className={style.lastUpdated}> LAST UPDATE 08/10/17 04:43PM</span>
            </div>
          </div>
          <div className={style.componentContainerLayout}>
            <div className={style.componentItem}>
              <div className={style.componentItemHeader}>
                <img src={require('../../images/WaitTimeIcon.png')} />
                <span>Bed Availability</span>
              </div>
              <hr />
              <div className={style.componentGrid} >

                <WaitTime providerID={providerID} />
              </div>
            </div>
            <div className={style.componentItem}>
              <div className={style.componentItemHeader}>
                <img src={require('../../images/InsuranceIcon.png')} />
                <span>Insurance</span>
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
