import React, { createContext, useContext, useState } from 'react';

const ProcesoContext = createContext();

export const ProcesoProvider = ({ children }) => {
    const [procesoId, setProcesoId] = useState(null);

    return (
        <ProcesoContext.Provider value={{ procesoId, setProcesoId }}>
            {children}
        </ProcesoContext.Provider>
    );
};

export const useProcesoContext = () => {
    const context = useContext(ProcesoContext);
    if (!context) {
        throw new Error('useProcesoContext debe ser usado dentro de un ProcesoProvider');
    }
    return context;
};
