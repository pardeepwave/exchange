import { FC } from "react";
type props = {
  columns: string[];
  body: any;
};
const Table: FC<props> = ({ columns, body }) => {
  return (
    <div className="exchange-volume-table">
      <div className="table-responsive">
        <div
          id="DataTables_Table_1_wrapper"
          className="dataTables_wrapper no-footer"
        >
          <table
            className="table table-borderless dataTable no-footer"
            id="DataTables_Table_1"
            role="grid"
            aria-describedby="DataTables_Table_1_info"
          >
            <thead>
              <tr role="row">
                {columns.map((col, i) => (
                  <th
                    scope="col"
                    className="sorting_disabled"
                    rowSpan={1}
                    colSpan={1}
                    style={{ width: "217.516px" }}
                    key={i}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row: any) => (
                <tr role="row" className="odd">
                  {Object.values(row).map((cell) => (
                    <td>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
