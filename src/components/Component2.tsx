import { createContext, FC, useContext } from 'react';
import Form from 'react-bootstrap/Form'
import { useLocalStore, useObserver } from 'mobx-react';


/*
  Probably using React.Context to provide with stores can be handy for cases when we have a loooot of stores
*/

const EXPERIMENT_NAME = 'With React.Context, useLocalStore and useObserver hooks';


// create context
const StoreContext = createContext<any>({});


// create component with store and it's provider
const StoreProvider: FC = ({ children }) => {
  const store = useLocalStore(() => ({
    text: EXPERIMENT_NAME,
    updateText: (txt: string) => {
      store.text = txt;
    },
    get textLength() {
      return store.text.length;
    }
  }));

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  )
}


// create observer component
const TextArea = () => {
  const store = useContext(StoreContext);
  return useObserver(() => (
    <div className="mb-3">
      {EXPERIMENT_NAME}. Length: {store.textLength}
      <Form.Control
        as="textarea"
        onChange={({ target: { value } }) => store.updateText(value)}
        value={store.text} />
    </div>
  ));
}

// use provider anywhere - with observer component
export const Component2 = () => {
  return (
    <StoreProvider>
      <TextArea />
    </StoreProvider>
  )
};
