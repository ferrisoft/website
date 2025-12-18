import {CheckCircleIcon, InformationCircleIcon} from '@heroicons/react/20/solid'
import * as Layout from '../layout.tsx'
import FerrisoftLogo from '../assets/logo/ferrisoft.svg?react'
import {TeamMemberBadge} from '../components/team_member_badge'
import * as Html from '@/html'
import * as React from 'react'
import * as ClientsLogos from '@/components/client_logos.tsx'
import * as CompanyLogo from '@/components/company_logo.tsx'
import * as CtaButton from '@/components/cta_button.tsx'
import * as Contact from '@/section/contact.tsx'
import * as Footer from '@/section/footer.tsx'

export function Header() {
    const bgRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        if (bgRef.current != null) {
            // @ts-expect-error -- provided by unicornstudio.umd.js
            UnicornStudio.init()
        }
    }, [])

    const fontSizeMin = '34px'
    const fontSizeMax = '60px'
    const fontSizeDiff = `(${fontSizeMax} - ${fontSizeMin})`
    const fontSize = `calc(${fontSizeMin} + ${fontSizeDiff} * var(--content-size-norm)`

    const background = (
        <>
            <div
                // We set height to screen here as its parent uses h-dvh to show the required part and we don't want
                // to rescale the WebGL component.
                className='absolute top-0 left-0 w-full h-screen'
                ref={bgRef}
                data-us-project-src='../gradient_config.json'
            />
        </>
    )

    return (
        <div
            className='_top-panel relative w-screen'
            style={{
                width: 'calc(max(var(--global-min-width), 100vw))',
            }}
        >
            <Layout.RootPaddingY>
                <Layout.SectionCard
                    className='w-full !max-w-screen-3xl'
                    background={background}
                >
                    <CompanyLogo.Component
                        className='h-10 w-auto'
                        style={{
                            '--badge-background': 'rgba(0, 0, 0, 0.8)',
                            '--badge-letter': 'white',
                            '--name-letter': 'white',
                        }}
                    />
                </Layout.SectionCard>
            </Layout.RootPaddingY>
        </div>
    )
}

