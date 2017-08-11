import * as React from 'react';
import * as style from './style.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from '../../reducers';
import { ServiceLocationUpdater } from '../../components';
import * as realTimeManager from '../../utils/realTimeManager';

/* Container used to update for multiple services */
export namespace ControllerMulti {
  export interface Props extends RouteComponentProps<void> {
    /* empty */
  }

  export interface State {
    /* empty */
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export class ControllerMulti extends React.Component<ControllerMulti.Props, ControllerMulti.State> {

  render() {
    const providerList = [
      { id: "wa21156026d", name: "Renton Clinic" },
      { id: "wa21156026b", name: "North Seattle Clinic" },
      { id: "wa21156026a", name: "Columbia Clinic" },
      { id: "wa21156026c", name: "Eastgate Clinic" }
    ];

    let providerComponents = providerList.map((provider) => {
      return <ServiceLocationUpdater providerID={provider.id} providerName={provider.name} />
    });

    return (
      <div className={style.main}>
        <div className={style.header}>
          <img src={require('../../images/KingCountyLogo.png')} />
          <h1>Seattle & King County<br/>Public Health Centers</h1>
        </div>
        <div className={style.componentContainer} >
          <div className={style.componentHeader} >
            <div>
              <span>Update Clinic Availability</span><span className={style.lastUpdated}>LAST UPDATE 08/10/17 04:43PM</span>
            </div>
            <div>
              <img src={require('../../images/WaitTimeIcon.png')} />
              <span>Appointment Availability</span>
            </div>
          </div>
          <hr />
          <div className={style.componentGrid} >
            {providerComponents}
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
