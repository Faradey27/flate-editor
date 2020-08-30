import classes from './PropertyPanel.module.scss';

interface PropertyPanelProps {
  title: string;
  children: React.ReactNode;
}

const PropertyPanel: React.FC<PropertyPanelProps> = ({ title, children }) => {
  return (
    <div className={classes.root}>
      <button type="button" className={classes.summary}>
        <p className={classes.summaryTitle}>{title}</p>
      </button>
      <div className={classes.details}>{children}</div>
    </div>
  );
};

export default PropertyPanel;
