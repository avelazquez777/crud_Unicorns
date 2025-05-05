import { createContext, useContext, useEffect, useState } from 'react';

const UnicornContext = createContext();

const crudCrudApiKey = '03774d4091d84d728160b37ce41cb3f5';
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
  
  // Actualizamos desde la API cada 1 hora como máximo
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
      const response = await fetch(unicornApi);
      const data = await response.json();
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
    
    if (localUnicorn) {
      return localUnicorn;
    }

    try {
      const response = await fetch(`${unicornApi}/${_id}`);
      const unicorn = await response.json();
      

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
      const response = await fetch(unicornApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUnicorn),
      });
      const createdUnicorn = await response.json();
      

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
      await fetch(`${unicornApi}/${_id}`, {
        method: 'DELETE',
      });
      
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
      await fetch(`${unicornApi}/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUnicorn),
      });
      
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
        refreshFromApi: () => getUnicornsFromApi() // Función para forzar actualización
      }}
    >
      {children}
    </UnicornContext.Provider>
  );
};

export const useUnicornContext = () => useContext(UnicornContext);