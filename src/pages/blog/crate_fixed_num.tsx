import * as Layout from '@/layout.tsx'
import {TeamMemberBadge} from '@/components/team_member_badge'
import * as React from 'react'
import * as CompanyLogo from '@/components/company_logo.tsx'
import * as CtaButton from '@/components/cta_button.tsx'
import * as Contact from '@/section/contact.tsx'
import * as Footer from '@/section/footer.tsx'
import * as Code from '@/components/code'
import * as ArrayOps from '@/array'
import * as Html from '@/html'
import * as Link from '@/components/link'

// ==============
// === Header ===
// ==============

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

// ======================
// === BenchmarkTable ===
// ======================

function BenchmarkTable() {
    function values(...vals: (number | null)[]) {
        const valsNonNull = vals.filter(val => val !== null)
        const max = Math.max(...valsNonNull.slice(1))
        const normalized = vals.map(t => (t == null ? 0 : Math.min(1, t / max)))
        function fmt(n: number): string {
            if (n >= 100) {
                return n.toFixed(0)
            } else if (n >= 10) {
                return n.toFixed(1)
            } else {
                return n.toFixed(2)
            }
        }
        return (
            <>
                {ArrayOps.zip(vals, normalized).map(([v, n], ix) => (
                    <td
                        key={ix}
                        style={{
                            backgroundColor: `color-mix(in lch, var(--color-100) ${Math.round(n * 100)}%, var(--color-0))`,
                        }}
                    >
                        {v == null ? '⚠️' : fmt(v)}
                    </td>
                ))}
            </>
        )
    }
    return (
        <table
            className='benchmark-table'
            style={
                {
                    '--color-100': '#9edf05',
                    '--color-0': '#ff3d18',
                } as Html.CSSProperties
            }
        >
            <colgroup>
                {/*<col style={{width: '150px'}} />*/}
                {/*<col style={{width: '60px'}} />*/}
                {/*<col style={{width: '60px'}} />*/}
                {/*<col style={{width: '60px'}} />*/}
                {/*<col style={{width: '60px'}} />*/}
                {/*<col style={{width: '60px'}} />*/}
                {/*<col style={{width: '60px'}} />*/}
                {/*<col style={{width: '60px'}} />*/}
            </colgroup>
            <thead>
                <tr>
                    <th></th>
                    <th className='bench-th-vertical'>
                        <span>f64</span>
                    </th>
                    <th className='bench-th-vertical'>
                        <span>fixed_num</span>
                    </th>
                    <th className='bench-th-vertical'>
                        <span>rust_decimal</span>
                    </th>
                    <th className='bench-th-vertical'>
                        <span>bigdecimal</span>
                    </th>
                    <th className='bench-th-vertical'>
                        <span>decimal</span>
                    </th>
                    <th className='bench-th-vertical'>
                        <span>decimal_rs</span>
                    </th>
                    <th className='bench-th-vertical'>
                        <span>fastnum</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>eq</td>
                    {values(0.82, 1.0, 0.1, 0.01, 0.02, 0.15, 0.09)}
                </tr>
                <tr>
                    <td>ord</td>
                    {values(1.48, 1.0, 0.12, 0.02, 0.02, 0.2, 0.09)}
                </tr>
                <tr>
                    <td>signum</td>
                    {values(1.4, 1.0, 0.39, 0.03, null, null, 0.5)}
                </tr>
                <tr>
                    <td>neg</td>
                    {values(1.59, 1.0, 0.83, 0.03, 0.05, 0.66, 1.1)}
                </tr>
                <tr>
                    <td>abs</td>
                    {values(2.01, 1.0, 1.1, 0.03, 0.06, 0.82, 0.98)}
                </tr>
                <tr>
                    <td>rem</td>
                    {values(0.42, 1.0, 0.67, 0.04, 0.02, 0.74, 0.24)}
                </tr>
                <tr>
                    <td>add</td>
                    {values(1.24, 1.0, 0.05, 0.0, 0.01, 0.02, 0.02)}
                </tr>
                <tr>
                    <td>sub</td>
                    {values(1.19, 1.0, 0.05, 0.0, 0.01, 0.02, 0.02)}
                </tr>
                <tr>
                    <td>mul_fxf</td>
                    {values(63.3, 1.0, 1.07, 0.29, 0.44, 0.28, 0.31)}
                </tr>
                <tr>
                    <td>mul_fxi</td>
                    {values(15.72, 1.0, 1.32, 0.08, 0.12, 0.24, 0.34)}
                </tr>
                <tr>
                    <td>mul_ixi</td>
                    {values(15.94, 1.0, 2.71, 0.09, 0.17, 2.76, 0.34)}
                </tr>
                <tr>
                    <td>div</td>
                    {values(61.03, 1.0, 0.93, 0.01, 0.19, 0.2, 0.04)}
                </tr>
                <tr>
                    <td>checked_add</td>
                    {values(1.05, 1.0, 0.05, 0.0, null, 0.02, null)}
                </tr>
                <tr>
                    <td>checked_sub</td>
                    {values(1.01, 1.0, 0.05, 0.0, null, 0.02, null)}
                </tr>
                <tr>
                    <td>checked_mul_fxf</td>
                    {values(51.52, 1.0, 1.15, 0.3, null, 0.28, null)}
                </tr>
                <tr>
                    <td>checked_mul_fxi</td>
                    {values(14.29, 1.0, 2.46, 0.08, null, 0.27, null)}
                </tr>
                <tr>
                    <td>checked_mul_ixi</td>
                    {values(14.25, 1.0, 3.69, 0.1, null, 3.15, null)}
                </tr>
                <tr>
                    <td>checked_div</td>
                    {values(46.74, 1.0, 1.42, 0.01, null, 0.24, null)}
                </tr>
                <tr>
                    <td>trunc</td>
                    {values(19.19, 1.0, 0.43, null, null, 1.54, null)}
                </tr>
                <tr>
                    <td>floor</td>
                    {values(23.4, 1.0, 0.29, null, null, 1.67, 0.14)}
                </tr>
                <tr>
                    <td>ceil</td>
                    {values(23.2, 1.0, 0.28, null, null, 1.57, 0.13)}
                </tr>
                <tr>
                    <td>round</td>
                    {values(60.69, 1.0, 0.16, null, null, 4.26, 1.19)}
                </tr>
                <tr>
                    <td>powi</td>
                    {values(3260.83, 1.0, 0.59, null, 0.21, 0.36, 0.99)}
                </tr>
                <tr>
                    <td>sqrt</td>
                    {values(245.36, 1.0, 0.05, 0.05, null, 0.03, 0.0)}
                </tr>
                <tr>
                    <td>ln</td>
                    {values(361.46, 1.0, 0.14, null, 0.01, 0.18, null)}
                </tr>
                <tr>
                    <td>log10_floor</td>
                    {values(0.75, 1.0, 0.0, null, 0.0, null, 0.0)}
                </tr>
                <tr>
                    <td>rolling_window</td>
                    {values(15.51, 1.0, 0.46, 0.1, null, 0.18, 0.38)}
                </tr>
            </tbody>
        </table>
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
            <Header />

            <div className='px-6 lg:px-8 py-20'>
                <div className='flex flex-col relative'>
                    <Content>
                        <TeamMemberBadge name='Wojciech Danilo' />
                    </Content>

                    <div className='text-[15px] mt-16 leading-[1.5em]'>
                        <Content>
                            <h1 className='text-wrap'>
                                Introducing <code>fixed_num</code>, financial focused decimal for Rust.
                            </h1>

                            <h3 className='mt-6 text-xl/8'>
                                When software handles money, every fraction of a cent matters. Even tiny rounding errors
                                can add up to big problems. <code>fixed_num</code> is a Rust crate that focuses on one
                                thing: precise, fast, deterministic decimal arithmetic for finance and trading.
                            </h3>

                            <h2>Introduction.</h2>

                            <p>
                                <strong>Before we talk about decimals, let’s talk about numbers.</strong> A surprising
                                amount of financial bugs come from choosing the wrong numeric representation. Even
                                experienced engineers sometimes blur the boundaries between three distinct families of
                                numeric types: <em>floating-point</em>, <em>fixed-point</em>, and{' '}
                                <em>arbitrary-precision</em>. This post summarizes the trade-offs of each approach and
                                offers practical guidance for choosing the right one when building finance-focused
                                systems in Rust.
                            </p>

                            <h2>Understanding floating-point numbers.</h2>

                            <blockquote className='mt-6 border-l-4 border-neutral-700 pl-4 italic'>
                                Floating-point arithmetic is considered an esoteric subject by many people.
                                <div className='mt-2 not-italic text-sm opacity-80'>— David Goldberg</div>
                            </blockquote>

                            <p className='mt-6'>
                                We’ll start with <code>f32</code> because it’s easy to visualize. Rust’s{' '}
                                <code>f32</code> implements{' '}
                                <Link.Component href='https://en.wikipedia.org/wiki/IEEE_754'>IEEE 754</Link.Component>{' '}
                                binary floating-point, which uses{' '}
                                <span className='rounded-sm py-0.5 px-1.5 text-white bg-[#666666]'>
                                    1 bit for the sign
                                </span>
                                ,{' '}
                                <span className='rounded-sm py-0.5 px-1.5 text-white bg-[#F59822]'>
                                    8 bits for the exponent
                                </span>
                                ,{' '}
                                <span className='rounded-sm py-0.5 px-1.5 text-white bg-[#F04832]'>
                                    23 bits for the mantissa
                                </span>
                                .
                            </p>

                            <img
                                className='py-12'
                                src='/blog/fixed_num/float_repr_1.svg'
                            />

                            <p>
                                While this is the standard explanation, it doesn’t build intuition for the limitations
                                that matter in finance. For that, we’ll use a more intuitive mental model proposed by
                                Fabien Sanglard in his{' '}
                                <Link.Component href='https://fabiensanglard.net/floating_point_visually_explained'>
                                    Floating Point Visually Explained
                                </Link.Component>{' '}
                                post. Think of the exponent as selecting a{' '}
                                <span className=' rounded-sm py-0.5 px-1.5 text-white bg-[#F59822]'>
                                    window between two consecutive powers of two
                                </span>{' '}
                                (e.g. between <code>4</code> and <code>8</code>), and the mantissa as an{' '}
                                <span className=' rounded-sm py-0.5 px-1.5 text-white bg-[#F04832]'>
                                    offset within that window
                                </span>
                                , chosen from{' '}
                                <code>
                                    2<sup>23</sup> = 8,388,608
                                </code>{' '}
                                discrete buckets.
                                <img
                                    className='py-12'
                                    src='/blog/fixed_num/float_repr_2.svg'
                                />
                            </p>

                            <p>
                                This model explains precision in concrete terms. The{' '}
                                <span className=' rounded-sm py-0.5 px-1.5 text-white bg-[#F59822]'>window width</span>{' '}
                                grows as the exponent increases, but the number of{' '}
                                <span className=' rounded-sm py-0.5 px-1.5 text-white bg-[#F04832]'>buckets</span> is
                                fixed within that window. Therefore the spacing between representable values grows with
                                magnitude. For example, in the window <code>[1, 2]</code>, the step size is{' '}
                                <code>
                                    (2 - 1) / 2<sup>23</sup> = 0.00000011920929
                                </code>
                                , while in the window <code>[2048, 4096]</code> the step size becomes{' '}
                                <code>
                                    (4096 - 2048) / 2<sup>23</sup> ≈ 0.0002
                                </code>
                                . In other words, at that scale, increments smaller than <code>0.0002</code> cannot be
                                represented at all.
                            </p>

                            <p className='mt-6'>
                                In practice, this leads to two failure modes that are especially painful in financial
                                systems:
                            </p>

                            <ul className='mt-4 list-disc space-y-2 pl-6'>
                                <li>
                                    <strong>Magnitude-dependent resolution.</strong> The spacing between adjacent floats
                                    increases as values get larger. At sufficiently high magnitude, adding a smallest
                                    unit (e.g., <code>$0.01</code> or <code>1 wei</code>) can be rounded away because it
                                    is smaller than the current spacing. This breaks core finance invariants like “cents
                                    always count” or “every wei is representable.”
                                </li>
                                <li>
                                    <strong>Decimal representation error.</strong> Many decimal fractions used in
                                    finance (<code>0.1</code>, <code>0.01</code>, <code>0.2</code>, <code>…</code>) are
                                    repeating values in binary, so floats store the nearest representable binary
                                    fraction. This is the root cause behind results like <code>0.1 + 0.2</code> not
                                    being exactly <code>0.3</code>. The initial error may be small, but it becomes
                                    observable when values are aggregated, rounded repeatedly, or compared to
                                    thresholds.
                                </li>
                            </ul>

                            <h2>Are arbitrary-precision numbers the solution?</h2>

                            <p>
                                Arbitrary-precision numbers represent values using a dynamically sized representation
                                rather than a fixed-width machine type. Instead of being limited to a fixed set of bits
                                such as 64 or 128, the number grows to as many digits as required by the computation.
                                This can be valuable in finance for reference calculations, exact conversions, and
                                scenarios where scale cannot be fixed up front. The trade-off is performance. Arithmetic
                                becomes substantially more expensive because the implementation operates on
                                variable-length numbers, frequently involving heap allocations and multi-limb
                                arithmetic. In hot loops, this overhead can dominate runtime.
                            </p>

                            <p className='mt-6'>
                                In Rust, two widely used approaches are represented by <code>BigDecimal</code> style
                                decimals and <code>Malachite</code> style rationals. They solve precision and exactness
                                differently and make different implementation choices.
                            </p>

                            <p className='mt-6'>
                                <strong>BigDecimal</strong> models a decimal as an arbitrary-precision integer plus a
                                base-10 scale. <strong>Malachite</strong> offers a different primitive. It represents
                                values as exact rational numbers with a numerator and denominator, and uses a
                                small-value optimization for naturals.
                            </p>

                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-1 py-8'>
                                <Code.Component
                                    src='
                                        // BigDecimal implementation.

                                        struct BigDecimal {
                                            int_val: BigInt,
                                            scale: i64,
                                        }
                                        
                                        struct BigInt {
                                            sign: Sign,
                                            data: BigUint,
                                        }
                                        
                                        struct BigUint {
                                            data: Vec<BigDigit>,
                                        }
                                        
                                        type BigDigit = u32;
                                    '
                                />

                                <Code.Component
                                    src='
                                        // Malachite implementation.

                                        struct Rational {
                                            sign: bool,
                                            numerator: Natural,
                                            denominator: Natural,
                                        }
                                        
                                        enum Natural {
                                            Small(Limb),
                                            Large(Vec<Limb>),
                                        }
                                        
                                        type Limb = u64;
                                    '
                                />
                            </div>

                            <p>
                                These representation choices have clear implications for division. In base 10, many
                                quotients have non-terminating decimal expansions such as 1 divided by 3. With{' '}
                                <code>BigDecimal</code>, producing a decimal result for such a quotient requires
                                selecting a target precision and a rounding policy, because there is no finite decimal
                                representation to return. With <code>Malachite</code> rationals, the exact quotient can
                                be retained as a fraction and only rounded when explicitly converted to a decimal. This
                                makes rationals a strong tool for reference math and for delaying rounding decisions
                                until domain rules are applied.
                            </p>

                            <p className='mt-6'>
                                The primary trade-off for both families is performance. Their core storage is dynamic,
                                typically backed by vectors of limbs. This implies allocations, data movement, and
                                arithmetic whose cost scales with the number of limbs. In practice, this difference is
                                large. For hot-loop computations such as technical indicators and signal pipelines, it
                                is common to see slowdowns on the order of <strong>1000×</strong> when using
                                arbitrary-precision types compared to <code>fixed_num</code>. A computation that is
                                comfortably real-time with <code>fixed_num</code> can become a throughput bottleneck
                                with arbitrary-precision arithmetic.
                            </p>

                            <p className='mt-6'>
                                This makes arbitrary-precision types a strong fit for specific roles and a poor fit for
                                others. They are excellent as a correctness oracle during development, for
                                cross-checking algorithms, and for offline reporting or reconciliation layers where
                                latency and throughput are not the primary constraints. In performance-sensitive systems
                                such as trading engines, backtesting at scale, and latency-critical analytics, their
                                allocation and digit-scaling costs are usually incompatible with the required
                                throughput. In <code>fixed_num</code>, we use arbitrary-precision types in automated
                                tests to validate correctness across large input spaces, while keeping the production
                                representation allocation-free and deterministic.
                            </p>

                            <h2>
                                The correct solution, <code>fixed_num</code>.
                            </h2>

                            <p>
                                Fixed-point decimals represent fractional values by storing an integer together with an
                                implicit, fixed number of fractional digits. The scale is part of the type, so every
                                value uses the same decimal layout and every operation preserves that layout.
                            </p>

                            <p className='mt-6'>
                                <code>fixed_num</code> implements this approach with <code>Dec19x19</code>. Values are
                                stored as an <code>i128</code> where the last 19 decimal digits are interpreted as the
                                fractional part. This leaves another 19 digits for the integer part, so the type
                                provides exactly 19 digits before the decimal point and exactly 19 digits after it,
                                making the range of representable values
                                <code>{`± 9_999_999_999_999_999_999 . 999_999_999_999_999_999_9`}</code>
                            </p>

                            <p className='mt-6'>
                                This is aligned with how financial systems and blockchain protocols specify amounts. For
                                example, Ethereum defines Ether in wei and{' '}
                                <Link.Component href='https://docs.soliditylang.org/en/latest/units-and-global-variables.html#ether-units'>
                                    specifies that one ether equals 10<sup>18</sup> wei
                                </Link.Component>
                                . A fixed-point decimal type can represent these smallest units exactly and carry them
                                through arithmetic without introducing representation artifacts.
                            </p>

                            <p className='mt-6'>
                                The simplicity of the representation is intentional. <code>Dec19x19</code> is a
                                transparent wrapper around <code>i128</code>. That makes it easy to audit, easy for the
                                compiler to optimize, and free of dynamic allocation. When values exceed the
                                representable range, <code>Dec19x19</code> provides explicit <code>checked_*</code> and{' '}
                                <code>saturating_*</code> variants so that overflow behavior is explicit and testable.
                            </p>

                            <Code.Component
                                className='py-8'
                                src='
                                    // fixed_num implementation

                                    #[repr(transparent)]
                                    struct Dec19x19 {
                                        repr: i128,
                                    }
                                '
                            />
                            <h4>
                                Compared to <code>fixed_num</code>, binary floating-point violates decimal invariants.
                            </h4>
                            <p className='mt-2'>
                                Binary floating-point is a different number system than the base-10, fixed-scale
                                quantities used in finance and crypto. IEEE 754 floats are binary floating-point,
                                including nightly <code>f128</code>. Many decimals that are fundamental in these domains
                                such as 0.1, 0.01, and 10<sup>-18</sup> do not have finite binary representations, so
                                they are stored as the nearest binary fraction. That approximation becomes part of the
                                computation. In long pipelines, especially those used in technical indicators, the
                                approximation error is repeatedly combined through multiplication, division,
                                normalization, and rolling aggregation. The resulting drift is difficult to reason about
                                and difficult to audit, and it can become observable in threshold triggers, crossover
                                logic, and reproducibility across runs. A fixed-point decimal representation eliminates
                                this class of representation error within the supported range.
                            </p>

                            <h4 className='mt-8'>
                                Compared to <code>fixed_num</code>, arbitrary precision is computationally expensive at
                                scale.
                            </h4>
                            <p className='mt-2'>
                                Arbitrary-precision types represent numbers with dynamically sized limbs. This implies
                                heap allocation, data movement, and arithmetic cost that scales with operand size. In
                                trading engines and indicator evaluation over large histories, the numeric layer runs in
                                the hot path, and this cost is often prohibitive. Replacing an allocation-free
                                fixed-point type with arbitrary-precision arithmetic can reduce throughput by orders of
                                magnitude, which is incompatible with real-time signal pipelines and low-latency
                                services. For this reason, <code>fixed_num</code> uses arbitrary-precision types as a
                                reference in automated correctness tests and fuzzing, while <code>Dec19x19</code>{' '}
                                remains the production representation.
                            </p>

                            <h2>Comparison to other Rust decimal libraries.</h2>

                            <p>
                                To understand how <code>fixed_num</code> differs from other numeric libraries in Rust,
                                the table below compares their implementation-level characteristics — internal
                                representation, precision model, and determinism. The focus here is on structure and
                                behavior, not benchmarks or API design.
                            </p>
                        </Content>

                        <div className='mt-8 w-full flex justify-center'>
                            <div className='max-w-screen-3xl grow overflow-scroll'>
                                <table className='w-full text-sm border-collapse bg-black/5 p-4 rounded-2xl'>
                                    <colgroup>
                                        <col style={{width: '11%'}} />
                                        <col style={{width: '11%'}} />
                                        <col style={{width: '11%'}} />
                                        <col style={{width: '11%'}} />
                                        <col style={{width: '11%'}} />
                                        <col style={{width: '11%'}} />
                                        <col style={{width: '11%'}} />
                                        <col style={{width: '11%'}} />
                                        <col style={{width: '11%'}} />
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th className='py-2 pr-4'></th>
                                            <th className='py-2 pr-4'>fixed_num</th>
                                            <th className='py-2 pr-4'>rust_decimal</th>
                                            <th className='py-2 pr-4'>bigdecimal</th>
                                            <th className='py-2 pr-4'>decimal</th>
                                            <th className='py-2 pr-4'>decimal_rs</th>
                                            <th className='py-2 pr-4'>fixed</th>
                                            <th className='py-2 pr-4'>fastnum</th>
                                            <th className='py-2 pr-4'>malachite</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>100% Rust</td>
                                            <td>✅</td>
                                            <td>✅</td>
                                            <td>✅</td>
                                            <td>❌</td>
                                            <td>✅</td>
                                            <td>✅</td>
                                            <td>✅</td>
                                            <td>✅</td>
                                        </tr>
                                        <tr>
                                            <td>Size (bits)</td>
                                            <td>128</td>
                                            <td>128</td>
                                            <td>Dynamic</td>
                                            <td>128</td>
                                            <td>160</td>
                                            <td>Config</td>
                                            <td>64/128/256/...</td>
                                            <td>Dynamic</td>
                                        </tr>
                                        <tr>
                                            <td>Underlying representation</td>
                                            <td>
                                                <code>i128</code>
                                            </td>
                                            <td>
                                                4x<code>u32</code>
                                            </td>
                                            <td>
                                                <code>Vec&lt;u64&gt;</code>
                                            </td>
                                            <td>
                                                <code>[u8;16]</code>
                                            </td>
                                            <td>
                                                <code>(u128, i16, bool, u8)</code>
                                            </td>
                                            <td>Config</td>
                                            <td>Config</td>
                                            <td>
                                                <code>Vec&lt;u64&gt;</code>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Arbitrary precision</td>
                                            <td>❌</td>
                                            <td>❌</td>
                                            <td>✅</td>
                                            <td>❌</td>
                                            <td>❌</td>
                                            <td>❌</td>
                                            <td>❌</td>
                                            <td>✅</td>
                                        </tr>
                                        <tr>
                                            <td>Strict fixed decimal scale</td>
                                            <td>✅</td>
                                            <td>❌</td>
                                            <td>✅</td>
                                            <td>❌</td>
                                            <td>❌</td>
                                            <td>❌</td>
                                            <td>❌</td>
                                            <td>✅</td>
                                        </tr>
                                        <tr>
                                            <td>Precision</td>
                                            <td>38 digits (19 int + 19 frac)</td>
                                            <td>28 digits</td>
                                            <td>Arbitrary</td>
                                            <td>34 digits (IEEE)</td>
                                            <td>38 digits</td>
                                            <td>Config</td>
                                            <td>Config</td>
                                            <td>Arbitrary</td>
                                        </tr>
                                        <tr>
                                            <td>Copyable</td>
                                            <td>✅</td>
                                            <td>✅</td>
                                            <td>❌</td>
                                            <td>✅</td>
                                            <td>✅</td>
                                            <td>✅</td>
                                            <td>✅</td>
                                            <td>❌</td>
                                        </tr>
                                        <tr>
                                            <td>Constexpr</td>
                                            <td>✅</td>
                                            <td>❌</td>
                                            <td>❌</td>
                                            <td>❌</td>
                                            <td>❌</td>
                                            <td>❌</td>
                                            <td>✅</td>
                                            <td>❌</td>
                                        </tr>
                                        <tr>
                                            <td>No round-off errors (0.1 + 0.2 = 0.3)</td>
                                            <td>✅</td>
                                            <td>✅ (up to 28 digits)</td>
                                            <td>✅</td>
                                            <td>✅ (up to 34 digits)</td>
                                            <td>✅ (up to 38 digits)</td>
                                            <td>❌</td>
                                            <td>✅</td>
                                            <td>✅</td>
                                        </tr>
                                        <tr>
                                            <td>±0, ±∞, NaN</td>
                                            <td>❌</td>
                                            <td>❌</td>
                                            <td>❌</td>
                                            <td>✅</td>
                                            <td>❌</td>
                                            <td>❌</td>
                                            <td>✅</td>
                                            <td>❌</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <Content>
                            <h2>Benchmarks.</h2>

                            <p>
                                The benchmarks below measure normalized throughput for a set of operations that appear
                                in real trading and analytics workloads. This includes primitive arithmetic, checked
                                variants, and functions that show up in technical indicators and risk code such as
                                division, roots, powers, logarithms, and rolling window style aggregation.
                            </p>

                            <p className='mt-6'>
                                Results are normalized to <code>Dec19x19</code>. A score of <code>1.00</code> is the{' '}
                                <code>fixed_num</code> baseline for a given operation. Higher values mean higher
                                throughput.
                            </p>

                            <ul className='mt-4 list-disc space-y-2 pl-6'>
                                <li>
                                    <code>1.25</code> means 25 percent higher throughput than <code>Dec19x19</code> for
                                    that operation.
                                </li>
                                <li>
                                    <code>0.50</code> means 2 times lower throughput than <code>Dec19x19</code> for that
                                    operation.
                                </li>
                                <li>
                                    <code>⚠️</code> indicates unsupported or panicking behavior in that benchmark.
                                </li>
                            </ul>

                            <p className='mt-6'>
                                The key pattern to look for is consistency under mixed workloads. In trading systems and
                                technical analysis pipelines you rarely perform only one operation. A typical indicator
                                chain combines add, subtract, multiply, divide, rolling aggregation, and nonlinear
                                functions. In those scenarios, the cost of the slowest operations tends to dominate end
                                to end runtime.
                            </p>

                            <p className='mt-6'>
                                Across the table, <code>fixed_num</code> provides high throughput with deterministic
                                decimal semantics. Many alternative decimal libraries are substantially slower in core
                                arithmetic and in the operations that dominate indicator workloads. The gap is
                                especially visible in division and in nonlinear functions, where a slower numeric
                                representation can become the limiting factor for backtests, strategy evaluation, and
                                real-time signal generation.
                            </p>
                            <div className='mt-8 w-full flex'>
                                <div className='overflow-scroll'>
                                    <BenchmarkTable />
                                </div>
                            </div>
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
