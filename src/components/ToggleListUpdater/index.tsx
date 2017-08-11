import * as React from 'react';
import * as style from './style.css';
import * as realTimeManager from '../../utils/realTimeManager';

export namespace ToggleListUpdater {
  export interface Props {
    providerID: string;
  }

  export interface State {
    acceptedInsurance: any[];
  }
}
export class ToggleListUpdater extends React.Component<ToggleListUpdater.Props, ToggleListUpdater.State> {
  constructor(props?: ToggleListUpdater.Props, context?: any) {
    super(props, context);
    this.state = {
      acceptedInsurance: []
    };
  }
  componentDidMount () {
    // get provider
    realTimeManager.setupFirebase();
    let provider: any;
    realTimeManager.getProvider(this.props.providerID).then((res) => {
      console.log(res.acceptedInsurance);
      let ais: string[] = [];
      for (let ai in res.acceptedInsurance) {
        console.log(ai);
        ais.push(ai);
      }
      this.setState({
        acceptedInsurance: ais
      }, () => {
        console.log(this.state);
      });

    }).catch((err)=>{
      console.error(err);
    });
    console.log('mounted');
    // todo add listeners to changes to acceptedInsurance list
  }

  render() {
    let acceptedInsurances = this.state.acceptedInsurance.map((ai) => {
      console.log(ai);
      return <li key={ai}>{ai}</li>;
    });
    return (
        <div>
        <ul>
          {acceptedInsurances}
        </ul>
        </div>

    );
  }
}
