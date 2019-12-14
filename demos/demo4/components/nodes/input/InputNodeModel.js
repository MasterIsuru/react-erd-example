import React from 'react';
import _ from 'lodash';
import * as RJD from '../../../../../src/main';

export class InputNodeModel extends RJD.NodeModel {
  constructor(name = 'Untitled', color = 'blue') {
    super('input');
    this.addPort(new RJD.DefaultPortModel(true, 'input', <ul className="table-ul"><li>Field</li></ul>));
    this.name = name;
    this.color = color;
  }

  deSerialize(object) {
    super.deSerialize(object);
    this.name = object.name;
    this.color = object.color;
  }

  serialize() {
    return _.merge(super.serialize(), {
      name: this.name,
      color: this.color,
    });
  }

  getInPorts() {
    return _.filter(this.ports, portModel => !portModel.out);
  }
}
