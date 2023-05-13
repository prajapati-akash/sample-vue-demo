import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default function useToasterNotify(status, message) {
    if(status == "success") {
        toast.success(message, {
            // toast options here
            // autoClose: 1000,
            position: toast.POSITION.TOP_RIGHT,
        });
    }
    if(status == "error") {
        toast.error(message, {
            // toast options here
            position: toast.POSITION.TOP_RIGHT,
        });
    }

    if(status == "info") {
        toast.info(message, {
            // toast options here
            position: toast.POSITION.TOP_RIGHT,
        });
    }

    if(status == "warning") {
        toast.warning(message, {
            // toast options here
            position: toast.POSITION.TOP_RIGHT,
        });
    }
}