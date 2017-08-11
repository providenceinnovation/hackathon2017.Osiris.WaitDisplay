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
    stepAmount: number;
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

    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleAdd = () => {
    this.setState((prevState) => {
      return {controlValue: prevState.controlValue + this.props.stepAmount};
    });

    realTimeManager.updateRealTimeValue(this.props.providerID, this.props.serviceType,
      this.state.controlValue + this.props.stepAmount);
  };

  handleRemove = () => {
    if (this.state.controlValue === 0) {
      return;
    }

    this.setState((prevState) => {
      return {controlValue: Math.max(prevState.controlValue - this.props.stepAmount, 0)};
    });

    realTimeManager.updateRealTimeValue(this.props.providerID, this.props.serviceType,
      Math.max(this.state.controlValue - this.props.stepAmount, 0));
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
        <span className={style.description}>{this.props.description}</span>
        <div className={style.controlContainer}>
          <Button className={style.controlButton} icon='remove' floating mini onClick={this.handleRemove} />
          <span className={style.controlValue}>{controlValue}</span>
          <Button className={style.controlButton} icon='add' floating mini onClick={this.handleAdd} />
        </div>
      </div>
    );
  }
}
