import * as Layout from '@/layout.tsx'
import {TeamMemberBadge} from '@/components/team_member_badge'
import * as React from 'react'
import * as CompanyLogo from '@/components/company_logo.tsx'
import * as CtaButton from '@/components/cta_button.tsx'
import * as Contact from '@/section/contact.tsx'
import * as Footer from '@/section/footer.tsx'
import * as Code from '@/components/code'
import * as Link from '@/components/link'

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

function Content({children}: {children: React.ReactNode}) {
    return <div className='mx-auto max-w-3xl'>{children}</div>
}

// =================
// === Component ===
// =================

export function Component() {
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
                        <TeamMemberBadge name='Greg Ociepka' />
                    </Content>

                    <div className='text-[15px] mt-16 leading-[1.5em]'>
                        <Content>
                            <h1 className='text-wrap'>
                                Introducing{' '}
                                <Link.Component href='https://crates.io/crates/crabtime'>crabtime</Link.Component>, a
                                novel way to write Rust macros.
                            </h1>
                            <p className='mt-6'>
                                Rust does not support dynamic code evaluation like JavaScript and has a far less
                                expressive type-level system than languages like Haskell, so certain abstractions simply
                                cannot be encoded in the type system alone. When the language cannot express a
                                transformation for us, code repetition becomes hard to avoid, and macros become the tool
                                of last resort.
                            </p>
                            <p className='mt-6'>
                                Rust offers powerful macro facilities, but they sit at two extremes. On one side,{' '}
                                <code>macro_rules!</code> is easy to start with and can be defined directly inside your
                                crate, but it is restricted both in what it can parse and in the kinds of
                                transformations it can express. On the other side, <code>procedural macros</code>{' '}
                                provide full flexibility, but require a separate definition crate and complex, low-level{' '}
                                <code>TokenStream</code> manipulation.
                            </p>
                            <p className='mt-6'>
                                <Link.Component href='https://crates.io/crates/crabtime'>Crabtime</Link.Component> is
                                our proposal for a smoother middle ground. It lets you write macro logic as ordinary
                                Rust that executes at build time, inspired by{' '}
                                <Link.Component href='https://zig.guide/language-basics/comptime'>
                                    Zig comptime
                                </Link.Component>
                                . It preserves the flexibility of proc macros while making macro definitions easier to
                                read, write, refactor, and debug. It also works directly inside your existing crate and
                                integrates cleanly with IDE expansion and <code>rustfmt</code>.
                            </p>
                            <h2>Let's see it in action.</h2>
                            To get a high-level understanding of the differences, let’s generate a small family of enums
                            and compare how each macro system handles the same task. The example is intentionally simple
                            so it is easy to understand, but even here the limitations of existing approaches become
                            visible. In real projects the transformations are far more complex, and the friction
                            introduced by these limitations becomes significantly more visible.
                            <Code.Component
                                className='py-6'
                                src='
                                    enum Position1 { X }
                                    enum Position2 { X, Y }
                                    enum Position3 { X, Y, Z }
                                    enum Position4 { X, Y, Z, W }
                                '
                            />
                            <h2>
                                Solution using{' '}
                                <Link.Component href='https://crates.io/crates/crabtime'>crabtime</Link.Component>.
                            </h2>
                            With <Link.Component href='https://crates.io/crates/crabtime'>crabtime</Link.Component>,
                            code generation looks like an ordinary Rust function. The input is parsed automatically
                            based on argument types, interpolation uses double-braces, and the output is written with a
                            clean formatting-aware syntax.
                            <Code.Component
                                className='py-6'
                                src='
                                    #[crabtime::function]
                                    #[macro_export]
                                    fn gen_positions(cons: Vec<String>) {
                                        for dim in 1 ..= cons.len() {
                                            let cons = cons[0..dim].join(",");
                                            /*@bg-code-line-highlight*/crabtime::output! {
                                                /*@bg-code-line-highlight*/enum Position{{dim}} {
                                                    /*@bg-code-line-highlight*/{{cons}}
                                                /*@bg-code-line-highlight*/}
                                            /*@bg-code-line-highlight*/}
                                        }
                                    }

                                    gen_positions!(["X", "Y", "Z", "W"]);
                                '
                            />
                            <h2>
                                Solution using <code>macro_rules</code>.
                            </h2>
                            This version works, but the ergonomics quickly degrade. The core difficulties are:
                            <ul className='mt-6 mb-2 list-disc space-y-4 pl-6'>
                                <li>
                                    <strong>Generating identifiers requires external tools.</strong>{' '}
                                    <code>macro_rules</code> cannot splice tokens into identifiers, so we rely on the{' '}
                                    <Link.Component href='https://crates.io/crates/paste'>paste</Link.Component> crate.
                                </li>

                                <li>
                                    <strong>
                                        It is not easy to count elements in <code>macro_rules</code>.
                                    </strong>{' '}
                                    To generate identifiers like <code>Position1</code>, <code>Position2</code>, and so
                                    on, the macro needs to know how many constructors the enum contains. While you can
                                    write a recursive macro that expands to a constant expression representing the
                                    count, this does not solve the real problem: the result must be passed as an already
                                    evaluated number to another macro (for example, when constructing an identifier).{' '}
                                    <code>macro_rules</code> cannot evaluate such expressions, and other macros cannot
                                    consume them as values. As a result, the only practical option is to define one
                                    branch per supported length. Even covering a modest range like <code>0</code>–
                                    <code>128</code> becomes unwieldy, and real projects typically resort to
                                    script-generated boilerplate.
                                </li>

                                <li>
                                    <strong>Passing macro results to other macros is difficult.</strong> Unlike
                                    functions, macros expand top-down, so you cannot compute a value in one macro and
                                    then feed that value directly into another macro call. For example,
                                    <code>{'paste!{ enum [<Position count!{$args}>] { ... } }'}</code> cannot work
                                    because <code>count!</code> cannot yield a number to the outer invocation. The only
                                    workaround is to design the counting macro so that it manually calls a continuation
                                    macro with the computed value embedded in its invocation. This makes both the macro
                                    definition and call-site logic significantly harder to read and maintain.
                                </li>

                                <li>
                                    <strong>Iterating over growing subsets requires reversing the list twice.</strong>{' '}
                                    Given <code>[X, Y, Z, W]</code> we want to generate <code>[X]</code>,{' '}
                                    <code>[X, Y]</code>, <code>[X, Y, Z]</code>, <code>[X, Y, Z, W]</code>. Pattern
                                    matching in <code>macro_rules</code> is greedy, so we must reverse the list, build
                                    subsets from the reversed representation, then reverse each subset again.
                                </li>

                                <li>
                                    <strong>Converting string literals to identifiers is impossible.</strong>{' '}
                                    <code>macro_rules</code> cannot turn <code>"X"</code> into an identifier, so the
                                    macro API must use <code>gen_positions!([X, Y, Z, W])</code> instead of{' '}
                                    <code>gen_positions!(["X", "Y", "Z", "W"])</code>. In many situations that becomes
                                    an API mismatch and limits usability.
                                </li>
                            </ul>
                            <Code.Component
                                className='py-6'
                                src='
                                    use paste::paste;

                                    /// A helper macro for counting the number of token-tree
                                    /// elements in a list.
                                    ///
                                    /// This macro is used when `macro_rules!` needs to pass the
                                    /// length of a list to another macro. Because `macro_rules!`
                                    /// cannot evaluate expressions or perform arbitrary
                                    /// recursion in a way that yields a concrete value, we
                                    /// enumerate the supported list lengths manually.
                                    ///
                                    /// # Arguments
                                    /// The macro takes three bracketed arguments:
                                    ///
                                    /// 1. The macro path that will be invoked once the count
                                    ///    is known.
                                    /// 2. Additional arguments that should be forwarded
                                    ///    unchanged.
                                    /// 3. The token-tree list whose length should be counted.
                                    ///
                                    /// # Behavior
                                    /// Given a list of tokens, the macro expands to:
                                    ///
                                    /// ```text
                                    /// <target_macro>! { <forwarded_args> <count> }
                                    /// ```
                                    ///
                                    /// where `<count>` is the number of tokens in the provided
                                    /// list.
                                    ///
                                    /// # Example
                                    ///
                                    /// ```rust
                                    /// count! {
                                    ///     [$crate::my_macro] // macro to call
                                    ///     [@1 foo]           // forwarded arguments
                                    ///     [a b c d]          // list to count
                                    /// }
                                    /// ```
                                    ///
                                    /// expands to:
                                    ///
                                    /// ```rust
                                    /// $crate::my_macro! { @1 foo 4 }
                                    /// ```
                                    #[macro_export]
                                    macro_rules! count {
                                        // Calling continuation macro.
                                        (@ [$($f:tt)*] [$($args:tt)*] $num:tt) => {
                                            $($f)*!{ $($args)* $num}
                                        };

                                        // Counting elements.
                                        ($f:tt $args:tt []) => {
                                            $crate::count! {@ $f $args 0 }
                                        };
                                        ($f:tt $args:tt [$t1:tt]) => {
                                            $crate::count! {@ $f $args 1 }
                                        };
                                        ($f:tt $args:tt [$t1:tt $t2:tt]) => {
                                            $crate::count! {@ $f $args 2 }
                                        };
                                        ($f:tt $args:tt [$t1:tt $t2:tt $t3:tt]) => {
                                            $crate::count! {@ $f $args 3 }
                                        };
                                        ($f:tt $args:tt [$t1:tt $t2:tt $t3:tt $t4:tt]) => {
                                            $crate::count! {@ $f $args 4 }
                                        };
                                        // ... Skipped for brevity.
                                    }

                                    #[macro_export]
                                    macro_rules! gen_positions {
                                        // Remove commas.
                                        // Input `gen_positions!{[X, Y, Z, W]}` expands to:
                                        // ```
                                        // $crate::gen_positions!{@1 [X Y Z W] []}
                                        // ```
                                        ([$($ts:tt),* $(,)?]) => {
                                            $crate::gen_positions!{@1 [$($ts)*] []}
                                        };

                                        // Reverse the array.
                                        // For above input, it expands to:
                                        // ```
                                        // $crate::gen_positions!{@2 [W Z Y X]}
                                        // ```
                                        (@1 [$t:tt $($ts:tt)*] [$($rev:tt)*]) => {
                                            $crate::gen_positions!{@1 [$($ts)*] [$t $($rev)*]}
                                        };
                                        (@1 [] $rev:tt) => {
                                            $crate::gen_positions!{@2 $rev}
                                        };

                                        // Take sub-slices.
                                        // For above input, it expands to:
                                        // ```
                                        // $crate::gen_positions!{@3 [W Z Y X]}
                                        // $crate::gen_positions!{@3 [Z Y X]}
                                        // $crate::gen_positions!{@3 [Y X]}
                                        // $crate::gen_positions!{@3 [X]}
                                        // ```
                                        (@2 []) => {};
                                        (@2 [$t:tt $($ts:tt)*]) => {
                                            $crate::gen_positions!{@3 [$t $($ts)*] []}
                                            $crate::gen_positions!{@2 [$($ts)*]}
                                        };

                                        // Reverse again.
                                        // For above input, it expands to:
                                        // ```
                                        // $crate::gen_positions!{@4 [X Y Z W] 4}
                                        // $crate::gen_positions!{@4 [X Y Z] 3}
                                        // $crate::gen_positions!{@4 [X Y] 2}
                                        // $crate::gen_positions!{@4 [X] 1}
                                        // ```
                                        (@3 [$t:tt $($ts:tt)*] [$($rev:tt)*]) => {
                                            $crate::gen_positions!{@3 [$($ts)*] [$t $($rev)*]}
                                        };
                                        (@3 [] $rev:tt) => {
                                            $crate::count!{[$crate::gen_positions] [@4 $rev] $rev}
                                        };

                                        // Generate enums.
                                        // For above input, it expands to:
                                        // ```
                                        // enum Position4 { X, Y, Z, W }
                                        // enum Position3 { X, Y, Z }
                                        // enum Position2 { X, Y }
                                        // enum Position1 { X }
                                        // ```
                                        (@4 [$($ts:tt)*] $count:tt) => {
                                            paste! {
                                                enum [<Position $count>] {
                                                    $($ts),*
                                                }
                                            }
                                        };
                                    }

                                    gen_positions!{[X, Y, Z, W]}

                                '
                            />
                            <h2>
                                Solution using <code>proc macros</code>.
                            </h2>
                            Procedural macros solve all the limitations above, but they introduce their own costs:
                            <ul className='mt-6 list-disc space-y-2 pl-6'>
                                <li>
                                    <strong>They must live in a separate crate.</strong> This increases project
                                    complexity and slows down iteration.
                                </li>
                                <li>
                                    <strong>You must work directly with the AST.</strong> Even simple macros require
                                    verbose <code>TokenStream</code> manipulation, making the code longer and harder to
                                    read.
                                </li>
                            </ul>
                            <br />
                            Because procedural macros must be defined in a separate crate, we first need to split the
                            project into two crates: one for the library logic and one for the macro itself. A common
                            layout is to place the library code under <code>{'<root>/lib'}</code> and the procedural
                            macro under <code>{'<root>/macro'}</code>. To allow Cargo to build them together, we start
                            by defining a workspace:
                            <Code.Component
                                className='py-6'
                                src='
                                    // <root>/Cargo.toml

                                    [workspace]
                                    resolver = "2"
                                    members = [
                                        "lib",
                                        "macro"
                                    ]
                                '
                            />
                            Next, we configure the macro crate. Procedural macros must be compiled as a{' '}
                            <code>proc-macro</code>
                            library and must depend on <code>syn</code>, <code>quote</code>, and{' '}
                            <code>proc-macro2</code>
                            for parsing and code generation:
                            <Code.Component
                                className='py-6'
                                src='
                                    // <root>/macro/Cargo.toml

                                    [package]
                                    name = "my-lib-macro"
                                    version = "1.0.0"
                                    edition = "2021"

                                    [lib]
                                    proc-macro = true

                                    [dependencies]
                                    syn = { version = "2", features = ["full"] }
                                    quote = { version = "1" }
                                    proc-macro2 = { version = "1" }

                                    [lints]
                                    workspace = true
                                '
                            />
                            With the macro crate configured, we can implement the procedural macro itself. The example
                            below parses an input array like <code>["X", "Y", "Z", "W"]</code>, converts the literals
                            into identifiers, and expands them into a family of enums. This version keeps the parser
                            explicit for clarity, but real macros often include substantially more boilerplate:
                            <Code.Component
                                className='py-6'
                                src='
                                    // <root>/macro/src/lib.rs

                                    use proc_macro::TokenStream;
                                    use quote::quote;

                                    struct Args {
                                        items: Vec<String>,
                                    }

                                    impl syn::parse::Parse for Args {
                                        fn parse(input: syn::parse::ParseStream) -> syn::Result<Self> {
                                            // Parse an expression, expecting: ["X", "Y", "Z"], etc.
                                            let expr: syn::Expr = input.parse()?;

                                            // Parse array.
                                            let arr = match expr {
                                                syn::Expr::Array(arr) => arr,
                                                other => {
                                                    return Err(syn::Error::new_spanned(
                                                        other,
                                                        "Expected an array of literals",
                                                    ));
                                                }
                                            };

                                            // Parse items as literals.
                                            let mut items = Vec::new();
                                            for elem in arr.elems {
                                                match elem {
                                                    syn::Expr::Lit(lit) => {
                                                        if let syn::Lit::Str(s) = lit.lit {
                                                            items.push(s.value());
                                                        } else {
                                                            return Err(syn::Error::new_spanned(
                                                                lit,
                                                                "Expected string literal",
                                                            ));
                                                        }
                                                    }
                                                    other => {
                                                        return Err(syn::Error::new_spanned(
                                                            other,
                                                            "Expected string literal",
                                                        ));
                                                    }
                                                }
                                            }

                                            Ok(Self { items })
                                        }
                                    }

                                    #[proc_macro]
                                    pub fn gen_positions(input: TokenStream) -> TokenStream {
                                        let Args { items } = syn::parse::<Args>(input)
                                            .expect("Expected syntax: gen_positions!( [\"A\", ...\"] )");

                                        let mut out = Vec::new();

                                        for (i, _) in items.iter().enumerate() {
                                            let dim = i + 1;
                                            let comps = &items[..dim];

                                            let enum_ident = syn::Ident::new(
                                                &format!("Position{dim}"),
                                                proc_macro2::Span::call_site()
                                            );

                                            let comps_idents = comps.iter().map(|s| {
                                                syn::Ident::new(s, proc_macro2::Span::call_site())
                                            });

                                            out.push(quote! {
                                                enum #enum_ident {
                                                    #(#comps_idents),*
                                                }
                                            });
                                        }

                                        quote! { #(#out)* }.into()
                                    }
                                '
                            />
                            In order to use this macro inside the main library crate, we add a dependency on the macro
                            crate:
                            <Code.Component
                                className='py-6'
                                src='
                                    // <root>/lib/Cargo.toml

                                    // ...

                                    [dependencies]
                                    my_lib_macro = { path = "../macro" }

                                    // ...
                                '
                            />
                            Finally, the macro can be invoked inside the library code:
                            <Code.Component
                                className='pt-6'
                                src='
                                    // <root>/lib/src/lib.rs

                                    use my_lib_macro::gen_positions;

                                    gen_positions!(["X", "Y", "Z", "W"]);
                                '
                            />
                            <h2>What should be the future of macros in Rust?</h2>
                            We see <Link.Component href='https://crates.io/crates/crabtime'>crabtime</Link.Component> as
                            an early step toward more accessible metaprogramming in Rust. Macros should be readable like
                            ordinary Rust, fast to iterate on, and straightforward to debug. Complex{' '}
                            <code>TokenStream</code> manipulation should not be required for everyday code generation
                            tasks. We've built{' '}
                            <Link.Component href='https://crates.io/crates/crabtime'>crabtime</Link.Component> with
                            these principles in mind:
                            <ul className='mt-6 list-disc space-y-2 pl-6'>
                                <li>
                                    <strong>Macros should look and feel like Rust.</strong> Control flow, variables, and
                                    helper functions are often clearer than nested pattern matches or AST construction.
                                </li>
                                <li>
                                    <strong>Iteration speed matters.</strong> Good IDE expansion and rustfmt integration
                                    reduce friction and improve code reviews.
                                </li>
                                <li>
                                    <strong>Debugging should be simple.</strong> Printing and logging during macro
                                    execution should work without turning your macro into a mini compiler.
                                </li>
                            </ul>
                            <h2>How crabtime compares to existing macro systems?</h2>
                            <p className='mt-6'>
                                <Link.Component href='https://crates.io/crates/crabtime'>Crabtime</Link.Component>{' '}
                                accepts input as <code>TokenStreams</code>, macro fragments, or Rust-friendly argument
                                types. It can output TokenStreams or formatted Rust code, integrates with rustfmt, and
                                works with IDE type hints where supported.
                            </p>
                            <div className='mt-8 w-full flex justify-center'>
                                <div className='max-w-screen-3xl grow overflow-scroll'>
                                    <table className='w-full text-sm border-collapse bg-black/5 p-4 rounded-2xl'>
                                        <thead className='bg-muted'>
                                            <tr>
                                                <th className='text-left p-3'>Capability</th>
                                                <th className='text-left p-3'>Crabtime</th>
                                                <th className='text-left p-3'>Proc macro</th>
                                                <th className='text-left p-3'>
                                                    <code>macro_rules!</code>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className='p-3'>Advanced transformations</td>
                                                <td className='p-3'>✅</td>
                                                <td className='p-3'>✅</td>
                                                <td className='p-3'>❌</td>
                                            </tr>
                                            <tr>
                                                <td className='p-3'>Space-aware interpolation</td>
                                                <td className='p-3'>✅</td>
                                                <td className='p-3'>❌</td>
                                                <td className='p-3'>❌</td>
                                            </tr>
                                            <tr>
                                                <td className='p-3'>Works with rustfmt</td>
                                                <td className='p-3'>✅</td>
                                                <td className='p-3'>✅</td>
                                                <td className='p-3'>❌</td>
                                            </tr>
                                            <tr>
                                                <td className='p-3'>Easy to define (same crate)</td>
                                                <td className='p-3'>✅</td>
                                                <td className='p-3'>❌</td>
                                                <td className='p-3'>✅</td>
                                            </tr>
                                            <tr>
                                                <td className='p-3'>
                                                    <Link.Component href='https://lukaswirth.dev/tlborm/decl-macros/minutiae/hygiene.html'>
                                                        Hygienic
                                                    </Link.Component>
                                                </td>
                                                <td className='p-3'>no</td>
                                                <td className='p-3'>no</td>
                                                <td className='p-3'>yes</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <p className='mt-6'>
                                For the full feature matrix and the complete specification, see{' '}
                                <Link.Component href='https://docs.rs/crabtime/latest/crabtime'>
                                    crabtime documentation on docs.rs
                                </Link.Component>
                                .
                            </p>
                            <h2>Learn more.</h2>
                            <p className='mt-6'>
                                This post covers only the basic usage and comparison. For the full set of features,
                                including <code>TokenStream</code> support, performance analysis, logging utilities,
                                Cargo configuration, caching behavior, path helpers, and IDE troubleshooting, see{' '}
                                <Link.Component href='https://docs.rs/crabtime/latest/crabtime'>
                                    the official documentation
                                </Link.Component>
                                . Additional resources you may find useful:
                            </p>
                            <ul className='mt-4 list-disc space-y-2 pl-6'>
                                <li>
                                    <Link.Component href='https://docs.rs/crabtime/latest/crabtime'>
                                        Crabtime on docs.rs
                                    </Link.Component>
                                </li>
                                <li>
                                    <Link.Component href='https://github.com/wdanilo/crabtime'>
                                        Crabtime on GitHub
                                    </Link.Component>
                                </li>
                                <li>
                                    <Link.Component href='https://crates.io/crates/crabtime'>
                                        Crabtime on crates.io
                                    </Link.Component>
                                </li>
                                <li>
                                    <Link.Component href='https://zig.guide/language-basics/comptime'>
                                        Zig comptime
                                    </Link.Component>
                                </li>
                                <li>
                                    <Link.Component href='https://doc.rust-lang.org/reference/macros-by-example.html'>
                                        Rust Reference: macros by example
                                    </Link.Component>
                                </li>
                                <li>
                                    <Link.Component href='https://doc.rust-lang.org/reference/procedural-macros.html'>
                                        Rust Reference: procedural macros
                                    </Link.Component>
                                </li>
                            </ul>
                        </Content>
                    </div>
                </div>
            </div>

            <CtaButton.Component />
            <Contact.Component />
            <Footer.Component />
        </div>
    )
}
