
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';

function EditDestinationButton(props) {
    const url = "http://127.0.0.1:3000/Destination/Edit/" + props.name;
    return (
      <a href={url} style={{ textDecoration: 'none' }}>
        <EditIcon style={{ cursor: 'pointer' }} />
      </a>
    );
  }
  
export default EditDestinationButton;