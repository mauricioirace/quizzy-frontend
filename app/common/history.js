import { createBrowserHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';

import store from './redux/store';

const history = syncHistoryWithStore(createBrowserHistory(),store);

export default history;