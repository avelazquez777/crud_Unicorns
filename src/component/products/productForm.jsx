import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { loadProducts, saveProducts } from './productData';
import '../../styles/unicorn.css'; // Reutilizamos los estilos de unicornios

const ProductForm = () => {
  const [products, setProducts] = useState([]);
  const [initialFormValues, setInitialFormValues] = useState({
    nombre: '',
    categoria: '',
    precio: '',
    stock: '',
    descripcion: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const storedProducts = loadProducts();
    setProducts(storedProducts);

    // Si hay un ID, estamos en modo edición
    if (id) {
      setIsEditing(true);
      const productToEdit = storedProducts.find(product => product.id === id);
      
      if (productToEdit) {
        setInitialFormValues({
          nombre: productToEdit.nombre,
          categoria: productToEdit.categoria,
          precio: productToEdit.precio,
          stock: productToEdit.stock,
          descripcion: productToEdit.descripcion
        });
      } else {
        // Si no se encuentra el producto, redirigir a la lista
        navigate('/productos');
      }
    }
  }, [id, navigate]);

  const validationSchema = Yup.object({
    nombre: Yup.string().required('El nombre es obligatorio'),
    categoria: Yup.string().required('La categoría es obligatoria'),
    precio: Yup.number()
      .required('El precio es obligatorio')
      .positive('El precio debe ser mayor a 0'),
    stock: Yup.number()
      .required('El stock es obligatorio')
      .integer('El stock debe ser un número entero')
      .min(0, 'El stock no puede ser negativo'),
    descripcion: Yup.string().required('La descripción es obligatoria')
  });

  const handleSubmit = (values, { setSubmitting }) => {
    if (isEditing) {
      // Actualizar producto existente
      const updatedProducts = products.map(product => 
        product.id === id ? { ...product, ...values } : product
      );
      setProducts(updatedProducts);
      saveProducts(updatedProducts);
    } else {
      // Crear nuevo producto
      const newProduct = {
        ...values,
        id: Date.now().toString()
      };
      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);
      saveProducts(updatedProducts);
    }

    setSubmitting(false);
    navigate('/productos');
  };

  return (
    <div className="unicorn-form-container">
      <h2 className="heading">
        {isEditing ? 'Editar Producto' : 'Agregar Nuevo Producto'}
      </h2>

      <Formik
        enableReinitialize
        initialValues={initialFormValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="form">
            <div className="form-group">
              <label htmlFor="nombre" className="label">Nombre del Producto:</label>
              <Field 
                type="text" 
                name="nombre" 
                id="nombre" 
                className="input" 
              />
              <ErrorMessage name="nombre" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="categoria" className="label">Categoría:</label>
              <Field 
                as="select" 
                name="categoria" 
                id="categoria" 
                className="input" 
              >
                <option value="">Selecciona una categoría</option>
                <option value="Accesorios">Accesorios</option>
                <option value="Consumibles">Consumibles</option>
                <option value="Decoración">Decoración</option>
                <option value="Cuidado">Cuidado</option>
              </Field>
              <ErrorMessage name="categoria" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="precio" className="label">Precio ($):</label>
              <Field 
                type="number" 
                name="precio" 
                id="precio" 
                step="0.01"
                className="input" 
              />
              <ErrorMessage name="precio" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="stock" className="label">Stock:</label>
              <Field 
                type="number" 
                name="stock" 
                id="stock" 
                className="input" 
              />
              <ErrorMessage name="stock" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="descripcion" className="label">Descripción:</label>
              <Field 
                as="textarea" 
                name="descripcion" 
                id="descripcion" 
                className="input" 
                rows="4"
              />
              <ErrorMessage name="descripcion" component="div" className="error" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="create-button"
            >
              {isEditing ? 'Guardar Cambios' : 'Agregar Producto'}
            </button>
            
            <button
              type="button"
              onClick={() => navigate('/productos')}
              className="cancel-button"
            >
              Cancelar
            </button>
          </Form>
        )}
      </Formik>

      <h3 className="table-heading">Productos Actuales</h3>
      <table className="table">
        <thead>
          <tr>
            <th className="table-header">Nombre</th>
            <th className="table-header">Categoría</th>
            <th className="table-header">Precio</th>
            <th className="table-header">Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="table-row">
              <td className="table-cell">{product.nombre}</td>
              <td className="table-cell">{product.categoria}</td>
              <td className="table-cell">${product.precio.toFixed(2)}</td>
              <td className="table-cell">{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductForm;