import React from "react";
import {
    Button,
    Paper,
    Typography,
    Grid,
    TextField
  } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { AttachFile } from "@mui/icons-material";
  const Welcome = () => {
    const columns: GridColDef[] = [
        { field: "Case ID", headerName: "Case ID", width: 70 },
        { field: "Request Details", headerName: "Request Details", width: 130 },
        { field: "Created By", headerName: "Created By", width: 130 },
      ];
  return (
    <Grid container spacing={3} className="main-content">
    <Grid item xs={12} md={6}>
      <Paper className="welcome-section" style={{ padding: "16px" }}>
        <Typography variant="h4">Welcome, Deepika!</Typography>
        <Typography variant="body1">
          <strong>Good morning.</strong> Get health support from anywhere
          with Crossover Health
        </Typography>
        <div className="welcome-image">
          <img src="path-to-image" alt="Welcome" />
        </div>
      </Paper>
    </Grid>

    <Grid item xs={12} md={6}>
      <Paper
        className="tasks-section"
        style={{ padding: "16px", marginBottom: "10px" }}
      >
        <div style={{ display: "flex" }}>
          <span
            style={{
              backgroundColor: "black",
              marginRight: "1rem",
              borderRadius: "22px",
              color: "white",
              padding: "4px 6px",
            }}
          >
            DS
          </span>
          <Typography variant="h6">Tasks</Typography>
        </div>
        <div className="task-item">
          <Typography variant="body1">
            <b>Capture Intake data</b>
          </Typography>
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography variant="body2">
              In{" "}
              <span style={{ color: "blue" }}>
                Copay Waiver (CC-153205){" "}
              </span>{" "}
              &bull; Urgency 100{" "}
            </Typography>
            <Button variant="contained" color="primary">
              Go
            </Button>
          </div>
        </div>
        <hr />
        <div className="task-item">
          <Typography variant="body1">
            <b>Create Process</b>
          </Typography>
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography variant="body2">
              In{" "}
              <span style={{ color: "blue" }}>
                ManageProcess (M-2047)
              </span>{" "}
              &bull; Urgency 10
            </Typography>
            <Button variant="contained" color="primary">
              Go
            </Button>
          </div>
        </div>
        <hr />
        <div style={{ display: "flex", justifyContent: "center" }}>
          {" "}
          <Button color="primary">View More</Button>
        </div>
      </Paper>

      <Paper
        className="followed-items-section"
        style={{ padding: "16px", marginBottom: "10px" }}
      >
        <Typography variant="h6">My followed items</Typography>
        <br />
        <div style={{ height: 100, width: "100%" }}>
          <DataGrid
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </div>
      </Paper>

      <Paper className="pulse-section" style={{ padding: "16px" }}>
        <Typography variant="h6">Pulse</Typography>
        <div className="pulse-input">
          {/* <Button variant="contained">JB</Button> */}
          <div style={{ display: "flex" }}>
            <span
              style={{
                backgroundColor: "black",
                borderRadius: "22px",
                color: "white",
                padding: "7px 9px",
              }}
            >
              DS
            </span>
            <TextField
              variant="outlined"
              placeholder="Start a conversation"
              size="small"
              fullWidth
            />
          </div>
          <div style={{ marginTop: "1rem" }}>
            <Button variant="contained" style={{ marginRight: "1rem" ,width:'130px',height:'30px'}}>
              Send
            </Button>
            <Button variant="contained" style={{width:'150px',height:'30px'}}>
              <AttachFile style={{height:'15px'}}/>
              Attach file
            </Button>
          </div>
        </div>
      </Paper>
    </Grid>
  </Grid>
  );
};

export default Welcome;
