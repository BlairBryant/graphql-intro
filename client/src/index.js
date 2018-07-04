import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {ApolloProvider} from 'react-apollo'
import {ApolloClient} from 'apollo-client'
import {HttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
// import registerServiceWorker from './registerServiceWorker';
const httpLink = new HttpLink({url: 'http://localhost:4000'})
const client = new ApolloClient({
    link: httpLink,
    cache: InMemoryCache
})

ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
