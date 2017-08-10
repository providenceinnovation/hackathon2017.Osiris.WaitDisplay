import * as React from 'react';
import * as style from './style.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from '../../reducers';
import { WaitTimeUpdater } from '../../components';
import * as waitTimeUtils from '../../utils/waitTime';

export namespace Updater {
  export interface Props extends RouteComponentProps<void> {
    /* empty */
  }

  export interface State {
    /* empty */
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export class Updater extends React.Component<Updater.Props, Updater.State> {

  render() {
    // load the provider ID query string param
    const params = new URLSearchParams(this.props.location.search);
    const providerID = params.get('providerID') || waitTimeUtils.PROVIDER_ID_DEFAULT;

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
