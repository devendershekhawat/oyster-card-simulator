import { message } from 'antd';

const BUS_FARE = 1.80;
const MAX_FARE = 3.20;

const FARE_IN_ZONE_ONE = 2.50;
const EXCLUDING_ZONE_ONE = 2.25;
const ONE_ZONE_OUTSIDE_ZONE_ONE = 2.00;
const TWO_ZONES_INCLUDING_ZONE_ONE = 3.00;

import { useState } from 'react';
import { stations } from '../stations';

function useCard(defaultBalance = 0) {
    const [balance, setBalance] = useState(defaultBalance);

    const setRoundedOffBalance = (amount) => {
        setBalance(Math.round(amount * 100) / 100);
    };

    const addBalance = (amount = 0) => {
        setRoundedOffBalance(balance + amount);
        message.success(`Added €${amount} to your card.`);
    };

    const travelByBus = (source, destination) => {
        if (balance < BUS_FARE) {
            message.error('You dont have sufficient balance');
            return;
        }
        setRoundedOffBalance(balance - BUS_FARE);
        message.info(`€${BUS_FARE} deducted from your account. ${source} --> ${destination}`);
        return true;
    };

    const enterStation = (station) => {
        if (balance < MAX_FARE) {
            message.error('You have a balance lower than required minimum balance');
            return false;
        }
        setRoundedOffBalance(balance - MAX_FARE);
        message.info(`€${MAX_FARE} deducted from your account at inward barrier of ${station} station`);
    };

    const exitStation = (source, station) => {
        const fare = _calculateActualTubeFare(source, station);
        setRoundedOffBalance(balance - fare + MAX_FARE);
        message.info(`€${fare} deducted from your account. ${source} --> ${station}`);
        message.info(`€${MAX_FARE} refunded`);
    };

    return { balance, addBalance, travelByBus, enterStation, exitStation };
}

function _calculateActualTubeFare(source, destination) {
    const sourceStationZones = stations.find(s => s.name === source).zone;
    const destinationStationZones = stations.find(s => s.name === destination).zone;

    // Anywhere inside zone 1
    if (bothInZoneOne(sourceStationZones, destinationStationZones)) return FARE_IN_ZONE_ONE;
    // Any one zone outside zone 1
    else if (oneZoneOutsideZoneOne(sourceStationZones, destinationStationZones))
        return ONE_ZONE_OUTSIDE_ZONE_ONE;
    // Two different zone excluding zone 1
    else if (twoZonesExcludingZoneOne(sourceStationZones, destinationStationZones)) return EXCLUDING_ZONE_ONE;
    // Two different zones including zone 1
    else if (twoZonesIncludingZoneOne(sourceStationZones, destinationStationZones))
        return TWO_ZONES_INCLUDING_ZONE_ONE;
    else if (hasMoreThanTwoZones(sourceStationZones, destinationStationZones)) return MAX_FARE;
    else return 0;
}

function bothInZoneOne(sourceStationZones, destinationStationZones) {
    return sourceStationZones.includes(1) && destinationStationZones.includes(1);
}

function twoZonesExcludingZoneOne(sourceStationZones, destinationStationZones) {
    return (sourceStationZones.includes(3) && destinationStationZones.includes(2))
        || (sourceStationZones.includes(2) && destinationStationZones.includes(3));
}

function twoZonesIncludingZoneOne(sourceStationZones, destinationStationZones) {
    return (sourceStationZones.includes(1) && destinationStationZones.includes(2))
        || (sourceStationZones.includes(2) && destinationStationZones.includes(1));
}

function oneZoneOutsideZoneOne(sourceStationZones, destinationStationZones) {
    return (sourceStationZones.includes(2) && destinationStationZones.includes(2))
        || (sourceStationZones.includes(3) && destinationStationZones.includes(3));
}

function hasMoreThanTwoZones(sourceStationZones, destinationStationZones) {
    return (sourceStationZones.includes(3) && destinationStationZones.includes(1))
        || (sourceStationZones.includes(1) && destinationStationZones.includes(3));
}

export default useCard;
