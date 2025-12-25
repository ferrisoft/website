import * as Layout from '@/layout.tsx'
import {TeamMemberBadge} from '@/components/team_member_badge'
import * as React from 'react'
import * as CompanyLogo from '@/components/company_logo.tsx'
import * as CtaButton from '@/components/cta_button.tsx'
import * as Contact from '@/section/contact.tsx'
import * as Footer from '@/section/footer.tsx'
import * as Prism from 'prism-react-renderer'
import * as Class from '@/class'

export function Header() {
    const bgRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        if (bgRef.current != null) {
            // @ts-expect-error -- provided by unicornstudio.umd.js
            UnicornStudio.init()
        }
    }, [])

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

function stripMinLeadingSpaces(multiline: string): string {
    const lines = multiline.replace(/\r\n?/g, '\n').split('\n')

    let minIndent = Infinity

    for (const line of lines) {
        if (line.trim().length === 0) continue
        const leadingSpaces = line.match(/^ */)?.[0].length ?? 0
        if (leadingSpaces < minIndent) minIndent = leadingSpaces
    }

    if (!isFinite(minIndent) || minIndent === 0) return lines.join('\n')

    return lines.map(line => (line.startsWith(' '.repeat(minIndent)) ? line.slice(minIndent) : line)).join('\n')
}

