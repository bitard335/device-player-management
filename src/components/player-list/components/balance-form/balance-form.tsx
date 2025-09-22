
import { Card, Form, InputGroup, Button, Alert, Spinner, Modal } from "react-bootstrap";
import { useBalanceForm, UseBalanceFormParams } from "./use-balance-form";
import { validateAmount } from "../../../../helpers";
import Numpad from "./components/numpad";

interface BalanceFormProps extends UseBalanceFormParams { }

const BalanceForm = (props: BalanceFormProps) => {
    const {
        amount,
        operation,
        updating,
        updateError,
        successMessage,
        operationText,
        handleAmountChange,
        handleOperationChange,
        handleUpdateBalance,
        showNumpad,
        setShowNumpad,
        handleNumpadInput,
        handleNumpadBackspace,
        handleNumpadClear,
        handleNumpadConfirm,
    } = useBalanceForm(props);

    const { selectedPlayer } = props;

    return (
        <Card className="shadow-sm">
            <Card.Body>
                <Card.Title>Manage Balance</Card.Title>
                <Card.Text>
                    <strong>Place:</strong> {selectedPlayer?.place}<br />
                    <strong>Current Balance:</strong> {selectedPlayer?.currency} {selectedPlayer?.balances.toFixed(2)}
                </Card.Text>

                {updateError && (
                    <Alert variant="danger">{updateError}</Alert>
                )}

                {successMessage && (
                    <Alert variant="success">{successMessage}</Alert>
                )}

                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Amount</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control
                                type="number"
                                step="0.01"
                                min="0.01"
                                placeholder="Enter amount"
                                value={amount}
                                onChange={handleAmountChange}
                                isInvalid={!!amount && !validateAmount(amount)}
                                readOnly
                                onClick={() => setShowNumpad(true)}
                                style={{ cursor: 'pointer' }}
                            />
                        </InputGroup>
                        <Form.Control.Feedback type="invalid">
                            Please enter a valid amount with maximum 2 decimal places
                        </Form.Control.Feedback>
                    </Form.Group>

                    <div className="d-grid gap-2 mb-3">
                        <Button
                            variant={operation === 'deposit' ? 'success' : 'outline-success'}
                            onClick={() => handleOperationChange('deposit')}
                            disabled={updating}
                        >
                            Deposit
                        </Button>
                        <Button
                            variant={operation === 'withdraw' ? 'warning' : 'outline-warning'}
                            onClick={() => handleOperationChange('withdraw')}
                            disabled={updating}
                        >
                            Withdraw
                        </Button>
                    </div>

                    <div className="d-grid">
                        <Button
                            variant="primary"
                            onClick={handleUpdateBalance}
                            disabled={updating || !amount || !validateAmount(amount)}
                        >
                            {updating ? (
                                <>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />{' '}
                                    Processing...
                                </>
                            ) : (
                                `Confirm ${operationText}`
                            )}
                        </Button>
                    </div>
                </Form>

                {/* Numpad Modal */}
                <Modal show={showNumpad} onHide={() => setShowNumpad(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Enter Amount</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="text-center mb-3">
                            <h4>${amount || '0.00'}</h4>
                        </div>
                        <Numpad
                            onDigitPress={handleNumpadInput}
                            onBackspace={handleNumpadBackspace}
                            onClear={handleNumpadClear}
                            onConfirm={handleNumpadConfirm}
                        />
                    </Modal.Body>
                </Modal>
            </Card.Body>
        </Card>
    );
};

export default BalanceForm;