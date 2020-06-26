import * as React from 'react';

import { FlipFlopMiddle } from '@lunchpad/types';
import { Icon, FlipFlop } from '@lunchpad/icons';

import { Pill } from '../pill'
import { Split, Child } from '../../basic/layout';

interface IFlipFlopPill {
  action: FlipFlopMiddle
  expanded?: boolean
  onChange?: (action: FlipFlopMiddle) => void
  onRemove?: (id: string) => void
  onMoveUp: (id: string) => void
  onMoveDown: (id: string) => void
}

export const FlipFlopMiddlePill: React.SFC<IFlipFlopPill> = ({ action, onRemove, onMoveUp, onMoveDown }) => {
  const Expanded = (
    <Split direction="row">
      <Child grow whiteSpace="nowrap" padding="0 1rem 0 0"><div style={{textOverflow: "ellipsis", overflow: "hidden"}}>FlipFlop: B</div></Child>
    </Split>
  )
    
  return (
    <Pill
      isExpanded={false}
      expandable={false}
      icon={<Icon icon={FlipFlop} />}
      expanded={Expanded}
      collapsed={Expanded}
      onRemove={() => onRemove(action.id)}
      onMoveUp={onMoveUp ? () => onMoveUp(action.id) : null}
      onMoveDown={onMoveDown ? () => onMoveDown(action.id) : null}
      onExpand={() => {}}
      onCollapse={() => {}}
    />
  )
}

FlipFlopMiddlePill.defaultProps = {
  expanded: false,
  onChange: () => {},
  onRemove: () => {},
}