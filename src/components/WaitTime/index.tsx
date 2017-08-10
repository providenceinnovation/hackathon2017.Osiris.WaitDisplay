import * as React from 'react';
import * as style from './style.css';
import * as waitTimeUtils from '../../utils/waitTime';

const PROVIDER_ID_DEFAULT:string = 'wa211134271';

export namespace WaitTime {
  export interface Props {
    // empty
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

    waitTimeUtils.startListening(PROVIDER_ID_DEFAULT, (updatedTime) => {
      console.log('updated wait time:' + updatedTime);
      this.setState({waitTime: updatedTime});
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
