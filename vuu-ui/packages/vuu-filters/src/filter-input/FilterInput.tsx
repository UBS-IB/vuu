import { Filter } from "@finos/vuu-filters";
import { HTMLAttributes } from "react";
import { SuggestionConsumer, useCodeMirrorEditor } from "./useCodeMirrorEditor";
import { Button } from "@salt-ds/core";

import "./FilterInput.css";

const classBase = "vuuFilterInput";

export interface FilterInputProps
  extends SuggestionConsumer,
    HTMLAttributes<HTMLDivElement> {
  existingFilter?: Filter;
  onSubmitFilter?: (
    filter: Filter | undefined,
    filterQuery: string,
    filterName?: string
  ) => void;
}

export const FilterInput = ({
  existingFilter,
  onSubmitFilter,
  suggestionProvider,
}: FilterInputProps) => {
  const { editorRef, clearInput } = useCodeMirrorEditor({
    existingFilter,
    onSubmitFilter,
    suggestionProvider,
  });

  return (
    <div className={classBase}>
      <Button className={`${classBase}-FilterButton`} data-icon="filter" />
      <div className={`${classBase}-Editor`} ref={editorRef} />
      <Button
        className={`${classBase}-ClearButton`}
        data-icon="close-circle"
        onClick={clearInput}
      />
    </div>
  );
};
