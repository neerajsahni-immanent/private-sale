import { ConnectKitButton } from "connectkit";
import { formatedAddress } from "@/utils/formatters";
import { CustomButton } from "../CustomInput";


export const WalletConnectButton = ({text}) => {
    return (
        <ConnectKitButton.Custom>
            {({ isConnected, isConnecting, show, hide, address, ensName, chain }) => {
                return (<>
                    <CustomButton BtnName={isConnected ? formatedAddress(address) : text ? text :'Connect Wallet'} onClick={show} />
                </>
                );
            }}
        </ConnectKitButton.Custom>
    )
}