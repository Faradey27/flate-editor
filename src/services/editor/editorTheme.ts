const toHexNumberColor = (color: string) => {
  return Number(`0x${color.substr(2, color.length)}`);
};

export const getEditorTheme = () => {
  const styles = global.getComputedStyle(document.documentElement);

  const primaryColor = styles.getPropertyValue('--primaryColor');
  const backgroundColor = styles.getPropertyValue('--backgroundColor');

  return {
    primaryColor: toHexNumberColor(primaryColor),
    backgroundColor: toHexNumberColor(backgroundColor),
  };
};
