import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUnicornContext } from '../../context/unicornContext';

export const useUnicornForm = () => {
  const { id } = useParams();
  const { unicorns, createUnicorn, editUnicorn, deleteUnicorn, getUnicornById, isInitialized } = useUnicornContext();

  const [unicornData, setUnicornData] = useState({
    nombre: '',
    color: '',
    edad: '',
    poder: ''
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Sólo cargamos datos cuando el contexto está inicializado
    if (isInitialized) {
      const loadUnicorn = async () => {
        if (id) {
          try {
            // Primero buscamos en el array de unicornios cargados
            const unicornFromArray = unicorns.find(u => u._id === id);
            
            if (unicornFromArray) {
              setUnicornData(unicornFromArray);
            } else {
              // Si no está en el array, hacemos una petición específica
              const unicornFromApi = await getUnicornById(id);
              if (unicornFromApi) {
                setUnicornData(unicornFromApi);
              }
            }
          } catch (error) {
            console.error('Error al cargar unicornio:', error);
          }
        }
        setIsLoading(false);
      };
  
      loadUnicorn();
    }
  }, [id, unicorns, getUnicornById, isInitialized]);

  const handleSubmitCreate = async (values) => {
    await createUnicorn(values);
  };

  const handleSubmitEdit = async (values) => {
    await editUnicorn(id, values);
  };

  const handleSubmitDelete = async () => {
    await deleteUnicorn(id);
  };

  return {
    unicornData,
    isLoading: isLoading || !isInitialized,
    handleSubmitCreate,
    handleSubmitEdit,
    handleSubmitDelete
  };
};