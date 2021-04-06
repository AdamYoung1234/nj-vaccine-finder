import React, { useState, useEffect } from 'react';
import { fetchData } from './services';
import { Checkbox, Container, Dropdown, Header } from 'semantic-ui-react';
import Loader from './components/Loader/Loader';
import VaccineInfoTable from './components/Table/VaccineInfoTable';
import NoAvailableAppointment from './components/NoAvailableAppointment/NoAvailableAppointment';
import Footer from './components/Footer/Footer';

function App() {
  const [vaccineInfo, setVaccineInfo] = useState();
  const [data, setData] = useState();
  const [counties, setCounties] = useState([]);
  const [countyToSearch, setCountyToSearch] = useState();
  const [onlyShowAvailable, setOnlyShowAvailable] = useState(false);

  const renderPage = () => (
    <React.Fragment>
      <Header as="h1" size="huge">
        New Jersey Vaccine Finder
      </Header>
      <section className="search-refinement__container">
        <div className="search-refinement__dropdown">
          <Dropdown
            placeholder="Select County"
            fluid
            search
            selection
            clearable
            value={countyToSearch}
            onChange={(_, { value }) => {
              setCountyToSearch(value || undefined);
            }}
            options={counties.map((county) => ({
              key: county,
              value: county,
              text: county,
            }))}
          />
        </div>
        <div className="search-refinement__checkbox">
          <Checkbox
            toggle
            label="Only Show Locations with Available Appointments"
            onChange={(_, { checked }) => {
              setOnlyShowAvailable(checked);
            }}
            checked={onlyShowAvailable}
          />
        </div>
      </section>
      {vaccineInfo.length > 0 ? (
        <VaccineInfoTable vaccineInfo={vaccineInfo} />
      ) : (
        <NoAvailableAppointment />
      )}
    </React.Fragment>
  );

  useEffect(() => {
    const getVaccineInfo = async () => {
      const data = await fetchData();
      setVaccineInfo(data);
      setData(data);
      setCounties(
        [
          ...new Set(data.map(({ official: { County: county } }) => county)),
        ].filter(Boolean).sort()
      );
    };

    getVaccineInfo();
  }, []);

  useEffect(() => {
    if (data) {
      const filtered = data.filter(
        ({ official: { County: county }, available }) => {
          return (
            (!countyToSearch || county === countyToSearch) &&
            (onlyShowAvailable ? available === 'yes' : true)
          );
        }
      );

      setVaccineInfo(filtered);
    }
  }, [countyToSearch, data, onlyShowAvailable]);

  return (
    <div className="app">
      <Container className="page-container">{vaccineInfo ? renderPage() : <Loader />}</Container>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
