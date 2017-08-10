import * as React from 'react';
import { Dispatch } from 'react-redux';
import * as WaitTimeActions from '../../actions/waittime';
import * as style from './style.css';
import { startListening } from '../../actions/waitTime';

export namespace WaitTime {
  export interface Props {
    waitTimeData: WaitTimeData;
    actions: typeof WaitTimeActions;
  }

  export interface State {
    /* empty */
  }
}

export class WaitTime extends React.Component<WaitTime.Props, WaitTime.State> {

  constructor(props?: WaitTime.Props, context?: any) {
    super(props, context);
  }

  componentDidMount () {
    // const { dispatch } = this.props

    //this.props.actions.startListening();
    // dispatch(startListening())
    Dispatch(startListening());
  }

  render() {
    console.log('render waittime');
    const { waitTimeData } = this.props;
    return (
      <div className={style.main}>
        {waitTimeData.waitTime}
      </div>
    );
  }
}
