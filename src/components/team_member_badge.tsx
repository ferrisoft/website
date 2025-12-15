
const basename = import.meta.env.BASE_URL

const nameToRole = {
    'Wojciech Danilo': 'Founder / CEO',
    'Greg Ociepka': 'Founder / COO',
}

export function TeamMemberBadge({name, className}: { name: keyof typeof nameToRole, className?: string }) {
    const nameSnake = name.toLowerCase().replace(/ /g, '_')
    const imageUrl = `${basename}team/${nameSnake}.png`
    const role = nameToRole[name]
    return (
        <div className= {(className ?? "") + " relative flex items-center gap-x-4 justify-self-end"}>
            <img alt="" src={imageUrl} className="size-10 rounded-full bg-gray-100" />
            <div className="">
                <p className="font-semibold text-gray-900">
                    <a>
                        {name}
                    </a>
                </p>
                <p className="text-gray-600">{role}</p>
            </div>
        </div>
    )
}
