import Form from 'react-bootstrap/Form'
import { useLocalStore, useObserver } from 'mobx-react';
import constate from 'constate';


const EXPERIMENT_NAME = 'With React.Context and constate';


const textStore = () => ({
  text: EXPERIMENT_NAME,
  updateText(txt: string) {
    // here in store we can use "this"
    this.text = txt;
  },
  get textLength(): number {
    return this.text.length;
  }
});


// let's use constate to create provider and useContext hook
const [TextStoreProvider, useTextStore] = constate(() => useLocalStore(textStore));


// create observer component, pay your attention to fact that it has IntelliSense support!
const TextArea = () => {
  const store = useTextStore();
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
export const Component5 = () => {
  return (
    <TextStoreProvider>
      <TextArea />
    </TextStoreProvider>
  )
};
