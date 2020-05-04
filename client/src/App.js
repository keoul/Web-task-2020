import React from 'react';
import { setupRootStore } from './models/setup';
import { Provider } from 'mobx-react';
import { RouterComponent } from './components/RouterComponent';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rootTree: null,
    };
  }
  componentDidMount = () => {
    const { rootTree } = setupRootStore();
    this.setState({
      rootTree: rootTree,
    });
  };
  render() {
    const { rootTree } = this.state;
    if (!rootTree) return null;
    return (
      <Provider rootTree={rootTree}>
        <RouterComponent />
      </Provider>
    );
  }
}

export { App };
