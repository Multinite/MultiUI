type CleanupFn = () => void;
declare function useEffectOnce(effect: () => void | CleanupFn): void;
export default useEffectOnce;