function splitLineAttrs(line: Prism.Token[]): [string | null, Prism.Token[]] {
    let index = 0
    for (; ; index++) {
        const token = line[index]
        if (token == null) return [null, line]
        if (token.content.trim().length == 0) continue
        const match = token.content.match(/\/\*@([!a-zA-Z0-9_-]+)\*\//)
        if (match == null) return [null, line]
        return [match[1], line.filter((_, i) => i != index)]
    }
}

function Code({
    src,
    className,
    roundedBottom = true,
    lineClassName,
}: {
    src: string
    className?: string
    roundedBottom?: boolean
    lineClassName?: string
}) {
    const srcClean = stripMinLeadingSpaces(src).trim()
    const themeBase = Prism.themes.vsLight
    const theme = {
        styles: themeBase.styles,
        plain: {
            backgroundColor: 'transparent',
            color: 'rgba(0, 0, 0, 0.8)',
        },
    }
    return (
        <div className={Class.names('text-[14px] leading-[1.3em]', className)}>
            <div className='relative'>
                <div
                    className={Class.names(
                        'relative bg-zinc-100 overflow-scroll',
                        roundedBottom ? 'rounded-2xl' : 'rounded-t-2xl',
                    )}
                >
                    <Prism.Highlight
                        theme={theme}
                        code={srcClean}
                        language='rust'
                    >
                        {({style, tokens, getLineProps, getTokenProps}) => (
                            <pre
                                className='py-8'
                                style={style}
                            >
                                {(() => {
                                    return tokens.map((lineAndAttrs, i) => {
                                        const [attrs, line] = splitLineAttrs(lineAndAttrs)
                                        return (
                                            <div className={Class.names('px-8', lineClassName, attrs)}>
                                                <div
                                                    key={i}
                                                    {...getLineProps({line})}
                                                >
                                                    {line.map((token, key) => (
                                                        <span
                                                            key={key}
                                                            {...getTokenProps({token})}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                    })
                                })()}
                            </pre>
                        )}
                    </Prism.Highlight>
                </div>
            </div>
        </div>
    )
}

function CodeDetails({summary, children}: {summary: string; children: React.ReactNode}) {
    return (
        <details className='mt-[1px] mb-6 bg-zinc-100 rounded-b-2xl cursor-pointer'>
            <summary className='w-full p-4 text-blue-600'>&nbsp;{summary}</summary>
            {children}
        </details>
    )
}

export function zip<A, B>(a: readonly A[], b: readonly B[]): Array<[A, B]> {
    const n = Math.min(a.length, b.length)
    return Array.from({length: n}, (_, i) => [a[i], b[i]] as [A, B])
}

function Content({children}: {children: React.Node}) {
    return <div className='mx-auto max-w-3xl'>{children}</div>
}

function Link({href, children}: {href: string; children: React.ReactNode}) {
    return (
        <a
            href={href}
            target='_blank'
            rel='noopener noreferrer'
            className='underline text-blue-400 cursor-pointer'
        >
            {children}
        </a>
    )
}

export function Component() {
    const contactRef = React.useRef<HTMLDivElement>(null)

    return (
        <div
            className='relative'
            style={{minWidth: 'var(--global-min-width)'}}
        >
            <div className='bg-code-line-highlight' />

            <Header />

            <div className='px-6 lg:px-8 py-20'>
                <div className='flex flex-col relative'>
                    <Content>
                        <TeamMemberBadge name='Wojciech Danilo' />
                    </Content>

                    <div className='text-[15px] mt-16 leading-[1.5em]'>
                        <Content>
                            <h1 className='text-wrap'>
                                Introducing{' '}
                                <Link href='https://crates.io/crates/borrow'>
                                    <code>borrow</code>
                                </Link>
                                , a zero-cost partial borrows in Rust
                            </h1>
                            <h3 className='mt-6 text-md'>
                                This blog post describes how we solved a problem the Rust community has struggled with
                                for over 10 years:
                                <ul className='mt-4 text-sm list-disc space-y-2 pl-6'>
                                    <li>
                                        <Link href='https://hackmd.io/J5aGp1ptT46lqLmPVVOxzg?view#:~:text=It%20is%20by%20far%20my%20biggest%20frustration%20with%20Rust%2C%20one%20that%20constantly%20sucks%20joy%20out%20of%20Rust%20programming%20for%20me'>
                                            "It is by far my biggest frustration with Rust, one that constantly sucks
                                            joy out of Rust programming for me."
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href='https://www.reddit.com/r/rust/comments/1cdqdsi/comment/l1hd11q/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button'>
                                            "I am very close to leave Rust behind as well. Especially the partial
                                            borrowing issues just suck."
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href='https://www.reddit.com/r/rust/comments/1hoqc4v/comment/m4bwnbf/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button'>
                                            "The inability to partially borrow self has been a persistent thorn in the
                                            language."
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href='https://www.reddit.com/r/rust/comments/1hoqc4v/comment/m4mb8jr/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button'>
                                            "While I totally agree and recognize the pain, and I wish for there to be a
                                            way to partially borrow self… But yeah, this definitely sucks."
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href='https://www.reddit.com/r/rust/comments/1hoqc4v/comment/m4d31md/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button'>
                                            "As someone that's tried Rust a few times and bounced off it, this is one of
                                            the things that I found strangest".
                                        </Link>
                                    </li>
                                </ul>
                            </h3>
                            <h2>Why is it such a big problem?</h2>
                            <p>
                                Rust’s safety guarantees come from strict borrowing rules, but those rules have a
                                well-known blind spot for partial borrowing. In simple terms, Rust does not make it easy
                                to borrow one part of an object while another part is already borrowed. Any method that
                                takes a mutable reference to a struct is treated as if it may access the entire struct,
                                not just one field. This means you often cannot have two methods, or two borrows, active
                                on one struct even when the operations touch disjoint fields. As a{' '}
                                <Link href='https://internals.rust-lang.org/t/notes-on-partial-borrows/20020'>
                                    Rust Internals discussion
                                </Link>{' '}
                                notes, the inability to borrow a subset of a struct is “one of the borrow checker’s
                                major limitations” and a solution “has long been desired”. Many Rustaceans consider this
                                to be among the biggest shortcomings of Rust’s current type system.
                            </p>
                            <p className='mt-6'>
                                What exactly is the problem? Let’s illustrate it with a practical example. Imagine a
                                rendering engine. A naive implementation might look like this:
                                <Code
                                    className='py-6'
                                    src='
                                        struct Scene {
                                            meshes: Vec<Mesh>,
                                        }

                                        struct Mesh {
                                            geometry: Geometry,
                                            material: Material
                                        }

                                        struct Geometry {
                                            // buffer, ...
                                        }

                                        struct Material {
                                            // shader, ...
                                        }
                                    '
                                />
                                The immediate issue is that the scene graph is not really representable. Different
                                meshes can refer to the same geometry or the same material. Scenes should be able to
                                share meshes. Materials should be able to share textures. Another naive approach would
                                be to pack every structure in <code>Rc&lt;RefCell&lt;...&gt;&gt;</code>. That impacts
                                performance and makes the API cumbersome. Most importantly, it removes one of Rust’s
                                core advantages, compile-time safety against overlapping mutable references. That is why
                                the common solution is to move all shared data into a container and reference it by
                                indexes in that container:
                                <div className='py-6 flex gap-2 flex-wrap'>
                                    <Code
                                        className='grow'
                                        src='
                                            type SceneId = usize;
                                            struct Scene {
                                                meshes: Vec<MeshId>,
                                                // render view config
                                            }

                                            type MeshId = usize;
                                            struct Mesh {
                                                geometry: GeometryId,
                                                material: MaterialId
                                            }

                                            type GeometryId = usize;
                                            struct Geometry {
                                                // bufferId, ...
                                            }

                                            type MaterialId = usize;
                                            struct Material {
                                                // shaderId, ...
                                            }
                                        '
                                    />
                                    <Code
                                        className='grow'
                                        src='
                                            struct Ctx {
                                                scenes: Vec<Scene>,
                                                meshes: Vec<Mesh>,
                                                geometries: Vec<Geometry>,
                                                materials: Vec<Material>,
                                                // shaders: ...
                                                // buffers: ...
                                            }
                                        '
                                    />
                                </div>
                                This architecture is what you see in practically all game and rendering engines in Rust.
                                Let's now try writing the rendering functions:
                                <Code
                                    className='py-6'
                                    src='
                                        fn render(ctx: &mut Ctx) {
                                            for scene in &ctx.scenes {
                                                // Set up render view.
                                                scene.render(ctx)
                                            }
                                        }

                                        impl Scene {
                                            fn render(&self, ctx: &mut Ctx) {
                                                for &mesh in &self.meshes {
                                                    ctx.meshes[mesh].render(ctx)
                                                }
                                            }
                                        }

                                        impl Mesh {
                                            fn render(&self, ctx: &mut Ctx) {
                                                ctx.geometries[self.geometry].init(ctx);
                                                ctx.materials[self.material].compile(ctx);
                                                // Draw the geometry.
                                            }
                                        }

                                        impl Geometry {
                                            fn init(&self, ctx: &mut Ctx) {
                                                // Initialize required ctx.buffers.
                                            }
                                        }

                                        impl Material {
                                            fn compile(&self, ctx: &mut Ctx) {
                                                // Compile required ctx.shaders.
                                                // Initialize ctx.buffers
                                                // (uniforms, vertex attribs, etc.)
                                            }
                                        }
                                    '
                                />
                                Unfortunately, this code does not compile:
                                <Code
                                    roundedBottom={false}
                                    className='pt-6'
                                    src='
                                        error[E0502]: cannot borrow `*ctx` as mutable because
                                                      it is also borrowed as immutable

                                            for scene in &ctx.scenes {
                                                         -----------
                                                         |
                                                         immutable borrow occurs here
                                                         immutable borrow later used here
                                                // Set up render view.
                                                scene.render(ctx)
                                                ^^^^^^^^^^^^^^^^^ mutable borrow occurs here
                                    '
                                />
                                <CodeDetails summary='Similar errors folded for brevity. Click here to expand.'>
                                    <Code
                                        src='
                                        error[E0502]: cannot borrow `*ctx` as mutable because
                                                      it is also borrowed as immutable

                                            for scene in &ctx.scenes {
                                                         -----------
                                                         |
                                                         immutable borrow occurs here
                                                         immutable borrow later used here
                                                // Set up render view.
                                                scene.render(ctx)
                                                ^^^^^^^^^^^^^^^^^ mutable borrow occurs here


                                        error[E0502]: cannot borrow `*ctx` as mutable because
                                                      it is also borrowed as immutable

                                            ctx.meshes[mesh].render(ctx)
                                            ----------^^^^^^^------^^^^^
                                            |                |
                                            |             immutable borrow later used by call
                                            mutable borrow occurs here
                                            immutable borrow occurs here


                                        error[E0502]: cannot borrow `*ctx` as mutable because
                                                      it is also borrowed as immutable

                                            ctx.geometries[self.geometry].init(ctx);
                                            --------------^^^^^^^^^^^^^^^^----^^^^^
                                            |                             |
                                            |             immutable borrow later used by call
                                            mutable borrow occurs here
                                            immutable borrow occurs here


                                        error[E0502]: cannot borrow `*ctx` as mutable because
                                                      it is also borrowed as immutable

                                            ctx.materials[self.material].compile(ctx);
                                            -------------^^^^^^^^^^^^^^^^-------^^^^^
                                            |                            |
                                            |             immutable borrow later used by call
                                            mutable borrow occurs here
                                            immutable borrow occurs here
                                    '
                                    />
                                </CodeDetails>
                                Logically, this code should compile, because we never try to access the same field of{' '}
                                <code>Ctx</code> from different parts of the code. The Rust compiler cannot prove that
                                here, because it examines one function at a time.
                                <br />
                                <br />
                                Here are a few possible workarounds. They are described in detail by Nicholas Matsakis,
                                co-lead of the Rust language design team, in his{' '}
                                <Link href='https://smallcultfollowing.com/babysteps/blog/2018/11/01/after-nll-interprocedural-conflicts'>
                                    After NLL: Interprocedural conflicts blog post
                                </Link>
                                . All of them have serious drawbacks and cannot be considered solutions:
                                <ul className='mt-4 list-disc space-y-2 pl-6'>
                                    <li>
                                        <strong>Inlining everything to a single function.</strong> This makes code
                                        non-modular, prevents function reuse, prevents unit testing, and becomes
                                        difficult to maintain at real-world scale.
                                    </li>
                                    <li>
                                        <strong>
                                            Refactoring <code>Ctx</code> into many sub-structs.
                                        </strong>{' '}
                                        This can help in some cases, but it often fails. Depending on control flow, you
                                        may need to split <code>Ctx</code> differently at different call sites.
                                    </li>
                                    <li>
                                        <strong>Passing mutable references explicitly.</strong> We can manually pass the
                                        required mutable references to every function. This makes the code hard to
                                        write, read, reason about, maintain, and refactor. Keep in mind that the code
                                        above is a major simplification. In real codebases, the number of passed
                                        arguments can be much larger. In some rendering engines it is 20 to 30
                                        parameters:
                                        <Code
                                            className='pt-6'
                                            roundedBottom={false}
                                            src='
                                                fn render(ctx: &mut Ctx) {
                                                    for scene in &ctx.scenes {
                                                        // Set up render view.
                                                        scene.render(
                                                            /*@bg-code-line-highlight*/&mut ctx.meshes,
                                                            /*@bg-code-line-highlight*/&mut ctx.geometries,
                                                            /*@bg-code-line-highlight*/&mut ctx.materials,
                                                            /*@bg-code-line-highlight*/&mut ctx.shaders,
                                                            /*@bg-code-line-highlight*/&mut ctx.buffers
                                                        )
                                                    }
                                                }

                                                impl Scene {
                                                    fn render(
                                                        &self,
                                                        /*@bg-code-line-highlight*/meshes: &mut [Mesh],
                                                        /*@bg-code-line-highlight*/geometries: &mut [Geometry],
                                                        /*@bg-code-line-highlight*/materials: &mut [Material],
                                                        /*@bg-code-line-highlight*/shaders: &mut [Shader],
                                                        /*@bg-code-line-highlight*/buffers: &mut [Buffer]
                                                    ) {
                                                        for &mesh in &self.meshes {
                                                            meshes[mesh].render(
                                                                /*@bg-code-line-highlight*/geometries,
                                                                /*@bg-code-line-highlight*/materials,
                                                                /*@bg-code-line-highlight*/shaders,
                                                                /*@bg-code-line-highlight*/buffers
                                                            )
                                                        }
                                                    }
                                                }

                                                impl Mesh {
                                                    fn render(
                                                        &self,
                                                        /*@bg-code-line-highlight*/geometries: &mut [Geometry],
                                                        /*@bg-code-line-highlight*/materials: &mut [Material],
                                                        /*@bg-code-line-highlight*/shaders: &mut [Shader],
                                                        /*@bg-code-line-highlight*/buffers: &mut [Buffer]
                                                    ) {
                                                        /*@bg-code-line-highlight*/geometries[self.geometry].init(buffers);
                                                        /*@bg-code-line-highlight*/materials[self.material].compile(buffers, shaders);
                                                        // Draw the geometry.
                                                    }
                                                }

                                                impl Geometry {
                                                    /*@bg-code-line-highlight*/fn init(&self, buffers: &mut [Buffer]) {
                                                        // Initialize ctx.buffers.
                                                    }
                                                }

                                                impl Material {
                                                    fn compile(
                                                        &self,
                                                        /*@bg-code-line-highlight*/buffers: &mut [Buffer],
                                                        /*@bg-code-line-highlight*/shaders: &mut [Shader]
                                                    ) {
                                                        // Compile required ctx.shaders.
                                                        // Initialize ctx.buffers
                                                        // (uniforms, vertex attribs, etc.)
                                                    }
                                                }
                                            '
                                        />
                                        <CodeDetails summary='Struct definitions folded for brevity. Click here to expand.'>
                                            <Code
                                                src='
                                                    type SceneId = usize;
                                                    struct Scene {
                                                        meshes: Vec<MeshId>,
                                                        // render view config
                                                    }

                                                    type MeshId = usize;
                                                    struct Mesh {
                                                        geometry: GeometryId,
                                                        material: MaterialId
                                                    }

                                                    type GeometryId = usize;
                                                    struct Geometry {
                                                        // bufferId, ...
                                                    }

                                                    type MaterialId = usize;
                                                    struct Material {
                                                        // shaderId, ...
                                                    }

                                                    struct Ctx {
                                                        scenes: Vec<Scene>,
                                                        meshes: Vec<Mesh>,
                                                        geometries: Vec<Geometry>,
                                                        materials: Vec<Material>,
                                                        // shaders: ...
                                                        // buffers: ...
                                                    }
                                                '
                                            />
                                        </CodeDetails>
                                    </li>
                                </ul>
                            </p>
                            <h2>How do partial borrows resolve this issue?</h2>
                            Partial borrows allow us to express which fields are borrowed from a struct. The{' '}
                            <Link href='https://internals.rust-lang.org/t/notes-on-partial-borrows/20020'>
                                Rust Internals: Notes on Partial Borrow
                            </Link>{' '}
                            article proposes a syntax similar to type parameterization. Namely, writing{' '}
                            <code>&amp;&lt;f1, mut f2&gt; t</code> means that we are borrowing field <code>f1</code> and
                            mutably borrowing field <code>f2</code> of <code>t</code>. As the Rust compiler does not
                            support syntax-transformation plugins, we expose partial borrows as a macro. When imported
                            as <code>p</code>, it allows writing the partial borrow with the same syntax as{' '}
                            <code>p!(&amp;&lt;f1, mut f2&gt; t)</code>. Let's see the code above rewritten using the{' '}
                            <code>borrow</code> crate:
                            <Code
                                className='pt-6'
                                roundedBottom={false}
                                lineClassName=''
                                src='
                                        /*@bg-code-line-highlight*/use borrow::partial as p;
                                        /*@bg-code-line-highlight*/use borrow::traits::*;

                                        /*@bg-code-line-highlight*/#[derive(borrow::Partial)]
                                        struct Ctx {
                                            scenes: Vec<Scene>,
                                            meshes: Vec<Mesh>,
                                            geometries: Vec<Geometry>,
                                            materials: Vec<Material>,
                                            // shaders: ...
                                            // buffers: ...
                                        }

                                        /*@bg-code-line-highlight*/fn render(ctx: p!(&<mut *> Graph)) {
                                            let (scenes, ctx2) = ctx.borrow_scenes();
                                            for scene in scenes {
                                                // Set up render view.
                                                scene.render(ctx2)
                                            }
                                        }

                                        impl Scene {
                                            /*@bg-code-line-highlight*/fn render(&self, ctx: p!(&<mut *, !scenes> Graph)) {
                                                let (meshes, ctx2) = ctx.borrow_meshes();
                                                for &mesh in meshes {
                                                    meshes[mesh].render(ctx2)
                                                }
                                            }
                                        }

                                        impl Mesh {
                                            /*@bg-code-line-highlight*/fn render(&self, ctx: p!(&<mut *, !scenes, !meshes> Graph)) {
                                                /*@bg-code-line-highlight*/let (geometries, ctx2) = ctx.borrow_geometries();
                                                /*@bg-code-line-highlight*/geometries[self.geometry].init(p!(&mut ctx2));
                                                /*@bg-code-line-highlight*/let (materials, ctx2) = ctx.borrow_materials();
                                                /*@bg-code-line-highlight*/materials[self.material].compile(p!(&mut ctx2));
                                                // Draw the geometry.
                                            }
                                        }

                                        impl Geometry {
                                            /*@bg-code-line-highlight*/fn init(&self, ctx: p!(&<mut buffers> Graph)) {
                                                // Initialize ctx.buffers.
                                            }
                                        }

                                        impl Material {
                                            /*@bg-code-line-highlight*/fn compile(&self, ctx: p!(&<mut buffers, mut shaders> Graph)) {
                                                // Compile required ctx.shaders.
                                                // Initialize ctx.buffers
                                                // (uniforms, vertex attribs, etc.)
                                            }
                                        }
                                    '
                            />
                            <CodeDetails summary='Struct definitions folded for brevity. Click here to expand.'>
                                <Code
                                    src='
                                            type SceneId = usize;
                                            struct Scene {
                                                meshes: Vec<MeshId>,
                                                // render view config
                                            }

                                            type MeshId = usize;
                                            struct Mesh {
                                                geometry: GeometryId,
                                                material: MaterialId
                                            }

                                            type GeometryId = usize;
                                            struct Geometry {
                                                // bufferId, ...
                                            }

                                            type MaterialId = usize;
                                            struct Material {
                                                // shaderId, ...
                                            }
                                        '
                                />
                            </CodeDetails>
                            <p className='mt-6'>
                                The key point is that the borrow requirements are encoded in the type. The compiler can
                                then accept disjoint borrows that it could not infer across function boundaries. In
                                practice, this provides three concrete benefits:
                            </p>
                            <ul className='mt-4 list-disc space-y-3 pl-6'>
                                <li>
                                    <strong>
                                        Partial <code>self</code> borrows in methods.
                                    </strong>{' '}
                                    You can invoke functions that require only specific fields of{' '}
                                    <code>&amp;mut self</code> while simultaneously accessing other fields of{' '}
                                    <code>self</code>, even when some fields are private.
                                </li>
                                <li>
                                    <strong>Improves code readability and reduces errors.</strong> Signatures become
                                    shorter because you pass one partial reference instead of many independent
                                    references. Code often stays unchanged when a struct gains new fields, because only
                                    the call sites that need those fields must be updated.
                                </li>
                                <li>
                                    <strong>Boosts performance.</strong> Passing a single partial reference is more
                                    efficient than passing many individual references. The representation is
                                    allocation-free, and in release builds the abstraction compiles down to ordinary
                                    field references.
                                </li>
                            </ul>
                            <h2 className='mt-24'>How partial borrows work under the hood.</h2>
                            <p className='mt-6'>
                                The <code>borrow</code> crate is designed to be explicit and inspectable. It generates
                                plain Rust types that mirror your struct, and it uses the type system to encode which
                                fields are accessible. For the following type:
                                <Code
                                    className='py-6'
                                    src='
                                        #[derive(borrow::Partial)]
                                        struct Ctx {
                                            scenes: Vec<Scene>,
                                            meshes: Vec<Mesh>,
                                            geometries: Vec<Geometry>,
                                            materials: Vec<Material>,
                                        }
                                    '
                                />
                                A simplified version of the generated reference view looks like:
                                <Code
                                    className='py-6'
                                    src='
                                        struct CtxRef<Scenes, Meshes, Geometries, Materials> {
                                            scenes:     Scenes,
                                            meshes:     Meshes,
                                            geometries: Geometries,
                                            materials:  Materials,
                                        }
                                    '
                                />
                                A partial borrow is then represented as <code>&amp;mut CtxRef&lt;...&gt;</code>, where
                                each type parameter is <code>&amp;T</code>, <code>&amp;mut T</code>, or{' '}
                                <code>borrow::Hidden</code>. For example:
                                <Code
                                    className='py-6'
                                    src='
                                        p!(&<scenes, mut meshes> Ctx)

                                        // Expands to:

                                        &mut CtxRef<
                                            &Vec<Scene>,    // Scenes
                                            &mut Vec<Mesh>, // Meshes
                                            borrow::Hidden, // Geometries
                                            borrow::Hidden  // Materials
                                        >
                                    '
                                />
                                In reality, the generated type includes small wrappers to support runtime diagnostics
                                for unused borrows. In release builds, those wrappers are optimized away. For the full
                                details, see the{' '}
                                <Link href='https://docs.rs/borrow/latest/borrow'>
                                    <code>borrow</code> crate docs
                                </Link>
                                .
                            </p>
                            <h2 className='mt-24'>Diagnostics and unused borrows tracking.</h2>
                            <p className='mt-6'>
                                Passing unused fields through a partial borrow is usually a mistake. Since partial
                                borrows are not part of the Rust language, the compiler and tools such as{' '}
                                <code>Clippy</code> cannot lint this directly. For that reason, the crate includes
                                runtime tracking and diagnostics that report borrowed-but-unused fields, and fields
                                borrowed mutably but only used immutably. Consider the following code:
                                <Code
                                    className='py-6'
                                    src='
                                        struct Node;
                                        struct Edge;
                                        struct Group;

                                        #[derive(borrow::Partial, Default)]
                                        #[module(crate)]
                                        struct Graph {
                                            pub nodes:  Vec<Node>,
                                            pub edges:  Vec<Edge>,
                                            pub groups: Vec<Group>,
                                        }

                                        fn main() {
                                            let mut graph = Graph::default();
                                            pass1(p!(&mut graph));
                                        }

                                        fn pass1(mut graph: p!(&<mut *> Graph)) {
                                            pass2(p!(&mut graph));
                                        }

                                        fn pass2(mut graph: p!(&<mut nodes, edges> Graph)) {
                                            let _ = &*graph.nodes;
                                        }
                                    '
                                />
                                When running it, you’ll see the following output in stderr:
                                <Code
                                    className='py-6'
                                    src='
                                        Warning [lib/src/lib.rs:19]:
                                            Borrowed but not used: edges.
                                            Borrowed as mut but used as ref: nodes.
                                            To fix the issue, use: &<nodes>.

                                        Warning [lib/src/lib.rs:15]:
                                            Borrowed but not used: groups.
                                            To fix the issue, use: &<mut edges, mut nodes>.
                                    '
                                />
                            </p>
                            <h2 className='mt-24'>Learning more.</h2>
                            <p className='mt-6'>
                                The primary reference is the{' '}
                                <Link href='https://docs.rs/borrow/latest/borrow'>
                                    <code>borrow</code> crate docs
                                </Link>
                                . For background, design discussions, and related work, see:
                            </p>
                            <ul className='mt-4 list-disc space-y-2 pl-6'>
                                <li>
                                    <Link href='https://internals.rust-lang.org/t/notes-on-partial-borrows/20020'>
                                        Rust Internals: Notes on partial borrow
                                    </Link>
                                </li>
                                <li>
                                    <Link href='https://doc.rust-lang.org/nomicon/borrow-splitting.html'>
                                        The Rustonomicon: Splitting Borrows
                                    </Link>
                                </li>
                                <li>
                                    <Link href='https://smallcultfollowing.com/babysteps/blog/2018/11/01/after-nll-interprocedural-conflicts'>
                                        Niko Matsakis: After NLL — Interprocedural conflicts
                                    </Link>
                                </li>
                                <li>
                                    <Link href='https://oribenshir.github.io/afternoon_rusting/blog/mutable-reference'>
                                        Afternoon Rusting: Multiple Mutable References
                                    </Link>
                                </li>
                                <li>
                                    <Link href='https://github.com/rust-lang/rfcs/issues/1215#issuecomment-333316998'>
                                        Partial borrows RFC discussion
                                    </Link>
                                </li>
                                <li>
                                    <Link href='https://hackmd.io/J5aGp1ptT46lqLmPVVOxzg?view'>
                                        HackMD: My thoughts on (and need for) partial borrows
                                    </Link>
                                </li>
                            </ul>
                        </Content>
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
