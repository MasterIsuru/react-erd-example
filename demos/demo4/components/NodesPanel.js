import React from 'react';
import { DragWrapper } from './DragWrapper';
import { OutputNodeWidget } from './nodes/output/OutputNodeWidget';
import { InputNodeWidget } from './nodes/input/InputNodeWidget';
import { ConnectionNodeWidget } from './nodes/connection/ConnectionNodeWidget';

class Node extends React.Component {
  renderNode() {
    const { type, color } = this.props;

    if (type === 'input') {
      return <InputNodeWidget node={{ name: 'Table' }} displayOnly />;
    }
    console.warn('Unknown node type');
    return null;
  }

  render() {
    const { type, color } = this.props;

    return (
      <DragWrapper type={type} color={color} style={{ display: 'inline-block' }}>
        {this.renderNode()}
      </DragWrapper>
    );
  }
}

export class NodesPanel extends React.Component {
  saveDiagram() {
    console.log('---------Write action here----------------')
    console.log('---------Write action here----------------')
    console.log(this.props && this.props.model)
    console.log('Write action here')
  }

  render() {
    return (
      <div>
        <div className='nodes-panel'>
          <div className='node-wrapper'>
            <Node type='input' />
          </div>
        </div>
        <div className='btn-panel'>
          <button onClick={() => this.saveDiagram()} className="modal-btn save-btn">
            {`Save `}<div className='fa fa-save' />
          </button>
        </div>
      </div>
    );
  }
}
