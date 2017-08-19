import * as React from 'react';
import * as style from './style.css';
import * as moment from 'moment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from '../../reducers';
import * as realTimeManager from '../../utils/realTimeManager';
import { ACCEPTING_NOW, ACCEPTING_EMERGENCY_NOW } from '../../constants/realTimeServiceTypes';
import { NUMBER_OF_DENTAL_APPTS_ADULT, NUMBER_OF_DENTAL_APPTS_PEDIATRIC } from '../../constants/realTimeServiceTypes';

export namespace DentalWidget {
  export interface Props extends RouteComponentProps<void> {
    /* empty */
  }

  export interface State {
    providerID: string,
    openAdultAppointments: string,
    openPediatricAppointments: string,
    acceptingNow?: boolean,
    acceptingEmergency?: boolean,
    updateDateTime?: string,
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export class DentalWidget extends React.Component<DentalWidget.Props, DentalWidget.State> {
  constructor(props?: DentalWidget.Props, context?: any) {
    super(props, context);

    this.state = {
      providerID: realTimeManager.PROVIDER_ID_DENTAL,
      openAdultAppointments: "0",
      openPediatricAppointments: "0",
      acceptingNow: undefined,
      acceptingEmergency: undefined,
      updateDateTime: moment().format('MM/DD/YYYY h:mm a'),
    };
  }

  componentDidMount () {
    realTimeManager.setupFirebase();

    realTimeManager.startListener(this.state.providerID, ACCEPTING_NOW, (updatedValue) => {
      this.setState({acceptingNow: updatedValue.value});
    });
    realTimeManager.startListener(this.state.providerID, ACCEPTING_EMERGENCY_NOW, (updatedValue) => {
      this.setState({acceptingEmergency: updatedValue.value});
    });
    realTimeManager.startListener(this.state.providerID, NUMBER_OF_DENTAL_APPTS_ADULT, (updatedValue) => {
      this.setState({openAdultAppointments: updatedValue.value});
    });
    realTimeManager.startListener(this.state.providerID, NUMBER_OF_DENTAL_APPTS_PEDIATRIC, (updatedValue) => {
      this.setState({openPediatricAppointments: updatedValue.value});
    });
    realTimeManager.startListener(this.state.providerID, 'updateDateTime', (updatedValue) => {
      this.setState({updateDateTime: updatedValue });
    });
  }

  render() {
    // load the provider ID query string param
    const params = new URLSearchParams(this.props.location.search);
    const providerID = params.get('providerID');
    if (providerID) {
      this.setState({ providerID });
    }

    const { openAdultAppointments,
      openPediatricAppointments,
      acceptingNow,
      acceptingEmergency } = this.state;
    var appointmentsVisibleStage = (this.state.acceptingNow || this.state.acceptingEmergency) ? 'visible' : 'hidden';
    return (
      <div className={style.main}>

        <div className={style.availabilityGrid}>
          <div className={style.acceptingNowIcon}>
            <img src={this.state.acceptingNow ?  require('../../images/Accepting.png') : require('../../images/NotAccepting.png')} />
          </div>
          <div className={style.acceptingNowLabel}>
            { this.state.acceptingNow ? 'Accepting patients.' : 'Not accepting patients' }
          </div>
          <div className={style.acceptingEmergencyNowIcon}>
            <img src={this.state.acceptingEmergency ?  require('../../images/Emergency.png') : require('../../images/NoEmergency.png')} />
          </div>
          <div className={style.acceptingEmergencyNowLabel}>
            { this.state.acceptingEmergency ? 'Accepting emergency patients.' : 'Not accepting emergency patients' }
          </div>
          <div className={style.openAdultApptValue} style={{visibility: appointmentsVisibleStage}}>
            {openAdultAppointments}
          </div>
          <div className={style.openAdultApptLabel} style={{visibility: appointmentsVisibleStage}}>
            Open Adult Appointments
          </div>
          <div className={style.openPediatricApptValue} style={{visibility: appointmentsVisibleStage}}>
            {openPediatricAppointments}
          </div>
          <div className={style.openPediatricApptLabel} style={{visibility: appointmentsVisibleStage}}>
            Open Pediatric Appointments
          </div>
        </div>
        <div className={style.updatedGrid}>
          <div className={style.lastUpdatedLabel} style={{visibility: appointmentsVisibleStage}}>
            Last Updated:
          </div>
          <div className={style.lastUpdatedValue}>
          { moment(this.state.updateDateTime).format('MM/DD/YYYY h:mm a')}
          </div>
          <div className={style.poweredByLabel}>
            Real time availability data supported by DIG
          </div>
          <div className={style.poweredByImage}>
            <img src={require('../../images/logo-dig.png')} />
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
