import * as React from 'react';
import * as style from './style.css';
// import * as realTimeManager from '../../utils/realTimeManager';
import { NumberCounterUpdater } from '..';
import { ToggleUpdater } from '..';

/* Container for the updaters for a single service */
export namespace ServiceLocationUpdater {
  export interface Props {
    providerID: string;
    providerName: string;
  }

  export interface State {

  }
}

export class ServiceLocationUpdater extends React.Component<ServiceLocationUpdater.Props, ServiceLocationUpdater.State> {
  constructor(props?: ServiceLocationUpdater.Props, context?: any) {
    super(props, context);

    this.state = {

    };
  }

  componentDidMount () {
    // get provider
    console.log('mounted');
  }

  render() {
      let widgets = [
      {
        serviceType: 'numberDentalAppointmentsChildren',
        description: 'Pediatric'
      },
      {
        serviceType: 'numberDentalAppointmentsAdult',
        description: 'Adults'
      },
    ];

    /* TODO
    Pull the realTime list from firebase
    Retrieve the service types from the realTimeManager - should be cached
    Iterate the list and render widgets for each service type
    */
    let widgetComponents = widgets.map((widget) => {
      return <NumberCounterUpdater providerID={this.props.providerID} serviceType={widget.serviceType} description={widget.description} />
    });
    return (
      <div className={style.main}>
        <h3>{this.props.providerName}</h3>
        {widgetComponents}
        <ToggleUpdater providerID={this.props.providerID} serviceType="acceptingNow" description="Accepting patients?" />
        <ToggleUpdater providerID={this.props.providerID} serviceType="acceptingEmergencyNow" description="Emergency?" />
      </div>
    );
  }
}
