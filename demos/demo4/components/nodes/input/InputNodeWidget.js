import React from 'react';
import Modal from 'react-modal';
import * as RJD from '../../../../../src/main';
import { InputNodeModel } from './InputNodeModel';

const customStyles = {
  content: {
    fontFamily: 'Arial',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 'auto'
  },
  overlay: {
    zIndex: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.65)'
  }
};

export class InputNodeWidget extends React.Component {
  static defaultProps = {
    node: null,
    color: 'blue'
  };

  state = {
    modalIsOpen: false,
    tableName: 'Table',
    fields: ['Field']
  }

  onRemove() {
    const { node, diagramEngine } = this.props;
    node.remove();
    diagramEngine.forceUpdate();
  }

  onEdit() {
    this.openModal();
  }

  getInPorts() {
    const { node, color, displayOnly } = this.props;
    let inputNode = node;

    if (displayOnly) {
      inputNode = new InputNodeModel(node.name, color);
    }

    return inputNode.getInPorts ? inputNode.getInPorts().map((port, i) => (
      <RJD.DefaultPortLabel model={port} key={`in-port-${i}`} />
    )) : [];
  }

  renderFieldList() {
    const { fields } = this.state;
    return fields.map((field, i) => {
      return(
        <div style={{ display: 'flex' }} key={i}>
          <input
            className="modal-field"
            required
            type="email"
            value={field}
            onChange={(e) => this.handleTableFieldNameChange(e, i)}
            id="email"
            placeholder="Table Name"
          />
          {i + 1 === fields.length ?
            <button onClick={this.addField.bind(this)} className="modal-btn add-btn">
              <div className='fa fa-plus' />
            </button> :
            <button onClick={() => this.deleteField(i)} className="modal-btn delete-btn">
              <div className='fa fa-trash' />
            </button>
          }
        </div>
      );
    });
  }

  addField() {
    const { fields } = this.state; 
    let arr = fields;
    arr.push('Field');
    this.setState({ fields: arr });
  }

  deleteField(index) {
    const { fields } = this.state; 
    let arr = fields;
    arr.splice(index, 1);
    this.setState({ fields: arr });
  }

  generateFields() {
    const { fields } = this.state;
    return (
      <ul className="table-ul">
        {fields.map((field, i) => {
          return <li key={i}>{field}</li>
        })}
      </ul>
    )
  }

  handleTableNameChange(e) {
    this.setState({ tableName: e.target.value });
  }

  handleTableFieldNameChange(e, index) {
    const { fields } = this.state;
    let arr = fields;
    arr[index] = e.target.value;
    this.setState({ fields: arr });
  }

  handleSubmit() {
    const { node, diagramEngine } = this.props;
    node.name = this.state.tableName;
    node.ports.input.label = this.generateFields();
    diagramEngine.forceUpdate();
    this.setState({ modalIsOpen: false });
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    const { node } = this.props;
    this.setState({ modalIsOpen: false, tableName: node.name });
  }

  render() {
    const { node, displayOnly, color: displayColor } = this.props;
    const { tableName } = this.state;
    const { name, color } = node;
    const style = {};
    if (color || displayColor) {
      style.background = color || displayColor;
    }

    return (
      <div className='basic-node' style={style}>
        <div className='title'>
          <div className='name'>
            <b>{name}</b>
          </div>
          {!displayOnly ?
            <div>
              <div className='fa fa-pencil' onClick={this.onEdit.bind(this)} />
              <div className='fa fa-close' onClick={this.onRemove.bind(this)} />
            </div> : null}
        </div>
        <div className='ports'>
          <div className='in'>
            {this.getInPorts()}
          </div>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          style={customStyles}
          ariaHideApp={false}
        >
          <h2 className="modal-header">Edit Table</h2>
          <div className='fa fa-close modal-close' onClick={() => this.closeModal()} />
          <hr />
          <div className="modal-form">
            <label>Table Name</label>
            <input
              required
              type="text"
              value={tableName}
              onChange={this.handleTableNameChange.bind(this)}
              id="tableName"
              placeholder="Table Name"
            />
            <br/>
            <label>Fields</label>
            {this.renderFieldList()}
          </div>
          <button onClick={this.handleSubmit.bind(this)} className="modal-btn">Submit</button>
        </Modal>
      </div>
    );
  }
}

export const InputNodeWidgetFactory = React.createFactory(InputNodeWidget);
