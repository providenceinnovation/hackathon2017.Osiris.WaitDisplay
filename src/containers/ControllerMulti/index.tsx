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
      { id: "wa21156026a", name: "Columbia Public Health Center Dental Clinic" },
      { id: "wa21156026b", name: "North Seattle Dental Clinic" },
      { id: "wa21156026c", name: "Eastgate Public Health Center Dental Clinic" },
      { id: "wa21156026d", name: "Renton Public Health Center Dental Clinic" }
    ];

    let providerComponents = providerList.map((provider) => {
      console.log('adding:' + provider.name);
      return <ServiceLocationUpdater providerID={provider.id} providerName={provider.name} />
    });
    console.log(providerComponents);
    return (
      <div className={style.main}>
        {providerComponents}
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
