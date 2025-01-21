'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'title',
    headerName: 'Title',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];



export default function DataGridDemo({ wishes }) {
  const [rows, setRows] = React.useState([]);
  

  React.useEffect(() => {
    if (wishes) {
   
      const newRows = wishes.attributes.wishes.map((wish) => {
        return {
          id: wish.id,
          title: wish.title,
          // lastName: wish.description,
          // age: wish.price,
        };
      });
      setRows(newRows);
    }
  }, [wishes]);
  
  return (
    <Box sx={{ height: 400, width: '100%', backgroundColor: 'background.paper' }}>
      <DataGrid
       sx={{ color: 'text.secondary' }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}