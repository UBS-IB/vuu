import {
  ReactElement,
  useCallback,
  useState,
  createContext,
  ReactNode,
  useContext,
} from "react";
import { Dialog } from "./Dialog";

export type DialogState = {
  content: ReactElement;
  title: string;
  hideCloseButton?: boolean;
};

export type SetDialog = (dialogState?: DialogState) => void;

export interface DialogContextProps {
  showDialog: (dialogContent: ReactElement, title: string) => void;
}

export const useDialog = () => {
  const [dialogState, setDialogState] = useState<DialogState>();

  const handleClose = useCallback(() => {
    setDialogState(undefined);
  }, []);

  const dialog = dialogState ? (
    <Dialog
      className="vuuDialog"
      isOpen={true}
      onClose={handleClose}
      title={dialogState.title}
      hideCloseButton={dialogState.hideCloseButton}
    >
      {dialogState.content}
    </Dialog>
  ) : null;

  return {
    dialog,
    setDialogState,
  };
};

const defaultShowDialog = () => {
  console.warn("No content in dialog");
};
const DialogContext = createContext<DialogContextProps>({
  showDialog: defaultShowDialog,
});

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const { dialog, setDialogState } = useDialog();
  const showDialog = (dialogContent: ReactElement, title: string) => {
    const content = {
      content: dialogContent,
      title,
    };
    setDialogState(content);
  };

  return (
    <DialogContext.Provider value={{ showDialog }}>
      {children}
      {dialog}
    </DialogContext.Provider>
  );
};

export const useShowDialog = () => {
  const { showDialog } = useContext(DialogContext);
  return showDialog;
};
