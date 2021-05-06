import * as ENDPOINT_NAMES from '../assets/data/ENDPOINT_NAMES';
export const TRAIN_GROUPS_BY_ROUTE = {
    'A': ENDPOINT_NAMES.BLUE,
    'C': ENDPOINT_NAMES.BLUE,
    'E': ENDPOINT_NAMES.BLUE,
    'H': ENDPOINT_NAMES.BLUE,
    'FS': ENDPOINT_NAMES.BLUE,
    'B': ENDPOINT_NAMES.ORANGE,
    'D': ENDPOINT_NAMES.ORANGE,
    'F': ENDPOINT_NAMES.ORANGE,
    'FX': ENDPOINT_NAMES.ORANGE,
    'M': ENDPOINT_NAMES.ORANGE,
    'J': ENDPOINT_NAMES.BROWN,
    'Z': ENDPOINT_NAMES.BROWN,
    'N': ENDPOINT_NAMES.YELLOW,
    'Q': ENDPOINT_NAMES.YELLOW,
    'R': ENDPOINT_NAMES.YELLOW,
    'W': ENDPOINT_NAMES.YELLOW,
    'G': ENDPOINT_NAMES.G,
    'L': ENDPOINT_NAMES.L,
    'SI': ENDPOINT_NAMES.SI,
    '1': ENDPOINT_NAMES.NUMBERS,
    '2': ENDPOINT_NAMES.NUMBERS,
    '3': ENDPOINT_NAMES.NUMBERS,
    '4': ENDPOINT_NAMES.NUMBERS,
    '5': ENDPOINT_NAMES.NUMBERS,
    '5X': ENDPOINT_NAMES.NUMBERS,
    '6': ENDPOINT_NAMES.NUMBERS,
    '6X': ENDPOINT_NAMES.NUMBERS,
    'GS': ENDPOINT_NAMES.NUMBERS,
    '7': ENDPOINT_NAMES.SEVEN,
    '7X': ENDPOINT_NAMES.SEVEN
};
// ADD FS, S LINES

export const ICONS_TO_DISPLAY = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '5X',
    '6',
    '6X',
    '7',
    '7X',
    'A',
    'C',
    'E',
    'B',
    'D',
    'F',
    'FX',
    'M',
    'N',
    'Q',
    'R',
    'W',
    'J',
    'Z',
    'L',
    'G',
    'SI',
    'GS',
    'FS',
    'H'
];

export const NEW_YORK_CITY_LATLNG = {
    lat: 40.739221291569855,
    lng: -73.98251203083879
};

export const MAP_STYLE = [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#eae4cf"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#a8d484"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.station.airport",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.station.bus",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.station.rail",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit.station.rail",
        "elementType": "labels",
        "stylers": [
            {
                "color": "#335c35"
            },
            {
                "weight": "0.01"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#9dcee1"
            },
            {
                "visibility": "on"
            }
        ]
    }
];