export function Blog() {
    const contactRef = React.useRef<HTMLDivElement>(null)

    return (
        <div className='relative'>
            <Header />

            <div className='px-6 lg:px-8 py-20'>
                <div className='mx-auto max-w-3xl flex flex-col'>
                    <TeamMemberBadge name='Wojciech Danilo' />
                    <div className='text-base/7 mt-16'>
                        <h1 className='text-wrap'>
                            Introducing <code>fixed_num</code>, financial focused decimal for Rust.
                        </h1>
                        <h3 className='mt-6 text-xl/8'>
                            Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit dui mi, nibh
                            dui, diam eget aliquam. Quisque id at vitae feugiat egestas ac. Diam nulla orci at in
                            viverra scelerisque eget. Eleifend egestas fringilla sapien.
                        </h3>
                        <div className='mt-10 max-w-2xl'>
                            <p>
                                Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris
                                semper sed amet vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus
                                viverra tellus varius sit neque erat velit. Faucibus commodo massa rhoncus, volutpat.
                                Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae sed turpis id.
                            </p>
                            <ul
                                role='list'
                                className='mt-8 max-w-xl space-y-8'
                            >
                                <li className='flex gap-x-3'>
                                    <CheckCircleIcon
                                        aria-hidden='true'
                                        className='mt-1 size-5 flex-none text-indigo-600'
                                    />
                                    <span>
                                        <strong className='font-semibold'>Data types.</strong> Lorem ipsum, dolor sit
                                        amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque,
                                        iste dolor cupiditate blanditiis ratione.
                                    </span>
                                </li>
                                <li className='flex gap-x-3'>
                                    <CheckCircleIcon
                                        aria-hidden='true'
                                        className='mt-1 size-5 flex-none text-indigo-600'
                                    />
                                    <span>
                                        <strong className='font-semibold'>Loops.</strong> Anim aute id magna aliqua ad
                                        ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
                                    </span>
                                </li>
                                <li className='flex gap-x-3'>
                                    <CheckCircleIcon
                                        aria-hidden='true'
                                        className='mt-1 size-5 flex-none text-indigo-600'
                                    />
                                    <span>
                                        <strong className='font-semibold'>Events.</strong> Ac tincidunt sapien vehicula
                                        erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.
                                    </span>
                                </li>
                            </ul>
                            <p className='mt-8'>
                                Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis odio id et. Id blandit
                                molestie auctor fermentum dignissim. Lacus diam tincidunt ac cursus in vel. Mauris
                                varius vulputate et ultrices hac adipiscing egestas. Iaculis convallis ac tempor et ut.
                                Ac lorem vel integer orci.
                            </p>
                            <h2 className='mt-16'>From beginner to expert in 3 hours</h2>
                            <p className='mt-6'>
                                Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam consequat in. Convallis arcu
                                ipsum urna nibh. Pharetra, euismod vitae interdum mauris enim, consequat vulputate nibh.
                                Maecenas pellentesque id sed tellus mauris, ultrices mauris. Tincidunt enim cursus
                                ridiculus mi. Pellentesque nam sed nullam sed diam turpis ipsum eu a sed convallis diam.
                            </p>
                            <figure className='mt-10 border-l border-indigo-600 pl-9'>
                                <blockquote className='font-semibold'>
                                    <p>
                                        "Vel ultricies morbi odio facilisi ultrices accumsan donec lacus purus. Lectus
                                        nibh ullamcorper ac dictum justo in euismod. Risus aenean ut elit massa. In amet
                                        aliquet eget cras. Sem volutpat enim tristique."
                                    </p>
                                </blockquote>
                                <figcaption className='mt-6 flex gap-x-4'>
                                    <img
                                        alt=''
                                        src='https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                                        className='size-6 flex-none rounded-full bg-gray-50'
                                    />
                                    <div className='text-sm/6'>
                                        <strong className='font-semibold'>Maria Hill</strong> – Marketing Manager
                                    </div>
                                </figcaption>
                            </figure>
                            <p className='mt-10'>
                                Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris
                                semper sed amet vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus
                                viverra tellus varius sit neque erat velit.
                            </p>
                        </div>
                        <figure className='mt-16'>
                            <img
                                alt=''
                                src='https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&w=1310&h=873&q=80&facepad=3'
                                className='aspect-video rounded-xl bg-gray-50 object-cover'
                            />
                            <figcaption className='mt-4 flex gap-x-2 text-sm/6 text-gray-500'>
                                <InformationCircleIcon
                                    aria-hidden='true'
                                    className='mt-0.5 size-5 flex-none text-gray-300'
                                />
                                Faucibus commodo massa rhoncus, volutpat.
                            </figcaption>
                        </figure>
                        <div>
                            <h2 className='mt-16'>Everything you need to get up and running</h2>
                            <p className='mt-6'>
                                Purus morbi dignissim senectus mattis adipiscing. Amet, massa quam varius orci dapibus
                                volutpat cras. In amet eu ridiculus leo sodales cursus tristique. Tincidunt sed tempus
                                ut viverra ridiculus non molestie. Gravida quis fringilla amet eget dui tempor
                                dignissim. Facilisis auctor venenatis varius nunc, congue erat ac. Cras fermentum
                                convallis quam.
                            </p>
                            <p className='mt-8'>
                                Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris
                                semper sed amet vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus
                                viverra tellus varius sit neque erat velit.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <CtaButton.Component
                onMouseDown={() => {
                    if (contactRef.current) {
                        contactRef.current.scrollIntoView({behavior: 'smooth'})
                    }
                }}
            />
            <Contact.Component ref={contactRef} />
            <Footer.Component />
        </div>
    )
}
