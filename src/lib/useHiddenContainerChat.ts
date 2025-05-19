import { ref } from "vue";

const isHidden = ref(true);
export function useHiddenContainerChat() {
    const toggleShow = () => {
        isHidden.value = !isHidden.value;
    };

    return {
        isHidden,
        toggleShow
    }
}