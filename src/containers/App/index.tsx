import * as React from 'react';
import * as TodoActions from '../../actions/todos';
import * as style from './style.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from '../../reducers';
import { Header, MainSection, WaitTime } from '../../components';

export namespace App {
  export interface Props extends RouteComponentProps<void> {
    todos: TodoItemData[];
    todoActions: typeof TodoActions;
  }

  export interface State {
    /* empty */
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export class App extends React.Component<App.Props, App.State> {

  render() {
    // load the provider ID query string param
    const params = new URLSearchParams(this.props.location.search);
    const providerID = params.get('providerID');

    const { todos, todoActions, children } = this.props;
    return (
      <div className={style.normal}>
        <WaitTime providerID={providerID} />
        {children}
      </div>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    todos: state.todos
  };
}

function mapDispatchToProps(dispatch) {
  return {
    todoActions: bindActionCreators(TodoActions as any, dispatch)
  };
}
