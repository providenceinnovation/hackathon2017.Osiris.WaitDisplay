import * as React from 'react';
import * as style from './style.css';
import * as moment from 'moment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from '../../reducers';
import * as realTimeManager from '../../utils/realTimeManager';
import { WAIT_TIME, ACCEPTING_NOW } from '../../constants/realTimeServiceTypes';

export namespace WaitTimeWidget {
  export interface Props extends RouteComponentProps<void> {
    /* empty */
  }

  export interface State {
    waitTime: string,
    providerID: string,
    acceptingNow: boolean,
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export class WaitTimeWidget extends React.Component<WaitTimeWidget.Props, WaitTimeWidget.State> {
  constructor(props?: WaitTimeWidget.Props, context?: any) {
    super(props, context);

    this.state = { waitTime: 'Not available',
      providerID: realTimeManager.PROVIDER_ID_URGENT_CARE,
      acceptingNow: false
    };
  }

  componentDidMount () {
    realTimeManager.setupFirebase();

    realTimeManager.startListener(this.state.providerID, WAIT_TIME, (updatedTime) => {
      this.setState({waitTime: updatedTime.value});
    });

    realTimeManager.startListener(this.state.providerID, ACCEPTING_NOW, (updatedToggle) => {
      this.setState({acceptingNow: updatedToggle.value});
    });
  }

  render() {
    // load the provider ID query string param
    const params = new URLSearchParams(this.props.location.search);
    const providerID = params.get('providerID');
    if (providerID) {
      this.setState({ providerID });
    }

    const { waitTime } = this.state;
    return (
      <div className={style.main}>
        <div className={style.acceptingNowLabel}>
          { this.state.acceptingNow ? 'Currently accepting patients.' : 'Not accepting patients today.' }
        </div>
        <div className={style.timeLabel}>
          Current Wait Time:
        </div>
        <div className={style.timeValue}>
          <span className={style.timeNumberValue}>{waitTime}</span>
          <span className={style.timeNumberLabel}>minutes</span>
        </div>
        <div className={style.lastUpdatedLabel}>
          Last Updated:
        </div>
        <div className={style.lastUpdatedValue}>
        { moment().format('YYYY-MM-DD h:mm:ss a') }
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
