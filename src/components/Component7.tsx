import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react';


/**
 * In this experiment we trying to ensure, that observer react components renders whenever any of stores updated.
 */

const EXPERIMENT_NAME = 'Rendering components when one of two stores updates';


class TextStore {
  constructor(txt: string = 'default text') {
    makeAutoObservable(this);
    this.text = txt;
  }

  text: string;

  updateText(txt: string): void {
    this.text = txt;
  }
}


// create store instance
const textStore1 = new TextStore();
const textStore2 = new TextStore();

textStore1.updateText('text store 1');
textStore2.updateText('text store 2');


// What observer actually does? may be we can just use our store directly?
export const Component7 = () => {
  return (
    <Container>
      {EXPERIMENT_NAME}
      <Row className="mb-3">
        <Col><Element1 /></Col>
        <Col><Element2 /></Col>
      </Row>
    </Container>
  );
};

let counter1 = 0;
const Element1 = observer(() => {
  counter1++;
  return (
    <span>
      Rendered times: {counter1}
      <Form.Control value={textStore1.text} onChange={({ target: { value } }) => textStore1.updateText(value)} />
    </span>
  );
});

let counter2 = 0;
const Element2 = observer(() => {
  counter2++;
  return (
    <span>
      Rendered times: {counter2}
      <Form.Control value={textStore2.text} onChange={({ target: { value } }) => textStore2.updateText(value)} />
    </span>
  );
});