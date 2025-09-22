import { useCallback, useState } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import DeviceList from './components/device-list/device-list';
import { Device } from './services/domain';

function App() {
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  const handleDeviceSelect = useCallback((device: Device) => {
    setSelectedDevice(device);
  }, [setSelectedDevice]);

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Device Player Management</Navbar.Brand>
        </Container>
      </Navbar>

      <DeviceList
        onDeviceSelect={handleDeviceSelect}
        selectedDevice={selectedDevice}
      />
    </div>
  );
}

export default App;
