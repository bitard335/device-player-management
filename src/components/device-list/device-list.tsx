import React from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import PlayerList from '../player-list/player-list';
import { Loader } from '../../common/loader';
import { DeviceElement, DeviceElementProps } from './components/device-element';
import { ErrorStub } from '../../common/error-stub';
import { useDeviceList } from './use-device-list';


type DeviceListProps = Omit<DeviceElementProps, 'currentDevice'>

const DeviceList: React.FC<DeviceListProps> = ({ onDeviceSelect, selectedDevice }) => {
    const { devices, loading, error } = useDeviceList()

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <ErrorStub errorText={error} />
    }

    return (
        <Container className="mt-4">
            <Row>
                <Col>
                    <h2>Devices</h2>
                    <p className="text-muted">Select a device to view and manage players</p>
                </Col>
            </Row>

            {devices.length === 0 ? (
                <Row>
                    <Col>
                        <Alert variant="info">No devices found.</Alert>
                    </Col>
                </Row>
            ) : (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {devices.map((device) => (
                        <DeviceElement key={device.id} currentDevice={device} selectedDevice={selectedDevice} onDeviceSelect={onDeviceSelect} />
                    ))}
                </Row>
            )}

            {selectedDevice && (
                <Row className="mt-5">
                    <Col>
                        <PlayerList deviceId={selectedDevice.id.toString()} />
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default DeviceList;