import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useUnicornForm } from './useUnicornForm';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useUnicornContext } from '../../context/unicornContext';
import '../../styles/unicorn.css'; // Asegúrate de importar el CSS

const UnicornForm = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const isCreate = location.pathname.includes('/crear');
  const isEdit = location.pathname.includes('/editar');

  const { unicorns } = useUnicornContext(); // Para mostrar la tabla

  const {
    unicornData,
    isLoading,
    handleSubmitCreate,
    handleSubmitEdit,
    handleSubmitDelete,
  } = useUnicornForm();

  const validationSchema = Yup.object({
    nombre: Yup.string().required('El nombre es obligatorio'),
    color: Yup.string().required('El color es obligatorio'),
    edad: Yup.number()
      .required('La edad es obligatoria')
      .positive('La edad debe ser mayor a 0')
      .integer('La edad debe ser un número entero'),
    poder: Yup.string().required('El poder es obligatorio'),
  });

  const handleSubmit = (values) => {
    if (isCreate) {
      handleSubmitCreate(values);
    } else if (isEdit) {
      handleSubmitEdit(values);
    }
    navigate('/unicornios');
  };

  if (isLoading) return <p>Cargando unicornio...</p>;

  return (
    <div className="unicorn-form-container">
      <h2 className="heading">
        {isCreate ? 'Crear Unicornio' : 'Editar Unicornio'}
      </h2>

      <Formik
        initialValues={{
          nombre: unicornData?.nombre || '',
          color: unicornData?.color || '',
          edad: unicornData?.edad || '',
          poder: unicornData?.poder || '',
        }}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="form">
            <div className="form-group">
              <label htmlFor="nombre" className="label">Nombre:</label>
              <Field 
                type="text" 
                name="nombre" 
                id="nombre" 
                className="input" 
              />
              <ErrorMessage name="nombre" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="color" className="label">Color:</label>
              <Field 
                type="text" 
                name="color" 
                id="color" 
                className="input" 
              />
              <ErrorMessage name="color" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="edad" className="label">Edad:</label>
              <Field 
                type="number" 
                name="edad" 
                id="edad" 
                className="input" 
              />
              <ErrorMessage name="edad" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="poder" className="label">Poder:</label>
              <Field 
                type="text" 
                name="poder" 
                id="poder" 
                className="input" 
              />
              <ErrorMessage name="poder" component="div" className="error" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={isCreate ? 'create-button' : 'edit-button'}
            >
              {isCreate ? 'Crear Unicornio' : 'Guardar Cambios'}
            </button>
            
            <button
              type="button"
              onClick={() => navigate('/unicornios')}
              className="cancel-button"
            >
              Cancelar
            </button>
          </Form>
        )}
      </Formik>

      <h3 className="table-heading">Lista de Unicornios</h3>
      <table className="table">
        <thead>
          <tr>
            <th className="table-header">Nombre</th>
            <th className="table-header">Edad</th>
            <th className="table-header">Color</th>
            <th className="table-header">Poder</th>
          </tr>
        </thead>
        <tbody>
          {unicorns.map((unicorn) => (
            <tr key={unicorn._id} className="table-row">
              <td className="table-cell">{unicorn.nombre}</td>
              <td className="table-cell">{unicorn.edad}</td>
              <td className="table-cell">{unicorn.color}</td>
              <td className="table-cell">{unicorn.poder}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UnicornForm;
