import axios, { AxiosInstance } from "axios";
import { Query } from "../../models/query.model";
import { QueryBuilder } from "../query/query.services";

export class Api<T> {
  _name: string;
  _axios: AxiosInstance;
  _queryService;
  constructor(name: string) {
    this._name = name;
    this._queryService = new QueryBuilder();
    this._axios = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
    });

    // Handle false values being sent as null
    this._axios.interceptors.response.use((originalResponse) => {
      let data = originalResponse.data;
      for (const key in data) {
        if (typeof key === "boolean") {
          if (data[key] === null) {
            data[key] = false;
          }
        }
      }

      originalResponse = { ...originalResponse, data };
      return originalResponse;
    });

    this._axios.interceptors.request.use((originalRequest) => {
      originalRequest.params = {
        ...originalRequest.params,
        detail: true,
      };
      return originalRequest;
    });
  }

  async get(query?: Query) {
    let filterStrings =
      query && (query.filters || query.advFilters)
        ? [...query.filters, ...query.advFilters].map((x) => {
            const result = this._queryService.converToStringQuery(x);
            if (result !== null) {
              return result;
            }
            return undefined;
          })
        : [];
    filterStrings = filterStrings.filter((x) => x !== undefined);

    let params = {};
    if (query) {
      if (
        (query.filters && query.filters.length > 0) ||
        (query.advFilters && query.advFilters.length > 0)
      ) {
        params = { ...params, filters: filterStrings };
      }
      if (query.sort && query.sort !== "") {
        params = { ...params, sort: query.sort };
      }
    }
    const qs = require("qs");
    return await this._axios.get<T[]>(this._name, {
      params,
      paramsSerializer: (params) => {
        return qs.stringify(params);
      },
    });
  }

  async getById(id: number) {
    return await this._axios.get<T>(`${this._name}/${id}`);
  }

  async create(object: T) {
    return await this._axios.post<T>(this._name, object);
  }

  async update(id: number, object: T) {
    return await this._axios.patch<T>(`${this._name}/${id}`, object);
  }

  async delete(id: number) {
    return await this._axios.delete<number>(`${this._name}/${id}`);
  }

  async deleteMany(ids: number[]) {
    return await this._axios.delete<number[]>(`${this._name}`, {
      data: [...ids],
    });
  }
}
