import f1logo from './f1_logo.svg';
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import React, { Component } from 'react';
import './App.css';


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#000000',
    color: theme.palette.common.white,
  },
  body: {
    fontFamily: 'arial',
    fontSize: 13,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: '#f5f5f5',
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

var yearLatest = 2023;
var yearStart = 1949;
var years = []
for ( var i = yearLatest; i > yearStart; i-- ) {
  years.push(i)
}

const App = () => {
  const classes = useStyles();
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(years[0])

  //authetication key
  const key = ''
  const getProductData = async (year) => {
    const AuthStr = 'Bearer '.concat(key);
    const URL = "https://pitwall.redbullracing.com/api/stats/drivers/" + year
    try {
      const data = await axios.get(URL, { headers: { 'Authorization': AuthStr } })
      console.log("Data: " + JSON.stringify(data.data));
      setProduct(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const submit = () => {
    console.log("Grabbing data from " + selected);
    getProductData(selected)
  };

  useEffect(() => {
    getProductData(yearLatest);
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <a href="https://www.formula1.com/en.html" target="_blank" rel="noopener noreferrer">
          <img 
            src={f1logo} 
            className="App-f1-logo" 
            alt="f1logo"
          />
        </a> 
      </header>
      <a href="https://www.formula1.com/en/results.html/2023/drivers.html" target="_blank" rel="noopener noreferrer">
        <h1 >Driver Standings</h1>
      </a>
      <form className="Form"> 
        <select 
        className="Select"
        value={selected} 
        onChange={(e) => setSelected(e.target.value)}>
          {years.map((value) => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
        </select>
        <button type="button" onClick={submit} className="Button">
          Go
        </button>
      </form>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Position</StyledTableCell>
              <StyledTableCell>Driver name</StyledTableCell>
              <StyledTableCell>Country</StyledTableCell>
              <StyledTableCell>Constructor name</StyledTableCell>
              <StyledTableCell>Points total</StyledTableCell>
              <StyledTableCell>Wins</StyledTableCell>
              <StyledTableCell>Poles</StyledTableCell>
              <StyledTableCell>Podiums</StyledTableCell>
              <StyledTableCell>Fastest laps</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {product
              .filter((item) => {
                if (search == "") {
                  return item;
                } else if (
                  item.name.toLowerCase().includes(search.toLowerCase())
                ) {
                  return item;
                }
              })
              .map((item,  index) => {
                return (
                  <StyledTableRow key={item.id}>
                    <StyledTableCell component="th" scope="row" key={index}>
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell>
                      {item.first_name + ' ' + item.last_name}
                    </StyledTableCell>
                    <StyledTableCell>
                      {item.driver_country_code}
                    </StyledTableCell>
                    <StyledTableCell>
                      {item.season_team_name}
                    </StyledTableCell>
                    <StyledTableCell>
                      {item.season_points}
                    </StyledTableCell>
                    <StyledTableCell>
                      {item.driver_wins}
                    </StyledTableCell>
                    <StyledTableCell>
                      {item.driver_poles}
                    </StyledTableCell>
                    <StyledTableCell>
                      {item.driver_podiums}
                    </StyledTableCell>
                    <StyledTableCell>
                      {item.driver_fastest_laps}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default App;
