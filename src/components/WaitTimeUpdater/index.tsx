import * as React from 'react';
import * as style from './style.css';
import * as realTimeManager from '../../utils/realTimeManager';
import Slider from 'react-toolbox/lib/slider';
import Switch from 'react-toolbox/lib/switch';
import { WAIT_TIME, ACCEPTING_NOW } from '../../constants/realTimeServiceTypes';

const PROVIDER_ID_DEFAULT:string = 'wa211134271';

export namespace WaitTimeUpdater {
  export interface Props {
    providerID: string;
  }

  export interface State {
    acceptingNow: boolean,
    waitTime: number,
  }
}

export class WaitTimeUpdater extends React.Component<WaitTimeUpdater.Props, WaitTimeUpdater.State> {
  constructor(props?: WaitTimeUpdater.Props, context?: any) {
    super(props, context);

    this.state = {
      acceptingNow: false,
      waitTime: 0
    };
  }

  handleSliderChange = (stateField, value) => {
    this.setState({...this.state, [stateField]: value});

    realTimeManager.updateWaitTime(this.props.providerID, value);
  };

  handleSwitchChange = (stateField, value) => {
    this.setState({...this.state, [stateField]: value});

    realTimeManager.updateAcceptingNow(this.props.providerID, value);
  };

  componentDidMount () {
    realTimeManager.setupFirebase();

    realTimeManager.startListener(this.props.providerID, WAIT_TIME, (updatedValue) => {
      console.log('Updated wait time:' + JSON.stringify(updatedValue));
      this.setState({...this.state, waitTime: updatedValue.value });
    });

    realTimeManager.startListener(this.props.providerID, ACCEPTING_NOW, (updatedValue) => {
      console.log('Updated accepting now:' + JSON.stringify(updatedValue));
      this.setState({...this.state, acceptingNow: updatedValue.value });
    });
  }

  render() {
    console.log('WaitTimeUpdater:render');
    const { acceptingNow, waitTime } = this.state;
    return (
      <div className={style.main}>
      <div>
        <p>Accepting New Patients</p>
        <Switch
          checked={acceptingNow}
          label="Accepting Now?"
          onChange={this.handleSwitchChange.bind(this, 'acceptingNow')}
        />
        </div>
        <div>
         <p>Current Wait Time</p>
         <Slider
          value={waitTime}
          onChange={this.handleSliderChange.bind(this, 'waitTime')}
          snaps={true}
          step={5}
          editable
          min={0}
          max={120} />
          </div>
      </div>
    );
  }
}
