import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNumpad, UseNumpadFormParams } from './use-numpad';

interface NumpadProps extends UseNumpadFormParams {
    onClear: () => void;
    onConfirm: () => void;
}

const Numpad: React.FC<NumpadProps> = ({ onDigitPress, onBackspace, onClear, onConfirm }) => {
    const { buttons, handleButtonClick } = useNumpad({ onBackspace, onDigitPress });

    return (
        <Container className="numpad-container">
            <Row>
                {buttons.map((btn) => (
                    <Col xs={4} key={btn} className="p-1">
                        <Button
                            variant={btn === '⌫' ? 'warning' : 'outline-primary'}
                            className="w-100"
                            onClick={() => handleButtonClick(btn)}
                        >
                            {btn}
                        </Button>
                    </Col>
                ))}
            </Row>
            <Row className="mt-2">
                <Col xs={6} className="p-1">
                    <Button variant="danger" className="w-100" onClick={onClear}>
                        Clear
                    </Button>
                </Col>
                <Col xs={6} className="p-1">
                    <Button variant="success" className="w-100" onClick={onConfirm}>
                        Confirm
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Numpad;