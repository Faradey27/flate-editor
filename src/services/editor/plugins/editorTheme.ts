const toHexNumberColor = (color: string) => {
  return Number(`0x${color.slice(1)}`);
};

export const getEditorTheme = () => {
  const styles = global.getComputedStyle(document.documentElement);

  const primaryColor = styles.getPropertyValue('--primaryColor').trim();
  const backgroundColor = styles.getPropertyValue('--backgroundColor').trim();

  return {
    primaryColor: toHexNumberColor(primaryColor),
    backgroundColor: toHexNumberColor(backgroundColor),
  };
};
