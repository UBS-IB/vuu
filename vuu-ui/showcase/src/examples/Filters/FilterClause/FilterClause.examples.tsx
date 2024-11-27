import { LocalDataSourceProvider, getSchema } from "@finos/vuu-data-test";
import { SchemaColumn, TableSchema } from "@finos/vuu-data-types";
import { ColumnDescriptorsByName } from "@finos/vuu-filter-types";
import { FilterClause, FilterClauseModel } from "@finos/vuu-filters";
import { useMemo } from "react";

import "./FilterClause.examples.css";

const FilterClauseTemplate = ({
  filterClauseModel = new FilterClauseModel({}),
  tableSchema = getSchema("instruments"),
  columnsByName = columnDescriptorsByName(tableSchema.columns),
}: {
  columnsByName?: ColumnDescriptorsByName;
  filterClauseModel?: FilterClauseModel;
  tableSchema?: TableSchema;
}) => {
  return (
    <div style={{ padding: "10px" }}>
      <FilterClause
        columnsByName={columnsByName}
        data-testid="filterclause"
        filterClauseModel={filterClauseModel}
        tableSchema={tableSchema}
      />
    </div>
  );
};

export const NewFilterClause = () => {
  return (
    <LocalDataSourceProvider modules={["SIMUL"]}>
      <FilterClauseTemplate />
    </LocalDataSourceProvider>
  );
};

export const NewFilterClauseNoCompletions = () => {
  return <FilterClauseTemplate />;
};

export const PartialFilterClauseColumnOnly = () => {
  const filterClauseModel = useMemo(
    () =>
      new FilterClauseModel({
        column: "currency",
      }),
    [],
  );
  return (
    <LocalDataSourceProvider modules={["SIMUL"]}>
      <FilterClauseTemplate filterClauseModel={filterClauseModel} />
    </LocalDataSourceProvider>
  );
};

export const PartialFilterClauseColumnAndOperator = () => {
  const filterClauseModel = useMemo(
    () =>
      new FilterClauseModel({
        column: "currency",
        op: "=",
      }),
    [],
  );
  return (
    <LocalDataSourceProvider modules={["SIMUL"]}>
      <FilterClauseTemplate filterClauseModel={filterClauseModel} />
    </LocalDataSourceProvider>
  );
};

export const CompleteFilterClauseTextEquals = () => {
  const filterClauseModel = useMemo(
    () =>
      new FilterClauseModel({
        column: "currency",
        op: "=",
        value: "EUR",
      }),
    [],
  );

  return (
    <LocalDataSourceProvider modules={["SIMUL"]}>
      <FilterClauseTemplate filterClauseModel={filterClauseModel} />
    </LocalDataSourceProvider>
  );
};

export const PartialFilterClauseDateColumnOnly = () => {
  const tableColumns: SchemaColumn[] = [
    {
      name: "tradeDate",
      serverDataType: "long",
    },
    {
      name: "settlementDate",
      serverDataType: "long",
    },
  ];

  const tableSchema: TableSchema = {
    columns: tableColumns,
    key: "id",
    table: { table: "Test", module: "test" },
  };

  const columnsByName: ColumnDescriptorsByName = {
    tradeDate: {
      ...tableColumns[0],
      type: "date/time",
    },
    settlementDate: {
      ...tableColumns[1],
      type: "date/time",
    },
  };

  const filterClauseModel = useMemo(() => {
    const model = new FilterClauseModel({
      column: "tradeDate",
    });
    model.on("filterClause", (clause) =>
      console.log(`onFilterClause ${JSON.stringify(clause)}`),
    );
    return model;
  }, []);

  return (
    <LocalDataSourceProvider modules={["SIMUL"]}>
      <FilterClauseTemplate
        columnsByName={columnsByName}
        filterClauseModel={filterClauseModel}
        tableSchema={tableSchema}
      />
    </LocalDataSourceProvider>
  );
};

const columnDescriptorsByName = (columns: TableSchema["columns"]) =>
  columns.reduce((m, col) => ({ ...m, [col.name]: col }), {});
