import * as React from 'react';
import * as style from './style.css';
import * as realTimeManager from '../../utils/realTimeManager';
import Slider from 'react-toolbox/lib/slider';
import Switch from 'react-toolbox/lib/switch';

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

    realTimeManager.getProvider(this.props.providerID).then((provider) => {
      console.log(`WaitTimeUpdater:updating the state with the last server info:${JSON.stringify(provider)}`);
      this.setState({...this.state, waitTime: provider.waitTime });
      this.setState({...this.state, acceptingNow: provider.acceptingNow });
    }).catch((reason) => {
      console.error('Failed to retrieve the provider on the wait time updater:' + reason);
    });

  }

  render() {
    console.log('WaitTimeUpdater:render');
    const { acceptingNow, waitTime } = this.state;
    return (
      <div className={style.main}>
         <p>Current Wait Time</p>
         <Slider
          value={waitTime}
          onChange={this.handleSliderChange.bind(this, 'waitTime')}
          snaps={true}
          step={5}
          editable
          min={0}
          max={120} />
        <p>Accepting New Patients</p>
        <Switch
          checked={acceptingNow}
          label="Accepting Now?"
          onChange={this.handleSwitchChange.bind(this, 'acceptingNow')}
        />
      </div>
    );
  }
}
