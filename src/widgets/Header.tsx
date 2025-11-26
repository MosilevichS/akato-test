import Link from "next/link";
import {ROUTES} from "@/src/shared/routes/routes";

export const Header = () =>
    (
        <header className="bg-white/50 sticky top-0 z-50 w-full border-b border-gray-200 ">
            <div  className="mx-auto flex justify-between items-center w-full max-w-[1440px] px-4 py-5">
                <Link href={ROUTES.HOME}>Logo</Link>
                <nav className="flex gap-4 items-center ">
                    <Link href={ROUTES.HOME}>
                        home
                    </Link>
                    <Link href={ROUTES.PRODUCTS}>
                        products
                    </Link>
                </nav>
                <button className='rounded-md cursor-pointer px-4 py-2 border border-white/70 transition-all hover:border-white'>
                    <Link href={ROUTES.CREATE_PRODUCT}>
                        create product
                    </Link>
                </button>
            </div>
        </header>
    );


