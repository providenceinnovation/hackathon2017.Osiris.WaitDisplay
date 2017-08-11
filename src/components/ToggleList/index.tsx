import * as React from 'react';
import * as style from './style.css';
import * as realTimeManager from '../../utils/realTimeManager';
import { ACCEPTED_INSURANCE } from '../../constants/realTimeServiceTypes';

export namespace ToggleList {
  export interface Props {
    providerID: string;
  }

  export interface State {
    toggleList: string[],
  }
}

export class ToggleList extends React.Component<ToggleList.Props, ToggleList.State> {

  constructor(props?: ToggleList.Props, context?: any) {
    super(props, context);

    this.state = { toggleList: [] };
  }

  componentDidMount () {
    realTimeManager.setupFirebase();

    realTimeManager.startListener(this.props.providerID, `${ACCEPTED_INSURANCE}/value`, (updatedToggleList) => {
      console.log('Updated wait time:' + JSON.stringify(updatedToggleList));
      let ais: string[] = [];
      for (let ai in updatedToggleList) {
        let entry = updatedToggleList[ai];
        console.log(entry);
        if (entry.value) {
          ais.push(ai);
        }
      }
      this.setState({toggleList: ais});
    });
  }

  render() {
    const acceptedInsurances = this.state.toggleList.map((ai) => {
      console.log(ai);
      return <div key={ai}>{ai}</div>;
    });
    const { toggleList } = this.state;
    return (
      <div className={style.main}>
        {toggleList}
      </div>
    );
  }
}
