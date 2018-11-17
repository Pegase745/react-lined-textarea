import * as React from 'react';

import * as styles from './TextArea.css';

const initialState = { lineNumbers: 0 };

type State = typeof initialState;

export interface IProps {
  content: string;
}

export default class TextArea extends React.Component<IProps, State> {
  readonly state: State = initialState;

  renderLines() {
    return (
      <div className={styles.lines}>
        <div className={styles.codelines}>
          {this.props.content.split('\n').map((line, index) => (
            <div className={styles.lineno}>{index + 1}</div>
          ))}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={styles.linedwrap}>
        {this.renderLines()}

        <div className={styles.linedtextarea}>
          <textarea wrap="off">{this.props.content}</textarea>
        </div>
      </div>
    );
  }
}
