import { Alert, Container } from "react-bootstrap";

interface ErrorProps {
    errorText: string;
}

const ErrorStub = ({ errorText }: ErrorProps) => {
    return (
        <Container className="mt-4">
            <Alert variant="danger">{errorText}</Alert>
        </Container>
    );
}

export default ErrorStub