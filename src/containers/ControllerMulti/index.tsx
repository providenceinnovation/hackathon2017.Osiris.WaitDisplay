import * as React from 'react';
import * as style from './style.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from '../../reducers';
import { WaitTimeUpdater } from '../../components';
import * as realTimeManager from '../../utils/realTimeManager';

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
    // load the provider ID query string param
    const params = new URLSearchParams(this.props.location.search);
    const providerID = params.get('providerID') || realTimeManager.PROVIDER_ID_DENTAL;

    const { children } = this.props;
    console.log('updater render');
    return (
      <div className={style.normal}>
        <WaitTimeUpdater providerID={providerID} />
        {children}
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
