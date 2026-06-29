import { createContext, useContext, useState, ReactNode } from 'react';
import Voci from '../models/voci';

interface VociContextType {
  vociList: Voci[];
  addVoci: (voci: Voci) => void;
  updateVoci: (term: string, updatedVoci: Voci) => void;
  removeVoci: (term: string) => void;
}

const VociContext = createContext<VociContextType | undefined>(undefined);

export function VociProvider({ children }: { children: ReactNode }) {
    const [vociList, setVociList] = useState<Voci[]>([
  { term: "der Hund", translation: "the dog" },
  { term: "die Katze", translation: "the cat" },
  { term: "das Haus", translation: "the house" },
  { term: "der Baum", translation: "the tree" },
  { term: "die Schule", translation: "the school" },
  { term: "das Buch", translation: "the book" },
  { term: "der Tisch", translation: "the table" },
  { term: "die Sonne", translation: "the sun" },
]);

    return (
    <VociContext.Provider value={{ vociList }}>
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