import './App.scss';
import { Tabs, Button, Modal, Input } from 'antd';
import useCard from './hooks/useCard';
import { useState } from 'react';
import Bus from './Bus';
import { stations } from './stations';
import Tube from './Tube';

function App() {
    const { balance, addBalance, travelByBus, enterStation, exitStation } = useCard(0);
    const [showModal, setShowModal] = useState(false);
    const [amountToAdd, setAmountToAdd] = useState(0);

    const allStations = stations.map(s => s.name);

    return (
        <div className="App">

            <h1>Oyster Card Simulator</h1>
            <h3>You Balance: € {balance}</h3>
            <Button type='primary' onClick={() => setShowModal(true)}>Add Money To Card</Button>

            <Tabs size='large' centered>
                <Tabs.TabPane tab='Bus' key='Bus'>
                    <Bus stations={allStations} onJourney={travelByBus} />
                </Tabs.TabPane>
                <Tabs.TabPane tab='Tube' key='Tube'>
                    <Tube stations={allStations} onEnterStation={enterStation} onExitStation={exitStation} />
                </Tabs.TabPane>
            </Tabs>

            <Modal
                title='Add Money To Card'
                okText='Update Balance'
                open={showModal}
                onOk={() => {
                    addBalance(amountToAdd);
                    setShowModal(false);
                }}
            >
                <Input
                    type='number'
                    value={amountToAdd}
                    onChange={(event) => setAmountToAdd(parseInt(event.target.value))}
                />
            </Modal>
        </div>
    );
}

export default App;
