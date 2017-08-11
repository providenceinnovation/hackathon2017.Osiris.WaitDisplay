import * as React from 'react';
import * as style from './style.css';
import * as realTimeManager from '../../utils/realTimeManager';

export namespace ToggleListItemUpdater {
  export interface Props {
    providerID: string;
    serviceType: string;
    description: string;
  }

  export interface State {
    controlValue: boolean,
  }
}

export class ToggleListItemUpdater extends React.Component<ToggleListItemUpdater.Props, ToggleListItemUpdater.State> {
  constructor(props?: ToggleListItemUpdater.Props, context?: any) {
    super(props, context);

    this.state = {
      controlValue: false
    };

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle = () => {
    console.log('handling toggle');
    let updateValue: boolean = true;
    if (this.state.controlValue) {
      updateValue = false;
    }

    this.setState({controlValue: updateValue});
    realTimeManager.updateRealTimeValue(this.props.providerID, this.props.serviceType, updateValue);
  };

  componentDidMount () {
    realTimeManager.setupFirebase();

    realTimeManager.startListener(this.props.providerID, this.props.serviceType, (updatedValue) => {
      console.log(`ToggleUpdater:${this.props.serviceType}:Updated value:${JSON.stringify(updatedValue)}`);

      this.setState({...this.state, controlValue: updatedValue.value });
    });
  }

  render() {
    const { controlValue } = this.state;

    return (
      <div onClick={this.handleToggle} className={this.state.controlValue ? style.insuranceCardOn : style.insuranceCardOff}>
        {this.props.description}
        </div>
    );
  }
}
