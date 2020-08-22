import React, { useContext } from 'react';

import { Editor } from './index';

const EditorContext = React.createContext<Editor | null>(null);

export const EditorContextProvider = EditorContext.Provider;

export const useEditor = () => useContext(EditorContext);
