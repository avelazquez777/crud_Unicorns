import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const UnicornContext = createContext();

const crudCrudApiKey = 'e91e26c825a64d24bfd84f9e39699613';
const unicornApi = `https://crudcrud.com/api/${crudCrudApiKey}/unicornios`;

// Función para obtener fecha de última actualización
const getLastUpdateTime = () => {
  return localStorage.getItem('unicorns_last_update') || null;
};

// Función para comprobar si necesitamos actualizar desde la API
const shouldFetchFromApi = (forceUpdate = false) => {
  if (forceUpdate) return true;
  
  const lastUpdate = getLastUpdateTime();
  if (!lastUpdate) return true;
  
  const ONE_HOUR = 60 * 60 * 1000;
  return Date.now() - parseInt(lastUpdate) > ONE_HOUR;
};

export const UnicornProvider = ({ children }) => {
  const [unicorns, setUnicorns] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    const localUnicorns = localStorage.getItem('unicorns');
    if (localUnicorns) {
      setUnicorns(JSON.parse(localUnicorns));
    }
    if (shouldFetchFromApi()) {
      await getUnicornsFromApi();
    }
    setIsInitialized(true);
  };

  const updateLocalStorage = (data) => {
    localStorage.setItem('unicorns', JSON.stringify(data));
    localStorage.setItem('unicorns_last_update', Date.now().toString());
  };

  const getUnicornsFromApi = async () => {
    try {
      const { data } = await axios.get(unicornApi);
      setUnicorns(data);
      updateLocalStorage(data);
      return data;
    } catch (error) {
      console.error('Error al obtener unicornios desde API:', error);
      return [];
    }
  };

  const getUnicorns = async (forceUpdate = false) => {
    if (forceUpdate || shouldFetchFromApi()) {
      return await getUnicornsFromApi();
    }
    return unicorns;
  };

  const getUnicornById = async (_id) => {
    const localUnicorn = unicorns.find(unicorn => unicorn._id === _id);
    if (localUnicorn) return localUnicorn;

    try {
      const { data: unicorn } = await axios.get(`${unicornApi}/${_id}`);
      const updatedUnicorns = [...unicorns];
      const existingIndex = updatedUnicorns.findIndex(u => u._id === _id);

      if (existingIndex >= 0) {
        updatedUnicorns[existingIndex] = unicorn;
      } else {
        updatedUnicorns.push(unicorn);
      }

      setUnicorns(updatedUnicorns);
      updateLocalStorage(updatedUnicorns);

      return unicorn;
    } catch (error) {
      console.error('Error al obtener unicornio por ID:', error);
      return null;
    }
  };

  const createUnicorn = async (newUnicorn) => {
    try {
      const { data: createdUnicorn } = await axios.post(unicornApi, newUnicorn);
      const updatedUnicorns = [...unicorns, createdUnicorn];
      setUnicorns(updatedUnicorns);
      updateLocalStorage(updatedUnicorns);
      return createdUnicorn;
    } catch (error) {
      console.error('Error al crear unicornio:', error);
      return null;
    }
  };

  const deleteUnicorn = async (_id) => {
    try {
      await axios.delete(`${unicornApi}/${_id}`);
      const updatedUnicorns = unicorns.filter(unicorn => unicorn._id !== _id);
      setUnicorns(updatedUnicorns);
      updateLocalStorage(updatedUnicorns);
      return true;
    } catch (error) {
      console.error('Error al eliminar unicornio:', error);
      return false;
    }
  };

  const editUnicorn = async (_id, updatedUnicorn) => {
    try {
      await axios.put(`${unicornApi}/${_id}`, updatedUnicorn);
      const updatedUnicorns = unicorns.map(unicorn =>
        unicorn._id === _id ? { ...updatedUnicorn, _id } : unicorn
      );
      setUnicorns(updatedUnicorns);
      updateLocalStorage(updatedUnicorns);
      return true;
    } catch (error) {
      console.error('Error al editar unicornio:', error);
      return false;
    }
  };

  return (
    <UnicornContext.Provider
      value={{
        unicorns,
        getUnicorns,
        getUnicornById,
        createUnicorn,
        deleteUnicorn,
        editUnicorn,
        isInitialized,
        refreshFromApi: () => getUnicornsFromApi(),
      }}
    >
      {children}
    </UnicornContext.Provider>
  );
};

export const useUnicornContext = () => useContext(UnicornContext);
