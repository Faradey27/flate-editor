import { RefObject, useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';

import { initializeEditor } from 'services/editor';

import classes from './Canvas.module.scss';

const Canvas = () => {
  const canvasRef = useRef() as RefObject<HTMLCanvasElement>;

  useEffect(() => {
    if (canvasRef.current) {
      const editor = initializeEditor({ view: canvasRef.current });
      editor.run();

      return () => {
        editor.release();
      };
    }

    return () => {};
  }, []);

  return <canvas className={classes.root} ref={canvasRef} />;
};

export default Canvas;
