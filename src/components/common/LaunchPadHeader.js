'use client'
import { FRONTEND_URL } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import './LaunchPadHeader.css';
import { WalletConnectButton } from "./Wallet/WalletConnectButton";
import { useAccount } from "wagmi";


const LaunchPadHeader = ({ children }) => {
    const [sidebar, setSideBar] = useState(false);
    const { isConnected } = useAccount();

    return (
        <>
            <div className={`index-page ${sidebar ? 'mobile-nav-active' : ''}`}>
                <header id="header" className="header d-flex align-items-center fixed-top">
                    <div className="container-fluid container-xl position-relative d-flex align-items-center">
                        <Link href="/" className="logo d-flex align-items-center">
                            <Image src={`${FRONTEND_URL}/sphera.png`} alt="" width={180} height={65} />
                        </Link>
                        <nav id="navmenu" className="navmenu">
                            <ul className="m-auto">
                                {isConnected && <li><Link href="/dashboard">Dashboard</Link></li>}
                            </ul>
                            <ul className="mr-0">
                                <li>
                                    <WalletConnectButton />
                                </li>
                            </ul>
                            <i className={`mobile-nav-toggle ml-auto d-xl-none bi ${sidebar ? 'bi-x' : 'bi-list'}`} onClick={() => setSideBar(!sidebar)}></i>
                        </nav>

                    </div>
                </header>
                <main>
                    {children}
                </main>
            </div>
        </>
    )
}

export default LaunchPadHeader;