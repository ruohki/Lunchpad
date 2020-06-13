import * as React from 'react';
import * as lodash from 'lodash';

import { Action, ActionType, PlaySound, Delay, SwitchPage, StopAllMacros, RestartThisMacro, TextToSpeech, LaunchApp, Hotkey, StopThisMacro, settingsLabels } from '@lunchpad/types';
import { AnimatePresence, motion } from 'framer-motion';
import { Split, Child, Tooltip, IconButton, PillList, DelayPill, PlaySoundPill, SwitchPagePill, StopAllMacrosPill, StopThisMacroPill, RestartThisMacroPill, TextToSpeechPill, HotkeyPill, LaunchAppPill} from '@lunchpad/base'
import { IconPlus } from '@lunchpad/icons';
import { AudioContext, MenuContext, LayoutContext } from '@lunchpad/contexts';

import AddActionMenu from '../ContextMenu/addAction';
import { useSettings } from '@lunchpad/hooks';

interface IActionEditor {
  header: JSX.Element
  actions: Action[]
  onChange: (actions: Action[]) => void
}

export const ActionEditor: React.SFC<IActionEditor> = (props) => {
  const { showContextMenu, closeMenu } = React.useContext(MenuContext.Context);
  const { outputDevices } = React.useContext(AudioContext.Context);
  const { pages } = React.useContext(LayoutContext.Context);
  
  const [ outputDevice ] = useSettings(settingsLabels.soundOutput, "default");

  const addAction = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    showContextMenu(
      e.clientX,
      e.clientY,
      <AddActionMenu
        onSelect={key => {
          if (key === ActionType.PlaySound) {
            props.onChange([...props.actions, new PlaySound('', outputDevice)]);
          } else if (key === ActionType.Delay) {
            props.onChange([...props.actions, new Delay(1000)]);
          } else if (key === ActionType.SwitchPage) {
            props.onChange([...props.actions, new SwitchPage('default')]);
          } else if (key === ActionType.StopAllMacros) {
            props.onChange([...props.actions, new StopAllMacros()]);
          } else if (key === ActionType.RestartThisMacro) {
            props.onChange([...props.actions, new RestartThisMacro()]);
          } else if (key === ActionType.TextToSpeech) {
            props.onChange([...props.actions, new TextToSpeech('1, 2, 3!')]);
          } else if (key === ActionType.LaunchApplication) {
            props.onChange([...props.actions, new LaunchApp()]);
          } else if (key === ActionType.PressAHotkey) {
            props.onChange([...props.actions, new Hotkey() ]);
          } else if (key === ActionType.StopThisMacro) {
            props.onChange([...props.actions, new StopThisMacro() ]);
          }
        }}
        onClose={closeMenu}
      />
    );
  };

  const moveActionUp = (id: string) => {
    const idx = lodash.findIndex(props.actions, a => a.id === id);
    const temp = props.actions[idx];
    props.actions[idx] = props.actions[idx - 1];
    props.actions[idx - 1] = temp;
    props.onChange([...props.actions]);
  };

  const moveActionDown = (id: string) => {
    const idx = lodash.findIndex(props.actions, a => a.id === id);
    const temp = props.actions[idx];
    props.actions[idx] = props.actions[idx + 1];
    props.actions[idx + 1] = temp;
    props.onChange([...props.actions]);
  };

  const removeAction = (id: string) => {
    props.onChange([...props.actions.filter(a => a.id !== id)]);
  };

  const updateAction = (action: Action) => {
    props.onChange([...props.actions.map(a => (a.id === action.id ? action : a))]);
  };

  const pills = props.actions.map((action, i) => {
    const pillDefaults = {
      onChange: action => updateAction(action),
      onRemove: removeAction,
      onMoveUp: i !== 0 ? () => moveActionUp(action.id) : null,
      onMoveDown:
        i < props.actions.length - 1 ? () => moveActionDown(action.id) : null
    };

    if (action.type === ActionType.Delay)
      return (
        <DelayPill
          key={action.id}
          action={action as Delay}
          {...pillDefaults}
        />
      );
    else if (action.type == ActionType.PlaySound)
      return (
        <PlaySoundPill
          key={action.id}
          outputDevices={outputDevices}
          action={action as PlaySound}
          {...pillDefaults}
        />
      );
    else if (action.type === ActionType.SwitchPage)
      return (
        <SwitchPagePill
          key={action.id}
          pages={pages.map(p => ({ id: p.id, name: p.name }))}
          action={action as SwitchPage}
          {...pillDefaults}
        />
      );
    else if (action.type === ActionType.StopAllMacros)
      return (
        <StopAllMacrosPill
          key={action.id}
          action={action as StopAllMacros}
          {...pillDefaults}
        />
      );
    else if (action.type === ActionType.StopThisMacro)
      return (
        <StopThisMacroPill
          key={action.id}
          action={action as StopThisMacro}
          {...pillDefaults}
        />
      );
    else if (action.type === ActionType.RestartThisMacro)
      return (
        <RestartThisMacroPill
          key={action.id}
          action={action as RestartThisMacro}
          {...pillDefaults}
        />
      );
    else if (action.type === ActionType.TextToSpeech)
      return (
        <TextToSpeechPill
          key={action.id}
          action={action as TextToSpeech}
          {...pillDefaults}
        />
      );
    else if (action.type === ActionType.PressAHotkey)
      return (
        <HotkeyPill
          key={action.id}
          action={action as Hotkey}
          showMenu={showContextMenu}
          closeMenu={closeMenu}
          {...pillDefaults}
        />
      );
    else if (action.type === ActionType.LaunchApplication)
      return (
        <LaunchAppPill
          key={action.id}
          action={action as LaunchApp}
          {...pillDefaults}
        />
      );
    else return <React.Fragment key={'empty'} />;
  });

  return (
    <PillList
      header={
        <Split direction={'row'}>
          <Child grow padding="0 0 0 1rem">
            {props.header}
          </Child>
          <Child padding="1rem">
            <Tooltip title="Add a new action to the end of the list of actions.">
              <IconButton icon={<IconPlus />} onClick={addAction}>Add action...</IconButton>
            </Tooltip>
          </Child>
        </Split>
      }
    >
      <AnimatePresence>
        {pills.map(p => (
          <motion.div
            positionTransition={{
              type: 'spring',
              damping: 30,
              stiffness: 200
            }}
            initial={{ opacity: 0, translateX: -100 }}
            animate={{ opacity: 1, translateX: 0 }}
            exit={{ opacity: 0, translateX: 100 }}
            key={p.props.action.id}
          >
            {p}
          </motion.div>
        ))}
      </AnimatePresence>
    </PillList>
  )
}
