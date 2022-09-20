import PropTypes from 'prop-types';
import { Button, Select } from 'antd';
import { useState } from 'react';

import './Bus.scss';

const Option = Select.Option;

function Bus({ stations, onJourney }) {

    const [sourceStation, selectSourceStation] = useState(null);
    const [destinationStation, selectDestinationStation] = useState(null);

    return (
        <div className="Bus">
            <Select
                style={{ width: '200px' }}
                placeholder='Select source station'
                onChange={(station) => {
                    if (station === destinationStation) selectDestinationStation(null);
                    selectSourceStation(station);
                }}
                value={sourceStation}
            >
                {stations.map(s => <Option value={s} key={s}>{s}</Option>)}
            </Select>

            <Select
                style={{ width: '200px' }}
                onChange={(station) => {
                    if (station === sourceStation) selectSourceStation(null);
                    selectDestinationStation(station);
                }}
                placeholder='Select destination station'
                disabled={sourceStation === null}
                value={destinationStation}
            >
                {stations.filter(s => s !== sourceStation).map(s => <Option value={s} key={s}>{s}</Option>)}
            </Select>

            <br />
            <br />
            <Button disabled={!sourceStation || !destinationStation} type='primary' onClick={() => {
                onJourney(sourceStation, destinationStation);
            }}>
                Make Journey
            </Button>
        </div>
    );
}

Bus.propTypes = {
    stations: PropTypes.arrayOf(PropTypes.string).isRequired,
    onJourney: PropTypes.func.isRequired,
};

export default Bus;
