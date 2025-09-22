import { Container, Spinner } from "react-bootstrap";

const Loader = () => {
    return (
        <Container className="mt-4">
            <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        </Container>
    );
}

export default Loader