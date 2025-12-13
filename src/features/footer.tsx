export function Footer() {
    const currentYear = new Date().getFullYear()
    return (
        <footer className="w-full flex justify-center py-8">
            <p className="mt-8 text-center text-sm/6 text-gray-600 md:order-1 md:mt-0">
                &copy; {currentYear} Ferrisoft, Inc. All rights reserved.
            </p>
        </footer>
    )
}
