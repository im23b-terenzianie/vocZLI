import { createContext, useContext, useState, useEffect, useRef, ReactNode,  } from 'react';
import Voci from '../models/voci';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface VociContextType {
    vociList: Voci[];
    isLoading: boolean;
    addVoci: (voci: Voci) => void;
    editVoci: (term: string, updatedVoci: Voci) => void;
    deleteVoci: (term: string) => void;
}

const VociContext = createContext<VociContextType | undefined>(undefined);

export function VociProvider({ children }: { children: ReactNode }) {
    const [vociList, setVociList] = useState<Voci[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const addVoci = (voci: Voci) => setVociList(prev => [...prev, voci]);

    const editVoci = (term: string, updatedVoci: Voci) =>
        setVociList(prev => prev.map(v => v.term === term ? updatedVoci : v));

    const deleteVoci = (term: string) =>
        setVociList(prev => prev.filter(v => v.term !== term));

    const isLoaded = useRef(false);

    // Laden: läuft einmal beim Start
    useEffect(() => {
        AsyncStorage.getItem('vociList')
            .then((stored) => {
                if (stored) {
                    setVociList(JSON.parse(stored));
                }
            })
            .catch(error => console.error('Fehler beim Laden:', error))
            .finally(() => {
                isLoaded.current = true;
                setIsLoading(false);
            });
    }, []);

    // Speichern: läuft bei jeder Änderung, aber NICHT beim ersten Render
    useEffect(() => {
        if (!isLoaded.current) return;
        AsyncStorage.setItem('vociList', JSON.stringify(vociList))
            .catch(error => console.error('Fehler beim Speichern:', error));
    }, [vociList]);

    return (
        <VociContext.Provider value={{ vociList, isLoading, addVoci, editVoci, deleteVoci }}>
            {children}
        </VociContext.Provider>
    );
}

export function useVoci() {
    const context = useContext(VociContext);
    if (!context) {
        throw new Error('useVoci muss innerhalb von VociProvider verwendet werden');
    }
    return context;
}

