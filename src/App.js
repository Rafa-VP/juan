import { cilPencil, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { v4 as uuidv4 } from 'uuid';
import {
    CButton,
    CButtonGroup,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CRow,
    CTable
} from '@coreui/react';
import { useState } from 'react';
const mockData = [
    {
        uuid: '321292e9-ae5b-4eaa-ab9d-217c9aee4fcd',
        nombre: 'Juan',
        apellido: 'Aguilar',
        cedula: '0812345670'
    }
];

const columns = [
    {
        key: 'acciones',
        label: 'Acciones',
        _props: { scope: 'col' }
    },
    {
        key: 'uuid',
        label: 'ID',
        _props: { scope: 'col' }
    },
    {
        key: 'cedula',
        label: 'Cédula',
        _props: { scope: 'col' }
    },
    {
        key: 'nombre',
        label: 'Nombre',
        _props: { scope: 'col' }
    },
    {
        key: 'apellido',
        label: 'Apellido',
        _props: { scope: 'col' }
    }
];

function App() {
    const [isEditing, setIsEditing] = useState(false);
    const [dataTable, setDataTable] = useState(mockData);
    const [data, setData] = useState({
        uuid: uuidv4(),
        nombre: '',
        apellido: '',
        cedula: ''
    });

    function handleUpdateValueInKey(key, value) {
        setData((prev) => ({ ...prev, [key]: value }));
    }
    function handleResetData() {
        setData({
            uuid: uuidv4(),
            nombre: '',
            apellido: '',
            cedula: ''
        });
    }
    function handleAddData() {
        setDataTable((prev) => [...prev, data]);
        handleResetData();
    }
    function handleOnChange(event) {
        const {
            target: { value, name }
        } = event;
        handleUpdateValueInKey(name, value);
    }
    function handleDeleteData(uuidToDelete) {
        setDataTable((prev) =>
            prev.filter(({ uuid }) => uuid !== uuidToDelete)
        );
    }
    function handleChangeEditingState(data) {
        if (isEditing) {
            handleResetData();
            setIsEditing((prev) => !prev);
            return;
        }
        setIsEditing((prev) => !prev);
        setData(data);
    }
    function handleEditData() {
        setDataTable((prev) =>
            prev.map((mappedData) => {
                if (mappedData.uuid === data.uuid) {
                    return {
                        uuid: data.uuid,
                        cedula: data.cedula,
                        apellido: data.apellido,
                        nombre: data.nombre
                    };
                }
                return mappedData;
            })
        );
        handleChangeEditingState();
    }

    return (
        <CContainer>
            <h1>Juan</h1>
            <div>
                <CForm>
                    <CRow>
                        <CCol>
                            <CFormInput
                                name="cedula"
                                label="Cédula"
                                value={data.cedula}
                                onChange={handleOnChange}
                            />
                        </CCol>
                        <CCol>
                            <CFormInput
                                name="nombre"
                                label="Nombre"
                                value={data.nombre}
                                onChange={handleOnChange}
                            />
                        </CCol>
                        <CCol>
                            <CFormInput
                                name="apellido"
                                label="Apellido"
                                value={data.apellido}
                                onChange={handleOnChange}
                            />
                        </CCol>
                        <CCol>
                            <CButton
                                color={isEditing ? 'warning' : 'primary'}
                                onClick={
                                    isEditing ? handleEditData : handleAddData
                                }
                            >
                                {isEditing ? 'Editar' : 'Agregar'}
                            </CButton>
                        </CCol>
                    </CRow>
                </CForm>
            </div>

            <div>
                <CTable
                    items={dataTable.map((data) => ({
                        ...data,
                        acciones: (
                            <CButtonGroup>
                                <CButton
                                    color="warning"
                                    onClick={() =>
                                        handleChangeEditingState(data)
                                    }
                                >
                                    <CIcon icon={cilPencil} />
                                </CButton>
                                <CButton
                                    color="danger"
                                    onClick={() => handleDeleteData(data.uuid)}
                                >
                                    <CIcon icon={cilTrash} />
                                </CButton>
                            </CButtonGroup>
                        )
                    }))}
                    columns={columns}
                    hover
                    striped
                    responsive
                />
            </div>
        </CContainer>
    );
}

export default App;

