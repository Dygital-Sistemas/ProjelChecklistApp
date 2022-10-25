import { Vehicle } from '../../databases/schemas/vehicle';
import { api } from '../../services/api';

interface GetVehiclesQuery {
  lastUpdatedAt: string;
  vehiclesCount: number;
}

export const getVehicles = async ({
  lastUpdatedAt,
  vehiclesCount,
}: GetVehiclesQuery) => {
  return api.get<{ vehicles: Vehicle[] }>('/vehicles', {
    params: { lastUpdatedAt, vehiclesCount },
  });
};
