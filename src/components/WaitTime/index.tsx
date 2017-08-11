import * as React from 'react';
import * as style from './style.css';
import * as realTimeManager from '../../utils/realTimeManager';
import { WAIT_TIME } from '../../constants/realTimeServiceTypes';

export namespace WaitTime {
  export interface Props {
    providerID: string;
  }

  export interface State {
    waitTime: string,
  }
}

export class WaitTime extends React.Component<WaitTime.Props, WaitTime.State> {

  constructor(props?: WaitTime.Props, context?: any) {
    super(props, context);

    this.state = { waitTime: 'Not available' };
  }

  componentDidMount () {
    realTimeManager.setupFirebase();

    realTimeManager.startListener(this.props.providerID, WAIT_TIME, (updatedTime) => {
      console.log('Updated wait time:' + JSON.stringify(updatedTime));
      this.setState({waitTime: updatedTime.value});
    });
  }

  render() {
    const { waitTime } = this.state;
    return (
      <div className={style.main}>
        <div className={style.time}>{waitTime}</div>
        <div className={style.minutes}>minutes</div>
      </div>
    );
  }
}
