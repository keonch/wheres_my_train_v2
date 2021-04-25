import { withScriptjs, withGoogleMap } from "react-google-maps"
import Map from '../containers/MapContainer';

const Wrapper = withScriptjs(withGoogleMap(() => <Map />))

export default function MapWrapper() {
    return (
        <Wrapper
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={< div style={{ height: `100vh` }} />}
            containerElement={< div style={{ height: `100vh` }} />}
            mapElement={< div style={{ height: `100vh` }} />}
        />
    )
}