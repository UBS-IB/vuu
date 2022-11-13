import { DataSource } from "@vuu-ui/vuu-data";
import { Dispatch, MutableRefObject } from "react";
import { VuuAggregation } from "../../../vuu-protocol-types";
import { ColumnDescriptor, GridProps } from "../gridTypes";
import { SizeState } from "./useSize";

export interface KeyedColumnDescriptor extends ColumnDescriptor {
  key: number;
}

export type ColumnGroupType = {
  columns: KeyedColumnDescriptor[];
};

export interface GridModelType
  extends Pick<
    GridProps,
    | "cellSelectionModel"
    | "columns"
    | "columnSizing"
    | "defaultColumnWidth"
    | "filter"
    | "groupBy"
    | "headerHeight"
    | "minColumnWidth"
    | "noColumnHeaders"
    | "renderBufferSize"
    | "rowHeight"
    | "selectionModel"
    | "showLineNumbers"
    | "sort"
  > {
  aggregations: VuuAggregation[];
  assignedHeight: SizeState["height"];
  assignedWidth: SizeState["width"];
  columnNames: null | string[];
  columnGroups?: ColumnGroupType[];
  customFooterHeight?: number;
  customHeaderHeight?: number;
  customInlineHeaderHeight?: number;
  headingDepth: number | undefined;
  height: string | number | undefined | null;
  horizontalScrollbarHeight: undefined | number;
  totalHeaderHeight: number;
  viewportHeight: number;
  viewportRowCount: number;
  visualLinks: any;
  width: string | number | undefined | null;
}

export type GridModelHookProps = Pick<
  GridProps,
  | "aggregations"
  | "cellSelectionModel"
  | "children"
  | "columns"
  | "columnSizing"
  | "dataSource"
  | "defaultColumnWidth"
  | "filter"
  | "groupBy"
  | "headerHeight"
  | "height"
  | "minColumnWidth"
  | "noColumnHeaders"
  | "renderBufferSize"
  | "rowHeight"
  | "selectionModel"
  | "showLineNumbers"
  | "sort"
  | "style"
  | "width"
>;
export type GridModelHookResult = [
  MutableRefObject<HTMLDivElement | null>,
  GridModelType,
  DataSource,
  Dispatch<unknown>,
  any
];

export type GridModelReducerInitializerProps = Pick<
  GridModelHookProps,
  | "aggregations"
  | "cellSelectionModel"
  | "columns"
  | "columnSizing"
  | "defaultColumnWidth"
  | "filter"
  | "groupBy"
  | "headerHeight"
  | "minColumnWidth"
  | "noColumnHeaders"
  | "renderBufferSize"
  | "rowHeight"
  | "selectionModel"
  | "showLineNumbers"
  | "sort"
>;

export type GridModelReducerInitializerTuple = [
  GridModelReducerInitializerProps,
  SizeState,
  any
];
