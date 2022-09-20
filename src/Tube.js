import PropTypes from 'prop-types';
import { Button, Select } from 'antd';
import { useState } from 'react';

import './Bus.scss';

const Option = Select.Option;

function Tube({ stations, onEnterStation, onExitStation }) {

    const [sourceStation, selectSourceStation] = useState(null);
    const [destinationStation, selectDestinationStation] = useState(null);
    const [insideTube, setInsideTube] = useState(false);

    return (
        <div className="Bus">
            <Select
                style={{ width: '200px' }}
                placeholder='Select source station'
                onChange={(station) => {
                    setInsideTube(false);
                    if (station === destinationStation) selectDestinationStation(null);
                    selectSourceStation(station);
                }}
                value={sourceStation}
            >
                {stations.map(s => <Option value={s} key={s}>{s}</Option>)}
            </Select>

            <Button style={{ width: '100px' }} disabled={!sourceStation || insideTube} type='primary' onClick={() => {
                onEnterStation(sourceStation) === false ? setInsideTube(false) : setInsideTube(true);
            }}>
                {insideTube ? 'Entered' : 'Enter Station'}
            </Button>
            <br />
            <br />
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
            <Button style={{ width: '100px' }} disabled={!destinationStation || !insideTube} type='primary' onClick={() => {
                onExitStation(sourceStation, destinationStation);
                setInsideTube(false);
            }}>
                Exit Station
            </Button>
        </div>
    );
}

Tube.propTypes = {
    stations: PropTypes.arrayOf(PropTypes.string).isRequired,
    onEnterStation: PropTypes.func.isRequired,
    onExitStation: PropTypes.func.isRequired,
};

export default Tube;
