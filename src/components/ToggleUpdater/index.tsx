import * as React from 'react';
import * as style from './style.css';
import * as realTimeManager from '../../utils/realTimeManager';
import Switch from 'react-toolbox/lib/switch';

export namespace ToggleUpdater {
  export interface Props {
    providerID: string;
    serviceType: string;
    description: string;
  }

  export interface State {
    controlValue: boolean,
  }
}

export class ToggleUpdater extends React.Component<ToggleUpdater.Props, ToggleUpdater.State> {
  constructor(props?: ToggleUpdater.Props, context?: any) {
    super(props, context);

    this.state = {
      controlValue: false
    };

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle = () => {
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
      <div className={style.main}>
        <span className={style.description}>{this.props.description}</span>
        <div className={style.controlContainer}>
          <Switch
            checked={controlValue}
            onChange={this.handleToggle}
          />
        </div>
      </div>
    );
  }
}
