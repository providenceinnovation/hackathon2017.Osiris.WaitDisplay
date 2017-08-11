import * as React from 'react';
import * as style from './style.css';
import * as realTimeManager from '../../utils/realTimeManager';
import Slider from 'react-toolbox/lib/slider';

export namespace NumberSliderUpdater {
  export interface Props {
    providerID: string;
    serviceType: string;
    description: string;
  }

  export interface State {
    controlValue: number,
  }
}

export class NumberSliderUpdater extends React.Component<NumberSliderUpdater.Props, NumberSliderUpdater.State> {
  constructor(props?: NumberSliderUpdater.Props, context?: any) {
    super(props, context);

    this.state = {
      controlValue: 0
    };
  }

  handleSliderChange = (stateField, updatedValue) => {
    this.setState({...this.state, controlValue: updatedValue});

    realTimeManager.updateWaitTime(this.props.providerID, updatedValue);
  };

  componentDidMount () {
    realTimeManager.setupFirebase();

    realTimeManager.startListener(this.props.providerID, this.props.serviceType, (updatedValue) => {
      console.log(`NumberSliderUpdater:${this.props.serviceType}:Updated value:${JSON.stringify(updatedValue)}`);

      this.setState({...this.state, controlValue: updatedValue.value });
    });
  }

  render() {
    console.log('NumberSliderUpdater:render');
    const { controlValue } = this.state;

    return (
      <div className={style.main}>
         <p>${this.props.description}</p>
         <Slider
          value={controlValue}
          onChange={this.handleSliderChange.bind(this, 'controlValue')}
          snaps={true}
          step={5}
          editable
          min={0}
          max={120} />
      </div>
    );
  }
}
