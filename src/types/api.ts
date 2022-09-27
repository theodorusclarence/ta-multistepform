export interface ApiReturn<D> {
  code: number;
  data: D;
  status: string;
}

export interface School {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
}

export interface Place {
  id: number;
  name: string;
}
