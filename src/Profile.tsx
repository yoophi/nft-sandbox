import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { SignMessage } from "./SignMessage";

export function Profile() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  if (isConnected)
    return (
      <div>
        <div>Connected to {address}</div>
        <SignMessage />
        <button className="btn" onClick={() => disconnect()}>
          Disconnect
        </button>
      </div>
    );
  return (
    <button className="btn" onClick={() => connect()}>
      Connect Wallet
    </button>
  );
}
