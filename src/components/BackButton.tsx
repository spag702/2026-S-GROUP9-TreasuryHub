"use client";
import { useRouter } from "next/navigation";

export default function BackButton({ 
    label = "Go Back",
    fallbackPath = "/dashboard" 
}: { 
    label?: string;
    fallbackPath?: string;
}) {
    const router = useRouter();

    const handleBack = () => {
    const segments = window.location.pathname.split("/").filter(Boolean);
    if (segments.length > 1) {
        segments.pop(); // remove last segment
        router.push("/" + segments.join("/"));
    } else {
        router.push(fallbackPath);
    }
};

    return (
        <button onClick={handleBack} className="border border-white bg-black-600 text-white px-4 py-2 rounded hover:bg-gray-700 active:scale-95 transition-all">
            {label}
        </button>
    );
}