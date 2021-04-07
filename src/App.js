import React, { useState, useEffect } from 'react';
import { fetchData } from './services';
import {
  Checkbox,
  Container,
  Dropdown,
  Header,
  Icon,
  Pagination,
} from 'semantic-ui-react';
import Loader from './components/Loader/Loader';
import VaccineInfoTable from './components/Table/VaccineInfoTable';
import NoAvailableAppointment from './components/NoAvailableAppointment/NoAvailableAppointment';
import Footer from './components/Footer/Footer';

const pageSize = 10;

function App() {
  const [vaccineInfo, setVaccineInfo] = useState();
  const [data, setData] = useState();
  const [counties, setCounties] = useState([]);
  const [countyToSearch, setCountyToSearch] = useState();
  const [onlyShowAvailable, setOnlyShowAvailable] = useState(false);
  const [activePage, setActivePage] = useState(1);

  const handlePageChange = (_, { activePage: page }) => {
    setActivePage(page);
  };

  const renderPage = () => (
    <React.Fragment>
      <Header as="h1" size="huge">
        New Jersey COVID-19 Vaccine Finder
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
              setActivePage(1);
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
        <React.Fragment>
          <VaccineInfoTable
            vaccineInfo={vaccineInfo}
            activePage={activePage}
            pageSize={pageSize}
          />
          <div className="pagination-container">
            <Pagination
              activePage={activePage}
              onPageChange={handlePageChange}
              size="small"
              totalPages={Math.ceil(vaccineInfo.length / pageSize)}
              ellipsisItem={{
                content: <Icon name="ellipsis horizontal" />,
                icon: true,
              }}
              firstItem={{
                content: <Icon name="angle double left" />,
                icon: true,
              }}
              lastItem={{
                content: <Icon name="angle double right" />,
                icon: true,
              }}
              prevItem={{ content: <Icon name="angle left" />, icon: true }}
              nextItem={{ content: <Icon name="angle right" />, icon: true }}
            />
          </div>
        </React.Fragment>
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
        [...new Set(data.map(({ official: { County: county } }) => county))]
          .filter(Boolean)
          .sort()
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
      setActivePage(1);
    }
  }, [countyToSearch, data, onlyShowAvailable]);

  return (
    <div className="app">
      <Container className="page-container">
        {vaccineInfo ? renderPage() : <Loader />}
      </Container>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
