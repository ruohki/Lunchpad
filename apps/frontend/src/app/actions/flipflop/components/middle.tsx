import * as React from 'react';

import { Icon, FlipFlop } from '@lunchpad/icons';

import Pill from '../../pill'
import { Split, Child } from '@lunchpad/base';
import { FlipFlopMiddle } from '../classes';

interface IFlipFlopMiddlePill {
  action: FlipFlopMiddle
  expanded?: boolean
  onChange?: (action: FlipFlopMiddle) => void
  onRemove?: (id: string) => void
  onMoveUp: (id: string) => void
  onMoveDown: (id: string) => void
}

export const FlipFlopMiddlePill: React.SFC<IFlipFlopMiddlePill> = (props) => {
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
      onRemove={() => props.onRemove(props.action.id)}
      onMoveUp={props.onMoveUp ? () => props.onMoveUp(props.action.id) : null}
      onMoveDown={props.onMoveDown ? () => props.onMoveDown(props.action.id) : null}
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
