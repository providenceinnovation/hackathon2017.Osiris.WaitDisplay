import * as React from 'react';
import * as style from './style.css';
import * as realTimeManager from '../../utils/realTimeManager';
import { ACCEPTING_NOW } from '../../constants/realTimeServiceTypes';

export namespace Toggle {
  export interface Props {
    providerID: string;
  }

  export interface State {
    toggle: string,
  }
}

export class Toggle extends React.Component<Toggle.Props, Toggle.State> {

  constructor(props?: Toggle.Props, context?: any) {
    super(props, context);

    this.state = { toggle: 'Not available' };
  }

  componentDidMount () {
    realTimeManager.setupFirebase();

    realTimeManager.startListener(this.props.providerID, ACCEPTING_NOW, (updatedToggle) => {
      console.log('Updated toggle:' + JSON.stringify(updatedToggle));
      this.setState({toggle: updatedToggle.value});
    });
  }

  render() {
    // const { availableNow } = this.state.toggle;
    console.log(this.state);
    return (
      <div className={style.main}>
        <div className={this.state.toggle ? style.available : style.notAvailable}>{this.state.toggle ? "Accepting new patients": 'Not accepting new patients'}</div>
      </div>
    );
  }
}
