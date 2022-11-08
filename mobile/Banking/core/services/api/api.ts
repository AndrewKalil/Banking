import axios, { AxiosInstance } from "axios";
// import { Query } from "../../models/query.model";
// import { QueryBuilder } from "../query/query.services";
import { Query } from "../../models/query.model";
import { API_URL } from "@env";

export class Api<T> {
  _name: string;
  _axios: AxiosInstance;
  _baseUrl: string;
  // _queryService;
  constructor(name: string) {
    this._name = name;
    this._baseUrl = API_URL;
    // this._queryService = new QueryBuilder();
    this._axios = axios.create({
      baseURL: API_URL || "",
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

  async get() {
    return await this._axios.get<T[]>(this._name);
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
