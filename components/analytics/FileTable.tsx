import React from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { repositoryFilesQuery } from "@/redux/queries";
import { useSelector } from "react-redux";
import useSWR from "swr";
import Launch from "@material-ui/icons/Launch";
import Loading from "@/components/Loader";

const fetcher = async (url: string, query: string, PAT: string) => {
  const data = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, PAT }),
  });
  return data.json();
};

export default function FileTable({ repo }: any) {
  const props = useSelector((state: any) => ({
    PAT: state.PAT,
    userName: state.userName,
  }));
  const query = repositoryFilesQuery(props.userName, repo);
  const { data } = useSWR(["/api/github-v4", query, props.PAT], fetcher);

  if (!data || !repo) {
    return <Loading />;
  }

  const RowData = data.repository.object.entries;

  const columns: GridColDef[] = [
    { field: "name", headerName: "File Name", flex: 0.5 },
    { field: "byteSize", headerName: "Size (bytes)", flex: 0.3 },
    {
      field: "commitUrl",
      headerName: "Access",
      flex: 0.2,
      renderCell: (params) => (
        <a href={params.row.commitUrl} target="_blank" rel="noreferrer">
          <Launch />
        </a>
      ),
    },
  ];

  const rows: GridRowsProp = RowData.map((file: any) => ({
    id: file.object.abbreviatedOid,
    name: file.name,
    byteSize: file.object.byteSize,
    commitUrl: file.object.commitUrl,
  }));

  return (
    <div style={{ height: 250, width: "100%" }}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            rowsPerPageOptions={[2]}
            pageSize={2}
          />
        </div>
      </div>
    </div>
  );
}
