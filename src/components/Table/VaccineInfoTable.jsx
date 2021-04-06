import React, { useEffect, useState } from 'react';
import { Button, Icon, Item, Label, Pagination } from 'semantic-ui-react';

const nomalize = (s) => s.split('\n').join(', ');
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const formatDate = (date) => new Date(date).toLocaleString();
const mapBaseUrl = 'https://www.google.com/maps/dir/';

const VaccineInfoTable = ({ vaccineInfo, activePage, pageSize }) => {
  const [sliced, setSliced] = useState([]);

  useEffect(() => {
    const start = (activePage - 1) * 10;
    const end = start + pageSize;
    setSliced(vaccineInfo.slice(start, end));
  }, [activePage, pageSize, vaccineInfo]);

  return (
    <React.Fragment>
      <Item.Group divided>
        {sliced.map(
          ({
            available,
            checked_at,
            official: {
              'Facility Name': name,
              'Facility Address': address,
              'Facility Website': website,
              'Phone Number for Appointments + Questions': phone,
              'Minimum Age': minAge,
              isMegasite,
            },
          }) => (
            <Item key={`${name}${address}`}>
              <Item.Content>
                <Item.Header>{name}</Item.Header>
                <Item.Meta>
                  <span>{nomalize(address)}</span>
                </Item.Meta>
                <Item.Description>
                  {available && (
                    <p>Appointments Available: {capitalize(available)}</p>
                  )}
                  {phone && <p>Phone Number: {phone} </p>}
                  {minAge && <p>Minimum Age: {minAge} </p>}
                </Item.Description>
                <Item.Extra>
                  <Button
                    as="a"
                    primary
                    floated="right"
                    href={website}
                    target="__blank"
                  >
                    Schedule an Appointment
                    <Icon name="right chevron" />
                  </Button>

                  <Button
                    as="a"
                    floated="right"
                    href={`${mapBaseUrl}/${address}`}
                    target="__blank"
                  >
                    Directions
                    <Icon name="hand point right outline" />
                  </Button>
                  {isMegasite && <Label color="pink" content="Mega Site" />}
                  <Label
                    icon="calendar outline"
                    content={
                      checked_at
                        ? `Last Updated at ${formatDate(checked_at)}`
                        : 'No Update Available'
                    }
                  />
                </Item.Extra>
              </Item.Content>
            </Item>
          )
        )}
      </Item.Group>
    </React.Fragment>
  );
};

export default VaccineInfoTable;
