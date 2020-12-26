import { createContext, FunctionComponent, useContext } from 'react';
import Form from 'react-bootstrap/Form'
import { useLocalStore, useObserver } from 'mobx-react';


const EXPERIMENT_NAME = 'With React.Context, useLocalStore and strongly typed store';

// create interface for our store
interface IStore {
  text: string,
  updateText: (txt: string) => void,
  textLength: number
}


// create strongly typed store
const StoreContext = createContext<IStore>({} as IStore);


// create component which providers with typed store
const StoreProvider: FunctionComponent = ({ children }) => {
  const store = useLocalStore(() => ({
    text: EXPERIMENT_NAME,
    updateText: (txt: string) => {
      store.text = txt;
    },
    get textLength(): number {
      return store.text.length;
    }
  }) as IStore);  // it's type here!

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  )
}


// create observer component, pay your attention to fact that it has IntelliSense support!
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


// wrap with context provider
export const Component3 = () => {
  return (
    <StoreProvider>
      <TextArea />
    </StoreProvider>
  )
};
