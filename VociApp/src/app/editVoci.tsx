import { useLocalSearchParams, useRouter } from 'expo-router';
import { useVoci } from '../../context/vociContext';
import VociDetail from '../../components/VociDetail';
import Voci from '../../models/voci';
import * as FileSystem from 'expo-file-system/legacy';

export default function EditVociScreen() {
    const router = useRouter();
    const { term } = useLocalSearchParams<{ term: string }>();
    const { vociList, editVoci, deleteVoci } = useVoci();

    const voci = vociList.find(v => v.term === term);

    if (!voci) return null;

    const handleSave = (updatedVoci: Voci) => {
        editVoci(term as string, updatedVoci);
        router.back();
    };

    const handleDelete = () => {
        if (voci.imageUri) {
            FileSystem.deleteAsync(voci.imageUri, { idempotent: true });
        }
        deleteVoci(term as string);
        router.back();
    };

    return (
        <VociDetail
            initialVoci={voci}
            onSave={handleSave}
            onCancel={() => router.back()}
            onDelete={handleDelete}
        />
    );
}
