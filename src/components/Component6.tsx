import Form from 'react-bootstrap/Form'
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react';


const EXPERIMENT_NAME = 'Using store directly';


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


// What observer actually does? may be we can just use our store directly?
export const Component6 = observer(() => {
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
