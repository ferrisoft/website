// =================
// === Component ===
// =================

export function Component() {
    const currentYear = new Date().getFullYear()
    return (
        <footer className='w-full flex justify-center py-8 mt-8'>
            &copy; {currentYear} Ferrisoft, Inc. All rights reserved.
        </footer>
    )
}
