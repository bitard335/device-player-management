import React from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { Loader } from '../../common/loader';
import { ErrorStub } from '../../common/error-stub';
import { usePlayerList } from './use-player-list';
import { PlayerElement } from './components/player-element';
import { BalanceForm } from './components/balance-form';

interface PlayerListProps {
    deviceId: string;
}

const PlayerList: React.FC<PlayerListProps> = ({ deviceId }) => {
    const { players, loading, error, visiblePlayers, selectedPlayer, handlePlayerSelect, setPlayers } = usePlayerList(deviceId);


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
                    <h3>Players</h3>
                    <p className="text-muted">Select a player to manage their balance</p>
                </Col>
            </Row>

            {players.length === 0 ? (
                <Row>
                    <Col>
                        <Alert variant="info">No players found for this device.</Alert>
                    </Col>
                </Row>
            ) : (
                <>
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {visiblePlayers.map((player) => (
                            player ? (
                                <PlayerElement
                                    key={`${player.device_id}-${player.place}`}
                                    currentPlayer={player}
                                    selectedPlayer={selectedPlayer}
                                    onPlayerSelect={handlePlayerSelect}
                                />
                            ) : null
                        ))}
                    </Row>

                    {selectedPlayer && (
                        <Row className="mt-5">
                            <Col md={6}>
                                <BalanceForm
                                    selectedPlayer={selectedPlayer}
                                    players={players}
                                    setPlayers={setPlayers}
                                />
                            </Col>
                        </Row>
                    )}
                </>
            )}
        </Container>
    );
};

export default PlayerList;