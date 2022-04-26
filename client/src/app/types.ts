import { InputCoordinates } from '../graphql/graphql';

export type SearchFeature = {
  properties: {
    id: string;
    gid: string;
    layer: string;
    source: string;
    source_id: string;
    name: string;
    postalcode: number;
    postalcode_gid: string;
    confidence: number;
    distance: number;
    accuracy: string;
    country: string;
    country_gid: string;
    country_a: string;
    region: string;
    region_gid: string;
    localadmin: string;
    localadmin_gid: string;
    locality: string;
    locality_gid: string;
    neighbourhood: string;
    neighbourhood_gid: string;
    label: string;
  };
  geometry: {
    coordinates: number[];
  };
};

export type SearchResponse = {
  bbox?: number[];
  features: SearchFeature[];
  geocoding: {
    attribution: string;
    errors?: string[];
    warnings?: string[];
    engine: {
      name: string;
      author: string;
      version: string;
    };
    query: {
      text?: string;
      size: number;
      private: boolean;
      lang: string;
      querySize?: number;
      parsed_text?: {
        neighbourhood?: string;
        name?: string;
      };
    };
    timestamp: number;
    version: string;
  };
  type: string;
};

export default {};
