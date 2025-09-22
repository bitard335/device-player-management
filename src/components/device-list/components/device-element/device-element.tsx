import { Col, Card, Button } from "react-bootstrap";
import { Device } from "../../../../services/domain";
import { useCallback } from "react";


export interface DeviceElementProps {
    currentDevice: Device,
    selectedDevice: Device | null;
    onDeviceSelect: (device: Device) => void
}


const DeviceElement = ({ currentDevice, selectedDevice, onDeviceSelect }: DeviceElementProps) => {
    const handleDeviceSelect = useCallback(() => onDeviceSelect(currentDevice), [onDeviceSelect, currentDevice])

    return (
        <Col>
            <Card
                className={`h-100 shadow-sm ${selectedDevice?.id === currentDevice.id ? 'border-primary border-2' : ''}`}
                style={{ cursor: 'pointer' }}
                onClick={handleDeviceSelect}
            >
                <Card.Body className="d-flex flex-column">
                    <Card.Title>{currentDevice.name}</Card.Title>
                    <Card.Text className="flex-grow-1">
                        <strong>ID:</strong> {currentDevice.id}
                    </Card.Text>
                    <div className="mt-2">
                        <Button
                            variant="primary"
                            size="sm"
                            disabled
                        >
                            Device
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Col>

    )
}

export default DeviceElement