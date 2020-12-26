import Form from 'react-bootstrap/Form'
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react';


/**
 * "Classic", described in official documentation way to work with react. The main problem here is that we need
 * to create always two components instead of one: the observer and store.
 */

const EXPERIMENT_NAME = 'Classic Observer';


// create store class
class ClassicStore {
  constructor() {
    makeAutoObservable(this)
  }
  
  text = EXPERIMENT_NAME;

  updateText(txt: string) {
    this.text = txt;
  }

  get textLength(): number {
    return this.text.length;
  }
}


// create store instance
const store = new ClassicStore();


// create observer component
const ObserverComponent = observer(({ store }: { store: ClassicStore }) => {
  return (
    <div className="mb-3">
      {EXPERIMENT_NAME}. Length: {store.textLength}
      <Form.Control
        as="textarea"
        onChange={({ target: { value } }) => store.updateText(value)}
        value={store.text} />
    </div>
  )
});


// use observer component with store instance
export const Component1 = () => {
  return (
    <ObserverComponent store={store} />
  );
}
