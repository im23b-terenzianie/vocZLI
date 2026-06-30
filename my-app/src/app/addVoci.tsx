import { useRouter } from 'expo-router';
import VociDetail from '../../components/VociDetail';
import { useVoci } from '../../context/vociContext';
import Voci from '../../models/voci';


export default function AddVociScreen() {
    const router = useRouter();
    const { addVoci } = useVoci();
    const handleAdd = (newVoci: Voci) => {
        addVoci(newVoci);
        router.back();
    };

    return <VociDetail onSave={handleAdd} />;

}
