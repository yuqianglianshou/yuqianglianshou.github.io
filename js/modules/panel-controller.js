const PANEL_STATE = Object.freeze({
  collapsed: 'collapsed',
  expanded: 'expanded',
});

export function createPanelController(element) {
  const subscribers = new Set();

  function getState() {
    return element?.dataset.panelState === PANEL_STATE.collapsed
      ? PANEL_STATE.collapsed
      : PANEL_STATE.expanded;
  }

  function setState(nextState) {
    if (!element || getState() === nextState) return;

    // data-panel-state 是面板状态的唯一来源，避免 class、内联样式和计时器互相竞争。
    element.dataset.panelState = nextState;
    subscribers.forEach((subscriber) => subscriber(nextState));
  }

  return {
    collapse() {
      setState(PANEL_STATE.collapsed);
    },
    isCollapsed() {
      return getState() === PANEL_STATE.collapsed;
    },
    subscribe(subscriber) {
      subscribers.add(subscriber);
      return () => subscribers.delete(subscriber);
    },
  };
}
