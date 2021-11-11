import { createContext, useContext } from 'react';
import { get } from './api';
import { ReducedTopic } from './topics';

export type Config = {
  built: string;
  topics: ReducedTopic[];
};

export const fetchConfig = async (): Promise<Config> =>
  get<Config>('/config.json');

export const ConfigContext = createContext<Config | undefined>(undefined);

export const useConfig = (): Config | undefined => useContext(ConfigContext);
