import { RefObject, useEffect, useRef } from 'react';
import { DragObjectWithType, useDrop } from 'react-dnd';

import { Editor, initializeEditor } from 'services/editor';

import classes from './Canvas.module.scss';
import { dragType } from './Shape';
import { Shapes } from './Shape/types.d';

const Canvas = () => {
  const canvasRef = useRef() as RefObject<HTMLCanvasElement>;
  const editorRef = useRef() as RefObject<Editor>;

  const [, drop] = useDrop({
    accept: dragType,
    drop: (item: DragObjectWithType & { id: Shapes }, monitor) => {
      const dropOffset = monitor.getSourceClientOffset();

      if (!dropOffset || !canvasRef.current) {
        return;
      }

      const { offsetLeft } = canvasRef.current;
      const { offsetTop } = canvasRef.current;
      const dropPosition = {
        x: dropOffset.x - offsetLeft,
        y: dropOffset.y - offsetTop,
      };

      editorRef.current?.dropShape({ id: item.id }, dropPosition);
    },
  });

  useEffect(() => {
    if (canvasRef.current) {
      const editor = initializeEditor({ view: canvasRef.current });
      editor.run();

      (editorRef as any).current = editor;

      return () => {
        editor.release();
      };
    }

    return () => {};
  }, []);

  return (
    <div ref={drop}>
      <canvas className={classes.root} ref={canvasRef} />
    </div>
  );
};

export default Canvas;
