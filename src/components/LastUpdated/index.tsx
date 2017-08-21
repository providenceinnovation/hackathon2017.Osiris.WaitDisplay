import * as React from 'react';
import * as style from './style.css';
import * as moment from 'moment';
import * as realTimeManager from '../../utils/realTimeManager';

export namespace LastUpdated {
  export interface Props {
    providerID: string;
  }

  export interface State {
    updateDateTime?: string,
  }

}

export class LastUpdated extends React.Component<LastUpdated.Props, LastUpdated.State> {
  constructor(props?: LastUpdated.Props, context?: any) {
    super(props, context);

    this.state = { updateDateTime: moment().format('MM/DD/YYYY h:mm a') };
  }
  componentDidMount () {
    realTimeManager.setupFirebase();
    realTimeManager.startListener(this.props.providerID, 'updateDateTime', (updatedValue) => {
      this.setState({updateDateTime: updatedValue });
    });
  }

  render() {
    return (
      <span className={style.main}>
        <span className={style.lastUpdatedLabel}>Last Updated:</span>
        <span className={style.lastUpdatedValue}>{ moment(this.state.updateDateTime).format('MM/DD/YYYY h:mm a')}</span>
      </span>
    );

  }
}
