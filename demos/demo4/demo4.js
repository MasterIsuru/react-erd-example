import React from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import * as actions from './actions';
import { NodesPanel } from './components/NodesPanel';
import { Diagram } from './components/Diagram';
import './styles.scss';

class Demo extends React.Component {
  render() {
    const { model, onNodeSelected, updateModel } = this.props;
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <div className='parent-container'>
          <NodesPanel model={model} />
          <Diagram
            model={model}
            updateModel={updateModel}
            onNodeSelected={onNodeSelected}
          />
        </div>
      </DragDropContextProvider>
    );
  }
}

const mapStateToProps = state => ({
  selectedNode: state.history.present.selectedNode,
  model: state.history.present.model,
  canUndo: state.history.past.length > 0,
  canRedo: state.history.future.length > 0
});

const mapDispatchToProps = dispatch => ({
  onNodeSelected: node => dispatch(actions.onNodeSelected(node)),
  updateModel: (model, props) => dispatch(actions.updateModel(model, props)),
  onUndo: () => dispatch(UndoActionCreators.undo()),
  onRedo: () => dispatch(UndoActionCreators.redo())
});

export const Demo4 = connect(mapStateToProps, mapDispatchToProps)(Demo);
