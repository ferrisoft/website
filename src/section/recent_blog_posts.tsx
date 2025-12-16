import {TeamMemberBadge} from '../components/team_member_badge'
import {FeaturesTemplate} from './performance'

const posts = [
    {
        title: (
            <>
                Zero-cost partial borrows <br className='hidden md:block xl:hidden' /> for Rust.
            </>
        ),
        href: '#',
        description: (
            <>
                The <code>borrow</code> crate lets you borrow only selected fields of a struct. It addresses a
                long-standing limitation in the Rust type system that has been discussed in the community for more than
                a decade.
            </>
        ),
        imageUrl: 'blog/borrow.png',
        author: {
            name: 'Wojciech Danilo',
            href: '#',
        },
    },
    {
        title: (
            <>
                Financial-focused decimal <br className='hidden md:block xl:hidden' /> for Rust.
            </>
        ),
        href: '#',
        description: (
            <>
                The <code>fixed_num</code> crate provides a high-precision, high-performance fixed-point decimal type,
                suited for scenarios where floating-point drift or arbitrary-precision overhead are unacceptable.
            </>
        ),
        imageUrl: 'blog/fixed_num.png',
        author: {
            name: 'Wojciech Danilo',
            href: '#',
        },
    },
    {
        title: (
            <>
                A novel way to write <br className='hidden md:block xl:hidden' /> Rust macros.{' '}
            </>
        ),
        href: '#',
        description: (
            <>
                The <code>crabtime</code> crate introduces a new approach to writing Rust macros. It offers more
                flexibility than procedural macros while remaining easier and more natural to read and write than{' '}
                <code>macro_rules</code>.
            </>
        ),
        imageUrl: 'blog/crabtime.png',
        author: {
            name: 'Greg Ociepka',
            href: '#',
        },
    },
] as const

export function Component() {
    return (
        <FeaturesTemplate
            title={<>Blog Highlights.</>}
            subtitle={<>Learn about technology we've built.</>}
            header={<></>}
        >
            {posts.map((post, ix) => (
                <a
                    href={post.href}
                    className='relative group'
                >
                    <div className='absolute -inset-4 rounded-3xl transition-all duration-500 group-hover:shadow-xl' />
                    <article
                        key={ix}
                        className='h-full flex flex-col items-start justify-between'
                    >
                        <div className='relative w-full'>
                            <img
                                alt=''
                                src={post.imageUrl}
                                className='w-full object-cover aspect-3/2'
                                style={{
                                    maxWidth: '352px',
                                }}
                            />
                        </div>
                        <div className='flex max-w-xl grow flex-col justify-between'>
                            <div className='group relative grow'>
                                <h3 className='mt-6 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600'>
                                    {post.title}
                                </h3>
                                <p className='mt-2 text-sm/6 text-gray-60'>{post.description}</p>
                            </div>
                            <TeamMemberBadge
                                name={post.author.name}
                                className='mt-6'
                            />
                        </div>
                    </article>
                </a>
            ))}
        </FeaturesTemplate>
    )
}
