import { DataSourceRow } from "@finos/vuu-data-types";
import { MutableRefObject } from "react";
import { metadataKeys } from "./column-utils";

const { IDX } = metadataKeys;

export type RowOffsetFunc = (
  row: DataSourceRow,
  pctScrollTop?: number
) => number;
export type RowAtPositionFunc = (position: number) => number;

export type RowPositioning = [RowOffsetFunc, RowAtPositionFunc];

export const actualRowPositioning = (rowHeight: number): RowPositioning => [
  (row) => row[IDX] * rowHeight,
  (position) => Math.floor(position / rowHeight),
];

export const virtualRowPositioning = (
  rowHeight: number,
  additionalPixelsNeeded: number,
  pctScrollTop: MutableRefObject<number>
): RowPositioning => [
  (row) => {
    const rowOffset = pctScrollTop.current * additionalPixelsNeeded;
    return row[IDX] * rowHeight - rowOffset;
  },
  (position) => {
    const rowOffset = pctScrollTop.current * additionalPixelsNeeded;
    const result = Math.floor((position + rowOffset) / rowHeight);
    return result;
  },
];

export const getIndexFromRowElement = (rowElement: HTMLElement) => {
  const rowIndex = rowElement.ariaRowIndex;
  if (rowIndex != null) {
    const index = parseInt(rowIndex) - 1;
    if (!isNaN(index)) {
      return index;
    } else {
      throw Error(
        `getIndexFromRowElement row element aria rowindex invalid ${rowIndex}`
      );
    }
  } else {
    throw Error(
      "getIndexFromRowElement row element does not have aria rowindex"
    );
  }
};
