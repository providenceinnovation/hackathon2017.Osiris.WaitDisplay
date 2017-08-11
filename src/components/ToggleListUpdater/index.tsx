import * as React from 'react';
import * as style from './style.css';
import { ToggleUpdater } from '..';

export namespace ToggleListUpdater {
  export interface Props {
    providerID: string;
  }

  export interface State {
  }
}
export class ToggleListUpdater extends React.Component<ToggleListUpdater.Props, ToggleListUpdater.State> {
  constructor(props?: ToggleListUpdater.Props, context?: any) {
    super(props, context);
    this.state = {
    };
  }
  componentDidMount () {
    // get provider
    console.log('mounted');
  }

  render() {
    return (
        <div>
          <ToggleUpdater providerID={this.props.providerID} serviceType="acceptedInsurance/Cigna" description="Cigna" />
        </div>

    );
  }
}
