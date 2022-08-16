import React, { useState } from 'react';
import data, { getAirlineById, getAirportByCode } from './data';
import Table from './components/Table';
import Select from './components/Select';
import Map from './components/Map';
import './App.css';


const App = () => {
  const [airline, setAirline] = useState("all");
  const [airport, setAirport] = useState("all");

  const columns = [
    {name: 'Airline', property: 'airline'},
    {name: 'Source Airport', property: 'src'},
    {name: 'Destination Airport', property: 'dest'},
  ];

  const formatValue = (property, value) => {
    switch (property) {
      case "airline":
        return getAirlineById(value[property]);
      case "src":
      case "dest":
        return getAirportByCode(value[property]);
      default:
        return value;
    }
  };

  const handleAirlineFilter = (e) => {
    let value = e.target.value;
    if (value !== "all") value = Number(value);
    setAirline(value);
  }

  const handleAirportFilter = (e) => {
    setAirport(e.target.value);
  }

  const handleShowAll = () => {
    setAirline("all");
    setAirport("all");
  }

  const routes = data.routes.filter(route => {
    return (airline === "all" || route.airline === airline)
      && (airport === "all" || route.src === airport || route.dest === airport);
  });

  const airlines = data.airlines.map(line => {
    if (routes.map(r => r.airline).includes(line.id)) return line;
    return {...line, disable: true}
  });

  const airports = data.airports.map(port => {
    if (routes.flatMap(r => [r.src, r.dest]).includes(port.code)) return port;
    return {...port, disable: true}
  });

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <Map routes={routes} airports={airports} />
        <p>
          Show routes on
          <Select options={airlines} valueKey="id" titleKey="name"
          allTitle="All Airlines" value={airline} onSelect={handleAirlineFilter} />
          flying in or out of
          <Select options={airports} valueKey="code" titleKey="name"
          allTitle="All Airports" value={airport} onSelect={handleAirportFilter} />
          <button onClick={handleShowAll}>Show All Routes</button>
        </p>
        <Table
          className="routes-table"
          columns={columns}
          rows={routes}
          format={formatValue}
          type="routes"
        />
      </section>
    </div>
  )
};

export default App;
