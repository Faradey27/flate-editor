import FillPanel from './panels/FillPanel';
import FramePanel from './panels/FramePanel';
import StrokePanel from './panels/StrokePanel';
import classes from './PropertiesPanel.module.scss';

interface PropertiesPanelProps {}

const PropertiesPanel: React.FC<PropertiesPanelProps> = () => {
  return (
    <div className={classes.root}>
      <FramePanel />
      <FillPanel />
      <StrokePanel />
    </div>
  );
};

export default PropertiesPanel;
