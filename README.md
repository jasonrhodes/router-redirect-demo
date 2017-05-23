# Ugh Why U No Redirect, Redux

I am trying to do some auth-based redirection and things aren't working how I expect. I built this little demo to show just the code that doesn't do what I want.

### The working code

In `index.js` there is this:

```js
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

which loads the regular, local-state version of the App component. If you run the code with `yarn install && yarn start` or `npm install && npm start`, you'll see it load an empty page. Go to `/should-redirect` and the URL will update and show the "Yay you redirected" text.

This happens because in my `AuthStateWrapper` component, it sets the `loggedIn` state to true in `componentDidMount`. That change is picked up in `componentWillUpdate` which calls `history.push()`, making you end up at the redirected route.

_Note: I thought this might simply be an async race condition problem, but if I wrap the `setState` call from `componentDidMount` in a `setTimeout` call and wait 3 seconds, the page redirects perfectly 3 seconds later._ 

### The problem

If you switch `<App />` to `<ReduxApp />` in index.js, you'll load the Redux version of the app instead. This time, if you load `/should-redirect`, the browser history has been updated just like before--the URL bar will show `/target`. However, the actual HTML will be left unchanged, saying "Oops you didn't redirect" or similar. 

The difference is in this code, the `AuthReduxWrapper` dispatches an action in `componentDidMount` to set the connected props.auth.loggedIn value to true. Something about that flow triggers the history push, but doesn't activate the associated route and its linked component.

Do you know why? :D