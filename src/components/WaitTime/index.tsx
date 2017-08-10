import * as React from 'react';
import * as style from './style.css';
import * as waitTimeUtils from '../../utils/waitTime';

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

    this.state = {waitTime: 'Not available'};
  }

  componentDidMount () {
    waitTimeUtils.setupFirebase();

    waitTimeUtils.startListening(this.props.providerID, (updatedTime) => {
      console.log('updated wait time:' + updatedTime);
      this.setState({waitTime: updatedTime + ' minutes'});
    });
  }

  render() {
    const { waitTime } = this.state;
    return (
      <div className={style.main}>
        {waitTime}
      </div>
    );
  }
}
