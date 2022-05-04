import { AnyAction } from '@reduxjs/toolkit';
import '@testing-library/jest-dom/extend-expect';
import routes_res from '../../tests/mocks/routes_response_formatted.json';
import { Plan } from '../../graphql/graphql';
import reducer, { add, error } from './routesSlice';

describe('routesSlice', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {} as AnyAction)).toEqual({
      itineraries: [],
    });
  });

  test('should extract itineraries from response', () => {
    expect(reducer(undefined, add(routes_res as Plan))).toEqual({
      itineraries: [
        {
          walkDistance: 1811.4580000372302,
          duration: 2231,
          legs: [
            {
              route: null,
              mode: 'WALK',
              startTime: 1650987476000,
              endTime: 1650988349000,
              from: {
                lat: 60.188176,
                lon: 24.836582,
                name: 'Origin',
                stop: null,
                __typename: 'Place',
              },
              to: {
                lat: 60.184516,
                lon: 24.823515,
                name: 'Aalto-yliopisto',
                stop: {
                  lat: 60.184516,
                  lon: 24.823515,
                  name: 'Aalto-yliopisto',
                  vehicleMode: 'SUBWAY',
                  patterns: [
                    {
                      code: 'HSL:31M2M:0:01',
                      __typename: 'Pattern',
                    },
                    {
                      code: 'HSL:31M2:0:01',
                      __typename: 'Pattern',
                    },
                    {
                      code: 'HSL:31M1:0:01',
                      __typename: 'Pattern',
                    },
                  ],
                  __typename: 'Stop',
                },
                __typename: 'Place',
              },
              trip: null,
              legGeometry: {
                length: 73,
                points:
                  'aojnJs{qvCL?D@LVPJJH^`@HFF?CdD?f@?XBVBRBRBRDNXbAXx@RZBDABENET\\\\fA~@XVRTFLJPXx@LRCPVhBLj@D^ThD@L@TFr@Fd@BTBZ@\\AZCl@IlBKhAECM~A?RB`@ATCX?D?BAHFP?@j@`BDJrC|B\\MVf@DHEHRn@BETdAA`A?D@?EnE',
                __typename: 'Geometry',
              },
              __typename: 'Leg',
            },
            {
              route: {
                gtfsId: 'HSL:31M1',
                __typename: 'Route',
              },
              mode: 'SUBWAY',
              startTime: 1650988349000,
              endTime: 1650988994000,
              from: {
                lat: 60.184516,
                lon: 24.823515,
                name: 'Aalto-yliopisto',
                stop: {
                  lat: 60.184516,
                  lon: 24.823515,
                  code: 'E0003',
                  name: 'Aalto-yliopisto',
                  gtfsId: 'HSL:2222603',
                  vehicleMode: 'SUBWAY',
                  stoptimesForPatterns: [
                    {
                      pattern: {
                        code: 'HSL:31M2:0:01',
                        __typename: 'Pattern',
                      },
                      stoptimes: [
                        {
                          scheduledDeparture: 67200,
                          __typename: 'Stoptime',
                        },
                        {
                          scheduledDeparture: 67680,
                          __typename: 'Stoptime',
                        },
                        {
                          scheduledDeparture: 68100,
                          __typename: 'Stoptime',
                        },
                        {
                          scheduledDeparture: 68580,
                          __typename: 'Stoptime',
                        },
                      ],
                      __typename: 'StoptimesInPattern',
                    },
                    {
                      pattern: {
                        code: 'HSL:31M1:0:01',
                        __typename: 'Pattern',
                      },
                      stoptimes: [
                        {
                          scheduledDeparture: 66960,
                          __typename: 'Stoptime',
                        },
                        {
                          scheduledDeparture: 67440,
                          __typename: 'Stoptime',
                        },
                        {
                          scheduledDeparture: 67860,
                          __typename: 'Stoptime',
                        },
                        {
                          scheduledDeparture: 68340,
                          __typename: 'Stoptime',
                        },
                        {
                          scheduledDeparture: 68760,
                          __typename: 'Stoptime',
                        },
                      ],
                      __typename: 'StoptimesInPattern',
                    },
                  ],
                  __typename: 'Stop',
                },
                __typename: 'Place',
              },
              to: {
                lat: 60.16883,
                lon: 24.931215,
                name: 'Kamppi',
                stop: {
                  lat: 60.16883,
                  lon: 24.931215,
                  name: 'Kamppi',
                  vehicleMode: 'SUBWAY',
                  patterns: [
                    {
                      code: 'HSL:31M2M:0:01',
                      __typename: 'Pattern',
                    },
                    {
                      code: 'HSL:31M2:0:01',
                      __typename: 'Pattern',
                    },
                    {
                      code: 'HSL:31M1:0:01',
                      __typename: 'Pattern',
                    },
                  ],
                  __typename: 'Stop',
                },
                __typename: 'Place',
              },
              trip: {
                gtfsId: 'HSL:31M1_20220425_Ti_1_1844',
                pattern: {
                  code: 'HSL:31M1:0:01',
                  __typename: 'Pattern',
                },
                tripHeadsign: 'Vuosaari',
                __typename: 'Trip',
              },
              legGeometry: {
                length: 128,
                points:
                  'mwinJajovCF}CHwELaDL_CTaCVqB\\wB\\wA\\yAj@cBp@_Bp@{ApAiBtA{AtAw@rAk@tAShACdAF|@RbAXjAp@`BpAhBrAfCzBpDzClA`ArAdA|@v@fEhD|@r@tBrAfBn@hBZbCBbBUrAa@bBw@|AkArAwAtAqB`BcDfAsC~@aDt@iDj@oDf@eErAeMlGio@Fk@pAcMdEya@TeC\\kDT_CrBwSn@kFl@eEr@cEv@cDdAgE|AyEfDsI|AaFZqAViAb@cC^cCZkCRuBZmFJsE@{DAkBCgBGeBIgBQiC]aEe@kEYsC_@aD[iCgA_KoIiw@a@cDc@aDk@kDcCaMq@cFSuAOaBOwBOaDGeEA_EFaELsEv@uN\\uGNeED}C?oDGaLO}KMoICyAE_FI{GSyFMyCKsA]_Eo@_D{@mCoAqCc@s@QYoAmBiD_EyBkDqAkCy@}Aw@mBcAkC}@mDwAkF',
                __typename: 'Geometry',
              },
              __typename: 'Leg',
            },
            {
              route: null,
              mode: 'WALK',
              startTime: 1650988994000,
              endTime: 1650989707000,
              from: {
                lat: 60.16883,
                lon: 24.931215,
                name: 'Kamppi',
                stop: {
                  lat: 60.16883,
                  lon: 24.931215,
                  code: 'H0017',
                  name: 'Kamppi',
                  gtfsId: 'HSL:1040601',
                  vehicleMode: 'SUBWAY',
                  stoptimesForPatterns: [
                    {
                      pattern: {
                        code: 'HSL:31M2:0:01',
                        __typename: 'Pattern',
                      },
                      stoptimes: [
                        {
                          scheduledDeparture: 67440,
                          __typename: 'Stoptime',
                        },
                        {
                          scheduledDeparture: 67860,
                          __typename: 'Stoptime',
                        },
                        {
                          scheduledDeparture: 68340,
                          __typename: 'Stoptime',
                        },
                        {
                          scheduledDeparture: 68760,
                          __typename: 'Stoptime',
                        },
                      ],
                      __typename: 'StoptimesInPattern',
                    },
                    {
                      pattern: {
                        code: 'HSL:31M1:0:01',
                        __typename: 'Pattern',
                      },
                      stoptimes: [
                        {
                          scheduledDeparture: 67200,
                          __typename: 'Stoptime',
                        },
                        {
                          scheduledDeparture: 67680,
                          __typename: 'Stoptime',
                        },
                        {
                          scheduledDeparture: 68100,
                          __typename: 'Stoptime',
                        },
                        {
                          scheduledDeparture: 68580,
                          __typename: 'Stoptime',
                        },
                      ],
                      __typename: 'StoptimesInPattern',
                    },
                  ],
                  __typename: 'Stop',
                },
                __typename: 'Place',
              },
              to: {
                lat: 60.16714351095606,
                lon: 24.921715414439063,
                name: 'Destination',
                stop: null,
                __typename: 'Place',
              },
              trip: null,
              legGeometry: {
                length: 61,
                points:
                  'eufnJkldwC_@h@CDjA`FR~@?bADJDLBFDLKX?JJ^Hd@BFFTb@zAPJAXCZALGz@CVGx@Gr@ANGdAMdBIhAAHARAFEn@B@DBJFARALAHCb@Cd@bBbBv@ZB?FBFB?DALEn@El@MhBCLF???R@B@F@Ah@?V^?Al@',
                __typename: 'Geometry',
              },
              __typename: 'Leg',
            },
          ],
          __typename: 'Itinerary',
          id: expect.any(String),
        },
        {
          walkDistance: 1811.4580000372302,
          duration: 2241,
          legs: [
            {
              route: null,
              mode: 'WALK',
              startTime: 1650987652000,
              endTime: 1650988525000,
              from: {
                lat: 60.188176,
                lon: 24.836582,
                name: 'Origin',
                stop: null,
                __typename: 'Place',
              },
              to: {
                lat: 60.184516,
                lon: 24.823515,
                name: 'Aalto-yliopisto',
                stop: {
                  lat: 60.184516,
                  lon: 24.823515,
                  name: 'Aalto-yliopisto',
                  vehicleMode: 'SUBWAY',
                  patterns: [
                    {
                      code: 'HSL:31M2M:0:01',
                      __typename: 'Pattern',
                    },
                    {
                      code: 'HSL:31M2:0:01',
                      __typename: 'Pattern',
                    },
                    {
                      code: 'HSL:31M1:0:01',
                      __typename: 'Pattern',
                    },
                  ],
                  __typename: 'Stop',
                },
                __typename: 'Place',
              },
              trip: null,
              legGeometry: {
                length: 73,
                points:
                  'aojnJs{qvCL?D@LVPJJH^`@HFF?CdD?f@?XBVBRBRBRDNXbAXx@RZBDABENET\\\\fA~@XVRTFLJPXx@LRCPVhBLj@D^ThD@L@TFr@Fd@BTBZ@\\AZCl@IlBKhAECM~A?RB`@ATCX?D?BAHFP?@j@`BDJrC|B\\MVf@DHEHRn@BETdAA`A?D@?EnE',
                __typename: 'Geometry',
              },
              __typename: 'Leg',
            },
            {
              route: {
                gtfsId: 'HSL:31M2',
                __typename: 'Route',
              },
              mode: 'SUBWAY',
              startTime: 1650988525000,
              endTime: 1650989180000,
              from: {
                lat: 60.184516,
                lon: 24.823515,
                name: 'Aalto-yliopisto',
                stop: {
                  lat: 60.184516,
                  lon: 24.823515,
                  code: 'E0003',
                  name: 'Aalto-yliopisto',
                  gtfsId: 'HSL:2222603',
                  vehicleMode: 'SUBWAY',
                  stoptimesForPatterns: [
                    {
                      pattern: {
                        code: 'HSL:31M2:0:01',
                        __typename: 'Pattern',
                      },
                      stoptimes: [
                        {
                          scheduledDeparture: 67200,
                          __typename: 'Stoptime',
                        },
                        {
                          scheduledDeparture: 67680,
                          __typename: 'Stoptime',
                        },
                        {
                          scheduledDeparture: 68100,
                          __typename: 'Stoptime',
                        },
                        {
                          scheduledDeparture: 68580,
                          __typename: 'Stoptime',
                        },
                      ],
                      __typename: 'StoptimesInPattern',
                    },
                    {
                      pattern: {
                        code: 'HSL:31M1:0:01',
                        __typename: 'Pattern',
                      },
                      stoptimes: [
                        {
                          scheduledDeparture: 66960,
                          __typename: 'Stoptime',
                        },
                        {
                          scheduledDeparture: 67440,
                          __typename: 'Stoptime',
                        },
                        {
                          scheduledDeparture: 67860,
                          __typename: 'Stoptime',
                        },
                        {
                          scheduledDeparture: 68340,
                          __typename: 'Stoptime',
                        },
                        {
                          scheduledDeparture: 68760,
                          __typename: 'Stoptime',
                        },
                      ],
                      __typename: 'StoptimesInPattern',
                    },
                  ],
                  __typename: 'Stop',
                },
                __typename: 'Place',
              },
              to: {
                lat: 60.16883,
                lon: 24.931215,
                name: 'Kamppi',
                stop: {
                  lat: 60.16883,
                  lon: 24.931215,
                  name: 'Kamppi',
                  vehicleMode: 'SUBWAY',
                  patterns: [
                    {
                      code: 'HSL:31M2M:0:01',
                      __typename: 'Pattern',
                    },
                    {
                      code: 'HSL:31M2:0:01',
                      __typename: 'Pattern',
                    },
                    {
                      code: 'HSL:31M1:0:01',
                      __typename: 'Pattern',
                    },
                  ],
                  __typename: 'Stop',
                },
                __typename: 'Place',
              },
              trip: {
                gtfsId: 'HSL:31M2_20220425_Ti_1_1853',
                pattern: {
                  code: 'HSL:31M2:0:01',
                  __typename: 'Pattern',
                },
                tripHeadsign: 'Mellunmäki',
                __typename: 'Trip',
              },
              legGeometry: {
                length: 128,
                points:
                  'mwinJajovCF}CHwELaDL_CTaCVqB\\wB\\wA\\yAj@cBp@_Bp@{ApAiBtA{AtAw@rAk@tAShACdAF|@RbAXjAp@`BpAhBrAfCzBpDzClA`ArAdA|@v@fEhD|@r@tBrAfBn@hBZbCBbBUrAa@bBw@|AkArAwAtAqB`BcDfAsC~@aDt@iDj@oDf@eErAeMlGio@Fk@pAcMdEya@TeC\\kDT_CrBwSn@kFl@eEr@cEv@cDdAgE|AyEfDsI|AaFZqAViAb@cC^cCZkCRuBZmFJsE@{DAkBCgBGeBIgBQiC]aEe@kEYsC_@aD[iCgA_KoIiw@a@cDc@aDk@kDcCaMq@cFSuAOaBOwBOaDGeEA_EFaELsEv@uN\\uGNeED}C?oDGaLO}KMoICyAE_FI{GSyFMyCKsA]_Eo@_D{@mCoAqCc@s@QYoAmBiD_EyBkDqAkCy@}Aw@mBcAkC}@mDwAkF',
                __typename: 'Geometry',
              },
              __typename: 'Leg',
            },
            {
              route: null,
              mode: 'WALK',
              startTime: 1650989180000,
              endTime: 1650989893000,
              from: {
                lat: 60.16883,
                lon: 24.931215,
                name: 'Kamppi',
                stop: {
                  lat: 60.16883,
                  lon: 24.931215,
                  code: 'H0017',
                  name: 'Kamppi',
                  gtfsId: 'HSL:1040601',
                  vehicleMode: 'SUBWAY',
                  stoptimesForPatterns: [
                    {
                      pattern: {
                        code: 'HSL:31M2:0:01',
                        __typename: 'Pattern',
                      },
                      stoptimes: [
                        {
                          scheduledDeparture: 67440,
                          __typename: 'Stoptime',
                        },
                        {
                          scheduledDeparture: 67860,
                          __typename: 'Stoptime',
                        },
                        {
                          scheduledDeparture: 68340,
                          __typename: 'Stoptime',
                        },
                        {
                          scheduledDeparture: 68760,
                          __typename: 'Stoptime',
                        },
                      ],
                      __typename: 'StoptimesInPattern',
                    },
                    {
                      pattern: {
                        code: 'HSL:31M1:0:01',
                        __typename: 'Pattern',
                      },
                      stoptimes: [
                        {
                          scheduledDeparture: 67200,
                          __typename: 'Stoptime',
                        },
                        {
                          scheduledDeparture: 67680,
                          __typename: 'Stoptime',
                        },
                        {
                          scheduledDeparture: 68100,
                          __typename: 'Stoptime',
                        },
                        {
                          scheduledDeparture: 68580,
                          __typename: 'Stoptime',
                        },
                      ],
                      __typename: 'StoptimesInPattern',
                    },
                  ],
                  __typename: 'Stop',
                },
                __typename: 'Place',
              },
              to: {
                lat: 60.16714351095606,
                lon: 24.921715414439063,
                name: 'Destination',
                stop: null,
                __typename: 'Place',
              },
              trip: null,
              legGeometry: {
                length: 61,
                points:
                  'eufnJkldwC_@h@CDjA`FR~@?bADJDLBFDLKX?JJ^Hd@BFFTb@zAPJAXCZALGz@CVGx@Gr@ANGdAMdBIhAAHARAFEn@B@DBJFARALAHCb@Cd@bBbBv@ZB?FBFB?DALEn@El@MhBCLF???R@B@F@Ah@?V^?Al@',
                __typename: 'Geometry',
              },
              __typename: 'Leg',
            },
          ],
          __typename: 'Itinerary',
          id: expect.any(String),
        },
        {
          walkDistance: 1811.4580000372302,
          duration: 2231,
          legs: [
            {
              route: null,
              mode: 'WALK',
              startTime: 1650987887000,
              endTime: 1650988760000,
              from: {
                lat: 60.188176,
                lon: 24.836582,
                name: 'Origin',
                stop: null,
                __typename: 'Place',
              },
              to: {
                lat: 60.184516,
                lon: 24.823515,
                name: 'Aalto-yliopisto',
                stop: {
                  lat: 60.184516,
                  lon: 24.823515,
                  name: 'Aalto-yliopisto',
                  vehicleMode: 'SUBWAY',
                  patterns: [
                    {
                      code: 'HSL:31M2M:0:01',
                      __typename: 'Pattern',
                    },
                    {
                      code: 'HSL:31M2:0:01',
                      __typename: 'Pattern',
                    },
                    {
                      code: 'HSL:31M1:0:01',
                      __typename: 'Pattern',
                    },
                  ],
                  __typename: 'Stop',
                },
                __typename: 'Place',
              },
              trip: null,
              legGeometry: {
                length: 73,
                points:
                  'aojnJs{qvCL?D@LVPJJH^`@HFF?CdD?f@?XBVBRBRBRDNXbAXx@RZBDABENET\\\\fA~@XVRTFLJPXx@LRCPVhBLj@D^ThD@L@TFr@Fd@BTBZ@\\AZCl@IlBKhAECM~A?RB`@ATCX?D?BAHFP?@j@`BDJrC|B\\MVf@DHEHRn@BETdAA`A?D@?EnE',
                __typename: 'Geometry',
              },
              __typename: 'Leg',
            },
            {
              route: {
                gtfsId: 'HSL:31M1',
                __typename: 'Route',
              },
              mode: 'SUBWAY',
              startTime: 1650988760000,
              endTime: 1650989405000,
              from: {
                lat: 60.184516,
                lon: 24.823515,
                name: 'Aalto-yliopisto',
                stop: {
                  lat: 60.184516,
                  lon: 24.823515,
                  code: 'E0003',
                  name: 'Aalto-yliopisto',
                  gtfsId: 'HSL:2222603',
                  vehicleMode: 'SUBWAY',
                  stoptimesForPatterns: [
                    {
                      pattern: {
                        code: 'HSL:31M2:0:01',
                        __typename: 'Pattern',
                      },
                      stoptimes: [
                        {
                          scheduledDeparture: 67200,
                          __typename: 'Stoptime',
                        },
                        {
                          scheduledDeparture: 67680,
                          __typename: 'Stoptime',
                        },
                        {
                          scheduledDeparture: 68100,
                          __typename: 'Stoptime',
                        },
                        {
                          scheduledDeparture: 68580,
                          __typename: 'Stoptime',
                        },
                      ],
                      __typename: 'StoptimesInPattern',
                    },
                    {
                      pattern: {
                        code: 'HSL:31M1:0:01',
                        __typename: 'Pattern',
                      },
                      stoptimes: [
                        {
                          scheduledDeparture: 66960,
                          __typename: 'Stoptime',
                        },
                        {
                          scheduledDeparture: 67440,
                          __typename: 'Stoptime',
                        },
                        {
                          scheduledDeparture: 67860,
                          __typename: 'Stoptime',
                        },
                        {
                          scheduledDeparture: 68340,
                          __typename: 'Stoptime',
                        },
                        {
                          scheduledDeparture: 68760,
                          __typename: 'Stoptime',
                        },
                      ],
                      __typename: 'StoptimesInPattern',
                    },
                  ],
                  __typename: 'Stop',
                },
                __typename: 'Place',
              },
              to: {
                lat: 60.16883,
                lon: 24.931215,
                name: 'Kamppi',
                stop: {
                  lat: 60.16883,
                  lon: 24.931215,
                  name: 'Kamppi',
                  vehicleMode: 'SUBWAY',
                  patterns: [
                    {
                      code: 'HSL:31M2M:0:01',
                      __typename: 'Pattern',
                    },
                    {
                      code: 'HSL:31M2:0:01',
                      __typename: 'Pattern',
                    },
                    {
                      code: 'HSL:31M1:0:01',
                      __typename: 'Pattern',
                    },
                  ],
                  __typename: 'Stop',
                },
                __typename: 'Place',
              },
              trip: {
                gtfsId: 'HSL:31M1_20220425_Ti_1_1851',
                pattern: {
                  code: 'HSL:31M1:0:01',
                  __typename: 'Pattern',
                },
                tripHeadsign: 'Vuosaari',
                __typename: 'Trip',
              },
              legGeometry: {
                length: 128,
                points:
                  'mwinJajovCF}CHwELaDL_CTaCVqB\\wB\\wA\\yAj@cBp@_Bp@{ApAiBtA{AtAw@rAk@tAShACdAF|@RbAXjAp@`BpAhBrAfCzBpDzClA`ArAdA|@v@fEhD|@r@tBrAfBn@hBZbCBbBUrAa@bBw@|AkArAwAtAqB`BcDfAsC~@aDt@iDj@oDf@eErAeMlGio@Fk@pAcMdEya@TeC\\kDT_CrBwSn@kFl@eEr@cEv@cDdAgE|AyEfDsI|AaFZqAViAb@cC^cCZkCRuBZmFJsE@{DAkBCgBGeBIgBQiC]aEe@kEYsC_@aD[iCgA_KoIiw@a@cDc@aDk@kDcCaMq@cFSuAOaBOwBOaDGeEA_EFaELsEv@uN\\uGNeED}C?oDGaLO}KMoICyAE_FI{GSyFMyCKsA]_Eo@_D{@mCoAqCc@s@QYoAmBiD_EyBkDqAkCy@}Aw@mBcAkC}@mDwAkF',
                __typename: 'Geometry',
              },
              __typename: 'Leg',
            },
            {
              route: null,
              mode: 'WALK',
              startTime: 1650989405000,
              endTime: 1650990118000,
              from: {
                lat: 60.16883,
                lon: 24.931215,
                name: 'Kamppi',
                stop: {
                  lat: 60.16883,
                  lon: 24.931215,
                  code: 'H0017',
                  name: 'Kamppi',
                  gtfsId: 'HSL:1040601',
                  vehicleMode: 'SUBWAY',
                  stoptimesForPatterns: [
                    {
                      pattern: {
                        code: 'HSL:31M2:0:01',
                        __typename: 'Pattern',
                      },
                      stoptimes: [
                        {
                          scheduledDeparture: 67440,
                          __typename: 'Stoptime',
                        },
                        {
                          scheduledDeparture: 67860,
                          __typename: 'Stoptime',
                        },
                        {
                          scheduledDeparture: 68340,
                          __typename: 'Stoptime',
                        },
                        {
                          scheduledDeparture: 68760,
                          __typename: 'Stoptime',
                        },
                      ],
                      __typename: 'StoptimesInPattern',
                    },
                    {
                      pattern: {
                        code: 'HSL:31M1:0:01',
                        __typename: 'Pattern',
                      },
                      stoptimes: [
                        {
                          scheduledDeparture: 67200,
                          __typename: 'Stoptime',
                        },
                        {
                          scheduledDeparture: 67680,
                          __typename: 'Stoptime',
                        },
                        {
                          scheduledDeparture: 68100,
                          __typename: 'Stoptime',
                        },
                        {
                          scheduledDeparture: 68580,
                          __typename: 'Stoptime',
                        },
                      ],
                      __typename: 'StoptimesInPattern',
                    },
                  ],
                  __typename: 'Stop',
                },
                __typename: 'Place',
              },
              to: {
                lat: 60.16714351095606,
                lon: 24.921715414439063,
                name: 'Destination',
                stop: null,
                __typename: 'Place',
              },
              trip: null,
              legGeometry: {
                length: 61,
                points:
                  'eufnJkldwC_@h@CDjA`FR~@?bADJDLBFDLKX?JJ^Hd@BFFTb@zAPJAXCZALGz@CVGx@Gr@ANGdAMdBIhAAHARAFEn@B@DBJFARALAHCb@Cd@bBbBv@ZB?FBFB?DALEn@El@MhBCLF???R@B@F@Ah@?V^?Al@',
                __typename: 'Geometry',
              },
              __typename: 'Leg',
            },
          ],
          __typename: 'Itinerary',
          id: expect.any(String),
        },
      ],
    });
  });

  test('should accept only predefined error values', () => {
    expect(
      // @ts-expect-error ts(2322)
      reducer(undefined, error({ type: 'networkError', message: 'example' })),
    ).toEqual({
      itineraries: [],
      error: {
        type: 'other',
        message: 'example',
      },
    });
    expect(
      reducer(undefined, error({ type: 'network', message: 'example' })),
    ).toEqual({
      itineraries: [],
      error: {
        type: 'network',
        message: 'example',
      },
    });
  });
});
