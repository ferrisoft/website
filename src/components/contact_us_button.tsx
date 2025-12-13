import * as React from "react"
import { Section } from "../layout"

export function ContactUsButton() {
    const ref = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        window.addEventListener("scroll", () => {
            if (ref.current == null) return
            const h2 = window.innerHeight/2
            const ratio =  Math.min(1, Math.max(0, window.scrollY - h2) / h2)
            ref.current.style.backgroundColor = `rgba(0, 0, 0, ${0.4 + 0.4 * ratio})`;
        });
    }, []);

    return (
        <div className="absolute w-full h-full z-50 pointer-events-none">
            <div className='sticky top-0'>
                <Section className="!max-w-screen-3xl">
                    <div className="w-full flex justify-end">
                        <div ref={ref} className="h-10 px-4 rounded-full text-white text-sm flex items-center justify-center" style={{
                            background: "rgba(0, 0, 0, 0.4)",
                            backdropFilter: "blur(16px)",
                        }}>
                            Contact Us
                        </div>
                    </div>
                </Section>
            </div>
        </div>
    )
}
