import { useState } from "react";
import "./unicorn.css";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Panel } from "primereact/panel";

const UnicornsView = ({
  unicorns,
  eliminarUnicornio,
  recargarUnicornios,
  crearUnicornio,
  modoCreacion,
  activarCreacion,
  cancelarCreacion,
  onVolver
}) => {
  const [modoEdicionId, setModoEdicionId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", color: "", age: "", power: "" });
  const [nuevoUnicornio, setNuevoUnicornio] = useState({ name: "", color: "", age: "", power: "" });

  const activarEdicion = (unicorn) => {
    setModoEdicionId(unicorn._id);
    setEditForm({ name: unicorn.name, color: unicorn.color, age: unicorn.age, power: unicorn.power });
  };

  const actualizarUnicornio = async (id) => {
    const { name, color, age, power } = editForm;
    if (!name.trim() || !color.trim() || !power.trim()) {
      alert("Por favor completá todos los campos de texto.");
      return;
    }

    const ageNumber = Number(age);
    if (isNaN(ageNumber) || ageNumber < 0) {
      alert("La edad debe ser un número válido mayor o igual a 0.");
      return;
    }

    try {
      await fetch(`https://crudcrud.com/api/845cb6ca98d547db9af07aa0024b439f/unicornios/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, color, age: ageNumber, power }),
      });

      setModoEdicionId(null);
      recargarUnicornios();
    } catch (error) {
      console.error("Error al actualizar unicornio:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNuevoChange = (e) => {
    const { name, value } = e.target;
    setNuevoUnicornio((prev) => ({ ...prev, [name]: value }));
  };

  const handleCrear = () => {
    const { name, color, age, power } = nuevoUnicornio;
    if (!name.trim() || !color.trim() || !power.trim()) {
      alert("Todos los campos son obligatorios.");
      return;
    }
    const ageNumber = Number(age);
    if (isNaN(ageNumber) || ageNumber < 0) {
      alert("La edad debe ser un número válido mayor o igual a 0.");
      return;
    }

    crearUnicornio({ name, color, age: ageNumber, power });
    setNuevoUnicornio({ name: "", color: "", age: "", power: "" });
  };

  return (
    <div className="unicorns-view p-4">
      <h2 className="mb-4">Lista de Unicornios</h2>

      <div className="mb-3 flex gap-2">
        <Button label="Volver" icon="pi pi-arrow-left" onClick={onVolver} />
        {!modoCreacion ? (
          <Button label="Agregar" icon="pi pi-plus" onClick={activarCreacion} className="p-button-success" />
        ) : (
          <Button label="Cancelar" icon="pi pi-times" onClick={cancelarCreacion} className="p-button-secondary" />
        )}
      </div>

      {modoCreacion && (
        <Panel header="Nuevo Unicornio" className="mb-4">
          <div className="p-fluid formgrid grid">
            <div className="field col-12 md:col-3">
              <InputText name="name" value={nuevoUnicornio.name} onChange={handleNuevoChange} placeholder="Nombre" />
            </div>
            <div className="field col-12 md:col-3">
              <InputText name="color" value={nuevoUnicornio.color} onChange={handleNuevoChange} placeholder="Color" />
            </div>
            <div className="field col-12 md:col-3">
              <InputText name="age" value={nuevoUnicornio.age} onChange={handleNuevoChange} placeholder="Edad" />
            </div>
            <div className="field col-12 md:col-3">
              <InputText name="power" value={nuevoUnicornio.power} onChange={handleNuevoChange} placeholder="Poder" />
            </div>
          </div>
          <Button label="Crear" icon="pi pi-check" onClick={handleCrear} className="mt-2" />
        </Panel>
      )}

      {unicorns.length === 0 ? (
        <p>No hay unicornios.</p>
      ) : (
        <DataTable value={unicorns} responsiveLayout="scroll" rowKey="_id">
          <Column
            header="Nombre"
            body={(rowData) =>
              modoEdicionId === rowData._id ? (
                <InputText name="name" value={editForm.name} onChange={handleChange} />
              ) : (
                rowData.name
              )
            }
          />
          <Column
            header="Color"
            body={(rowData) =>
              modoEdicionId === rowData._id ? (
                <InputText name="color" value={editForm.color} onChange={handleChange} />
              ) : (
                rowData.color
              )
            }
          />
          <Column
            header="Edad"
            body={(rowData) =>
              modoEdicionId === rowData._id ? (
                <InputText name="age" value={editForm.age} onChange={handleChange} />
              ) : (
                rowData.age
              )
            }
          />
          <Column
            header="Poder"
            body={(rowData) =>
              modoEdicionId === rowData._id ? (
                <InputText name="power" value={editForm.power} onChange={handleChange} />
              ) : (
                rowData.power
              )
            }
          />
          <Column
            header="Acciones"
            body={(rowData) =>
              modoEdicionId === rowData._id ? (
                <Button
                  icon="pi pi-save"
                  className="p-button-sm p-button-success"
                  onClick={() => actualizarUnicornio(rowData._id)}
                  disabled={
                    !editForm.name.trim() ||
                    !editForm.color.trim() ||
                    !editForm.power.trim() ||
                    isNaN(Number(editForm.age))
                  }
                />
              ) : (
                <div className="flex gap-2 justify-content-start">
                  <Button icon="pi pi-pencil" className="p-button-sm p-button-warning" onClick={() => activarEdicion(rowData)} />
                  <Button icon="pi pi-trash" className="p-button-sm p-button-danger" onClick={() => eliminarUnicornio(rowData._id)} />
                </div>
              )
            }
          />
        </DataTable>
      )}
    </div>
  );
};

export default UnicornsView;
