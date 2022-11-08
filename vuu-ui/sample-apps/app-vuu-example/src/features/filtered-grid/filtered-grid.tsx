import {
  extractFilter,
  filterAsQuery,
  parseFilter,
} from "@vuu-ui/datagrid-parsers";
import { useViewContext } from "@vuu-ui/vuu-layout";
import { ParsedInput, ParserProvider } from "@vuu-ui/parsed-input";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { createSuggestionProvider } from "./vuu-filter-suggestion-provider";

import { LinkedIcon } from "@heswell/uitk-icons";
import { ToolbarButton } from "@heswell/uitk-lab";
import { Grid, GridProvider } from "@vuu-ui/vuu-datagrid";
import {
  ConfigChangeMessage,
  createDataSource,
  RemoteDataSource,
  TableSchema,
  useViewserver,
} from "@vuu-ui/vuu-data";
import { ContextMenuProvider } from "@vuu-ui/ui-controls";
import AppContext from "../../app-context";

import { NamedFilter } from "@vuu-ui/datagrid-parsers";
import { Filter } from "@vuu-ui/vuu-utils";
import { FeatureProps } from "@vuu-ui/vuu-shell";

import "./filtered-grid.css";

export interface FilteredGridProps extends FeatureProps {
  schema: TableSchema;
}

const FilteredGrid = ({ schema, ...props }: FilteredGridProps) => {
  const { id, dispatch, load, purge, save, loadSession, saveSession } =
    useViewContext();
  const config = useMemo(() => load(), [load]);
  const { handleRpcResponse } = useContext(AppContext);
  const [namedFilters, setNamedFilters] = useState<NamedFilter[]>([]);

  const dataSource: RemoteDataSource = useMemo(() => {
    let ds = loadSession("data-source");
    if (ds) {
      return ds;
    }
    ds = createDataSource({ id, table: schema.table, schema, config });
    saveSession(ds, "data-source");
    return ds;
  }, [config, id, loadSession, saveSession, schema]);

  useEffect(() => {
    dataSource.enable();
    return () => {
      dataSource.disable();
    };
  }, [dataSource]);

  const removeVisualLink = useCallback(() => {
    dataSource.removeLink();
  }, [dataSource]);

  const handleConfigChange = useCallback(
    (update: ConfigChangeMessage) => {
      console.log(`handleConfigChange`, {
        update,
      });
      if (update.type === "CREATE_VISUAL_LINK_SUCCESS") {
        dispatch?.({
          type: "add-toolbar-contribution",
          location: "post-title",
          content: (
            <ToolbarButton aria-label="remove-link" onClick={removeVisualLink}>
              <LinkedIcon />
            </ToolbarButton>
          ),
        });
        save(update, "visual-link");
      } else if (update.type === "REMOVE_VISUAL_LINK_SUCCESS") {
        dispatch?.({
          type: "remove-toolbar-contribution",
          location: "post-title",
        });
        purge("visual-link");
      } else {
        for (let [key, state] of Object.entries(update)) {
          save(state, key);
        }
      }
    },
    [dispatch, save]
  );

  const {
    buildViewserverMenuOptions,
    dispatchGridAction,
    getTypeaheadSuggestions,
    handleMenuAction,
  } = useViewserver({
    loadSession,
    rpcServer: dataSource,
    onConfigChange: handleConfigChange,
    onRpcResponse: handleRpcResponse,
    saveSession,
  });

  const handleCommit = useCallback(
    (result: Filter) => {
      const { filter, name } = extractFilter(result);
      const filterQuery = filterAsQuery(filter, namedFilters);
      dataSource.filter(filter, filterQuery);
      if (name) {
        const namedFilter = { name, filter } as NamedFilter;
        setNamedFilters(namedFilters.concat(namedFilter));
      }
    },
    [dataSource, namedFilters]
  );

  console.log({ dataSourceColumns: dataSource.columns });

  return (
    <ContextMenuProvider
      menuActionHandler={handleMenuAction}
      menuBuilder={buildViewserverMenuOptions}
    >
      <ParserProvider
        parser={parseFilter}
        suggestionProvider={createSuggestionProvider({
          columns: schema.columns,
          namedFilters,
          getSuggestions: getTypeaheadSuggestions,
          table: dataSource.table,
        })}
      >
        <ParsedInput onCommit={handleCommit} />
      </ParserProvider>

      <GridProvider value={{ dispatchGridAction }}>
        <Grid
          {...props}
          columnSizing="fill"
          dataSource={dataSource}
          aggregations={config?.aggregations}
          columns={config?.columns || schema.columns}
          groupBy={config?.group}
          onConfigChange={handleConfigChange}
          renderBufferSize={80}
          rowHeight={18}
          selectionModel="extended"
          sort={config?.sort}
          showLineNumbers
        />
      </GridProvider>
    </ContextMenuProvider>
  );
};

FilteredGrid.displayName = "FilteredGrid";

export default FilteredGrid;