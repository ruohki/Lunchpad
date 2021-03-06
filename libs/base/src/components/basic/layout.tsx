import * as React from 'react';
import styled from 'styled-components';
import { COLOR_MENU, COLOR_GRAY, COLOR_NOTBLACK, COLOR_WHITE, COLOR_BLACK, COLOR_ALMOSTBLACK } from '../../theme';

export interface IOuterProps {
  width?: string
  height?: string
  radius?: string
  padding?: string
  margin?: string

  backgroundColor?: string
  scroll?: "visible" | "hidden" | "auto" | "scroll"
  whiteSpace?: "normal" | "nowrap" | "pre" | "initial";
  textOverflow?: "clip" | "ellipsis" | "inherit" | string
}

export interface ISplitProps extends IOuterProps {
  direction?: "row" | "column"
  content?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly" | "stretch"
  justify?: "flex-start" | "flex-end" | "center"
}

export interface IChildProps extends IOuterProps {
  align?: "center" | "flex-start" | "flex-end" | "stretch"
  text?: "center" | "left" | "right"
  basis?: string
  grow?: boolean
}

export const Outer = styled.div<IOuterProps>`
  box-sizing: border-box;
  border-radius: ${props => props.radius};
  width: ${props => props.width};
  height: ${props => props.height};
  padding: ${props => props.padding};
  margin: ${props => props.margin};
  background-color: ${props => props.backgroundColor};
  overflow-y: ${props => props.scroll};
  white-space: ${props => props.whiteSpace};
  text-overflow: ${props => props.textOverflow};
`

Outer.defaultProps = {
  width: "100%",
  height: "100%",
  margin: "0",
  padding: "0",
  backgroundColor: "inherit",
  scroll: "visible",
  whiteSpace: "initial",
  textOverflow: "inherit",
  radius: "0"
}

export const Split = styled(Outer)<ISplitProps>`
  display: flex;
  flex-direction: ${props => props.direction};
  justify-content: ${props => props.justify};
  align-items: stretch;
  align-content: ${props => props.content};
`;

Split.defaultProps = {
  width: "auto",
  height: "auto",
  direction: "column",
  justify: "flex-start",
  content: "center"
};

export const Child = styled(Outer)<IChildProps>`
  align-self: ${props => props.align};
  flex-basis: ${props => props.basis};
  flex-grow: ${props => props.grow ? "1" : 0};
  text-align: ${props => props.text};
`;

Child.defaultProps = {
  basis: "0",
  grow: false,
  height: "auto",
  align: "center",
  text: "left"
}


export const AppContainer = styled.div`
  position: absolute;
  transform: translateZ(0);

  width: 100vw;
  height: 100vh;
  
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`

export const VerticalPipe = styled.div`
  display: block;
  width: 1px;
  height: 18px;
  background-color: ${COLOR_NOTBLACK};
`

export const Tab = styled(({ title, active, ...rest}) => (
  <div active={active ? 1 : 0} {...rest}><h4>{title}</h4></div>
))`
  background-color: ${(props) => props.active ? COLOR_MENU : COLOR_BLACK};
  color: ${(props) => props.active ? COLOR_WHITE : COLOR_GRAY};
  padding:  1rem 3rem 1rem 3rem;
  cursor: pointer;
  white-space: nowrap;
  transition: color 0.25s ease, background-color 0.25s ease;
  
  &:hover {
    color: ${COLOR_WHITE};
  }
`

Tab.defaultProps = {
  active: false,
}

export const Divider = styled.hr`
  margin: 0;
  border: 1px solid ${COLOR_ALMOSTBLACK};
`
export const Row = ({ title, children }) => (
  <Split margin="1rem 1rem 0 1rem" direction="row">
    <Child basis="25%" align="center" text="right"  margin="0 1rem 0 0">
      <div>
        {title}
      </div>
    </Child>
    <Child basis="75%">
      {children}
    </Child>
  </Split>
)

export const EditInput = styled.input`
  background: transparent;
  border: none;
  outline: none;
  color: ${COLOR_WHITE};

  user-select: none;
`