import Form from 'react-bootstrap/Form'
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react';
import { FC } from 'react';


const EXPERIMENT_NAME = 'Refactoring of classic observer';


// observer HOC to handle with stores and observers
const theObserver = (stores: any, component: FC<any>) => {
  const ObserverComponent = observer(component);
  return () => <ObserverComponent {...stores} />
}


// create store class
class TextStore {
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
const txtStore = new TextStore();


// use our HOC to connect store
export const Component4 = theObserver(
  { txtStore },
  ({ txtStore }: { txtStore: TextStore }) => {
  return (
    <div className="mb-3">
      {EXPERIMENT_NAME}. Length: {txtStore.textLength}
      <Form.Control
        as="textarea"
        onChange={({ target: { value } }) => txtStore.updateText(value)}
        value={txtStore.text} />
    </div>
  );
});
