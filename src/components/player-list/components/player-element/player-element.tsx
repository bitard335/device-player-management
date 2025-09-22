import { Col, Card, Button } from "react-bootstrap";
import { DevicePlace } from "../../../../services/domain";
import { useCallback } from "react";

export interface PlayerElementProps {
    currentPlayer: DevicePlace;
    selectedPlayer: DevicePlace | null;
    onPlayerSelect: (player: DevicePlace) => void;
}

const PlayerElement = ({ currentPlayer, selectedPlayer, onPlayerSelect }: PlayerElementProps) => {
    const handlePlayerSelect = useCallback(() => onPlayerSelect(currentPlayer), [onPlayerSelect, currentPlayer]);

    return (
        <Col>
            <Card
                className={`h-100 shadow-sm ${selectedPlayer?.device_id === currentPlayer.device_id && selectedPlayer?.place === currentPlayer.place ? 'border-primary border-2' : ''}`}
                style={{ cursor: 'pointer' }}
                onClick={handlePlayerSelect}
            >
                <Card.Body className="d-flex flex-column">
                    <Card.Title>Place {currentPlayer.place}</Card.Title>
                    <Card.Text className="flex-grow-1">
                        <strong>Balance:</strong> {currentPlayer.currency} {currentPlayer.balances.toFixed(2)}
                    </Card.Text>
                    <div className="mt-2">
                        <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                handlePlayerSelect();
                            }}
                        >
                            Manage Balance
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default PlayerElement;