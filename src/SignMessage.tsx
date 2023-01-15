import * as React from "react";
import { useSignMessage } from "wagmi";
import { verifyMessage } from "ethers/lib/utils";
import { Textarea } from "react-daisyui";

export function SignMessage() {
  const recoveredAddress = React.useRef<string>();
  const { data, error, isLoading, signMessage } = useSignMessage({
    onSuccess(data, variables) {
      // Verify signature when sign message succeeds
      const address = verifyMessage(variables.message, data);
      recoveredAddress.current = address;
    },
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const message = formData.get("message");
        if (message === null) return;
        signMessage({ message: message as string });
      }}
    >
      <div>
        <label htmlFor="message">Enter a message to sign</label>
      </div>
      <div>
        <Textarea
          id="message"
          name="message"
          placeholder="The quick brown fox…"
        />
      </div>
      <div>
        <button className="btn" disabled={isLoading}>
          {isLoading ? "Check Wallet" : "Sign Message"}
        </button>
      </div>

      {data && (
        <div>
          <div>Recovered Address: {recoveredAddress.current}</div>
          <div>Signature: {data}</div>
        </div>
      )}

      {error && <div>{error.message}</div>}
    </form>
  );
}
