import * as React from 'react';
import * as TodoActions from '../../actions/todos';
import * as WaitTimeActions from '../../actions/waittime';
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
    waitTime: WaitTimeData;
    waitTimeActions: typeof WaitTimeActions;
  }

  export interface State {
    /* empty */
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export class App extends React.Component<App.Props, App.State> {

  render() {
    const { todos, todoActions, children, waitTime, waitTimeActions } = this.props;
    return (
      <div className={style.normal}>
        <Header addTodo={todoActions.addTodo} />
        <WaitTime waitTimeData={waitTime} actions={waitTimeActions} />
        <MainSection todos={todos} actions={todoActions} />
        {children}
      </div>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    todos: state.todos,
    waitTime: state.waitTime
  };
}

function mapDispatchToProps(dispatch) {
  console.log(WaitTimeActions);
  return {
    todoActions: bindActionCreators(TodoActions as any, dispatch),
    waitTimeActions: bindActionCreators(WaitTimeActions as any, dispatch)
  };
}
