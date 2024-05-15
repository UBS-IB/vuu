import { useState } from "react";
import { Component } from "@finos/vuu-layout";
import { Dialog, DialogProvider, useShowDialog } from "@finos/vuu-popups";

let displaySequence = 1;

export const SimpleDialog = () => {
  return (
    <Dialog title="Cornflower" isOpen>
      <Component
        style={{ backgroundColor: "cornflowerblue", height: 400, width: 300 }}
      />
    </Dialog>
  );
};
SimpleDialog.displaySequence = displaySequence++;

export const DialogOpenClose = () => {
  const [open, setOpen] = useState(false);
  const openDialog = () => {
    setOpen(true);
  };
  const closeDialog = () => {
    console.log("close");
    setOpen(false);
  };
  return (
    <div>
      <button onClick={open ? closeDialog : openDialog}>{`${
        open ? "Close" : "Open"
      } Dialog`}</button>
      <Dialog title="Cornflower" isOpen={open} onClose={closeDialog}>
        <Component
          style={{ backgroundColor: "cornflowerblue", height: 400, width: 300 }}
        />
      </Dialog>
    </div>
  );
};
DialogOpenClose.displaySequence = displaySequence++;

const ComponentWithDialog = () => {
  const showDialog = useShowDialog();
  const showDefaultDialog = () => {
    showDialog(
      <div style={{ height: 100, width: 100, backgroundColor: "yellow" }} />,
      "Edit"
    );
  };
  return (
    <div style={{ height: 100, width: 100, backgroundColor: "red" }}>
      <button onClick={showDefaultDialog}>Show Dialog</button>
    </div>
  );
};

export const DialogWithProvider = () => {
  return (
    <DialogProvider>
      <ComponentWithDialog />
    </DialogProvider>
  );
};
DialogWithProvider.displaySequence = displaySequence++;
