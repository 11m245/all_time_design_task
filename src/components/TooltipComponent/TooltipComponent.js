import "./Tooltip.css";
function TooltipComponent({ text, component }) {
  return (
    <>
      <div className="tool-tip-component-wrapper">
        <div className="tool-tip-text">
          {text}
          <div className="tool-tip-arrow"></div>
        </div>

        {component}
      </div>
    </>
  );
}

export { TooltipComponent };
