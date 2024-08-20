type VariantType = {
    default: string;
    hover?: string;
    active?: string;
    focus?: string;
    disabled?: string;
    animation?: string;
};
export declare function createVariants(variants: Record<string, VariantType> | {
    component: React.FC;
    base: VariantType;
}): void;
export {};
//# sourceMappingURL=createVariants.d.ts.map