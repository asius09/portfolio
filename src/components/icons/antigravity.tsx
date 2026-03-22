import React from "react";

export function Antigravity({ className, ...props }: { className?: string } & React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className={`fill-[url(#google-style-gradient)] ${className}`}
            {...props}
        >
            <defs>
                {/* Vertical gradient: Blue -> Green -> Red -> Blue */}
                <linearGradient id="google-style-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "#B1F5C4" }} />   {/* Magic Mint */}
                    <stop offset="50%" style={{ stopColor: "#4285F4" }} />  {/* Google Blue */}
                    <stop offset="100%" style={{ stopColor: "#0053D6" }} /> {/* Science Blue */}
                </linearGradient>
            </defs>

            <path d="m19.94,20.59c1.09.82,2.73.27,1.23-1.23-4.5-4.36-3.55-16.36-9.14-16.36S7.39,15,2.89,19.36c-1.64,1.64.14,2.05,1.23,1.23,4.23-2.86,3.95-7.91,7.91-7.91s3.68,5.05,7.91,7.91Z" />
        </svg>
    );
}