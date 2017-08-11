import * as React from 'react';
import * as style from './style.css';
import * as realTimeManager from '../../utils/realTimeManager';
import Slider from 'react-toolbox/lib/slider';
import Button from 'react-toolbox/lib/button';

export namespace NumberCounterUpdater {
  export interface Props {
    providerID: string;
    serviceType: string;
    description: string;
  }

  export interface State {
    controlValue: number,
  }
}

export class NumberCounterUpdater extends React.Component<NumberCounterUpdater.Props, NumberCounterUpdater.State> {
  constructor(props?: NumberCounterUpdater.Props, context?: any) {
    super(props, context);

    this.state = {
      controlValue: 0
    };
  }

  handleSliderChange = (stateField, updatedValue) => {
    this.setState({...this.state, controlValue: updatedValue});

    realTimeManager.updateRealTimeValue(this.props.providerID, this.props.serviceType, updatedValue);
  };

  componentDidMount () {
    realTimeManager.setupFirebase();

    realTimeManager.startListener(this.props.providerID, this.props.serviceType, (updatedValue) => {
      console.log(`NumberCounterUpdater:${this.props.serviceType}:Updated value:${JSON.stringify(updatedValue)}`);

      this.setState({...this.state, controlValue: updatedValue.value });
    });
  }

  render() {
    console.log('NumberCounterUpdater:render');
    const { controlValue } = this.state;

    return (
      <div className={style.main}>
        <span className={style.description}>${this.props.description}</span>
        <Button className={style.controlButton} icon='add' floating accent />
        <span className={style.controlValue}>${controlValue}</span>
        <Button className={style.controlButton} icon='remove' floating accent />
      </div>
    );
  }
}
